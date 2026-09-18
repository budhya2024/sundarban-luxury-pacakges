"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroBookingBar } from "./HeroBookingBar";

export function HeroSlider() {
  const [smoothScroll, setSmoothScroll] = useState(0);

  useEffect(() => {
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let animationFrameId: number;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const updateSmoothScroll = () => {
      // Linear interpolation (lerp) for buttery smooth 60fps momentum
      currentScroll += (targetScroll - currentScroll) * 0.09;
      setSmoothScroll(currentScroll);

      animationFrameId = requestAnimationFrame(updateSmoothScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateSmoothScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Smooth scroll progression (0 to 1 over first 280px of scrolling)
  const progress = Math.min(Math.max(smoothScroll / 260, 0), 1);

  // Title 1 ("Sundarban Luxury Packages") zoom-out & fade-out transformations
  const title1Opacity = Math.max(1 - progress * 2.2, 0);
  const title1Scale = 1 - progress * 0.35;
  const title1Blur = progress * 4;
  const title1TranslateY = progress * 25;

  // Title 2 ("Book Your Trip") fade-in & scale-in transformations
  const title2Progress = Math.min(Math.max((progress - 0.35) / 0.5, 0), 1);
  const title2Opacity = title2Progress;
  const title2Scale = 0.9 + title2Progress * 0.1;
  const title2TranslateY = (1 - title2Progress) * 15;

  // Background parallax depth
  const bgScale = 1 + progress * 0.06;

  return (
    <section className="relative w-full min-h-[calc(100svh-104px)] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] overflow-hidden bg-[#052e16] flex flex-col justify-between items-center pt-8 sm:pt-16 md:pt-24 pb-4 sm:pb-8 md:pb-10">
      {/* Background Image with Smooth Depth Zoom */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/assets/images/tiger-photo.jpg"
          alt="Sundarban Luxury Package"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Luxury Dark & Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Center & Middle Title Area with Dynamic Sequential Title Transition */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center will-change-transform pointer-events-none my-auto min-h-[80px] sm:min-h-[100px]">
        {/* 1. First Title: Sundarban Luxury Packages (Fades/Zooms Out) */}
        <div
          className="absolute text-center px-4 sm:px-6 max-w-4xl mx-auto transition-opacity duration-75"
          style={{
            transform: `scale(${title1Scale}) translateY(${title1TranslateY}px)`,
            opacity: title1Opacity,
            filter: title1Blur > 0.1 ? `blur(${title1Blur}px)` : "none",
            pointerEvents: title1Opacity > 0.1 ? "auto" : "none",
          }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] uppercase tracking-wide">
            Sundarban Luxury Packages
          </h1>
        </div>

        {/* 2. Second Title: Book Your Trip (Smaller & Sits Close to Form) */}
        <div
          className="absolute bottom-1 sm:bottom-2 text-center px-4 sm:px-6 max-w-2xl mx-auto transition-opacity duration-75"
          style={{
            transform: `scale(${title2Scale}) translateY(${title2TranslateY}px)`,
            opacity: title2Opacity,
            pointerEvents: title2Opacity > 0.1 ? "auto" : "none",
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] uppercase tracking-wider">
            Book Your <span className="text-[#fbbf24]">Trip</span>
          </h2>
        </div>
      </div>

      {/* Bottom Anchored Static Booking Form Component */}
      <div className="relative z-20 w-full mt-2 sm:mt-3">
        <HeroBookingBar />
      </div>
    </section>
  );
}

export default HeroSlider;

