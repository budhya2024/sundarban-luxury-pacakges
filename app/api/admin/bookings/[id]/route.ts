import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { bookings, hotelInquiries } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.bookingStatus !== undefined) updateData.bookingStatus = body.bookingStatus;
    if (body.paymentStatus !== undefined) updateData.paymentStatus = body.paymentStatus;
    if (body.paidAmount !== undefined) updateData.paidAmount = parseInt(body.paidAmount, 10);
    if (body.totalAmount !== undefined) updateData.totalAmount = parseInt(body.totalAmount, 10);
    if (body.guestName !== undefined) updateData.guestName = body.guestName;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.travelDate !== undefined) updateData.travelDate = body.travelDate;
    if (body.guestsCount !== undefined) updateData.guestsCount = parseInt(body.guestsCount, 10);
    if (body.packageOrRoom !== undefined) updateData.packageOrRoom = body.packageOrRoom;
    if (body.specialRequests !== undefined) updateData.specialRequests = body.specialRequests;

    const [updated] = await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Mirror updates to hotel_inquiries if applicable
    try {
      const inquiryUpdateData: Record<string, any> = {
        updatedAt: new Date(),
      };
      if (body.bookingStatus !== undefined) {
        inquiryUpdateData.status = body.bookingStatus;
      }
      if (body.paymentStatus !== undefined) {
        inquiryUpdateData.paymentStatus =
          body.paymentStatus === "Unpaid" ? "Pending" : body.paymentStatus;
      }
      if (body.paidAmount !== undefined) {
        inquiryUpdateData.paidAmount = parseInt(body.paidAmount, 10);
      }
      if (body.specialRequests !== undefined) {
        inquiryUpdateData.specialRequests = body.specialRequests;
      }

      const strippedId = id.startsWith("b-") ? id.slice(2) : id;
      await db
        .update(hotelInquiries)
        .set(inquiryUpdateData)
        .where(
          or(
            eq(hotelInquiries.id, strippedId),
            eq(hotelInquiries.refId, updated.bookingCode)
          )
        );
    } catch (mirrorErr) {
      console.error("Mirror to hotelInquiries table update error:", mirrorErr);
    }

    const formattedCreatedAt = updated.createdAt
      ? new Date(updated.createdAt).toISOString().replace("T", " ").substring(0, 16)
      : "";

    return NextResponse.json({
      success: true,
      booking: {
        ...updated,
        createdAt: formattedCreatedAt,
      },
    });
  } catch (error: any) {
    console.error("Admin update booking error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  return PUT(req, props);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db
      .select({ bookingCode: bookings.bookingCode })
      .from(bookings)
      .where(eq(bookings.id, id))
      .limit(1);

    await db.delete(bookings).where(eq(bookings.id, id));

    try {
      const strippedId = id.startsWith("b-") ? id.slice(2) : id;
      if (existing.length > 0 && existing[0].bookingCode) {
        await db
          .delete(hotelInquiries)
          .where(
            or(
              eq(hotelInquiries.id, strippedId),
              eq(hotelInquiries.refId, existing[0].bookingCode)
            )
          );
      } else {
        await db
          .delete(hotelInquiries)
          .where(eq(hotelInquiries.id, strippedId));
      }
    } catch (mirrorErr) {
      console.error("Mirror to hotelInquiries table delete error:", mirrorErr);
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete booking error:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
