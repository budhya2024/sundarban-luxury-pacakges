import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelRooms } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rooms = await db
      .select()
      .from(hotelRooms)
      .where(eq(hotelRooms.status, "Available"))
      .orderBy(asc(hotelRooms.pricePerNight));

    return NextResponse.json({
      success: true,
      rooms,
    });
  } catch (error: any) {
    console.error("Public get hotel rooms error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel rooms" },
      { status: 500 }
    );
  }
}
