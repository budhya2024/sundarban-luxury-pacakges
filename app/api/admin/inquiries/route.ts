import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactInquiries } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = db.select().from(contactInquiries);

    let inquiries;
    if (status && status !== "all" && status !== "All") {
      inquiries = await query
        .where(eq(contactInquiries.status, status))
        .orderBy(desc(contactInquiries.createdAt));
    } else {
      inquiries = await query.orderBy(desc(contactInquiries.createdAt));
    }

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error("Admin get inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, subject, message, source, status } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const [newInquiry] = await db
      .insert(contactInquiries)
      .values({
        name,
        email: email || "offline-lead@sundarban.com",
        phone,
        subject: subject || "Offline Lead",
        message: message || "Logged via Admin panel",
        status: status || "New",
        source: source || "Helpline Call",
      })
      .returning();

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    console.error("Admin create inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to log lead" },
      { status: 500 }
    );
  }
}
