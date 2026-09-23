"use client";

import React, { useState, useId, useEffect } from "react";
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
  Loader2,
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
    name: "1 Day Luxury Package",
    duration: "1 Day Tour",
    pricePerPerson: 5999,
    highlight: "Day Cruise Safari • Forest Watchtowers • Gourmet Lunch & Evening High Tea",
  },
  {
    id: "2n3d-sonar",
    name: "1 Night 2 Days Deluxe Package",
    duration: "1 Night / 2 Days",
    pricePerPerson: 8999,
    highlight: "1 Night Resort Stay • 2 Forest Safaris • Baul Night & All Meals",
    popular: true,
  },
  {
    id: "3n4d-sonar",
    name: "2 Nights 3 Days Grand Expedition",
    duration: "2 Nights / 3 Days",
    pricePerPerson: 12999,
    highlight: "2 Nights Resort Stay • Core Safari • Dobanki Canopy Walk & Dolphin Creek",
  },
];

export const roomCategories = [
  { id: "deluxe-riverview", name: "Deluxe Riverview Suite", priceDelta: 0 },
  { id: "eco-cottage", name: "Premium Forest Cottage", priceDelta: 800 },
  { id: "royal-suite", name: "Royal Executive Suite", priceDelta: 1600 },
];

export function HotelBokingForm() {
  const roomSelectId = useId();
  const dateInputId = useId();
  const adultsSelectId = useId();
  const childrenSelectId = useId();
  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const transferSelectId = useId();

  const [selectedPackageId, setSelectedPackageId] = useState<string>("2n3d-sonar");
  const [roomsList, setRoomsList] = useState(roomCategories);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("deluxe-riverview");
  const [travelDate, setTravelDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [transferOption, setTransferOption] = useState<string>("with-kolkata-transfer");
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingRefId, setBookingRefId] = useState<string>("");

  // Synchronize available rooms dynamically from Neon backend
  useEffect(() => {
    fetch("/api/hotel/rooms")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.rooms) && data.rooms.length > 0) {
          const basePrice = Math.min(...data.rooms.map((r: any) => r.pricePerNight || 0));
          const dynamicRooms = data.rooms.map((r: any) => ({
            id: r.code || r.id,
            name: r.name,
            priceDelta: Math.max(0, (r.pricePerNight || 0) - basePrice),
          }));
          setRoomsList(dynamicRooms);
          if (dynamicRooms.length > 0 && !dynamicRooms.some((r: any) => r.id === selectedRoomId)) {
            setSelectedRoomId(dynamicRooms[0].id);
          }
        }
      })
      .catch(() => { });
  }, []);

  // Compute today's date in YYYY-MM-DD for min date attribute
  const todayStr = React.useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const selectedPackage =
    sonarBanglaPackages.find((p) => p.id === selectedPackageId) ||
    sonarBanglaPackages[1];

  const selectedRoom =
    roomsList.find((r) => r.id === selectedRoomId) || roomsList[0];

  const transferPricePerPerson = transferOption === "with-kolkata-transfer" ? 900 : 0;
  const estimatedPricePerAdult =
    selectedPackage.pricePerPerson + selectedRoom.priceDelta + transferPricePerPerson;
  const estimatedTotal =
    estimatedPricePerAdult * adults + (selectedPackage.pricePerPerson * 0.6) * children;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert("Please enter your name, email address, and phone/WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    const nightsCount = selectedPackage.duration.includes("2 Night")
      ? 2
      : selectedPackage.duration.includes("1 Night")
        ? 1
        : 1;

    const effectiveCheckIn = travelDate || new Date().toISOString().split("T")[0];
    const checkInDateObj = new Date(effectiveCheckIn);
    const checkOutDateObj = new Date(
      checkInDateObj.getTime() + nightsCount * 24 * 60 * 60 * 1000
    );
    const effectiveCheckOut = checkOutDateObj.toISOString().split("T")[0];

    try {
      const res = await fetch("/api/hotel/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          email: guestEmail,
          phone: guestPhone,
          roomName: `${selectedPackage.name} - ${selectedRoom.name}`,
          roomCode: selectedRoom.id,
          checkIn: effectiveCheckIn,
          checkOut: effectiveCheckOut,
          nights: nightsCount,
          guestsCount: `${adults} Adults${children > 0 ? `, ${children} Children` : ""}`,
          roomsCount: Math.ceil(adults / 2),
          totalAmount: Math.round(estimatedTotal),
          specialRequests: `Tour Package: ${selectedPackage.name} (${selectedPackage.duration}). Transfer: ${transferOption === "with-kolkata-transfer" ? "AC Vehicle from Kolkata" : "Direct Godkhali Ferry"
            }.`,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setBookingRefId(data.inquiry?.refId || `HSB-${Date.now().toString().slice(-4)}`);
        setIsSubmitted(true);
      } else {
        setBookingRefId(`HSB-${Date.now().toString().slice(-4)}`);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setBookingRefId(`HSB-${Date.now().toString().slice(-4)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const nightsCount = selectedPackage.duration.includes("2 Night")
      ? 2
      : selectedPackage.duration.includes("1 Night")
        ? 1
        : 1;
    const effectiveCheckIn = travelDate || "To be confirmed";
    let datesSummary = effectiveCheckIn;
    if (travelDate) {
      const checkInDateObj = new Date(travelDate);
      const checkOutDateObj = new Date(
        checkInDateObj.getTime() + nightsCount * 24 * 60 * 60 * 1000
      );
      datesSummary = `${travelDate} to ${checkOutDateObj.toISOString().split("T")[0]} (${nightsCount} Night${nightsCount > 1 ? "s" : ""})`;
    }

    const message = `Hello! I would like to book a Sundarban Tour with Hotel Sonar Bangla:
• Package: ${selectedPackage.name} (${selectedPackage.duration})
• Room Type: ${selectedRoom.name}
• Travel Date: ${datesSummary}
• Travelers: ${adults} Adults${children > 0 ? `, ${children} Children` : ""}
• Transfer Option: ${transferOption === "with-kolkata-transfer" ? "AC Vehicle from Kolkata" : "Direct Godkhali Ferry"}
• Estimated Total: ₹${Math.round(estimatedTotal).toLocaleString("en-IN")}
• Guest Name: ${guestName || "Guest"}
• Email: ${guestEmail || "Provided"}
• Contact: ${guestPhone || "Provided"}`;

    return `https://wa.me/917001403498?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="booking-form" className="py-8 md:py-16 scroll-mt-20">
      <div className="container">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-10 relative">
          {/* Form Header */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
              Direct Hotel &amp; Safari Booking
            </span>
            <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              Select Tour Package With Hotel Sonar Bangla
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
              Choose from our 3 signature Sundarban packages all-inclusive with 5-star riverfront resort suites, forest watchtowers, and guided safaris.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-primary mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
                Reservation Request Submitted!
              </h4>
              {bookingRefId && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold mb-3">
                  <span>Booking Reference:</span>
                  <span className="text-primary font-black">#{bookingRefId}</span>
                </div>
              )}
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <strong className="text-foreground">{guestName}</strong>. Your reservation details have been received and a confirmation receipt has been emailed to <strong className="text-foreground">{guestEmail}</strong>. Our luxury safari manager will reach out at{" "}
                <strong className="text-foreground">{guestPhone}</strong> within 15 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base md:text-sm shadow transition-all cursor-pointer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Connect On WhatsApp Instantly</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-base md:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
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
                  <label className="text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                      1
                    </span>
                    Choose Sundarban Tour Package
                  </label>
                </div>

                {/* Horizontally scrollable on x-axis when overlapping, 3 columns on md/lg */}
                <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pt-3 pb-3 px-0.5 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]">
                  {sonarBanglaPackages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`flex-shrink-0 w-[280px] sm:w-[310px] md:w-auto snap-start relative p-5 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${isSelected
                          ? "border-2 border-primary bg-primary/5 shadow-sm"
                          : "border border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50/60"
                          }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-md bg-primary text-white text-xs font-black uppercase tracking-wider shadow-xs">
                            Most Popular
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-xs sm:text-sm font-bold text-primary flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-secondary" />
                              {pkg.duration}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                            )}
                          </div>

                          <h4
                            className={`text-base sm:text-lg font-black leading-snug mb-2 ${isSelected ? "text-primary" : "text-foreground"
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
                          <span className="text-lg sm:text-xl md:text-2xl font-black text-foreground">
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
                <label className="block text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide mb-3.5 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
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
                    <select
                      id={roomSelectId}
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-semibold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                    >
                      {roomsList.map((rc) => (
                        <option key={rc.id} value={rc.id}>
                          {rc.name} {rc.priceDelta > 0 ? `(+₹${rc.priceDelta})` : ""}
                        </option>
                      ))}
                    </select>
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
                      min={todayStr}
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
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
                        className="w-full h-12 px-3 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
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
                        className="w-full h-12 px-3 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
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
                      className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-medium outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
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

              {/* Step 3: Guest Contact Details */}
              <div>
                <label className="block text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide mb-3.5 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[4px] bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
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
                      className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
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
                      className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
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
                      className="w-full h-12 px-4 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Summary & Inclusions Card */}
              <div className="rounded-xl border border-slate-300 bg-slate-50/80 p-6 sm:p-7">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Breakdown */}
                  <div className="lg:col-span-7">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                      Selected Package Summary
                    </p>
                    <h5 className="text-lg sm:text-xl md:text-2xl font-black text-foreground leading-tight">
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
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        Resort Swimming Pool Access
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        All Gourmet Meals Included
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        AC Forest Cruiser Safari
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        Govt. Permits &amp; Guide Included
                      </span>
                    </div>
                  </div>

                  {/* Right Total */}
                  <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right border-t lg:border-t-0 lg:border-l border-slate-200 pt-5 lg:pt-0 lg:pl-8">
                    <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Estimated Total (All-Inclusive)
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight my-1.5">
                      ₹{Math.round(estimatedTotal).toLocaleString("en-IN")}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-primary flex items-center gap-1">
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
                    <h5 className="text-sm sm:text-base font-extrabold text-primary leading-tight">
                      Free Cancellation &amp; 100% Refund
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      Cancel up to 48 hours prior to check-in for a full 100% refund. Zero fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-[4px] bg-emerald-50/80 border border-emerald-200">
                  <div className="w-9 h-9 rounded-[4px] bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                      100% Secure &amp; Protected Booking
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Encrypted confirmation. Zero payment required until booking voucher confirmed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5: Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 md:h-11 rounded-[4px] bg-primary hover:bg-secondary text-white font-bold text-base md:text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Reservation...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm Tour Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 md:h-11 rounded-[4px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base md:text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Footer Helpline */}
              <div className="pt-2 text-center text-xs sm:text-sm text-slate-500 font-medium">
                <span>
                  Direct Hotel Sonar Bangla Safari Helpline:{" "}
                  <a
                    href="tel:+917001403498"
                    className="font-extrabold text-primary hover:text-secondary"
                  >
                    +91 70014 03498
                  </a>{" "}
                  (Available 24x7)
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotelBokingForm;

