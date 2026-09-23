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
    <section id="amenities" className="py-8 md:py-16 bg-secondary/5 text-[#0f172a] ">
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
                className="p-3 md:p-6  rounded-xl bg-white hover:shadow-sm border transition-all duration-300 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-primary text-white  group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-forground mb-2  transition-colors">
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
