import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { hotelInquiries } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await db
      .select()
      .from(hotelInquiries)
      .orderBy(desc(hotelInquiries.createdAt));

    return NextResponse.json({
      success: true,
      inquiries,
    });
  } catch (error: any) {
    console.error("Admin get hotel inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel inquiries" },
      { status: 500 }
    );
  }
}
