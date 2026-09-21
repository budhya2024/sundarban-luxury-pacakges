import React from "react";
import { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tourPackages } from "@/db/schema";
import { initialAdminPackages } from "@/lib/admin-data";
import { TourDetails } from "@/components/tour/TourDetails";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getTourPackage(slug);

  const title = pkg?.name
    ? `${pkg.name} | Sundarban Luxury Package`
    : `${slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} | Sundarban Luxury Package`;

  const description =
    pkg?.overview ||
    pkg?.subtitle ||
    `Detailed itinerary, food menu, pricing and inclusions for ${title}. Book your luxury Sundarban mangrove safari today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: pkg?.bannerImage || pkg?.image ? [pkg.bannerImage || pkg.image] : [],
    },
  };
}

export default async function DynamicTourDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getTourPackage(slug);

  const fallbackTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <TourDetails
      packageSlug={slug}
      packageName={pkg?.name || fallbackTitle}
      packageSubtitle={pkg?.subtitle || undefined}
      initialPackage={pkg as any}
    />

  );
}
