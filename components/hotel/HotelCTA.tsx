"use client";

import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export function HotelCTA() {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-[#0f172a] border-t border-slate-200/80">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main CTA Card */}
        <div className="relative rounded-[4px] overflow-hidden bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#052e16] text-white p-8 sm:p-12 md:p-14 shadow-2xl border border-amber-500/20">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#064e3b]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-amber-500/15 border border-amber-500/30 text-[#fbbf24] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Resort Booking Benefit</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Plan Your Luxury Sundarban Getaway with Hotel Sonar Bangla
              </h2>

              <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-xl">
                Need customized safari dates, corporate retreats, or family suites? Speak with our Sundarban luxury travel specialists for instant quotes and guaranteed best rates.
              </p>

              {/* Badges / Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-2.5 rounded-[4px] bg-white/10 border border-white/20 text-center">
                  <ShieldCheck className="w-5 h-5 mx-auto text-[#fbbf24] mb-1" />
                  <span className="text-[11px] font-semibold text-white block">Best Rate Guarantee</span>
                </div>
                <div className="p-2.5 rounded-[4px] bg-white/10 border border-white/20 text-center">
                  <CalendarCheck className="w-5 h-5 mx-auto text-[#fbbf24] mb-1" />
                  <span className="text-[11px] font-semibold text-white block">Flexible Dates</span>
                </div>
                <div className="p-2.5 rounded-[4px] bg-white/10 border border-white/20 text-center">
                  <Award className="w-5 h-5 mx-auto text-[#fbbf24] mb-1" />
                  <span className="text-[11px] font-semibold text-white block">5-Star River Resort</span>
                </div>
                <div className="p-2.5 rounded-[4px] bg-white/10 border border-white/20 text-center">
                  <Clock className="w-5 h-5 mx-auto text-[#fbbf24] mb-1" />
                  <span className="text-[11px] font-semibold text-white block">24/7 Concierge</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4 w-full">
              <div className="w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-3.5 items-stretch">
                {/* Primary CTA redirecting to contact page */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm sm:text-base rounded-[4px] transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-400/40 text-center group"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Secondary WhatsApp & Phone Row */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/917001403498?text=Hi%2C%20I%20want%20to%20book%20a%20luxury%20tour%20package%20at%20Hotel%20Sonar%20Bangla%20Sundarban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#064e3b]/80 hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold rounded-[4px] border border-emerald-500/40 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+917001403498"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-[4px] border border-white/20 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-slate-200" />
                    <span>+91 70014 03498</span>
                  </a>
                </div>
              </div>

              <p className="text-slate-400 text-xs text-center lg:text-right">
                🔒 Direct reservation & zero hidden booking charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelCTA;
