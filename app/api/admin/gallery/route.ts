import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminGallery } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(galleryItems)
      .orderBy(asc(galleryItems.order), desc(galleryItems.createdAt));

    return NextResponse.json({
      success: true,
      galleryItems: items.length > 0 ? items : initialAdminGallery,
    });
  } catch (error: any) {
    console.error("Admin get gallery items error:", error);
    return NextResponse.json({
      success: true,
      galleryItems: initialAdminGallery,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id || `gal-${Date.now()}`;
    const src = (body.src || "").trim();
    const title = (body.title || "").trim();

    if (!src || !title) {
      return NextResponse.json(
        { error: "Image URL and title are required" },
        { status: 400 }
      );
    }

    const [newItem] = await db
      .insert(galleryItems)
      .values({
        id,
        src,
        alt: body.alt || title,
        title,
        location: body.location || "Sundarban Biosphere",
        column: body.column || "col1",
        category: body.category || "Cruises",
        order: typeof body.order === "number" ? body.order : 0,
        status: body.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      galleryItem: newItem,
      message: "Photo added to gallery successfully",
    });
  } catch (error: any) {
    console.error("Admin create gallery item error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to add photo to gallery" },
      { status: 500 }
    );
  }
}
