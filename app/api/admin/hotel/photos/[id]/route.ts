import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelPhotos } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { deleteFromStorage } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Find photo first to clean up its image from Neon Object Storage
    const existingList = await db
      .select()
      .from(hotelPhotos)
      .where(eq(hotelPhotos.id, id))
      .limit(1);

    if (existingList.length === 0) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photo = existingList[0];

    // Delete from Neon Postgres
    await db.delete(hotelPhotos).where(eq(hotelPhotos.id, id));

    // Delete from Neon Object Storage
    if (photo.imageUrl) {
      try {
        await deleteFromStorage(photo.imageUrl);
      } catch (s3Err) {
        console.error("Failed to delete photo from storage:", s3Err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete hotel photo error:", error);
    return NextResponse.json(
      { error: "Failed to delete resort photo" },
      { status: 500 }
    );
  }
}
