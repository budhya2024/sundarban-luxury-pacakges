"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Search,
  Image as ImageIcon,
  Phone,
  Calendar,
  X,
  Users,
  Clock,
  User,
  Mail,
  Package,
  Edit3,
  Copy,
  Eye,
  Utensils,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ChevronRight,
  Check,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { useAdmin } from "@/context/AdminContext";
import { useConfirm } from "@/context/ConfirmContext";
import {
  AdminHotelPackage,
  AdminHotelPhoto,
  initialAdminHotelPackages,
} from "@/lib/admin-data";

export interface HotelInquiry {
  id: string;
  refId: string;
  guestName: string;
  phone: string;
  email: string;
  packageName?: string;
  roomName: string;
  roomCode?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: string;
  roomsCount?: number;
  totalAmount: number;
  paidAmount?: number;
  paymentStatus?: "Paid" | "Partial" | "Pending";
  status: "Confirmed" | "Pending" | "Checked In" | "Completed" | "Cancelled";
  date: string;
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminHotelPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"packages" | "photos" | "inquiries">("packages");

  // Packages state
  const [packages, setPackages] = useState<AdminHotelPackage[]>(initialAdminHotelPackages);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [packageSearch, setPackageSearch] = useState("");
  const [packageStatusFilter, setPackageStatusFilter] = useState("all");

  // Photos state
  const [addPhotoModalOpen, setAddPhotoModalOpen] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<string>("Swimming Pool");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // Inquiries state
  const [hotelInquiries, setHotelInquiries] = useState<HotelInquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<HotelInquiry | null>(null);

  const {
    showToast,
    updateBookingStatus,
    deleteBooking,
    refreshBookings,
    hotelPhotos,
    addHotelPhoto,
    deleteHotelPhoto,
    refreshHotelPhotos,
  } = useAdmin();
  const { confirmDelete } = useConfirm();

  // Fetch packages from Neon Postgres backend
  const fetchPackages = async () => {
    setIsLoadingPackages(true);
    try {
      const res = await fetch("/api/admin/hotel/packages");
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.packages) && data.packages.length > 0) {
          setPackages(data.packages);
        }
      }
    } catch (err) {
      console.error("Failed to fetch packages:", err);
    } finally {
      setIsLoadingPackages(false);
    }
  };

  // Synchronize live data from Neon backend
  useEffect(() => {
    fetchPackages();
    refreshHotelPhotos();

    const fetchInquiries = () => {
      fetch("/api/admin/hotel/inquiries")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && Array.isArray(data.inquiries)) {
            setHotelInquiries(data.inquiries);
          }
        })
        .catch((err) => console.error("Error fetching inquiries:", err))
        .finally(() => setIsLoadingInquiries(false));
    };

    fetchInquiries();
    const interval = setInterval(fetchInquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  // Package Handlers
  const handleDeletePackage = async (pkg: AdminHotelPackage) => {
    if (await confirmDelete(pkg.name, `Are you sure you want to delete "${pkg.name}"? This will remove its day-by-day itinerary and food menu.`)) {
      try {
        const res = await fetch(`/api/admin/hotel/packages/${encodeURIComponent(pkg.id)}`, {
          method: "DELETE",
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          showToast(`Deleted package "${pkg.name}"`);
          setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
        } else {
          showToast(data?.error || "Failed to delete package");
        }
      } catch (err) {
        console.error("Failed to delete package:", err);
        showToast("Error deleting package");
      }
    }
  };

  const handleTogglePackageStatus = async (pkg: AdminHotelPackage) => {
    const nextStatus = pkg.status === "Active" ? "Draft" : "Active";
    setPackages((prev) =>
      prev.map((p) => (p.id === pkg.id ? { ...p, status: nextStatus } : p))
    );
    try {
      const res = await fetch(`/api/admin/hotel/packages/${encodeURIComponent(pkg.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(`Package status changed to ${nextStatus}`);
      } else {
        showToast(data?.error || "Failed to update status on server");
        fetchPackages();
      }
    } catch {
      showToast("Error updating status");
      fetchPackages();
    }
  };

  const handleDuplicatePackage = async (pkg: AdminHotelPackage) => {
    try {
      const duplicatedData = {
        ...pkg,
        id: undefined,
        name: `${pkg.name} (Copy)`,
        status: "Draft" as const,
      };
      const res = await fetch("/api/admin/hotel/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatedData),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(`Package duplicated as "${pkg.name} (Copy)"`);
        await fetchPackages();
      } else {
        showToast(data?.error || "Failed to duplicate package");
      }
    } catch {
      showToast("Failed to duplicate package");
    }
  };

  // Photo Handlers
  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;

    await addHotelPhoto({
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      imageUrl: newPhotoUrl.trim(),
    });

    setNewPhotoTitle("");
    setNewPhotoUrl("");
    setAddPhotoModalOpen(false);
  };

  const handleDeletePhoto = async (id: string) => {
    if (await confirmDelete("Resort Photo", "Are you sure you want to remove this photo?")) {
      await deleteHotelPhoto(id);
    }
  };

  // Inquiry Status Handler
  const handleToggleInquiryStatus = async (id: string, nextStatus: HotelInquiry["status"]) => {
    setHotelInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: nextStatus } : inq))
    );

    const mappedBookingStatus =
      nextStatus === "Checked In" ? "Confirmed" : nextStatus;
    updateBookingStatus(`b-${id}`, mappedBookingStatus);

    try {
      const res = await fetch(`/api/admin/hotel/inquiries/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(`Updated booking inquiry status to ${nextStatus}`);
        refreshBookings?.();
      } else {
        showToast(data?.error || "Failed to update inquiry status.");
      }
    } catch (err) {
      console.error("Failed to update inquiry:", err);
      showToast(`Updated status locally to ${nextStatus}`);
    }
  };

  const handleDeleteInquiry = async (id: string, refId: string) => {
    if (await confirmDelete(`Inquiry #${refId}`, `Delete inquiry #${refId}?`)) {
      setHotelInquiries((prev) => prev.filter((inq) => inq.id !== id));
      deleteBooking(`b-${id}`);

      try {
        const res = await fetch(`/api/admin/hotel/inquiries/${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          showToast(`Deleted inquiry #${refId}`);
          refreshBookings?.();
        } else {
          showToast(data?.error || "Failed to delete inquiry on server.");
        }
      } catch (err) {
        console.error("Failed to delete inquiry:", err);
        showToast(`Deleted inquiry #${refId} locally`);
      }
    }
  };

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) ||
      pkg.duration.toLowerCase().includes(packageSearch.toLowerCase()) ||
      (pkg.highlight || "").toLowerCase().includes(packageSearch.toLowerCase());
    const matchesStatus =
      packageStatusFilter === "all" ||
      pkg.status.toLowerCase() === packageStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = hotelInquiries.filter((inq) => {
    const matchesSearch =
      inq.guestName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.refId.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.roomName.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus =
      inquiryStatusFilter === "all" || inq.status.toLowerCase() === inquiryStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Hotel Sonar Bangla Resort Showcase & Inquiries"
        subtitle="Manage resort tour packages, day-by-day itineraries, meal menus, photo gallery, and booking inquiries"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-4 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "packages"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <Package className="w-4 h-4" />
            <span>Tour Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "photos"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Resort Photo Gallery ({hotelPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === "inquiries"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Booking Inquiries ({hotelInquiries.length})</span>
            {hotelInquiries.filter((i) => i.status === "Pending").length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px] flex items-center justify-center">
                {hotelInquiries.filter((i) => i.status === "Pending").length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 0: TOUR PACKAGES */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            {/* Header Control Box */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-[4px] border border-slate-200 shadow-2xs">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>Hotel Sonar Bangla Tour Packages</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure stay durations, Deluxe rates, Premium room upgrade deltas, detailed day-by-day itineraries and full food menu meals.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/admin/hotel/packages/editor"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Tour Package</span>
                </Link>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-[4px] border border-slate-200">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search packages by name or highlights..."
                  value={packageSearch}
                  onChange={(e) => setPackageSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[3px] border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={packageStatusFilter}
                  onChange={(e) => setPackageStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-[3px] border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">All Packages ({packages.length})</option>
                  <option value="active">Active Only</option>
                  <option value="draft">Draft Only</option>
                </select>
              </div>
            </div>

            {/* Packages Grid */}
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-[4px] p-6">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700">No Tour Packages Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  {packageSearch
                    ? "No packages match your search filter."
                    : "Create your first hotel tour package with complete itinerary and food menu."}
                </p>
                <Link
                  href="/admin/hotel/packages/editor"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Package</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredPackages.map((pkg) => {
                  const totalActivities = (pkg.itinerary || []).reduce(
                    (acc, day) => acc + (day.activities?.length || 0),
                    0
                  );
                  const totalMealCourses = (pkg.foodMenu || []).reduce(
                    (acc, day) => acc + ((day.meals || day.courses || []).length),
                    0
                  );

                  return (
                    <div
                      key={pkg.id}
                      className="bg-white border border-slate-200 rounded-[4px] shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between"
                    >
                      {/* Package Card Top */}
                      <div className="p-5 border-b border-slate-100">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">


                              {pkg.popular && (
                                <span className="px-2 py-0.5 rounded-[2px] font-black text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                                  ★ Most Popular
                                </span>
                              )}


                            </div>

                            <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                              {pkg.name}
                            </h4>
                          </div>
                        </div>

                        {pkg.highlight && (
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                            {pkg.highlight}
                          </p>
                        )}

                        {/* Pricing Grid */}
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                          <div className="p-2.5 rounded-[3px] bg-slate-50 border border-slate-200/70">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Deluxe Room (Base)
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-base font-black text-slate-900">
                                ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-slate-500 font-semibold">/person</span>
                              {pkg.originalPrice && pkg.originalPrice > pkg.pricePerPerson && (
                                <span className="text-[11px] text-slate-400 line-through">
                                  ₹{pkg.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-[3px] bg-blue-50/50 border border-blue-100">
                            <span className="text-[10px] uppercase font-bold text-blue-600 block tracking-wider">
                              Premium Room Upgrade
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-base font-black text-blue-900">
                                +₹{(pkg.premiumRoomDelta || 0).toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-blue-700 font-semibold">/person</span>
                            </div>
                          </div>
                        </div>

                        {/* Details Badges */}
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span>
                              <strong className="text-slate-900 font-bold">{pkg.itinerary?.length || 0}</strong> Days Itinerary ({totalActivities} activities)
                            </span>
                          </div>

                          <span className="text-slate-300">•</span>

                          <div className="flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5 text-amber-600" />
                            <span>
                              {pkg.foodMenu && pkg.foodMenu.length > 0 ? (
                                <>
                                  <strong className="text-slate-900 font-bold">{pkg.foodMenu.length}</strong> Days Food Menu ({totalMealCourses} courses)
                                </>
                              ) : (
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded border border-amber-200">
                                  Menu: Contact Operator
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Package Card Actions Footer */}
                      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 flex-wrap">
                        <Link
                          href={`/admin/hotel/packages/${encodeURIComponent(pkg.id)}`}
                          className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>View Details</span>
                        </Link>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleTogglePackageStatus(pkg)}
                            title={`Switch to ${pkg.status === "Active" ? "Draft" : "Active"}`}
                            className={`px-2.5 py-1.5 text-xs font-bold rounded-[3px] border transition-colors cursor-pointer ${pkg.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                              }`}
                          >
                            {pkg.status === "Active" ? "Active" : "Draft"}
                          </button>



                          <Link
                            href={`/admin/hotel/packages/editor?id=${encodeURIComponent(pkg.id)}`}
                            title="Edit package, itinerary & meals"
                            className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeletePackage(pkg)}
                            title="Delete package"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[3px] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 1: RESORT PHOTO GALLERY */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-[4px] border border-slate-200 shadow-2xs">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Resort Photos & Facility Showcase</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-resolution photo gallery for swimming pool, riverfront lawn, dining, and jetty.
                </p>
              </div>

              <button
                onClick={() => setAddPhotoModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            {hotelPhotos.length === 0 ? (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-[4px] p-6">
                <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700">No Resort Photos Added Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Upload high-definition photos of Hotel Sonar Bangla rooms, pool, dining, and lawn to showcase them on the website.
                </p>
                <button
                  onClick={() => setAddPhotoModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload First Photo</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hotelPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white border border-slate-200 rounded-[4px] shadow-2xs overflow-hidden group hover:shadow-xs transition-all"
                  >
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={photo.imageUrl && photo.imageUrl.trim() ? photo.imageUrl : "/assets/images/sonarbanglahotel.jpg"}
                        alt={photo.title || "Resort Photo"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized={Boolean(photo.imageUrl?.startsWith("data:"))}
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[2px] bg-slate-900/90 text-white font-bold text-[10px]">
                        {photo.category}
                      </span>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-md opacity-80 group-hover:opacity-100 cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-slate-900 text-xs truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Gallery Item
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GUEST INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-[4px] border border-slate-200 shadow-2xs">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Resort & Tour Booking Inquiries</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Guest inquiries submitted through the Hotel Sonar Bangla Luxury booking form.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-700">
                  Total {hotelInquiries.length} Inquiries
                </span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-[4px] border border-slate-200">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search guest name, phone, room..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[3px] border border-slate-300 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-[3px] border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">All Inquiries ({hotelInquiries.length})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Guest Info</th>
                      <th className="py-3 px-4">Room & Stay</th>
                      <th className="py-3 px-4">Guests</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingInquiries && hotelInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          Loading guest inquiries...
                        </td>
                      </tr>
                    ) : filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No inquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          onClick={() => setSelectedInquiry(inq)}
                          className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-blue-600 block">
                              {inq.refId}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {inq.date}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block group-hover:text-blue-700">
                              {inq.guestName}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {inq.phone}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">
                              {inq.roomName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {inq.checkIn} — {inq.checkOut} ({inq.nights}N)
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {inq.guestsCount}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900">
                              ₹{inq.totalAmount.toLocaleString()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleToggleInquiryStatus(inq.id, e.target.value as HotelInquiry["status"])
                              }
                              className={`px-2 py-1 rounded-[2px] font-bold text-[10px] border focus:outline-none cursor-pointer ${inq.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : inq.status === "Checked In"
                                  ? "bg-blue-50 text-blue-700 border-blue-300"
                                  : inq.status === "Pending"
                                    ? "bg-amber-50 text-amber-700 border-amber-300"
                                    : inq.status === "Completed"
                                      ? "bg-slate-100 text-slate-700 border-slate-300"
                                      : "bg-rose-50 text-rose-700 border-rose-300"
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Checked In">Checked In</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="px-2.5 py-1 rounded-[3px] text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id, inq.refId)}
                                className="p-1 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Photo Modal */}
      {addPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[4px] border border-slate-200 shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Upload Resort Showcase Photo</span>
              </h3>
              <button
                onClick={() => setAddPhotoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Photo Title / Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Infinity Pool with Forest View"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-[3px] focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-[3px] focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="Swimming Pool">Swimming Pool</option>
                  <option value="Riverfront Lawn">Riverfront Lawn</option>
                  <option value="Dining & Bar">Dining & Bar</option>
                  <option value="Luxury Suites">Luxury Suites</option>
                  <option value="Jetty Deck">Jetty Deck</option>
                  <option value="Resort Lobby">Resort Lobby</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Resort Image Upload or URL *
                </label>
                <ImageUploadDropzone
                  value={newPhotoUrl}
                  onChange={(url) => setNewPhotoUrl(url)}
                  helperText="Upload photo from device or enter image URL"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddPhotoModalOpen(false)}
                  className="px-3.5 py-1.5 font-bold text-slate-600 hover:bg-slate-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPhotoTitle.trim() || !newPhotoUrl.trim()}
                  className="px-4 py-1.5 font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-[3px] shadow-xs cursor-pointer"
                >
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inquiry Detail Right-Side Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedInquiry(null)} />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 text-slate-800 text-xs border-l border-slate-200">
            <div className="px-6 py-4.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-tight text-slate-900">
                    Hotel Booking Details
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${selectedInquiry.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : selectedInquiry.status === "Checked In"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : selectedInquiry.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : selectedInquiry.status === "Completed"
                            ? "bg-slate-100 text-slate-700 border border-slate-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Booked on {selectedInquiry.date}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200/80 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Primary Guest
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{selectedInquiry.guestName}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/70 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Phone Number
                    </span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{selectedInquiry.phone}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Email Address
                    </span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5 truncate">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{selectedInquiry.email}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-blue-50/40 border border-blue-100 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                    Selected Suite / Room
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                    {selectedInquiry.roomName}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-blue-100 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Stay Dates
                    </span>
                    <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span>{selectedInquiry.checkIn} — {selectedInquiry.checkOut}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Guests & Rooms
                    </span>
                    <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span>{selectedInquiry.guestsCount} ({selectedInquiry.roomsCount} Room)</span>
                    </span>
                  </div>

                  <div className="sm:col-span-2 pt-1 border-t border-blue-100 flex items-center justify-between">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">
                      Total Tariff
                    </span>
                    <span className="font-black text-slate-900 text-sm">
                      ₹{selectedInquiry.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {selectedInquiry.specialRequests && (
                <div className="p-3 rounded-sm bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
                  <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-800 mb-0.5">
                    Special Guest Note / Request
                  </span>
                  <p className="leading-relaxed">{selectedInquiry.specialRequests}</p>
                </div>
              )}

              <div className="space-y-1.5 pt-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Update Booking Status
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {(["Pending", "Confirmed", "Checked In", "Completed", "Cancelled"] as const).map(
                    (st) => {
                      const isActive = selectedInquiry.status === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            handleToggleInquiryStatus(selectedInquiry.id, st);
                            setSelectedInquiry({ ...selectedInquiry, status: st });
                          }}
                          className={`py-2 px-0.5 rounded-sm text-[10px] font-bold text-center transition-all cursor-pointer border ${isActive
                            ? st === "Confirmed" || st === "Checked In"
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : st === "Pending"
                                ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                                : st === "Completed"
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                  : "bg-rose-600 text-white border-rose-600 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                          {st}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="w-full py-2 px-3 rounded-sm border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-100 transition-colors text-center cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
