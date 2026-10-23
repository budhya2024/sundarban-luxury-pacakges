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
      googlePlaceId: "ChIJtRQ1dQCLAToR6rAo34zLXEo",
      googlePlaceUrl: "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
      featurableId: "3244b520-3369-414c-a09e-339ea6dbd9e9",
      googleApiKey: "",
      googleRating: 4.9,
      googleReviewsCount: 32,
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
      testimonials: allTestimonials,
      manualTestimonials: manualItems,
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
        googlePlaceId: "ChIJtRQ1dQCLAToR6rAo34zLXEo",
        googlePlaceUrl: "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
        googleRating: 4.9,
        googleReviewsCount: 32,
        googleBadgeText: "Verified Google Business Rating",
      },
      testimonials: [],
      manualTestimonials: [],
      googleReviews: [],
    });
  }
}
