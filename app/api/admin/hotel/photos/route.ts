import { NextRequest, NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { hotelPhotos } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const photos = await db
      .select()
      .from(hotelPhotos)
      .orderBy(asc(hotelPhotos.order), desc(hotelPhotos.createdAt));

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error: any) {
    console.error("Admin get hotel photos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const title = (body.title || "").trim();
    const category = (body.category || "Swimming Pool").trim();
    const imageUrl = (body.imageUrl || "").trim();
    const featured = Boolean(body.featured);

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Photo caption/title and image URL are required." },
        { status: 400 }
      );
    }

    const id = `ph-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const [newPhoto] = await db
      .insert(hotelPhotos)
      .values({
        id,
        title,
        category,
        imageUrl,
        featured,
        order: 0,
      })
      .returning();

    return NextResponse.json({
      success: true,
      photo: newPhoto,
      message: "Resort photo uploaded successfully.",
    });
  } catch (error: any) {
    console.error("Admin create hotel photo error:", error);
    return NextResponse.json(
      { error: "Failed to save resort photo" },
      { status: 500 }
    );
  }
}
