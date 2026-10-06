"use client";

import React from "react";
import { X } from "lucide-react";

export interface BookingDetailsData {
  hotelOrPackageName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  bookingDate?: string;
  guests?: string | number;
  bookingId?: string;
  roomNo?: string;
  guestEmail?: string;
  guestName?: string;
  guestPhone?: string;
  totalAmount?: number;
  whatsAppUrl?: string;
}

export interface BookingConfirmationCardProps {
  details: BookingDetailsData;
  onViewBooking?: () => void;
  onBackToHome?: () => void;
  primaryActionText?: string;
  secondaryActionText?: string;
  showWhatsApp?: boolean;
  showCloseButton?: boolean;
}

export function BookingConfirmationCard({
  details,
  onViewBooking,
  onBackToHome,
  primaryActionText = "View Booking",
  secondaryActionText = "Back to Home",
  showCloseButton = false,
}: BookingConfirmationCardProps) {
  const handleClose = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (onViewBooking) {
      onViewBooking();
    }
  };

  // Format date strings cleanly (e.g. "20 May, 2026")
  const formatDateDisplay = (dateStr?: string, defaultDaysOffset: number = 0) => {
    if (!dateStr) {
      const d = new Date();
      d.setDate(d.getDate() + defaultDaysOffset);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    try {
      if (dateStr.includes("-")) {
        const [y, m, d] = dateStr.split("-").map(Number);
        if (y && m && d) {
          const dateObj = new Date(y, m - 1, d + defaultDaysOffset);
          return dateObj.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const formattedCheckIn = formatDateDisplay(details.checkInDate, 0);
  const formattedBookingDate = details.bookingDate
    ? formatDateDisplay(details.bookingDate, 0)
    : formatDateDisplay(undefined, 0);

  const guestsDisplay =
    typeof details.guests === "number"
      ? `${details.guests} ${details.guests === 1 ? "Adult" : "Adults"}`
      : details.guests || "2 Adults";
  const hotelName = details.hotelOrPackageName || "Sundarban Luxury Expedition";
  const emailText = details.guestEmail || "your email";

  return (
    <div className="relative w-full max-w-md mx-auto text-center font-sans animate-in fade-in zoom-in-95 duration-200">
      {/* Top Right Close Button */}
      {showCloseButton && (
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-1 right-1 z-50 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-xs border border-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Top Confetti & Checkmark Header */}
      <div className="relative pt-2 pb-2 flex justify-center items-center overflow-hidden">
        {/* Confetti Background Particles SVG */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-75">
          <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="40" width="8" height="4" rx="1" fill="#EF4444" transform="rotate(25 30 40)" />
            <rect x="160" y="50" width="10" height="4" rx="1" fill="#EF4444" transform="rotate(-35 160 50)" />
            <rect x="55" y="25" width="7" height="4" rx="1" fill="#F59E0B" transform="rotate(-15 55 25)" />
            <rect x="145" y="30" width="8" height="4" rx="1" fill="#F59E0B" transform="rotate(30 145 30)" />
            <rect x="75" y="20" width="10" height="5" rx="1" fill="#10B981" transform="rotate(40 75 20)" />
            <rect x="175" y="80" width="8" height="4" rx="1" fill="#10B981" transform="rotate(-40 175 80)" />
            <rect x="120" y="22" width="8" height="4" rx="1" fill="#3B82F6" transform="rotate(-25 120 22)" />
            <circle cx="40" cy="35" r="2.5" fill="#F59E0B" />
            <circle cx="165" cy="40" r="2.5" fill="#EF4444" />
          </svg>
        </div>

        {/* Clean Compact Green Checkmark Circle */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-[#10b981] shadow-md shadow-[#10b981]/20 flex items-center justify-center ring-4 ring-[#10b981]/15">
          <svg
            className="w-8 h-8 text-white stroke-[3.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-1 mb-4 px-2">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-xs mx-auto">
          Your trip request is confirmed. All arrangements are set, and your confirmation details have been sent successfully to{" "}
          <span className="text-slate-800 font-semibold underline decoration-slate-300">
            {emailText}
          </span>.
        </p>
      </div>

      {/* Compact Booking Details Box */}
      <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs mb-4">
        <div className="pb-2 mb-2.5 border-b border-slate-200/60">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Booking Details
          </span>
        </div>

        {/* Key Values */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500 font-medium">Package</span>
            <span className="text-slate-900 font-bold text-right truncate max-w-[200px]">
              {hotelName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Travel Date</span>
            <span className="text-slate-900 font-bold">{formattedCheckIn}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Booking Date</span>
            <span className="text-slate-900 font-bold">{formattedBookingDate}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500 font-medium">Guests</span>
            <span className="text-slate-900 font-bold">{guestsDisplay}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleClose}
          className="w-full py-2.5 px-4 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          {secondaryActionText}
        </button>
        <button
          type="button"
          onClick={onViewBooking || handleClose}
          className="w-full py-2.5 px-4 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          {primaryActionText}
        </button>
      </div>
    </div>
  );
}
