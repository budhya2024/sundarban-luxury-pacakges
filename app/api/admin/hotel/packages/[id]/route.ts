import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelPackages } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

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

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.duration !== undefined) updateData.duration = body.duration.trim();
    if (body.pricePerPerson !== undefined) updateData.pricePerPerson = Number(body.pricePerPerson);
    if (body.originalPrice !== undefined) updateData.originalPrice = Number(body.originalPrice);
    if (body.premiumRoomDelta !== undefined) updateData.premiumRoomDelta = Number(body.premiumRoomDelta);
    if (body.highlight !== undefined) updateData.highlight = body.highlight.trim();
    if (body.popular !== undefined) updateData.popular = Boolean(body.popular);
    if (body.status !== undefined) updateData.status = body.status;
    if (body.order !== undefined) updateData.order = Number(body.order);
    if (body.itinerary !== undefined) updateData.itinerary = body.itinerary;
    if (body.foodMenu !== undefined) updateData.foodMenu = body.foodMenu;
    if (body.inclusions !== undefined) updateData.inclusions = body.inclusions;
    if (body.exclusions !== undefined) updateData.exclusions = body.exclusions;

    const [updated] = await db
      .update(hotelPackages)
      .set(updateData)
      .where(eq(hotelPackages.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    console.error("Admin update hotel package error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update hotel package" },
      { status: 500 }
    );
  }
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

    const [deleted] = await db
      .delete(hotelPackages)
      .where(eq(hotelPackages.id, id))
      .returning();

    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error("Admin delete hotel package error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete hotel package" },
      { status: 500 }
    );
  }
}

