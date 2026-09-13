"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-sm bg-[#f9fafb] border border-emerald-100/80 p-6 sm:p-10 shadow-sm">
            <div className="mb-8">

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                Get In Touch With Us
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Have a question or feedback? Send us a message and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-6 text-center rounded-sm bg-white border border-emerald-200 shadow-sm animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#064e3b] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  Thank you, <span className="font-semibold text-[#0f172a]">{formData.fullName || "Guest"}</span>. We have received your message and will reply via email or phone as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#064e3b] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d97706] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                      Full Name <span className="text-[#d97706]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Williams"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#064e3b] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                      Email Address <span className="text-[#d97706]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#064e3b] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                      Phone / WhatsApp <span className="text-[#d97706]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#064e3b] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#064e3b] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">
                    Your Message <span className="text-[#d97706]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#064e3b] focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-[#064e3b] hover:bg-[#d97706] text-white py-4 px-8 font-bold text-base shadow-md hover:shadow-lg transition-all duration-300 group disabled:opacity-75 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Map & Quick Helpline Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Interactive Map Frame Card */}
            <div className="rounded-sm bg-white border border-slate-100 p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#0f172a] font-bold text-lg">
                  <MapPin className="w-5 h-5 text-[#d97706]" />
                  <span>Departure & Office Location</span>
                </div>

              </div>

              {/* Styled Google Maps Iframe */}
              <div className="relative w-full h-[250px] rounded-sm overflow-hidden border border-slate-200/80 shadow-inner">
                <iframe
                  title="Sundarban Luxury Departure Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202029704!2d88.750000!3d22.250000!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0029efb7bb6f71%3A0x7d6f51fbc102bc45!2sSundarbans!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.05]"
                />
              </div>

              <p className="text-xs text-slate-500 mt-3 font-normal">
                📍 Primary luxury cruise departure point at Godkhali Ghat. Pickups available from Kolkata Airport & Howrah Railway Station.
              </p>
            </div>

            {/* Direct WhatsApp & Hotline Badge */}
            <div className="rounded-sm bg-gradient-to-br from-[#0f172a] to-[#052e16] p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/20 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#fbbf24]" />
                <span>24/7 Cruise Hotline</span>
              </h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Need immediate assistance or booking confirmation for tomorrow&apos;s departure? Connect directly with our on-duty cruise master.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#064e3b] hover:bg-[#d97706] text-white py-3 px-4 font-bold text-sm transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#25d366] hover:bg-[#20bd5a] text-white py-3 px-4 font-bold text-sm transition-colors shadow-md"
                >
                  <FaWhatsapp className="w-4.5 h-4.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;
