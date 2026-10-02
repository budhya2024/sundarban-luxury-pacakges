import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { eq, and, isNull, gt } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, adminPasswordResets } from "@/db/schema";
import { signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json(
        { error: "Password reset token is required" },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters in length" },
        { status: 400 }
      );
    }

    const cleanToken = token.trim();

    // Verify token is valid, unused, and unexpired
    const resets = await db
      .select()
      .from(adminPasswordResets)
      .where(
        and(
          eq(adminPasswordResets.token, cleanToken),
          isNull(adminPasswordResets.usedAt),
          gt(adminPasswordResets.expiresAt, new Date())
        )
      )
      .limit(1);

    if (resets.length === 0) {
      return NextResponse.json(
        { error: "This password reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const resetRecord = resets[0];

    // Find associated user
    const users = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, resetRecord.adminId))
      .limit(1);

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Associated administrator account not found." },
        { status: 404 }
      );
    }

    const user = users[0];

    // Hash the new password with bcrypt
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await db
      .update(adminUsers)
      .set({
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, user.id));

    // Mark reset token as used
    await db
      .update(adminPasswordResets)
      .set({ usedAt: new Date() })
      .where(eq(adminPasswordResets.id, resetRecord.id));

    // Sign admin session JWT so user is immediately logged in
    const sessionToken = await signAdminToken({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Your admin password has been successfully updated.",
      redirect: "/admin",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update password" },
      { status: 500 }
    );
  }
}
