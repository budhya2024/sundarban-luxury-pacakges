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
import { BookingConfirmationCard } from "@/components/ui/BookingConfirmationCard";
import {
  validateTourBooking,
  validateName,
  validateEmail,
  validatePhone,
  validateTravelDate,
  validateGuests,
  TourBookingValidationErrors,
} from "@/lib/validation";

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

  const [errors, setErrors] = useState<TourBookingValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addBooking } = useAdmin();
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Validate individual field on change / blur
  const validateSingleField = (field: string, value: any) => {
    let err: string | null = null;
    switch (field) {
      case "fullName":
        err = validateName(value);
        break;
      case "email":
        err = validateEmail(value);
        break;
      case "phoneNumber":
        err = validatePhone(value);
        break;
      case "travelDate":
        err = validateTravelDate(value);
        break;
      case "guests":
        err = validateGuests(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [field]: err || undefined,
    }));
    return err;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateSingleField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateSingleField(field, (formData as any)[field]);
  };

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
      setErrors({});
      setTouched({});
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

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phoneNumber: true,
      travelDate: true,
      guests: true,
    });

    // Validate all fields
    const validation = validateTourBooking({
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      travelDate: formData.travelDate,
      guests: formData.guests,
      packageName,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstErr = Object.values(validation.errors)[0] || "Please fill in all required fields properly.";
      setErrorMessage(firstErr);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const guestCount = parseInt(formData.guests, 10) || 1;
    const totalCalc = pricePerPerson * guestCount;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phoneNumber.trim(),
          packageName,
          travelDate: formData.travelDate,
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
        setErrorMessage(
          data?.error ||
          "Unable to process booking request. Please check your information or call our helpline."
        );
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      setErrorMessage(
        "Network connection error. Please try again or call our helpline at +91 70014 03498."
      );
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
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={isSubmitted ? handleReset : onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 transition-all transform animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button in top right */}
        <button
          onClick={isSubmitted ? handleReset : onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
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
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                      touched.fullName && errors.fullName
                        ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-xs text-rose-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
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
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="Your email address"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                        touched.email && errors.email
                          ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                          : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {errors.email}
                    </p>
                  )}
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
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      onBlur={() => handleBlur("phoneNumber")}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                        touched.phoneNumber && errors.phoneNumber
                          ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                          : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    />
                  </div>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {errors.phoneNumber}
                    </p>
                  )}
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
                    className={`relative flex items-center bg-slate-50 border rounded-[4px] py-2.5 px-3.5 cursor-pointer group focus-within:bg-white transition-all h-[42px] ${
                      touched.travelDate && errors.travelDate
                        ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400"
                        : "border-slate-200 focus-within:border-primary"
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                    <span
                      className={`text-sm select-none truncate flex-1 ${
                        formData.travelDate ? "text-slate-800 font-medium" : "text-slate-400"
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
                      onChange={(e) => handleChange("travelDate", e.target.value)}
                      onBlur={() => handleBlur("travelDate")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Travel Date"
                    />
                  </div>
                  {touched.travelDate && errors.travelDate && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {errors.travelDate}
                    </p>
                  )}
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
                      onChange={(e) => handleChange("guests", e.target.value)}
                      onBlur={() => handleBlur("guests")}
                      placeholder="2"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-[4px] text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                        touched.guests && errors.guests
                          ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                          : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    />
                  </div>
                  {touched.guests && errors.guests && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {errors.guests}
                    </p>
                  )}
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
          <BookingConfirmationCard
            details={{
              hotelOrPackageName: packageName,
              checkInDate: formData.travelDate,
              guests: parseInt(formData.guests, 10) || 2,
              bookingId: confirmedCode || undefined,
              guestEmail: formData.email,
              guestName: formData.fullName,
              guestPhone: formData.phoneNumber,
              whatsAppUrl: `https://wa.me/917001403498?text=${encodeURIComponent(
                `*Sundarban Luxury Package - Trip Booking Request*\nPackage: ${packageName}\nTravel Date: ${formData.travelDate || "To be confirmed"}\nGuests: ${formData.guests}\nGuest Name: ${formData.fullName}\nContact: ${formData.phoneNumber}\nBooking Ref: ${confirmedCode || "Pending"}\n\nHello, I submitted a booking request on your website. Please confirm my reservation.`
              )}`,
            }}
            onViewBooking={handleReset}
            onBackToHome={handleReset}
            primaryActionText="View Booking"
            secondaryActionText="Back to Home"
          />
        )}
      </div>
    </div>
  );
}

export default BookingModal;
