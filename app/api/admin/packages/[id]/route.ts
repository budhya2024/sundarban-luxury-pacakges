import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";
import { deleteFromStorage } from "@/lib/s3";

export const dynamic = "force-dynamic";

// GET package by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const [pkg] = await db
      .select()
      .from(tourPackages)
      .where(eq(tourPackages.id, id))
      .limit(1);

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: pkg });
  } catch (error: any) {
    console.error("Admin get package by ID error:", error);
    return NextResponse.json(
      { error: "Failed to fetch package" },
      { status: 500 }
    );
  }
}

// PUT update package by ID
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

    const [existing] = await db
      .select()
      .from(tourPackages)
      .where(eq(tourPackages.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Clean up replaced images from Neon Object Storage if updated
    if (body.image && existing.image && body.image !== existing.image) {
      deleteFromStorage(existing.image).catch((err) =>
        console.warn("Failed to delete previous package cover image from storage:", err)
      );
    }
    if (body.bannerImage && existing.bannerImage && body.bannerImage !== existing.bannerImage) {
      deleteFromStorage(existing.bannerImage).catch((err) =>
        console.warn("Failed to delete previous package banner image from storage:", err)
      );
    }

    // If slug changed, ensure uniqueness
    let finalSlug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      finalSlug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const slugCollision = await db
        .select({ id: tourPackages.id })
        .from(tourPackages)
        .where(eq(tourPackages.slug, finalSlug))
        .limit(1);

      if (slugCollision.length > 0 && slugCollision[0].id !== id) {
        finalSlug = `${finalSlug}-${Math.floor(100 + Math.random() * 900)}`;
      }
    }

    const [updatedPkg] = await db
      .update(tourPackages)
      .set({
        name: body.name !== undefined ? body.name.trim() : existing.name,
        slug: finalSlug,
        subtitle: body.subtitle !== undefined ? body.subtitle : existing.subtitle,
        duration: body.duration !== undefined ? body.duration.trim() : existing.duration,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        originalPrice: body.originalPrice !== undefined ? Number(body.originalPrice) : existing.originalPrice,
        category: body.category !== undefined ? body.category : existing.category,
        rating: body.rating !== undefined ? Number(body.rating) : existing.rating,
        reviewsCount: body.reviewsCount !== undefined ? Number(body.reviewsCount) : existing.reviewsCount,
        image: body.image !== undefined ? body.image : existing.image,
        bannerImage: body.bannerImage !== undefined ? body.bannerImage : existing.bannerImage,
        gallery: Array.isArray(body.gallery) ? body.gallery : existing.gallery,
        status: body.status !== undefined ? body.status : existing.status,
        maxGuests: body.maxGuests !== undefined ? Number(body.maxGuests) : existing.maxGuests,
        departure: body.departure !== undefined ? body.departure : existing.departure,
        pickupDrop: body.pickupDrop !== undefined ? body.pickupDrop : existing.pickupDrop,
        mealsSummary: body.mealsSummary !== undefined ? body.mealsSummary : existing.mealsSummary,
        minGroupSize: body.minGroupSize !== undefined ? body.minGroupSize : existing.minGroupSize,
        overview: body.overview !== undefined ? body.overview : existing.overview,
        highlightQuote: body.highlightQuote !== undefined ? body.highlightQuote : existing.highlightQuote,
        itinerary: Array.isArray(body.itinerary) ? body.itinerary : existing.itinerary,
        foodMenu: Array.isArray(body.foodMenu) ? body.foodMenu : existing.foodMenu,
        inclusions: Array.isArray(body.inclusions) ? body.inclusions : existing.inclusions,
        exclusions: Array.isArray(body.exclusions) ? body.exclusions : existing.exclusions,
        thingsToCarry: Array.isArray(body.thingsToCarry) ? body.thingsToCarry : existing.thingsToCarry,
        childPolicy: Array.isArray(body.childPolicy) ? body.childPolicy : existing.childPolicy,
        importantNotes: Array.isArray(body.importantNotes) ? body.importantNotes : existing.importantNotes,
        helplinePhone: body.helplinePhone !== undefined ? body.helplinePhone : existing.helplinePhone,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        updatedAt: new Date(),
      })
      .where(eq(tourPackages.id, id))
      .returning();

    return NextResponse.json({ success: true, package: updatedPkg });
  } catch (error: any) {
    console.error("Admin update package error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update package" },
      { status: 500 }
    );
  }
}

// DELETE package by ID
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
    const [existing] = await db
      .select()
      .from(tourPackages)
      .where(eq(tourPackages.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Clean up images in Neon Object Storage
    const imagesToDelete: string[] = [];
    if (existing.image) imagesToDelete.push(existing.image);
    if (existing.bannerImage) imagesToDelete.push(existing.bannerImage);
    if (Array.isArray(existing.gallery)) {
      imagesToDelete.push(...existing.gallery);
    }

    // Trigger asynchronous deletion for all package media from Neon Object Storage
    await Promise.allSettled(
      imagesToDelete.map((imgUrl) => deleteFromStorage(imgUrl))
    );

    // Delete record from database
    await db.delete(tourPackages).where(eq(tourPackages.id, id));

    return NextResponse.json({
      success: true,
      message: `Package "${existing.name}" and associated storage assets deleted successfully`,
    });
  } catch (error: any) {
    console.error("Admin delete package error:", error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
