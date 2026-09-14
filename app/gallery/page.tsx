"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  MapPin,
  Tag,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";
import { AdminGalleryItem } from "@/lib/admin-data";

export default function GalleryPage() {
  const { galleryItems, contactGeneralInfo } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Filter only active items or fallback to all items
  const activeItems = useMemo(() => {
    const list = galleryItems.filter((g) => g.status === "Active");
    return list.length > 0 ? list : galleryItems;
  }, [galleryItems]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    activeItems.forEach((item) => {
      if (item.category) {
        cats.add(item.category);
      }
    });
    return Array.from(cats);
  }, [activeItems]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return activeItems;
    return activeItems.filter((item) => item.category === selectedCategory);
  }, [activeItems, selectedCategory]);

  // Lightbox handlers
  const activeIndex = filteredItems.findIndex((img) => img.id === activeImageId);
  const activeImage = activeIndex !== -1 ? filteredItems[activeIndex] : null;

  const handleNext = useCallback(() => {
    if (activeIndex !== -1) {
      const nextIndex = (activeIndex + 1) % filteredItems.length;
      setActiveImageId(filteredItems[nextIndex].id);
    }
  }, [activeIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (activeIndex !== -1) {
      const prevIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      setActiveImageId(filteredItems[prevIndex].id);
    }
  }, [activeIndex, filteredItems]);

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

  const rawPhone = contactGeneralInfo?.whatsappNumber || "+91 70014 03498";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello! I saw your Sundarban photo gallery and would like to inquire about tour package booking."
  )}`;

  return (
    <div className="bg-slate-50/70 min-h-screen text-[#0f172a] font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Dark Black Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Deep Black Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-4">
            Photo &amp; Safari Gallery
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-lg font-light leading-relaxed mb-6 drop-shadow-sm">
            Immerse yourself in authentic moments from our luxury boat safaris, Royal Bengal Tiger sightings, Hotel Sonar Bangla resort stays, and cultural evenings.
          </p>

          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white flex-wrap justify-center">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24]">Photo Gallery</span>
          </div>
        </div>
      </section>

      {/* 2. GALLERY GRID */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setActiveImageId(item.id)}
                className="group relative overflow-hidden rounded-2xl bg-zinc-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer h-[190px] sm:h-[240px] md:h-[280px] lg:h-[300px] w-full border border-slate-200/80"
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveImageId(item.id);
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized={item.src?.startsWith("data:")}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Top Category Badge */}
                {item.category && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] sm:text-[11px] font-bold bg-black/60 text-white/95 px-2.5 py-0.8 rounded-full backdrop-blur-xs shadow-xs border border-white/10">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Animated Hover Overlay */}
                <div className="absolute inset-0 bg-[#052e16]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 sm:p-5 z-20">
                  <div className="flex flex-col items-center justify-center text-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-lg border border-[#fbbf24]/40">
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm md:text-base font-extrabold text-white leading-snug line-clamp-2 max-w-[220px]">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No photos found</h3>
              <p className="text-sm text-slate-500 mt-1">
                Photos will appear here once added.
              </p>
            </div>
          )}
        </div>
      </section>


      {/* 4. FULLSCREEN LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
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
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors cursor-pointer"
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
            className="absolute left-3 sm:left-6 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
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
              <h3 className="text-lg md:text-xl font-bold text-white">
                {activeImage.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeIndex + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
