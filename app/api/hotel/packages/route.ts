import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { hotelPackages } from "@/db/schema";
import { initialAdminHotelPackages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const packages = await db
      .select()
      .from(hotelPackages)
      .where(eq(hotelPackages.status, "Active"))
      .orderBy(asc(hotelPackages.order), asc(hotelPackages.createdAt));

    return NextResponse.json({
      success: true,
      packages: packages.length > 0 ? packages : initialAdminHotelPackages,
    });
  } catch (error: any) {
    console.error("Public get hotel packages error:", error);
    return NextResponse.json({
      success: true,
      packages: initialAdminHotelPackages,
      fallback: true,
    });
  }
}

