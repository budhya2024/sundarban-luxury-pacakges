"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  UserCheck,
  ArrowRight,
  Bed,
  Utensils,
  ShieldCheck,
  Lock,
  Ship,
  Car,
  Camera,
  Stethoscope,
} from "lucide-react";

const tripAmenities = [
  {
    icon: Bed,
    title: "ACCOMMODATION",
    description: "We provide the best accommodation facility",
    bgClass: "bg-emerald-50/90 hover:bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: Utensils,
    title: "GOOD FOOD",
    description: "We provide the best kind of Bengali food",
    bgClass: "bg-amber-50/90 hover:bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "SAFETY",
    description: "Your safety is our most priority job here",
    bgClass: "bg-blue-50/90 hover:bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: Lock,
    title: "PRIVACY",
    description: "We know the value of the privacy of our visitors",
    bgClass: "bg-purple-50/90 hover:bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    icon: Ship,
    title: "HOUSE BOAT",
    description: "You will get best boating experience",
    bgClass: "bg-teal-50/90 hover:bg-teal-100",
    iconColor: "text-teal-700",
  },
  {
    icon: Car,
    title: "PICKUP & DROP",
    description: "We also provide efficient pickup & drop service",
    bgClass: "bg-orange-50/90 hover:bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    icon: Camera,
    title: "SIGHTSEEING",
    description: "Make your experience memorable here",
    bgClass: "bg-yellow-50/90 hover:bg-yellow-100",
    iconColor: "text-yellow-700",
  },
  {
    icon: Stethoscope,
    title: "DOCTOR ON CALL",
    description: "Emergency doctor call available anytime",
    bgClass: "bg-rose-50/90 hover:bg-rose-100",
    iconColor: "text-rose-700",
  },
];

export function PlanTripSection() {
  return (
    <section className="py-8 md:py-16 relative overflow-hidden " >
      <div className="container">
        {/* Top Split Section: Organic Image Collage + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-6 md:mb-10">
          {/* Left Column: Clean Single Image Box */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/assets/images/plan-trips.png"
                alt="Plan Your Sundarban Luxury Safari Trip"
                width={800}
                height={800}
                className="object-cover w-full h-auto "
                priority
              />

            </div>
          </div>

          {/* Right Column: Heading, Description & Features */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            {/* Tagline */}
            <p className="sec-tagline text-left">
              Let's Go Together
            </p>

            {/* Bold Title */}
            <h2 className="sec-title text-left mb-4">
              Plan Your Trip <br />
              With Us
            </h2>

            {/* Description Text */}
            <p className="sec-desc text-left !mx-0 mb-8 font-normal">
              Immerse yourself in an unforgettable Sundarban wilderness journey with our curated luxury safari packages, premium resort stays, and expert local naturalists.
            </p>

            {/* Features List */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Feature 1: Exclusive Trip */}
              <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-md shadow-secondary/20">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    Exclusive Customized Trips
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Tailored 1 to 3 day luxury itineraries with private AC cruiser boats and bespoke dining.
                  </p>
                </div>
              </div>

              {/* Feature 2: Professional Guide */}
              <div className="flex items-start gap-4">
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-md shadow-secondary/20">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    Government Certified Naturalists
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Expert forest guides with decades of local experience tracking tiger movements and avian fauna.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More CTA Button */}
            <div>
              <Link
                href="/packages"
                className="btn btn-primary !px-8 !py-3.5"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 8-Item Concept Amenities Grid (No borders, individual box backgrounds) */}
        <div className="pt-2 sm:pt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {tripAmenities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center text-center p-6 sm:p-7 rounded-lg ${item.bgClass} border-0 shadow-none transition-all duration-300 group`}
                >
                  {/* Icon */}
                  <div className={`mb-3.5 ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.8]" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-extrabold text-foreground tracking-wider uppercase mb-2">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-forground font-normal leading-relaxed max-w-[210px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanTripSection;
