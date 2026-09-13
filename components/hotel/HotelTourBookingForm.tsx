"use client";

import React, { useState, useId } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Hotel,
  Ship,
  Phone,
  Clock,
  Car,
  Check,
  RotateCcw,
  Lock,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export interface TourPackageOption {
  id: string;
  name: string;
  duration: string;
  pricePerPerson: number;
  highlight: string;
  popular?: boolean;
}

export const sonarBanglaPackages: TourPackageOption[] = [
  {
    id: "1n2d-sonar",
    name: "1 Night 2 Days Luxury Package",
    duration: "2 Days / 1 Night",
    pricePerPerson: 5999,
    highlight: "1 Night Resort Stay • 2 Forest Safaris • All Meals",
  },
  {
    id: "2n3d-sonar",
    name: "2 Nights 3 Days Deluxe Package",
    duration: "3 Days / 2 Nights",
    pricePerPerson: 8999,
    highlight: "2 Nights Resort • Dobanki Canopy Walk • Baul Night",
    popular: true,
  },
  {
    id: "3n4d-sonar",
    name: "3 Nights 4 Days Grand Expedition",
    duration: "4 Days / 3 Nights",
    pricePerPerson: 12999,
    highlight: "3 Nights Riverview Suite • Core Safari • Dolphin Creek",
  },
];

export const roomCategories = [
  { id: "deluxe-riverview", name: "Deluxe Riverview Suite", priceDelta: 0 },
  { id: "eco-cottage", name: "Premium Forest Cottage", priceDelta: 800 },
  { id: "royal-suite", name: "Royal Executive Suite", priceDelta: 1600 },
];

export function HotelTourBookingForm() {
  const packageSelectId = useId();
  const roomSelectId = useId();
  const dateInputId = useId();
  const adultsSelectId = useId();
  const childrenSelectId = useId();
  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const transferSelectId = useId();

  const [selectedPackageId, setSelectedPackageId] = useState<string>("2n3d-sonar");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("deluxe-riverview");
  const [travelDate, setTravelDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [transferOption, setTransferOption] = useState<string>("with-kolkata-transfer");
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectedPackage =
    sonarBanglaPackages.find((p) => p.id === selectedPackageId) ||
    sonarBanglaPackages[1];

  const selectedRoom =
    roomCategories.find((r) => r.id === selectedRoomId) || roomCategories[0];

  const transferPricePerPerson = transferOption === "with-kolkata-transfer" ? 900 : 0;
  const estimatedPricePerAdult =
    selectedPackage.pricePerPerson + selectedRoom.priceDelta + transferPricePerPerson;
  const estimatedTotal =
    estimatedPricePerAdult * adults + (selectedPackage.pricePerPerson * 0.6) * children;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert("Please enter your name, email address, and phone/WhatsApp number.");
      return;
    }
    setIsSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const message = `Hello! I would like to book a Sundarban Tour with Hotel Sonar Bangla:
• Package: ${selectedPackage.name} (${selectedPackage.duration})
• Room Type: ${selectedRoom.name}
• Travel Date: ${travelDate || "To be confirmed"}
• Travelers: ${adults} Adults${children > 0 ? `, ${children} Children` : ""}
• Transfer Option: ${transferOption === "with-kolkata-transfer" ? "AC Vehicle from Kolkata" : "Direct Godkhali Ferry"}
• Estimated Total: ₹${Math.round(estimatedTotal).toLocaleString("en-IN")}
• Guest Name: ${guestName || "Guest"}
• Email: ${guestEmail || "Provided"}
• Contact: ${guestPhone || "Provided"}`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-[4px] border border-slate-300/80 shadow-md p-6 sm:p-8 lg:p-10 relative">
      {/* Form Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight">
          Select Tour Package With Hotel Sonar Bangla
        </h3>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
          Choose from our 3 signature Sundarban packages: 1 Night 2 Days, 2 Nights 3 Days, or 3 Nights 4 Days all-inclusive with 5-star riverfront suites and safaris.
        </p>
      </div>

      {isSubmitted ? (
        <div className="py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-[4px] bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-black text-[#0f172a] mb-2">
            Reservation Request Submitted!
          </h4>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you, <strong className="text-[#0f172a]">{guestName}</strong>. Your reservation invoice and confirmation have been sent to{" "}
            <strong className="text-[#0f172a]">{guestEmail}</strong>. Our dedicated luxury reservation manager will reach out at{" "}
            <strong className="text-[#0f172a]">{guestPhone}</strong> within 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Connect On WhatsApp Instantly</span>
            </a>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] border border-slate-300 text-slate-700 font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Edit Booking Details
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Package Selection Cards (3 Core Packages) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm sm:text-base font-extrabold text-[#0f172a] uppercase tracking-wide flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-[4px] bg-[#0f172a] text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                  1
                </span>
                Choose Sundarban Tour Package
              </label>
              <span className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1">
                <span>Select package</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#15803d]" />
              </span>
            </div>

            {/* Horizontally scrollable on x-axis when overlapping, 3 columns on md/lg */}
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pt-3 pb-3 px-0.5 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]">
              {sonarBanglaPackages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`flex-shrink-0 w-[280px] sm:w-[310px] md:w-auto snap-start relative p-5 rounded-[4px] cursor-pointer transition-all duration-200 flex flex-col justify-between ${isSelected
                      ? "border-2 border-[#064e3b] bg-emerald-50/60 shadow-sm"
                      : "border border-slate-200 bg-white hover:border-[#064e3b]/50 hover:bg-slate-50/60"
                      }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-[4px] bg-[#064e3b] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xs sm:text-sm font-bold text-[#064e3b] flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#d97706]" />
                          {pkg.duration}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#064e3b] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-base sm:text-lg font-black leading-snug mb-2 ${isSelected ? "text-[#064e3b]" : "text-slate-800"
                          }`}
                      >
                        {pkg.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {pkg.highlight}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                        From
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-[#0f172a]">
                        ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                        <span className="text-xs font-semibold text-slate-500">
                          {" "}
                          /person
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Configuration Grid (Room, Date, Guests, Transfer) */}
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-[#0f172a] uppercase tracking-wide mb-3.5 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-[4px] bg-[#0f172a] text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                2
              </span>
              Stay &amp; Travel Preferences
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Room Category */}
              <div>
                <label
                  htmlFor={roomSelectId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Resort Room Type
                </label>
                <div className="relative">
                  <select
                    id={roomSelectId}
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base font-semibold outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors cursor-pointer"
                  >
                    {roomCategories.map((rc) => (
                      <option key={rc.id} value={rc.id}>
                        {rc.name} {rc.priceDelta > 0 ? `(+₹${rc.priceDelta})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label
                  htmlFor={dateInputId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Check-in / Travel Date
                </label>
                <input
                  id={dateInputId}
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors cursor-pointer"
                />
              </div>

              {/* Travelers (Adults + Kids) */}
              <div>
                <label
                  htmlFor={adultsSelectId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Number of Guests
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    id={adultsSelectId}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full h-12 px-3 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors cursor-pointer"
                    aria-label="Adults"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>

                  <select
                    id={childrenSelectId}
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full h-12 px-3 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors cursor-pointer"
                    aria-label="Children"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Kid" : "Kids"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transfer Option */}
              <div>
                <label
                  htmlFor={transferSelectId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Pickup &amp; Transfer
                </label>
                <select
                  id={transferSelectId}
                  value={transferOption}
                  onChange={(e) => setTransferOption(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors cursor-pointer"
                >
                  <option value="with-kolkata-transfer">
                    AC Car from Kolkata (+₹900/p)
                  </option>
                  <option value="direct-godkhali">
                    Direct Godkhali Ferry (Self)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Guest Contact Details (With Email field) */}
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-[#0f172a] uppercase tracking-wide mb-3.5 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-[4px] bg-[#0f172a] text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                3
              </span>
              Guest Contact Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={nameInputId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Full Name *
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor={emailInputId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Email Address *
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  required
                  placeholder="e.g. rajesh@gmail.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor={phoneInputId}
                  className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Phone / WhatsApp Number *
                </label>
                <input
                  id={phoneInputId}
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-[#0f172a] text-sm sm:text-base outline-none focus:outline-none focus:ring-0 focus:border-[#064e3b] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Summary & Inclusions Card */}
          <div className="rounded-[4px] border border-slate-300 bg-slate-50/80 p-6 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Breakdown */}
              <div className="lg:col-span-7">
                <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                  Selected Package Summary
                </p>
                <h5 className="text-lg sm:text-xl md:text-2xl font-black text-[#0f172a] leading-tight">
                  {selectedPackage.name}
                </h5>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
                  {selectedRoom.name} • {adults} Adults
                  {children > 0 ? `, ${children} Children` : ""} •{" "}
                  {transferOption === "with-kolkata-transfer"
                    ? "Includes Kolkata AC Transfer"
                    : "Direct Godkhali Arrival"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-slate-200">
                  <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] flex-shrink-0" />
                    Resort Swimming Pool Access
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] flex-shrink-0" />
                    All Gourmet Meals Included
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] flex-shrink-0" />
                    AC Forest Cruiser Safari
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] flex-shrink-0" />
                    Govt. Permits &amp; Guide Included
                  </span>
                </div>
              </div>

              {/* Right Total */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right border-t lg:border-t-0 lg:border-l border-slate-200 pt-5 lg:pt-0 lg:pl-8">
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Estimated Total (All-Inclusive)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight my-1.5">
                  ₹{Math.round(estimatedTotal).toLocaleString("en-IN")}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#064e3b] flex items-center gap-1">
                  ✔ Zero Advance Booking Fee
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  Taxes and resort service charges included
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation & Return Money + Secure Payment Trust Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-4 rounded-[4px] bg-emerald-50/80 border border-emerald-200">
              <div className="w-9 h-9 rounded-[4px] bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm sm:text-base font-extrabold text-[#064e3b] leading-tight">
                  Free Cancellation &amp; 100% Money Return
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  Cancel up to 48 hours prior to check-in for a full 100% refund. Zero cancellation fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-[4px] bg-emerald-50/80 border border-emerald-200">
              <div className="w-9 h-9 rounded-[4px] bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-tight">
                  100% Secure &amp; Protected Payment
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Encrypted checkout via UPI, Net Banking, and Cards. Zero payment required until booking voucher confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <button
              type="submit"
              className="w-full h-13 sm:h-14 rounded-[4px] bg-[#064e3b] hover:bg-[#d97706] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md transition-colors duration-200 cursor-pointer"
            >
              <span>Confirm Tour Reservation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-13 sm:h-14 rounded-[4px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md transition-colors duration-200 cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Footer Helpline */}
          <div className="pt-2 text-center text-xs sm:text-sm text-slate-500 font-medium">
            <span>
              Direct Hotel Sonar Bangla Safari Helpline:{" "}
              <a
                href="tel:+919876543210"
                className="font-extrabold text-[#064e3b] hover:text-[#d97706]"
              >
                +91 98765 43210
              </a>{" "}
              (Available 24x7)
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default HotelTourBookingForm;
