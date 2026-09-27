import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();

    const updateFields: any = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updateFields.name = body.name;
    if (body.category !== undefined) updateFields.category = body.category;
    if (body.priceTag !== undefined) updateFields.priceTag = body.priceTag;
    if (body.tag !== undefined) updateFields.tag = body.tag;
    if (body.image !== undefined) updateFields.image = body.image;
    if (body.description !== undefined) updateFields.description = body.description;
    if (body.isChefSpecial !== undefined) updateFields.isChefSpecial = !!body.isChefSpecial;
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.order !== undefined) updateFields.order = Number(body.order);

    const [updated] = await db
      .update(menuItems)
      .set(updateFields)
      .where(eq(menuItems.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      menuItem: updated,
      message: "Menu item updated successfully",
    });
  } catch (error: any) {
    console.error("Admin update menu item error:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await db.delete(menuItems).where(eq(menuItems.id, id));

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete menu item error:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
