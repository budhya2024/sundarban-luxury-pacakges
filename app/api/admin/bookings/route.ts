import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));

    const mappedBookings = rows.map((row) => ({
      ...row,
      createdAt: row.createdAt
        ? new Date(row.createdAt).toISOString().replace("T", " ").substring(0, 16)
        : "",
      updatedAt: row.updatedAt
        ? new Date(row.updatedAt).toISOString().replace("T", " ").substring(0, 16)
        : "",
    }));

    return NextResponse.json({
      success: true,
      bookings: mappedBookings,
    });
  } catch (error: any) {
    console.error("Admin get bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings list" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const guestName = (body.guestName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const packageOrRoom = (body.packageOrRoom || "Sundarban Package").trim();
    const travelDate = (body.travelDate || "").trim();
    const guestsCount = parseInt(body.guestsCount || "1", 10) || 1;
    const totalAmount = parseInt(body.totalAmount || "0", 10) || 0;
    const paidAmount = parseInt(body.paidAmount || "0", 10) || 0;
    const type = body.type || "Tour Package";
    const paymentStatus = body.paymentStatus || "Unpaid";
    const bookingStatus = body.bookingStatus || "Pending";
    const specialRequests = body.specialRequests || "";

    if (!guestName || !email || !phone || !travelDate) {
      return NextResponse.json(
        { error: "Guest name, email, phone, and travel date are required." },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `SB-${currentYear}-${randomSuffix}`;
    const id = `bk-${Date.now()}`;

    const [newBooking] = await db
      .insert(bookings)
      .values({
        id,
        bookingCode,
        guestName,
        email,
        phone,
        packageOrRoom,
        type,
        travelDate,
        guestsCount,
        totalAmount,
        paidAmount,
        paymentStatus,
        bookingStatus,
        specialRequests,
      })
      .returning();

    const formattedCreatedAt = new Date(newBooking.createdAt)
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);

    return NextResponse.json({
      success: true,
      booking: {
        ...newBooking,
        createdAt: formattedCreatedAt,
      },
    });
  } catch (error: any) {
    console.error("Admin create booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
