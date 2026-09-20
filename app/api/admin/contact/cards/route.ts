import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactCards } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      iconKey,
      title,
      subtitle,
      details,
      actionType,
      actionValue,
      isPrimary,
      status,
      order,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [newCard] = await db
      .insert(contactCards)
      .values({
        iconKey: iconKey || "phone",
        title,
        subtitle: subtitle || "",
        details: Array.isArray(details) ? details : [],
        actionType: actionType || "none",
        actionValue: actionValue || "",
        isPrimary: Boolean(isPrimary),
        status: status || "Active",
        order: Number(order) || 0,
      })
      .returning();

    return NextResponse.json({ success: true, card: newCard });
  } catch (error: any) {
    console.error("Error creating contact card:", error);
    return NextResponse.json(
      { error: "Failed to create contact card" },
      { status: 500 }
    );
  }
}
