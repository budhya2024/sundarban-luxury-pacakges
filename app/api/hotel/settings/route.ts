import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelSettings } from "@/db/schema";
import { defaultHotelSettings } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
    console.error("Public get hotel settings error:", error);
    return NextResponse.json({
      success: true,
      settings: defaultHotelSettings,
    });
  }
}

