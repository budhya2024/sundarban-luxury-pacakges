import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactInquiries } from "@/db/schema";
import { validateContactInquiry } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, source, honeypot } = body;

    // Bot honeypot detection
    if (honeypot) {
      return NextResponse.json(
        { error: "Spam submission detected." },
        { status: 400 }
      );
    }

    // Comprehensive server-side validation
    const validation = validateContactInquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0] || "Please check the form inputs.";
      return NextResponse.json(
        {
          error: firstError,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const [inquiry] = await db
      .insert(contactInquiries)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject && subject.trim() ? subject.trim() : "Sundarban Luxury Inquiry",
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
