"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  MapPin,
  ExternalLink,
  AlertCircle,
  Check,
  Mail,
  User,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateSubject,
  validateMessage,
  validateContactInquiry,
} from "@/lib/validation";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "2N/3D Tiger Trail Safari Inquiry",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  }>({});

  const [touched, setTouched] = useState<{
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    subject?: boolean;
    message?: boolean;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [hotlineInfo, setHotlineInfo] = useState({
    phone: "+91 70014 03498",
    whatsapp: "917001403498",
    addressSummary:
      "📍 Sundarban Luxury Package, Dulki, Gosaba, South 24 Parganas, West Bengal 743370. Pickups available from Kolkata Airport & Howrah Railway Station.",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Sundarban+Luxury+Package,+Dulki,+Gosaba,+West+Bengal+743370&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.generalInfo) {
          const g = data.generalInfo;
          const cleanWa = (g.whatsappNumber || "").replace(/[^0-9]/g, "");
          setHotlineInfo({
            phone: g.emergencyHotline || g.helpdeskPhone || "+91 70014 03498",
            whatsapp: cleanWa || "917001403498",
            addressSummary: g.mainAddress
              ? `📍 Office / Departure: ${g.mainAddress}. Pickups available from Kolkata Airport & Howrah Railway Station.`
              : "📍 Sundarban Luxury Package, Dulki, Gosaba, South 24 Parganas, West Bengal 743370. Pickups available from Kolkata Airport & Howrah Railway Station.",
            mapEmbedUrl:
              g.googleMapEmbedUrl ||
              "https://maps.google.com/maps?q=Sundarban+Luxury+Package,+Dulki,+Gosaba,+West+Bengal+743370&t=&z=15&ie=UTF8&iwloc=&output=embed",
            mapLink: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
          });
        }
      })
      .catch(() => {});
  }, []);

  // Real-time Field Validation Handlers
  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // If the user has already touched this field, validate on typing to clear errors immediately
    if (touched[field as keyof typeof touched]) {
      validateField(field, value);
    }
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    let err: string | null = null;
    switch (field) {
      case "fullName":
        err = validateName(value);
        break;
      case "email":
        err = validateEmail(value);
        break;
      case "phone":
        err = validatePhone(value);
        break;
      case "subject":
        err = validateSubject(value);
        break;
      case "message":
        err = validateMessage(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: err || undefined }));
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    // Run client-side validation
    const validation = validateContactInquiry({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    if (!validation.isValid) {
      setErrors({
        fullName: validation.errors.name,
        email: validation.errors.email,
        phone: validation.errors.phone,
        subject: validation.errors.subject,
        message: validation.errors.message,
      });
      const firstErrorMessage =
        Object.values(validation.errors)[0] ||
        "Please correct the highlighted errors in the form.";
      setErrorMessage(firstErrorMessage);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || "Sundarban Luxury Website Inquiry",
          message: formData.message.trim(),
          source: "Contact Form",
          honeypot: formData.honeypot,
        }),
      });

      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result?.error ||
            "Unable to submit inquiry. Please check your inputs or reach our helpline."
        );
      }
    } catch (err) {
      setErrorMessage(
        "Network connection error. Please try again or call our 24/7 cruise master directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Validated Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-sm bg-[#f9fafb] border border-emerald-100/80 p-5 sm:p-7 md:p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                Reach Our Travel Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                Get In Touch
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Have a question regarding safari dates, resort amenities, or custom group packages? Send us a message and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 px-6 text-center rounded-sm bg-white border border-emerald-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#064e3b] flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  Thank you, <span className="font-semibold text-[#0f172a]">{formData.fullName || "Guest"}</span>. We have received your verified inquiry and will contact you via phone or email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      subject: "2N/3D Tiger Trail Safari Inquiry",
                      message: "",
                      honeypot: "",
                    });
                    setErrors({});
                    setTouched({});
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#064e3b] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d97706] transition-colors cursor-pointer shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot Anti-Spam field hidden from real humans */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.honeypot}
                    onChange={(e) => handleChange("honeypot", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Full Name</span>
                        <span className="text-[#d97706]">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Robert Williams"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        className={`w-full rounded-sm border px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                          touched.fullName && errors.fullName
                            ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                            : touched.fullName && !errors.fullName && formData.fullName.trim()
                            ? "border-emerald-400 bg-emerald-50/10 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                            : "border-slate-200 bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                        }`}
                      />
                      {touched.fullName && !errors.fullName && formData.fullName.trim().length >= 2 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Email Address</span>
                        <span className="text-[#d97706]">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="robert@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`w-full rounded-sm border px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                          touched.email && errors.email
                            ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                            : touched.email && !errors.email && formData.email.trim()
                            ? "border-emerald-400 bg-emerald-50/10 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                            : "border-slate-200 bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                        }`}
                      />
                      {touched.email && !errors.email && formData.email.includes("@") && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>Phone / WhatsApp</span>
                        <span className="text-[#d97706]">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className={`w-full rounded-sm border px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
                          touched.phone && errors.phone
                            ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                            : touched.phone && !errors.phone && formData.phone.trim().length >= 10
                            ? "border-emerald-400 bg-emerald-50/10 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                            : "border-slate-200 bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                        }`}
                      />
                      {touched.phone && !errors.phone && formData.phone.trim().length >= 10 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {touched.phone && errors.phone ? (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-400">
                        Include country code if international (e.g. +91)
                      </p>
                    )}
                  </div>

                  {/* Subject Dropdown / Preset */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                        <span>Inquiry Type / Subject</span>
                      </span>
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      className="w-full rounded-sm border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 transition-all cursor-pointer"
                    >
                      <option value="2N/3D Tiger Trail Safari Inquiry">
                        2N/3D Tiger Trail Luxury Cruise
                      </option>
                      <option value="1N/2D Mangrove Explorer Cruise">
                        1N/2D Mangrove Explorer Cruise
                      </option>
                      <option value="Hotel Sonar Bangla Resort Stay Booking">
                        Hotel Sonar Bangla 5-Star Resort Stay
                      </option>
                      <option value="Private Houseboat Charter Request">
                        Private Luxury Houseboat Charter
                      </option>
                      <option value="Corporate / Group Tour Package">
                        Custom Corporate / Family Group Tour
                      </option>
                      <option value="General Travel Inquiry">
                        General Travel Inquiry / Other
                      </option>
                    </select>
                    {touched.subject && errors.subject && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field with Character Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Your Message / Requirements</span>
                      <span className="text-[#d97706]">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.message.trim().length > 2000
                          ? "text-rose-600 font-bold"
                          : formData.message.trim().length >= 10
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      {formData.message.trim().length} / 2000 chars (min. 10)
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="Please tell us your preferred travel dates, number of guests, pickup location, or any special requests (dietary, senior citizen, photography)..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      className={`w-full rounded-sm border px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all resize-none ${
                        touched.message && errors.message
                          ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                          : touched.message && !errors.message && formData.message.trim().length >= 10
                          ? "border-emerald-400 bg-emerald-50/10 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                          : "border-slate-200 bg-white focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
                      }`}
                    />
                  </div>
                  {touched.message && errors.message && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Server Error Alert Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-primary hover:bg-secondary text-white py-4 px-8 font-bold text-base shadow-sm transition-all duration-300 group disabled:opacity-75 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending Inquiry...
                    </span>
                  ) : (
                    <>
                      <span>Send Verified Message</span>
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
                <div className="flex flex-wrap items-center gap-2 text-[#0f172a] font-bold text-base md:text-lg">
                  <MapPin className="w-5 h-5 text-[#d97706]" />
                  <span>Departure &amp; Office Location</span>
                </div>
                <a
                  href={hotlineInfo.mapLink || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-secondary flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Styled Google Maps Iframe */}
              <div className="relative w-full h-[250px] rounded-sm overflow-hidden border border-slate-200/80 shadow-inner">
                <iframe
                  title="Sundarban Luxury Package Location Map"
                  src={
                    hotlineInfo.mapEmbedUrl ||
                    "https://maps.google.com/maps?q=Sundarban+Luxury+Package,+Dulki,+Gosaba,+West+Bengal+743370&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  }
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
                {hotlineInfo.addressSummary}
              </p>
            </div>

            {/* Direct WhatsApp & Hotline Badge */}
            <div className="rounded-sm bg-brand-green-dark p-4 md:p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/20 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#fbbf24]" />
                <span>24/7 Cruise Hotline</span>
              </h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Need immediate assistance or booking confirmation for upcoming departures? Connect directly with our on-duty cruise master.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${hotlineInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#064e3b] hover:bg-[#d97706] text-white py-3 px-4 font-bold text-sm transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>{hotlineInfo.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${hotlineInfo.whatsapp}`}
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
