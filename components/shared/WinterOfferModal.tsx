"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Check, ArrowRight, Tag } from "lucide-react";

export function WinterOfferModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle Close & remember in current session so it won't interrupt browsing
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("winter_escape_modal_dismissed", "true");
    } catch {
      // Ignore storage errors (private mode / restricted)
    }
  }, []);

  // Handle CTA Click -> redirect to all packages and dismiss modal
  const handleRedirectToPackages = useCallback(() => {
    handleClose();
    if (pathname === "/packages") {
      // Already on packages page, smooth scroll to packages grid or list
      const packagesSection = document.getElementById("packages-section") || document.querySelector("main");
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/packages");
    }
  }, [handleClose, pathname, router]);

  useEffect(() => {
    // Don't show on admin panel
    if (pathname?.startsWith("/admin")) return;

    // Check if already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem("winter_escape_modal_dismissed");
      if (dismissed === "true") return;
    } catch {
      // Ignore storage errors
    }

    // Show popup 10 seconds after page visit
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    // Allow manual trigger for testing / preview via custom event
    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-winter-offer-modal", handleManualOpen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-winter-offer-modal", handleManualOpen);
    };
  }, [pathname]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Optional: Prevent background scrolling while modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="winter-escape-modal-title"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[440px] bg-white rounded-2xl p-6 sm:p-8 pt-7 pb-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-100 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Circular Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-slate-200/90 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-colors bg-white shadow-2xs cursor-pointer focus:outline-none"
          aria-label="Close offer modal"
        >
          <X className="w-4 h-4 text-slate-600" strokeWidth={2} />
        </button>

        {/* Brand / Subtitle */}
        <p className=" text-xs font-extrabold  text-[#1c5336] uppercase mb-2.5">
          SUNDARBAN LUXURY PACKAGES
        </p>

        {/* Main Headline */}
        <h2
          id="winter-escape-modal-title"
          className="text-lg md:text-xl  font-black text-[#0f2419] leading-[1.12] tracking-[-0.03em] mb-3 "
        >
          Your winter escape awaits.
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
          Discover the beauty of the Sundarbans with a relaxing stay at Sonar Bangla Hotel and a memorable tour experience.
        </p>

        {/* 20% Flat Discount Box */}
        <div className="bg-[#f4f8f5] border border-[#e1ece4] rounded-sm p-4 sm:p-5 flex items-center gap-4 sm:gap-5 mb-5">
          <div className="text-[40px] sm:text-[45px] font-black text-[#1c5336] leading-none tracking-[-0.03em]">
            20%
          </div>
          <div className="h-10 w-[1px] bg-[#d4e4d8] mx-0.5" aria-hidden="true" />
          <div className="flex flex-col justify-center">
            <span className="text-xs font-extrabold tracking-[0.08em] text-[#1c5336] uppercase leading-tight flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#1c5336] shrink-0" />
              FLAT DISCOUNT
            </span>
            <span className="text-[13px] text-slate-500 font-medium leading-tight mt-1">
              On winter tour packages
            </span>
          </div>
        </div>

        {/* Feature Check Item */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-5.5 h-5.5 rounded-full bg-[#dcf2e3] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5 text-[#1c5336]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
              Make this winter memorable
            </h3>
            <p className="text-[13px] text-slate-500 leading-normal mt-0.5">
              Ask us about available packages, stay options and tour inclusions.
            </p>
          </div>
        </div>

        {/* Main CTA Button: Enquire About Packages */}
        <button
          type="button"
          onClick={handleRedirectToPackages}
          className="w-full py-3.5 sm:py-4 px-6 rounded-sm bg-[#1c4e38] hover:bg-[#153f2c] active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md shadow-emerald-950/15 cursor-pointer group"
        >
          <span>Enquire About Packages</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.2} />
        </button>

        {/* Footer Subtext / Disclaimer */}
        <p className="text-center text-xs text-slate-400 font-normal mt-3.5">
          Winter offer · Terms and availability may apply
        </p>
      </div>
    </div>
  );
}
