import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelSettings } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { defaultHotelSettings } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(hotelSettings)
      .where(eq(hotelSettings.id, "default"))
      .limit(1);

    const settings = list[0] || defaultHotelSettings;

    return NextResponse.json({
      success: true,
      settings: {
        id: settings.id,
        privateBoatPrice: Number(settings.privateBoatPrice) || 20000,
        standardBoatPrice: Number(settings.standardBoatPrice) || 0,
        privateBoatTitle: settings.privateBoatTitle || "Exclusive Private Boat",
        privateBoatDescription: settings.privateBoatDescription || "Dedicated luxury boat exclusively for your group.",
        privateTransferPrice: Number(settings.privateTransferPrice) || 5000,
        groupTransferPrice: Number(settings.groupTransferPrice) || 500,
      },
    });
  } catch (error: any) {
    console.error("Admin get hotel settings error:", error);
    return NextResponse.json(
      { error: "Failed to load hotel settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const privateBoatPrice = parseInt(body.privateBoatPrice ?? "20000", 10);
    const standardBoatPrice = parseInt(body.standardBoatPrice ?? "0", 10);
    const privateTransferPrice = parseInt(body.privateTransferPrice ?? "5000", 10);
    const groupTransferPrice = parseInt(body.groupTransferPrice ?? "500", 10);
    const privateBoatTitle = (body.privateBoatTitle || "Exclusive Private Boat").trim();
    const privateBoatDescription = (
      body.privateBoatDescription ||
      "Dedicated luxury boat exclusively for your group."
    ).trim();

    const existing = await db
      .select()
      .from(hotelSettings)
      .where(eq(hotelSettings.id, "default"))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(hotelSettings).values({
        id: "default",
        privateBoatPrice,
        standardBoatPrice,
        privateBoatTitle,
        privateBoatDescription,
        privateTransferPrice,
        groupTransferPrice,
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(hotelSettings)
        .set({
          privateBoatPrice,
          standardBoatPrice,
          privateBoatTitle,
          privateBoatDescription,
          privateTransferPrice,
          groupTransferPrice,
          updatedAt: new Date(),
        })
        .where(eq(hotelSettings.id, "default"));
    }

    const [updated] = await db
      .select()
      .from(hotelSettings)
      .where(eq(hotelSettings.id, "default"))
      .limit(1);

    return NextResponse.json({
      success: true,
      message: "Hotel settings & Safari Boat pricing updated successfully.",
      settings: updated,
    });
  } catch (error: any) {
    console.error("Admin update hotel settings error:", error);
    return NextResponse.json(
      { error: "Failed to update hotel settings: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}

