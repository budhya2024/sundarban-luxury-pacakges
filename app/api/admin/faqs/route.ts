import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminFaqs } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(faqs)
      .orderBy(asc(faqs.order), desc(faqs.createdAt));

    return NextResponse.json({
      success: true,
      faqs: items.length > 0 ? items : initialAdminFaqs,
    });
  } catch (error: any) {
    console.error("Admin get faqs error:", error);
    return NextResponse.json({
      success: true,
      faqs: initialAdminFaqs,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id || `faq-${Date.now()}`;
    const question = (body.question || "").trim();
    const answer = (body.answer || "").trim();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const [newItem] = await db
      .insert(faqs)
      .values({
        id,
        questionNumber: body.questionNumber || "01",
        question,
        answer,
        category: body.category || "General",
        order: typeof body.order === "number" ? body.order : 0,
        status: body.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      faq: newItem,
      message: "FAQ added successfully",
    });
  } catch (error: any) {
    console.error("Admin create faq error:", error);
    return NextResponse.json(
      { error: "Failed to add FAQ" },
      { status: 500 }
    );
  }
}
