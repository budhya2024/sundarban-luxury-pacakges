"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  X,
  Loader2,
  Clock,
  ShieldCheck,
  ArrowRight,
  User,
  Mail,
  Compass,
  Phone,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";
import { BookingConfirmationCard } from "@/components/ui/BookingConfirmationCard";

export function HeroBookingBar() {
  const { packages, addBooking } = useAdmin();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingCode: string;
    guestName: string;
    packageName: string;
    travelDate: string;
    guests: number;
    phone: string;
    email?: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Available packages list with fallbacks
  const packageList = useMemo(() => {
    if (packages && packages.length > 0) {
      const active = packages.filter((p) => p.status !== "Draft");
      if (active.length > 0) return active.map((p) => p.name);
    }
    return [
      "Sundarban 1 Night 2 Days Tour",
      "Sundarban 2 Nights 3 Days Tour",
      "Sundarban 1 Day Tour Package",
      "Sundarban Luxury Boat Safari",
      "Custom Group / Family Tour",
    ];
  }, [packages]);

  // Today's date for date picker min
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Format date for display (e.g., "18 Sep 2026")
  const displayDateText = useMemo(() => {
    if (!date) return "Select Date";
    try {
      const [y, m, d] = date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  }, [date]);

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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number to book trip.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const guestCount = parseInt(guests, 10) || 1;
    const pkgName = selectedPackage || "Sundarban 2 Nights 3 Days Tiger Trail Tour";
    // Find matching package price or fallback to 4999 per guest
    const matchedPkg = packages.find((p) => p.name === selectedPackage);
    const pricePerPerson = matchedPkg?.price || 4999;
    const totalAmount = pricePerPerson * guestCount;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim() || "guest@sundarbanluxury.com",
          phoneNumber: phone.trim(),
          packageName: pkgName,
          travelDate: date || todayStr,
          guests: guestCount,
          totalAmount,
          type: "Tour Package",
          specialRequests: `Direct homepage hero reservation for ${pkgName}.`,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data.booking) {
        try {
          addBooking(data.booking);
        } catch {
          // ignore
        }

        setConfirmedBooking({
          bookingCode: data.booking.bookingCode,
          guestName: name.trim(),
          packageName: pkgName,
          travelDate: displayDateText !== "Select Date" ? displayDateText : "Flexible / To Be Confirmed",
          guests: guestCount,
          phone: phone.trim(),
          email: email.trim(),
        });

        // Reset form inputs
        setName("");
        setEmail("");
        setPhone("");
        setDate("");
      } else {
        setErrorMessage(
          data?.error || "Could not complete booking reservation. Please try again or call our helpline."
        );
      }
    } catch (err) {
      console.error("Hero booking error:", err);
      // Fallback local booking
      const fallbackCode = `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const localBooking = {
        guestName: name.trim(),
        email: email.trim() || "guest@sundarbanluxury.com",
        phone: phone.trim(),
        packageOrRoom: pkgName,
        type: "Tour Package" as const,
        travelDate: date || todayStr,
        guestsCount: guestCount,
        totalAmount,
        paidAmount: 0,
        paymentStatus: "Unpaid" as const,
        bookingStatus: "Pending" as const,
        specialRequests: `Direct homepage hero reservation for ${pkgName}.`,
      };
      try {
        addBooking(localBooking);
      } catch { }

      setConfirmedBooking({
        bookingCode: fallbackCode,
        guestName: name.trim(),
        packageName: pkgName,
        travelDate: displayDateText !== "Select Date" ? displayDateText : "Flexible / To Be Confirmed",
        guests: guestCount,
        phone: phone.trim(),
        email: email.trim(),
      });
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppConfirmUrl = () => {
    if (!confirmedBooking) return "#";
    const msg = `*Sundarban Luxury Package - Trip Booking Confirmation*
━━━━━━━━━━━━━━━━━━━━━
Package: ${confirmedBooking.packageName}
Name: ${confirmedBooking.guestName}
Phone: ${confirmedBooking.phone}
Guests: ${confirmedBooking.guests} ${confirmedBooking.guests === 1 ? "Person" : "Persons"}
Travel Date: ${confirmedBooking.travelDate}
━━━━━━━━━━━━━━━━━━━━━
Hello, I have submitted a booking request on your website. Please confirm itinerary and payment arrangements.`;
    return `https://wa.me/917001403498?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 z-20 pointer-events-auto">
        <form
          onSubmit={handleSubmit}
          className="p-1 sm:p-2 rounded-xl"
        >
          {errorMessage && (
            <div className="mb-2.5 p-2 rounded bg-rose-500/90 text-white text-xs font-semibold text-center">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-7 gap-1.5 sm:gap-2">
            {/* Name */}
            <div className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 sm:h-12 pl-8 pr-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 sm:h-12 pl-8 pr-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
              />
            </div>

            {/* Select Tour Package */}
            <div className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center">
              <Compass className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className={`w-full h-11 sm:h-12 pl-8 pr-5 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all cursor-pointer appearance-none truncate ${
                  selectedPackage ? "text-slate-800 font-semibold" : "text-slate-500"
                }`}
              >
                <option value="">Select Package</option>
                {packageList.map((pkgTitle) => (
                  <option key={pkgTitle} value={pkgTitle}>
                    {pkgTitle}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Phone Number */}
            <div className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center">
              <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 sm:h-12 pl-8 pr-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
              />
            </div>

            {/* Number of Guests */}
            <div className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center">
              <Users className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full h-11 sm:h-12 pl-8 pr-5 text-slate-800 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all cursor-pointer appearance-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6+ Guests</option>
                <option value="10">10+ Group</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-500">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Date */}
            <div
              onClick={handleDateClick}
              className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center h-11 sm:h-12 px-2.5 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-slate-400 group-hover:text-[#f59e0b] transition-colors flex-shrink-0 mr-2 pointer-events-none" />
              <span
                className={`text-xs sm:text-[13px] font-medium flex-1 truncate select-none ${
                  date ? "text-slate-800 font-semibold" : "text-slate-500"
                }`}
              >
                {displayDateText}
              </span>
              <input
                ref={dateInputRef}
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 outline-none"
                aria-label="Select Date"
              />
            </div>

            {/* BOOK TRIP Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="col-span-2 lg:col-span-1 w-full h-11 sm:h-12 bg-[#f59e0b] hover:bg-[#d97706] disabled:bg-amber-300 text-slate-950 font-black text-xs sm:text-[13px] tracking-wider uppercase rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>BOOK TRIP</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setConfirmedBooking(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 transition-all transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setConfirmedBooking(null)}
              type="button"
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <BookingConfirmationCard
              details={{
                hotelOrPackageName: confirmedBooking.packageName,
                checkInDate: confirmedBooking.travelDate,
                guests: confirmedBooking.guests,
                bookingId: confirmedBooking.bookingCode,
                guestEmail: confirmedBooking.email,
                guestName: confirmedBooking.guestName,
                guestPhone: confirmedBooking.phone,
                whatsAppUrl: getWhatsAppConfirmUrl(),
              }}
              onViewBooking={() => setConfirmedBooking(null)}
              onBackToHome={() => setConfirmedBooking(null)}
              primaryActionText="View Booking"
              secondaryActionText="Back to Home"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default HeroBookingBar;
