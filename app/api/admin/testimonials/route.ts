import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { initialAdminTestimonials } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.order), desc(testimonials.createdAt));

    return NextResponse.json({
      success: true,
      testimonials: items.length > 0 ? items : initialAdminTestimonials,
    });
  } catch (error: any) {
    console.error("Admin get testimonials error:", error);
    return NextResponse.json({
      success: true,
      testimonials: initialAdminTestimonials,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id || `test-${Date.now()}`;
    const name = (body.name || "").trim();
    const text = (body.text || "").trim();

    if (!name || !text) {
      return NextResponse.json(
        { error: "Reviewer name and review text are required" },
        { status: 400 }
      );
    }

    const [newItem] = await db
      .insert(testimonials)
      .values({
        id,
        name,
        role: body.role || "Guest",
        avatar: body.avatar || "/assets/images/avatars/andrew.jpg",
        rating: typeof body.rating === "number" ? body.rating : 5,
        text,
        tourPackage: body.tourPackage || "Sundarban Luxury Expedition",
        date: body.date || "Recently",
        featured: !!body.featured,
        status: body.status || "Active",
        source: body.source || "manual",
        order: typeof body.order === "number" ? body.order : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      testimonial: newItem,
      message: "Review added successfully",
    });
  } catch (error: any) {
    console.error("Admin create testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
