"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PackageCardImageSliderProps {
  images: string[];
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  autoSlideInterval?: number;
}

export function PackageCardImageSlider({
  images = [],
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
  priority = false,
  autoSlideInterval = 3500,
}: PackageCardImageSliderProps) {
  // Deduplicate and filter non-empty image strings
  const validImages = Array.from(
    new Set(
      images.filter((img) => typeof img === "string" && img.trim().length > 0)
    )
  );

  const fallbackImage = "/assets/images/safari-boat.jpg";

  const displayList = validImages.length > 0 ? validImages : [fallbackImage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (displayList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [displayList.length, isPaused, autoSlideInterval]);

  // Touch gesture handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      e.stopPropagation();
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;

    // Resume auto-slide after 3 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // Single Image Mode
  if (displayList.length === 1) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-900 ${className}`}>
        <Image
          src={displayList[0]}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={displayList[0].startsWith("data:")}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
      </div>
    );
  }

  // Multiple Images Slider Mode
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-slate-900 select-none group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Image Container */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {displayList.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={src}
              alt={`${alt} - Photo ${idx + 1}`}
              fill
              sizes={sizes}
              priority={priority && idx === 0}
              unoptimized={src.startsWith("data:")}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          </div>
        ))}
      </div>

      {/* Prev Navigation Button - Automatically visible on mobile (opacity-100), reveals on hover on desktop */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs shadow-md border border-white/15 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-90 cursor-pointer"
      >
        <ChevronLeft className="w-4.5 h-4.5" />
      </button>

      {/* Next Navigation Button - Automatically visible on mobile (opacity-100), reveals on hover on desktop */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs shadow-md border border-white/15 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-90 cursor-pointer"
      >
        <ChevronRight className="w-4.5 h-4.5" />
      </button>

      {/* Pagination Dots (bottom center) */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
        {displayList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
              currentIndex === idx
                ? "w-5 bg-white shadow-xs"
                : "w-1.5 bg-white/60 hover:bg-white/95"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PackageCardImageSlider;
