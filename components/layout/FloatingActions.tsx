"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
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

  const rawPhone = contactGeneralInfo?.whatsappNumber || "+91 70014 03498";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const whatsappMessage = encodeURIComponent(
    "Hello! I am interested in booking a Sundarban Luxury Tour Package. Please provide details."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-6 right-5 sm:right-7 z-50 flex flex-col items-center gap-3 select-none"
    >
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Subtle Pulse Ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 pointer-events-none"
          aria-hidden="true"
        />

        <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />

        {/* Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary hover:bg-secondary text-white shadow-lg border border-white/20 transition-all duration-300 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5] transition-transform group-hover:-translate-y-1" />

        {/* Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Back to Top
        </span>
      </button>
    </aside>
  );
}

export default FloatingActions;
