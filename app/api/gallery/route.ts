import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { initialAdminGallery } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.status, "Active"))
      .orderBy(asc(galleryItems.order));

    return NextResponse.json({
      success: true,
      galleryItems: items,
    });
  } catch (error: any) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json({
      success: true,
      galleryItems: [],
    });
  }
}
