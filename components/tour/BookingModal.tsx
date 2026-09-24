"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Send,
  CheckCircle2,
  Check,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { useAdmin } from "@/context/AdminContext";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  pricePerPerson?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  packageName = "Sundarban 2 Nights 3 Days Complete Tiger Trail Expedition",
  pricePerPerson = 4999,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    guests: "2",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addBooking } = useAdmin();
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Format date for display on all devices
  const displayDateText = useMemo(() => {
    if (!formData.travelDate) return "Select Travel Date";
    try {
      const [y, m, d] = formData.travelDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return formData.travelDate;
    }
  }, [formData.travelDate]);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  // Reset form status and lock scroll when opened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setConfirmedCode("");
      setErrorMessage("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Compute today's date in YYYY-MM-DD for min date attribute
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const guestCount = parseInt(formData.guests, 10) || 1;
    const totalCalc = pricePerPerson * guestCount;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          packageName,
          travelDate: formData.travelDate || todayStr,
          guests: guestCount,
          totalAmount: totalCalc,
          type: "Tour Package",
          specialRequests: `Direct reservation request for ${packageName}.`,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data.booking) {
        setConfirmedCode(data.booking.bookingCode);
        try {
          addBooking(data.booking);
        } catch {
          // ignore
        }
        setIsSubmitted(true);
      } else {
        setErrorMessage(data?.error || "Unable to process booking request. Please try again or call our helpline.");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      // Fallback local booking
      try {
        addBooking({
          guestName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          packageOrRoom: packageName,
          type: "Tour Package",
          travelDate: formData.travelDate || todayStr,
          guestsCount: guestCount,
          totalAmount: totalCalc,
          paidAmount: 0,
          paymentStatus: "Unpaid",
          bookingStatus: "Pending",
          specialRequests: `Direct reservation request for ${packageName}.`,
        });
      } catch {
        // ignore
      }
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setConfirmedCode("");
    setErrorMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 transition-all transform animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button in top right */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-primary hover:bg-secondary text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="pr-10 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Book My Trip
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                You are reserving{" "}
                <strong className="text-foreground font-bold">
                  {packageName}
                </strong>
                . Fill in your details below and our safari concierge will confirm your tour within 24 hours.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Email & Phone Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Your email address"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Date & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Travel Date <span className="text-rose-500">*</span>
                  </label>
                  <div
                    onClick={handleDateClick}
                    className="relative flex items-center bg-slate-50 border border-slate-200 rounded-[4px] py-2.5 px-3.5 cursor-pointer group focus-within:bg-white focus-within:border-primary   transition-all h-[42px]"
                  >
                    <Calendar className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                    <span
                      className={`text-sm select-none truncate flex-1 ${formData.travelDate ? "text-slate-800 font-medium" : "text-slate-400"
                        }`}
                    >
                      {displayDateText}
                    </span>
                    <input
                      ref={dateInputRef}
                      type="date"
                      required
                      min={todayStr}
                      value={formData.travelDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelDate: e.target.value,
                        })
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Travel Date"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Number of Guests <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Users className="w-4 h-4" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      placeholder="2"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Zero upfront payment</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Call back in 24h</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free cancellation</span>
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-6 rounded-full bg-primary hover:bg-secondary text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-primary/20 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>Confirm Booking Request</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-primary flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-xl font-black text-foreground">
              Booking Request Received!
            </h3>

            {confirmedCode && (
              <div className="inline-block px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold">
                Booking ID: {confirmedCode}
              </div>
            )}

            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you,{" "}
              <strong className="text-foreground">{formData.fullName}</strong>.
              Your reservation request for{" "}
              <strong className="text-primary">{packageName}</strong> has been
              received. Our Sundarban tour coordinator will contact you at{" "}
              <span className="font-semibold text-foreground">
                {formData.phoneNumber}
              </span>{" "}
              within 24 hours.
            </p>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-7 py-2.5 rounded-lg bg-primary hover:bg-secondary text-white font-bold text-sm transition-all duration-300 cursor-pointer shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
