import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonialSettings } from "@/db/schema";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settingsList = await db
      .select()
      .from(testimonialSettings)
      .where(eq(testimonialSettings.id, "default"))
      .limit(1);

    const settings = settingsList[0] || {
      id: "default",
      displayMode: "google",
      googlePlaceId: "ChIJtRQ1dQCLAToR6rAo34zLXEo",
      googlePlaceUrl:
        "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
      featurableId: "3244b520-3369-414c-a09e-339ea6dbd9e9",
      googleApiKey: "",
      googleRating: 4.9,
      googleReviewsCount: 32,
      googleBadgeText: "Verified Google Business Rating",
    };

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("Admin get testimonial settings error:", error);
    return NextResponse.json(
      { error: "Failed to load testimonial settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminRequest(req);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      displayMode,
      googlePlaceId,
      googlePlaceUrl,
      featurableId,
      googleApiKey,
      googleRating,
      googleReviewsCount,
      googleBadgeText,
    } = body;

    const existing = await db
      .select()
      .from(testimonialSettings)
      .where(eq(testimonialSettings.id, "default"))
      .limit(1);

    const updateFields: any = {
      updatedAt: new Date(),
    };
    if (displayMode !== undefined) updateFields.displayMode = displayMode;
    if (googlePlaceId !== undefined) updateFields.googlePlaceId = googlePlaceId;
    if (googlePlaceUrl !== undefined) updateFields.googlePlaceUrl = googlePlaceUrl;
    if (featurableId !== undefined) updateFields.featurableId = featurableId;
    if (googleApiKey !== undefined) updateFields.googleApiKey = googleApiKey;
    if (googleRating !== undefined) updateFields.googleRating = Number(googleRating);
    if (googleReviewsCount !== undefined) updateFields.googleReviewsCount = Number(googleReviewsCount);
    if (googleBadgeText !== undefined) updateFields.googleBadgeText = googleBadgeText;

    if (existing.length === 0) {
      await db.insert(testimonialSettings).values({
        id: "default",
        displayMode: displayMode || "google",
        googlePlaceId: googlePlaceId || "ChIJtRQ1dQCLAToR6rAo34zLXEo",
        googlePlaceUrl:
          googlePlaceUrl ||
          "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
        featurableId: featurableId || "3244b520-3369-414c-a09e-339ea6dbd9e9",
        googleApiKey: googleApiKey || "",
        googleRating: googleRating ? Number(googleRating) : 4.9,
        googleReviewsCount: googleReviewsCount ? Number(googleReviewsCount) : 32,
        googleBadgeText: googleBadgeText || "Verified Google Business Rating",
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(testimonialSettings)
        .set(updateFields)
        .where(eq(testimonialSettings.id, "default"));
    }

    const [updated] = await db
      .select()
      .from(testimonialSettings)
      .where(eq(testimonialSettings.id, "default"))
      .limit(1);

    return NextResponse.json({
      success: true,
      settings: updated,
      message: `Testimonials mode set to ${updated.displayMode === "google" ? "Google Reviews" : "Manual Testimonials"}`,
    });
  } catch (error: any) {
    console.error("Admin update testimonial settings error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial settings" },
      { status: 500 }
    );
  }
}
