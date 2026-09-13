"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <div className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
      {/* Background Image with Dark Black Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000')`,
        }}
      />

      {/* Deep Black Gradient Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          Pioneering Luxury In Sundarban
        </h1>

        {/* Subdescription */}
        <p className="max-w-2xl text-white/75 mt-3 text-sm sm:text-base mx-auto font-medium font-normal">
          We blend five-star hospitality with deep ecological conservation. Experience the wild beauty of the UNESCO World Heritage mangrove forest aboard our solar-powered luxury vessels.
        </p>

        {/* Breadcrumbs (Double arrow » separator matching reference photo) */}
        <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white">
          <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
            Home
          </Link>
          <span className="text-white font-bold">»</span>
          <span className="text-[#fbbf24]">About Us</span>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
