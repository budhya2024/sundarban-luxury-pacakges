"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  Calendar,
  Users,
  CreditCard,
  MessageCircle,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
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
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<AdminBooking["paymentStatus"] | null>(null);

  if (!booking) return null;

  const currentStatus = selectedStatus || booking.bookingStatus;
  const currentPayment = selectedPaymentStatus || booking.paymentStatus;

  const handleSaveStatus = () => {
    updateBookingStatus(booking.id, currentStatus, currentPayment);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${booking.guestName}, this is Sundarban Luxury Tours regarding your reservation ${booking.bookingCode} for ${booking.packageOrRoom} on ${booking.travelDate}. Status: ${currentStatus}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-900 text-xs">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-[3px] bg-slate-900 text-[#fbbf24] font-mono font-bold text-xs">
              {booking.bookingCode}
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Reservation Details
              </h3>
              <p className="text-slate-500 text-[11px]">
                Created on {booking.createdAt}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[3px] text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Guest Card */}
          <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Guest Contact Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block text-[11px]">Primary Guest</span>
                <span className="font-extrabold text-sm text-slate-900">
                  {booking.guestName}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Phone / WhatsApp</span>
                <a
                  href={`tel:${booking.phone}`}
                  className="font-bold text-sm text-blue-700 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{booking.phone}</span>
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block text-[11px]">Email Address</span>
                <a
                  href={`mailto:${booking.email}`}
                  className="font-semibold text-slate-800 hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{booking.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="p-4 rounded-[4px] bg-blue-50/50 border border-blue-200 space-y-2">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              Selected Expedition
            </span>
            <h4 className="font-black text-sm text-slate-900">
              {booking.packageOrRoom}
            </h4>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-200/60 text-[11px]">
              <div>
                <span className="text-slate-500 block">Travel Date</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-blue-700" />
                  {booking.travelDate}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Guests</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3 text-blue-700" />
                  {booking.guestsCount} Persons
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Type</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {booking.type}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="p-4 rounded-[4px] bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Financial Status
            </span>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-600">Total Booking Value:</span>
              <span className="text-base font-extrabold text-slate-900">
                ₹{booking.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
              <span className="text-slate-600">Paid Deposit:</span>
              <span className="font-bold text-blue-700">
                ₹{booking.paidAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
              <span className="text-slate-600">Balance Due:</span>
              <span className="font-bold text-amber-700">
                ₹{(booking.totalAmount - booking.paidAmount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="p-3 rounded-[4px] bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
              <span className="font-bold block mb-0.5">Special Guest Notes:</span>
              <p>{booking.specialRequests}</p>
            </div>
          )}

          {/* Change Status Form */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Booking Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as AdminBooking["bookingStatus"])
                }
                className="w-full h-9 px-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending Review</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Payment Status
              </label>
              <select
                value={currentPayment}
                onChange={(e) =>
                  setSelectedPaymentStatus(e.target.value as AdminBooking["paymentStatus"])
                }
                className="w-full h-9 px-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Paid">Paid in Full</option>
                <option value="Partial">Partial Deposit</option>
                <option value="Unpaid">Unpaid / Pay on Arrival</option>
              </select>
            </div>
          </div>

          {/* Quick Communication Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <a
              href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 rounded-[3px] bg-slate-900 hover:bg-blue-600 text-white font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Send WhatsApp Update</span>
            </a>

            <a
              href={`tel:${booking.phone}`}
              className="px-3.5 py-2 rounded-[3px] border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Guest</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[3px] border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSaveStatus}
            className="px-5 py-2 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
          >
            Save Status Changes
          </button>
        </div>
      </div>
    </div>
  );
}
