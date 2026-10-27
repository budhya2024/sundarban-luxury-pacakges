"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  CalendarCheck,
  IndianRupee,
  Calendar,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  X,
  ChevronDown,
  Info,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface MonthMeta {
  short: string;
  fullName: string;
  index: number;
  season: "peak" | "high" | "summer" | "monsoon";
}

const MONTHS: MonthMeta[] = [
  { short: "Jan", fullName: "January", index: 0, season: "peak" },
  { short: "Feb", fullName: "February", index: 1, season: "peak" },
  { short: "Mar", fullName: "March", index: 2, season: "high" },
  { short: "Apr", fullName: "April", index: 3, season: "summer" },
  { short: "May", fullName: "May", index: 4, season: "summer" },
  { short: "Jun", fullName: "June", index: 5, season: "summer" },
  { short: "Jul", fullName: "July", index: 6, season: "summer" },
  { short: "Aug", fullName: "August", index: 7, season: "summer" },
  { short: "Sep", fullName: "September", index: 8, season: "high" },
  { short: "Oct", fullName: "October", index: 9, season: "high" },
  { short: "Nov", fullName: "November", index: 10, season: "peak" },
  { short: "Dec", fullName: "December", index: 11, season: "peak" },
];

export function RevenueChart() {
  const { bookings } = useAdmin();
  const [viewMode, setViewMode] = useState<"revenue" | "bookings">("revenue");
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);
  const [pinnedMonthIdx, setPinnedMonthIdx] = useState<number | null>(null);
  const [hoveredSeasonFilter, setHoveredSeasonFilter] = useState<string | null>(null);

  // Dynamically extract all available years from real bookings data + current calendar year
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear(); // 2026
    const yearSet = new Set<number>();
    yearSet.add(currentYear);
    yearSet.add(currentYear - 1);
    yearSet.add(currentYear + 1);

    bookings.forEach((b) => {
      const rawDate = b.travelDate || b.createdAt || "";
      if (rawDate) {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          yearSet.add(d.getFullYear());
        }
      }
    });

    return Array.from(yearSet).sort((a, b) => b - a);
  }, [bookings]);

  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  // Compute strictly real monthly revenue & bookings filtered by selected year
  const dynamicMonthlyData = useMemo(() => {
    return MONTHS.map((m) => {
      const matchingBookings = bookings.filter((b) => {
        const rawDate = b.travelDate || b.createdAt || "";
        if (!rawDate) return false;
        const d = new Date(rawDate);
        if (isNaN(d.getTime())) return false;

        const matchesYear =
          selectedYear === "all" || d.getFullYear().toString() === selectedYear;
        const matchesMonth = d.getMonth() === m.index;
        return matchesYear && matchesMonth;
      });

      const revenue = matchingBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
      const paidRevenue = matchingBookings.reduce((sum, b) => sum + (Number(b.paidAmount) || 0), 0);
      const pendingRevenue = Math.max(0, revenue - paidRevenue);
      const bookingsCount = matchingBookings.length;
      const guestsCount = matchingBookings.reduce((sum, b) => sum + (Number(b.guestsCount) || 1), 0);
      const avgOrderValue = bookingsCount > 0 ? Math.round(revenue / bookingsCount) : 0;

      // Find top package booked this month
      const packageCounts: Record<string, number> = {};
      matchingBookings.forEach((b) => {
        const name = b.packageOrRoom || "General Safari";
        packageCounts[name] = (packageCounts[name] || 0) + 1;
      });
      const topPackageEntry = Object.entries(packageCounts).sort((a, b) => b[1] - a[1])[0];
      const topPackage = topPackageEntry ? topPackageEntry[0] : null;

      return {
        ...m,
        revenue,
        paidRevenue,
        pendingRevenue,
        bookings: bookingsCount,
        guests: guestsCount,
        avgOrderValue,
        topPackage,
        matchingBookings,
      };
    });
  }, [bookings, selectedYear]);

  const maxRevenue = Math.max(...dynamicMonthlyData.map((d) => d.revenue), 1);
  const maxBookings = Math.max(...dynamicMonthlyData.map((d) => d.bookings), 1);
  const currentMonthIdx = new Date().getMonth();

  const totalPeriodRevenue = dynamicMonthlyData.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalPeriodBookings = dynamicMonthlyData.reduce((acc, cur) => acc + cur.bookings, 0);

  const highestMonth = dynamicMonthlyData.reduce(
    (max, cur) =>
      viewMode === "revenue"
        ? cur.revenue > max.revenue
          ? cur
          : max
        : cur.bookings > max.bookings
        ? cur
        : max,
    dynamicMonthlyData[0]
  );

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    if (val >= 1000) {
      return `₹${(val / 1000).toFixed(1)}k`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Determine which month is active for drilldown
  const activeMonthIdx = pinnedMonthIdx !== null ? pinnedMonthIdx : hoveredMonthIdx;
  const activeFilteredMonth =
    activeMonthIdx !== null ? dynamicMonthlyData[activeMonthIdx] : null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs transition-all">
      {/* Header with Title, Stats & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {viewMode === "revenue" ? "Monthly Revenue Performance" : "Monthly Booking Velocity"}
            </h3>

            {/* Total Period Badge */}
            <span className="px-2 py-0.5 rounded-[2px] bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
              {viewMode === "revenue"
                ? `Total ${formatCurrency(totalPeriodRevenue)}`
                : `${totalPeriodBookings} Total Tours`}
            </span>

            {/* Active Year Pill */}
            <span className="px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-emerald-600" />
              <span>{selectedYear === "all" ? "All Years" : `Year ${selectedYear}`}</span>
            </span>

            {/* Pinned Month Badge if filtered */}
            {pinnedMonthIdx !== null && activeFilteredMonth && (
              <span className="px-2 py-0.5 rounded-[2px] bg-indigo-50 text-indigo-800 text-[10px] font-bold border border-indigo-200 flex items-center gap-1 animate-in fade-in duration-150">
                <span>Pinned: {activeFilteredMonth.fullName}</span>
                <button
                  type="button"
                  onClick={() => setPinnedMonthIdx(null)}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  title="Clear Pinned Filter"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {viewMode === "revenue"
              ? "Gross earnings from safari packages, private houseboat charters & resort stays"
              : "Confirmed expedition reservations and seasonal tour occupancy rate"}
          </p>
        </div>

        {/* Filter Controls: Year Filter + Metric Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-center">
          {/* Year Filter Selector */}
          <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 transition-colors px-2 py-1 rounded-[3px] border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <label htmlFor="dashboard-year-filter" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Year:
            </label>
            <select
              id="dashboard-year-filter"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setPinnedMonthIdx(null);
              }}
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
            >
              <option value="all">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Metric View Mode Toggle (Revenue / Bookings) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-[3px] border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("revenue")}
              className={`px-3 py-1 rounded-[2px] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "revenue"
                  ? "bg-white text-blue-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <IndianRupee className="w-3 h-3" />
              <span>Revenue</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("bookings")}
              className={`px-3 py-1 rounded-[2px] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "bookings"
                  ? "bg-white text-blue-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CalendarCheck className="w-3 h-3" />
              <span>Bookings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization with Gridlines & Y-Axis Scale */}
      <div className="mt-6 pt-2">
        <div className="relative h-52 px-1">
          {/* Background Grid Lines & Y-Axis references */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            <div className="w-full border-b border-dashed border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{viewMode === "revenue" ? formatCurrency(maxRevenue) : maxBookings}</span>
            </div>
            <div className="w-full border-b border-dashed border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{viewMode === "revenue" ? formatCurrency(Math.round(maxRevenue * 0.75)) : Math.round(maxBookings * 0.75)}</span>
            </div>
            <div className="w-full border-b border-dashed border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{viewMode === "revenue" ? formatCurrency(Math.round(maxRevenue * 0.5)) : Math.round(maxBookings * 0.5)}</span>
            </div>
            <div className="w-full border-b border-dashed border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{viewMode === "revenue" ? formatCurrency(Math.round(maxRevenue * 0.25)) : Math.round(maxBookings * 0.25)}</span>
            </div>
            <div className="w-full border-b border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>0</span>
            </div>
          </div>

          {/* Monthly Bars Container */}
          <div className="relative z-10 flex items-end justify-between gap-1.5 sm:gap-2.5 h-full pb-6 pl-8">
            {dynamicMonthlyData.map((item, idx) => {
              const hasData = viewMode === "revenue" ? item.revenue > 0 : item.bookings > 0;
              const heightPercent =
                viewMode === "revenue"
                  ? maxRevenue > 0
                    ? (item.revenue / maxRevenue) * 100
                    : 0
                  : maxBookings > 0
                  ? (item.bookings / maxBookings) * 100
                  : 0;

              const isHovered = hoveredMonthIdx === idx;
              const isPinned = pinnedMonthIdx === idx;
              const isCurrentCalendarMonth = idx === currentMonthIdx;
              const isPeak = hasData && item.short === highestMonth.short;

              // Hover season filter match
              const matchesSeasonFilter =
                !hoveredSeasonFilter || item.season === hoveredSeasonFilter;

              // Dim non-hovered bars when another bar or season is hovered
              const isDimmed =
                (hoveredMonthIdx !== null && hoveredMonthIdx !== idx) ||
                (hoveredSeasonFilter !== null && !matchesSeasonFilter);

              // Tooltip alignment to prevent screen clipping
              const tooltipAlignClass =
                idx <= 2
                  ? "left-0"
                  : idx >= 9
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2";

              return (
                <div
                  key={item.short}
                  className={`flex-1 flex flex-col items-center gap-2 h-full justify-end relative cursor-pointer transition-opacity duration-200 ${
                    isDimmed ? "opacity-30" : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredMonthIdx(idx)}
                  onMouseLeave={() => setHoveredMonthIdx(null)}
                  onClick={() =>
                    setPinnedMonthIdx(pinnedMonthIdx === idx ? null : idx)
                  }
                  title={`Click to filter bookings for ${item.fullName}`}
                >
                  {/* Rich Floating Tooltip on Hover */}
                  {isHovered && (
                    <div
                      className={`absolute -top-24 z-30 bg-slate-900 text-white text-[11px] font-bold p-2.5 rounded-[4px] shadow-2xl pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 border border-slate-700 ${tooltipAlignClass}`}
                    >
                      {/* Tooltip Header */}
                      <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-700/80">
                        <span className="font-extrabold text-white text-xs">
                          {item.fullName} {selectedYear !== "all" ? selectedYear : ""}
                        </span>
                        {isCurrentCalendarMonth && (
                          <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1.5 py-0.2 rounded font-mono">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Tooltip Values */}
                      <div className="mt-1.5 space-y-0.5 text-left">
                        <div className="text-emerald-400 font-extrabold text-xs">
                          ₹{item.revenue.toLocaleString("en-IN")}
                          <span className="text-slate-400 font-normal text-[10px] ml-1">
                            ({item.bookings} {item.bookings === 1 ? "tour" : "tours"})
                          </span>
                        </div>

                        {item.revenue > 0 && (
                          <div className="text-[10px] text-slate-300 flex items-center gap-2 font-mono">
                            <span className="text-emerald-400">Paid: ₹{item.paidRevenue.toLocaleString("en-IN")}</span>
                            {item.pendingRevenue > 0 && (
                              <span className="text-amber-400">Due: ₹{item.pendingRevenue.toLocaleString("en-IN")}</span>
                            )}
                          </div>
                        )}

                        {item.topPackage && (
                          <div className="text-[10px] text-slate-300 truncate max-w-[200px] pt-0.5">
                            Top: <span className="text-blue-300 font-medium">{item.topPackage}</span>
                          </div>
                        )}

                        <div className="text-[9px] text-slate-400 pt-1 italic border-t border-slate-800">
                          {isPinned ? "Click to unpin" : "Click to pin/filter below"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* The Bar */}
                  <div
                    className={`w-full max-w-[30px] rounded-t-[3px] transition-all duration-300 relative ${
                      isPinned
                        ? "bg-indigo-600 ring-2 ring-indigo-400 shadow-md scale-y-105"
                        : isHovered
                        ? "bg-blue-700 ring-2 ring-blue-400 shadow-md"
                        : isPeak
                        ? "bg-slate-900 hover:bg-blue-600"
                        : hasData
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-200"
                    }`}
                    style={{
                      height: `${hasData ? Math.max(14, heightPercent) : 5}%`,
                    }}
                  >
                    {/* Top indicator dot for peak month */}
                    {isPeak && !isDimmed && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white shadow-xs" />
                    )}
                  </div>

                  {/* Month Label */}
                  <span
                    className={`text-[11px] font-bold transition-colors select-none ${
                      isPinned
                        ? "text-indigo-700 font-black underline decoration-indigo-500 underline-offset-2"
                        : isHovered
                        ? "text-blue-700 font-extrabold"
                        : isCurrentCalendarMonth
                        ? "text-blue-600 font-bold underline decoration-blue-400 underline-offset-2"
                        : "text-slate-600"
                    }`}
                  >
                    {item.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Season Hover Filter Strip */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-slate-600 font-bold text-[11px]">
            <Filter className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="uppercase tracking-wider">Hover to Filter:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onMouseEnter={() => setHoveredSeasonFilter("peak")}
              onMouseLeave={() => setHoveredSeasonFilter(null)}
              className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold transition-all cursor-pointer ${
                hoveredSeasonFilter === "peak"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Peak Wildlife (Nov–Feb)
            </button>
            <button
              type="button"
              onMouseEnter={() => setHoveredSeasonFilter("high")}
              onMouseLeave={() => setHoveredSeasonFilter(null)}
              className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold transition-all cursor-pointer ${
                hoveredSeasonFilter === "high"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              High Season (Sep–Oct, Mar)
            </button>
            <button
              type="button"
              onMouseEnter={() => setHoveredSeasonFilter("summer")}
              onMouseLeave={() => setHoveredSeasonFilter(null)}
              className={`px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold transition-all cursor-pointer ${
                hoveredSeasonFilter === "summer"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Summer &amp; Monsoon (Apr–Aug)
            </button>
          </div>
        </div>

        {/* Highest Peak Month footnote */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Seasonal Peak: <strong className="text-slate-900">{highestMonth.fullName}</strong>{" "}
            ({formatCurrency(highestMonth.revenue)} &bull; {highestMonth.bookings} Tours)
          </span>
        </div>
      </div>

      {/* Pinned Month Interactive Drilldown Details */}
      {pinnedMonthIdx !== null && activeFilteredMonth && (
        <div className="mt-4 p-4 bg-slate-50/90 border border-blue-200 rounded-[4px] shadow-2xs space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                Filtered: {activeFilteredMonth.fullName} {selectedYear !== "all" ? selectedYear : ""}
              </span>
              <span className="px-2 py-0.5 rounded-[2px] bg-blue-100 text-blue-800 text-[10px] font-bold">
                {activeFilteredMonth.bookings} {activeFilteredMonth.bookings === 1 ? "Tour" : "Tours"}
              </span>
              <span className="px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                ₹{activeFilteredMonth.revenue.toLocaleString("en-IN")} Gross
              </span>
              {activeFilteredMonth.pendingRevenue > 0 && (
                <span className="px-2 py-0.5 rounded-[2px] bg-amber-100 text-amber-800 text-[10px] font-bold">
                  ₹{activeFilteredMonth.pendingRevenue.toLocaleString("en-IN")} Due
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPinnedMonthIdx(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer self-start sm:self-center"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Month Filter</span>
            </button>
          </div>

          {activeFilteredMonth.matchingBookings.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-400">
              No bookings recorded for {activeFilteredMonth.fullName} in{" "}
              {selectedYear !== "all" ? selectedYear : "this timeframe"}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="pb-2 font-bold">Code</th>
                    <th className="pb-2 font-bold">Guest Name</th>
                    <th className="pb-2 font-bold">Package / Room</th>
                    <th className="pb-2 font-bold">Travel Date</th>
                    <th className="pb-2 font-bold">Amount</th>
                    <th className="pb-2 font-bold">Payment</th>
                    <th className="pb-2 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70">
                  {activeFilteredMonth.matchingBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/90 transition-colors">
                      <td className="py-2.5 font-mono font-bold text-slate-900">{b.bookingCode}</td>
                      <td className="py-2.5">
                        <div className="font-semibold text-slate-900">{b.guestName}</div>
                        <div className="text-[10px] text-slate-400">{b.phone}</div>
                      </td>
                      <td className="py-2.5 text-slate-700 truncate max-w-[180px]" title={b.packageOrRoom}>
                        {b.packageOrRoom}
                      </td>
                      <td className="py-2.5 text-slate-600 font-mono text-[11px]">{b.travelDate}</td>
                      <td className="py-2.5 font-bold text-slate-900">
                        ₹{Number(b.totalAmount).toLocaleString("en-IN")}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold ${
                            b.paymentStatus === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : b.paymentStatus === "Partial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${
                            b.bookingStatus === "Confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : b.bookingStatus === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RevenueChart;
