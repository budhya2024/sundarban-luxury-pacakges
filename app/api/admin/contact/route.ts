import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactCards, contactGeneralInfo } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const generalList = await db
      .select()
      .from(contactGeneralInfo)
      .where(eq(contactGeneralInfo.id, "default"))
      .limit(1);

    const cards = await db
      .select()
      .from(contactCards)
      .orderBy(asc(contactCards.order));

    return NextResponse.json({
      success: true,
      generalInfo: generalList[0] || null,
      contactCards: cards,
    });
  } catch (error: any) {
    console.error("Admin get contact error:", error);
    return NextResponse.json(
      { error: "Failed to load contact settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const existing = await db
      .select()
      .from(contactGeneralInfo)
      .where(eq(contactGeneralInfo.id, "default"))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(contactGeneralInfo).values({
        id: "default",
        ...body,
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(contactGeneralInfo)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(contactGeneralInfo.id, "default"));
    }

    const [updated] = await db
      .select()
      .from(contactGeneralInfo)
      .where(eq(contactGeneralInfo.id, "default"))
      .limit(1);

    return NextResponse.json({ success: true, generalInfo: updated });
  } catch (error: any) {
    console.error("Admin update contact error:", error);
    return NextResponse.json(
      { error: "Failed to update contact settings" },
      { status: 500 }
    );
  }
}
