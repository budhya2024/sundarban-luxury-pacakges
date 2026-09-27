import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
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

    if (body.questionNumber !== undefined) updateFields.questionNumber = body.questionNumber;
    if (body.question !== undefined) updateFields.question = body.question;
    if (body.answer !== undefined) updateFields.answer = body.answer;
    if (body.category !== undefined) updateFields.category = body.category;
    if (body.order !== undefined) updateFields.order = Number(body.order);
    if (body.status !== undefined) updateFields.status = body.status;

    const [updated] = await db
      .update(faqs)
      .set(updateFields)
      .where(eq(faqs.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      faq: updated,
      message: "FAQ updated successfully",
    });
  } catch (error: any) {
    console.error("Admin update faq error:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
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

    await db.delete(faqs).where(eq(faqs.id, id));

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete faq error:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
