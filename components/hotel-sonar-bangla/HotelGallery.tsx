"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Resort Swimming Pool & Deck",
    category: "Resort Campus",
    src: "/assets/images/sonar-bangla-hotel-pool.jpg",
  },
  {
    id: 2,
    title: "Executive Deluxe Suite",
    category: "Rooms",
    src: "/assets/images/sonar-bangla-hotel-deluxe.jpg",
  },
  {
    id: 3,
    title: "Riverfront Balcony Suite",
    category: "Suites",
    src: "/assets/images/sonar-bangla-hotel-balcony.webp",
  },
  {
    id: 4,
    title: "Heritage Wooden Cottage",
    category: "Villas",
    src: "/assets/images/sonar-bangla-hotel-cottage.webp",
  },
  {
    id: 5,
    title: "Night Illumination & Lawn",
    category: "Ambience",
    src: "/assets/images/sonar-bangla-hotel-ambience.jpg",
  },
  {
    id: 6,
    title: "Manicured Grounds & River Deck",
    category: "Campus Grounds",
    src: "/assets/images/sonar-bangla-hotel-grounds.jpg",
  },
  {
    id: 7,
    title: "Hotel Sonar Bangla Facade",
    category: "Main Building",
    src: "/assets/images/sonarbanglahotel.jpg",
  },
  {
    id: 8,
    title: "Panoramic Aerial Resort View",
    category: "Panoramic Campus",
    src: "/assets/images/sonar-bangla-hotel-bg.jpg",
  },
  {
    id: 9,
    title: "Luxury King Bedroom",
    category: "Rooms",
    src: "/assets/images/hotel-bedroom.jpeg",
  },
  {
    id: 10,
    title: "Deluxe Suite Room",
    category: "Rooms",
    src: "/assets/images/hotel-room-1.jpeg",
  },
  {
    id: 11,
    title: "Resort Garden View Pathway",
    category: "Campus Grounds",
    src: "/assets/images/hotel-garden.jpeg",
  },
  {
    id: 12,
    title: "Executive Lounge & Dining",
    category: "Ambience",
    src: "/assets/images/hotel-lounge.jpeg",
  },
  {
    id: 13,
    title: "Modern Executive Suite",
    category: "Rooms",
    src: "/assets/images/hotel-modern-room.jpeg",
  },
  {
    id: 14,
    title: "Resort Living & Hospitality",
    category: "Ambience",
    src: "/assets/images/hotel.jpeg",
  },
  {
    id: 15,
    title: "Riverfront Promenade Deck",
    category: "Campus Grounds",
    src: "/assets/images/resort-deck.jpg",
  },
  {
    id: 16,
    title: "Luxury Safari Cruise",
    category: "Excursions",
    src: "/assets/images/cruises.jpg",
  },
];

const ITEMS_PER_PAGE = 8;

export function HotelGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [images, setImages] = useState(galleryImages);

  // Synchronize resort photos dynamically from Neon backend
  useEffect(() => {
    fetch("/api/hotel/photos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.photos) && data.photos.length > 0) {
          const dynamicPhotos = data.photos.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            src: p.imageUrl,
          }));
          setImages(dynamicPhotos);
        }
      })
      .catch(() => {});
  }, []);

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          {paginatedImages.map((img) => (
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
                unoptimized={img.src.startsWith("data:")}
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
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 1
                    ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                    : "border-slate-300 text-slate-700 hover:bg-primary hover:text-white hover:border-primary shadow-xs"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-primary text-white border border-primary shadow-sm"
                      : "bg-white text-slate-700 border border-slate-300 hover:border-primary hover:text-primary"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === totalPages
                    ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                    : "border-slate-300 text-slate-700 hover:bg-primary hover:text-white hover:border-primary shadow-xs"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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
              unoptimized={selectedImg.startsWith("data:")}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default HotelGallery;
