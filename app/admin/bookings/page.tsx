"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminBooking } from "@/lib/admin-data";
import { BookingDetailModal } from "@/components/admin/BookingDetailModal";

export default function AdminBookingsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { bookings, deleteBooking, showToast } = useAdmin();

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.packageOrRoom.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || b.bookingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedBookings = filteredBookings.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleFilterChange = (fn: () => void) => {
    fn();
    setCurrentPage(1);
  };

  // Generate visible page numbers (max 5 shown)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, safePage - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [safePage, totalPages]);

  const handleDelete = (id: string, code: string) => {
    if (confirm(`Are you sure you want to cancel & delete booking #${code}?`)) {
      deleteBooking(id);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Sl. No.",
      "Guest Name",
      "Phone",
      "Email",
      "Selected Package",
      "Type",
      "Travel Date",
      "Guests",
      "Total Amount (₹)",
      "Booking Status",
      "Created At",
    ];

    const rows = filteredBookings.map((b, index) => [
      index + 1,
      `"${b.guestName}"`,
      `"${b.phone}"`,
      b.email,
      `"${b.packageOrRoom}"`,
      b.type,
      b.travelDate,
      b.guestsCount,
      b.totalAmount,
      b.bookingStatus,
      b.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `sundarban_bookings_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Bookings report exported to CSV successfully.");
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Bookings &amp; Safari Reservations"
        subtitle="Manage tourist guest manifests, travel dates, and safari bookings"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Filter & Search Controls */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
              placeholder="Search booking code, guest name, phone..."
              className="w-full h-10 pl-9 pr-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(() => setStatusFilter(e.target.value))}
              className="h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-600"
            >
              <option value="All">All Booking Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Checked In">Checked In</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="h-10 px-3.5 rounded-[3px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 whitespace-nowrap">Sl. No.</th>
                  <th className="py-3 px-4">Guest Details</th>
                  <th className="py-3 px-4">Selected Package</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-8 text-center text-slate-400 text-xs"
                    >
                      No reservations found matching current filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((b, index) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-slate-900">
                        #{(safePage - 1) * pageSize + index + 1}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">
                          {b.guestName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {b.phone}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-800">
                        <span className="font-semibold block truncate">
                          {b.packageOrRoom}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {b.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 font-semibold">
                        {b.travelDate}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        {b.guestsCount} Pers.
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">
                          ₹{b.totalAmount.toLocaleString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${
                            b.bookingStatus === "Confirmed"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : b.bookingStatus === "Pending"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filteredBookings.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Results summary */}
              <div className="text-[11px] text-slate-500 font-medium">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filteredBookings.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">{filteredBookings.length}</span>{" "}
                bookings
              </div>

              <div className="flex items-center gap-2">
                {/* Page size selector */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-medium">Rows:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="h-7 px-2 text-[11px] font-bold border border-slate-300 rounded-[3px] bg-white text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Prev button */}
                <button
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage === 1}
                  className="h-7 w-7 flex items-center justify-center rounded-[3px] border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Page number buttons */}
                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`h-7 min-w-7 px-2 text-[11px] font-bold rounded-[3px] border transition-colors ${
                      p === safePage
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="h-7 w-7 flex items-center justify-center rounded-[3px] border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Booking Inspection & Status Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
