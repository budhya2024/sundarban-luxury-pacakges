"use client";

import React, { useRef, useEffect } from "react";

export function HotelHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <section className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[650px] bg-black overflow-hidden">
      {/* Pure Full Hero Video (Completely Muted, No Sound, No Play Icon, No Controls, No Text) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        poster="/assets/sonar-bangla-hotel-bg.jpg"
        className="w-full h-full object-cover pointer-events-none"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-resort-and-pool-42861-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-resort-with-swimming-pool-and-palm-trees-at-sunset-1205-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle bottom vignette to blend smoothly with next section */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
    </section>
  );
}

export default HotelHero;

