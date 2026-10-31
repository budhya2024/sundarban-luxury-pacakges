"use client";

import React, { useState, useId, useEffect, useRef } from "react";
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
import { BookingConfirmationModal } from "@/components/ui/BookingConfirmationCard";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateTravelDate,
  HotelInquiryValidationErrors,
} from "@/lib/validation";

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
    id: "2n3d-sonar",
    name: "1 Night 2 Days  Package",
    duration: "1 Night / 2 Days",
    pricePerPerson: 10500,
    highlight: "1 Night Resort Stay • 2 Forest Safaris • Baul Night & All Meals",
    popular: true,
  },
  {
    id: "3n4d-sonar",
    name: "2 Nights 3 Days Package",
    duration: "2 Nights / 3 Days",
    pricePerPerson: 17500,
    highlight: "2 Nights Resort Stay • Core Safari • Dobanki Canopy Walk & Dolphin Creek",
  },
];

export const roomCategories = [
  { id: "deluxe", name: "Deluxe Room" },
  { id: "premium", name: "Premium Room" },
];

export const getPremiumRoomDelta = (packageId: string) => {
  return packageId === "3n4d-sonar" ? 4000 : 2000;
};

export function HotelBokingForm() {
  const roomSelectId = useId();
  const dateInputId = useId();
  const adultsInputId = useId();
  const kidsHalfInputId = useId();
  const kidsFreeInputId = useId();
  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const transferSelectId = useId();
  const boatSelectId = useId();

  const [selectedPackageId, setSelectedPackageId] = useState<string>("2n3d-sonar");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("deluxe");
  const [travelDate, setTravelDate] = useState<string>("");
  const [adults, setAdults] = useState<number | string>(2);
  const [kidsHalf, setKidsHalf] = useState<number | string>(0);
  const [kidsFree, setKidsFree] = useState<number | string>(0);
  const [transferOption, setTransferOption] = useState<string>("private");
  const [boatOption, setBoatOption] = useState<string>("shared");
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

  const [errors, setErrors] = useState<HotelInquiryValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingRefId, setBookingRefId] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const validateField = (field: string, value: any) => {
    let err: string | null = null;
    switch (field) {
      case "guestName":
        err = validateName(value);
        break;
      case "email":
        err = validateEmail(value);
        break;
      case "phone":
        err = validatePhone(value);
        break;
      case "checkIn":
        err = validateTravelDate(value);
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

  const handleFieldChange = (field: string, value: string) => {
    if (field === "guestName") setGuestName(value);
    if (field === "email") setGuestEmail(value);
    if (field === "phone") setGuestPhone(value);
    if (field === "checkIn") setTravelDate(value);

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

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

  // Compute today's date in YYYY-MM-DD for min date attribute
  const todayStr = React.useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Format travel date for display (e.g., "18 Sep 2026")
  const displayDateText = React.useMemo(() => {
    if (!travelDate) return "Select Date";
    try {
      const [y, m, d] = travelDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return travelDate;
    }
  }, [travelDate]);

  const numAdults = typeof adults === "number" ? adults : parseInt(adults, 10) || 1;
  const numKidsHalf = typeof kidsHalf === "number" ? kidsHalf : parseInt(kidsHalf, 10) || 0;
  const numKidsFree = typeof kidsFree === "number" ? kidsFree : parseInt(kidsFree, 10) || 0;
  const totalGuestsCount = numAdults + numKidsHalf + numKidsFree;

  const selectedPackage =
    sonarBanglaPackages.find((p) => p.id === selectedPackageId) ||
    sonarBanglaPackages[0];

  const premiumDelta = getPremiumRoomDelta(selectedPackage.id);
  const roomPriceDelta = selectedRoomId === "premium" ? premiumDelta : 0;
  const selectedRoomName = selectedRoomId === "premium" ? "Premium Room" : "Deluxe Room";

  const baseAdultRate = selectedPackage.pricePerPerson + roomPriceDelta;
  const adultCost = baseAdultRate * numAdults;
  const kidsHalfCost = Math.round(baseAdultRate * 0.5) * numKidsHalf;
  const kidsFreeCost = 0; // 0-4 years are completely free!
  const guestsTotalCost = adultCost + kidsHalfCost + kidsFreeCost;

  const transferCost =
    transferOption === "private"
      ? 5000
      : transferOption === "group"
        ? 500 * (numAdults + numKidsHalf)
        : 0;

  const boatCost = boatOption === "private" ? 20000 : 0;

  const estimatedTotal = guestsTotalCost + transferCost + boatCost;

  const getTransferLabel = (option: string) => {
    if (option === "private") return "Private Transfer (₹5,000 flat)";
    if (option === "group")
      return `Group Transfer (₹500/p • ₹${(500 * (numAdults + numKidsHalf)).toLocaleString("en-IN")})`;
    return "Direct Godkhali Ferry (Self - ₹0)";
  };

  const getBoatLabel = (opt: string) => {
    if (opt === "private") return "Exclusive Private Boat (+₹20,000 flat)";
    return "Standard Forest Cruise Safari (Included)";
  };

  const getTravelersSummary = () => {
    const list: string[] = [`${numAdults} Adult${numAdults > 1 ? "s" : ""} (>8 yrs)`];
    if (numKidsHalf > 0) list.push(`${numKidsHalf} Child${numKidsHalf > 1 ? "ren" : ""} (4–8 yrs: 50%)`);
    if (numKidsFree > 0) list.push(`${numKidsFree} Child${numKidsFree > 1 ? "ren" : ""} (0–4 yrs: Free)`);
    return list.join(", ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrorMessage(null);

    // Touch all fields
    setTouched({
      guestName: true,
      email: true,
      phone: true,
      checkIn: true,
    });

    const nameErr = validateName(guestName);
    const emailErr = validateEmail(guestEmail);
    const phoneErr = validatePhone(guestPhone);
    const dateErr = validateTravelDate(travelDate);

    const validationErrors: HotelInquiryValidationErrors = {};
    if (nameErr) validationErrors.guestName = nameErr;
    if (emailErr) validationErrors.email = emailErr;
    if (phoneErr) validationErrors.phone = phoneErr;
    if (dateErr) validationErrors.checkIn = dateErr;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const first = Object.values(validationErrors)[0];
      setSubmitErrorMessage(first || "Please complete all required fields properly.");
      return;
    }

    setIsSubmitting(true);

    const nightsCount = selectedPackage.duration.includes("2 Night")
      ? 2
      : selectedPackage.duration.includes("1 Night")
        ? 1
        : 1;

    const effectiveCheckIn = travelDate;
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
          guestName: guestName.trim(),
          email: guestEmail.trim().toLowerCase(),
          phone: guestPhone.trim(),
          roomName: `${selectedPackage.name} - ${selectedRoomName}`,
          roomCode: selectedRoomId,
          checkIn: effectiveCheckIn,
          checkOut: effectiveCheckOut,
          nights: nightsCount,
          guestsCount: getTravelersSummary(),
          roomsCount: Math.ceil((numAdults + numKidsHalf) / 2),
          totalAmount: Math.round(estimatedTotal),
          specialRequests: `Tour Package: ${selectedPackage.name} (${selectedPackage.duration}). Room: ${selectedRoomName}. Transfer: ${getTransferLabel(
            transferOption
          )}. Safari Boat: ${getBoatLabel(boatOption)}.`,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data?.inquiry) {
        setBookingRefId(data.inquiry.refId);
        setIsSubmitted(true);
      } else {
        setSubmitErrorMessage(
          data?.error ||
          "Unable to confirm reservation request. Please review your details or call our front desk directly."
        );
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setSubmitErrorMessage(
        "Network connection error. Please try again or call our 24/7 helpline at +91 70014 03498."
      );
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
• Room Type: ${selectedRoomName}${selectedRoomId === "premium" ? ` (+₹${premiumDelta.toLocaleString("en-IN")}/person)` : " (Included)"}
• Travel Date: ${datesSummary}
• Travelers: ${getTravelersSummary()}
• Transfer Option: ${getTransferLabel(transferOption)}
• Safari Boat: ${getBoatLabel(boatOption)}
• Estimated Total: ₹${Math.round(estimatedTotal).toLocaleString("en-IN")}
• Note: Room charges change accordingly to date
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
              Choose from our signature Sundarban packages all-inclusive with 5-star riverfront resort suites, forest watchtowers, and guided safaris.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Step 1: Package Selection Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  Choose Sundarban Tour Package
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 pb-3 px-0.5">
                {sonarBanglaPackages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`w-full relative p-5 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${isSelected
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <option value="deluxe">
                      Deluxe Room (₹{selectedPackage.pricePerPerson.toLocaleString("en-IN")}/person • Included)
                    </option>
                    <option value="premium">
                      Premium Room (₹{(selectedPackage.pricePerPerson + premiumDelta).toLocaleString("en-IN")}/person • +₹{premiumDelta.toLocaleString("en-IN")})
                    </option>
                  </select>
                  <p className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-1.5 flex items-center gap-1">
                    <span>* Room charges change accordingly to date</span>
                  </p>
                </div>

                {/* Travel Date */}
                <div>
                  <label
                    htmlFor={dateInputId}
                    className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2"
                  >
                    Check-in / Travel Date *
                  </label>
                  <div
                    onClick={handleDateClick}
                    className={`relative flex items-center bg-white border rounded-[4px] h-12 px-3.5 cursor-pointer group transition-all ${touched.checkIn && errors.checkIn
                      ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400"
                      : "border-slate-300 focus-within:border-primary"
                      }`}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-colors flex-shrink-0 mr-2.5 pointer-events-none" />
                    <span
                      className={`text-sm sm:text-base select-none truncate flex-1 ${travelDate ? "text-slate-900 font-semibold" : "text-slate-500 font-medium"
                        }`}
                    >
                      {displayDateText}
                    </span>
                    <input
                      ref={dateInputRef}
                      id={dateInputId}
                      type="date"
                      min={todayStr}
                      value={travelDate}
                      onChange={(e) => handleFieldChange("checkIn", e.target.value)}
                      onBlur={() => handleFieldBlur("checkIn", travelDate)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 outline-none"
                      aria-label="Select Date"
                    />
                  </div>
                  {touched.checkIn && errors.checkIn && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {errors.checkIn}
                    </p>
                  )}
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
                    className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-semibold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="private">
                      Private Transfer (₹5,000 flat)
                    </option>
                    <option value="group">
                      Group Transfer (₹500 / person)
                    </option>
                    <option value="direct">
                      Direct Godkhali Ferry (Self - ₹0)
                    </option>
                  </select>
                </div>

                {/* Number of Guests (Manual Type Input with Age Categories) */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Number of Guests (Age Options)
                    </label>
                    <span className="text-xs font-bold text-slate-500">
                      Total: {totalGuestsCount} {totalGuestsCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {/* Above 8 years (Full) */}
                    <div>
                      <div className="relative">
                        <input
                          id={adultsInputId}
                          type="number"
                          min={1}
                          max={99}
                          value={adults}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setAdults("");
                            } else {
                              const num = parseInt(val, 10);
                              setAdults(isNaN(num) ? "" : Math.max(1, num));
                            }
                          }}
                          onBlur={() => {
                            if (adults === "" || Number(adults) < 1) setAdults(1);
                          }}
                          placeholder="1+"
                          className="w-full h-12 px-2.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-center text-sm sm:text-base font-bold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                          aria-label="Above 8 years count"
                        />
                      </div>
                      <div className="text-[11px] text-center font-bold text-slate-700 mt-1 leading-tight">
                        Above 8 yrs
                        <span className="block text-[10px] text-primary font-black uppercase">Full Charge</span>
                      </div>
                    </div>

                    {/* 4 to 8 years (50%) */}
                    <div>
                      <div className="relative">
                        <input
                          id={kidsHalfInputId}
                          type="number"
                          min={0}
                          max={99}
                          value={kidsHalf}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setKidsHalf("");
                            } else {
                              const num = parseInt(val, 10);
                              setKidsHalf(isNaN(num) ? "" : Math.max(0, num));
                            }
                          }}
                          onBlur={() => {
                            if (kidsHalf === "" || Number(kidsHalf) < 0) setKidsHalf(0);
                          }}
                          placeholder="0"
                          className="w-full h-12 px-2.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-center text-sm sm:text-base font-bold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                          aria-label="4 to 8 years count"
                        />
                      </div>
                      <div className="text-[11px] text-center font-bold text-slate-700 mt-1 leading-tight">
                        4–8 yrs
                        <span className="block text-[10px] text-amber-600 font-black uppercase">50% Price</span>
                      </div>
                    </div>

                    {/* 0 to 4 years (Free) */}
                    <div>
                      <div className="relative">
                        <input
                          id={kidsFreeInputId}
                          type="number"
                          min={0}
                          max={99}
                          value={kidsFree}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setKidsFree("");
                            } else {
                              const num = parseInt(val, 10);
                              setKidsFree(isNaN(num) ? "" : Math.max(0, num));
                            }
                          }}
                          onBlur={() => {
                            if (kidsFree === "" || Number(kidsFree) < 0) setKidsFree(0);
                          }}
                          placeholder="0"
                          className="w-full h-12 px-2.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-center text-sm sm:text-base font-bold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                          aria-label="0 to 4 years count"
                        />
                      </div>
                      <div className="text-[11px] text-center font-bold text-slate-700 mt-1 leading-tight">
                        0–4 yrs
                        <span className="block text-[10px] text-emerald-600 font-black uppercase">Free (100%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safari Boat Option */}
                <div>
                  <label
                    htmlFor={boatSelectId}
                    className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between"
                  >
                    <span>Safari Boat Option</span>
                    {boatOption === "private" && (
                      <span className="text-[10px] font-black text-primary uppercase">
                        +₹20,000 Flat
                      </span>
                    )}
                  </label>
                  <select
                    id={boatSelectId}
                    value={boatOption}
                    onChange={(e) => setBoatOption(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-[4px] border border-slate-300 bg-white text-foreground text-sm sm:text-base font-semibold outline-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="shared">Standard Cruise Safari (Included)</option>
                    <option value="private">Exclusive Private Boat (+₹20,000 flat)</option>
                  </select>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1.5">
                    {boatOption === "private"
                      ? "✔ Dedicated luxury boat exclusively for your group."
                      : "Standard shared luxury cruise safari is included."}
                  </p>
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
                    onChange={(e) => handleFieldChange("guestName", e.target.value)}
                    onBlur={() => handleFieldBlur("guestName", guestName)}
                    className={`w-full h-12 px-4 rounded-[4px] border bg-white text-foreground text-sm sm:text-base outline-none transition-all ${touched.guestName && errors.guestName
                      ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                  />
                  {touched.guestName && errors.guestName && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {errors.guestName}
                    </p>
                  )}
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
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={() => handleFieldBlur("email", guestEmail)}
                    className={`w-full h-12 px-4 rounded-[4px] border bg-white text-foreground text-sm sm:text-base outline-none transition-all ${touched.email && errors.email
                      ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {errors.email}
                    </p>
                  )}
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
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    onBlur={() => handleFieldBlur("phone", guestPhone)}
                    className={`w-full h-12 px-4 rounded-[4px] border bg-white text-foreground text-sm sm:text-base outline-none transition-all ${touched.phone && errors.phone
                      ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-400 focus:border-rose-500"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {errors.phone}
                    </p>
                  )}
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
                    {selectedRoomName} • {getTravelersSummary()} •{" "}
                    {getTransferLabel(transferOption)}
                    {boatOption === "private" ? " • Includes Private Boat (₹20,000)" : ""}
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
                    <span className={`text-xs sm:text-sm font-medium flex items-center gap-2 ${boatOption === "private" ? "text-primary font-bold" : "text-slate-700"}`}>
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {boatOption === "private" ? "Exclusive Dedicated Private Boat" : "AC Forest Cruiser Safari"}
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
                  <span className="text-xs text-amber-700 font-bold block mt-1">
                    * Room charges change accordingly to date
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

            {/* Error Message Banner */}
            {submitErrorMessage && (
              <div className="p-3.5 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                <span>⚠️</span>
                <span>{submitErrorMessage}</span>
              </div>
            )}

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


          </form>
        </div>
      </div>

      {/* Booking Confirmation Popup Modal */}
      <BookingConfirmationModal
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        details={{
          hotelOrPackageName: `Hotel Sonar Bangla (${selectedPackage.name}${boatOption === "private" ? " + Private Boat" : ""})`,
          checkInDate: travelDate,
          guests: getTravelersSummary(),
          bookingId: bookingRefId || undefined,
          roomNo: selectedRoomId === "premium" ? "PREMIUM-RM" : "DELUXE-RM",
          guestEmail: guestEmail,
          guestName: guestName,
          guestPhone: guestPhone,
          whatsAppUrl: generateWhatsAppUrl(),
        }}
        onViewBooking={() => setIsSubmitted(false)}
        onBackToHome={() => setIsSubmitted(false)}
        primaryActionText="View Booking"
        secondaryActionText="Close"
      />
    </section>
  );
}

export default HotelBokingForm;

