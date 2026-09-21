import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET all tour packages for Admin
export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const packages = await db
      .select()
      .from(tourPackages)
      .orderBy(desc(tourPackages.createdAt));

    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    console.error("Admin get packages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour packages" },
      { status: 500 }
    );
  }
}

// POST create a new tour package
export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      subtitle,
      duration,
      price,
      originalPrice,
      category,
      rating,
      reviewsCount,
      image,
      bannerImage,
      gallery,
      status,
      maxGuests,
      departure,
      pickupDrop,
      mealsSummary,
      minGroupSize,
      overview,
      highlightQuote,
      itinerary,
      foodMenu,
      inclusions,
      exclusions,
      thingsToCarry,
      childPolicy,
      importantNotes,
      helplinePhone,
      featured,
    } = body;

    if (!name || !duration || price === undefined) {
      return NextResponse.json(
        { error: "Name, duration, and price are required" },
        { status: 400 }
      );
    }

    let finalSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!finalSlug) {
      finalSlug = `tour-${Date.now()}`;
    }

    // Ensure unique slug
    const existing = await db
      .select({ id: tourPackages.id })
      .from(tourPackages)
      .where(eq(tourPackages.slug, finalSlug))
      .limit(1);

    if (existing.length > 0) {
      finalSlug = `${finalSlug}-${Math.floor(100 + Math.random() * 900)}`;
    }

    const newId = body.id || `pkg-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const [newPkg] = await db
      .insert(tourPackages)
      .values({
        id: newId,
        name: name.trim(),
        slug: finalSlug,
        subtitle: subtitle || "",
        duration: duration.trim(),
        price: Number(price) || 0,
        originalPrice: Number(originalPrice) || Number(price) || 0,
        category: category || "Luxury Cruise",
        rating: Number(rating) || 4.9,
        reviewsCount: Number(reviewsCount) || 0,
        image: image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
        bannerImage: bannerImage || image || "",
        gallery: Array.isArray(gallery) ? gallery : [],
        status: status || "Active",
        maxGuests: Number(maxGuests) || 40,
        departure: departure || "Godkhali Ferry Ghat (8:30 AM)",
        pickupDrop: pickupDrop || "Kolkata / Canning / Godkhali",
        mealsSummary: mealsSummary || "All Meals Included",
        minGroupSize: minGroupSize || "Min 2 People",
        overview: overview || "",
        highlightQuote: highlightQuote || "",
        itinerary: Array.isArray(itinerary) ? itinerary : [],
        foodMenu: Array.isArray(foodMenu) ? foodMenu : [],
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        exclusions: Array.isArray(exclusions) ? exclusions : [],
        thingsToCarry: Array.isArray(thingsToCarry) ? thingsToCarry : [],
        childPolicy: Array.isArray(childPolicy) ? childPolicy : [],
        importantNotes: Array.isArray(importantNotes) ? importantNotes : [],
        helplinePhone: helplinePhone || "+91 70014 03498",
        featured: Boolean(featured),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ success: true, package: newPkg });
  } catch (error: any) {
    console.error("Admin create package error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create tour package" },
      { status: 500 }
    );
  }
}
