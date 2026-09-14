"use client";

import React, { useState, useEffect } from "react";

const announcements: string[] = [
  "Special Offers: Up to 15% OFF On Sundarban Tour Packages & Hotel Sonar Bangla Booking!",
  "Daily Luxury Safaris & AC Cruise Departures from Godkhali | Office Open: Mon - Sun (8:00 AM - 9:00 PM)",
  "Instant 24/7 Reservation & Tour Support: +91 7001403498 | 100% Customized Sundarban Itineraries",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="bg-[#064e3b] text-white text-xs sm:text-sm py-2.5 overflow-hidden select-none relative z-50 border-b border-emerald-900/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative h-5 sm:h-5.5 flex items-center justify-center overflow-hidden">
        {announcements.map((text, idx) => {
          const isActive = idx === currentIndex;
          const isPrev =
            (currentIndex - 1 + announcements.length) % announcements.length === idx;

          let positionClasses = "opacity-0 translate-x-full pointer-events-none";
          if (isActive) {
            positionClasses = "opacity-100 translate-x-0";
          } else if (isPrev) {
            positionClasses = "opacity-0 -translate-x-full pointer-events-none";
          }

          return (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out px-4 ${positionClasses}`}
            >
              <p className="text-white/95 text-xs sm:text-sm font-medium tracking-wide truncate max-w-4xl">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnnouncementBar;
