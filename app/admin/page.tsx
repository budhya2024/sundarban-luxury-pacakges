"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CalendarCheck,
  Building2,
  TrendingUp,
  Users,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { useAdmin } from "@/context/AdminContext";

export default function AdminDashboardPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { bookings, packages, rooms, inquiries, blogPostsList } = useAdmin();

  // Compute live overview metrics from real database data
  const pendingCount = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const completedCount = bookings.filter((b) => b.bookingStatus === "Completed").length;

  const bookingConfirmationRate =
    bookings.length > 0 ? Math.round(((confirmedCount + completedCount) / bookings.length) * 100) : 100;

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const convertedInquiriesCount = inquiries.filter((i) => i.status === "Converted").length;
  const inquiryConversionRate =
    inquiries.length > 0 ? Math.round((convertedInquiriesCount / inquiries.length) * 100) : 0;

  const totalRoomCapacity = rooms.reduce((acc, r) => acc + (r.totalRooms || 0), 0);
  const totalAvailableRooms = rooms.reduce((acc, r) => acc + (r.availableRooms || 0), 0);
  const occupancyPercent = totalRoomCapacity
    ? Math.round(((totalRoomCapacity - totalAvailableRooms) / totalRoomCapacity) * 100)
    : 0;

  const totalGuestsServiced = bookings.reduce((acc, b) => acc + (b.guestsCount || 1), 0);

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
            title="Booking Rate"
            value={`${bookingConfirmationRate}%`}
            change={`+${confirmedCount + completedCount} Confirmed`}
            isPositive={true}
            subtext={`${pendingCount} Awaiting Confirmation`}
            icon={TrendingUp}
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
            title="Inquiry Conversion"
            value={`${inquiryConversionRate}% Rate`}
            change={`${convertedInquiriesCount} Converted`}
            isPositive={convertedInquiriesCount > 0}
            subtext={`${newInquiriesCount} Inquiries Awaiting Reply`}
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
      </main>
    </div>
  );
}
