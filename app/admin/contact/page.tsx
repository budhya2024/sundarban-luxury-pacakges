"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { AdminContactGeneralInfo } from "@/lib/admin-data";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  PhoneCall,
  Edit2,
  Phone,
  Save,
  MapPin,
  Mail,
  Clock,
  UploadCloud,
  RefreshCw,
  Eye,
  Inbox,
  X,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const PRESET_HERO_BG_IMAGES = [
  { name: "Mangrove Safari River", url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000" },
  { name: "Royal Bengal Tiger", url: "/assets/images/royal-bengal-tiger.jpg" },
  { name: "Boat Safari Delta", url: "/assets/images/boat-safari.jpg" },
  { name: "Hotel Sonar Bangla", url: "/assets/images/sonarbanglahotel.jpg" },
  { name: "Estuary Sunset", url: "/assets/images/estuary-sunset.jpg" },
  { name: "Luxury Cruise", url: "/assets/images/cruises.jpg" },
];

interface InfoCardData {
  key: "call" | "email" | "visit" | "hours";
  title: string;
  subtitle: string;
  detail: string;
  extra?: string; // Map link or secondary phone
  status: "Active" | "Inactive";
}

export default function AdminContactManagerPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    contactGeneralInfo,
    updateContactGeneralInfo,
    inquiries,
    deleteInquiry,
    pageContents,
    updatePageHero,
  } = useAdmin();

  const contactPage = pageContents.find((p) => p.pageKey === "contact");

  // Hero Section State
  const [editingHero, setEditingHero] = useState(false);
  const [heroForm, setHeroForm] = useState({
    heroTitle: contactPage?.heroTitle || contactGeneralInfo?.heroTitle || "Contact Sundarban Luxury",
    heroSubtitle:
      contactPage?.heroSubtitle ||
      contactGeneralInfo?.heroSubtitle ||
      "Have questions about our luxury river cruises, customized tiger safari packages, or private resort bookings? Our expert travel advisors are available 24/7 to assist you.",
    heroBackgroundImage:
      contactPage?.heroBackgroundImage ||
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
  });

  const bgFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contactPage) {
      setHeroForm({
        heroTitle: contactPage.heroTitle || "Contact Sundarban Luxury",
        heroSubtitle: contactPage.heroSubtitle || "",
        heroBackgroundImage:
          contactPage.heroBackgroundImage ||
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
      });
    }
  }, [contactPage]);

  // Handle Hero Background Image Upload
  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setHeroForm((prev) => ({ ...prev, heroBackgroundImage: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageHero("contact", {
      heroTitle: heroForm.heroTitle,
      heroSubtitle: heroForm.heroSubtitle,
      heroBackgroundImage: heroForm.heroBackgroundImage,
    });
    setEditingHero(false);
  };

  // 4 Info Cards State
  const [editingCard, setEditingCard] = useState<InfoCardData | null>(null);

  const cardsList: InfoCardData[] = [
    {
      key: "call",
      title: contactGeneralInfo?.callCardTitle || "Call Us",
      subtitle: contactGeneralInfo?.callCardSubtitle || "Speak directly with our travel experts",
      detail: contactGeneralInfo?.helpdeskPhone || "+91 70014 03498",
      status: contactGeneralInfo?.callCardStatus || "Active",
    },
    {
      key: "email",
      title: contactGeneralInfo?.emailCardTitle || "Email Us",
      subtitle: contactGeneralInfo?.emailCardSubtitle || "Get a response within 24 hours",
      detail: contactGeneralInfo?.officialEmail || "sundarbanluxurypackage@gmail.com",
      status: contactGeneralInfo?.emailCardStatus || "Active",
    },
    {
      key: "visit",
      title: contactGeneralInfo?.visitCardTitle || "Visit Us",
      subtitle: contactGeneralInfo?.visitCardSubtitle || "Our office location",
      detail: contactGeneralInfo?.mainAddress || "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
      extra: contactGeneralInfo?.googleMapEmbedUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
      status: contactGeneralInfo?.visitCardStatus || "Active",
    },
    {
      key: "hours",
      title: contactGeneralInfo?.hoursCardTitle || "Working Hours",
      subtitle: contactGeneralInfo?.hoursCardSubtitle || "We're available for you",
      detail: contactGeneralInfo?.workingHours || "Monday to Sunday: 8:00 AM – 9:00 PM IST",
      status: contactGeneralInfo?.hoursCardStatus || "Active",
    },
  ];

  const handleToggleCardStatus = (cardKey: InfoCardData["key"]) => {
    const card = cardsList.find((c) => c.key === cardKey);
    if (!card) return;
    const nextStatus = card.status === "Active" ? "Inactive" : "Active";

    const updatePayload: Partial<AdminContactGeneralInfo> = {};
    if (cardKey === "call") updatePayload.callCardStatus = nextStatus;
    if (cardKey === "email") updatePayload.emailCardStatus = nextStatus;
    if (cardKey === "visit") updatePayload.visitCardStatus = nextStatus;
    if (cardKey === "hours") updatePayload.hoursCardStatus = nextStatus;

    updateContactGeneralInfo(updatePayload);
  };

  const handleSaveCardModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    const updatePayload: Partial<AdminContactGeneralInfo> = {};
    if (editingCard.key === "call") {
      updatePayload.callCardTitle = editingCard.title;
      updatePayload.callCardSubtitle = editingCard.subtitle;
      updatePayload.helpdeskPhone = editingCard.detail;
      updatePayload.callCardStatus = editingCard.status;
    } else if (editingCard.key === "email") {
      updatePayload.emailCardTitle = editingCard.title;
      updatePayload.emailCardSubtitle = editingCard.subtitle;
      updatePayload.officialEmail = editingCard.detail;
      updatePayload.emailCardStatus = editingCard.status;
    } else if (editingCard.key === "visit") {
      updatePayload.visitCardTitle = editingCard.title;
      updatePayload.visitCardSubtitle = editingCard.subtitle;
      updatePayload.mainAddress = editingCard.detail;
      if (editingCard.extra) updatePayload.googleMapEmbedUrl = editingCard.extra;
      updatePayload.visitCardStatus = editingCard.status;
    } else if (editingCard.key === "hours") {
      updatePayload.hoursCardTitle = editingCard.title;
      updatePayload.hoursCardSubtitle = editingCard.subtitle;
      updatePayload.workingHours = editingCard.detail;
      updatePayload.hoursCardStatus = editingCard.status;
    }

    updateContactGeneralInfo(updatePayload);
    setEditingCard(null);
  };

  const getCardIcon = (key: InfoCardData["key"]) => {
    switch (key) {
      case "call":
        return <Phone className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "visit":
        return <MapPin className="w-5 h-5" />;
      case "hours":
        return <Clock className="w-5 h-5" />;
    }
  };

  const getCardIconBg = (key: InfoCardData["key"]) => {
    switch (key) {
      case "call":
        return "bg-[#1c4e3a] text-white";
      case "email":
        return "bg-[#e78d1f] text-white";
      case "visit":
        return "bg-[#237c73] text-white";
      case "hours":
        return "bg-[#1c4e3a] text-white";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Contact Us Page Management"
        subtitle="Manage Contact Page Hero Banner, Quick Contact Info Cards (Call, Email, Visit, Hours), and Customer Enquiries Table"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & BACKGROUND PHOTO EDITOR                                 */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Contact Page Hero Banner &amp; Header</span>
              </h3>
              <p className="text-xs text-slate-500">
                Live on website: Title, Subtitle, and Custom Background Photo banner on /contact
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-[3px] hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>View Live Page</span>
              </Link>

              {!editingHero && (
                <button
                  onClick={() => setEditingHero(true)}
                  className="px-3.5 py-1.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Hero Header</span>
                </button>
              )}
            </div>
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
                  placeholder="e.g. Contact Sundarban Luxury"
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
                  placeholder="e.g. Have questions about our luxury river cruises, customized tiger safari packages, or private resort bookings? Our expert travel advisors are available 24/7 to assist you."
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

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Or choose from preset backgrounds:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_HERO_BG_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() =>
                              setHeroForm((prev) => ({
                                ...prev,
                                heroBackgroundImage: preset.url,
                              }))
                            }
                            className={`px-2 py-1 rounded-[3px] text-[10px] font-bold border transition-colors ${heroForm.heroBackgroundImage === preset.url
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                          >
                            {preset.name}
                          </button>
                        ))}
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
                  <span>Save Hero Changes</span>
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

        {/* ========================================================================= */}
        {/* 2. THE 4 CONTACT INFO CARDS (SHOW, EDIT, ACTIVE / INACTIVE BUTTONS)       */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Contact Info Cards (Call Us, Email Us, Visit Us, Working Hours)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the 4 primary quick-contact cards with live Active/Inactive toggles and Edit modals.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardsList.map((card) => {
                const isActive = card.status === "Active";
                return (
                  <div
                    key={card.key}
                    className={`rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between ${isActive
                        ? "bg-[#f9fbf9] border-[#e1e9e1] shadow-2xs"
                        : "bg-slate-50/80 border-slate-200 opacity-60"
                      }`}
                  >
                    <div>
                      {/* Icon & Status Toggle Button */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${getCardIconBg(
                            card.key
                          )}`}
                        >
                          {getCardIcon(card.key)}
                        </div>

                        {/* Active / Inactive Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleCardStatus(card.key)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase transition-colors cursor-pointer border ${isActive
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                            }`}
                          title="Click to toggle Active / Inactive"
                        >
                          {card.status}
                        </button>
                      </div>

                      {/* Title & Subtitle */}
                      <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {card.subtitle}
                      </p>

                      {/* Detail Text */}
                      <div className="text-xs font-bold text-slate-800 break-words leading-relaxed font-mono bg-white p-2 rounded border border-slate-200/80 mb-4">
                        {card.detail}
                      </div>
                    </div>

                    {/* Edit Card Button */}
                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingCard({ ...card })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors shadow-2xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Card</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CLEAN CUSTOMER CONTACT ENQUIRIES & MESSAGES TABLE                      */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 text-blue-800 rounded">
                <Inbox className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Customer Contact Enquiries &amp; Messages
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Messages received directly through the website contact form
            </p>
          </div>

          {/* Simple Clean Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-3 w-16 whitespace-nowrap">Sl. No.</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Date</th>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Subject &amp; Message</th>
                  <th className="py-3 px-4 text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No customer contact enquiries received yet.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq, index) => {
                    const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
                    const waNum = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
                    return (
                      <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Sl. No. */}
                        <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-slate-800">
                          #{index + 1}
                        </td>

                        {/* Date */}
                        <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-mono text-[11px] font-semibold">
                          {inq.date || "Recent"}
                        </td>

                        {/* Guest Name */}
                        <td className="py-3 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                          {inq.name}
                        </td>

                        {/* Phone / WhatsApp */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-mono text-slate-800 font-bold">
                            {inq.phone}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`tel:${inq.phone}`}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                            >
                              <Phone className="w-2.5 h-2.5" /> Call
                            </a>
                            <span className="text-slate-300">•</span>
                            <a
                              href={`https://wa.me/${waNum}?text=${encodeURIComponent(
                                `Hello ${inq.name}, regarding your Sundarban Luxury tour enquiry.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:underline"
                            >
                              <FaWhatsapp className="w-2.5 h-2.5" /> WhatsApp
                            </a>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3 px-4">
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(
                              `Re: ${inq.subject || "Sundarban Luxury Enquiry"}`
                            )}`}
                            className="font-medium text-slate-700 hover:text-blue-600 hover:underline"
                          >
                            {inq.email}
                          </a>
                        </td>

                        {/* Subject & Message */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800 mb-0.5">
                            {inq.subject || "Sundarban Tour Query"}
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-wrap">
                            {inq.message}
                          </p>
                        </td>

                        {/* Action: Delete Button */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete message from "${inq.name}"?`)) {
                                deleteInquiry(inq.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[3px] text-[11px] font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
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

      {/* ========================================================================= */}
      {/* 4. MODAL: EDIT SPECIFIC CONTACT INFO CARD                                 */}
      {/* ========================================================================= */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center shadow-xs ${getCardIconBg(
                    editingCard.key
                  )}`}
                >
                  {getCardIcon(editingCard.key)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Edit {editingCard.title} Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update card title, subtitle, content, and visibility
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCard(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCardModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Card Heading / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCard.title}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, title: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Card Subtitle / Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={editingCard.subtitle}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, subtitle: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {editingCard.key === "call"
                    ? "Phone Number *"
                    : editingCard.key === "email"
                      ? "Email Address *"
                      : editingCard.key === "visit"
                        ? "Physical Office Address *"
                        : "Working Hours Schedule *"}
                </label>
                {editingCard.key === "visit" || editingCard.key === "hours" ? (
                  <textarea
                    rows={3}
                    required
                    value={editingCard.detail}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, detail: e.target.value })
                    }
                    className="w-full p-2.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-600 leading-relaxed"
                  />
                ) : (
                  <input
                    type={editingCard.key === "email" ? "email" : "text"}
                    required
                    value={editingCard.detail}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, detail: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-mono focus:outline-none focus:border-blue-600"
                  />
                )}
              </div>

              {editingCard.key === "visit" && (
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Google Maps Link URL
                  </label>
                  <input
                    type="text"
                    value={editingCard.extra || ""}
                    onChange={(e) =>
                      setEditingCard({ ...editingCard, extra: e.target.value })
                    }
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full h-9 px-3 rounded border border-slate-300 text-xs font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Card Visibility Status
                  </label>
                  <select
                    value={editingCard.status}
                    onChange={(e) =>
                      setEditingCard({
                        ...editingCard,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="h-8 px-2 rounded border border-slate-300 text-xs font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option value="Active">Active (Visible on page)</option>
                    <option value="Inactive">Inactive (Hidden from page)</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Card</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
