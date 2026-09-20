import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { sendBookingNotificationEmails } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestName = (body.guestName || body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || body.phoneNumber || "").trim();
    const packageOrRoom = (body.packageOrRoom || body.packageName || "Sundarban Luxury Expedition").trim();
    const travelDate = (body.travelDate || "").trim();
    const guestsCount = parseInt(body.guestsCount || body.guests || "1", 10) || 1;
    const totalAmount = typeof body.totalAmount === "number" ? body.totalAmount : parseInt(body.totalAmount || "0", 10) || 0;
    const paidAmount = typeof body.paidAmount === "number" ? body.paidAmount : parseInt(body.paidAmount || "0", 10) || 0;
    const type = body.type || "Tour Package";
    const paymentStatus = body.paymentStatus || "Unpaid";
    const bookingStatus = body.bookingStatus || "Pending";
    const specialRequests = body.specialRequests || `Direct online reservation for ${packageOrRoom}.`;

    if (!guestName || !email || !phone || !travelDate) {
      return NextResponse.json(
        { error: "Guest name, email, phone number, and travel date are required." },
        { status: 400 }
      );
    }

    // Generate unique booking code and id
    const currentYear = new Date().getFullYear();
    const randomCodeSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `SB-${currentYear}-${randomCodeSuffix}`;
    const id = `bk-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

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

    const bookingResult = {
      ...newBooking,
      createdAt: formattedCreatedAt,
    };

    // Trigger email alerts asynchronously via nodemailer
    sendBookingNotificationEmails({
      id: bookingResult.id,
      bookingCode: bookingResult.bookingCode,
      guestName: bookingResult.guestName,
      email: bookingResult.email,
      phone: bookingResult.phone,
      packageOrRoom: bookingResult.packageOrRoom,
      type: bookingResult.type,
      travelDate: bookingResult.travelDate,
      guestsCount: bookingResult.guestsCount,
      totalAmount: bookingResult.totalAmount,
      paidAmount: bookingResult.paidAmount,
      paymentStatus: bookingResult.paymentStatus,
      bookingStatus: bookingResult.bookingStatus,
      specialRequests: bookingResult.specialRequests,
      createdAt: bookingResult.createdAt,
    }).catch((err) => {
      console.error("Async email error:", err);
    });

    return NextResponse.json({
      success: true,
      booking: bookingResult,
      message: "Your booking request has been confirmed and saved.",
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking reservation. Please try again or call our helpline." },
      { status: 500 }
    );
  }
}
