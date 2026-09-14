"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { blogPosts } from "@/lib/blog-data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function NewsArticles() {
  const swiperRef = useRef<SwiperClass | null>(null);

  // Take featured posts for the home carousel
  const featuredPosts = blogPosts.slice(0, 8);

  return (
    <section className="py-8 md:py-16 bg-[#fef8e2] relative overflow-hidden border-y border-amber-100/70">
      <div className="container">
        {/* Header row: title and description */}
        <div className="sec-header">
          <span className="sec-tagline">About Us &amp; Travel</span>
          <h2 className="sec-title">News &amp; Articles From Sundarban</h2>
          <p className="sec-desc">
            Explore insightful guides, wildlife stories, and travel advice curated by our mangrove naturalists.
          </p>
        </div>

        {/* 3 Slides per view Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={20}
            speed={600}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".blog-swiper-pagination",
              bulletClass: "swiper-pagination-bullet !w-2.5 !h-2.5 !bg-[#fde68a] !border-0 !outline-none !opacity-100 transition-all duration-300",
              bulletActiveClass: "!w-8 !rounded-full !bg-[#d97706] !border-0 !outline-none",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="w-full !overflow-visible"
          >
            {featuredPosts.map((article) => (
              <SwiperSlide key={article.slug} className="h-auto">
                <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image with Category Badge */}
                  <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#064e3b] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100">
                      {article.category}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                      <span>{article.date}</span>
                      <span className="w-[1px] h-3 bg-slate-300 inline-block" />
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0f172a] font-bold text-base sm:text-lg leading-snug mb-3 group-hover:text-[#064e3b] transition-colors duration-300 line-clamp-2">
                      <Link href={`/blog/${article.slug}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">
                      {article.excerpt}
                    </p>

                    {/* Read More button */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#064e3b] hover:text-[#d97706] transition-colors group-hover:translate-x-1 duration-300"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4 text-[#d97706]" />
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots container */}
          <div className="blog-swiper-pagination flex justify-center items-center gap-2 mt-8" />
        </div>
      </div>
    </section>
  );
}

export default NewsArticles;
