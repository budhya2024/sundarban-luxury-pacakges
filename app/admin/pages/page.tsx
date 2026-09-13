"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageSection,
  AdminFaqItem,
  AdminTestimonialItem,
  AdminGalleryItem,
} from "@/lib/admin-data";
import PageSectionModal from "@/components/admin/PageSectionModal";
import { FaqModal } from "@/components/admin/FaqModal";
import { TestimonialModal } from "@/components/admin/TestimonialModal";
import { GalleryModal } from "@/components/admin/GalleryModal";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Save,
  Home,
  Building2,
  Compass,
  PhoneCall,
  Eye,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  Star,
  Layers,
  ArrowLeft,
} from "lucide-react";

function AdminPagesContent() {
  const {
    pageContents,
    updatePageHero,
    addPageSection,
    updatePageSection,
    deletePageSection,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  } = useAdmin();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const [selectedPageKey, setSelectedPageKey] = useState<string>(pageParam || "home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [editingHero, setEditingHero] = useState(false);
  const [heroForm, setHeroForm] = useState({
    heroBadge: "",
    heroTitle: "",
    heroSubtitle: "",
    metaDescription: "",
  });

  // Modal State for custom sections (for non-home pages)
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [activeSectionToEdit, setActiveSectionToEdit] = useState<AdminPageSection | null>(null);

  // Modals for Home Page specialized boxes
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaqItem | null>(null);

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<AdminTestimonialItem | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<AdminGalleryItem | null>(null);

  // When query parameter changes in URL, sync selected page
  useEffect(() => {
    if (pageParam && pageContents.some((p) => p.pageKey === pageParam)) {
      setSelectedPageKey(pageParam);
    } else if (!pageParam) {
      setSelectedPageKey("home");
    }
  }, [pageParam, pageContents]);

  const currentPage = pageContents.find((p) => p.pageKey === selectedPageKey) || pageContents[0];

  // Sync heroForm when selected page changes
  useEffect(() => {
    if (currentPage) {
      setHeroForm({
        heroBadge: currentPage.heroBadge || "",
        heroTitle: currentPage.heroTitle || "",
        heroSubtitle: currentPage.heroSubtitle || "",
        metaDescription: currentPage.metaDescription || "",
      });
      setEditingHero(false);
    }
  }, [selectedPageKey, currentPage]);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageHero(selectedPageKey, heroForm);
    setEditingHero(false);
  };

  const openAddSection = () => {
    setActiveSectionToEdit(null);
    setIsSectionModalOpen(true);
  };

  const openEditSection = (sec: AdminPageSection) => {
    setActiveSectionToEdit(sec);
    setIsSectionModalOpen(true);
  };

  const handleSaveSection = (sectionData: Omit<AdminPageSection, "id">) => {
    if (activeSectionToEdit) {
      updatePageSection(selectedPageKey, activeSectionToEdit.id, sectionData);
    } else {
      addPageSection(selectedPageKey, sectionData);
    }
  };

  const getPageIcon = (key: string) => {
    switch (key) {
      case "home":
        return <Home className="w-4 h-4 text-blue-500" />;
      case "about":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "hotel":
        return <Building2 className="w-4 h-4 text-blue-500" />;
      case "tours":
        return <Compass className="w-4 h-4 text-blue-500" />;
      case "contact":
        return <PhoneCall className="w-4 h-4 text-blue-500" />;
      default:
        return <Layers className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title={selectedPageKey === "home" ? "Home Page Sections" : `${currentPage.pageName} Content`}
        subtitle={
          selectedPageKey === "home"
            ? "Manage Client Testimonials, FAQ Questions, and Photo Gallery"
            : `Route: ${currentPage.pageRoute}`
        }
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* ========================================================================= */}
        {/* 1. HOME PAGE VIEW: ONLY THE 3 MANAGEMENT BOXES (TESTIMONIALS, FAQ, GALLERY) */}
        {/* ========================================================================= */}
        {selectedPageKey === "home" ? (
          <div className="space-y-6">
            {/* Top Bar Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>Interactive Homepage Modules</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update customer reviews, FAQs, and recent photo gallery directly.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-[3px] hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Live Preview Home</span>
                </Link>
              </div>
            </div>

            {/* BOX 1: CLIENT TESTIMONIALS */}
            <div className="bg-white border border-amber-200/90 rounded-[4px] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[3px] bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Client Reviews &amp; Testimonials</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px] font-bold">
                        {testimonials.length} Reviews
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Displays in &ldquo;What Clients Say&rdquo; slider on Homepage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTestimonial(null);
                      setTestimonialModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-[3px] shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>
              </div>

              {/* Testimonial preview list */}
              <div className="p-4 space-y-2.5 max-h-[350px] overflow-y-auto">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-300">
                        <Image
                          src={item.avatar || "/assets/images/avatars/andrew.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">({item.role || "Guest"})</span>
                          <div className="flex items-center text-amber-500 text-[10px]">
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1 italic mt-0.5">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingTestimonial(item);
                          setTestimonialModalOpen(true);
                        }}
                        className="p-1.5 rounded text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors border border-slate-200"
                        title="Edit Review"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review by "${item.name}"?`)) {
                            deleteTestimonial(item.id);
                          }
                        }}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 2: FAQ QUESTIONS */}
            <div className="bg-white border border-blue-200/90 rounded-[4px] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 bg-blue-50/70 border-b border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[3px] bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Frequently Asked Questions (FAQ)</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 font-mono text-[10px] font-bold">
                        {faqs.length} Questions
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Displays in interactive FAQ accordion on Homepage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingFaq(null);
                      setFaqModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>
              </div>

              {/* FAQ preview list */}
              <div className="p-4 space-y-2.5 max-h-[350px] overflow-y-auto">
                {faqs.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-extrabold flex-shrink-0 font-mono">
                        {item.questionNumber || `Q${idx + 1}`}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.question}
                        </h4>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                          {item.answer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaq(item);
                          setFaqModalOpen(true);
                        }}
                        className="p-1.5 rounded text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors border border-slate-200"
                        title="Edit Question"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete FAQ "${item.question}"?`)) {
                            deleteFaq(item.id);
                          }
                        }}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 3: PHOTO GALLERY */}
            <div className="bg-white border border-emerald-200/90 rounded-[4px] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 bg-emerald-50/70 border-b border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[3px] bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Recent Photo Gallery</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-mono text-[10px] font-bold">
                        {galleryItems.length} Photos
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Displays in 5-column wave grid on Homepage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingGalleryItem(null);
                      setGalleryModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-[3px] shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Photo thumbnails preview */}
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[350px] overflow-y-auto">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded border border-slate-200 overflow-hidden bg-slate-100 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-black/70 text-white font-mono text-[9px] font-bold rounded">
                        {item.column}
                      </span>
                    </div>
                    <div className="p-2 bg-white flex items-center justify-between border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-800 truncate max-w-[80px]">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingGalleryItem(item);
                            setGalleryModalOpen(true);
                          }}
                          className="p-1 text-slate-500 hover:text-emerald-700"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove photo "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. OTHER PAGES (About, Hotel, Tours, Contact) */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Top Back Nav & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/pages?page=home"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  title="Back to Home Page"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    {getPageIcon(currentPage.pageKey)}
                    <span>{currentPage.pageName} Content</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Route: <code className="font-mono text-blue-600">{currentPage.pageRoute}</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={currentPage.pageRoute}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-[3px] hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Live Preview Page</span>
                </Link>
              </div>
            </div>

            {/* Hero Section & Metadata Editor */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-blue-100 text-blue-700 rounded-[3px]">
                    {getPageIcon(currentPage.pageKey)}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {currentPage?.pageName} — Hero Section &amp; Metadata
                    </h2>
                    <span className="text-[11px] text-slate-500 font-mono">{currentPage?.pageRoute}</span>
                  </div>
                </div>

                {!editingHero ? (
                  <button
                    onClick={() => setEditingHero(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-[3px] hover:bg-blue-100 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Hero Content
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingHero(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {editingHero ? (
                <form onSubmit={handleSaveHero} className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Hero Badge / Label
                      </label>
                      <input
                        type="text"
                        value={heroForm.heroBadge}
                        onChange={(e) => setHeroForm({ ...heroForm, heroBadge: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        SEO Meta Description
                      </label>
                      <input
                        type="text"
                        value={heroForm.metaDescription}
                        onChange={(e) => setHeroForm({ ...heroForm, metaDescription: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Main Hero Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={heroForm.heroTitle}
                      onChange={(e) => setHeroForm({ ...heroForm, heroTitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={2}
                      value={heroForm.heroSubtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingHero(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-[3px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-[3px] shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Hero Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    {currentPage.heroBadge && (
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold text-[11px] uppercase tracking-wider rounded-[2px]">
                        {currentPage.heroBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{currentPage.heroTitle}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {currentPage.heroSubtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Section List for Other Pages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Page Content Sections ({currentPage?.sections?.length || 0})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage individual content blocks for {currentPage?.pageName}
                  </p>
                </div>
                <button
                  onClick={openAddSection}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-[3px] shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Section
                </button>
              </div>

              <div className="space-y-3">
                {currentPage?.sections?.map((section, idx) => (
                  <div
                    key={section.id}
                    className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                          #{idx + 1}
                        </span>
                        {section.badgeText && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-[2px] uppercase">
                            {section.badgeText}
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {section.title}
                        </h4>
                      </div>
                      {section.subtitle && (
                        <p className="text-xs text-slate-500 line-clamp-1">{section.subtitle}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditSection(section)}
                        className="p-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-[3px] transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete section "${section.title}"?`)) {
                            deletePageSection(selectedPageKey, section.id);
                          }
                        }}
                        className="p-1.5 text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-[3px] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <PageSectionModal
        isOpen={isSectionModalOpen}
        section={activeSectionToEdit}
        pageTitle={currentPage?.pageName || "Page"}
        onClose={() => setIsSectionModalOpen(false)}
        onSave={handleSaveSection}
      />

      <FaqModal
        isOpen={faqModalOpen}
        initialFaq={editingFaq}
        onClose={() => setFaqModalOpen(false)}
        onSave={(data) => {
          if (editingFaq) {
            updateFaq(editingFaq.id, data);
          } else {
            addFaq(data);
          }
          setFaqModalOpen(false);
        }}
      />

      <TestimonialModal
        isOpen={testimonialModalOpen}
        initialTestimonial={editingTestimonial}
        onClose={() => setTestimonialModalOpen(false)}
        onSave={(data) => {
          if (editingTestimonial) {
            updateTestimonial(editingTestimonial.id, data);
          } else {
            addTestimonial(data);
          }
          setTestimonialModalOpen(false);
        }}
      />

      <GalleryModal
        isOpen={galleryModalOpen}
        initialGalleryItem={editingGalleryItem}
        onClose={() => setGalleryModalOpen(false)}
        onSave={(data) => {
          if (editingGalleryItem) {
            updateGalleryItem(editingGalleryItem.id, data);
          } else {
            addGalleryItem(data);
          }
          setGalleryModalOpen(false);
        }}
      />
    </div>
  );
}

export default function AdminPagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminPagesContent />
    </Suspense>
  );
}
