import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactCards } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const [updated] = await db
      .update(contactCards)
      .set({
        iconKey: body.iconKey,
        title: body.title,
        subtitle: body.subtitle,
        details: Array.isArray(body.details) ? body.details : undefined,
        actionType: body.actionType,
        actionValue: body.actionValue,
        isPrimary: body.isPrimary !== undefined ? Boolean(body.isPrimary) : undefined,
        status: body.status,
        order: body.order !== undefined ? Number(body.order) : undefined,
      })
      .where(eq(contactCards.id, id))
      .returning();

    return NextResponse.json({ success: true, card: updated });
  } catch (error: any) {
    console.error("Error updating contact card:", error);
    return NextResponse.json(
      { error: "Failed to update contact card" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await db.delete(contactCards).where(eq(contactCards.id, id));

    return NextResponse.json({ success: true, message: "Card deleted" });
  } catch (error: any) {
    console.error("Error deleting contact card:", error);
    return NextResponse.json(
      { error: "Failed to delete contact card" },
      { status: 500 }
    );
  }
}
