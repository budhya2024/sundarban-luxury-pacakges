import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pageContents } from "@/db/schema";
import { initialAdminPages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const rows = await db
        .select()
        .from(pageContents)
        .where(eq(pageContents.pageKey, key))
        .limit(1);

      if (rows.length > 0) {
        return NextResponse.json({ success: true, page: rows[0] });
      }

      const fallback = initialAdminPages.find((p) => p.pageKey === key);
      return NextResponse.json({
        success: true,
        page: fallback || null,
      });
    }

    const allPages = await db.select().from(pageContents);
    return NextResponse.json({
      success: true,
      pages: allPages.length > 0 ? allPages : initialAdminPages,
    });
  } catch (error: any) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({
      success: true,
      pages: initialAdminPages,
    });
  }
}
