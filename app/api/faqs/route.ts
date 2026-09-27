import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { initialAdminFaqs } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await db
      .select()
      .from(faqs)
      .where(eq(faqs.status, "Active"))
      .orderBy(asc(faqs.order));

    return NextResponse.json({
      success: true,
      faqs: items.length > 0 ? items : initialAdminFaqs,
    });
  } catch (error: any) {
    console.error("Error fetching faqs:", error);
    return NextResponse.json({
      success: true,
      faqs: initialAdminFaqs,
    });
  }
}
