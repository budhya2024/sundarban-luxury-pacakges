"use client";

import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If on admin login page, do not render sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Suspense
        fallback={
          <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 shrink-0 h-screen sticky top-0" />
        }
      >
        <AdminSidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
