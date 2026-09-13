"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, UserCheck, ArrowRight } from "lucide-react";

export function PlanTripSection() {
  return (
    <section className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Unique 3-Image Organic Collage */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
            {/* 1. Left Tall Arched Image */}
            <div className="relative w-[180px] sm:w-[240px] md:w-[260px] lg:w-[270px] xl:w-[290px] h-[360px] sm:h-[460px] md:h-[500px] lg:h-[520px] rounded-t-full rounded-b-[40px] overflow-hidden bg-zinc-100 shadow-md group">
              <Image
                src="/assets/images/royal-bengal-tiger.jpg"
                alt="Royal Bengal Tiger in Sundarban Mangrove"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* 2 & 3. Right Stacked Curved Images */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Top Boat Safari Image */}
              <div className="relative w-[140px] sm:w-[190px] md:w-[220px] lg:w-[230px] xl:w-[245px] h-[170px] sm:h-[220px] md:h-[240px] lg:h-[245px] rounded-t-full rounded-bl-full rounded-br-2xl overflow-hidden bg-zinc-100 shadow-md group">
                <Image
                  src="/assets/images/boat-safari.jpg"
                  alt="Luxury Boat Safari on Sundarban Waterways"
                  fill
                  sizes="(max-width: 640px) 40vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Bottom Mangrove Image */}
              <div className="relative w-[140px] sm:w-[190px] md:w-[220px] lg:w-[230px] xl:w-[245px] h-[170px] sm:h-[220px] md:h-[240px] lg:h-[245px] rounded-b-full rounded-tl-full rounded-tr-2xl overflow-hidden bg-zinc-100 shadow-md group">
                <Image
                  src="/assets/sonarbanglahotel.jpg"
                  alt="Hotel Sonar Bangla Sundarban Resort"
                  fill
                  sizes="(max-width: 640px) 40vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Description & Features */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            {/* Montez Subtitle */}
            <p className="font-montez text-3xl md:text-4xl text-[#d97706] tracking-wide mb-1">
              Let's Go Together
            </p>

            {/* Bold Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
              Plan Your Trip <br />
              With us
            </h2>

            {/* Description Text */}
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-8 font-normal">
              There are many variations of passages of available but the majority have
              suffered alteration in some form, by injected hum randomised words which
              don't look even slightly.
            </p>

            {/* Features List */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Feature 1: Exclusive Trip */}
              <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-md shadow-[#064e3b]/20">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-0.5">
                    Exclusive Trip
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    There are many variations of passages of available but the
                    majority.
                  </p>
                </div>
              </div>

              {/* Feature 2: Professional Guide */}
              <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-md shadow-[#064e3b]/20">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-0.5">
                    Professional Guide
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    There are many variations of passages of available but the
                    majority.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More CTA Button */}
            <div>
              <Link
                href="/tour-details"
                className="btn btn-primary !px-8 !py-3.5"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanTripSection;
