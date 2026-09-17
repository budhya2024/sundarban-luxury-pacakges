"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useAdmin } from "@/context/AdminContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function QuotationIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${className} fill-current`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const { testimonials } = useAdmin();
  const activeTestimonials = testimonials.filter((t) => t.status === "Active");
  const displayItems = activeTestimonials.length > 0 ? activeTestimonials : testimonials;

  return (
    <section
      className="py-8 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/texture-bg.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundColor: "#fef8e2",
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
      />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="sec-header">
          <p className="sec-tagline">
            Testimonial
          </p>
          <h2 className="sec-title">
            What Client Say
          </h2>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            loop={displayItems.length > 2}
            loopAdditionalSlides={3}
            speed={750}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: Math.min(3, displayItems.length),
                spaceBetween: 28,
                centeredSlides: false,
              },
            }}
            className="!pb-6"
          >
            {displayItems.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                {({ isActive }) => (
                  <div
                    className={`relative flex flex-col rounded-xl justify-between bg-white p-7 md:p-8 transition-all duration-500 min-h-[300px] border border-slate-200/80 shadow-sm ${isActive
                      ? " -translate-y-0.5 border-[#064e3b]/30"
                      : "opacity-95"
                      }`}
                  >
                    <div>
                      {/* Card Header: Avatar, Name & Stars */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-13 w-13 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#d97706]/40 shadow-sm bg-slate-100">
                            <Image
                              src={item.avatar || "/assets/images/avatars/andrew.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="52px"
                            />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-[#0f172a] leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        {/* Star Ratings */}
                        <div className="flex items-center gap-0.5 text-[#d97706]">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-[#d97706] text-[#d97706]"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Quote Text */}
                      <p className="text-sm leading-relaxed text-slate-700 font-normal">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Center Circular Quote Badge */}
                    <div
                      className={`absolute -bottom-5 left-1/2 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 ${isActive
                        ? "bg-[#064e3b] text-white shadow-md shadow-[#064e3b]/30 scale-105 ring-4 ring-white"
                        : "bg-white text-[#064e3b] shadow-sm border border-slate-200/80"
                        }`}
                    >
                      <QuotationIcon className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Centered Circular Outline Pagination Bullets */}
          <div className="flex items-center justify-center mt-8">
            <div className="custom-swiper-pagination flex items-center justify-center gap-2 !w-auto" />
          </div>
        </div>
      </div>

      {/* Pagination bullets */}
      <style jsx global>{`
        .custom-bullet {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          border: none !important;
          outline: none !important;
          background-color: #fde68a !important;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 1 !important;
          margin: 0 4px !important;
        }
        .custom-bullet:hover {
          background-color: #f59e0b !important;
          border: none !important;
        }
        .custom-bullet-active {
          width: 28px !important;
          border-radius: 9999px !important;
          background-color: #d97706 !important;
          border: none !important;
          outline: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
