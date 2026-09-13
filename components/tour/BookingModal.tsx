"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Send,
  CheckCircle2,
  Check,
} from "lucide-react";

import { useAdmin } from "@/context/AdminContext";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  pricePerPerson?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  packageName = "Sundarban 1 Night 2 Days Tour",
  pricePerPerson = 2999,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    guests: "1",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addBooking } = useAdmin();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guestCount = parseInt(formData.guests) || 1;
    const totalCalc = pricePerPerson * guestCount;

    try {
      addBooking({
        guestName: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        packageOrRoom: packageName,
        type: "Tour Package",
        travelDate: formData.travelDate || "2026-10-15",
        guestsCount: guestCount,
        totalAmount: totalCalc,
        paidAmount: 0,
        paymentStatus: "Unpaid",
        bookingStatus: "Pending",
        specialRequests: `Booked via website Tour Details modal for ${packageName}.`,
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button in top right */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#052e16] hover:bg-[#052e16] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="pr-10 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Book Your Trip
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                You are booking for{" "}
                <strong className="text-[#111827] font-bold">
                  {packageName}
                </strong>
                . Fill in your details and our travel expert will confirm your
                booking within 24 hours.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 bg-[#f9fafb] border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#15803d] focus:outline-none focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Mail className="w-5 h-5" />
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Your email"
                      className="w-full pl-11 pr-4 py-3 bg-[#f9fafb] border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#15803d] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Phone className="w-5 h-5" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="Your phone number"
                      className="w-full pl-11 pr-4 py-3 bg-[#f9fafb] border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#15803d] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Date & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Travel Date
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelDate: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-[#f9fafb] border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:border-[#15803d] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Guests
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Users className="w-5 h-5" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      placeholder="1"
                      className="w-full pl-11 pr-4 py-3 bg-[#f9fafb] border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#15803d] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No payment required</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Callback within 24 hours</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp support</span>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-lg bg-[#064e3b] hover:bg-[#d97706] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#064e3b]/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 transform -rotate-45" />
                <span>Confirm Booking</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-[#064e3b] flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-extrabold text-[#111827]">
              Booking Request Received!
            </h3>

            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you,{" "}
              <strong className="text-slate-900">{formData.fullName}</strong>.
              Your reservation request for{" "}
              <strong className="text-[#064e3b]">{packageName}</strong> has been
              received. Our Sundarban travel expert will contact you at{" "}
              <span className="font-semibold text-slate-800">
                {formData.phoneNumber}
              </span>{" "}
              within 24 hours.
            </p>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-[#064e3b] hover:bg-[#d97706] text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
