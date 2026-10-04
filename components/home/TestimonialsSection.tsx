"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useAdmin } from "@/context/AdminContext";
import { GoogleReviewsWidget } from "./GoogleReviewsWidget";
import { ReviewAvatar } from "@/components/ui/ReviewAvatar";

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

function GoogleIcon({ className = "w-4 h-4", isWhite = false }: { className?: string; isWhite?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill={isWhite ? "currentColor" : "#4285F4"}
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill={isWhite ? "currentColor" : "#34A853"}
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill={isWhite ? "currentColor" : "#FBBC05"}
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill={isWhite ? "currentColor" : "#EA4335"}
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  const { testimonials, testimonialSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState<"manual" | "google">(
    testimonialSettings?.displayMode || "google"
  );

  // Sync tab if admin changes displayMode setting
  useEffect(() => {
    if (testimonialSettings?.displayMode) {
      setActiveTab(testimonialSettings.displayMode);
    }
  }, [testimonialSettings?.displayMode]);

  const activeTestimonials = testimonials.filter((t) => t.status === "Active");
  const manualList = activeTestimonials.filter((t) => (t.source || "manual") === "manual");
  const displayItems = manualList.length > 0 ? manualList : activeTestimonials;

  const googleRating = testimonialSettings?.googleRating || 4.9;
  const reviewsCount = testimonialSettings?.googleReviewsCount || 284;
  const googleUrl =
    testimonialSettings?.googlePlaceUrl ||
    "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";

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

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="sec-header text-center">
          <p className="sec-tagline">
            Testimonial &amp; Reviews
          </p>
          <h2 className="sec-title">
            What Our Clients Say About Their Experience
          </h2>

          {/* Switchable Review Tabs (Manual vs Google) */}
          <div className="mt-4 flex flex-row items-center justify-center gap-2 sm:gap-2.5 px-2">
            <button
              onClick={() => setActiveTab("manual")}
              type="button"
              className={`inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-sm gap-1.5 ${activeTab === "manual"
                ? "bg-[#064e3b] text-white border border-[#064e3b]"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              <span>Guest Experiences</span>
            </button>

            <button
              onClick={() => setActiveTab("google")}
              type="button"
              className={`inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-sm gap-1.5 ${activeTab === "google"
                ? "bg-[#064e3b] text-white border border-[#064e3b]"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              <GoogleIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" isWhite={activeTab === "google"} />
              <span>Google Reviews</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display: Direct Google Reviews vs Manual Guest Experiences */}
        {activeTab === "google" ? (
          <div className="mt-6">
            <GoogleReviewsWidget
              featurableId={testimonialSettings?.featurableId}
              googlePlaceId={testimonialSettings?.googlePlaceId}
              googlePlaceUrl={googleUrl}
              googleRating={googleRating}
              googleReviewsCount={reviewsCount}
            />
          </div>
        ) : (
          /* Manual Testimonials Swiper Slider */
          <div className="relative mt-8">
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
                  spaceBetween: 24,
                  centeredSlides: false,
                },
              }}
              className="!pb-8 px-1"
            >
              {displayItems.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto flex">
                  <div className="w-full h-full relative flex flex-col rounded-2xl justify-between bg-white p-6 sm:p-7 md:p-8 transition-all duration-300 min-h-[300px] border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300">
                    <div>
                      {/* Card Header: Avatar, Name & Stars */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3 min-w-0">
                          <ReviewAvatar
                            src={item.avatar}
                            name={item.name}
                            size={48}
                            ringClass="ring-2 ring-[#d97706]/40"
                          />
                          <div className="min-w-0">
                            <h4 className="text-base font-bold text-[#0f172a] leading-tight truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
                              {item.role || "Guest"}
                            </p>
                            {item.date && (
                              <span className="text-[10px] text-slate-400 font-medium block">
                                {item.date}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Star Ratings */}
                        <div className="flex items-center gap-0.5 text-[#d97706] shrink-0">
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
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#064e3b] shadow-xs border border-slate-200">
                      <QuotationIcon className="w-4 h-4" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default TestimonialsSection;
