import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelPackages } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminHotelPackages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const packages = await db
      .select()
      .from(hotelPackages)
      .orderBy(asc(hotelPackages.order), desc(hotelPackages.createdAt));

    return NextResponse.json({
      success: true,
      packages: packages.length > 0 ? packages : initialAdminHotelPackages,
    });
  } catch (error: any) {
    console.error("Admin get hotel packages error:", error);
    return NextResponse.json({
      success: true,
      packages: initialAdminHotelPackages,
      fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      duration,
      pricePerPerson,
      originalPrice,
      premiumRoomDelta,
      highlight,
      popular,
      status,
      itinerary,
      foodMenu,
      inclusions,
      exclusions,
      order,
    } = body;

    if (!name || !duration || pricePerPerson === undefined) {
      return NextResponse.json(
        { error: "Package name, duration, and price per person are required." },
        { status: 400 }
      );
    }

    const id = body.id || `hp-${Date.now()}`;

    const [newPkg] = await db
      .insert(hotelPackages)
      .values({
        id,
        name: name.trim(),
        duration: duration.trim(),
        pricePerPerson: Number(pricePerPerson),
        originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(pricePerPerson) * 1.25),
        premiumRoomDelta: premiumRoomDelta !== undefined ? Number(premiumRoomDelta) : 2000,
        highlight: (highlight || "").trim(),
        popular: Boolean(popular),
        status: status || "Active",
        order: order !== undefined ? Number(order) : 0,
        itinerary: Array.isArray(itinerary) ? itinerary : [],
        foodMenu: Array.isArray(foodMenu) ? foodMenu : [],
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        exclusions: Array.isArray(exclusions) ? exclusions : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ success: true, package: newPkg });
  } catch (error: any) {
    console.error("Admin create hotel package error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create hotel package" },
      { status: 500 }
    );
  }
}

