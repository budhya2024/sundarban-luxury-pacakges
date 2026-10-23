import React from "react";
import { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { initialAdminPackages } from "@/lib/admin-data";
import { TourDetails } from "@/components/tour/TourDetails";

export const metadata: Metadata = {
  title: "Sundarban 2 Nights 3 Days Package Details | Sundarban Luxury Package",
  description:
    "Book Sundarban 2 Nights 3 Days Complete Tiger Trail Safari Package. Experience luxury boat cruise safaris, forest watchtowers, Dobanki canopy walk, local folk dance, and chef-cooked meals from Kolkata.",
};

async function getTourPackage(slug: string) {
  try {
    const [pkg] = await db
      .select()
      .from(tourPackages)
      .where(eq(tourPackages.slug, slug))
      .limit(1);

    if (pkg) return pkg;
  } catch (err) {
    console.error("Error fetching package server-side:", err);
  }

  return initialAdminPackages.find((p) => p.slug === slug) || null;
}

export default async function TourDetailsPage() {
  const pkg = await getTourPackage("2-nights-3-days-tiger-trail");

  return (
    <TourDetails
      packageSlug="2-nights-3-days-tiger-trail"
      packageName={pkg?.name || "2 Nights 3 Days Complete Tiger Trail Expedition"}
      packageSubtitle={pkg?.subtitle || undefined}
      initialPackage={pkg as any}
    />
  );
}
