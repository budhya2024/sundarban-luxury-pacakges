"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, CalendarCheck, IndianRupee } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function RevenueChart() {
  const { bookings } = useAdmin();
  const [viewMode, setViewMode] = useState<"revenue" | "bookings">("revenue");
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Compute strictly real monthly revenue & bookings directly from database bookings
  const dynamicMonthlyData = useMemo(() => {
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    return months.map((monthStr) => {
      const monthIdx = monthNames.indexOf(monthStr.toLowerCase());

      const matchingBookings = bookings.filter((b) => {
        const rawDate = b.travelDate || b.createdAt || "";
        if (!rawDate) return false;
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          return d.getMonth() === monthIdx;
        }
        return false;
      });

      const liveRevenue = matchingBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
      const liveBookingsCount = matchingBookings.length;

      return {
        month: monthStr,
        revenue: liveRevenue,
        bookings: liveBookingsCount,
      };
    });
  }, [bookings]);

  const maxRevenue = Math.max(...dynamicMonthlyData.map((d) => d.revenue), 1);
  const maxBookings = Math.max(...dynamicMonthlyData.map((d) => d.bookings), 1);
  const currentMonthShort = new Date().toLocaleDateString("en-US", { month: "short" });

  const totalAnnualRevenue = dynamicMonthlyData.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalAnnualBookings = dynamicMonthlyData.reduce((acc, cur) => acc + cur.bookings, 0);

  const highestMonth = dynamicMonthlyData.reduce(
    (max, cur) =>
      viewMode === "revenue"
        ? cur.revenue > max.revenue ? cur : max
        : cur.bookings > max.bookings ? cur : max,
    dynamicMonthlyData[0]
  );

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {viewMode === "revenue" ? "Monthly Revenue Performance" : "Monthly Booking Velocity"}
            </h3>
            <span className="px-2 py-0.5 rounded-[2px] bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
              {viewMode === "revenue"
                ? `Total ${formatLakhs(totalAnnualRevenue)}`
                : `${totalAnnualBookings} Total Tours`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {viewMode === "revenue"
              ? "Gross earnings from safari packages, private houseboat charters & resort stays"
              : "Confirmed expedition reservations and seasonal tour occupancy rate"}
          </p>
        </div>

        {/* View Mode Switcher Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-[3px] self-start sm:self-center">
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

      {/* Bar Chart Visualization */}
      <div className="mt-6 pt-2">
        <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-48 px-1">
          {dynamicMonthlyData.map((item, idx) => {
            const hasData = viewMode === "revenue" ? item.revenue > 0 : item.bookings > 0;
            const heightPercent =
              viewMode === "revenue"
                ? maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0
                : maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0;

            const isHovered = hoveredMonth === idx;
            const isPeak = hasData && item.month === highestMonth.month;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-16 z-20 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-[3px] shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 border border-slate-700">
                    <span className="block text-slate-300 text-[10px]">
                      {item.month} {item.month === currentMonthShort ? "• Current Month" : ""}
                    </span>
                    <span className="text-emerald-400 font-extrabold text-xs block">
                      {formatLakhs(item.revenue)} ({item.bookings} Bookings)
                    </span>
                    <span className="block text-slate-300 text-[10px]">
                      {item.bookings > 0
                        ? `${item.bookings} real database bookings`
                        : "No bookings recorded"}
                    </span>
                  </div>
                )}

                {/* The Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-t-[2px] transition-all duration-300 ${
                    isPeak
                      ? "bg-slate-900 group-hover:bg-blue-600"
                      : "bg-blue-600 group-hover:bg-blue-700"
                  } ${isHovered ? "ring-2 ring-blue-400 shadow-md" : ""}`}
                  style={{ height: `${hasData ? Math.max(12, heightPercent) : 4}%` }}
                />

                {/* Month label */}
                <span
                  className={`text-[11px] font-bold transition-colors ${
                    isHovered
                      ? "text-blue-700 font-extrabold"
                      : item.month === currentMonthShort
                      ? "text-blue-600 font-bold underline decoration-blue-400 underline-offset-2"
                      : "text-slate-500"
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footnote stats */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
          <span>
            Seasonal Peak Demand: <strong className="text-slate-900">{highestMonth.month}</strong>{" "}
            ({formatLakhs(highestMonth.revenue)} &bull; {highestMonth.bookings} Tours)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
            <span className="text-[11px] text-slate-600 font-medium">Peak Season</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-[11px] text-slate-600 font-medium">Regular Season</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
