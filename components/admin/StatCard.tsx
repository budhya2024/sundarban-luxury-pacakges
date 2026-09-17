"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-700",
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>

        <div
          className={`w-10 h-10 rounded-[4px] ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 border border-slate-100`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`flex items-center gap-1 font-bold ${isPositive ? "text-blue-600" : "text-rose-600"
              }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{change}</span>
          </div>
        )}

        {subtext && (
          <span className="text-[11px] text-slate-400 truncate max-w-[170px]">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
