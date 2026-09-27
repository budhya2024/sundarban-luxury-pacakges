import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminMenuItems } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(menuItems)
      .orderBy(asc(menuItems.order), desc(menuItems.createdAt));

    return NextResponse.json({
      success: true,
      menuItems: items.length > 0 ? items : initialAdminMenuItems,
    });
  } catch (error: any) {
    console.error("Admin get menu items error:", error);
    return NextResponse.json({
      success: true,
      menuItems: initialAdminMenuItems,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id || `menu-${Date.now()}`;
    const name = (body.name || "").trim();

    if (!name || !body.image) {
      return NextResponse.json(
        { error: "Dish name and image URL are required" },
        { status: 400 }
      );
    }

    const [newItem] = await db
      .insert(menuItems)
      .values({
        id,
        name,
        category: body.category || "Bengali Non-Veg",
        priceTag: body.priceTag || "Included in Buffet",
        tag: body.tag || "Fresh Preparation",
        image: body.image,
        description: body.description || "",
        isChefSpecial: !!body.isChefSpecial,
        status: body.status || "Active",
        order: typeof body.order === "number" ? body.order : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      menuItem: newItem,
      message: "Menu item added successfully",
    });
  } catch (error: any) {
    console.error("Admin create menu item error:", error);
    return NextResponse.json(
      { error: "Failed to add menu item" },
      { status: 500 }
    );
  }
}
