"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { useConfirm } from "@/context/ConfirmContext";
import {
  AdminPageSection,
  AdminFaqItem,
  AdminTestimonialItem,
  AdminGalleryItem,
  AdminMenuItem,
} from "@/lib/admin-data";
import PageSectionModal from "@/components/admin/PageSectionModal";
import { FaqModal } from "@/components/admin/FaqModal";
import { TestimonialModal } from "@/components/admin/TestimonialModal";
import { GalleryModal } from "@/components/admin/GalleryModal";
import { StaticMenuModal } from "@/components/admin/StaticMenuModal";
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
  UtensilsCrossed,
  UploadCloud,
  Check,
  RefreshCw,
  Globe,
  ExternalLink,
  ShieldCheck,
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
    testimonialSettings,
    updateTestimonialSettings,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useAdmin();
  const { confirmDelete } = useConfirm();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const [selectedPageKey, setSelectedPageKey] = useState<string>(pageParam || "home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [editingHero, setEditingHero] = useState(false);
  const [heroForm, setHeroForm] = useState({
    heroBadge: "",
    heroTitle: "",
    heroSubtitle: "",
    heroBackgroundImage: "",
    metaDescription: "",
  });

  // Testimonial & Google Reviews sub-tab inside Box 2
  const [reviewsTab, setReviewsTab] = useState<"manual" | "google">("manual");
  const [googlePlaceUrl, setGooglePlaceUrl] = useState(
    testimonialSettings?.googlePlaceUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb"
  );
  const [googlePlaceId, setGooglePlaceId] = useState(
    testimonialSettings?.googlePlaceId || "ChIJ74-8t225-TkRk9b3Psm9Fz8"
  );
  const [featurableId, setFeaturableId] = useState(
    testimonialSettings?.featurableId || ""
  );
  const [googleApiKey, setGoogleApiKey] = useState(
    testimonialSettings?.googleApiKey || ""
  );
  const [googleRating, setGoogleRating] = useState(
    String(testimonialSettings?.googleRating || 4.9)
  );
  const [googleReviewsCount, setGoogleReviewsCount] = useState(
    String(testimonialSettings?.googleReviewsCount || 284)
  );

  useEffect(() => {
    if (testimonialSettings) {
      if (testimonialSettings.googlePlaceUrl) setGooglePlaceUrl(testimonialSettings.googlePlaceUrl);
      if (testimonialSettings.googlePlaceId) setGooglePlaceId(testimonialSettings.googlePlaceId);
      if (testimonialSettings.featurableId) setFeaturableId(testimonialSettings.featurableId);
      if (testimonialSettings.googleApiKey) setGoogleApiKey(testimonialSettings.googleApiKey);
      if (testimonialSettings.googleRating) setGoogleRating(String(testimonialSettings.googleRating));
      if (testimonialSettings.googleReviewsCount) setGoogleReviewsCount(String(testimonialSettings.googleReviewsCount));
      if (testimonialSettings.displayMode) setReviewsTab(testimonialSettings.displayMode);
    }
  }, [testimonialSettings]);

  // Photo upload state for Hero background
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const [bgFileName, setBgFileName] = useState<string | null>(null);

  // Modal State for custom sections
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [activeSectionToEdit, setActiveSectionToEdit] = useState<AdminPageSection | null>(null);

  // Modals for specialized sections
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaqItem | null>(null);

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<AdminTestimonialItem | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<AdminGalleryItem | null>(null);

  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<{ id: string; name: string; tagline?: string; description?: string; photo: string } | null>(null);

  // When query parameter changes in URL, sync selected page
  useEffect(() => {
    if (pageParam && pageContents.some((p) => p.pageKey === pageParam)) {
      setSelectedPageKey(pageParam);
    } else if (pageParam === "gallery") {
      setSelectedPageKey("gallery");
    } else if (!pageParam) {
      setSelectedPageKey("home");
    }
  }, [pageParam, pageContents]);

  const currentPage =
    pageContents.find((p) => p.pageKey === selectedPageKey) || {
      pageKey: "gallery",
      pageName: "Photo Gallery Page",
      pageRoute: "/gallery",
      heroTitle: "Photo & Safari Gallery",
      heroSubtitle:
        "Immerse yourself in authentic moments from our luxury boat safaris, Royal Bengal Tiger sightings, Hotel Sonar Bangla resort stays, and cultural evenings.",
      heroBadge: "Visual Highlights",
      heroBackgroundImage:
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80",
      metaDescription: "Visual gallery of Sundarban luxury tours, river cruises, and resort moments.",
      sections: [],
    };

  // Sync heroForm when selected page changes
  useEffect(() => {
    if (currentPage) {
      setHeroForm({
        heroBadge: currentPage.heroBadge || "",
        heroTitle: currentPage.heroTitle || "",
        heroSubtitle: currentPage.heroSubtitle || "",
        heroBackgroundImage:
          currentPage.heroBackgroundImage ||
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
        metaDescription: currentPage.metaDescription || "",
      });
      setBgFileName(null);
      setEditingHero(false);
    }
  }, [selectedPageKey, currentPage]);

  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBgFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setHeroForm((prev) => ({
          ...prev,
          heroBackgroundImage: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

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

  // Menu Modal Handlers
  const handleOpenAddMenu = () => {
    setEditingMenuItem(null);
    setMenuModalOpen(true);
  };

  const handleOpenEditMenu = (item: AdminMenuItem) => {
    setEditingMenuItem({
      id: item.id,
      name: item.name,
      tagline: item.tag,
      description: item.description,
      photo: item.image,
    });
    setMenuModalOpen(true);
  };

  const handleSaveMenu = (itemData: { name: string; tagline?: string; description?: string; photo: string }) => {
    if (editingMenuItem) {
      updateMenuItem(editingMenuItem.id, {
        name: itemData.name,
        tag: itemData.tagline || "Special Dish",
        description: itemData.description || "",
        image: itemData.photo,
      });
    } else {
      addMenuItem({
        name: itemData.name,
        tag: itemData.tagline || "Special Dish",
        description: itemData.description || "",
        image: itemData.photo,
        category: "Bengali Non-Veg",
        priceTag: "Included in Package",
        isChefSpecial: true,
        status: "Active",
      });
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
      case "gallery":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <Layers className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title={selectedPageKey === "home" ? "Home Page Content" : `${currentPage.pageName} Content`}
        subtitle={
          selectedPageKey === "home"
            ? "Manage Special Food Menu, Client Testimonials, and FAQs"
            : `Route: ${currentPage.pageRoute} • Manage Title, Description, Background Photo & Content`
        }
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">

        {/* ========================================================================= */}
        {/* 1. HOME PAGE VIEW: TESTIMONIALS, FAQ, SPECIAL FOOD MENU (GALLERY OUT)     */}
        {/* ========================================================================= */}
        {selectedPageKey === "home" ? (
          <div className="space-y-6">
            {/* BOX 1: SPECIAL FOOD MENU (PLACED INSIDE HOME PAGE) */}
            <div className="bg-white border border-rose-200/90 rounded-[4px] shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 bg-rose-50/70 border-b border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[3px] bg-rose-600 text-white flex items-center justify-center shadow-xs">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Special Food Menu &amp; Bengali Cuisine</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-950 font-mono text-[10px] font-bold">
                        {menuItems.length} Delicacies
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Displays in &ldquo;Our Special Menu&rdquo; slider on the Homepage
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddMenu}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-[3px] shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Special Dish</span>
                  </button>
                </div>
              </div>

              {/* Special Food Menu Grid List */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[460px] overflow-y-auto">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-[4px] border border-slate-200 overflow-hidden shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 w-full bg-slate-100 overflow-hidden shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="240px"
                            unoptimized={item.image.startsWith("data:")}
                          />
                        ) : null}
                        {item.tag && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-[3px] bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider shadow-xs z-10">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 text-[11px]">Homepage Dish</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditMenu(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[3px] text-[11px] font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 transition-colors shadow-2xs cursor-pointer"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (await confirmDelete(`"${item.name}"`, `Remove "${item.name}" from homepage menu?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[3px] text-[11px] font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 2: CLIENT TESTIMONIALS & GOOGLE REVIEWS */}
            <div className="bg-white border border-amber-200/90 rounded-[4px] shadow-xs overflow-hidden">
              {/* Header with Switcher */}
              <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[3px] bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Client Reviews &amp; Testimonials</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px] font-bold">
                        {testimonials.length} Total
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Public homepage slider display source
                    </p>
                  </div>
                </div>

                {/* Switcher & Action */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Website Display Mode Switch */}
                  <div className="flex items-center bg-white p-1 rounded border border-amber-300 shadow-2xs">
                    <span className="text-[11px] font-bold text-slate-600 px-2 select-none">
                      Active on Web:
                    </span>
                    <button
                      type="button"
                      onClick={() => updateTestimonialSettings({ displayMode: "manual" })}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        (testimonialSettings?.displayMode || "manual") === "manual"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      📝 Manual
                    </button>
                    <button
                      type="button"
                      onClick={() => updateTestimonialSettings({ displayMode: "google" })}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        testimonialSettings?.displayMode === "google"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>Google Reviews</span>
                    </button>
                  </div>

                  {reviewsTab === "manual" ? (
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
                  ) : (
                    <a
                      href={googlePlaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
                    >
                      <span>Google Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Sub-tabs: Manual Reviews vs Google Reviews Connection */}
              <div className="flex border-b border-amber-100 bg-slate-50/70 px-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setReviewsTab("manual")}
                  className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    reviewsTab === "manual"
                      ? "border-amber-600 text-amber-900 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span>📝 Manual Reviews ({testimonials.filter((t) => (t.source || "manual") === "manual").length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewsTab("google")}
                  className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    reviewsTab === "google"
                      ? "border-blue-600 text-blue-900 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Live Connection &amp; Settings</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Live Stream
                  </span>
                </button>
              </div>

              {/* TAB 1: MANUAL REVIEWS LIST */}
              {reviewsTab === "manual" && (
                <div className="p-4 space-y-2.5 max-h-[350px] overflow-y-auto">
                  {testimonials
                    .filter((item) => (item.source || "manual") === "manual")
                    .map((item) => (
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
                            className="p-1.5 rounded text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors border border-slate-200 cursor-pointer"
                            title="Edit Review"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (await confirmDelete(`Review by "${item.name}"`, `Delete review by "${item.name}"?`)) {
                                deleteTestimonial(item.id);
                              }
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200 cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  {testimonials.filter((item) => (item.source || "manual") === "manual").length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-500">
                      No manual reviews yet. Click &ldquo;Add Review&rdquo; above to add one.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GOOGLE REVIEWS LIVE CONNECTION & SETTINGS */}
              {reviewsTab === "google" && (
                <div className="p-4 bg-blue-50/40 text-xs space-y-4">
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-blue-200/90 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2">
                        {featurableId || googleApiKey ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        )}
                        <h4 className="font-extrabold text-slate-900 text-xs">
                          {featurableId || googleApiKey
                            ? "Live Google Connection Active"
                            : "Live Connection Ready (Credentials Pending)"}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl leading-relaxed">
                        {featurableId || googleApiKey
                          ? `Live reviews automatically stream directly from Google via ${featurableId ? "react-google-reviews (Featurable)" : "Google Places API"} onto your public homepage.`
                          : "Save your free Featurable Widget ID (or Google Places API key) below. The moment you save, original live reviews from Google will automatically appear on your public website without needing any code changes."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        updateTestimonialSettings({
                          googlePlaceUrl,
                          googlePlaceId,
                          featurableId,
                          googleApiKey,
                          googleRating: parseFloat(googleRating) || 4.9,
                          googleReviewsCount: parseInt(googleReviewsCount, 10) || 284,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors self-start sm:self-auto cursor-pointer shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Google Credentials</span>
                    </button>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Featurable Widget ID (Free)</span>
                        <a
                          href="https://featurable.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-[10px] font-semibold"
                        >
                          Get Free ID &rarr;
                        </a>
                      </label>
                      <input
                        type="text"
                        value={featurableId}
                        onChange={(e) => setFeaturableId(e.target.value)}
                        placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                        className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-mono text-xs outline-none focus:border-blue-600 truncate"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Used by react-google-reviews for 100% free direct stream
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Google Places API Key (Optional)
                      </label>
                      <input
                        type="text"
                        value={googleApiKey}
                        onChange={(e) => setGoogleApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-mono text-xs outline-none focus:border-blue-600 truncate"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        For direct Google Cloud Places API integration
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Google Place ID
                      </label>
                      <input
                        type="text"
                        value={googlePlaceId}
                        onChange={(e) => setGooglePlaceId(e.target.value)}
                        placeholder="ChIJ74-8t225-TkRk9b3Psm9Fz8"
                        className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-mono text-xs outline-none focus:border-blue-600 truncate"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Google Maps Profile URL</span>
                        {googlePlaceUrl && (
                          <a
                            href={googlePlaceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-0.5 text-[10px]"
                          >
                            <span>Test</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </label>
                      <input
                        type="url"
                        value={googlePlaceUrl}
                        onChange={(e) => setGooglePlaceUrl(e.target.value)}
                        placeholder="https://maps.app.goo.gl/..."
                        className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-medium text-xs outline-none focus:border-blue-600 truncate"
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-2 lg:col-span-2 p-3 bg-emerald-50/80 border border-emerald-200/90 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                          ★
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-950">
                              Google Business Metrics
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-200/90 text-[10px] font-extrabold text-emerald-800">
                              Live Auto-Synced
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-700 mt-0.5">
                            Google Rating: <strong className="font-extrabold text-emerald-900">{googleRating || "4.9"} ★</strong> &bull; Total Verified Reviews: <strong className="font-extrabold text-emerald-900">{googleReviewsCount || "32"}+</strong>
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-emerald-700/80 italic shrink-0">
                        Automatically fetched live from Google &bull; No manual entry needed
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BOX 3: FAQ QUESTIONS */}
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
                        onClick={async () => {
                          if (await confirmDelete(`FAQ Question`, `Delete FAQ "${item.question}"?`)) {
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
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. NON-HOME PAGES: ABOUT US, CONTACT US, GALLERY, HOTEL, TOURS            */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* HERO SECTION EDITOR (TITLE, DESCRIPTION, BACKGROUND PHOTO) */}
            <div className="bg-white border border-slate-200/90 rounded-[4px] p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Header &amp; Background Photo Settings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls the banner title, description, and hero background image for {currentPage.pageName}
                  </p>
                </div>
                {!editingHero && (
                  <button
                    onClick={() => setEditingHero(true)}
                    className="px-3.5 py-1.5 rounded-[3px] bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Header &amp; Photo</span>
                  </button>
                )}
              </div>

              {editingHero ? (
                <form onSubmit={handleSaveHero} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Page Hero Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={heroForm.heroTitle}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, heroTitle: e.target.value })
                      }
                      placeholder="e.g. Pioneering Luxury In Sundarban"
                      className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Hero Description / Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.heroSubtitle}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, heroSubtitle: e.target.value })
                      }
                      placeholder="e.g. Dedicated to sustainable eco-tourism, local community empowerment, and unforgettable luxury wilderness expeditions."
                      className="w-full p-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Background Photo Upload Option */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <label className="block font-bold text-slate-700 text-xs">
                      Background Photo Upload
                    </label>

                    <input
                      ref={bgFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleHeroBgUpload}
                      className="hidden"
                    />

                    {/* Preview or Upload Area */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="relative h-32 md:col-span-1 rounded-[4px] overflow-hidden bg-slate-100 border border-slate-300 group">
                        {heroForm.heroBackgroundImage ? (
                          <>
                            <Image
                              src={heroForm.heroBackgroundImage}
                              alt="Hero Background Preview"
                              fill
                              className="object-cover"
                              unoptimized={heroForm.heroBackgroundImage.startsWith("data:")}
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => bgFileInputRef.current?.click()}
                                className="px-2.5 py-1 rounded-[3px] bg-white text-slate-900 font-bold text-[11px] flex items-center gap-1 shadow-sm hover:bg-slate-100"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Change</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                            No background photo
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <div
                          onClick={() => bgFileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-[4px] p-4 flex items-center justify-center gap-3 cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-colors"
                        >
                          <UploadCloud className="w-5 h-5 text-blue-600" />
                          <div className="text-left">
                            <span className="font-bold text-slate-800 text-xs block">
                              Upload new background photo from device
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Supports JPG, PNG, WebP (Landscape recommended)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingHero(false)}
                      className="px-4 py-2 rounded-[3px] border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs text-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                  <div className="relative h-28 md:col-span-1 rounded-[4px] overflow-hidden bg-slate-100 border border-slate-200">
                    {heroForm.heroBackgroundImage ? (
                      <Image
                        src={heroForm.heroBackgroundImage}
                        alt="Hero Background Preview"
                        fill
                        className="object-cover"
                        unoptimized={heroForm.heroBackgroundImage.startsWith("data:")}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                        No background photo
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono font-bold">
                      Hero Banner
                    </span>
                  </div>

                  <div className="md:col-span-2 space-y-1.5 text-xs">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {heroForm.heroTitle || "No Title Set"}
                    </h4>
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {heroForm.heroSubtitle || "No description set yet."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ================================================================= */}
            {/* SPECIAL PAGE MODULES: GALLERY PAGE CONTENT                        */}
            {/* ================================================================= */}
            {selectedPageKey === "gallery" && (
              <div className="space-y-6">
                {/* PHOTO GALLERY MANAGEMENT */}
                <div className="bg-white border border-emerald-200/90 rounded-[4px] shadow-xs overflow-hidden">
                  <div className="px-5 py-3.5 bg-emerald-50/70 border-b border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[3px] bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <span>Photo Gallery Photos &amp; Highlights</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-mono text-[10px] font-bold">
                            {galleryItems.length} Photos
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Displays in interactive grid on the Photo Gallery Page (/gallery)
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
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[380px] overflow-y-auto">
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
                            {item.column || "Photo"}
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
                              title="Edit Photo"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={async () => {
                                if (await confirmDelete(`Photo "${item.title}"`, `Remove photo "${item.title}"?`)) {
                                  deleteGalleryItem(item.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600"
                              title="Delete Photo"
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
            )}

            {/* ================================================================= */}
            {/* SPECIAL PAGE MODULES: ABOUT US PAGE CONTENT                       */}
            {/* ================================================================= */}
            {selectedPageKey === "about" && (
              <div className="bg-white border border-slate-200/90 rounded-[4px] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      About Us Story &amp; Heritage Sections
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage eco-conservation pledges, legacy highlights, and wildlife tracking stories.
                    </p>
                  </div>
                  <button
                    onClick={openAddSection}
                    className="px-3.5 py-1.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {currentPage.sections?.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No custom story sections added. Click &ldquo;Add Section&rdquo; to create one.
                    </p>
                  ) : (
                    currentPage.sections?.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-4 rounded-[3px] bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1 text-xs">
                          {sec.badgeText && (
                            <span className="inline-block px-2 py-0.2 rounded bg-blue-100 text-blue-700 font-bold text-[10px] uppercase">
                              {sec.badgeText}
                            </span>
                          )}
                          <h4 className="font-extrabold text-slate-900 text-sm">
                            {sec.title}
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {sec.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditSection(sec)}
                            className="p-1.5 rounded text-slate-600 hover:text-blue-700 hover:bg-white border border-slate-200"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (await confirmDelete(`Section "${sec.title}"`, `Delete section "${sec.title}"?`)) {
                                deletePageSection(selectedPageKey, sec.id);
                              }
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-white border border-slate-200"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODALS */}
      {/* 1. Custom Page Section Modal */}
      <PageSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        onSave={handleSaveSection}
        section={activeSectionToEdit}
        pageTitle={currentPage.pageName}
      />

      {/* 2. FAQ Modal */}
      <FaqModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        onSave={(faqData) => {
          if (editingFaq) {
            updateFaq(editingFaq.id, faqData);
          } else {
            addFaq(faqData);
          }
        }}
        initialFaq={editingFaq}
      />

      {/* 3. Testimonial Modal */}
      <TestimonialModal
        isOpen={testimonialModalOpen}
        onClose={() => setTestimonialModalOpen(false)}
        onSave={(itemData) => {
          if (editingTestimonial) {
            updateTestimonial(editingTestimonial.id, itemData);
          } else {
            addTestimonial(itemData);
          }
        }}
        initialTestimonial={editingTestimonial}
      />

      {/* 4. Photo Gallery Modal */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        onSave={(itemData) => {
          if (editingGalleryItem) {
            updateGalleryItem(editingGalleryItem.id, itemData);
          } else {
            addGalleryItem(itemData);
          }
        }}
        initialGalleryItem={editingGalleryItem}
      />

      {/* 5. Special Food Menu Modal */}
      <StaticMenuModal
        isOpen={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        onSave={handleSaveMenu}
        initialItem={editingMenuItem}
      />
    </div>
  );
}

export default function AdminPagesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 font-bold text-sm">
          Loading Page Management...
        </div>
      }
    >
      <AdminPagesContent />
    </Suspense>
  );
}
