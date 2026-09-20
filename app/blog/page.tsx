"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaRegClock,
  FaTag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { blogPosts } from "@/lib/blog-data";

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [postsList, setPostsList] = useState(blogPosts);

  React.useEffect(() => {
    fetch("/api/blog?limit=100")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setPostsList(data.posts);
        }
      })
      .catch(() => {});
  }, []);

  const totalPages = Math.ceil(postsList.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = postsList.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const gridEl = document.getElementById("blog-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <main className="bg-slate-50/50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Deep Black Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Hero Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-4">
            News &amp; Articles
          </h1>

          {/* Subdescription */}
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-lg font-light leading-relaxed mb-6 drop-shadow-sm">
            Wildlife stories, travel guides, culture &amp; ecology from the heart of Sundarban.
          </p>

          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24]">Blog</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div id="blog-grid" className="py-8 md:py-16 scroll-mt-6">
        <div className="container">
          {/* Grid of posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md rounded-lg "
              >
                {/* Image Container */}
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#064e3b] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                    <span>{post.date}</span>
                    <span className="w-[1px] h-3 bg-slate-300 inline-block" />
                    <span className="flex items-center gap-1">
                      <FaRegClock className="w-3.5 h-3.5 text-[#d97706]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[#0f172a] font-bold text-base sm:text-lg leading-snug mb-3 group-hover:text-[#064e3b] transition-colors duration-300 line-clamp-2 flex-1">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(post.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#064e3b] bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-100/50"
                      >
                        <FaTag className="w-2.5 h-2.5 text-[#d97706]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more button */}
                  <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between text-sm font-bold text-[#0f172a] group-hover:text-[#064e3b] transition-colors">
                    <span>Read Article</span>
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Professional Pagination Structure */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left side text: Showing 1 to 9 of 20 articles */}
            <div className="text-xs sm:text-sm text-slate-500 font-normal">
              Showing{" "}
              <strong className="font-bold text-slate-800">{startIndex + 1}</strong>{" "}
              to{" "}
              <strong className="font-bold text-slate-800">
                {Math.min(startIndex + postsPerPage, postsList.length)}
              </strong>{" "}
              of{" "}
              <strong className="font-bold text-slate-800">{postsList.length}</strong>{" "}
              articles
            </div>

            {/* Right side navigation controls */}
            <nav
              className="flex items-center gap-2"
              aria-label="Blog Pagination"
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 px-3.5  text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 bg-[#f8faf9] hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 disabled:opacity-40 disabled:pointer-events-none shadow-2xs group cursor-pointer"
                aria-label="Previous Page"
              >
                <FaChevronLeft className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors" />
                <span>Previous</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1.5">
                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="h-10 w-8 flex items-center justify-center text-slate-400 text-sm font-medium select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const num = Number(pageNum);
                  const isActive = currentPage === num;

                  return (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num)}
                      className={`h-10 w-10  text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs ${isActive
                        ? "bg-[#064e3b] text-white border border-[#064e3b]"
                        : "bg-[#f8faf9] hover:bg-slate-100 text-slate-700 hover:text-[#064e3b] border border-slate-200/80"
                        }`}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Page ${num}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 px-3.5  text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 bg-[#f8faf9] hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 disabled:opacity-40 disabled:pointer-events-none shadow-2xs group cursor-pointer"
                aria-label="Next Page"
              >
                <span>Next</span>
                <FaChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
