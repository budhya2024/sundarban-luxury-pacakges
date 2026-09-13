import React from "react";
import { Metadata } from "next";
import { TourDetails } from "@/components/tour/TourDetails";

export const metadata: Metadata = {
  title: "Sundarban 1 Night 2 Days Package Details | Sundarban Luxury Package",
  description:
    "Book Sundarban 1 Night 2 Days Tour Package. Experience luxury boat cruise safaris, forest watchtowers, local folk dance, and chef-cooked meals from Kolkata.",
};

export default function TourDetailsPage() {
  return <TourDetails />;
}
