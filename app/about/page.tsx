import React from "react";
import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import { BestServiceSection } from "@/components/about/BestServiceSection";
import { TrustSection } from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const metadata: Metadata = {
  title: "About Us | Sundarban Luxury Package & Safari Cruises",
  description:
    "Learn about Sundarban Luxury Package. We provide 5-star solar-powered eco river cruises, expert tiger safari watchtower expeditions, and luxury hospitality in the Sundarban mangrove delta.",
  openGraph: {
    title: "About Us | Sundarban Luxury Package & Safari Cruises",
    description:
      "Learn about Sundarban Luxury Package. We provide 5-star solar-powered eco river cruises, expert tiger safari watchtower expeditions, and luxury hospitality in the Sundarban mangrove delta.",
    url: "https://sundarbanluxurypackage.com/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Sundarban Luxury Package",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Sundarban Luxury Package & Safari Cruises",
    description:
      "Learn about Sundarban Luxury Package. We provide 5-star eco river cruises and luxury hospitality.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutStorySection />
      <BestServiceSection />
      <TrustSection />
      <TestimonialsSection />
    </main>
  );
}
