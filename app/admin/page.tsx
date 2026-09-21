"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  CalendarCheck,
  Building2,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowRight,
  Phone,
  Mail,
  Search,
  Check,
  Filter,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { useAdmin } from "@/context/AdminContext";
import { BookingDetailModal } from "@/components/admin/BookingDetailModal";
import { AdminBooking } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState<"all" | "confirmed" | "pending" | "paid" | "resort">("all");

  const { bookings, packages, rooms, inquiries, blogPostsList } = useAdmin();

  // Compute live overview metrics from real database data
  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.paymentStatus === "Paid" || b.paymentStatus === "Partial")
      .reduce((acc, b) => acc + (b.paidAmount || 0), 0);
  }, [bookings]);

  const totalGrossAmount = useMemo(() => {
    return bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  }, [bookings]);

  const pendingBalance = Math.max(0, totalGrossAmount - totalRevenue);
  const collectionRate = totalGrossAmount > 0 ? Math.round((totalRevenue / totalGrossAmount) * 100) : 100;

  const pendingCount = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const completedCount = bookings.filter((b) => b.bookingStatus === "Completed").length;

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const convertedInquiriesCount = inquiries.filter((i) => i.status === "Converted").length;

  const totalRoomCapacity = rooms.reduce((acc, r) => acc + (r.totalRooms || 0), 0);
  const totalAvailableRooms = rooms.reduce((acc, r) => acc + (r.availableRooms || 0), 0);
  const occupancyPercent = totalRoomCapacity
    ? Math.round(((totalRoomCapacity - totalAvailableRooms) / totalRoomCapacity) * 100)
    : 0;

  const totalGuestsServiced = bookings.reduce((acc, b) => acc + (b.guestsCount || 1), 0);

  // Filtered recent bookings based on search & active filter
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = bookingSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (b.bookingCode || "").toLowerCase().includes(q) ||
        (b.guestName || "").toLowerCase().includes(q) ||
        (b.phone || "").toLowerCase().includes(q) ||
        (b.packageOrRoom || "").toLowerCase().includes(q);

      let matchesFilter = true;
      if (bookingFilter === "confirmed") matchesFilter = b.bookingStatus === "Confirmed";
      else if (bookingFilter === "pending") matchesFilter = b.bookingStatus === "Pending";
      else if (bookingFilter === "paid") matchesFilter = b.paymentStatus === "Paid";
      else if (bookingFilter === "resort") matchesFilter = b.type === "Hotel Resort";

      return matchesSearch && matchesFilter;
    });
  }, [bookings, bookingSearch, bookingFilter]);

  const recentBookings = filteredBookings.slice(0, 6);

  const formattedRevenue =
    totalRevenue >= 100000
      ? `₹${(totalRevenue / 100000).toFixed(2)} L`
      : `₹${totalRevenue.toLocaleString()}`;

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Operations Command Center"
        subtitle="Sundarban Luxury Expeditions &amp; Hotel Sonar Bangla Live Dashboard"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Collected Revenue"
            value={formattedRevenue}
            change={`+${collectionRate}% Collected`}
            isPositive={true}
            subtext={
              pendingBalance > 0
                ? `₹${pendingBalance.toLocaleString()} pending`
                : "All balances cleared"
            }
            icon={DollarSign}
            iconBg="bg-blue-50"
            iconColor="text-blue-700"
          />
          <StatCard
            title="Active Bookings"
            value={`${bookings.length} Bookings`}
            change={`${pendingCount} Pending`}
            isPositive={pendingCount === 0}
            subtext={`${confirmedCount} Confirmed • ${completedCount} Completed`}
            icon={CalendarCheck}
            iconBg="bg-amber-50"
            iconColor="text-[#d97706]"
          />
          <StatCard
            title="Hotel Sonar Bangla"
            value={`${occupancyPercent}% Booked`}
            change={`${totalAvailableRooms} Rooms Free`}
            isPositive={totalAvailableRooms > 0}
            subtext={`${totalRoomCapacity} Total Suite Capacity`}
            icon={Building2}
            iconBg="bg-blue-50"
            iconColor="text-blue-700"
          />
          <StatCard
            title="Customer Leads"
            value={`${inquiries.length} Inquiries`}
            change={`${newInquiriesCount} Awaiting`}
            isPositive={newInquiriesCount === 0}
            subtext={`${convertedInquiriesCount} Converted to Tours`}
            icon={Users}
            iconBg="bg-purple-50"
            iconColor="text-purple-700"
          />
        </div>

        {/* Operational Modules Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-[4px] border border-slate-200 shadow-2xs">
          <Link
            href="/admin/packages"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                Tour Packages
              </div>
              <div className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                {packages.length} Safaris Active
              </div>
            </div>
          </Link>

          <Link
            href="/admin/hotel"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                Resort Suites
              </div>
              <div className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                {rooms.length} Suite Types
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                Travelers Served
              </div>
              <div className="text-sm font-extrabold text-slate-900 truncate">
                {totalGuestsServiced} Guests
              </div>
            </div>
          </div>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                Wild Stories
              </div>
              <div className="text-sm font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                {blogPostsList.length} Published
              </div>
            </div>
          </Link>
        </div>

        {/* Main Grid: Revenue Chart (8 cols) & Live Inquiries Feed (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Revenue Chart */}
          <div className="lg:col-span-8">
            <RevenueChart />
          </div>

          {/* New Inquiries Stream */}
          <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Recent Inquiries
                </h3>
                <p className="text-[11px] text-slate-500">
                  Customer leads awaiting reply
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <p className="text-slate-400 text-center py-6 text-xs">
                  No customer inquiries received yet.
                </p>
              ) : (
                inquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3 rounded-[3px] bg-slate-50 border border-slate-200/60 space-y-1.5 hover:bg-slate-100/70 transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">
                        {inq.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {inq.source}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                      {inq.subject || inq.message}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <a
                        href={`tel:${inq.phone}`}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        {inq.phone}
                      </a>
                      <span
                        className={`px-1.5 py-0.2 rounded-[2px] font-bold text-[10px] ${
                          inq.status === "New"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : inq.status === "In Progress" || inq.status === "Contacted"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : inq.status === "Converted"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Recent Bookings &amp; Safari Departures
              </h3>
              <p className="text-[11px] text-slate-500">
                Latest transactions across tour packages &amp; resort reservations ({filteredBookings.length} matching)
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search & Status Quick Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="Search guest, code, package, phone..."
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-[3px] focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setBookingFilter("all")}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-[3px] transition-colors whitespace-nowrap ${
                  bookingFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setBookingFilter("confirmed")}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-[3px] transition-colors whitespace-nowrap ${
                  bookingFilter === "confirmed"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Confirmed ({confirmedCount})
              </button>
              <button
                onClick={() => setBookingFilter("pending")}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-[3px] transition-colors whitespace-nowrap ${
                  bookingFilter === "pending"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setBookingFilter("paid")}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-[3px] transition-colors whitespace-nowrap ${
                  bookingFilter === "paid"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Paid ({bookings.filter((b) => b.paymentStatus === "Paid").length})
              </button>
              <button
                onClick={() => setBookingFilter("resort")}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-[3px] transition-colors whitespace-nowrap ${
                  bookingFilter === "resort"
                    ? "bg-blue-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Resort ({bookings.filter((b) => b.type === "Hotel Resort").length})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Booking Code</th>
                  <th className="py-2.5 px-3">Guest Name</th>
                  <th className="py-2.5 px-3">Package / Room</th>
                  <th className="py-2.5 px-3">Travel Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      <p className="text-xs font-semibold">
                        No reservations found matching your criteria.
                      </p>
                      {(bookingSearch || bookingFilter !== "all") && (
                        <button
                          onClick={() => {
                            setBookingSearch("");
                            setBookingFilter("all");
                          }}
                          className="mt-2 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          Reset filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {b.bookingCode}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        <div>{b.guestName}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {b.phone}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 max-w-[200px] truncate">
                        {b.packageOrRoom}
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {b.travelDate}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        ₹{b.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${
                            b.paymentStatus === "Paid"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : b.paymentStatus === "Partial"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${
                            b.bookingStatus === "Confirmed"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : b.bookingStatus === "Pending"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : b.bookingStatus === "Completed"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1 rounded-[3px] bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Booking Inspection Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
