"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Calendar,
  Utensils,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Check,
  X,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminHotelPackage, initialAdminHotelPackages } from "@/lib/admin-data";
import { useAdmin } from "@/context/AdminContext";

type DetailTab = "itinerary" | "menu" | "inclusions" | "pricing";

export default function HotelPackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const packageId = (params?.id as string) || "";
  const { showToast } = useAdmin();

  const [pkg, setPkg] = useState<AdminHotelPackage | null>(() => {
    return initialAdminHotelPackages.find((p) => p.id === packageId) || null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>("itinerary");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Fetch live package from Neon Postgres backend
  const fetchPackage = async () => {
    if (!packageId) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/hotel/packages");
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.packages)) {
          const found = data.packages.find((p: AdminHotelPackage) => p.id === packageId);
          if (found) {
            setPkg(found);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch hotel package details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [packageId]);

  const handleSavePackage = async (updatedData: Partial<AdminHotelPackage>) => {
    if (!pkg) return;
    try {
      const res = await fetch(`/api/admin/hotel/packages/${encodeURIComponent(pkg.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast("Package details updated successfully");

        await fetchPackage();
      } else {
        showToast(data?.error || "Failed to update package");
      }
    } catch (err) {
      console.error("Error updating package:", err);
      showToast("Error updating package");
    }
  };

  const handleToggleStatus = async () => {
    if (!pkg) return;
    const nextStatus = pkg.status === "Active" ? "Draft" : "Active";
    setPkg((prev) => (prev ? { ...prev, status: nextStatus } : prev));
    try {
      const res = await fetch(`/api/admin/hotel/packages/${encodeURIComponent(pkg.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(`Status changed to ${nextStatus}`);
      } else {
        showToast(data?.error || "Failed to update status");
        fetchPackage();
      }
    } catch {
      showToast("Error updating status");
      fetchPackage();
    }
  };

  if (!pkg && !isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
        <AdminHeader
          onOpenMobile={() => setIsMobileOpen(true)}
          title="Tour Package Details"
          subtitle="Hotel Sonar Bangla Tour Package Details"
        />
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <Package className="w-16 h-16 text-slate-300 mb-3" />
          <h2 className="text-lg font-extrabold text-slate-800">Package Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            The requested hotel package #{packageId} does not exist or has been removed.
          </p>
          <Link
            href="/admin/hotel"
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hotel Management</span>
          </Link>
        </main>
      </div>
    );
  }

  const currentPkg = pkg || initialAdminHotelPackages[0];

  const totalActivities = (currentPkg.itinerary || []).reduce(
    (acc, day) => acc + (day.activities?.length || 0),
    0
  );
  const totalMealCourses = (currentPkg.foodMenu || []).reduce(
    (acc, day) => acc + ((day.meals || day.courses || []).length),
    0
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title={currentPkg.name}
        subtitle="Manage complete day-by-day itinerary, meal courses, and room upgrade pricing"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Navigation Breadcrumb Bar */}
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
            <span className="font-extrabold text-slate-900 truncate max-w-xs sm:max-w-md">
              {currentPkg.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/hotel-sonar-bangla#booking-form"
              target="_blank"
              className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-[3px] flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>View on Public Page</span>
            </Link>

            <button
              type="button"
              onClick={handleToggleStatus}
              className={`px-3 py-1.5 text-xs font-bold rounded-[3px] border transition-colors cursor-pointer ${currentPkg.status === "Active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
            >
              {currentPkg.status === "Active" ? "Status: Active" : "Status: Draft"}
            </button>

            <Link
              href={`/admin/hotel/packages/editor?id=${encodeURIComponent(currentPkg.id)}`}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Package, Itinerary &amp; Menu</span>
            </Link>
          </div>
        </div>

        {/* Package Header Banner Card */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-[2px] font-black text-[10px] uppercase tracking-wider ${currentPkg.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                >
                  {currentPkg.status}
                </span>

                {currentPkg.popular && (
                  <span className="px-2.5 py-0.5 rounded-[2px] font-black text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                    ★ Most Popular
                  </span>
                )}

                <span className="text-xs font-bold text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-[2px]">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{currentPkg.duration}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentPkg.name}
              </h1>

              {currentPkg.highlight && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {currentPkg.highlight}
                </p>
              )}
            </div>

            {/* Tariff Badges */}
            <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
              <div className="p-3.5 rounded-[4px] bg-slate-50 border border-slate-200/80 min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Deluxe Room (Base)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-black text-slate-900">
                    ₹{currentPkg.pricePerPerson.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">/person</span>
                </div>
                {currentPkg.originalPrice && currentPkg.originalPrice > currentPkg.pricePerPerson && (
                  <span className="text-[11px] text-slate-400 line-through block mt-0.5">
                    ₹{currentPkg.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="p-3.5 rounded-[4px] bg-blue-50/60 border border-blue-200 min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
                  Premium Room Delta
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-black text-blue-900">
                    +₹{(currentPkg.premiumRoomDelta || 0).toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-blue-700 font-semibold">/person</span>
                </div>
                <span className="text-[11px] text-blue-600 font-medium block mt-0.5">
                  Upgrade price
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`px-4 py-2.5 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeTab === "itinerary"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Day-by-Day Itinerary ({currentPkg.itinerary?.length || 0} Days • {totalActivities} Activities)</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`px-4 py-2.5 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeTab === "menu"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Gourmet Food Menu ({currentPkg.foodMenu?.length || 0} Days • {totalMealCourses} Courses)</span>
          </button>

          <button
            onClick={() => setActiveTab("inclusions")}
            className={`px-4 py-2.5 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeTab === "inclusions"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Inclusions &amp; Exclusions ({currentPkg.inclusions?.length || 0} Inc • {currentPkg.exclusions?.length || 0} Exc)</span>
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-2.5 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${activeTab === "pricing"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing &amp; Room Upgrade Rules</span>
          </button>
        </div>

        {/* TAB 1: ITINERARY */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-[4px] border border-slate-200">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Day-by-Day Safari &amp; Resort Itinerary</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full guest schedule with timestamps, watchtowers, boat cruise timings, and resort activities.
                </p>
              </div>

              <Link
                href={`/admin/hotel/packages/editor?id=${encodeURIComponent(currentPkg.id)}`}
                className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify Schedule</span>
              </Link>
            </div>

            {(!currentPkg.itinerary || currentPkg.itinerary.length === 0) ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-[4px] p-6">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700">No Itinerary Days Defined</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Add day-by-day schedules with times and activity details for this package.
                </p>
                <Link
                  href={`/admin/hotel/packages/editor?id=${currentPkg.id}`}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Add Itinerary</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {currentPkg.itinerary.map((day, dIdx) => (
                  <div
                    key={day.dayNumber || day.day || dIdx + 1}
                    className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-[3px] bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          D{day.dayNumber || day.day || dIdx + 1}
                        </span>
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900">
                            Day {day.dayNumber || day.day || dIdx + 1}: {day.dayTitle || day.title}
                          </h4>
                          {day.description && (
                            <p className="text-xs text-slate-500 italic mt-0.5">
                              {day.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-slate-400">
                        {day.activities?.length || 0} Activities
                      </span>
                    </div>

                    <div className="space-y-3 pt-1">
                      {day.activities?.map((act, actIdx) => (
                        <div
                          key={actIdx}
                          className="flex items-start gap-4 p-3.5 rounded-[3px] bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                        >
                          <span className="px-2.5 py-1 rounded-[2px] bg-blue-100 text-blue-800 font-extrabold text-[11px] shrink-0 mt-0.5 tracking-wide">
                            {act.time}
                          </span>
                          <div className="flex-1">
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                              {act.title}
                            </h5>
                            {(act.description || act.desc) && (
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
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
            )}
          </div>
        )}

        {/* TAB 2: FOOD MENU */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-[4px] border border-slate-200">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Gourmet 5-Star Food Menu &amp; Meals</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily meal courses (Breakfast, Lunch, Evening High Tea, Grand Dinner) with authentic delicacies.
                </p>
              </div>

              <Link
                href={`/admin/hotel/packages/editor?id=${encodeURIComponent(currentPkg.id)}`}
                className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modify Food Menu</span>
              </Link>
            </div>

            {(!currentPkg.foodMenu || currentPkg.foodMenu.length === 0) ? (
              <div className="text-center py-12 bg-amber-50/40 border border-dashed border-amber-300 rounded-[4px] p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-amber-700" />
                </div>
                <h4 className="text-sm font-extrabold text-amber-950">Menu Not Provided in this Package</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  This package is configured without a fixed daily menu. Visitors on the website booking form see a contact notice:
                  <span className="font-semibold text-slate-800 block mt-1">
                    &quot;Menu not provided in fixed package. Please contact our tour operator for personalized meal arrangements (+91 70014 03498).&quot;
                  </span>
                </p>
                <div className="pt-2">
                  <Link
                    href={`/admin/hotel/packages/editor?id=${currentPkg.id}`}
                    className="px-4 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-[3px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Configure / Provide Food Menu</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {currentPkg.foodMenu.map((day, mdIdx) => (
                  <div
                    key={day.dayNumber || day.day || mdIdx + 1}
                    className="bg-white border border-amber-200/80 rounded-[4px] p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-amber-600" />
                        <h4 className="text-sm font-extrabold text-amber-950">
                          Day {day.dayNumber || day.day || mdIdx + 1}: {day.dayTitle || day.title || "Gourmet Dining"}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-amber-700">
                        {((day.meals || day.courses || []).length)} Courses
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {(day.meals || day.courses || []).map((meal, mealIdx) => {
                        const mealItems =
                          meal.items ||
                          (meal.menuItems
                            ? meal.menuItems.split(",").map((s) => s.trim()).filter(Boolean)
                            : []);

                        return (
                          <div
                            key={mealIdx}
                            className="p-4 rounded-[3px] bg-slate-50 border border-slate-200 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                                {meal.name || meal.courseName}
                              </span>
                              {meal.time && (
                                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{meal.time}</span>
                                </span>
                              )}
                            </div>

                            <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs text-slate-700">
                              {mealItems.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2 leading-relaxed">
                                  <span className="text-amber-500 font-black">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
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

        {/* TAB 3: PACKAGE INCLUSIONS & EXCLUSIONS */}
        {activeTab === "inclusions" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Package Inclusions &amp; Exclusions Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete breakdown of services covered in the tariff vs excluded or optional expenses.
                </p>
              </div>

              <Link
                href={`/admin/hotel/packages/editor?id=${encodeURIComponent(currentPkg.id)}`}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Inclusions &amp; Exclusions</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* What's Included */}
              <div className="bg-white p-5 rounded-[4px] border border-emerald-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900">
                      What&apos;s Included (Inclusions)
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                    {currentPkg.inclusions?.length || 0} Items
                  </span>
                </div>

                {(!currentPkg.inclusions || currentPkg.inclusions.length === 0) ? (
                  <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded">
                    No inclusions listed yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentPkg.inclusions.map((inc, incIdx) => (
                      <div
                        key={incIdx}
                        className="flex items-center gap-3 p-3 rounded-[3px] bg-emerald-50/40 border border-emerald-200/80 text-xs font-semibold text-slate-900"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* What's Excluded */}
              <div className="bg-white p-5 rounded-[4px] border border-rose-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900">
                      What&apos;s Excluded (Exclusions)
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[11px]">
                    {currentPkg.exclusions?.length || 0} Items
                  </span>
                </div>

                {(!currentPkg.exclusions || currentPkg.exclusions.length === 0) ? (
                  <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded">
                    No exclusions listed yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentPkg.exclusions.map((exc, excIdx) => (
                      <div
                        key={excIdx}
                        className="flex items-center gap-3 p-3 rounded-[3px] bg-rose-50/40 border border-rose-200/80 text-xs font-semibold text-slate-900"
                      >
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                          <X className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRICING & ROOM UPGRADE RULES */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-[4px] border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span>Room Types &amp; Upgrade Pricing Structure</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs uppercase text-slate-500">
                      Base Room Category
                    </span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-slate-200 text-slate-800 font-extrabold text-[10px]">
                      Included
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    Deluxe Room Stay
                  </h4>
                  <p className="text-xs text-slate-600">
                    Standard air-conditioned luxury resort room included in the package tariff.
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-500">Rate / Adult:</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{currentPkg.pricePerPerson.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-[4px] bg-blue-50/50 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs uppercase text-blue-700">
                      Upgraded Room Category
                    </span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-blue-600 text-white font-extrabold text-[10px]">
                      Premium
                    </span>
                  </div>
                  <h4 className="text-base font-black text-blue-950">
                    Premium Room Stay
                  </h4>
                  <p className="text-xs text-slate-600">
                    Riverfront or poolside premium luxury suite with panoramic delta views.
                  </p>
                  <div className="pt-2 border-t border-blue-200 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-blue-700">Rate / Adult:</span>
                    <span className="text-lg font-black text-blue-950">
                      ₹{(currentPkg.pricePerPerson + (currentPkg.premiumRoomDelta || 0)).toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-semibold text-blue-700">
                        (+₹{(currentPkg.premiumRoomDelta || 0).toLocaleString("en-IN")})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Age Rules & Addons */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[3px]">
                  <span className="text-[10px] font-black uppercase text-emerald-800 block">
                    Kids 0–4 Years
                  </span>
                  <p className="font-extrabold text-emerald-950 text-sm mt-0.5">100% Free</p>
                  <span className="text-[11px] text-emerald-700">Complimentary stay &amp; cruise</span>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-[3px]">
                  <span className="text-[10px] font-black uppercase text-amber-800 block">
                    Kids 4–8 Years
                  </span>
                  <p className="font-extrabold text-amber-950 text-sm mt-0.5">50% Charge</p>
                  <span className="text-[11px] text-amber-700">Half adult package tariff</span>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-[3px]">
                  <span className="text-[10px] font-black uppercase text-blue-800 block">
                    Above 8 Years
                  </span>
                  <p className="font-extrabold text-blue-950 text-sm mt-0.5">Full Charge</p>
                  <span className="text-[11px] text-blue-700">Standard adult tariff applies</span>
                </div>
              </div>

              <div className="p-3 rounded-[3px] bg-slate-50 border border-slate-200/80 text-xs text-amber-800 font-semibold flex items-center gap-2">
                <span>* Notice to guests: Room charges change accordingly to date and season.</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

