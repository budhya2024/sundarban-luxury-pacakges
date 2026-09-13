import React from "react";
import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutTeamSection } from "@/components/about/AboutTeamSection";
import { TrustSection } from "@/components/home/TrustSection";

export const metadata: Metadata = {
  title: "About Us | Sundarban Luxury Package & Safari Cruises",
  description:
    "Learn about Sundarban Luxury Package. We provide 5-star solar-powered eco river cruises, expert tiger safari watchtower expeditions, and luxury hospitality in the Sundarban mangrove delta.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutStorySection />
      <AboutMissionVision />
      <TrustSection />
      <AboutTeamSection />
    </main>
  );
}
