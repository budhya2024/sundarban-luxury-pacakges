import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Sundarban Luxury Package",
  description:
    "Learn how Sundarban Luxury Package protects your personal information, booking data, and forest entry permit identification.",
};

export default function PrivacyPolicyPage() {
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

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-4">
            Privacy Policy
          </h1>


          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white flex-wrap justify-center">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24]">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Main Content Area - Full Width Centered Layout Without Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200  p-6 sm:p-10 shadow-sm space-y-10">
            {/* Privacy Summary Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4  bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-[#064e3b]" />
                Last Updated: September 2026
              </span>
              <span className="text-[#064e3b] font-bold">100% GDPR &amp; IT Act Compliant</span>
            </div>

            {/* Section 1 */}
            <div id="data-collection" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Information We Collect
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When you visit our website, submit a tour reservation form, or contact our team via WhatsApp or telephone, we may collect the following categories of information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] uppercase tracking-wider mb-1">
                    Contact Information
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full name, email address, mobile phone number, WhatsApp contact number, and city of residence.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] uppercase tracking-wider mb-1">
                    Travel Preferences
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Preferred tour package (1N2D, 2N3D, 3N4D), room category, number of adults/children, dietary preferences (Veg, Non-Veg, Jain), and transfer choice.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] uppercase tracking-wider mb-1">
                    Government ID Documentation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For West Bengal Forest Department permits: Full legal name, nationality, age, gender, and government ID number (Aadhaar, Passport, Voter ID).
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] uppercase tracking-wider mb-1">
                    Technical &amp; Analytics Data
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    IP address, device browser type, page visit analytics, and referral source used strictly to optimize site speed and performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="how-we-use" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                How We Use Your Data
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Your information is utilized solely for providing luxury travel and hospitality services:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>Processing Tour Reservations:</strong> Confirming luxury suite allocations at Hotel Sonar Bangla and securing dedicated safari boats.
                </li>
                <li>
                  <strong>Forest Department Safari Clearances:</strong> Submitting passenger manifests to Sajnekhali and Godkhali Forest Offices for mandatory entry watchtower permits.
                </li>
                <li>
                  <strong>Direct Concierge Updates:</strong> Sending booking confirmations, itinerary schedules, pickup vehicle driver details, and live weather alerts via WhatsApp, SMS, or Email.
                </li>
                <li>
                  <strong>Safety &amp; Emergency Coordination:</strong> Maintaining passenger logs on board for Maritime and Coast Guard safety regulations.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="forest-permits" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                National Park Permit Protocols
              </h2>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-[#0f172a] space-y-2">
                <p className="font-semibold text-[#064e3b]">
                  Sundarban Tiger Reserve requires verified identity verification for all Indian and foreign nationals entering the mangrove waterways.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Identity documents collected for permit clearance are transmitted exclusively to the authorized Forest Range Officers at Sajnekhali and Godkhali. These records are encrypted and automatically deleted from our operational booking servers 30 days after the conclusion of your safari tour.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div id="payment-security" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                Payment &amp; SSL Security
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We use bank-grade 256-bit Secure Socket Layer (SSL) encryption across all booking portals and forms.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>No Stored Financial Credentials:</strong> We do not store, view, or process credit card numbers, CVVs, or Net Banking passwords on our servers.
                </li>
                <li>
                  <strong>RBI-Compliant Gateways:</strong> All payment transactions are handled through licensed, PCI-DSS compliant Indian payment aggregators (Razorpay / Cashfree / Stripe).
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="third-parties" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  5
                </span>
                Third-Party Sharing Rules
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We do not sell, rent, or trade your personal information. We only share relevant booking details with verified operational partners strictly necessary to conduct your trip:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0f172a]">Hotel Sonar Bangla</h5>
                  <p className="text-xs text-slate-600 mt-0.5">Guest names and dates for resort room key check-in.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0f172a]">Forest Department</h5>
                  <p className="text-xs text-slate-600 mt-0.5">Permit verification for wildlife core watchtower access.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0f172a]">Licensed Transport Chauffeur</h5>
                  <p className="text-xs text-slate-600 mt-0.5">Phone number and Kolkata pickup address for AC transfer.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0f172a]">Boat Master &amp; Naturalist</h5>
                  <p className="text-xs text-slate-600 mt-0.5">Passenger headcount and dietary requirements manifest.</p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div id="user-rights" className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2.5">
                <span className="w-7 h-7  bg-primary text-white text-xs flex items-center justify-center font-bold">
                  6
                </span>
                Your Rights &amp; Data Deletion
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                You have full ownership of your data. At any time, you may request:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                <li>A copy of all personal information stored in our reservation database.</li>
                <li>Correction of any inaccurate contact or travel details.</li>
                <li>Permanent deletion of your contact profile and booking history.</li>
                <li>Opting out of promotional newsletters or seasonal safari updates.</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                To exercise any of these rights, email our data team at{" "}
                <a href="mailto:sundarbanluxurypackage@gmail.com" className="text-[#064e3b] font-semibold underline">
                  sundarbanluxurypackage@gmail.com
                </a>{" "}
                with your booking reference.
              </p>
            </div>

            {/* Contact Footer Box */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#052e16] to-[#064e3b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">
                  Questions About Privacy or Data Security?
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  Our Data Protection Officer is ready to assist you.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  Contact Privacy Team
                </Link>
                <a
                  href="tel:+917001403498"
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors border border-white/20"
                >
                  Call Helpline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
