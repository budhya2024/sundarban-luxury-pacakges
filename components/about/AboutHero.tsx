"use client";

import React from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export function AboutHero() {
  const { pageContents } = useAdmin();
  const aboutPage = pageContents.find((p) => p.pageKey === "about");

  const title = aboutPage?.heroTitle || "Pioneering Luxury In Sundarban";
  const subtitle = aboutPage?.heroSubtitle || "";
  const bgImage = aboutPage?.heroBackgroundImage || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
      {/* Background Image with Dark Black Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 transition-all duration-700"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />

      {/* Deep Black Gradient Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-3">
          {title}
        </h1>

        {/* Hero Description */}
        {subtitle && (
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed mb-6 drop-shadow-sm">
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs */}
        <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white">
          <Link href="/" className="text-white hover:text-secondary transition-colors">
            Home
          </Link>
          <span className="text-white font-bold">»</span>
          <span className="text-secondary">About Us</span>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
