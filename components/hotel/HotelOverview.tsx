"use client";

import React from "react";
import HotelTourBookingForm from "./HotelTourBookingForm";

export function HotelOverview() {
  return (
    <section id="booking-form" className="py-8 md:py-16 scroll-mt-20">
      <div className="container">
        {/* Section Header */}
        <div className="sec-header max-w-3xl mx-auto text-center mb-10">
          <p className="sec-tagline mb-1">Luxury Wilderness Stay & Safaris</p>
          <h2 className="sec-title mb-3">
            Book sundarban Sonar Bangla hotel
          </h2>
          <p className="sec-desc">
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
