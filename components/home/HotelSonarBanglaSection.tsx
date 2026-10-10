"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { AdminHotelPhoto } from "@/lib/admin-data";

interface ShowcaseCard {
  id: number | string;
  title: string;
  image: string;
}

export function HotelSonarBanglaSection() {
  const { hotelPhotos } = useAdmin();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [livePhotos, setLivePhotos] = useState<AdminHotelPhoto[]>([]);
  const [hasFetchedLive, setHasFetchedLive] = useState<boolean>(false);

  // Synchronize resort photos directly from public API
  useEffect(() => {
    fetch("/api/hotel/photos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.photos)) {
          setLivePhotos(data.photos);
        }
        setHasFetchedLive(true);
      })
      .catch(() => {
        setHasFetchedLive(true);
      });
  }, []);

  // Compute dynamic items list purely from admin/database
  const items: ShowcaseCard[] = useMemo(() => {
    const source = hasFetchedLive ? livePhotos : hotelPhotos;
    return source
      .filter((p) => p && p.imageUrl)
      .map((p) => ({
        id: p.id,
        title: p.title || "Hotel Sonar Bangla",
        image: p.imageUrl,
      }));
  }, [hasFetchedLive, livePhotos, hotelPhotos]);

  // Duplicate for seamless infinite marquee loop
  const scrollItems = useMemo(() => {
    if (items.length === 0) return [];
    let list = [...items];
    while (list.length < 12) {
      list = [...list, ...items];
    }
    return [...list, ...list];
  }, [items]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));

  const activeImage = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      <div className="container">
        <div className="sec-header max-w-3xl mx-auto text-center">
          <p className="sec-tagline">Luxury Stay &amp; Safaris</p>
          <h2 className="sec-title">Sundarban Hotel Sonar Bangla</h2>
          <p className="sec-desc">
            Experience 5-star riverfront hospitality, swimming pool, luxury cottages, and all-inclusive wildlife cruise expeditions in Sundarban.
          </p>
        </div>
      </div>

      {/* DESKTOP: Infinite Continuous Slider Track */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div className="sonar-marquee-track flex gap-4 sm:gap-6 items-center py-2">
          {scrollItems.map((item, idx) => {
            const isDataUrl = Boolean(item.image?.startsWith("data:"));

            return (
              <div
                key={`desk-${item.id}-${idx}`}
                onClick={() => openLightbox(idx % items.length)}
                className="group relative flex-shrink-0 w-[260px] lg:w-[290px] aspect-square bg-white rounded-xl overflow-hidden border border-slate-200/80 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="290px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized={isDataUrl}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-xs font-bold line-clamp-2 leading-snug">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto sonar-floating-badge">
          <div className="sonar-wave-ring sonar-wave-ring-1" />
          <div className="sonar-wave-ring sonar-wave-ring-2" />
          <Link
            href="/hotel-sonar-bangla"
            className="relative overflow-hidden w-28 h-28 md:w-32 md:h-32 rounded-full bg-secondary text-white flex flex-col items-center justify-center text-center p-2 md:p-2.5 shadow-2xl border-3 border-white ring-4 ring-amber-400/40 transition-all duration-300 group cursor-pointer hover:scale-105 z-10"
          >
            <div className="sonar-shine-overlay" />
            <span className="relative z-10 text-xs font-black uppercase tracking-wider text-white">Book Today</span>
            <span className="relative z-10 text-sm md:text-base font-black text-white leading-tight py-1 drop-shadow-xs">FLAT 15% OFF</span>
            <span className="relative z-10 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white/95 group-hover:text-white">
              <span>View Hotel</span>
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE: 2x2 Grid (4 photos) */}
      <div className="block md:hidden container relative">
        <div className="grid grid-cols-2 gap-3">
          {items.slice(0, 4).map((item, idx) => {
            const isDataUrl = Boolean(item.image?.startsWith("data:"));

            return (
              <div
                key={`mob-${item.id}`}
                onClick={() => openLightbox(idx)}
                className="group relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  unoptimized={isDataUrl}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Floating Badge (Mobile) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto sonar-floating-badge">
          <div className="sonar-wave-ring sonar-wave-ring-1" />
          <Link
            href="/hotel-sonar-bangla"
            className="relative overflow-hidden w-24 h-24 rounded-full bg-secondary text-white flex flex-col items-center justify-center text-center p-1.5 shadow-2xl border-2 border-white ring-2 ring-amber-400/40 transition-all duration-300 group cursor-pointer z-10"
          >
            <div className="sonar-shine-overlay" />
            <span className="relative z-10 text-[9px] font-black uppercase tracking-wider text-white">Book Today</span>
            <span className="relative z-10 text-xs font-black text-white leading-tight py-0.5 drop-shadow-xs">FLAT 15% OFF</span>
            <span className="relative z-10 inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-white/95">
              <span>View Hotel</span>
              <ArrowRight className="w-2 h-2" />
            </span>
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sonar-infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .sonar-marquee-track {
            display: flex;
            width: max-content;
            animation: sonar-infinite-scroll 55s linear infinite;
          }
          .sonar-marquee-track:hover { animation-play-state: paused; }

          @keyframes sonar-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .sonar-floating-badge {
            animation: sonar-float 3.5s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes sonar-wave-pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { opacity: 0.4; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .sonar-wave-ring {
            position: absolute;
            border-radius: 9999px;
            inset: 0;
            background: rgba(217, 119, 6, 0.45);
            pointer-events: none;
            z-index: 0;
          }
          .sonar-wave-ring-1 { animation: sonar-wave-pulse 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
          .sonar-wave-ring-2 { animation: sonar-wave-pulse 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.4s; }

          @keyframes sonar-shine {
            0% { transform: translate3d(-180%, 0, 0) rotate(25deg); opacity: 0; }
            15% { opacity: 1; }
            45% { transform: translate3d(220%, 0, 0) rotate(25deg); opacity: 1; }
            55%, 100% { transform: translate3d(220%, 0, 0) rotate(25deg); opacity: 0; }
          }
          .sonar-shine-overlay {
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.08) 75%, transparent 100%);
            animation: sonar-shine 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            pointer-events: none;
            will-change: transform, opacity;
          }
        `
      }} />

      {/* Lightbox with Prev/Next */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 text-white bg-white/10 hover:bg-white/25 p-2.5 rounded-full border border-white/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-white/10 hover:bg-white/25 p-3 rounded-full border border-white/20 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-white/10 hover:bg-white/25 p-3 rounded-full border border-white/20 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div
            className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.image}
              alt={activeImage.title}
              fill
              className="object-contain"
              unoptimized={Boolean(activeImage.image?.startsWith("data:"))}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
              <p className="text-white font-bold text-sm text-center">{activeImage.title}</p>
              <p className="text-white/50 text-xs text-center mt-0.5">
                {(lightboxIndex ?? 0) + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HotelSonarBanglaSection;