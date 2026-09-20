import { NextRequest, NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { hotelInquiries, bookings } from "@/db/schema";
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

    if (body.status !== undefined) updateData.status = body.status;
    if (body.paymentStatus !== undefined) updateData.paymentStatus = body.paymentStatus;
    if (body.paidAmount !== undefined) updateData.paidAmount = parseInt(body.paidAmount, 10);
    if (body.specialRequests !== undefined) updateData.specialRequests = body.specialRequests;

    const [updated] = await db
      .update(hotelInquiries)
      .set(updateData)
      .where(eq(hotelInquiries.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    // Mirror updates to unified bookings table
    try {
      const bookingUpdateData: Record<string, any> = {
        updatedAt: new Date(),
      };
      if (body.status !== undefined) {
        bookingUpdateData.bookingStatus =
          body.status === "Checked In" ? "Confirmed" : body.status;
      }
      if (body.paymentStatus !== undefined) {
        bookingUpdateData.paymentStatus =
          body.paymentStatus === "Pending" ? "Unpaid" : body.paymentStatus;
      }
      if (body.paidAmount !== undefined) {
        bookingUpdateData.paidAmount = parseInt(body.paidAmount, 10);
      }
      if (body.specialRequests !== undefined) {
        bookingUpdateData.specialRequests = body.specialRequests;
      }

      await db
        .update(bookings)
        .set(bookingUpdateData)
        .where(
          or(
            eq(bookings.id, `b-${id}`),
            eq(bookings.bookingCode, updated.refId)
          )
        );
    } catch (mirrorErr) {
      console.error("Mirror to bookings table update error:", mirrorErr);
    }

    return NextResponse.json({
      success: true,
      inquiry: updated,
      message: "Inquiry updated successfully.",
    });
  } catch (error: any) {
    console.error("Admin update hotel inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
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
      .select({ refId: hotelInquiries.refId })
      .from(hotelInquiries)
      .where(eq(hotelInquiries.id, id))
      .limit(1);

    await db.delete(hotelInquiries).where(eq(hotelInquiries.id, id));

    try {
      if (existing.length > 0 && existing[0].refId) {
        await db
          .delete(bookings)
          .where(
            or(
              eq(bookings.id, `b-${id}`),
              eq(bookings.bookingCode, existing[0].refId)
            )
          );
      } else {
        await db.delete(bookings).where(eq(bookings.id, `b-${id}`));
      }
    } catch (mirrorErr) {
      console.error("Mirror to bookings table delete error:", mirrorErr);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin delete hotel inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
