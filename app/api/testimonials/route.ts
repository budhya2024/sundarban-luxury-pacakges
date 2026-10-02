import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials, testimonialSettings } from "@/db/schema";
import { initialAdminTestimonials } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settingsList = await db
      .select()
      .from(testimonialSettings)
      .where(eq(testimonialSettings.id, "default"))
      .limit(1);

    const settings = settingsList[0] || {
      id: "default",
      displayMode: "google",
      googlePlaceId: "ChIJ74-8t225-TkRk9b3Psm9Fz8",
      googlePlaceUrl: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
      featurableId: "",
      googleApiKey: "",
      googleRating: 4.9,
      googleReviewsCount: 284,
      googleBadgeText: "Verified Google Business Rating",
    };

    const allTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "Active"))
      .orderBy(asc(testimonials.order));

    const manualItems = allTestimonials.filter((t) => t.source === "manual");
    const googleItems = allTestimonials.filter((t) => t.source === "google");

    return NextResponse.json({
      success: true,
      displayMode: settings.displayMode,
      settings,
      testimonials: allTestimonials.length > 0 ? allTestimonials : initialAdminTestimonials,
      manualTestimonials: manualItems.length > 0 ? manualItems : initialAdminTestimonials,
      googleReviews: googleItems,
    });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({
      success: true,
      displayMode: "google",
      settings: {
        id: "default",
        displayMode: "google",
        googlePlaceId: "ChIJ74-8t225-TkRk9b3Psm9Fz8",
        googlePlaceUrl: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
        googleRating: 4.9,
        googleReviewsCount: 284,
        googleBadgeText: "Verified Google Business Rating",
      },
      testimonials: initialAdminTestimonials,
      manualTestimonials: initialAdminTestimonials,
      googleReviews: [],
    });
  }
}
