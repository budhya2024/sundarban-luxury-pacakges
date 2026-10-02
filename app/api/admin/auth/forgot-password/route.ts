import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, adminPasswordResets } from "@/db/schema";
import { sendAdminAuthEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email or username is required" },
        { status: 400 }
      );
    }

    const identifier = email.trim();

    // Look up administrator by email or username
    const users = await db
      .select()
      .from(adminUsers)
      .where(or(eq(adminUsers.email, identifier), eq(adminUsers.username, identifier)))
      .limit(1);

    // If user is not found, return generic success to protect against account enumeration
    if (users.length === 0) {
      return NextResponse.json({
        success: true,
        message: "If an account matches that email, access and reset instructions have been dispatched.",
      });
    }

    const user = users[0];

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Save token in database
    await db.insert(adminPasswordResets).values({
      adminId: user.id,
      token,
      type: "magic_link_and_reset",
      expiresAt,
    });

    // Determine site base URL
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      (origin ? origin : host ? `http://${host}` : "http://localhost:3000");

    const cleanBaseUrl = siteUrl.replace(/\/+$/, "");
    const magicLinkUrl = `${cleanBaseUrl}/admin/magic-login?token=${token}`;
    const resetUrl = `${cleanBaseUrl}/admin/reset-password?token=${token}`;

    // Dispatch email
    const emailResult = await sendAdminAuthEmail({
      to: user.email,
      adminName: user.name || "Administrator",
      magicLinkUrl,
      resetUrl,
      expiresInMinutes: 30,
    });

    return NextResponse.json({
      success: true,
      message: "Access instructions containing a 1-click magic link and password reset link have been sent to your email.",
      emailSent: emailResult.sent,
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process password recovery request" },
      { status: 500 }
    );
  }
}
