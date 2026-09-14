import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  RotateCcw,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sundarban Luxury Package",
  description:
    "Review our terms and conditions, safari booking rules, cancellation policies, and national park safety guidelines for Sundarban luxury tours.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfe] text-[#0f172a]">
      {/* Hero Header */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Dark Black Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000')`,
          }}
        />

        {/* Deep Black Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-montez text-3xl sm:text-4xl text-[#fbbf24] tracking-wide mb-2">
            Legal &amp; Policies
          </p>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-4">
            Terms and Conditions
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-lg font-light leading-relaxed mb-6 drop-shadow-sm">
            Please read these terms carefully before booking your Sundarban luxury river cruise and resort stay.
          </p>

          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white flex-wrap justify-center">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24]">Terms &amp; Conditions</span>
          </div>
        </div>
      </section>

      {/* Main Content Area - Full Width Centered Layout Without Table of Contents */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200  p-6 sm:p-10 shadow-sm space-y-10">
            {/* Last Updated Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4  bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-[#064e3b]" />
                Last Updated: September 2026
              </span>
              <span className="text-[#064e3b] font-bold">Valid for all 2025–2026 Safaris</span>
            </div>

            {/* Section 1 */}
            <div id="acceptance" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Acceptance of Terms
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                By accessing, browsing, or booking tour packages through Sundarban Luxury Package, you agree to be bound by these terms and conditions. These terms apply to all visitors, guests, and travelers who book luxury river safari cruises, private resort stays (including Hotel Sonar Bangla), customized photography expeditions, or transfer services.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                If you are booking on behalf of a group or family, you confirm that you have the authority to accept these terms on behalf of all participants in your party.
              </p>
            </div>

            {/* Section 2 */}
            <div id="booking-pricing" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Booking, Payments &amp; Pricing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                All tour package prices quoted on our website are inclusive of AC safari boat transportation, government forest watchtower entry permits, licensed naturalist guide fees, all buffet meals (breakfast, lunch, evening snacks, dinner), and resort accommodation as specified in your booking voucher.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>Zero Advance Booking Fee:</strong> Instant reservation inquiries and quotes require zero advance payment until our travel specialist verifies suite availability and sends your official booking voucher.
                </li>
                <li>
                  <strong>Confirmation Deposit:</strong> To finalize reservation of private luxury suites or boat charters during peak season (October to March), a 25% confirmation deposit is required.
                </li>
                <li>
                  <strong>Payment Methods:</strong> We accept all major Indian &amp; International cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and direct bank transfers.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="cancellation-refund" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Cancellation &amp; 100% Refund Policy
              </h2>
              <div className="p-4 bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base mb-1">
                  <RotateCcw className="w-4 h-4 text-[#d97706]" />
                  <span>Free Cancellation Up to 48 Hours Prior</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  We understand that travel plans can change unexpectedly. Cancel your booking up to 48 hours before the scheduled departure date to receive a 100% full refund with zero cancellation penalty.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>48+ Hours Before Check-in:</strong> 100% Full Refund credited to original payment source within 3–5 business days.
                </li>
                <li>
                  <strong>24 to 48 Hours Before Check-in:</strong> 50% Refund or free date rescheduling to any date within 6 months.
                </li>
                <li>
                  <strong>Less than 24 Hours or No-Show:</strong> No refund applicable due to pre-purchased forest permits and dedicated boat chef provisioning.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="wildlife-forest-rules" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  4
                </span>
                Forest Dept. &amp; National Park Regulations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The Sundarban Biosphere Reserve and Tiger Reserve are strictly governed by the Directorate of Forests, Government of West Bengal. All travelers must strictly abide by the following environmental and safety mandates:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] mb-1">Strict Plastic Ban</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Single-use plastic bottles, packets, and wrappers are strictly banned inside the core reserve creeks.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] mb-1">Government ID Mandatory</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every adult must carry original government photo ID (Aadhaar, Passport, Voter ID) for entry checkpoint verification.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] mb-1">No Disembarkation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stepping onto mudflats or riverbanks outside authorized fenced watchtowers is strictly illegal and dangerous.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] mb-1">Noise Control &amp; Music</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Loudspeakers, high-decibel music, and drones are strictly prohibited to preserve tranquil wildlife habitats.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div id="safety-insurance" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  5
                </span>
                Boat Safety, Life Jackets &amp; Liability
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                All our luxury safari vessels are fully certified by the Inland Waterways Authority and inspected biannually. Every vessel is equipped with marine-grade life jackets for all passengers (including infants and children), life buoys, first-aid response kits, and GPS tracking.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                While our experienced vessel masters take all precautionary measures, travelers are advised to purchase comprehensive domestic travel insurance covering baggage loss, flight delays, and personal medical emergencies.
              </p>
            </div>

            {/* Section 6 */}
            <div id="force-majeure" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  6
                </span>
                Weather, Tidal Conditions &amp; Force Majeure
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The Sundarbans experience semi-diurnal tides with water levels fluctuating up to 4 meters twice a day. In the event of extreme weather alerts issued by the India Meteorological Department (IMD) or tidal closures by Port authorities, safari schedules may be modified for passenger safety.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In case of forced cancellations due to natural disasters or administrative closures, guests will be offered complimentary rescheduling to any available date or a 100% refund voucher.
              </p>
            </div>

            {/* Section 7 */}
            <div id="jurisdiction" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-[#064e3b] text-[#fbbf24] text-xs flex items-center justify-center font-bold">
                  7
                </span>
                Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of or in connection with our tour services shall be subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.
              </p>
            </div>

            {/* Contact Footer Box */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#052e16] to-[#064e3b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">
                  Have Questions About Our Policies?
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  Our concierge team is available round-the-clock for assistance.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  Contact Support
                </Link>
                <a
                  href="tel:+917001403498"
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors border border-white/20"
                >
                  Call Concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
