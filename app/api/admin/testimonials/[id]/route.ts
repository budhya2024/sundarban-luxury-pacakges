import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
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
    if (body.role !== undefined) updateFields.role = body.role;
    if (body.avatar !== undefined) updateFields.avatar = body.avatar;
    if (body.rating !== undefined) updateFields.rating = Number(body.rating);
    if (body.text !== undefined) updateFields.text = body.text;
    if (body.tourPackage !== undefined) updateFields.tourPackage = body.tourPackage;
    if (body.date !== undefined) updateFields.date = body.date;
    if (body.featured !== undefined) updateFields.featured = !!body.featured;
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.source !== undefined) updateFields.source = body.source;
    if (body.order !== undefined) updateFields.order = Number(body.order);

    const [updated] = await db
      .update(testimonials)
      .set(updateFields)
      .where(eq(testimonials.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      testimonial: updated,
      message: "Review updated successfully",
    });
  } catch (error: any) {
    console.error("Admin update testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
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

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
