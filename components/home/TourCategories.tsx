"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    id: "sonar-bangla-hotel",
    title: "Hotel Sonar Bangla",
    subtitle: "5-Star Luxury Eco-Resort",
    image: "/assets/sonarbanglahotel.jpg",
    href: "/hotel-sonar-bangla",
  },
  {
    id: "riverfront-suites",
    title: "Riverfront Suites",
    subtitle: "Waterfront Accommodation",
    image: "/assets/sonar-bangla-hotel-balcony.webp",
    href: "/hotel-sonar-bangla",
  },
  {
    id: "swimming-pool",
    title: "Infinity Pool & Deck",
    subtitle: "Sun Lounge & Bar",
    image: "/assets/sonar-bangla-hotel-pool.jpg",
    href: "/hotel-sonar-bangla",
  },

  {
    id: "river-cruises",
    title: "Luxury AC Cruises",
    subtitle: "Private Boat Safari",
    image: "/assets/images/cruises.jpg",
    href: "/tour-details",
  },

];

export function TourCategories() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section
      className="py-8 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/texture-bg.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f0fdf4',
      }}
    >
      {/* Semi-transparent overlay for proper card readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Centered Header Section */}
        <div className="sec-header text-center mb-6">
          <p className="sec-tagline">
            Premium Accommodation & Experiences
          </p>
          <h2 className="sec-title">
            Sundarban Hotel Sonar Bangla
          </h2>
        </div>

        {/* Normal Carousel Slider Container */}
        <div className="relative w-full">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={600}
            autoplay={{
              delay: 3500,
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
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            pagination={{
              clickable: true,
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            className="tour-categories-swiper pb-12"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id} className="h-auto">
                <Link
                  href={cat.href}
                  className="group bg-white  border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full block rounded-xl"
                >
                  {/* Card Image */}
                  <div className="relative w-full h-[250px] sm:h-[270px] bg-slate-100 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#064e3b] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#b45309] mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-amber-50 text-[#d97706] group-hover:bg-[#064e3b] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Global CSS for Swiper pagination bullets */}
      <style jsx global>{`
        .tour-categories-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 1.5rem !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top:20px;
        }
        .tour-categories-swiper .custom-bullet {
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
        .tour-categories-swiper .custom-bullet:hover {
          background-color: #f59e0b !important;
          border: none !important;
        }
        .tour-categories-swiper .custom-bullet-active {
          width: 1.75rem !important;
          background-color: #d97706 !important;
          border: none !important;
          outline: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}

export default TourCategories;
