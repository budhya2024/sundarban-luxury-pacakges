"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Users,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { AdminBooking } from "@/lib/admin-data";
import { useAdmin } from "@/context/AdminContext";

interface BookingDetailModalProps {
  booking: AdminBooking | null;
  onClose: () => void;
}

export function BookingDetailModal({ booking, onClose }: BookingDetailModalProps) {
  const { updateBookingStatus } = useAdmin();
  const [selectedStatus, setSelectedStatus] = useState<AdminBooking["bookingStatus"] | null>(null);

  if (!booking) return null;

  const currentStatus = selectedStatus || booking.bookingStatus;

  const handleSaveStatus = () => {
    updateBookingStatus(booking.id, currentStatus, booking.paymentStatus);
    onClose();
  };

  // Format booking time nicely if available
  const bookingTimeDisplay = booking.createdAt
    ? booking.createdAt.includes(" ")
      ? `${booking.createdAt.split(" ")[0]} at ${booking.createdAt.split(" ")[1]}`
      : booking.createdAt
    : "Recently Received";

  // Check if there are real custom notes from guest
  const hasCustomNotes =
    booking.specialRequests &&
    !booking.specialRequests.startsWith("Direct reservation request for") &&
    booking.specialRequests.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Right-Side Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 text-slate-800 text-xs border-l border-slate-200">
        {/* Top Header with Clean White Background */}
        <div className="px-6 py-4.5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black tracking-tight text-slate-900">
                Booking Details
              </h3>
              <span
                className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${currentStatus === "Confirmed"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : currentStatus === "Pending"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : currentStatus === "Checked In"
                      ? "bg-teal-50 text-teal-700 border border-teal-200"
                      : currentStatus === "Completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
              >
                {currentStatus}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Booked on {bookingTimeDisplay}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Guest Details Card */}
          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200/80 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Primary Guest
              </span>
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{booking.guestName}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/70 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Phone Number
                </span>
                <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{booking.phone}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Email Address
                </span>
                <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5 truncate">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{booking.email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Selected Package Details Card */}
          <div className="p-4 rounded-sm bg-blue-50/40 border border-blue-100 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                Selected Package
              </span>
              <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                {booking.packageOrRoom}
              </h4>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-blue-100 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Travel Date
                </span>
                <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>{booking.travelDate}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Guests
                </span>
                <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span>{booking.guestsCount} Pers.</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Total Amount
                </span>
                <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">
                  ₹{booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Special Guest Custom Notes if present */}
          {hasCustomNotes && (
            <div className="p-3 rounded-sm bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
              <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-800 mb-0.5">
                Guest Message / Special Note
              </span>
              <p className="leading-relaxed">{booking.specialRequests}</p>
            </div>
          )}

          {/* Status Update Selector */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Update Booking Status
            </label>
            <div className="grid grid-cols-5 gap-1">
              {(["Pending", "Confirmed", "Checked In", "Completed", "Cancelled"] as const).map(
                (st) => {
                  const isActive = currentStatus === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`py-2 px-0.5 rounded-sm text-[10px] font-bold text-center transition-all cursor-pointer border ${isActive
                        ? st === "Confirmed"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : st === "Pending"
                            ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                            : st === "Checked In"
                              ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                              : st === "Completed"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                : "bg-rose-600 text-white border-rose-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                    >
                      {st}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-sm border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-100 transition-colors text-center cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSaveStatus}
            className="flex-1 py-2 px-3 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xs hover:shadow-md text-center cursor-pointer"
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  );
}


