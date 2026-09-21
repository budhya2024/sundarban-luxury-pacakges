import { NextRequest, NextResponse } from "next/server";
import { uploadToStorage, deleteFromStorage } from "@/lib/s3";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB industry norm for blog web images
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "blog";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 1. Enforce Industry Norm File Size Limit (5 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        {
          error: `File size (${fileSizeMB} MB) exceeds the 5 MB limit. Please compress or resize the image before uploading.`,
        },
        { status: 413 }
      );
    }

    // 2. Validate MIME Type
    const mimeType = file.type?.toLowerCase() || "";
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json(
        {
          error: `Unsupported image format (${mimeType || "unknown"}). Allowed formats: JPG, PNG, WebP, AVIF, and GIF.`,
        },
        { status: 415 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url, key } = await uploadToStorage(
      buffer,
      file.name,
      file.type || "image/jpeg",
      folder
    );

    return NextResponse.json({ success: true, url, key });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload file to storage" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let target = searchParams.get("url") || searchParams.get("key");

    if (!target) {
      try {
        const body = await req.json();
        target = body?.url || body?.key;
      } catch {}
    }

    if (!target) {
      return NextResponse.json(
        { error: "Image url or key is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = await deleteFromStorage(target);
    return NextResponse.json({
      success: true,
      deleted,
      message: deleted
        ? "Object removed from Neon Object Storage"
        : "Image was not stored in Neon storage or already removed",
    });
  } catch (error: any) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to remove image from storage" },
      { status: 500 }
    );
  }
}

