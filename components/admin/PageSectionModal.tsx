"use client";

import React, { useState, useEffect } from "react";
import { AdminPageSection } from "@/lib/admin-data";
import { X, Layout, Sparkles, AlertTriangle, Layers, AlertCircle } from "lucide-react";

interface PageSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Omit<AdminPageSection, "id">) => void;
  section: AdminPageSection | null;
  pageTitle: string;
}

export default function PageSectionModal({
  isOpen,
  onClose,
  onSave,
  section,
  pageTitle,
}: PageSectionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    styleType: "standard" as AdminPageSection["styleType"],
    badgeText: "",
    ctaText: "",
    ctaUrl: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (section) {
      setFormData({
        title: section.title,
        subtitle: section.subtitle || "",
        content: section.content,
        styleType: section.styleType || "standard",
        badgeText: section.badgeText || "",
        ctaText: section.ctaText || "",
        ctaUrl: section.ctaUrl || "",
        order: section.order || 1,
        isActive: section.isActive ?? true,
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        content: "",
        styleType: "standard",
        badgeText: "",
        ctaText: "",
        ctaUrl: "",
        order: 1,
        isActive: true,
      });
    }
  }, [section, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[4px] shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-[3px]">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {section ? "Edit Page Section" : "Add New Page Section"}
              </h2>
              <p className="text-xs text-slate-500">Target Page: {pageTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Section Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Government Boat Safety Guidelines & Permits"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. URGENT NOTICE / VIP OFFER"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Subtitle (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Mandatory identification requirements for all international and domestic travelers"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Section Style Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Visual Section Style Variant *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-all ${
                  formData.styleType === "standard"
                    ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="styleType"
                  value="standard"
                  checked={formData.styleType === "standard"}
                  onChange={() => setFormData({ ...formData, styleType: "standard" })}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-medium text-xs text-slate-800">
                    <Layers className="w-3.5 h-3.5 text-slate-600" />
                    Standard Slate Card
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Clean corporate content block with light slate background.</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-all ${
                  formData.styleType === "alert-red"
                    ? "border-red-600 bg-red-50/60 ring-1 ring-red-600"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="styleType"
                  value="alert-red"
                  checked={formData.styleType === "alert-red"}
                  onChange={() => setFormData({ ...formData, styleType: "alert-red" })}
                  className="mt-1 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-red-700">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    Red Alert Notice Box
                  </div>
                  <p className="text-[11px] text-red-600/80 mt-0.5">High-visibility urgent advisory, weather warning, or notice.</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-all ${
                  formData.styleType === "highlight-gold"
                    ? "border-amber-500 bg-amber-50/60 ring-1 ring-amber-500"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="styleType"
                  value="highlight-gold"
                  checked={formData.styleType === "highlight-gold"}
                  onChange={() => setFormData({ ...formData, styleType: "highlight-gold" })}
                  className="mt-1 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Gold Executive Spotlight
                  </div>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">Warm amber highlight card for premium inclusions & guarantees.</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-all ${
                  formData.styleType === "feature-box"
                    ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="styleType"
                  value="feature-box"
                  checked={formData.styleType === "feature-box"}
                  onChange={() => setFormData({ ...formData, styleType: "feature-box" })}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-blue-800">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    Blue Feature Banner
                  </div>
                  <p className="text-[11px] text-blue-700/80 mt-0.5">Structured technical feature box with subtle blue borders.</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Body Content / Markdown Text *
            </label>
            <textarea
              required
              rows={5}
              placeholder="Write the detailed text, bullets, or instructions here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Button Text (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Read Guidelines"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Button Link / URL (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. /contact"
                value={formData.ctaUrl}
                onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded-[2px] text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-800">Section is Live / Visible</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
            >
              {section ? "Save Section" : "Add Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
