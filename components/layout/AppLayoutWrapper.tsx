"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { AdminProvider } from "@/context/AdminContext";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <AdminProvider>
      {isAdmin ? (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
          {children}
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </>
      )}
    </AdminProvider>
  );
}
