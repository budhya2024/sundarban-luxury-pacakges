import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactCards, contactGeneralInfo } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const generalList = await db
      .select()
      .from(contactGeneralInfo)
      .where(eq(contactGeneralInfo.id, "default"))
      .limit(1);

    const general = generalList[0] || null;

    const cards = await db
      .select()
      .from(contactCards)
      .where(eq(contactCards.status, "Active"))
      .orderBy(asc(contactCards.order));

    return NextResponse.json({
      success: true,
      generalInfo: general,
      contactCards: cards,
    });
  } catch (error: any) {
    console.error("Error fetching public contact info:", error);
    return NextResponse.json(
      { error: "Failed to load contact information" },
      { status: 500 }
    );
  }
}
