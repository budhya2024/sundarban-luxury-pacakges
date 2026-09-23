"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface ShowcaseCard {
  id: number | string;
  title: string;
  image: string;
}

const showcaseItems: ShowcaseCard[] = [
  {
    id: 1,
    title: "Hotel Sonar Bangla Resort",
    image: "/assets/images/sonarbanglahotel.jpg",
  },
  {
    id: 2,
    title: "Panoramic Riverfront View",
    image: "/assets/images/sonar-bangla-hotel-bg.jpg",
  },
  {
    id: 3,
    title: "Infinity Swimming Pool & Sun Deck",
    image: "/assets/images/sonar-bangla-hotel-pool.jpg",
  },
  {
    id: 4,
    title: "Riverfront Balcony Suite",
    image: "/assets/images/sonar-bangla-hotel-balcony.webp",
  },
  {
    id: 5,
    title: "Heritage Wooden Cottage",
    image: "/assets/images/sonar-bangla-hotel-cottage.webp",
  },
  {
    id: 6,
    title: "Executive Deluxe Suite",
    image: "/assets/images/sonar-bangla-hotel-deluxe.jpg",
  },
  {
    id: 7,
    title: "Night Illumination & Lawn",
    image: "/assets/images/sonar-bangla-hotel-ambience.jpg",
  },
  {
    id: 8,
    title: "Manicured Grounds & River Walkway",
    image: "/assets/images/sonar-bangla-hotel-grounds.jpg",
  },
  {
    id: 9,
    title: "Luxury King Bedroom Suite",
    image: "/assets/images/hotel-bedroom.jpeg",
  },
  {
    id: 10,
    title: "Deluxe Suite Bedroom",
    image: "/assets/images/hotel-room-1.jpeg",
  },
  {
    id: 11,
    title: "Resort Garden View Pathway",
    image: "/assets/images/hotel-garden.jpeg",
  },
  {
    id: 12,
    title: "Executive Lounge & Dining",
    image: "/assets/images/hotel-lounge.jpeg",
  },
  {
    id: 13,
    title: "Modern Executive Room",
    image: "/assets/images/hotel-modern-room.jpeg",
  },
  {
    id: 14,
    title: "Resort Living & Hospitality",
    image: "/assets/images/hotel.jpeg",
  },
  {
    id: 15,
    title: "Riverfront Promenade Deck",
    image: "/assets/images/resort-deck.jpg",
  },
  {
    id: 16,
    title: "Sonar Bangla Luxury Package",
    image: "/assets/images/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp",
  },
  {
    id: 17,
    title: "Luxury Safari Cruise",
    image: "/assets/images/cruises.jpg",
  },
];

export function HotelSonarBanglaSection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [items, setItems] = useState<ShowcaseCard[]>(showcaseItems);

  // Synchronize resort photos dynamically from Neon backend
  useEffect(() => {
    fetch("/api/hotel/photos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.photos) && data.photos.length > 0) {
          const dynamicItems: ShowcaseCard[] = data.photos.map((p: any) => ({
            id: p.id,
            title: p.title,
            image: p.imageUrl,
          }));
          // Prepend/merge dynamic with default items
          setItems([...dynamicItems, ...showcaseItems.slice(dynamicItems.length)]);
        }
      })
      .catch(() => { });
  }, []);

  // Duplicate items for continuous seamless infinite looping track
  const scrollItems = [...items, ...items];

  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="sec-header max-w-3xl mx-auto text-center">
          <p className="sec-tagline">Luxury Stay &amp; Safaris</p>
          <h2 className="sec-title">
            Sundarban Hotel Sonar Bangla
          </h2>
          <p className="sec-desc">
            Experience 5-star riverfront hospitality, swimming pool, luxury cottages, and all-inclusive wildlife cruise expeditions in Sundarban.
          </p>
        </div>
      </div>

      {/* DESKTOP VIEW: Infinite Continuous Slider Track */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Smooth Infinite Marquee Track */}
        <div className="sonar-marquee-track flex gap-4 sm:gap-6 items-center py-2">
          {scrollItems.map((item, idx) => (
            <div
              key={`desk-${item.id}-${idx}`}
              onClick={() => setSelectedImg(item.image)}
              className="group relative flex-shrink-0 w-[260px] lg:w-[290px] aspect-square bg-white rounded-xl overflow-hidden border border-slate-200/80  transition-all duration-300 cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="290px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                unoptimized={item.image.startsWith("data:")}
              />

            </div>
          ))}
        </div>

        {/* Centered Circle Shape: Floating Wave Motion, Rings & Shine Effect (Desktop) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto sonar-floating-badge">
          {/* Wave Ripple Ring 1 */}
          <div className="sonar-wave-ring sonar-wave-ring-1" />
          {/* Wave Ripple Ring 2 */}
          <div className="sonar-wave-ring sonar-wave-ring-2" />

          <Link
            href="/hotel-sonar-bangla"
            className="relative overflow-hidden w-28 h-28 md:w-32 md:h-32 rounded-full bg-secondary text-white flex flex-col items-center justify-center text-center p-2 md:p-2.5 shadow-2xl border-3 border-white ring-4 ring-amber-400/40 transition-all duration-300 group cursor-pointer hover:scale-108 z-10"
          >
            {/* Animated Shine Light Beam Effect */}
            <div className="sonar-shine-overlay" />

            <span className="relative z-10 text-xs font-black uppercase tracking-wider text-white flex items-center gap-0.5">
              <span>Book Today</span>
            </span>
            <span className="relative z-10 text-sm md:text-base font-black text-white leading-tight py-1 drop-shadow-xs">
              FLAT 15% OFF
            </span>
            <span className="relative z-10 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white/95 group-hover:text-white">
              <span>View Hotel</span>
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE VIEW: Only 4 Static Images in 2x2 Grid */}
      <div className="block md:hidden container relative">
        <div className="grid grid-cols-2 gap-3">
          {items.slice(0, 4).map((item) => (
            <div
              key={`mob-${item.id}`}
              onClick={() => setSelectedImg(item.image)}
              className="group relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="50vw"
                className="object-cover"
                unoptimized={item.image.startsWith("data:")}
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Centered Circle Shape: Floating Wave Motion (Mobile) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto sonar-floating-badge">
          {/* Wave Ripple Ring 1 */}
          <div className="sonar-wave-ring sonar-wave-ring-1" />

          <Link
            href="/hotel-sonar-bangla"
            className="relative overflow-hidden w-24 h-24 rounded-full bg-secondary text-white flex flex-col items-center justify-center text-center p-1.5 shadow-2xl border-2 border-white ring-2 ring-amber-400/40 transition-all duration-300 group cursor-pointer z-10"
          >
            {/* Animated Shine Light Beam Effect */}
            <div className="sonar-shine-overlay" />

            <span className="relative z-10 text-[9px] font-black uppercase tracking-wider text-white flex items-center gap-0.5">
              <span>Book Today</span>
            </span>
            <span className="relative z-10 text-xs font-black text-white leading-tight py-0.5 drop-shadow-xs">
              FLAT 15% OFF
            </span>
            <span className="relative z-10 inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-white/95">
              <span>View Hotel</span>
              <ArrowRight className="w-2 h-2" />
            </span>
          </Link>
        </div>
      </div>

      {/* Local Infinite Scroll, Floating Waves & Shine Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sonar-infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .sonar-marquee-track {
            display: flex;
            width: max-content;
            animation: sonar-infinite-scroll 55s linear infinite;
          }
          .sonar-marquee-track:hover {
            animation-play-state: paused;
          }

          /* Floating Wave Bobbing Animation */
          @keyframes sonar-float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .sonar-floating-badge {
            animation: sonar-float 3.5s ease-in-out infinite;
            will-change: transform;
          }

          /* Radiating Wave Ripple Rings */
          @keyframes sonar-wave-pulse {
            0% {
              transform: scale(0.95);
              opacity: 0.8;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              transform: scale(1.6);
              opacity: 0;
            }
          }
          .sonar-wave-ring {
            position: absolute;
            border-radius: 9999px;
            inset: 0;
            background: rgba(217, 119, 6, 0.45);
            pointer-events: none;
            z-index: 0;
          }
          .sonar-wave-ring-1 {
            animation: sonar-wave-pulse 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          }
          .sonar-wave-ring-2 {
            animation: sonar-wave-pulse 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.4s;
          }

          @keyframes sonar-shine {
            0% {
              transform: translate3d(-180%, 0, 0) rotate(25deg);
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            45% {
              transform: translate3d(220%, 0, 0) rotate(25deg);
              opacity: 1;
            }
            55%, 100% {
              transform: translate3d(220%, 0, 0) rotate(25deg);
              opacity: 0;
            }
          }
          .sonar-shine-overlay {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.08) 25%,
              rgba(255, 255, 255, 0.65) 50%,
              rgba(255, 255, 255, 0.08) 75%,
              transparent 100%
            );
            animation: sonar-shine 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            pointer-events: none;
            will-change: transform, opacity;
          }
        `
      }} />

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/20 transition-colors cursor-pointer"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImg}
              alt="Sundarban Hotel Sonar Bangla Gallery Lightbox"
              fill
              className="object-contain"
              unoptimized={selectedImg.startsWith("data:")}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default HotelSonarBanglaSection;


