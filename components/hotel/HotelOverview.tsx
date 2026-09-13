"use client";

import React from "react";
import HotelTourBookingForm from "./HotelTourBookingForm";

export function HotelOverview() {
  return (
    <section className="py-8 md:py-16 bg-slate-50/60 text-[#0f172a] border-b border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="sec-header max-w-3xl mx-auto text-center mb-10">
          <p className="sec-tagline mb-1">Luxury Wilderness Stay & Safaris</p>
          <h2 className="sec-title mb-3">
            Book Sundarban Tour Packages With Hotel Sonar Bangla
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Combine pristine mangrove boat safaris with 5-star riverfront luxury. Select your custom all-inclusive tour package, travel date, and preferred suites below for instant reservation quotes.
          </p>
        </div>

        {/* Tour Package Selection & Booking Form Container */}
        <div className=" mx-auto">
          <HotelTourBookingForm />
        </div>
      </div>
    </section>
  );
}

export default HotelOverview;
