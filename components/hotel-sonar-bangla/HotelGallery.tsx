"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { Camera, X, Loader2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { AdminHotelPhoto } from "@/lib/admin-data";

const INITIAL_VISIBLE_COUNT = 8;
const BATCH_LOAD_SIZE = 4;

export function HotelGallery() {
  const { hotelPhotos } = useAdmin();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [livePhotos, setLivePhotos] = useState<AdminHotelPhoto[]>([]);
  const [hasFetchedLive, setHasFetchedLive] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  // Synchronize resort photos dynamically from Neon backend
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

  // Use dynamic data from admin / database
  const images = useMemo(() => {
    const source = hasFetchedLive ? livePhotos : hotelPhotos;
    return source
      .filter((p) => p && p.imageUrl)
      .map((p) => ({
        id: p.id,
        title: p.title || "Hotel Sonar Bangla",
        category: p.category || "Resort Campus",
        src: p.imageUrl,
      }));
  }, [hasFetchedLive, livePhotos, hotelPhotos]);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_LOAD_SIZE, images.length));
      setIsLoadingMore(false);
    }, 350);
  }, [isLoadingMore, hasMore, images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    const target = observerTargetRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, isLoadingMore, loadMore]);

  return (
    <section id="gallery" className="py-8 md:py-16 scroll-mt-14">
      <div className="container">
        {/* Header */}
        <div className="sec-header">
          <p className="sec-tagline">
            Visual Experience
          </p>
          <h2 className="sec-title">
            Hotel Sonar Bangla Photo Gallery
          </h2>
          <p className="sec-desc">
            Take a visual tour of our 5-star riverfront property, luxury rooms, swimming pool, and dining spaces.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleImages.map((img) => {
            const isDataUrl = Boolean(img.src?.startsWith("data:"));

            return (
              <div
                key={img.id}
                onClick={() => setSelectedImg(img.src)}
                className="group relative h-45 sm:h-70 rounded-xl overflow-hidden bg-slate-200 border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  unoptimized={isDataUrl}
                />

                {/* Middle Cubic-Bezier Animated Overlay */}
                <div className="absolute inset-0 bg-[#052e16]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="flex flex-col items-center justify-center text-center text-white scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-2.5 shadow-lg border border-[#fbbf24]/30">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] block mb-0.5">
                      {img.category}
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-snug">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Infinite Scroll Trigger Sentry */}
        {hasMore && <div ref={observerTargetRef} className="h-6 w-full my-3" />}

        {/* Loading Spinner */}
        {isLoadingMore && (
          <div className="flex items-center justify-center py-6 gap-2.5 text-primary font-bold text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more resort photos...</span>
          </div>
        )}
      </div>

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
              alt="Hotel Sonar Bangla Gallery Lightbox"
              fill
              className="object-contain"
              unoptimized={Boolean(selectedImg.startsWith("data:"))}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default HotelGallery;
