"use client";

import React, { useState } from "react";
import { monthlyRevenueData } from "@/lib/admin-data";
import { TrendingUp, DollarSign } from "lucide-react";

export function RevenueChart() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const maxRevenue = Math.max(...monthlyRevenueData.map((d) => d.revenue));
  const chartHeight = 180;

  return (
    <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Booking Revenue Trend
            </h3>
            <span className="px-2 py-0.5 rounded-[2px] bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
              FY 2026-27
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monthly gross booking volume and seasonal cruise peaks
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-3 h-3 rounded-[2px] bg-blue-600 block" />
            <span>Revenue (₹)</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-3 h-3 rounded-[2px] bg-slate-900 block" />
            <span>Bookings</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="mt-6 pt-4">
        <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-48 px-1">
          {monthlyRevenueData.map((item, idx) => {
            const heightPercent = (item.revenue / maxRevenue) * 100;
            const isHovered = hoveredMonth === idx;
            const isPeak = item.month === "Dec" || item.month === "Jan";

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
                      {item.month} 2026
                    </span>
                    <span className="text-white">
                      ₹{(item.revenue / 100000).toFixed(2)} Lakhs
                    </span>
                    <span className="block text-blue-400 text-[10px]">
                      {item.bookings} confirmed tours
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
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Month label */}
                <span
                  className={`text-[11px] font-bold transition-colors ${
                    isHovered
                      ? "text-blue-700 font-extrabold"
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
            Winter Peak: <strong className="text-slate-800">Dec - Jan</strong>{" "}
            (₹32.0 Lakhs projected)
          </span>
        </div>
        <span>Highest Booking Rate: 148 Tours / Month</span>
      </div>
    </div>
  );
}
