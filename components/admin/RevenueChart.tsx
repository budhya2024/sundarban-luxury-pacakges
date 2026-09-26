"use client";

import React, { useState, useMemo } from "react";
import { monthlyRevenueData } from "@/lib/admin-data";
import { TrendingUp, CalendarCheck } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function RevenueChart() {
  const { bookings } = useAdmin();
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Compute dynamic monthly bookings combining live bookings with baseline seasonality
  const dynamicMonthlyData = useMemo(() => {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    return monthlyRevenueData.map((item) => {
      const monthIdx = monthNames.indexOf(item.month.toLowerCase());

      const matchingBookings = bookings.filter((b) => {
        const dateStr = (b.travelDate || b.createdAt || "").toLowerCase();
        if (dateStr.includes(item.month.toLowerCase())) return true;
        const match = dateStr.match(/^\d{4}-(\d{2})-\d{2}/);
        if (match && parseInt(match[1], 10) - 1 === monthIdx) return true;
        return false;
      });

      const liveBookingsCount = matchingBookings.length;
      const totalBookings = Math.max(item.bookings, liveBookingsCount + 8);
      // Booking rate calculation based on capacity (max 50 tours/month)
      const maxCapacity = 45;
      const bookingRate = Math.min(100, Math.round((totalBookings / maxCapacity) * 100));

      return {
        month: item.month,
        bookings: totalBookings,
        liveBookingsCount,
        bookingRate,
        hasLiveBookings: liveBookingsCount > 0,
      };
    });
  }, [bookings]);

  const maxBookings = Math.max(...dynamicMonthlyData.map((d) => d.bookings));
  const currentMonthShort = new Date().toLocaleDateString("en-US", { month: "short" });

  const highestBookingMonth = dynamicMonthlyData.reduce(
    (max, cur) => (cur.bookings > max.bookings ? cur : max),
    dynamicMonthlyData[0]
  );

  const averageBookingRate = Math.round(
    dynamicMonthlyData.reduce((acc, cur) => acc + cur.bookingRate, 0) / dynamicMonthlyData.length
  );

  return (
    <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Monthly Booking Rate &amp; Trends
            </h3>
            <span className="px-2 py-0.5 rounded-[2px] bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
              Avg {averageBookingRate}% Booking Rate
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monthly safari reservations velocity and seasonal tour demand
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-3 h-3 rounded-[2px] bg-blue-600 block" />
            <span>Tour Bookings</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-3 h-3 rounded-[2px] bg-slate-900 block" />
            <span>Peak Demand</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="mt-6 pt-4">
        <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-48 px-1">
          {dynamicMonthlyData.map((item, idx) => {
            const heightPercent = maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0;
            const isHovered = hoveredMonth === idx;
            const isPeak = item.month === highestBookingMonth.month || item.month === "Dec" || item.month === "Jan";

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-2.5 rounded-[3px] shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 border border-slate-700">
                    <span className="block text-slate-300 text-[10px]">
                      {item.month} 2026 {item.month === currentMonthShort ? "• Current Month" : ""}
                    </span>
                    <span className="text-white">
                      {item.bookings} Bookings ({item.bookingRate}% Rate)
                    </span>
                    <span className="block text-blue-400 text-[10px]">
                      {item.liveBookingsCount > 0 ? `${item.liveBookingsCount} active live tours` : "High season bookings"}
                    </span>
                  </div>
                )}

                {/* The Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-t-[2px] transition-all duration-200 ${
                    isPeak
                      ? "bg-slate-900 group-hover:bg-blue-600"
                      : "bg-blue-600 group-hover:bg-blue-700"
                  } ${isHovered ? "ring-2 ring-blue-400 shadow-md" : ""}`}
                  style={{ height: `${Math.max(12, heightPercent)}%` }}
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
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
          <span>
            Seasonal Peak: <strong className="text-slate-800">{highestBookingMonth.month}</strong>{" "}
            ({highestBookingMonth.bookings} Tours • {highestBookingMonth.bookingRate}% Booking Rate)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Annual Avg Booking Rate: <strong className="text-slate-800">{averageBookingRate}%</strong></span>
        </div>
      </div>
    </div>
  );
}
