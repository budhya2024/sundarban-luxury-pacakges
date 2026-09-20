import { NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { hotelPhotos } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const photos = await db
      .select()
      .from(hotelPhotos)
      .orderBy(asc(hotelPhotos.order), desc(hotelPhotos.createdAt));

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error: any) {
    console.error("Public get hotel photos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resort photos" },
      { status: 500 }
    );
  }
}
