"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star, Calendar, Utensils, Sparkles, Tag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { BookingModal } from "@/components/tour/BookingModal";
import { FaBinoculars, FaVanShuttle, FaUtensils, FaUserDoctor } from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function PopularDestinations() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState("Sundarban 1 Night 2 Days Tour");
  const { packages } = useAdmin();

  // Filter active packages or fallback
  const displayPackages = packages.filter((p) => p.status !== "Draft");

  const handleOpenBooking = (tourName: string) => {
    setSelectedTour(tourName);
    setIsModalOpen(true);
  };

  return (
    <section className="py-8 md:py-16 bg-secondary/10 relative overflow-hidden">
      <div className="container">
        {/* Centered Header Section */}
        <div className="sec-header">
          <span className="sec-tagline">
            Sundarban Tour Packages
          </span>
          <h2 className="sec-title">
            Popular Sundarban Packages
          </h2>
        </div>

        {/* Normal Carousel Slider */}
        <div className="relative w-full">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={displayPackages.length > 3}
            speed={600}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            pagination={{
              clickable: true,
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            className="popular-destinations-swiper pb-12 [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex"
          >
            {displayPackages.map((item) => {
              const itineraryDays = item.itinerary?.length || 0;
              const menuDays = item.foodMenu?.length || 0;
              const href = `/tour/${item.slug}`;
              const discountPercent =
                item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 15;

              return (
                <SwiperSlide key={item.id} className="h-auto flex flex-col w-full">
                  <div className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full w-full group rounded-xl">
                    {/* Card Image */}
                    <div className="relative w-full h-[240px] sm:h-[260px] bg-slate-100 overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={item.image?.startsWith("data:")}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Top-Left 15% OFF Offer Badge with Smooth Moving Shine Effect */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="offer-shine-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-red-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-red-950/30">
                          <Tag className="w-3 h-3 text-white" />
                          <span>{discountPercent}% OFF</span>
                        </div>
                      </div>

                      {/* Top-Right Star Rating Badge */}
                      <div className="absolute top-3 right-3 bg-amber-500/95 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs z-10">
                        <Star className="w-3 h-3 fill-white" />
                        <span>{item.rating || 4.9}</span> Google Rating
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-[#b45309] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-secondary" />
                            {item.duration}
                          </span>
                          <div className="text-right">
                            <span className="text-base md:text-xl font-extrabold text-foreground">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                                ₹{item.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 min-h-[3.25rem] flex items-center">
                          {item.name}
                        </h3>

                        {/* Package Inclusions */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 my-2 pt-2.5 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <FaBinoculars className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                            <span className="text-xs font-medium truncate">Sightseeing</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <FaVanShuttle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                            <span className="text-xs font-medium truncate">Pick &amp; Drop</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <FaUtensils className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                            <span className="text-xs font-medium truncate">All Meals</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <FaUserDoctor className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                            <span className="text-xs font-medium truncate">Doctor on Call</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={href}
                          className="text-sm font-bold text-slate-700 hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <span>View Day Plan &amp; Menu</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>

                        <button
                          onClick={() => handleOpenBooking(item.name)}
                          className="btn btn-secondary !py-1.5 !px-3.5 !text-sm shadow-xs rounded-full flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <span>Book now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          packageName={selectedTour}
        />
      </div>

      {/* Global CSS for Swiper pagination bullets */}
      <style jsx global>{`
        .popular-destinations-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 1.5rem !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .popular-destinations-swiper .custom-bullet {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 9999px;
          border: none !important;
          outline: none !important;
          background-color: #fde68a !important;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 1 !important;
        }
        .popular-destinations-swiper .custom-bullet:hover {
          background-color: #f59e0b !important;
          border: none !important;
        }
        .popular-destinations-swiper .custom-bullet-active {
          width: 1.75rem !important;
          background-color: #d97706 !important;
          border: none !important;
          outline: none !important;
          opacity: 1 !important;
        }

        /* Smooth Moving Light Shine Effect on Offer Badge */
        @keyframes offerShine {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          35%, 100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }
        .offer-shine-badge {
          position: relative;
          overflow: hidden;
        }
        .offer-shine-badge::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: offerShine 2.8s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}

export default PopularDestinations;
