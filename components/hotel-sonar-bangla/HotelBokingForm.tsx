"use client";

import React, { useState, useId, useEffect, useRef } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  Loader2,
  Utensils,
  Eye,
  X,
  ChevronRight,
  ShieldCheck,
  Compass,
  Briefcase,
  ShieldAlert,
  Info,
  Phone,
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
import { TourItineraryDay, TourDayFoodMenu, initialAdminHotelPackages } from "@/lib/admin-data";
import {
  ThingsToCarryCard,
  ChildAgePolicyCard,
  ImportantGuidelinesCard,
} from "./HotelPackagePolicyGuide";

export interface TourPackageOption {
  id: string;
  name: string;
  duration: string;
  pricePerPerson: number;
  originalPrice?: number;
  premiumRoomDelta?: number;
  highlight: string;
  popular?: boolean;
  status?: string;
  itinerary?: TourItineraryDay[];
  foodMenu?: TourDayFoodMenu[];
  inclusions?: string[];
  exclusions?: string[];
  order?: number;
}

export const sonarBanglaPackages: TourPackageOption[] = initialAdminHotelPackages.map((pkg) => ({
  id: pkg.id,
  name: pkg.name,
  duration: pkg.duration,
  pricePerPerson: pkg.pricePerPerson,
  originalPrice: pkg.originalPrice,
  premiumRoomDelta: pkg.premiumRoomDelta,
  highlight: pkg.highlight || "",
  popular: pkg.popular,
  status: pkg.status,
  itinerary: pkg.itinerary,
  foodMenu: pkg.foodMenu,
  inclusions: pkg.inclusions,
  exclusions: pkg.exclusions,
  order: pkg.order,
}));

export const roomCategories = [
  { id: "deluxe", name: "Deluxe Room" },
  { id: "premium", name: "Premium Room" },
];

export const getPremiumRoomDelta = (packageId: string, customDelta?: number) => {
  if (typeof customDelta === "number") return customDelta;
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

  // Dynamic Packages State
  const [packages, setPackages] = useState<TourPackageOption[]>(sonarBanglaPackages);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);

  // Selected Options
  const [selectedPackageId, setSelectedPackageId] = useState<string>("2n3d-sonar");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("deluxe");
  const [travelDate, setTravelDate] = useState<string>("");
  const [adults, setAdults] = useState<number | string>(2);
  const [kidsHalf, setKidsHalf] = useState<number | string>(0);
  const [kidsFree, setKidsFree] = useState<number | string>(0);
  const [transferOption, setTransferOption] = useState<string>("private");
  const [boatOption, setBoatOption] = useState<string>("shared");

  // Dynamic pricing settings (loaded from Neon backend)
  const [privateBoatPrice, setPrivateBoatPrice] = useState<number>(20000);
  const [privateBoatTitle, setPrivateBoatTitle] = useState<string>("Exclusive Private Boat");
  const [privateBoatDescription, setPrivateBoatDescription] = useState<string>(
    "Dedicated luxury boat exclusively for your group."
  );
  const [privateTransferPrice, setPrivateTransferPrice] = useState<number>(5000);
  const [groupTransferPrice, setGroupTransferPrice] = useState<number>(500);

  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

  // On-Page View Details State (No modals on front-end)
  const [showOnPageDetails, setShowOnPageDetails] = useState<boolean>(false);
  const [onPageTab, setOnPageTab] = useState<"all" | "itinerary" | "menu" | "features" | "carry" | "child-policy" | "guidelines">("all");

  const [errors, setErrors] = useState<HotelInquiryValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingRefId, setBookingRefId] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Fetch dynamic packages and pricing settings from backend API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchDynamicPackages = async () => {
      setIsLoadingPackages(true);
      try {
        const res = await fetch("/api/hotel/packages");
        if (res.ok) {
          const data = await res.json();
          if (data?.success && Array.isArray(data.packages) && data.packages.length > 0 && isMounted) {
            setPackages(data.packages);
            // If currently selected ID is not in new list, pick the first
            if (!data.packages.some((p: TourPackageOption) => p.id === selectedPackageId)) {
              setSelectedPackageId(data.packages[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch public hotel packages:", err);
      } finally {
        if (isMounted) setIsLoadingPackages(false);
      }
    };

    const fetchHotelSettings = async () => {
      try {
        const res = await fetch("/api/hotel/settings");
        if (res.ok) {
          const data = await res.json();
          if (data?.success && data.settings && isMounted) {
            if (typeof data.settings.privateBoatPrice === "number") {
              setPrivateBoatPrice(data.settings.privateBoatPrice);
            }
            if (typeof data.settings.privateTransferPrice === "number") {
              setPrivateTransferPrice(data.settings.privateTransferPrice);
            }
            if (typeof data.settings.groupTransferPrice === "number") {
              setGroupTransferPrice(data.settings.groupTransferPrice);
            }
            if (data.settings.privateBoatTitle) {
              setPrivateBoatTitle(data.settings.privateBoatTitle);
            }
            if (data.settings.privateBoatDescription) {
              setPrivateBoatDescription(data.settings.privateBoatDescription);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load hotel settings:", err);
      }
    };

    fetchDynamicPackages();
    fetchHotelSettings();
    return () => {
      isMounted = false;
    };
  }, []);

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
    packages.find((p) => p.id === selectedPackageId) ||
    packages[0] ||
    sonarBanglaPackages[0];

  const hasFoodMenu =
    Array.isArray(selectedPackage.foodMenu) &&
    selectedPackage.foodMenu.length > 0 &&
    selectedPackage.foodMenu.some(
      (day) =>
        (Array.isArray(day.meals) && day.meals.length > 0) ||
        (Array.isArray(day.courses) && day.courses.length > 0)
    );

  const premiumDelta = getPremiumRoomDelta(selectedPackage.id, selectedPackage.premiumRoomDelta);
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
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 sm:p-6 md:p-10 relative">
          {/* Form Header */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
              Direct Hotel & Safari Booking
            </span>
            <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
              Select Tour Package With Hotel Sonar Bangla
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
              Choose from our signature Sundarban packages all-inclusive with 5-star riverfront resort suites, forest watchtowers, and guided safaris.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Step 1: Dynamic Package Selection Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  Choose Sundarban Tour Package
                </label>
              </div>

              <div className="flex overflow-x-auto gap-4 pt-4 pb-3.5 px-1 scroll-smooth snap-x snap-mandatory">
                {packages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  const pkgPremiumDelta = getPremiumRoomDelta(pkg.id, pkg.premiumRoomDelta);

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`relative p-5 rounded-lg cursor-pointer transition-all duration-200 flex flex-col justify-between flex-1 min-w-[285px] sm:min-w-[320px] shrink-0 snap-start ${isSelected
                        ? "border-2 border-primary bg-primary/5 shadow-sm z-10"
                        : "border border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50/60 hover:z-10 z-0"
                        }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-md bg-primary text-white text-xs font-black uppercase tracking-wider shadow-xs z-20">
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

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                          {pkg.highlight}
                        </p>

                        {/* View Itinerary & Food Menu Trigger Button (On-Page) */}
                        <div className="mb-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPackageId(pkg.id);
                              setShowOnPageDetails(showOnPageDetails && selectedPackageId === pkg.id ? false : true);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
                          >
                            <Utensils className="w-3.5 h-3.5" />
                            <span>
                              {showOnPageDetails && selectedPackageId === pkg.id
                                ? "Hide Day Plan, Menu & Policies"
                                : "View Day Plan, Menu & Policies"}
                            </span>
                            <ChevronRight
                              size={15}
                              className={`transition-transform duration-200 ${showOnPageDetails && selectedPackageId === pkg.id ? "rotate-90" : ""
                                }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/70 flex items-baseline justify-between">
                        <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                          From
                        </span>
                        <div className="text-right">
                          <span className="text-lg sm:text-xl md:text-2xl font-black text-foreground">
                            ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                            <span className="text-xs font-semibold text-slate-500">
                              {" "}
                              /person
                            </span>
                          </span>
                          {pkg.originalPrice && pkg.originalPrice > pkg.pricePerPerson && (
                            <span className="block text-xs text-slate-400 line-through">
                              ₹{pkg.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* On-Page Expandable Day-by-Day Plan & Gourmet Food Menu View */}
              {showOnPageDetails && selectedPackage && (
                <div className="mt-4 p-4 sm:p-6 bg-slate-50 border border-slate-300 rounded-lg space-y-6 animate-in fade-in duration-200">
                  {/* Top Header & Tab Switcher Bar */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 flex-wrap gap-2.5">
                    <div>
                      <span className="text-[11px] font-black uppercase text-secondary tracking-wider block">
                        Full Tour Package Details &amp; Guidelines
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-foreground">
                        {selectedPackage.name} ({selectedPackage.duration})
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setOnPageTab("all")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "all"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >

                        <span>All Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("menu")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "menu"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Food Menu</span>

                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("itinerary")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "itinerary"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Tour Timeline</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("features")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "features"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Included &amp; Excluded</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("carry")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "carry"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Things to Carry</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("child-policy")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "child-policy"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Child Policy</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOnPageTab("guidelines")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${onPageTab === "guidelines"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Important Notes</span>
                      </button>
                    </div>
                  </div>

                  {/* 1. DAY-WISE MENU DETAILS */}
                  {(onPageTab === "all" || onPageTab === "menu") && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-amber-600" />
                          <h4 className="text-sm sm:text-base font-black text-slate-900">
                            Day-Wise Menu Details
                          </h4>
                        </div>

                      </div>

                      {!hasFoodMenu ? (
                        <div className="p-5 sm:p-7 bg-amber-50/50 rounded-lg border border-amber-200/90 shadow-2xs text-center space-y-3.5">

                          <div>
                            <h5 className="text-sm sm:text-base font-black text-amber-950">
                              Menu Details Not Listed In This Package
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mt-1">
                              Fixed meal items are not pre-set for this customized package. Please contact our tour operator for personalized dining arrangements, special dietary requests, or seasonal local Bengali delicacies.
                            </p>
                          </div>

                        </div>
                      ) : (
                        <div className="space-y-4">
                          {(selectedPackage.foodMenu || []).map((mDay, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-4 sm:p-5 bg-white rounded-lg border border-amber-200/80 shadow-2xs space-y-3"
                            >
                              <h5 className="text-xs sm:text-sm font-black text-amber-950 border-b border-amber-100 pb-2 flex items-center gap-1.5">
                                <span>Day {mDay.dayNumber || mDay.day || mIdx + 1} Delicious Cuisine Menu</span>
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                                {(mDay.meals || mDay.courses || []).map((meal, mealIdx) => {
                                  const items = meal.items || (meal.menuItems ? meal.menuItems.split(",").map((s) => s.trim()) : []);
                                  return (
                                    <div
                                      key={mealIdx}
                                      className="p-3.5 rounded-lg bg-amber-50/30 border border-amber-200/60 text-xs space-y-1.5 hover:border-amber-300 transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-black text-slate-900 uppercase tracking-wide text-[11px] block text-amber-900">
                                          {meal.name || meal.courseName}
                                        </span>
                                        {meal.time && (
                                          <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5">
                                            <Clock className="w-2.5 h-2.5 text-secondary" />
                                            <span>{meal.time}</span>
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-slate-700 leading-relaxed text-[11px]">
                                        {items.join(", ")}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. TOUR TIMELINE */}
                  {(onPageTab === "all" || onPageTab === "itinerary") && (
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          Tour Timeline
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {(selectedPackage.itinerary || []).map((day, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-4 sm:p-5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <h5 className="text-xs sm:text-sm font-black text-primary">
                                Day {day.dayNumber || day.day || dIdx + 1} – {day.dayTitle || day.title}
                              </h5>

                            </div>
                            {day.description && (
                              <p className="text-xs text-slate-600 italic leading-relaxed">
                                {day.description}
                              </p>
                            )}
                            <div className="space-y-2.5 pt-1">
                              {day.activities?.map((act, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="flex items-start flex-col gap-a p-3 rounded-lg bg-slate-50/70 border border-slate-200/80 text-xs"
                                >
                                  <span className=" text-primary font-black shrink-0 mt-0.5 text-[10px]">
                                    {act.time}
                                  </span>
                                  <div>
                                    <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                      {act.title}
                                    </h6>
                                    {(act.description || act.desc) && (
                                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                                        {act.description || act.desc}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. INCLUSIONS & EXCLUSIONS */}
                  {(onPageTab === "all" || onPageTab === "features") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* What's Included */}
                      <div className="p-4 sm:p-5 bg-emerald-50/30 rounded-lg border border-emerald-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-600" />
                            <h5 className="text-xs sm:text-sm font-black text-slate-900">
                              What&apos;s Included in this Package
                            </h5>
                          </div>

                        </div>
                        <ul className="space-y-2 text-xs font-semibold text-slate-800">
                          {(selectedPackage.inclusions || []).map((inc, incIdx) => (
                            <li key={incIdx} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What's Not Included */}
                      <div className="p-4 sm:p-5 bg-rose-50/30 rounded-lg border border-rose-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-rose-600" />
                            <h5 className="text-xs sm:text-sm font-black text-slate-900">
                              What&apos;s Not Included (Exclusions)
                            </h5>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[10px]">
                            Exclusions
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs font-semibold text-slate-800">
                          {(selectedPackage.exclusions || [
                            "Any Personal Expenses / Tips & Gratuities",
                            "Video Camera & Professional Camcorder Permit Charges (Forest Dept)",
                            "Any extra food / beverages not mentioned in the buffet menu",
                            "Travel or Personal Accident / Medical Insurance",
                            "GST / Service Tax (if applicable)",
                            "Forest entry fee surcharge for foreign nationals",
                            "Anything not specifically mentioned in package inclusions",
                            "Package cost does not include transfer unless selected during booking",
                          ]).map((exc, excIdx) => (
                            <li key={excIdx} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                ✕
                              </span>
                              <span>{exc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 4. THINGS TO CARRY CHECKLIST */}
                  {(onPageTab === "all" || onPageTab === "carry") && (
                    <ThingsToCarryCard />
                  )}

                  {/* 5. CHILD & AGE POLICY */}
                  {(onPageTab === "all" || onPageTab === "child-policy") && (
                    <ChildAgePolicyCard />
                  )}

                  {/* 6. IMPORTANT SAFARI GUIDELINES & NOTES */}
                  {(onPageTab === "all" || onPageTab === "guidelines") && (
                    <ImportantGuidelinesCard />
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Configuration Grid (Room, Date, Guests, Transfer) */}
            <div>
              <label className="block text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide mb-3.5 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-primary text-white text-xs sm:text-sm flex items-center justify-center font-bold">
                  2
                </span>
                Stay & Travel Preferences
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
                    Pickup & Transfer
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
                        +₹{privateBoatPrice.toLocaleString("en-IN")} Flat
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
                    <option value="private">{privateBoatTitle} (+₹{privateBoatPrice.toLocaleString("en-IN")} flat)</option>
                  </select>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1.5">
                    {boatOption === "private"
                      ? `✔ ${privateBoatDescription}`
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
            <div className="rounded-lg border border-slate-300 bg-slate-50/80 p-6 sm:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Breakdown */}
                <div className="lg:col-span-7">
                  <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                    Selected Package Summary
                  </p>
                  <h5 className="text-lg sm:text-xl md:text-2xl font-black text-foreground leading-tight">
                    {selectedPackage.name}
                  </h5>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    Room: <span className="font-extrabold text-primary">{selectedRoomName}</span>
                    {selectedRoomId === "premium" && (
                      <span className="text-xs font-bold text-amber-700 ml-1.5">
                        (+₹{premiumDelta.toLocaleString("en-IN")}/person upgrade)
                      </span>
                    )}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs sm:text-sm space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Travelers:</span>
                      <span className="font-bold text-foreground">{getTravelersSummary()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Tariff Rate:</span>
                      <span className="font-bold text-foreground">
                        ₹{baseAdultRate.toLocaleString("en-IN")} / adult
                      </span>
                    </div>

                    {transferCost > 0 && (
                      <div className="flex items-center justify-between text-slate-700">
                        <span>Transfer ({transferOption === "private" ? "Private" : "Group"}):</span>
                        <span className="font-bold text-foreground">
                          +₹{transferCost.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {boatCost > 0 && (
                      <div className="flex items-center justify-between text-primary">
                        <span>{privateBoatTitle}:</span>
                        <span className="font-bold">
                          +₹{boatCost.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-amber-700 font-semibold">
                      <span>* Room charges change accordingly to date</span>
                    </div>
                  </div>
                </div>

                {/* Right Total & Actions */}
                <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-300 pt-5 lg:pt-0 lg:pl-8">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Estimated Total Tariff
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                    ₹{Math.round(estimatedTotal).toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 mb-5">
                    GST & Resort Amenities Included • No Hidden Charges
                  </span>

                  {submitErrorMessage && (
                    <div className="w-full mb-3 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {submitErrorMessage}
                    </div>
                  )}

                  <div className="w-full flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-[4px] text-xs sm:text-sm bg-primary font-bold! text-white font-black! tracking-wide  hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Confirming...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Booking Request</span>

                        </>
                      )}
                    </button>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-[4px] bg-[#25D366] text-white  font-bold
                       text-xs sm:text-sm tracking-wide hover:bg-[#20ba59] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isSubmitted}
        onClose={() => {
          setIsSubmitted(false);
          setGuestName("");
          setGuestEmail("");
          setGuestPhone("");
          setTravelDate("");
          setAdults(2);
          setKidsHalf(0);
          setKidsFree(0);
          setTouched({});
          setErrors({});
        }}
        details={{
          bookingId: bookingRefId,
          hotelOrPackageName: `${selectedPackage.name} - ${selectedRoomName}`,
          checkInDate: displayDateText,
          guests: getTravelersSummary(),
          totalAmount: Math.round(estimatedTotal),
          guestName: guestName,
          guestEmail: guestEmail,
          guestPhone: guestPhone,
          whatsAppUrl: generateWhatsAppUrl(),
        }}
      />
    </section>
  );
}

export default HotelBokingForm;
