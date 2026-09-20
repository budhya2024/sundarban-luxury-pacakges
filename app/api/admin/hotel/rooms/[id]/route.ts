import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelRooms } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { deleteFromStorage } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.code !== undefined) updateData.code = body.code.trim();
    if (body.pricePerNight !== undefined) updateData.pricePerNight = parseInt(body.pricePerNight, 10);
    if (body.capacity !== undefined) updateData.capacity = body.capacity.trim();
    if (body.bedType !== undefined) updateData.bedType = body.bedType.trim();
    if (body.totalRooms !== undefined) updateData.totalRooms = parseInt(body.totalRooms, 10);
    if (body.availableRooms !== undefined) updateData.availableRooms = parseInt(body.availableRooms, 10);
    if (body.status !== undefined) updateData.status = body.status;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.amenities !== undefined) {
      updateData.amenities = Array.isArray(body.amenities)
        ? body.amenities
        : typeof body.amenities === "string"
        ? body.amenities.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    const [updated] = await db
      .update(hotelRooms)
      .set(updateData)
      .where(eq(hotelRooms.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      room: updated,
      message: "Room updated successfully.",
    });
  } catch (error: any) {
    console.error("Admin update hotel room error:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  return PUT(req, props);
}

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

    const existingList = await db
      .select()
      .from(hotelRooms)
      .where(eq(hotelRooms.id, id))
      .limit(1);

    if (existingList.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const room = existingList[0];

    await db.delete(hotelRooms).where(eq(hotelRooms.id, id));

    // Delete image from Neon Object Storage if stored there
    if (room.image) {
      try {
        await deleteFromStorage(room.image);
      } catch (err) {
        console.error("Failed to delete room image from storage:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete hotel room error:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
