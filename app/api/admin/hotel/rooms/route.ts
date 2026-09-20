import { NextRequest, NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { hotelRooms } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rooms = await db
      .select()
      .from(hotelRooms)
      .orderBy(asc(hotelRooms.pricePerNight));

    return NextResponse.json({
      success: true,
      rooms,
    });
  } catch (error: any) {
    console.error("Admin get hotel rooms error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel rooms" },
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
    const name = (body.name || "").trim();
    const code = (body.code || `HSB-${Math.floor(10 + Math.random() * 90)}`).trim();
    const pricePerNight = parseInt(body.pricePerNight || "0", 10) || 5500;
    const capacity = (body.capacity || "2 Adults").trim();
    const bedType = (body.bedType || "1 King Size Bed").trim();
    const totalRooms = parseInt(body.totalRooms || "10", 10) || 10;
    const availableRooms = parseInt(body.availableRooms || "5", 10) || 5;
    const status = body.status || "Available";
    const image = body.image || "/assets/images/sonarbanglahotel.jpg";
    const amenities = Array.isArray(body.amenities)
      ? body.amenities
      : typeof body.amenities === "string"
      ? body.amenities.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    if (!name) {
      return NextResponse.json(
        { error: "Room name is required." },
        { status: 400 }
      );
    }

    const id = body.id || `rm-${Date.now()}`;

    const [newRoom] = await db
      .insert(hotelRooms)
      .values({
        id,
        name,
        code,
        pricePerNight,
        capacity,
        bedType,
        totalRooms,
        availableRooms,
        status,
        image,
        amenities,
      })
      .returning();

    return NextResponse.json({
      success: true,
      room: newRoom,
      message: "Room created successfully.",
    });
  } catch (error: any) {
    console.error("Admin create hotel room error:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
