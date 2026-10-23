import React from "react";
import { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactFormSection } from "@/components/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | Sundarban Luxury Package & Safari Cruises",
  description:
    "Get in touch with Sundarban Luxury Packages. Book 24/7 tiger safari river cruises, private charters, and eco-luxury resort stays in the Sundarban mangrove delta.",
  openGraph: {
    title: "Contact Us | Sundarban Luxury Package & Safari Cruises",
    description:
      "Get in touch with Sundarban Luxury Packages. Book 24/7 tiger safari river cruises, private charters, and eco-luxury resort stays in the Sundarban mangrove delta.",
    url: "https://sundarbanluxurypackage.com/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Sundarban Luxury Package",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Sundarban Luxury Package & Safari Cruises",
    description:
      "Get in touch with Sundarban Luxury Packages. Book 24/7 tiger safari river cruises and resort stays.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
    </main>
  );
}
