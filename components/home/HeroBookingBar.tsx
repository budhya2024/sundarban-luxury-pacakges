"use client";

import React, { useState, useRef, useMemo } from "react";
import { Calendar } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function HeroBookingBar() {
  const { packages } = useAdmin();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your name and phone number to book trip.");
      return;
    }

    const message = `*Sundarban Luxury Tour - Trip Booking Request*
━━━━━━━━━━━━━━━━━━━━━
 Package: ${selectedPackage || "All Packages / Custom"}
 Name: ${name}
 Email: ${email || "Not provided"}
 Phone: ${phone}
 Guests: ${guests} ${parseInt(guests) === 1 ? "Guest" : "Guests"}
 Travel Date: ${displayDateText !== "Select Date" ? displayDateText : "Flexible / To be confirmed"}
━━━━━━━━━━━━━━━━━━━━━
Please confirm tour package availability and price details.`;

    const whatsappUrl = `https://wa.me/917001403498?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 z-20 pointer-events-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-black/55 backdrop-blur-md p-2.5 sm:p-3.5 lg:p-4 rounded-xl border border-white/20 shadow-2xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5 items-center">
          {/* 1. Select Tour Package */}
          <div className="relative bg-white rounded-md overflow-hidden shadow-xs col-span-2 md:col-span-1">
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className={`w-full h-11 sm:h-12 px-2 sm:px-2.5 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all cursor-pointer appearance-none truncate pr-5 ${selectedPackage ? "text-slate-800 font-semibold" : "text-slate-500"
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

          {/* 2. Name */}
          <div className="relative bg-white rounded-md overflow-hidden shadow-xs col-span-1">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 sm:h-12 px-2 sm:px-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
            />
          </div>

          {/* 3. Email Address */}
          <div className="relative bg-white rounded-md overflow-hidden shadow-xs col-span-1">
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 sm:h-12 px-2 sm:px-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
            />
          </div>

          {/* 4. Phone Number */}
          <div className="relative bg-white rounded-md overflow-hidden shadow-xs col-span-1">
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 sm:h-12 px-2 sm:px-2.5 text-slate-800 placeholder:text-slate-500 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all"
            />
          </div>

          {/* 5. Number of Guests */}
          <div className="relative bg-white rounded-md overflow-hidden shadow-xs col-span-1">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full h-11 sm:h-12 px-2 sm:px-2.5 text-slate-800 text-xs sm:text-[13px] font-medium bg-transparent outline-none focus:ring-2 focus:ring-[#f59e0b] transition-all cursor-pointer appearance-none"
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

          {/* 6. Date */}
          <div
            onClick={handleDateClick}
            className="relative bg-white rounded-md overflow-hidden shadow-xs flex items-center h-11 sm:h-12 px-2 sm:px-2.5 cursor-pointer group outline-none focus:outline-none col-span-1"
          >
            <span
              className={`text-xs sm:text-[13px] font-medium flex-1 truncate select-none ${date ? "text-slate-800 font-semibold" : "text-slate-500"
                }`}
            >
              {displayDateText}
            </span>
            <Calendar className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#f59e0b] transition-colors flex-shrink-0" />
            <input
              ref={dateInputRef}
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 outline-none focus:outline-none"
              aria-label="Select Date"
            />
          </div>

          {/* 7. BOOK TRIP Button */}
          <button
            type="submit"
            className="w-full h-11 sm:h-12 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black text-xs sm:text-[13px] tracking-wider uppercase rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer col-span-2 md:col-span-1"
          >
            <span>BOOK TRIP</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroBookingBar;
