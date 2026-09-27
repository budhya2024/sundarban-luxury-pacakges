import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { globalAlertBanner } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminAlertBanner } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const list = await db
      .select()
      .from(globalAlertBanner)
      .where(eq(globalAlertBanner.id, "default"))
      .limit(1);

    return NextResponse.json({
      success: true,
      banner: list[0] || initialAdminAlertBanner,
    });
  } catch (error: any) {
    console.error("Error fetching alert banner:", error);
    return NextResponse.json({
      success: true,
      banner: initialAdminAlertBanner,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const existing = await db
      .select()
      .from(globalAlertBanner)
      .where(eq(globalAlertBanner.id, "default"))
      .limit(1);

    const updateFields: any = {
      updatedAt: new Date(),
    };

    if (body.isEnabled !== undefined) updateFields.isEnabled = !!body.isEnabled;
    if (body.text !== undefined) updateFields.text = body.text;
    if (body.badge !== undefined) updateFields.badge = body.badge;
    if (body.type !== undefined) updateFields.type = body.type;
    if (body.actionText !== undefined) updateFields.actionText = body.actionText;
    if (body.actionUrl !== undefined) updateFields.actionUrl = body.actionUrl;

    if (existing.length === 0) {
      await db.insert(globalAlertBanner).values({
        id: "default",
        isEnabled: body.isEnabled !== undefined ? !!body.isEnabled : true,
        text: body.text || initialAdminAlertBanner.text,
        badge: body.badge || initialAdminAlertBanner.badge,
        type: body.type || initialAdminAlertBanner.type,
        actionText: body.actionText,
        actionUrl: body.actionUrl,
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(globalAlertBanner)
        .set(updateFields)
        .where(eq(globalAlertBanner.id, "default"));
    }

    const [updated] = await db
      .select()
      .from(globalAlertBanner)
      .where(eq(globalAlertBanner.id, "default"))
      .limit(1);

    return NextResponse.json({
      success: true,
      banner: updated,
      message: "Alert banner updated successfully",
    });
  } catch (error: any) {
    console.error("Admin update alert banner error:", error);
    return NextResponse.json(
      { error: "Failed to update alert banner" },
      { status: 500 }
    );
  }
}
