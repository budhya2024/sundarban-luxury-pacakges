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
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { useAdmin } from "@/context/AdminContext";

interface ResortPhoto {
  id: string;
  title: string;
  category: "Swimming Pool" | "Riverfront Lawn" | "Dining & Bar" | "Luxury Suites" | "Jetty Deck" | "Resort Lobby";
  imageUrl: string;
  featured: boolean;
}

interface HotelInquiry {
  id: string;
  refId: string;
  guestName: string;
  phone: string;
  email: string;
  roomName: string;
  roomCode: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: string;
  roomsCount: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: "Paid" | "Partial" | "Pending";
  status: "Confirmed" | "Pending" | "Checked In" | "Completed" | "Cancelled";
  date: string;
  specialRequests?: string;
}

const initialResortPhotos: ResortPhoto[] = [
  {
    id: "ph-1",
    title: "Infinity Pool overlooking Delta Waterways",
    category: "Swimming Pool",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "ph-2",
    title: "Executive River View Master Suite Bed",
    category: "Luxury Suites",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "ph-3",
    title: "Sunset Dining Lawn & Bonfire Pavilion",
    category: "Riverfront Lawn",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "ph-4",
    title: "Private Boat Boarding Jetty at Dusk",
    category: "Jetty Deck",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "ph-5",
    title: "Royal Sonar Multi-Cuisine Dining Restaurant",
    category: "Dining & Bar",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "ph-6",
    title: "Grand Italian Marble Reception & Lounge",
    category: "Resort Lobby",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
];

const initialHotelInquiries: HotelInquiry[] = [
  {
    id: "h-inq-1",
    refId: "HSB-2026-8810",
    guestName: "Ananya Roy",
    phone: "+91 98301 24567",
    email: "ananya.roy@example.com",
    roomName: "Executive River View Suite",
    roomCode: "HSB-EX-RIVER",
    checkIn: "Sep 20, 2026",
    checkOut: "Sep 22, 2026",
    nights: 2,
    guestsCount: "2 Adults, 1 Child",
    roomsCount: 1,
    totalAmount: 15998,
    paidAmount: 15998,
    paymentStatus: "Paid",
    status: "Confirmed",
    date: "Sep 13, 2026",
    specialRequests: "River facing upper floor requested with extra buffet breakfast.",
  },
  {
    id: "h-inq-2",
    refId: "HSB-2026-8811",
    guestName: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@example.com",
    roomName: "Luxury Family Deluxe Cottage",
    roomCode: "HSB-FAM-LUX",
    checkIn: "Sep 25, 2026",
    checkOut: "Sep 27, 2026",
    nights: 2,
    guestsCount: "4 Adults, 2 Children",
    roomsCount: 2,
    totalAmount: 23996,
    paidAmount: 10000,
    paymentStatus: "Partial",
    status: "Pending",
    date: "Sep 12, 2026",
    specialRequests: "Need adjacent inter-connected rooms near swimming pool lawn.",
  },
  {
    id: "h-inq-3",
    refId: "HSB-2026-8812",
    guestName: "Dr. Sourav Banerjee",
    phone: "+91 94330 98765",
    email: "sourav.banerjee@example.com",
    roomName: "Premium Mangrove View Room",
    roomCode: "HSB-PREM-MAN",
    checkIn: "Sep 18, 2026",
    checkOut: "Sep 19, 2026",
    nights: 1,
    guestsCount: "2 Adults",
    roomsCount: 1,
    totalAmount: 5999,
    paidAmount: 5999,
    paymentStatus: "Paid",
    status: "Checked In",
    date: "Sep 11, 2026",
    specialRequests: "Early check-in at 10 AM requested.",
  },
  {
    id: "h-inq-4",
    refId: "HSB-2026-8813",
    guestName: "Priyanka Sharma",
    phone: "+91 97178 54321",
    email: "priyanka.s@example.com",
    roomName: "Royal Heritage Presidential Suite",
    roomCode: "HSB-ROYAL-PRES",
    checkIn: "Oct 02, 2026",
    checkOut: "Oct 05, 2026",
    nights: 3,
    guestsCount: "2 Adults",
    roomsCount: 1,
    totalAmount: 38997,
    paidAmount: 0,
    paymentStatus: "Pending",
    status: "Pending",
    date: "Sep 10, 2026",
    specialRequests: "Honeymoon decoration package with private candlelight dinner on jetty deck.",
  },
  {
    id: "h-inq-5",
    refId: "HSB-2026-8814",
    guestName: "Amitabh Sen",
    phone: "+91 98310 11223",
    email: "amitabh.sen@example.com",
    roomName: "Executive River View Suite",
    roomCode: "HSB-EX-RIVER",
    checkIn: "Sep 05, 2026",
    checkOut: "Sep 07, 2026",
    nights: 2,
    guestsCount: "2 Adults",
    roomsCount: 1,
    totalAmount: 15998,
    paidAmount: 15998,
    paymentStatus: "Paid",
    status: "Completed",
    date: "Sep 01, 2026",
    specialRequests: "Airport AC vehicle transfer service arranged.",
  },
];

export default function AdminHotelPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"photos" | "inquiries">("photos");

  // Photos state
  const [resortPhotos, setResortPhotos] = useState<ResortPhoto[]>(initialResortPhotos);
  const [addPhotoModalOpen, setAddPhotoModalOpen] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<ResortPhoto["category"]>("Swimming Pool");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // Inquiries state
  const [hotelInquiries, setHotelInquiries] = useState<HotelInquiry[]>(initialHotelInquiries);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<HotelInquiry | null>(null);



  const { showToast, updateBookingStatus, deleteBooking, refreshBookings } = useAdmin();

  // Synchronize live data from Neon backend
  useEffect(() => {
    fetch("/api/admin/hotel/photos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.photos) && data.photos.length > 0) {
          setResortPhotos(data.photos);
        }
      })
      .catch(() => {});

    const fetchInquiries = () => {
      fetch("/api/admin/hotel/inquiries")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
            setHotelInquiries(data.inquiries);
          }
        })
        .catch(() => {});
    };

    fetchInquiries();
    const interval = setInterval(fetchInquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  // Photo Handlers
  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;

    try {
      const res = await fetch("/api/admin/hotel/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPhotoTitle.trim(),
          category: newPhotoCategory,
          imageUrl: newPhotoUrl.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.photo) {
        setResortPhotos((prev) => [data.photo, ...prev]);
        showToast("Uploaded new resort photo successfully!");
      } else {
        showToast(data?.error || "Failed to upload photo");
      }
    } catch (err) {
      console.error("Error creating photo:", err);
      const newPhoto: ResortPhoto = {
        id: `ph-${Date.now()}`,
        title: newPhotoTitle,
        category: newPhotoCategory,
        imageUrl: newPhotoUrl,
        featured: false,
      };
      setResortPhotos([newPhoto, ...resortPhotos]);
      showToast("Uploaded photo locally.");
    }

    setNewPhotoTitle("");
    setNewPhotoUrl("");
    setAddPhotoModalOpen(false);
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm("Are you sure you want to remove this photo?")) {
      setResortPhotos((prev) => prev.filter((p) => p.id !== id));
      try {
        const res = await fetch(`/api/admin/hotel/photos/${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          showToast("Removed resort photo.");
        } else {
          showToast(data?.error || "Failed to remove photo on server.");
        }
      } catch (err) {
        console.error("Error deleting photo:", err);
        showToast("Removed photo locally.");
      }
    }
  };

  // Inquiry Status Handler
  const handleToggleInquiryStatus = async (id: string, nextStatus: HotelInquiry["status"]) => {
    setHotelInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: nextStatus } : inq))
    );

    // Immediately update unified bookings in context so notification bell clears instantly
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
    if (confirm(`Delete inquiry #${refId}?`)) {
      setHotelInquiries((prev) => prev.filter((inq) => inq.id !== id));
      // Immediately delete from unified bookings in context
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
        title="Hotel Sonar Bangla Resort Showcase &amp; Inquiries"
        subtitle="Manage resort photo gallery showcase and guest booking inquiries"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">


        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 ${activeTab === "photos"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-200/60"
              }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Resort Photo Gallery ({resortPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-2 ${activeTab === "inquiries"
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

        {/* TAB 1: RESORT PHOTO GALLERY */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-[4px] border border-slate-200">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Resort Photos &amp; Facility Showcase</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-resolution photo gallery for swimming pool, riverfront lawn, dining, and jetty.
                </p>
              </div>

              <button
                onClick={() => setAddPhotoModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {resortPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white border border-slate-200 rounded-[4px] shadow-2xs overflow-hidden group hover:shadow-xs transition-all"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={photo.imageUrl.startsWith("data:")}
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[2px] bg-slate-900/90 text-white font-bold text-[10px]">
                      {photo.category}
                    </span>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-md opacity-80 group-hover:opacity-100"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3.5">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {photo.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1 truncate">
                      {photo.imageUrl}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HOTEL BOOKING INQUIRIES FETCH TABLE */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Inquiries</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">{hotelInquiries.length}</div>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Action</div>
                <div className="text-xl font-bold text-amber-600 mt-0.5">
                  {hotelInquiries.filter((i) => i.status === "Pending").length}
                </div>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Confirmed Bookings</div>
                <div className="text-xl font-bold text-emerald-600 mt-0.5">
                  {hotelInquiries.filter((i) => i.status === "Confirmed" || i.status === "Checked In").length}
                </div>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-[4px] shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</div>
                <div className="text-xl font-bold text-blue-600 mt-0.5">
                  ₹{hotelInquiries.reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded-[4px] border border-slate-200 shadow-2xs">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Guest Name, Phone, Ref ID, Room..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs w-full md:w-auto">
                <span className="font-semibold text-slate-500">Status:</span>
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-[3px] bg-white font-medium focus:outline-hidden focus:border-blue-600"
                >
                  <option value="all">All Inquiries</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <th className="py-3 px-4 whitespace-nowrap">Sl. No.</th>
                      <th className="py-3 px-4">Guest Details</th>
                      <th className="py-3 px-4">Room Category</th>
                      <th className="py-3 px-4">Check-In / Out</th>
                      <th className="py-3 px-4">Guests</th>
                      <th className="py-3 px-4">Total Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                          <p className="font-semibold">No hotel booking inquiries found matching filters.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq, index) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-slate-900 text-xs">
                            #{index + 1}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-xs">{inq.guestName}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-0.5"><Phone className="w-2.5 h-2.5 text-slate-400" /> {inq.phone}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {inq.roomName}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="text-slate-900 font-bold text-[11px]">{inq.checkIn}</div>
                            <div className="text-[10px] text-slate-500">to {inq.checkOut} ({inq.nights}N)</div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {inq.guestsCount}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-extrabold text-slate-900">₹{inq.totalAmount.toLocaleString()}</div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${inq.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : inq.status === "Checked In"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : inq.status === "Pending"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : inq.status === "Completed"
                                      ? "bg-slate-100 text-slate-700 border border-slate-200"
                                      : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {inq.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              View Details
                            </button>
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

      {/* Add Resort Photo Modal */}
      {addPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Upload Resort Photo</span>
              </h3>
              <button
                onClick={() => setAddPhotoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riverfront Swimming Pool Sunset"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Facility Category *
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as ResortPhoto["category"])}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 bg-white"
                >
                  <option value="Swimming Pool">Swimming Pool</option>
                  <option value="Riverfront Lawn">Riverfront Lawn</option>
                  <option value="Dining & Bar">Dining & Bar</option>
                  <option value="Luxury Suites">Luxury Suites</option>
                  <option value="Jetty Deck">Jetty Deck</option>
                  <option value="Resort Lobby">Resort Lobby</option>
                </select>
              </div>

              <ImageUploadDropzone
                value={newPhotoUrl}
                onChange={setNewPhotoUrl}
                label="Resort Photo *"
                helperText="Drag & drop your resort photo or choose a local file"
              />

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddPhotoModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-[3px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs"
                >
                  Save &amp; Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inquiry Detail Right-Side Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop click to dismiss */}
          <div className="fixed inset-0" onClick={() => setSelectedInquiry(null)} />

          {/* Right-Side Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 text-slate-800 text-xs border-l border-slate-200">
            {/* Top Header with Clean White Background */}
            <div className="px-6 py-4.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-tight text-slate-900">
                    Hotel Booking Details
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      selectedInquiry.status === "Confirmed"
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

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Guest Details Card */}
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

              {/* Room & Stay Details Card */}
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
                      Guests &amp; Rooms
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

              {/* Special Guest Custom Notes if present */}
              {selectedInquiry.specialRequests && (
                <div className="p-3 rounded-sm bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
                  <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-800 mb-0.5">
                    Special Guest Note / Request
                  </span>
                  <p className="leading-relaxed">{selectedInquiry.specialRequests}</p>
                </div>
              )}

              {/* Status Update Selector */}
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
                          className={`py-2 px-0.5 rounded-sm text-[10px] font-bold text-center transition-all cursor-pointer border ${
                            isActive
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

            {/* Drawer Footer Actions */}
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
