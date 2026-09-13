"use client";

import React, { useState } from "react";
import { Calendar, Users, Phone, Mail, Send, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function HotelBookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "Executive Royal Suite (₹5,500/night)",
    guests: "2 Adults",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hotel Sonar Bangla! I would like to book a stay.\nRoom: ${formData.roomType}\nCheck-in: ${formData.checkIn || "TBD"}\nGuests: ${formData.guests}`
  );

  return (
    <section id="booking-form" className="py-8 md:py-16 bg-white text-[#0f172a]">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white  border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Banner Header */}
          <div className="bg-[#064e3b] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-400/20">
            <div>
              <span className="text-[#fbbf24] font-bold text-xs uppercase tracking-widest block mb-1">
                Direct Booking & Rates
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Reserve Your Stay at Hotel Sonar Bangla
              </h2>
              <p className="text-white text-xs sm:text-sm mt-1">
                Best Rate Guarantee • Instant Confirmation • Zero Booking Fees
              </p>
            </div>

            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>

          {/* Booking Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            {submitted && (
              <div className="p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Thank you! Your Hotel Sonar Bangla reservation request has been received. Our team will contact you within 15 minutes.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-In Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Check-in Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                  />
                </div>
              </div>

              {/* Check-Out Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Check-out Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                  />
                </div>
              </div>

              {/* Select Room Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Room / Suite Category *
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b] bg-white"
                >
                  <option>Deluxe AC River View Room (₹3,800/night)</option>
                  <option>Executive Royal Suite (₹5,500/night)</option>
                  <option>Heritage Wooden Villa (₹7,200/night)</option>
                  <option>Family Presidential Cottage (₹8,900/night)</option>
                </select>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Number of Guests *
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b] bg-white"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults + 1 Child</option>
                  <option>2 Adults + 2 Children</option>
                  <option>3 Adults</option>
                  <option>4+ Guests (Family Group)</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Mukherjee"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
              />
            </div>

            {/* Special Request / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Special Requests / Dietary Preferences
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Vegetarian food requirement, late check-in request, boat pickup at Gadkhali..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#064e3b] focus:ring-1 focus:ring-[#064e3b]"
              />
            </div>

            {/* Bottom Actions & Security Guarantee */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#064e3b] flex-shrink-0" />
                <span>Your information is protected. We respond within 15 minutes.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-sm bg-[#064e3b] hover:bg-[#d97706] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Submit Reservation Request</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HotelBookingForm;
