"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { contactGeneralInfo } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const rawPhone =
    contactGeneralInfo?.helpdeskPhone ||
    contactGeneralInfo?.whatsappNumber ||
    "+91 70014 03498";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const telUrl = `tel:${cleanPhone.startsWith("91") ? `+${cleanPhone}` : `+91${cleanPhone}`}`;

  const whatsappNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello! I am interested in booking a Sundarban Luxury Tour Package. Please provide details."
  )}`;

  return (
    <>
      {/* 1. Right-Middle Floating Call & WhatsApp Action Buttons */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3.5 select-none">
        {/* Floating Call Button */}
        <div className="relative group flex items-center justify-end">


          <a
            href={telUrl}
            aria-label={`Call Sundarban Luxury Travel Advisor at ${rawPhone}`}
            className="relative flex items-center justify-center focus:outline-none"
          >
            {/* Animated Ambient Pulse Wave Rings */}
            <span className="absolute -inset-1.5 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute -inset-3 rounded-full bg-emerald-400/20 animate-pulse opacity-50 pointer-events-none" />

            {/* Main Floating Call Icon Circle */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white shadow-[0_8px_25px_rgba(5,122,40,0.45)] border-2 border-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 animate-phone-ring stroke-[2.2]" />
            </div>
          </a>
        </div>

        {/* Floating WhatsApp Button */}
        <div className="relative group flex items-center justify-end">


          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] border-2 border-white/90 transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
        </div>
      </div>

      {/* 2. Scroll to Top Button (Bottom Right) */}
      <div className="fixed bottom-5 right-3 sm:right-5 z-40 select-none">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-lg border border-white/20 backdrop-blur-xs transition-all duration-300 cursor-pointer ${showScrollTop
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
            }`}
        >
          <ChevronUp className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
}

export default FloatingActions;
