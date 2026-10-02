import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull, gt } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, adminPasswordResets } from "@/db/schema";
import { signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json(
        { error: "Magic login token is required" },
        { status: 400 }
      );
    }

    const cleanToken = token.trim();

    // Find valid, unused, and unexpired token
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
        { error: "This magic link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const resetRecord = resets[0];

    // Find associated admin user
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

    // Mark token as used immediately to prevent replay
    await db
      .update(adminPasswordResets)
      .set({ usedAt: new Date() })
      .where(eq(adminPasswordResets.id, resetRecord.id));

    // Sign admin session JWT
    const sessionToken = await signAdminToken({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    // Create response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
      redirect: "/admin",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error("Verify magic link error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal authentication error" },
      { status: 500 }
    );
  }
}
