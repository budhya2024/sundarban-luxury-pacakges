"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { AdminGalleryItem } from "@/lib/admin-data";

interface ImageCardProps {
  item: AdminGalleryItem;
  className?: string;
  onOpenLightbox: (id: string) => void;
  priority?: boolean;
}

function ImageCard({
  item,
  className = "",
  onOpenLightbox,
  priority = false,
}: ImageCardProps) {
  return (
    <div
      onClick={() => onOpenLightbox(item.id)}
      className={`group relative overflow-hidden rounded-[26px] bg-zinc-100 shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLightbox(item.id);
        }
      }}
    >
      <Image
        src={item.src}
        alt={item.alt || item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        priority={priority}
        unoptimized={item.src?.startsWith("data:")}
        className="object-cover"
      />

      {/* Middle Cubic-Bezier Animated Overlay Layer */}
      <div className="absolute inset-0 bg-[#052e16]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center text-white scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-2.5 shadow-lg border border-[#fbbf24]/30">
            <Maximize2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#fbbf24] uppercase tracking-wider block mb-0.5">
            {item.location}
          </span>
          <h4 className="text-sm font-extrabold text-white leading-snug max-w-[200px]">
            {item.title}
          </h4>
        </div>
      </div>
    </div>
  );
}

export function RecentGallery() {
  const { galleryItems } = useAdmin();
  const activeItems = galleryItems.filter((g) => g.status === "Active");
  const displayItems = activeItems.length > 0 ? activeItems : galleryItems;

  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Distribute items into 5 columns
  const col1 = displayItems.filter((i) => i.column === "col1");
  const col2 = displayItems.filter((i) => i.column === "col2");
  const col3 = displayItems.filter((i) => i.column === "col3");
  const col4 = displayItems.filter((i) => i.column === "col4");
  const col5 = displayItems.filter((i) => i.column === "col5");

  // Fallbacks if columns are not evenly populated
  const col1Items = col1.length > 0 ? col1 : [displayItems[0] || displayItems[0]];
  const col2Items = col2.length > 0 ? col2 : displayItems.slice(1, 3);
  const col3Items = col3.length > 0 ? col3 : [displayItems[3] || displayItems[0]];
  const col4Items = col4.length > 0 ? col4 : displayItems.slice(4, 6);
  const col5Items = col5.length > 0 ? col5 : [displayItems[6] || displayItems[displayItems.length - 1]];

  const activeIndex = displayItems.findIndex((img) => img.id === activeImageId);
  const activeImage = activeIndex !== -1 ? displayItems[activeIndex] : null;

  const handleNext = useCallback(() => {
    if (activeIndex !== -1) {
      const nextIndex = (activeIndex + 1) % displayItems.length;
      setActiveImageId(displayItems[nextIndex].id);
    }
  }, [activeIndex, displayItems]);

  const handlePrev = useCallback(() => {
    if (activeIndex !== -1) {
      const prevIndex = (activeIndex - 1 + displayItems.length) % displayItems.length;
      setActiveImageId(displayItems[prevIndex].id);
    }
  }, [activeIndex, displayItems]);

  const handleClose = useCallback(() => {
    setActiveImageId(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, handleClose, handleNext, handlePrev]);

  return (
    <section className="py-8 md:py-16 bg-[#fcf9f2] relative overflow-hidden border-t border-b border-amber-100/70">
      <div className="container">
        {/* Section Header */}
        <div className="relative text-center mb-10 md:mb-14">
          <p className="font-montez text-3xl md:text-4xl text-[#d97706] tracking-wide mb-1">
            Make Your Tour More Pleasure
          </p>
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Recent Gallery
            </h2>
          </div>
        </div>

        {/* Gallery Grid (5 Columns matching the wave layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-center">
          {/* Column 1 */}
          <div className="flex flex-col justify-center h-full">
            {col1Items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                className="h-[260px] lg:h-[280px] w-full"
                onOpenLightbox={setActiveImageId}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {col2Items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                className="h-[190px] lg:h-[205px] w-full"
                onOpenLightbox={setActiveImageId}
              />
            ))}
          </div>

          {/* Column 3 - Center tall highlight card */}
          <div className="flex flex-col justify-center h-full">
            {col3Items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                className="h-[400px] lg:h-[430px] w-full"
                onOpenLightbox={setActiveImageId}
                priority
              />
            ))}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {col4Items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                className="h-[190px] lg:h-[205px] w-full"
                onOpenLightbox={setActiveImageId}
              />
            ))}
          </div>

          {/* Column 5 */}
          <div className="flex flex-col justify-center h-full sm:col-span-2 md:col-span-1">
            {col5Items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                className="h-[260px] lg:h-[280px] w-full"
                onOpenLightbox={setActiveImageId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeImage.src}
                alt={activeImage.alt || activeImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                unoptimized={activeImage.src?.startsWith("data:")}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
                {activeImage.location}
              </p>
              <h3 className="text-lg md:text-xl font-bold text-white">
                {activeImage.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeIndex + 1} of {displayItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecentGallery;
