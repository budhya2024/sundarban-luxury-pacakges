"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Calendar,
  Utensils,
  Clock,
  Sparkles,
  DollarSign,
  Package,
  Layers,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Check,
  X,
  XCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminHotelPackage,
  TourItineraryDay,
  TourDayFoodMenu,
  TourActivity,
  TourMealCourse,
  initialAdminHotelPackages,
} from "@/lib/admin-data";

type SectionType = "basic" | "itinerary" | "menu" | "inclusions";

function HotelPackageEditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("id");
  const { showToast } = useAdmin();

  const [activeSection, setActiveSection] = useState<SectionType>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  const [menuProvided, setMenuProvided] = useState<boolean>(true);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [newInclusion, setNewInclusion] = useState("");
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [newExclusion, setNewExclusion] = useState("");

  // Load existing package if editing
  useEffect(() => {
    if (!packageId) {
      // Defaults for new package
      setName("");
      setDuration("1 Night / 2 Days");
      setPricePerPerson(10500);
      setOriginalPrice(13500);
      setPremiumRoomDelta(2000);
      setHighlight("");
      setPopular(false);
      setStatus("Active");
      setItinerary([
        {
          dayNumber: 1,
          dayTitle: "Arrival & River Cruise Check-in",
          description: "Departure from Kolkata and luxury cruiser transfer to Sonar Bangla.",
          activities: [
            { time: "08:30 AM", title: "Kolkata Pickup", desc: "Board AC transfer vehicle." },
            { time: "11:30 AM", title: "Ferry Boarding", desc: "Board cruiser boat with welcome coconut." },
          ],
        },
        {
          dayNumber: 2,
          dayTitle: "Deep Forest Safari & Return",
          description: "Full day mangrove canopy watchtower exploration and return.",
          activities: [
            { time: "07:00 AM", title: "Canopy Walk Safari", desc: "Visit Dobanki watchtower canopy." },
            { time: "02:00 PM", title: "Farewell Transfer", desc: "Transfer back to Kolkata." },
          ],
        },
      ]);
      setFoodMenu([
        {
          dayNumber: 1,
          dayTitle: "Day 1 Authentic Feasts",
          courses: [
            { courseName: "Welcome Drink", menuItems: "Fresh Coconut Water, Cookies", items: ["Fresh Coconut Water", "Cookies"] },
            { courseName: "Buffet Lunch", menuItems: "Rice, Dal, Bhetki Paturi, Mutton", items: ["Rice", "Dal", "Bhetki Paturi", "Mutton"] },
            { courseName: "Grand Dinner", menuItems: "Roti, Pulao, Butter Chicken", items: ["Roti", "Pulao", "Butter Chicken"] },
          ],
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2 Cruiser Dining",
          courses: [
            { courseName: "Breakfast", menuItems: "Hot Luchi, Chholar Dal, Sweets", items: ["Hot Luchi", "Chholar Dal", "Sweets"] },
            { courseName: "Lunch", menuItems: "Steamed Rice, Katla Kalia, Sweet Curd", items: ["Steamed Rice", "Katla Kalia", "Sweet Curd"] },
          ],
        },
      ]);
      setInclusions([
        "Accommodation in Hotel Sonar Bangla Luxury Resort",
        "All Gourmet Meals (Breakfast, Lunch, Evening Snacks & Dinner)",
        "Exclusive Forest Cruiser Boat Safari with National Park Permits",
        "Govt. Trained Wildlife Guide and Forest Watchtowers Entry",
        "Evening Tribal Baul Folk Music and Cultural Entertainment",
      ]);
      setExclusions([
        "Personal expenses (laundry, room service, telephone calls)",
        "Any alcoholic beverages or bottled soda drinks outside meal plan",
        "Still & Video Camera entry permits (payable directly at Forest counters)",
        "Tips, gratuities to guides, drivers, and resort staff",
        "Optional private vehicle transfers (group ₹500 / private ₹5,000)",
        "Medical insurance & emergency transport evacuation costs",
      ]);
      return;
    }

    // Editing: Fetch live from backend
    setIsLoading(true);
    fetch("/api/admin/hotel/packages")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        let found = null;
        if (data?.success && Array.isArray(data.packages)) {
          found = data.packages.find((p: AdminHotelPackage) => p.id === packageId);
        }
        if (!found) {
          found = initialAdminHotelPackages.find((p) => p.id === packageId);
        }

        if (found) {
          setName(found.name || "");
          setDuration(found.duration || "1 Night / 2 Days");
          setPricePerPerson(found.pricePerPerson ?? 10500);
          setOriginalPrice(found.originalPrice ?? 13500);
          setPremiumRoomDelta(found.premiumRoomDelta ?? 2000);
          setHighlight(found.highlight || "");
          setPopular(Boolean(found.popular));
          setStatus(found.status === "Draft" ? "Draft" : "Active");

          if (found.itinerary && Array.isArray(found.itinerary)) {
            setItinerary(
              found.itinerary.map((d: any, idx: number) => ({
                dayNumber: d.dayNumber || d.day || idx + 1,
                dayTitle: d.dayTitle || d.title || `Day ${idx + 1}`,
                description: d.description || "",
                activities: (d.activities || []).map((a: any) => ({
                  time: a.time || "08:00 AM",
                  title: a.title || "",
                  desc: a.desc || a.description || "",
                })),
              }))
            );
          }

          if (found.foodMenu && Array.isArray(found.foodMenu) && found.foodMenu.length > 0) {
            setMenuProvided(true);
            setFoodMenu(
              found.foodMenu.map((m: any, idx: number) => ({
                dayNumber: m.dayNumber || m.day || idx + 1,
                dayTitle: m.dayTitle || m.title || `Day ${idx + 1} Meals`,
                courses: (m.meals || m.courses || []).map((c: any) => ({
                  courseName: c.courseName || c.name || "Meal",
                  menuItems: c.menuItems || (c.items ? c.items.join(", ") : ""),
                  items: c.items || (c.menuItems ? c.menuItems.split(",").map((s: string) => s.trim()) : []),
                })),
              }))
            );
          } else {
            setMenuProvided(false);
            setFoodMenu([]);
          }

          if (found.inclusions && Array.isArray(found.inclusions)) {
            setInclusions(found.inclusions);
          }
          if (found.exclusions && Array.isArray(found.exclusions)) {
            setExclusions(found.exclusions);
          } else {
            setExclusions([
              "Personal expenses (laundry, room service, telephone calls)",
              "Any alcoholic beverages or bottled soda drinks outside meal plan",
              "Still & Video Camera entry permits (payable directly at Forest counters)",
              "Tips, gratuities to guides, drivers, and resort staff",
              "Optional private vehicle transfers (group ₹500 / private ₹5,000)",
              "Medical insurance & emergency transport evacuation costs",
            ]);
          }
        }
      })
      .catch((err) => console.error("Error loading package for editor:", err))
      .finally(() => setIsLoading(false));
  }, [packageId]);

  // Itinerary Handlers
  const handleAddItineraryDay = () => {
    const nextDayNum = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        dayNumber: nextDayNum,
        dayTitle: `Day ${nextDayNum} Schedule`,
        description: "",
        activities: [
          {
            time: "08:00 AM",
            title: "Morning Safari",
            desc: "Cruise along forest creeks and watchtowers.",
          },
        ],
      },
    ]);
  };

  const handleRemoveItineraryDay = (dayIndex: number) => {
    setItinerary(itinerary.filter((_, idx) => idx !== dayIndex));
  };

  const handleUpdateDayTitle = (dayIndex: number, newTitle: string) => {
    const updated = [...itinerary];
    updated[dayIndex].dayTitle = newTitle;
    setItinerary(updated);
  };

  const handleUpdateDayDesc = (dayIndex: number, newDesc: string) => {
    const updated = [...itinerary];
    updated[dayIndex].description = newDesc;
    setItinerary(updated);
  };

  const handleAddActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({
      time: "10:00 AM",
      title: "New Activity",
      desc: "Activity details and instructions.",
    });
    setItinerary(updated);
  };

  const handleUpdateActivity = (
    dayIndex: number,
    activityIndex: number,
    field: "time" | "title" | "desc",
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
        dayNumber: nextDayNum,
        dayTitle: `Day ${nextDayNum} Meals & Dining`,
        courses: [
          {
            courseName: "Buffet Breakfast",
            menuItems: "Puri, Chholar Dal, Boiled Egg, Sweet, Tea",
            items: ["Puri", "Chholar Dal", "Boiled Egg", "Sweet", "Tea"],
          },
          {
            courseName: "Special Lunch",
            menuItems: "Basmati Rice, Fish Curry, Seasonal Veg, Salad, Chutney",
            items: ["Basmati Rice", "Fish Curry", "Seasonal Veg", "Salad", "Chutney"],
          },
        ],
      },
    ]);
  };

  const handleRemoveMenuDay = (dayIndex: number) => {
    setFoodMenu(foodMenu.filter((_, idx) => idx !== dayIndex));
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

  // Inclusions & Exclusions Handlers
  const handleAddInclusion = (itemText?: string) => {
    const val = (itemText || newInclusion).trim();
    if (!val) return;
    if (!inclusions.includes(val)) {
      setInclusions([...inclusions, val]);
    }
    setNewInclusion("");
  };

  const handleRemoveInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, idx) => idx !== index));
  };

  const handleAddExclusion = (itemText?: string) => {
    const val = (itemText || newExclusion).trim();
    if (!val) return;
    if (!exclusions.includes(val)) {
      setExclusions([...exclusions, val]);
    }
    setNewExclusion("");
  };

  const handleRemoveExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, idx) => idx !== index));
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter a package name.");
      setActiveSection("basic");
      return;
    }

    const priceNum = Number(pricePerPerson);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMessage("Please enter a valid price per person.");
      setActiveSection("basic");
      return;
    }

    setIsSubmitting(true);

    const payload: Partial<AdminHotelPackage> = {
      name: name.trim(),
      duration: duration.trim(),
      pricePerPerson: priceNum,
      originalPrice: Number(originalPrice) || Math.round(priceNum * 1.25),
      premiumRoomDelta: Number(premiumRoomDelta) || 2000,
      highlight: highlight.trim(),
      popular,
      status,
      itinerary,
      foodMenu: menuProvided ? foodMenu : [],
      inclusions,
      exclusions,
    };

    try {
      if (packageId) {
        // Update existing package
        const res = await fetch(`/api/admin/hotel/packages/${encodeURIComponent(packageId)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          showToast(`Package "${name}" updated successfully`);
          router.push(`/admin/hotel/packages/${encodeURIComponent(packageId)}`);
        } else {
          setErrorMessage(data?.error || "Failed to update package on server.");
        }
      } else {
        // Create new package
        const res = await fetch("/api/admin/hotel/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success && data?.package) {
          showToast(`Package "${name}" published successfully`);
          router.push(`/admin/hotel/packages/${encodeURIComponent(data.package.id)}`);
        } else {
          setErrorMessage(data?.error || "Failed to create package on server.");
        }
      }
    } catch (err) {
      console.error("Save package error:", err);
      setErrorMessage("Network error occurred while saving the package.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <AdminHeader
        title={packageId ? `Edit Tour Package: ${name || "Hotel Package"}` : "Create Hotel Tour Package"}
        subtitle="Manage stay duration, pricing, Deluxe/Premium room deltas, day-by-day activities, and food menu"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/admin/hotel"
              className="font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Hotel Packages</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-extrabold text-slate-900">
              {packageId ? "Edit Tour Package" : "Create New Tour Package"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={packageId ? `/admin/hotel/packages/${encodeURIComponent(packageId)}` : "/admin/hotel"}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-[3px] transition-colors"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Saving Package..." : packageId ? "Update Tour Package" : "Publish Tour Package"}</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-[4px] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Editor Tabs Navigation */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-[4px] border border-slate-200 overflow-x-auto shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveSection("basic")}
            className={`px-4 py-2 text-xs font-extrabold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeSection === "basic"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Basic Info &amp; Room Pricing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("itinerary")}
            className={`px-4 py-2 text-xs font-extrabold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeSection === "itinerary"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span>2. Day-by-Day Itinerary ({itinerary.length} Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("menu")}
            className={`px-4 py-2 text-xs font-extrabold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeSection === "menu"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Utensils className="w-4 h-4" />
            <span>
              3. Gourmet Food Menu{" "}
              {menuProvided && foodMenu.length > 0
                ? `(${foodMenu.length} Days)`
                : "(Contact Operator)"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("inclusions")}
            className={`px-4 py-2 text-xs font-extrabold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeSection === "inclusions"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. Inclusions &amp; Exclusions ({inclusions.length} Inc • {exclusions.length} Exc)</span>
          </button>
        </div>

        {/* SECTION 1: BASIC INFO & PRICING */}
        {activeSection === "basic" && (
          <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Package Information &amp; Room Tariff Structure</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure package titles, duration badges, Deluxe room base pricing, and Premium room deltas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Package Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 1 Night 2 Days Deluxe Package"
                  className="w-full h-10 px-3.5 text-xs font-bold rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none"
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
                  className="w-full h-10 px-3.5 text-xs font-semibold rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Active" | "Draft")}
                  className="w-full h-10 px-3.5 text-xs font-bold rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none bg-white cursor-pointer"
                >
                  <option value="Active">Active (Visible on public booking form)</option>
                  <option value="Draft">Draft (Hidden from public site)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Deluxe Room Base Price (₹ / person) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(e.target.value)}
                    placeholder="10500"
                    className="w-full h-10 pl-7 pr-3.5 text-xs font-black rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Included in standard package booking.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-700 uppercase tracking-wide mb-1.5">
                  Premium Room Upgrade Delta (+₹ / person) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 font-bold text-xs">
                    +₹
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    value={premiumRoomDelta}
                    onChange={(e) => setPremiumRoomDelta(e.target.value)}
                    placeholder="2000"
                    className="w-full h-10 pl-9 pr-3.5 text-xs font-black rounded-[3px] border border-blue-300 bg-blue-50/40 focus:border-blue-600 outline-none"
                  />
                </div>
                <span className="text-[11px] text-blue-600 mt-1 block font-medium">
                  Extra tariff added per person if guest chooses Premium Room.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Original / Strikethrough Price (₹ / person)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="13500"
                    className="w-full h-10 pl-7 pr-3.5 text-xs font-semibold rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-extrabold text-slate-800">
                    Badge as "Most Popular" on Booking Form
                  </span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Highlights / Short Description
                </label>
                <textarea
                  rows={2}
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  placeholder="e.g. 1 Night Resort Stay • 2 Forest Safaris • Baul Night & All Meals"
                  className="w-full p-3 text-xs rounded-[3px] border border-slate-300 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveSection("itinerary")}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Proceed to Day-by-Day Itinerary</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: ITINERARY (DAYS) */}
        {activeSection === "itinerary" && (
          <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Day-by-Day Safari Itinerary &amp; Timeline</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add days, scheduled start times, watchtowers, and river cruises for this package.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddItineraryDay}
                className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            {itinerary.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-300 rounded-[4px]">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No itinerary days added yet.</p>
                <button
                  type="button"
                  onClick={handleAddItineraryDay}
                  className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-[3px]"
                >
                  Add Day 1
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {itinerary.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-[4px] border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-7 h-7 rounded-[3px] bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          D{dIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={day.dayTitle}
                          onChange={(e) => handleUpdateDayTitle(dIdx, e.target.value)}
                          placeholder="Day Title (e.g. Kolkata Departure & Resort Check-in)"
                          className="w-full max-w-md h-8 px-2.5 text-xs font-bold text-slate-800 rounded-[3px] border border-slate-300 bg-white outline-none focus:border-blue-600"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddActivity(dIdx)}
                          className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-[3px] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Activity</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(dIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete Day"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={day.description || ""}
                        onChange={(e) => handleUpdateDayDesc(dIdx, e.target.value)}
                        placeholder="Day overview / subtitle (e.g. Luxury AC transfer to Godkhali, cruiser safari and sunset music)"
                        className="w-full h-7 px-2.5 text-xs text-slate-600 rounded-[3px] border border-slate-200 bg-white outline-none focus:border-blue-600"
                      />
                    </div>

                    {/* Activities List */}
                    <div className="space-y-2 pt-1">
                      {day.activities.map((act, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3 bg-white rounded-[4px] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2"
                        >
                          <input
                            type="text"
                            value={act.time}
                            onChange={(e) => handleUpdateActivity(dIdx, aIdx, "time", e.target.value)}
                            placeholder="08:30 AM"
                            className="w-24 h-7 px-2 text-xs font-bold text-blue-700 rounded border border-slate-300 outline-none shrink-0"
                          />
                          <input
                            type="text"
                            value={act.title}
                            onChange={(e) => handleUpdateActivity(dIdx, aIdx, "title", e.target.value)}
                            placeholder="Activity Title (e.g. Sajnekhali Watchtower Safari)"
                            className="w-56 h-7 px-2 text-xs font-extrabold text-slate-800 rounded border border-slate-300 outline-none shrink-0"
                          />
                          <input
                            type="text"
                            value={act.desc}
                            onChange={(e) => handleUpdateActivity(dIdx, aIdx, "desc", e.target.value)}
                            placeholder="Short description of this tour activity..."
                            className="w-full h-7 px-2 text-xs text-slate-600 rounded border border-slate-200 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveActivity(dIdx, aIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 shrink-0 cursor-pointer"
                            title="Remove Activity"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveSection("basic")}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px]"
              >
                ← Back to Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("menu")}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Proceed to Gourmet Food Menu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SECTION 3: GOURMET FOOD MENU */}
        {activeSection === "menu" && (
          <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Day-by-Day Gourmet Food Menu &amp; Meals</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure multi-course meals or select &quot;Menu Not Provided&quot; to prompt guests to contact the tour operator.
                </p>
              </div>

              {menuProvided && (
                <button
                  type="button"
                  onClick={handleAddMenuDay}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-[3px] flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Menu Day</span>
                </button>
              )}
            </div>

            {/* Menu Provision Mode Choice Bar */}
            <div className="p-4 rounded-[4px] bg-amber-50/40 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Package Food Menu Mode:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  {menuProvided
                    ? "Providing detailed daily multi-course meals for this package."
                    : "Menu is marked as NOT PROVIDED. Guests will see 'Contact our operator' on the reservation form."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setMenuProvided(true);
                    if (foodMenu.length === 0) handleAddMenuDay();
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-all cursor-pointer ${
                    menuProvided
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  ✓ Provide Food Menu
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuProvided(false);
                    setFoodMenu([]);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-all cursor-pointer ${
                    !menuProvided
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  ✕ Menu Not Provided (Contact Operator)
                </button>
              </div>
            </div>

            {!menuProvided ? (
              <div className="text-center py-10 bg-amber-50/30 border border-dashed border-amber-300 rounded-[4px] p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-amber-700" />
                </div>
                <h4 className="text-sm font-extrabold text-amber-950">
                  Menu Option: &quot;Menu Not Provided&quot; Active
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  You have configured this package without a fixed daily menu. Visitors on the public booking form and package details view will see a notice:
                  <span className="font-semibold text-slate-800 block mt-1">
                    &quot;Menu not provided in fixed package. Please contact our tour operator for personalized meal arrangements (+91 70014 03498).&quot;
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMenuProvided(true);
                    handleAddMenuDay();
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-[3px] inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Switch to Provide Day-by-Day Menu</span>
                </button>
              </div>
            ) : foodMenu.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-300 rounded-[4px] space-y-3">
                <Utensils className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">No meal menu days added yet.</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddMenuDay}
                    className="px-3.5 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-[3px] border border-amber-200 cursor-pointer"
                  >
                    Add Day 1 Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuProvided(false);
                      setFoodMenu([]);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-[3px] border border-rose-200 cursor-pointer"
                  >
                    Set as Menu Not Provided
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {foodMenu.map((mDay, mdIdx) => (
                  <div
                    key={mdIdx}
                    className="p-4 rounded-[4px] border border-amber-200/80 bg-amber-50/20 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap border-b border-amber-200/80 pb-2.5">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-7 h-7 rounded-[3px] bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          M{mdIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={mDay.dayTitle}
                          onChange={(e) => handleUpdateMenuDayTitle(mdIdx, e.target.value)}
                          placeholder="Menu Day Title (e.g. Day 1 Authentic Bengali Feast)"
                          className="w-full max-w-md h-8 px-2.5 text-xs font-bold text-slate-800 rounded-[3px] border border-slate-300 bg-white outline-none focus:border-amber-600"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddCourse(mdIdx)}
                          className="px-2.5 py-1 text-xs font-bold text-amber-800 bg-amber-100/80 hover:bg-amber-200/80 rounded-[3px] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Meal Course</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveMenuDay(mdIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete Day"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meal Courses List */}
                    <div className="space-y-3 pt-1">
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
                                onChange={(e) => handleUpdateCourseName(mdIdx, cIdx, e.target.value)}
                                placeholder="Meal Name (e.g. Welcome Drink, Lunch, Dinner)"
                                className="w-60 h-7 px-2 text-xs font-extrabold text-slate-900 rounded border border-slate-300 outline-none focus:border-amber-600"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCourse(mdIdx, cIdx)}
                                className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <input
                              type="text"
                              value={courseItems.join(", ")}
                              onChange={(e) => handleUpdateCourseItems(mdIdx, cIdx, e.target.value)}
                              placeholder="Comma separated dishes (e.g. Basmati Rice, Bhetki Paturi, Mutton Kosha, Sweet)"
                              className="w-full h-8 px-2.5 text-xs text-slate-700 rounded border border-slate-200 outline-none focus:border-amber-600"
                            />

                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {courseItems.map((item, iIdx) => (
                                <span
                                  key={iIdx}
                                  className="text-[10px] font-medium bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200"
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

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveSection("itinerary")}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px]"
              >
                ← Back to Itinerary
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("inclusions")}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Proceed to Inclusions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4: INCLUSIONS & EXCLUSIONS */}
        {activeSection === "inclusions" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Package Inclusions &amp; Exclusions Management</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clearly state what guests receive in the package and what is excluded or billed separately.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT CARD: INCLUSIONS (WHAT'S INCLUDED) */}
              <div className="bg-white p-5 rounded-[4px] border border-emerald-200 shadow-2xs space-y-4 flex flex-col">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        What&apos;s Included (Inclusions)
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                        {inclusions.length} items covered in package
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Inclusions Presets */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                    Quick Preset Inclusions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Hotel Sonar Bangla Deluxe/Premium Accommodation",
                      "All Meals (Breakfast, Lunch, Hi-Tea, Dinner)",
                      "Exclusive Forest Cruiser Boat Safari",
                      "Sajnekhali, Sudhanyakhali & Dobanki Permits",
                      "Govt. Trained Wildlife Guide",
                      "Cultural Baul Folk Dance & Music Show",
                      "Resort Swimming Pool & Lawn Access",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAddInclusion(preset)}
                        className="px-2 py-1 text-[10px] font-semibold rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add Custom Inclusion */}
                <div className="flex items-center gap-2 pt-1">
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
                    placeholder="Type custom inclusion and press Add..."
                    className="w-full h-9 px-3 text-xs rounded-[3px] border border-slate-300 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddInclusion()}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-[3px] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2 flex-1 pt-2">
                  {inclusions.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded">
                      No inclusions added yet. Click presets or type above.
                    </div>
                  ) : (
                    inclusions.map((inc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-emerald-50/40 border border-emerald-200/80 rounded-[3px] text-xs font-semibold text-slate-800 shadow-2xs group hover:bg-emerald-50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span className="truncate">{inc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveInclusion(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* RIGHT CARD: EXCLUSIONS (WHAT'S EXCLUDED) */}
              <div className="bg-white p-5 rounded-[4px] border border-rose-200 shadow-2xs space-y-4 flex flex-col">
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        What&apos;s Excluded (Exclusions)
                      </h4>
                      <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">
                        {exclusions.length} items not included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Exclusions Presets */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                    Quick Preset Exclusions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Personal expenses (laundry, room service, phone calls)",
                      "Any alcoholic drinks & packaged beverages outside meals",
                      "Camera & Video Camera entry permits (Forest Dept)",
                      "Tips and gratuities for guides, boat crew & staff",
                      "Optional private vehicle transfers (group ₹500 / private ₹5,000)",
                      "Travel insurance & emergency medical evacuation",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAddExclusion(preset)}
                        className="px-2 py-1 text-[10px] font-semibold rounded bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add Custom Exclusion */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddExclusion();
                      }
                    }}
                    placeholder="Type custom exclusion and press Add..."
                    className="w-full h-9 px-3 text-xs rounded-[3px] border border-slate-300 outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddExclusion()}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-[3px] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Exclusions List */}
                <div className="space-y-2 flex-1 pt-2">
                  {exclusions.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded">
                      No exclusions added yet. Click presets or type above.
                    </div>
                  ) : (
                    exclusions.map((exc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-rose-50/40 border border-rose-200/80 rounded-[3px] text-xs font-semibold text-slate-800 shadow-2xs group hover:bg-rose-50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <X className="w-3.5 h-3.5 text-rose-600 shrink-0 stroke-[2.5]" />
                          <span className="truncate">{exc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveExclusion(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-white p-4 rounded-[4px] border border-slate-200 shadow-2xs flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveSection("menu")}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px] transition-colors cursor-pointer"
              >
                Back to Food Menu
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? "Saving Package..." : packageId ? "Update Tour Package" : "Publish Tour Package"}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function HotelPackageEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
          Loading Package Editor...
        </div>
      }
    >
      <HotelPackageEditorForm />
    </Suspense>
  );
}

