import React from "react";
import { Metadata } from "next";
import { TourDetails } from "@/components/tour/TourDetails";

export const metadata: Metadata = {
  title: "Sundarban 2 Nights 3 Days Package Details | Sundarban Luxury Package",
  description:
    "Book Sundarban 2 Nights 3 Days Complete Tiger Trail Safari Package. Experience luxury boat cruise safaris, forest watchtowers, Dobanki canopy walk, local folk dance, and chef-cooked meals from Kolkata.",
};

export default function TourDetailsPage() {
  return (
    <TourDetails
      packageSlug="2-nights-3-days-tiger-trail"
      packageName="2 Nights 3 Days Complete Tiger Trail Expedition"
    />
  );
}
