import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
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

    if (body.src !== undefined) updateFields.src = body.src;
    if (body.alt !== undefined) updateFields.alt = body.alt;
    if (body.title !== undefined) updateFields.title = body.title;
    if (body.location !== undefined) updateFields.location = body.location;
    if (body.column !== undefined) updateFields.column = body.column;
    if (body.category !== undefined) updateFields.category = body.category;
    if (body.order !== undefined) updateFields.order = Number(body.order);
    if (body.status !== undefined) updateFields.status = body.status;

    const [updated] = await db
      .update(galleryItems)
      .set(updateFields)
      .where(eq(galleryItems.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      galleryItem: updated,
      message: "Gallery photo updated successfully",
    });
  } catch (error: any) {
    console.error("Admin update gallery item error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update gallery photo" },
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

    await db.delete(galleryItems).where(eq(galleryItems.id, id));

    return NextResponse.json({
      success: true,
      message: "Photo deleted from gallery successfully",
    });
  } catch (error: any) {
    console.error("Admin delete gallery item error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete photo from gallery" },
      { status: 500 }
    );
  }
}
