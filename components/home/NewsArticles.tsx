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
  const [articles, setArticles] = React.useState(blogPosts.slice(0, 8));

  React.useEffect(() => {
    fetch("/api/blog?limit=8")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setArticles(data.posts);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-8 md:py-16 bg-secondary/5 relative overflow-hidden">
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
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
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
            className="news-articles-swiper !overflow-visible pb-12 [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.slug} className="h-auto cursor-pointer">
                <article className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image with Category Badge */}
                  <div className="relative w-full h-50 sm:h-60 overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-black px-3 py-1 rounded-full border border-slate-100">
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
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-foreground font-bold text-base sm:text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
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
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-all duration-300"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:text-secondary" />
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Global CSS for Swiper pagination bullets */}
      <style jsx global>{`
        .news-articles-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 1.5rem !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .news-articles-swiper .custom-bullet {
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
        .news-articles-swiper .custom-bullet:hover {
          background-color: #f59e0b !important;
          border: none !important;
        }
        .news-articles-swiper .custom-bullet-active {
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

export default NewsArticles;
