"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function HotelHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted states to comply with browser autoplay policies
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    attemptPlay();

    // Fallback: If autoplay was blocked by mobile browser battery saver / strict policy,
    // play immediately upon first user interaction anywhere on the page
    const handleInteraction = () => {
      attemptPlay();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });
    window.addEventListener("scroll", handleInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const scrollToContent = () => {
    const heroSection = document.getElementById("hotel-hero");
    if (heroSection) {
      const nextElement = heroSection.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hotel-hero"
      className="relative bg-black text-white aspect-video md:aspect-[16/6] flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/assets/video/sonar-bangla-hotel.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        poster="/assets/images/sonarbanglahotel.jpg"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        }}
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/assets/video/sonar-bangla-hotel.mp4" type="video/mp4" />
      </video>

      {/* Hero Content - Text with Strong Text Shadow */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider select-none"
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.9)",
          }}
        >
          Hotel Sonar Bangla
        </h1>
      </div>

      {/* Scroll Down Arrow Button */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <button
          onClick={scrollToContent}
          type="button"
          aria-label="Scroll to hotel booking and details"
          className="group flex flex-col items-center gap-1 text-white/90 hover:text-white transition-all cursor-pointer p-1.5 focus:outline-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}

export default HotelHero;
