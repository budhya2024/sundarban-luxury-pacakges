import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sundarban-luxury-jwt-secret-key-prod-2026"
);

const ADMIN_COOKIE_NAME = "sb_admin_session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Public admin auth pages (login, magic-login, reset-password):
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/magic-login" ||
    pathname === "/admin/reset-password";

  if (isAuthPage) {
    if (isAuthenticated && pathname === "/admin/login") {
      // If already logged in and visiting login page, redirect to /admin
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // If accessing any protected admin route without authentication:
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", req.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
