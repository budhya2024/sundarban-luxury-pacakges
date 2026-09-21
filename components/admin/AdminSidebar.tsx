"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FileText,
  Building2,
  PhoneCall,
  Compass,
  CalendarCheck,
  Newspaper,
  Settings,
  X,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function AdminSidebar({
  isMobileOpen,
  onCloseMobile,
}: {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const { bookings } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pendingBookingsCount = bookings.filter((b) => b.bookingStatus === "Pending").length;

  const isLinkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-200 select-none border-r border-slate-800/80">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3.5 group">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md group-hover:bg-blue-500 transition-colors">
            SL
          </div>
          <div>
            <span className="text-sm font-black tracking-tight text-white block group-hover:text-blue-400 transition-colors">
              SUNDARBAN ADMIN
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Control Panel
            </span>
          </div>
        </Link>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close admin menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation List with extra spacing */}
      <nav className="flex-1 px-4 py-5 space-y-6 overflow-y-auto">
        {/* Core Overview */}
        <div>
          <Link
            href="/admin"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${pathname === "/admin"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Dashboard Overview</span>
          </Link>
        </div>

        {/* Website Pages Management */}
        <div className="space-y-1.5">
          <span className="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
            Website Pages &amp; Sections
          </span>

          {/* Home Page */}
          <Link
            href="/admin/pages?page=home"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${pathname === "/admin/pages"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Home Page</span>
          </Link>

          {/* About Page */}
          <Link
            href="/admin/pages?page=about"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800/90 hover:text-white transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>About Page</span>
          </Link>

          {/* Contact Us Page */}
          <Link
            href="/admin/contact"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/contact")
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <span>Contact Us Page</span>
          </Link>

          {/* Tour Packages */}
          <Link
            href="/admin/packages"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/packages")
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Tour Packages</span>
          </Link>

          {/* Manage Hotel */}
          <Link
            href="/admin/hotel"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/hotel")
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Manage Hotel</span>
          </Link>

          {/* Blog Manager */}
          <Link
            href="/admin/blog"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/blog")
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <Newspaper className="w-4 h-4 text-blue-400" />
            <span>Blog Manager</span>
          </Link>
        </div>

        {/* Bookings & Ledger */}
        <div className="space-y-1.5">
          <span className="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
            Bookings &amp; Ledger
          </span>

          <Link
            href="/admin/bookings"
            onClick={onCloseMobile}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/bookings")
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4 text-blue-400" />
              <span>Bookings Ledger</span>
            </div>
            {mounted && pendingBookingsCount > 0 && (
              <span className="px-2 py-0.5 text-[11px] font-black rounded bg-amber-500 text-slate-950 shadow-xs">
                {pendingBookingsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Bottom Pinned Section: System & Broadcast (No Admin Active footer) */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0b1120] mt-auto space-y-1.5">
        <span className="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
          System &amp; Broadcast
        </span>

        <Link
          href="/admin/settings"
          onClick={onCloseMobile}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${isLinkActive("/admin/settings")
              ? "bg-blue-600 text-white shadow-sm font-black"
              : "text-slate-300 hover:bg-slate-800/90 hover:text-white"
            }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings &amp; Alerts</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onCloseMobile}
          />
          <div className="relative flex flex-col w-72 max-w-full bg-[#0f172a] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
