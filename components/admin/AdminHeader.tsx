"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function AdminHeader({
  onOpenMobile,
  title,
  subtitle,
}: {
  onOpenMobile: () => void;
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();
  const { inquiries, bookings } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const pendingBookings = bookings.filter((b) => b.bookingStatus === "Pending");
  const newInquiries = inquiries.filter((i) => i.status === "New");
  const unreadCount = pendingBookings.length + newInquiries.length;

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-[3px] text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-500 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Quick actions, date badge, notification bell */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Date chip */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span suppressHydrationWarning>{todayStr}</span>
        </div>

        {/* Live Public Site Shortcut */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
          title="Open Public Website"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-[3px] text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {mounted && unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-[4px] shadow-xl p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-extrabold text-slate-900">
                  Notifications &amp; Activity
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] bg-blue-50 text-blue-700 border border-blue-200">
                  {mounted ? unreadCount : 0} Actionable
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pendingBookings.length === 0 && newInquiries.length === 0 ? (
                  <p className="text-slate-400 text-center py-4 text-[11px]">
                    All reservations and customer inquiries are up to date!
                  </p>
                ) : (
                  <>
                    {pendingBookings.map((b) => (
                      <Link
                        key={b.id}
                        href="/admin/bookings"
                        onClick={() => setShowNotifications(false)}
                        className="block p-2 rounded-[3px] bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 transition-colors"
                      >
                        <span className="font-bold text-amber-900 block truncate">
                          Pending Booking: {b.guestName}
                        </span>
                        <span className="text-[11px] text-slate-600 block truncate">
                          {b.packageOrRoom} ({b.travelDate})
                        </span>
                      </Link>
                    ))}

                    {newInquiries.map((inq) => (
                      <Link
                        key={inq.id}
                        href="/admin/bookings"
                        onClick={() => setShowNotifications(false)}
                        className="block p-2 rounded-[3px] bg-blue-50/60 hover:bg-blue-50 border border-blue-200/80 transition-colors"
                      >
                        <span className="font-bold text-blue-900 block truncate">
                          New Inquiry: {inq.name}
                        </span>
                        <span className="text-[11px] text-slate-600 block truncate">
                          {inq.subject}
                        </span>
                      </Link>
                    ))}
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <Link
                  href="/admin/bookings"
                  onClick={() => setShowNotifications(false)}
                  className="font-bold text-blue-700 hover:underline"
                >
                  View Bookings
                </Link>
                <Link
                  href="/admin/hotel"
                  onClick={() => setShowNotifications(false)}
                  className="font-bold text-blue-700 hover:underline"
                >
                  Hotel Inquiries
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-[3px] bg-slate-900 text-white font-black text-xs flex items-center justify-center">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-extrabold text-xs text-slate-900 block leading-none">
              Super Admin
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Operations Lead
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 ml-1 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
