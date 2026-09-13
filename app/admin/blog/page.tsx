"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { BlogPost } from "@/lib/blog-data";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  Tag,
  Eye,
  CheckCircle,
  FileText,
  Layers,
  Sparkles,
  ArrowUpRight,
  MoreVertical,
  Globe,
  Star,
} from "lucide-react";

export default function AdminBlogManagerPage() {
  const router = useRouter();
  const { blogPostsList, addBlogPost, updateBlogPost, deleteBlogPost, showToast } = useAdmin();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(blogPostsList.map((p) => p.category)))];

  const filteredPosts = blogPostsList.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    const postStatus = post.status || "Published";
    const matchesStatus = statusFilter === "all" || postStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDuplicatePost = (post: BlogPost) => {
    const duplicated: BlogPost = {
      ...post,
      slug: `${post.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${post.title} (Draft Copy)`,
      status: "Draft",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    addBlogPost(duplicated);
    showToast(`Created duplicate draft for "${post.title}"`);
  };

  const handleToggleStatus = (post: BlogPost) => {
    const currentStatus = post.status || "Published";
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    updateBlogPost(post.slug, { status: newStatus });
    showToast(`Marked "${post.title}" as ${newStatus}`);
  };

  const handleToggleFeatured = (post: BlogPost) => {
    updateBlogPost(post.slug, { featured: !post.featured });
    showToast(`${post.featured ? "Unpinned" : "Pinned"} "${post.title}" as featured`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Blog & Editorial Publications"
        subtitle="WordPress-style content manager for Sundarban wildlife articles, safari guides, and travel blogs"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Articles &amp; Editorial Archive</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Create, edit, duplicate, and publish travel stories and guides.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[3px] hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Public Blog</span>
            </Link>
            <Link
              href="/admin/blog/editor"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Post</span>
            </Link>
          </div>
        </div>

      {/* KPI Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Articles</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{blogPostsList.length}</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Published Live</div>
          <div className="text-xl font-bold text-emerald-600 mt-0.5">
            {blogPostsList.filter((p) => (p.status || "Published") === "Published").length}
          </div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Categories Active</div>
          <div className="text-xl font-bold text-blue-600 mt-0.5">{categories.length - 1}</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Matching Search</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{filteredPosts.length}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded-[4px] border border-slate-200 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title, slug, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-[3px] bg-white font-medium focus:outline-hidden focus:border-blue-600"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-[3px] bg-white font-medium focus:outline-hidden focus:border-blue-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* WordPress-Style Post List Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4 min-w-[280px]">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date / Reads</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">No blog articles match your filters.</p>
                    <Link
                      href="/admin/blog/editor"
                      className="inline-block mt-3 px-3 py-1.5 bg-blue-600 text-white rounded font-bold text-xs"
                    >
                      Create First Article
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post, index) => {
                  const postStatus = post.status || "Published";
                  return (
                    <tr
                      key={post.slug}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Serial / Number */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {index + 1}
                      </td>

                      {/* Title & Cover Image Only */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                            <Image
                              src={post.image || "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 min-w-0">
                            {post.featured && (
                              <span className="p-0.5 text-amber-500 shrink-0" title="Pinned Featured">
                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                              </span>
                            )}
                            <Link
                              href={`/admin/blog/editor?slug=${post.slug}`}
                              className="font-bold text-slate-900 hover:text-blue-600 line-clamp-2 transition-colors text-xs leading-snug"
                            >
                              {post.title}
                            </Link>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                          {post.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200 shrink-0">
                            <Image
                              src={post.authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"}
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-slate-700 font-medium text-[11px]">
                            {post.author}
                          </span>
                        </div>
                      </td>

                      {/* Date / Read Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-[11px] text-slate-700 font-medium">{post.date}</div>
                        <div className="text-[10px] font-mono text-slate-400">{post.readTime}</div>
                      </td>

                      {/* Status Toggle Button */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(post)}
                          className="flex items-center gap-2 group cursor-pointer focus:outline-hidden select-none"
                          title={`Click to switch status to ${postStatus === "Published" ? "Inactive" : "Active"}`}
                        >
                          <div
                            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                              postStatus === "Published" ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
                                postStatus === "Published" ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider ${
                              postStatus === "Published" ? "text-emerald-700" : "text-slate-500"
                            }`}
                          >
                            {postStatus === "Published" ? "Active" : "Inactive"}
                          </span>
                        </button>
                      </td>

                      {/* Actions (Edit & Delete) */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/blog/editor?slug=${post.slug}`}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors border border-slate-200"
                            title="Edit Article"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                deleteBlogPost(post.slug);
                                showToast(`Deleted "${post.title}"`);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors border border-slate-200"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </div>
  );
}
