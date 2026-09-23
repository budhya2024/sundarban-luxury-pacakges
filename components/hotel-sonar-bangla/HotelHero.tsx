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
    <section className="relative bg-black text-white aspect-video md:aspect-[16/6] flex items-center justify-center">

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        poster="/assets/images/sonarbanglahotel.jpg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source
          src="/assets/video/sonar-bangla-hotel.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Content - Text with Strong Text Shadow only (No background layer) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider select-none"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.9)",
          }}
        >
          Hotel Sonar Bangla
        </h1>

      </div>
    </section>
  );
}

export default HotelHero;




