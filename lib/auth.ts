import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sundarban-luxury-jwt-secret-key-prod-2026"
);

export const ADMIN_COOKIE_NAME = "sb_admin_session";

export interface AdminJwtPayload {
  id: string;
  username: string;
  name: string;
  role: string;
}

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminJwtPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function verifyAdminRequest(req: NextRequest): Promise<AdminJwtPayload | null> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
