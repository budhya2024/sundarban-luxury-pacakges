"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SlideItem {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

const slides: SlideItem[] = [
  {
    id: "tiger-safari",
    tagline: "Explore The Wild Delta",
    title: "Unforgettable Royal Bengal Tiger Safaris",
    subtitle:
      "Embark on 5-star solar-powered cruises deep into the UNESCO World Heritage mangrove creeks of Sundarban.",
    image:
      "/assets/images/sonarbanglahotel.jpg",
    ctaText: "Explore Packages",
    ctaHref: "/tour-details",
  },
  {
    id: "luxury-cruise",
    tagline: "Luxury Eco Rivers",
    title: "5-Star AC Vessel Suites & Fine Dining",
    subtitle:
      "Experience royal comfort with panoramic observation decks, chef-curated cuisine, and 24/7 personalized concierge service.",
    image:
      "/assets/images/tiger-photo.jpg",
    ctaText: "View Cruise Itinerary",
    ctaHref: "/tour-details",
  },
  {
    id: "sonar-bangla",
    tagline: "Hotel Sonar Bangla Stay",
    title: "Exclusive Hotel Sonar Bangla Packages",
    subtitle:
      "Combine 5-star luxury resort stays with watchtower canopy walks, local folk shows, and private boat safaris.",
    image:
      "/assets/images/sonar-bangla-hotel-ambience.jpg",
    ctaText: "Book Sonar Bangla Stay",
    ctaHref: "/contact",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const slideDuration = 6000; // 6 seconds per slide

  // Autoplay Timer & Progress Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isPlaying) {
      setProgress(0);

      const startTime = Date.now();
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / slideDuration) * 100, 100);
        setProgress(currentProgress);
      }, 50);

      timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, slideDuration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentSlide, isPlaying]);



  return (
    <section className="relative w-full h-[520px] sm:h-[600px] md:h-[660px] lg:h-[700px] overflow-hidden bg-[#052e16]">
      {/* Slides Background Images with Ken Burns Zoom Effect */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Ken Burns Zoom Effect Image Container */}
            <div
              className={`relative w-full h-full transition-transform duration-[7000ms] ease-out ${isActive ? "scale-110" : "scale-100"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>

            {/* Dark Deep Black Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        );
      })}

      {/* Main Content Overlay - Vertically Centered in Middle */}
      <div className="relative z-20 h-full flex flex-col justify-center py-10 md:py-16">
        <div className="container">
          <div className="max-w-3xl space-y-4 sm:space-y-6">

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl  font-black text-white leading-snug  drop-shadow-md">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-lg font-light leading-relaxed max-w-2xl drop-shadow-sm">
              {slides[currentSlide].subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <Link
                href={slides[currentSlide].ctaHref}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#d97706] hover:bg-[#064e3b] text-white px-7 py-3.5 font-bold text-sm sm:text-base shadow-xl transition-all duration-300 group"
              >
                <span>{slides[currentSlide].ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-7 py-3.5 font-bold text-sm sm:text-base transition-all duration-300"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slide Indicators */}
      <div className="absolute bottom-5 sm:bottom-7 left-0 right-0 z-30 pointer-events-auto">
        <div className="container">
          <div className="flex items-center justify-center gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative h-2 rounded-full bg-white/30 overflow-hidden transition-all duration-300 cursor-pointer hover:bg-white/50"
                style={{
                  width: currentSlide === idx ? "44px" : "12px",
                }}
              >
                {currentSlide === idx && (
                  <div
                    className="absolute inset-0 bg-[#fbbf24] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
