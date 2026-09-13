import React from "react";
import { Metadata } from "next";
import { TourDetails } from "@/components/tour/TourDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Sundarban Luxury Package`,
    description: `Detailed itinerary, menu, pricing and inclusions for ${formattedTitle}. Book your luxury Sundarban mangrove safari today.`,
  };
}

export default async function DynamicTourDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return <TourDetails packageSlug={slug} packageName={formattedTitle} />;
}
