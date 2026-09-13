"use client";

import React from "react";
import {
  Waves,
  Utensils,
  Ship,
  Sparkles,
  Music,
  Zap,
  Users2,
  Trees,
} from "lucide-react";

export interface AmenityCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const amenities: AmenityCard[] = [
  {
    icon: Waves,
    title: "Infinity Swimming Pool",
    desc: "Clean open-air pool overlooking the Sundarban river view with sun deck lounges & refreshment bar.",
  },
  {
    icon: Utensils,
    title: "Riverfront Fine Dining",
    desc: "Multi-cuisine restaurant serving authentic Bengali fish thalis, Indian, Chinese, and customized buffets.",
  },
  {
    icon: Ship,
    title: "Private Cruise Jetty",
    desc: "Direct access private dock for high-speed boats, luxury vessel safaris, and island hop trips.",
  },
  {
    icon: Music,
    title: "Cultural Baul Stage",
    desc: "Traditional Bengali folk song performance and campfire nights under starry river skies.",
  },
  {
    icon: Sparkles,
    title: "Ayurvedic Spa & Herbal Care",
    desc: "Relaxing massage therapy, herbal steam baths, and holistic natural rejuvenation packages.",
  },
  {
    icon: Zap,
    title: "24/7 Solar & Silent Power",
    desc: "Uninterrupted eco-friendly solar electricity backed by heavy-duty silent generators.",
  },
  {
    icon: Users2,
    title: "Banquet & Conference Hall",
    desc: "Fully equipped AC corporate hall for up to 150 guests, weddings, and group retreats.",
  },
  {
    icon: Trees,
    title: "Lush Lawn & Children's Park",
    desc: "Manicured green gardens, tea lounge gazebo, safe play zone, and badminton court.",
  },
];

export function HotelAmenities() {
  return (
    <section id="amenities" className="py-8 md:py-16 bg-[#fef8e2] text-[#0f172a] border-b border-amber-100/80">
      <div className="container">
        {/* Section Title */}
        <div className="sec-header">
          <p className="sec-tagline">
            World-Class Resort Facilities
          </p>
          <h2 className="sec-title">
            5-Star Resort Amenities
          </h2>
          <p className="sec-desc">
            Designed to pamper every guest with supreme relaxation, cultural entertainment, and eco-sustainable luxury.
          </p>
        </div>

        {/* 4x2 Grid of Amenity Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6  bg-slate-50 border border-slate-200/80 hover:bg-amber-50/50 hover:border-amber-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#064e3b] text-white group-hover:bg-[#d97706] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#064e3b] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HotelAmenities;
