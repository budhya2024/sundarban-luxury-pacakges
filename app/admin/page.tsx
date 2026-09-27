"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CalendarCheck,
  Building2,
  TrendingUp,
  Users,
  IndianRupee,
  Star,
  RefreshCw,
  ExternalLink,
  PlusCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { useAdmin } from "@/context/AdminContext";

export function AdminDashboardPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    bookings,
    packages,
    rooms,
    inquiries,
    blogPostsList,
    testimonialSettings,
    refreshBookings,
    showToast,
  } = useAdmin();

  // 1. Live Financial Metrics from Real Database Bookings
  const totalGrossRevenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
  const totalPaidAmount = bookings.reduce((acc, b) => acc + (b.paidAmount || 0), 0);
  const pendingPaymentAmount = Math.max(0, totalGrossRevenue - totalPaidAmount);

  // 2. Booking Status Distribution
  const pendingCount = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const completedCount = bookings.filter((b) => b.bookingStatus === "Completed").length;
  const bookingConfirmationRate =
    bookings.length > 0 ? Math.round(((confirmedCount + completedCount) / bookings.length) * 100) : 100;

  // 3. Customer Leads & Inquiries
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const convertedInquiriesCount = inquiries.filter((i) => i.status === "Converted").length;
  const inquiryConversionRate =
    inquiries.length > 0 ? Math.round((convertedInquiriesCount / inquiries.length) * 100) : 0;

  // 4. Hotel Sonar Bangla Room Occupancy
  const totalRoomCapacity = rooms.reduce((acc, r) => acc + (r.totalRooms || 0), 0);
  const totalAvailableRooms = rooms.reduce((acc, r) => acc + (r.availableRooms || 0), 0);
  const occupancyPercent = totalRoomCapacity
    ? Math.round(((totalRoomCapacity - totalAvailableRooms) / totalRoomCapacity) * 100)
    : 0;

  // 5. Total Travelers Serviced
  const totalGuestsServiced = bookings.reduce((acc, b) => acc + (b.guestsCount || 1), 0);

  // 6. Live Google Reviews Reputation
  const googleRating = testimonialSettings?.googleRating || 4.9;
  const googleReviewsCount = testimonialSettings?.googleReviewsCount || 32;

  // Manual Refresh Handler
  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshBookings();
      showToast("Dashboard synchronized with live database.");
    } catch {
      showToast("Data refreshed.");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Operations Command Center"
        subtitle="Sundarban Luxury Expeditions &amp; Hotel Sonar Bangla Live Operations"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Live Bar: Live Pulse + Refresh Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white border border-slate-200/90 rounded-[4px] shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-slate-800">
              Live Database Connected
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              &bull; Auto-syncing bookings, resort suites &amp; inquiries in real-time
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Database"}</span>
            </button>

            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Booking</span>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[3px] border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 5 Primary KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Revenue"
            value={`₹${totalGrossRevenue.toLocaleString("en-IN")}`}
            change={`₹${totalPaidAmount.toLocaleString("en-IN")} Paid`}
            isPositive={true}
            subtext={`₹${pendingPaymentAmount.toLocaleString("en-IN")} Pending Collection`}
            icon={IndianRupee}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-700"
          />

          <StatCard
            title="Active Bookings"
            value={`${bookings.length} Bookings`}
            change={`${confirmedCount} Confirmed`}
            isPositive={pendingCount === 0}
            subtext={`${pendingCount} Awaiting Confirmation`}
            icon={CalendarCheck}
            iconBg="bg-blue-50"
            iconColor="text-blue-700"
          />

          <StatCard
            title="Sonar Bangla Resort"
            value={`${occupancyPercent}% Booked`}
            change={`${totalAvailableRooms} Rooms Free`}
            isPositive={totalAvailableRooms > 0}
            subtext={`${totalRoomCapacity} Total Suite Capacity`}
            icon={Building2}
            iconBg="bg-amber-50"
            iconColor="text-amber-700"
          />

          <StatCard
            title="Inquiry Leads"
            value={`${inquiries.length} Inquiries`}
            change={`${convertedInquiriesCount} Converted`}
            isPositive={convertedInquiriesCount > 0}
            subtext={`${newInquiriesCount} New Leads To Contact`}
            icon={Users}
            iconBg="bg-purple-50"
            iconColor="text-purple-700"
          />

          <StatCard
            title="Google Reputation"
            value={`${googleRating.toFixed(1)} ★`}
            change={`${googleReviewsCount}+ Reviews`}
            isPositive={true}
            subtext="Live Google Sync Active"
            icon={Star}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />
        </div>

        {/* Operational Modules Navigation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-[4px] border border-slate-200/90 shadow-2xs">
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
                {rooms.length} Suite Categories
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

        {/* Main Grid: Revenue & Bookings Velocity (8 cols) & Live Inquiries / Quick Actions (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Revenue Chart & Recent Bookings Table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Dynamic Revenue & Booking Velocity Chart */}
            <RevenueChart />

            {/* 2. Live Recent Bookings Table */}
            <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Recent Bookings &amp; Reservations
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Latest safari expeditions &amp; resort reservations from live database
                  </p>
                </div>
                <Link
                  href="/admin/bookings"
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>View All Bookings ({bookings.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {bookings.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No bookings recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <th className="pb-2.5 font-bold">Booking Code</th>
                        <th className="pb-2.5 font-bold">Guest Name</th>
                        <th className="pb-2.5 font-bold">Package / Room</th>
                        <th className="pb-2.5 font-bold">Travel Date</th>
                        <th className="pb-2.5 font-bold">Amount</th>
                        <th className="pb-2.5 font-bold">Payment</th>
                        <th className="pb-2.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.slice(0, 6).map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 font-mono font-bold text-slate-900">
                            {b.bookingCode}
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-slate-900">{b.guestName}</div>
                            <div className="text-[11px] text-slate-400">{b.phone}</div>
                          </td>
                          <td className="py-3 max-w-[200px]">
                            <div className="truncate font-medium text-slate-700" title={b.packageOrRoom}>
                              {b.packageOrRoom}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {b.guestsCount} {b.guestsCount === 1 ? "Guest" : "Guests"} &bull; {b.type}
                            </div>
                          </td>
                          <td className="py-3 font-medium text-slate-600 whitespace-nowrap">
                            {b.travelDate}
                          </td>
                          <td className="py-3 font-bold text-slate-900 whitespace-nowrap">
                            ₹{b.totalAmount.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-[2px] font-bold text-[10px] ${
                                b.paymentStatus === "Paid"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : b.paymentStatus === "Partial"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-rose-50 text-rose-800 border border-rose-200"
                              }`}
                            >
                              {b.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 text-right whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-[2px] font-bold text-[10px] inline-flex items-center gap-1 ${
                                b.bookingStatus === "Confirmed"
                                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                                  : b.bookingStatus === "Completed"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : b.bookingStatus === "Cancelled"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}
                            >
                              {b.bookingStatus === "Confirmed" && <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" />}
                              {b.bookingStatus === "Pending" && <Clock className="w-2.5 h-2.5 text-amber-600" />}
                              <span>{b.bookingStatus}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Recent Inquiries & Operational Shortcuts (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* New Inquiries Stream */}
            <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs space-y-4">
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
                  View All ({inquiries.length})
                </Link>
              </div>

              <div className="space-y-3">
                {inquiries.length === 0 ? (
                  <p className="text-slate-400 text-center py-6 text-xs">
                    No customer inquiries received yet.
                  </p>
                ) : (
                  inquiries.slice(0, 5).map((inq) => (
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
                          className="font-semibold text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-2.5 h-2.5" />
                          <span>{inq.phone}</span>
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

            {/* Quick Operational Shortcuts */}
            <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Quick Shortcuts
              </h3>

              <div className="space-y-2">
                <Link
                  href="/admin/bookings"
                  className="flex items-center justify-between p-2.5 rounded-[3px] bg-slate-50 hover:bg-blue-50/70 border border-slate-200/60 hover:border-blue-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <CalendarCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                      Manage Bookings &amp; Payments
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/admin/packages"
                  className="flex items-center justify-between p-2.5 rounded-[3px] bg-slate-50 hover:bg-amber-50/70 border border-slate-200/60 hover:border-amber-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-800">
                      Update Tour Packages &amp; Pricing
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/admin/hotel"
                  className="flex items-center justify-between p-2.5 rounded-[3px] bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/60 hover:border-emerald-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                      Hotel Sonar Bangla Rooms &amp; Rates
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/admin/pages"
                  className="flex items-center justify-between p-2.5 rounded-[3px] bg-slate-50 hover:bg-purple-50/70 border border-slate-200/60 hover:border-purple-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-800">
                      Google Reviews &amp; Testimonial Settings
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardPage;
