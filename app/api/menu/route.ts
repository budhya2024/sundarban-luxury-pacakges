import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { initialAdminMenuItems } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.status, "Active"))
      .orderBy(asc(menuItems.order));

    return NextResponse.json({
      success: true,
      menuItems: items.length > 0 ? items : initialAdminMenuItems,
    });
  } catch (error: any) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({
      success: true,
      menuItems: initialAdminMenuItems,
    });
  }
}
