"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Calendar,
  Utensils,
  CheckCircle,
  Clock,
  Sparkles,
  Info,
  DollarSign,
  Tag,
  Check,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
} from "lucide-react";
import {
  AdminHotelPackage,
  TourItineraryDay,
  TourDayFoodMenu,
  TourActivity,
  TourMealCourse,
} from "@/lib/admin-data";

interface HotelPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkgData: Partial<AdminHotelPackage>) => Promise<void> | void;
  initialPackage?: AdminHotelPackage | null;
}

type TabType = "basic" | "itinerary" | "menu" | "inclusions";

export function HotelPackageModal({
  isOpen,
  onClose,
  onSave,
  initialPackage,
}: HotelPackageModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("1 Night / 2 Days");
  const [pricePerPerson, setPricePerPerson] = useState<number | string>(10500);
  const [originalPrice, setOriginalPrice] = useState<number | string>(13500);
  const [premiumRoomDelta, setPremiumRoomDelta] = useState<number | string>(2000);
  const [highlight, setHighlight] = useState("");
  const [popular, setPopular] = useState(false);
  const [status, setStatus] = useState<"Active" | "Draft">("Active");

  // Arrays
  const [itinerary, setItinerary] = useState<TourItineraryDay[]>([]);
  const [foodMenu, setFoodMenu] = useState<TourDayFoodMenu[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [newInclusion, setNewInclusion] = useState("");

  useEffect(() => {
    if (initialPackage) {
      setName(initialPackage.name || "");
      setDuration(initialPackage.duration || "1 Night / 2 Days");
      setPricePerPerson(initialPackage.pricePerPerson ?? 10500);
      setOriginalPrice(initialPackage.originalPrice ?? 13500);
      setPremiumRoomDelta(initialPackage.premiumRoomDelta ?? 2000);
      setHighlight(initialPackage.highlight || "");
      setPopular(Boolean(initialPackage.popular));
      setStatus(initialPackage.status || "Active");
      setItinerary(initialPackage.itinerary ? JSON.parse(JSON.stringify(initialPackage.itinerary)) : []);
      setFoodMenu(initialPackage.foodMenu ? JSON.parse(JSON.stringify(initialPackage.foodMenu)) : []);
      setInclusions(initialPackage.inclusions ? [...initialPackage.inclusions] : []);
    } else {
      setName("");
      setDuration("1 Night / 2 Days");
      setPricePerPerson(10500);
      setOriginalPrice(13500);
      setPremiumRoomDelta(2000);
      setHighlight("1 Night Resort Stay • 2 Forest Safaris • Baul Night & All Meals");
      setPopular(false);
      setStatus("Active");
      setItinerary([
        {
          day: 1,
          title: "Kolkata to Godkhali & Hotel Sonar Bangla Check-in",
          activities: [
            { time: "08:30 AM", title: "Kolkata Departure", desc: "Board AC transfer from Kolkata to Godkhali Ferry Ghat." },
            { time: "11:30 AM", title: "Cruiser Boarding", desc: "Board luxury safari boat, welcome coconut water, sail to resort." },
            { time: "01:30 PM", title: "Resort Check-in", desc: "Welcome tilak, check into luxury rooms, grand buffet lunch." },
            { time: "03:30 PM", title: "Watchtower Safari", desc: "Visit Sajnekhali watchtower & Mangrove Interpretation Center." },
            { time: "06:30 PM", title: "Cultural Baul Night", desc: "Evening tea, hot pakoras, live folk music on the river lawn." },
            { time: "08:30 PM", title: "Royal Dinner Buffet", desc: "Multi-cuisine Bengali dinner with local fish delicacies." },
          ],
        },
        {
          day: 2,
          title: "Core Forest Creek Safari & Return Journey",
          activities: [
            { time: "06:30 AM", title: "Morning Delta Cruise", desc: "Early morning cruise into Sundarban core for wildlife spotting." },
            { time: "08:30 AM", title: "Sudhanyakhali Watchtower", desc: "Visit watchtower overlooking sweet water pond." },
            { time: "09:30 AM", title: "Cruiser Breakfast", desc: "Fresh hot luchi, chholar dal, boiled eggs & sweets onboard." },
            { time: "11:30 AM", title: "Dobanki Canopy Walk", desc: "Walk 20 ft above ground on the half-kilometer canopy bridge." },
            { time: "01:30 PM", title: "Farewell Gourmet Lunch", desc: "Authentic lunch served on boat cruising back to Godkhali." },
            { time: "03:30 PM", title: "Transfer to Kolkata", desc: "AC vehicle transfer returning to Kolkata by evening." },
          ],
        },
      ]);
      setFoodMenu([
        {
          day: 1,
          dayTitle: "Day 1 Welcome & Royal Dinner",
          courses: [
            { courseName: "Welcome Drink", items: ["Green Coconut Water", "Butter Cookies", "Bottled Water"] },
            { courseName: "Buffet Lunch", items: ["Basmati Rice", "Sona Moong Dal", "Aloo Bhaja", "Bhetki Fish Curry / Mutton Kosha", "Chutney & Papad", "Rosogolla"] },
            { courseName: "Evening High Tea", items: ["Tea / Coffee", "Crispy Onion & Veg Pakoras", "French Fries"] },
            { courseName: "Grand Dinner", items: ["Rumali Roti", "Jeera Rice", "Butter Chicken / Murgh Kosha", "Paneer Butter Masala", "Gulab Jamun"] },
          ],
        },
        {
          day: 2,
          dayTitle: "Day 2 Cruiser Safari Feast",
          courses: [
            { courseName: "Bed Tea", items: ["Morning Tea / Coffee", "Biscuits"] },
            { courseName: "Cruiser Breakfast", items: ["Hot Luchi", "Chholar Dal", "Boiled Eggs", "Sandesh Sweet"] },
            { courseName: "Farewell Lunch", items: ["Steamed Rice", "Katla Kalia", "Aloo Posto", "Chutney & Papad", "Misti Doi"] },
          ],
        },
      ]);
      setInclusions([
        "Luxury AC Suite/Room Accommodation at Hotel Sonar Bangla",
        "All Gourmet Meals Included (Welcome Drink to Farewell Lunch)",
        "AC Forest Cruiser Safari with Govt Naturalist Guide",
        "Watchtower Entry Permits & Forest Department Fees",
        "Cultural Baul Song & Tribal Folk Dance Performance",
        "Resort Infinity Pool, Lawn & Garden Access",
      ]);
    }
    setActiveTab("basic");
    setErrorMessage(null);
  }, [initialPackage, isOpen]);

  if (!isOpen) return null;

  // Itinerary Handlers
  const handleAddDay = () => {
    const nextDayNum = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        day: nextDayNum,
        title: `Day ${nextDayNum}: Safari & Activities`,
        activities: [
          { time: "08:00 AM", title: "Morning Activity", desc: "Activity description here..." },
          { time: "01:30 PM", title: "Lunch Break", desc: "Gourmet meal served." },
        ],
      },
    ]);
  };

  const handleRemoveDay = (dayIndex: number) => {
    const updated = itinerary.filter((_, idx) => idx !== dayIndex);
    // Re-number days
    const renumbered = updated.map((d, idx) => ({ ...d, day: idx + 1 }));
    setItinerary(renumbered);
  };

  const handleUpdateDayTitle = (dayIndex: number, newTitle: string) => {
    const updated = [...itinerary];
    updated[dayIndex].title = newTitle;
    setItinerary(updated);
  };

  const handleAddActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({
      time: "10:00 AM",
      title: "New Activity",
      desc: "Activity details...",
    });
    setItinerary(updated);
  };

  const handleUpdateActivity = (
    dayIndex: number,
    activityIndex: number,
    field: keyof TourActivity,
    val: string
  ) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[activityIndex][field] = val;
    setItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter(
      (_, idx) => idx !== activityIndex
    );
    setItinerary(updated);
  };

  // Food Menu Handlers
  const handleAddMenuDay = () => {
    const nextDayNum = foodMenu.length + 1;
    setFoodMenu([
      ...foodMenu,
      {
        day: nextDayNum,
        dayTitle: `Day ${nextDayNum} Food Menu`,
        courses: [
          { courseName: "Breakfast", items: ["Luchi", "Chholar Dal", "Boiled Egg", "Tea"] },
          { courseName: "Lunch", items: ["Rice", "Dal", "Fish / Chicken Curry", "Sweet"] },
          { courseName: "Dinner", items: ["Roti", "Pulao", "Chicken / Paneer", "Dessert"] },
        ],
      },
    ]);
  };

  const handleRemoveMenuDay = (dayIndex: number) => {
    const updated = foodMenu.filter((_, idx) => idx !== dayIndex);
    const renumbered = updated.map((d, idx) => ({ ...d, day: idx + 1 }));
    setFoodMenu(renumbered);
  };

  const handleUpdateMenuDayTitle = (dayIndex: number, newTitle: string) => {
    const updated = [...foodMenu];
    updated[dayIndex].dayTitle = newTitle;
    setFoodMenu(updated);
  };

  const handleAddCourse = (dayIndex: number) => {
    const updated = [...foodMenu];
    if (updated[dayIndex]) {
      if (!updated[dayIndex].courses) updated[dayIndex].courses = [];
      updated[dayIndex].courses.push({
        courseName: "Evening Snacks",
        menuItems: "Tea / Coffee, Pakoras",
        items: ["Tea / Coffee", "Pakoras"],
      });
      setFoodMenu(updated);
    }
  };

  const handleUpdateCourseName = (dayIndex: number, courseIndex: number, newName: string) => {
    const updated = [...foodMenu];
    if (updated[dayIndex]?.courses?.[courseIndex]) {
      updated[dayIndex].courses[courseIndex].courseName = newName;
      setFoodMenu(updated);
    }
  };

  const handleUpdateCourseItems = (dayIndex: number, courseIndex: number, itemsString: string) => {
    const updated = [...foodMenu];
    if (updated[dayIndex]?.courses?.[courseIndex]) {
      const itemsArray = itemsString
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      updated[dayIndex].courses[courseIndex].items = itemsArray;
      updated[dayIndex].courses[courseIndex].menuItems = itemsString;
      setFoodMenu(updated);
    }
  };

  const handleRemoveCourse = (dayIndex: number, courseIndex: number) => {
    const updated = [...foodMenu];
    if (updated[dayIndex]?.courses) {
      updated[dayIndex].courses = updated[dayIndex].courses.filter(
        (_, idx) => idx !== courseIndex
      );
      setFoodMenu(updated);
    }
  };

  // Inclusions Handlers
  const handleAddInclusion = () => {
    if (!newInclusion.trim()) return;
    setInclusions([...inclusions, newInclusion.trim()]);
    setNewInclusion("");
  };

  const handleRemoveInclusion = (idx: number) => {
    setInclusions(inclusions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter package name.");
      setActiveTab("basic");
      return;
    }
    if (!duration.trim()) {
      setErrorMessage("Please enter package duration.");
      setActiveTab("basic");
      return;
    }
    if (!pricePerPerson || Number(pricePerPerson) <= 0) {
      setErrorMessage("Please specify a valid base price per person.");
      setActiveTab("basic");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        name: name.trim(),
        duration: duration.trim(),
        pricePerPerson: Number(pricePerPerson),
        originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(pricePerPerson) * 1.25),
        premiumRoomDelta: premiumRoomDelta ? Number(premiumRoomDelta) : 2000,
        highlight: highlight.trim(),
        popular,
        status,
        itinerary,
        foodMenu,
        inclusions,
      });
      onClose();
    } catch (err: any) {
      console.error("Save package error:", err);
      setErrorMessage(err?.message || "Failed to save hotel package.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {initialPackage ? `Edit Hotel Package: ${initialPackage.name}` : "Create New Hotel Tour Package"}
              </h3>
              <p className="text-xs text-slate-500">
                Hotel Sonar Bangla signature stay package with itinerary &amp; food menu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 px-5 pt-2 border-b border-slate-200 bg-white overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "basic"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>1. Basic Info &amp; Pricing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("itinerary")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "itinerary"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>2. Detailed Itinerary ({itinerary.length} Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "menu"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>3. Food Menu &amp; Meals ({foodMenu.length} Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("inclusions")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "inclusions"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>4. Inclusions ({inclusions.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: BASIC INFO & PRICING */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 1 Night 2 Days Deluxe Package"
                    className="w-full h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 1 Night / 2 Days or 2 Nights / 3 Days"
                    className="w-full h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Base Deluxe Price (₹/person) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(e.target.value)}
                    placeholder="10500"
                    className="w-full h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Starting price for Deluxe Room</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Premium Room Delta (+₹/person) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={premiumRoomDelta}
                    onChange={(e) => setPremiumRoomDelta(e.target.value)}
                    placeholder="2000"
                    className="w-full h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Extra cost per person for Premium Room</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Strikethrough Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="13500"
                    className="w-full h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-medium outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Original price shown crossed out</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Package Highlight Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  placeholder="e.g. 1 Night Resort Stay • 2 Forest Safaris • Baul Night & All Meals"
                  className="w-full p-3 rounded-[4px] border border-slate-300 bg-white text-slate-900 text-sm font-medium outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-md bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <input
                    id="popular-checkbox"
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="popular-checkbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Mark as &quot;Most Popular&quot; Package
                  </label>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <label className="text-xs font-bold text-slate-700">Publish Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="h-8 px-2.5 rounded-[4px] border border-slate-300 bg-white text-xs font-bold text-slate-800 outline-none"
                  >
                    <option value="Active">Active (Live on Website)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED ITINERARY */}
          {activeTab === "itinerary" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                    Day-by-Day Tour Itinerary
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Add morning, afternoon, and evening safari schedule for each day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddDay}
                  className="px-3 py-1.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Day</span>
                </button>
              </div>

              {itinerary.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-500 font-medium">No days added to itinerary yet.</p>
                  <button
                    type="button"
                    onClick={handleAddDay}
                    className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                  >
                    + Add Day 1
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {itinerary.map((dayItem, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 rounded-md border border-slate-200 bg-slate-50/60 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                          {dayItem.day}
                        </span>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => handleUpdateDayTitle(dIdx, e.target.value)}
                          placeholder={`Day ${dayItem.day} Title (e.g. Arrival, Safari, Bonfire)`}
                          className="flex-1 h-9 px-3 rounded-[4px] border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-blue-600"
                        />
                        {itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(dIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete this day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Activities List */}
                      <div className="space-y-2 pl-9">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                            Day {dayItem.day} Activities Timeline:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddActivity(dIdx)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Activity</span>
                          </button>
                        </div>

                        {dayItem.activities.map((act, aIdx) => (
                          <div
                            key={aIdx}
                            className="grid grid-cols-12 gap-2 bg-white p-2.5 rounded-[4px] border border-slate-200 items-start"
                          >
                            <div className="col-span-3 sm:col-span-2">
                              <input
                                type="text"
                                value={act.time}
                                onChange={(e) =>
                                  handleUpdateActivity(dIdx, aIdx, "time", e.target.value)
                                }
                                placeholder="08:30 AM"
                                className="w-full h-8 px-2 text-xs font-bold text-slate-800 rounded border border-slate-200 outline-none"
                              />
                            </div>
                            <div className="col-span-8 sm:col-span-4">
                              <input
                                type="text"
                                value={act.title}
                                onChange={(e) =>
                                  handleUpdateActivity(dIdx, aIdx, "title", e.target.value)
                                }
                                placeholder="Activity Title"
                                className="w-full h-8 px-2 text-xs font-semibold text-slate-800 rounded border border-slate-200 outline-none"
                              />
                            </div>
                            <div className="col-span-11 sm:col-span-5">
                              <input
                                type="text"
                                value={act.desc}
                                onChange={(e) =>
                                  handleUpdateActivity(dIdx, aIdx, "desc", e.target.value)
                                }
                                placeholder="Short description..."
                                className="w-full h-8 px-2 text-xs text-slate-600 rounded border border-slate-200 outline-none"
                              />
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleRemoveActivity(dIdx, aIdx)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FOOD MENU */}
          {activeTab === "menu" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                    Day-by-Day Meal Plan &amp; Menu
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Specify breakfast, lunch, high tea, and dinner dishes included in this package.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMenuDay}
                  className="px-3 py-1.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Menu Day</span>
                </button>
              </div>

              {foodMenu.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-500 font-medium">No menu plan added yet.</p>
                  <button
                    type="button"
                    onClick={handleAddMenuDay}
                    className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                  >
                    + Add Day 1 Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {foodMenu.map((mDay, mdIdx) => (
                    <div
                      key={mdIdx}
                      className="p-4 rounded-md border border-slate-200 bg-slate-50/60 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                          {mDay.day}
                        </span>
                        <input
                          type="text"
                          value={mDay.dayTitle}
                          onChange={(e) => handleUpdateMenuDayTitle(mdIdx, e.target.value)}
                          placeholder={`Day ${mDay.day} Feast Title`}
                          className="flex-1 h-9 px-3 rounded-[4px] border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 outline-none focus:border-blue-600"
                        />
                        {foodMenu.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMenuDay(mdIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Courses */}
                      <div className="space-y-2.5 pl-9">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                            Meals &amp; Courses:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddCourse(mdIdx)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Meal Course</span>
                          </button>
                        </div>

                        {(mDay.courses || []).map((course, cIdx) => {
                          const courseItems =
                            course.items ||
                            (course.menuItems
                              ? course.menuItems.split(",").map((s) => s.trim()).filter(Boolean)
                              : []);
                          return (
                            <div
                              key={cIdx}
                              className="p-3 bg-white rounded-[4px] border border-slate-200 space-y-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <input
                                  type="text"
                                  value={course.courseName}
                                  onChange={(e) =>
                                    handleUpdateCourseName(mdIdx, cIdx, e.target.value)
                                  }
                                  placeholder="Meal Name (e.g. Lunch / Dinner)"
                                  className="w-48 h-7 px-2 text-xs font-bold text-slate-800 rounded border border-slate-300 outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCourse(mdIdx, cIdx)}
                                  className="text-slate-400 hover:text-rose-600 p-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <input
                                type="text"
                                value={courseItems.join(", ")}
                                onChange={(e) =>
                                  handleUpdateCourseItems(mdIdx, cIdx, e.target.value)
                                }
                                placeholder="Comma separated dishes (e.g. Basmati Rice, Bhetki Paturi, Dal, Sweet)"
                                className="w-full h-8 px-2.5 text-xs text-slate-700 rounded border border-slate-200 outline-none focus:border-blue-600"
                              />
                              <div className="flex flex-wrap gap-1">
                                {courseItems.map((item, iIdx) => (
                                  <span
                                    key={iIdx}
                                    className="text-[10px] font-medium bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
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

          {/* TAB 4: INCLUSIONS */}
          {activeTab === "inclusions" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Package Inclusions List
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddInclusion();
                      }
                    }}
                    placeholder="e.g. 5-Star Resort Stay with Infinity Pool Access"
                    className="flex-1 h-10 px-3 rounded-[4px] border border-slate-300 bg-white text-sm outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-[4px] flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {inclusions.map((inc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs font-semibold text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{inc}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclusion(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-[3px] border border-slate-300"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Saving Package..." : initialPackage ? "Update Package" : "Publish Package"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelPackageModal;
