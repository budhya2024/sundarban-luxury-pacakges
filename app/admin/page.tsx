"use client";

import React, { useState } from "react";
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

  const { bookings, packages, rooms, inquiries } = useAdmin();

  // Compute live overview metrics
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid" || b.paymentStatus === "Partial")
    .reduce((acc, b) => acc + b.paidAmount, 0);

  const pendingCount = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  const totalRoomCapacity = rooms.reduce((acc, r) => acc + r.totalRooms, 0);
  const totalAvailableRooms = rooms.reduce((acc, r) => acc + r.availableRooms, 0);
  const occupancyPercent = totalRoomCapacity
    ? Math.round(((totalRoomCapacity - totalAvailableRooms) / totalRoomCapacity) * 100)
    : 0;

  const recentBookings = bookings.slice(0, 5);

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
            value={`₹${(totalRevenue / 100000).toFixed(2)} L`}
            change="+18.4%"
            isPositive={true}
            subtext="Current booking cycle"
            icon={DollarSign}
            iconBg="bg-blue-50"
            iconColor="text-blue-700"
          />
          <StatCard
            title="Active Bookings"
            value={`${confirmedCount} Tours`}
            change={`${pendingCount} Pending`}
            isPositive={pendingCount === 0}
            subtext="Confirmed reservations"
            icon={CalendarCheck}
            iconBg="bg-amber-50"
            iconColor="text-[#d97706]"
          />
          <StatCard
            title="Hotel Sonar Bangla"
            value={`${occupancyPercent}% Booked`}
            change={`${totalAvailableRooms} Rooms Free`}
            isPositive={totalAvailableRooms > 0}
            subtext={`${totalRoomCapacity} Total Resort Inventory`}
            icon={Building2}
            iconBg="bg-blue-50"
            iconColor="text-blue-700"
          />
          <StatCard
            title="New Customer Leads"
            value={`${newInquiriesCount} Inquiries`}
            change="+6 Today"
            isPositive={true}
            subtext="WhatsApp & Form Requests"
            icon={Users}
            iconBg="bg-purple-50"
            iconColor="text-purple-700"
          />
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
                href="/admin/bookings"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inq) => (
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
                    {inq.subject}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {inq.phone}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded-[2px] font-bold text-[10px] ${inq.status === "New"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : inq.status === "In Progress"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-blue-50 text-blue-700"
                        }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))}
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
                Latest transactions across tour packages &amp; resort reservations
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
                {recentBookings.map((b) => (
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
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${b.paymentStatus === "Paid"
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
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${b.bookingStatus === "Confirmed"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : b.bookingStatus === "Pending"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
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
                ))}
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
