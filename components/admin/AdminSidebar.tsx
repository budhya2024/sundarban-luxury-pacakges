"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FileText,
  Building2,
  PhoneCall,
  MessageSquareText,
  Compass,
  CalendarCheck,
  Newspaper,
  Settings,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
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
  const { bookings, inquiries } = useAdmin();

  const pendingBookingsCount = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-200 select-none border-r border-slate-800/80">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-[3px] bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
            SL
          </div>
          <div>
            <span className="text-[13px] font-black tracking-tight text-white block group-hover:text-blue-400 transition-colors">
              SUNDARBAN ADMIN
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Control Panel
            </span>
          </div>
        </Link>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-[3px] hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {/* Core Overview */}
        <div>
          <Link
            href="/admin"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </Link>
        </div>

        {/* Website Pages Management */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Website Pages & Sections
          </span>

          {/* Home Page */}
          <Link
            href="/admin/pages?page=home"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/pages"
              ? "bg-blue-600 text-white shadow-2xs font-bold"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Home Page</span>
          </Link>

          {/* About Page */}
          <Link
            href="/admin/pages?page=about"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>About Page</span>
          </Link>

          {/* Contact Us Page */}
          <Link
            href="/admin/contact"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/contact"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <span>Contact Us Page</span>
          </Link>

          {/* Tour Packages */}
          <Link
            href="/admin/packages"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/packages"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Tour Packages</span>
          </Link>

          {/* Manage Hotel */}
          <Link
            href="/admin/hotel"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/hotel"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Manage Hotel</span>
          </Link>



          {/* Blog Manager */}
          <Link
            href="/admin/blog"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/blog"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <Newspaper className="w-4 h-4 text-blue-400" />
            <span>Blog Manager</span>
          </Link>
        </div>

        {/* Bookings Ledger */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Bookings &amp; Ledger
          </span>

          {/* Bookings Ledger */}
          <Link
            href="/admin/bookings"
            onClick={onCloseMobile}
            className={`flex items-center justify-between px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/bookings"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4 text-blue-400" />
              <span>Bookings Ledger</span>
            </div>
            {pendingBookingsCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-[2px] bg-amber-500 text-slate-900 font-black">
                {pendingBookingsCount}
              </span>
            )}
          </Link>
        </div>

        {/* System Settings */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            System & Broadcast
          </span>

          <Link
            href="/admin/settings"
            onClick={onCloseMobile}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-bold transition-colors ${pathname === "/admin/settings"
              ? "bg-blue-600 text-white shadow-2xs"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Alerts</span>
          </Link>
        </div>
      </nav>

      {/* Footer / Quick Public Preview */}
      <div className="p-3 border-t border-slate-800/80 space-y-2 bg-[#0b1120]">


        <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Admin Active</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">v2.4 Pro</span>
        </div>
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
