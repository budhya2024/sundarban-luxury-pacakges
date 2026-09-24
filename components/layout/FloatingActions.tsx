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
      className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3 select-none"
    >
      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary hover:bg-secondary text-white shadow-lg border border-white/20 transition-all duration-300 cursor-pointer ${showScrollTop
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
          }`}
      >
        <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
      </button>
    </aside>
  );
}

export default FloatingActions;
