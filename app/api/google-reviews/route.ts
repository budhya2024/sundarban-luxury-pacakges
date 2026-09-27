import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonialSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const settingsList = await db
      .select()
      .from(testimonialSettings)
      .where(eq(testimonialSettings.id, "default"))
      .limit(1);

    const settings = settingsList[0];
    const featurableId = settings?.featurableId;
    const placeId = settings?.googlePlaceId || "ChIJ74-8t225-TkRk9b3Psm9Fz8";
    const apiKey = settings?.googleApiKey;

    // Allow featurableId from query param or fallback to database settings
    const paramFeaturableId = req.nextUrl.searchParams.get("featurableId");
    const activeFeaturableId = paramFeaturableId || featurableId;

    // Helper to calculate human-readable relative time
    const formatRelativeTime = (dateStr?: string): string => {
      if (!dateStr) return "Recently";
      try {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays <= 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks === 1) return "1 week ago";
        if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths === 1) return "1 month ago";
        if (diffMonths < 12) return `${diffMonths} months ago`;
        const diffYears = Math.floor(diffDays / 365);
        return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
      } catch {
        return "Recently";
      }
    };

    // 1. If Featurable ID is configured, fetch live from Featurable v2 API
    if (activeFeaturableId) {
      try {
        const res = await fetch(`https://api.featurable.com/v2/widgets/${activeFeaturableId}`, {
          next: { revalidate: 1800 },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.widget) {
            const rawReviews = data.widget.reviews || [];
            const summary = data.widget.gbpLocationSummary || {};

            const formattedReviews = rawReviews.map((r: any) => ({
              id: r.id,
              name: r.author?.name || "Google Traveler",
              role: "Verified Google Reviewer",
              avatar:
                r.author?.avatarUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
              rating: r.rating?.value ?? 5,
              date: r.publishedAt ? r.publishedAt.slice(0, 10) : "",
              relativeTime: formatRelativeTime(r.publishedAt),
              text: r.text || r.originalText || "",
              isLocalGuide: false,
              url: r.url || summary.writeAReviewUri || null,
            }));

            return NextResponse.json({
              success: true,
              source: "featurable",
              rating: summary.rating || 4.9,
              reviewsCount: summary.reviewsCount || formattedReviews.length,
              writeAReviewUri:
                summary.writeAReviewUri || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
              reviews: formattedReviews,
            });
          }
        }
      } catch (fErr) {
        console.warn("Featurable v2 fetch failed:", fErr);
      }
    }

    // 2. If Google API Key is configured, fetch live via direct Google Places API
    if (apiKey) {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
          placeId
        )}&fields=reviews,rating,user_ratings_total&key=${encodeURIComponent(apiKey)}`;
        const gRes = await fetch(url);
        if (gRes.ok) {
          const gData = await gRes.json();
          if (gData.status === "OK") {
            const formattedReviews = (gData.result?.reviews || []).map((r: any) => ({
              reviewId: r.author_name + "_" + (r.time || Date.now()),
              reviewer: {
                displayName: r.author_name || "Google Traveler",
                profilePhotoUrl: r.profile_photo_url || "",
                isAnonymous: !r.author_name,
              },
              starRating: r.rating || 5,
              comment: r.text || "",
              createTime: r.time ? new Date(r.time * 1000).toISOString() : null,
              relativeTime: r.relative_time_description || "",
            }));

            return NextResponse.json({
              success: true,
              source: "google-places-api",
              rating: gData.result?.rating,
              totalReviews: gData.result?.user_ratings_total,
              reviews: formattedReviews,
            });
          }
        }
      } catch (gErr) {
        console.warn("Google Places API fetch failed:", gErr);
      }
    }

    // 3. Return verified business profile metadata for direct maps linking
    return NextResponse.json({
      success: true,
      source: "maps-profile",
      placeId,
      placeUrl: settings?.googlePlaceUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
      rating: settings?.googleRating || 4.9,
      reviewsCount: settings?.googleReviewsCount || 284,
    });
  } catch (error: any) {
    console.error("Live Google reviews fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch live Google reviews" },
      { status: 500 }
    );
  }
}
