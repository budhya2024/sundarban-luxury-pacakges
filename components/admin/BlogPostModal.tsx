"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/lib/blog-data";
import { X, BookOpen, Save } from "lucide-react";

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
  post: BlogPost | null;
}

export default function BlogPostModal({
  isOpen,
  onClose,
  onSave,
  post,
}: BlogPostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Travel Guides",
    readTime: "5 Min Read",
    author: "Editorial Team",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
    content: "",
    tags: "Sundarban, Wildlife, Safari, Luxury Tour",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        author: post.author || "Editorial Team",
        authorImage: post.authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        date: post.date,
        image: post.image,
        content: post.content,
        tags: post.tags ? post.tags.join(", ") : "Sundarban, Safari",
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        category: "Wildlife & Safari",
        readTime: "5 Min Read",
        author: "Editorial Team",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
        content: "",
        tags: "Sundarban, Wildlife, Safari, Luxury Tour",
      });
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50);

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: post ? prev.slug : autoSlug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogObj: BlogPost = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: formData.excerpt,
      category: formData.category,
      readTime: formData.readTime,
      author: formData.author,
      authorImage: formData.authorImage,
      date: formData.date,
      image: formData.image,
      content: formData.content,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onSave(blogObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[4px] shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-[3px]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {post ? "Edit Blog Article" : "Create New Blog Publication"}
              </h2>
              <p className="text-xs text-slate-500">Live Website Editorial Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Bengal Tiger Tracking in Sundarban Delta"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                placeholder="royal-bengal-tiger-tracking"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Editorial Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="Wildlife">Wildlife</option>
                <option value="Travel Guides">Travel Guides</option>
                <option value="Culture & Heritage">Culture & Heritage</option>
                <option value="Luxury Cruises">Luxury Cruises</option>
                <option value="Resort Stay">Resort Stay</option>
                <option value="Safety & Tips">Safety & Tips</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Read Time
              </label>
              <input
                type="text"
                placeholder="5 Min Read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Publish Date
              </label>
              <input
                type="text"
                placeholder="Sep 15, 2026"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Cover Image URL *
              </label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Short Summary / Excerpt *
            </label>
            <textarea
              required
              rows={2}
              placeholder="A captivating summary that appears on blog cards and Google snippets..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Article Body (Markdown supported) *
            </label>
            <textarea
              required
              rows={8}
              placeholder="Write the full comprehensive blog content here with headings, paragraphs, and insights..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-sans leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              SEO Tags / Keywords (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Sundarban, Bengal Tiger, Mangrove, Safari, Boat Cruise"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {post ? "Save Blog Changes" : "Publish Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
