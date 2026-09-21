import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactInquiries } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, source } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required fields" },
        { status: 400 }
      );
    }

    const [inquiry] = await db
      .insert(contactInquiries)
      .values({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject ? subject.trim() : "General Inquiry",
        message: message.trim(),
        status: "New",
        source: source || "Contact Form",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      inquiry,
    });
  } catch (error: any) {
    console.error("Error submitting contact inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again or reach our direct helpline." },
      { status: 500 }
    );
  }
}
