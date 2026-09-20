import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { hotelInquiries, bookings } from "@/db/schema";
import { sendHotelInquiryNotificationEmails } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestName = (body.guestName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const roomName = (body.roomName || "Deluxe Riverview Suite").trim();
    const roomCode = body.roomCode || "";
    const packageName = body.packageName || "";
    const checkIn = (body.checkIn || body.travelDate || "").trim();
    const checkOut = (body.checkOut || "").trim();
    const nights = parseInt(body.nights || "1", 10) || 1;
    const roomsCount = parseInt(body.roomsCount || "1", 10) || 1;
    const totalAmount = parseInt(body.totalAmount || "0", 10) || 0;
    const paidAmount = parseInt(body.paidAmount || "0", 10) || 0;
    const paymentStatus = body.paymentStatus || "Pending";
    const status = body.status || "Pending";
    const specialRequests = body.specialRequests || "";

    const guestsCount =
      body.guestsCount ||
      `${body.adults || 2} Adults${body.children ? `, ${body.children} Children` : ""}`;

    if (!guestName || !email || !phone || !checkIn) {
      return NextResponse.json(
        { error: "Guest name, email, phone number, and check-in date are required." },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refId = `HSB-${currentYear}-${randomSuffix}`;
    const id = `h-inq-${Date.now()}`;
    const date = new Date().toISOString().slice(0, 10);

    const [inquiry] = await db
      .insert(hotelInquiries)
      .values({
        id,
        refId,
        guestName,
        phone,
        email,
        packageName,
        roomName,
        roomCode,
        checkIn,
        checkOut,
        nights,
        guestsCount,
        roomsCount,
        totalAmount,
        paidAmount,
        paymentStatus,
        status,
        date,
        specialRequests,
      })
      .returning();

    // Mirror to unified bookings table
    try {
      await db.insert(bookings).values({
        id: `b-${inquiry.id}`,
        bookingCode: refId,
        guestName,
        email,
        phone,
        packageOrRoom: `${packageName ? packageName + " • " : ""}${roomName}`,
        type: "Hotel Resort",
        travelDate: checkIn,
        guestsCount: roomsCount * 2,
        totalAmount,
        paidAmount,
        paymentStatus: paymentStatus === "Pending" ? "Unpaid" : (paymentStatus as any),
        bookingStatus: status as any,
        specialRequests,
      });
    } catch (mirrorErr) {
      console.error("Mirror to bookings table notice:", mirrorErr);
    }

    // Trigger Gmail notifications asynchronously
    sendHotelInquiryNotificationEmails({
      id: inquiry.id,
      refId: inquiry.refId,
      guestName: inquiry.guestName,
      phone: inquiry.phone,
      email: inquiry.email,
      packageName: inquiry.packageName || undefined,
      roomName: inquiry.roomName,
      roomCode: inquiry.roomCode || undefined,
      checkIn: inquiry.checkIn,
      checkOut: inquiry.checkOut || undefined,
      nights: inquiry.nights,
      guestsCount: inquiry.guestsCount,
      roomsCount: inquiry.roomsCount,
      totalAmount: inquiry.totalAmount,
      paidAmount: inquiry.paidAmount,
      paymentStatus: inquiry.paymentStatus,
      status: inquiry.status,
      date: inquiry.date,
      specialRequests: inquiry.specialRequests,
    }).catch((err) => {
      console.error("Async hotel email dispatch error:", err);
    });

    return NextResponse.json({
      success: true,
      inquiry,
      message: "Hotel reservation inquiry submitted successfully.",
    });
  } catch (error: any) {
    console.error("Error submitting hotel inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit reservation inquiry. Please call our 24/7 helpline." },
      { status: 500 }
    );
  }
}
