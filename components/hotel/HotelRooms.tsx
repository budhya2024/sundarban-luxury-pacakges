"use client";

import React from "react";
import Image from "next/image";
import { Users, Maximize2, BedDouble, Check, ArrowRight } from "lucide-react";

export interface RoomCategory {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  capacity: string;
  bed: string;
  size: string;
  view: string;
  image: string;
  amenities: string[];
}

const roomsData: RoomCategory[] = [
  {
    id: "deluxe-ac",
    name: "Deluxe AC River View Room",
    subtitle: "Ideal for couples & solo travelers seeking serene water views",
    price: "₹3,800",
    capacity: "2 Adults + 1 Child",
    bed: "King Size Bed",
    size: "320 sq.ft",
    view: "Riverside Garden View",
    image: "/assets/images/sonar-bangla-hotel-deluxe.jpg",
    amenities: ["Air Conditioning", "Private Balcony", "Free Wi-Fi", "Complimentary Breakfast", "24/7 Hot Water", "Smart LED TV"],
  },
  {
    id: "executive-suite",
    name: "Executive Royal Suite",
    subtitle: "Spacious suite featuring panoramic riverfront view balcony",
    price: "₹5,500",
    capacity: "2 Adults + 2 Children",
    bed: "Super King Bed",
    size: "480 sq.ft",
    view: "180° Panoramic Riverfront",
    image: "/assets/images/sonar-bangla-hotel-balcony.webp",
    amenities: ["Panoramic Balcony", "Mini Refrigerator", "Tea/Coffee Maker", "Premium Toiletries", "Express Room Service", "Wi-Fi & Breakfast"],
  },
  {
    id: "heritage-villa",
    name: "Heritage Wooden Villa",
    subtitle: "Independent eco-cottage crafted with eco teak wood and private deck",
    price: "₹7,200",
    capacity: "3 Adults or 2+2",
    bed: "Royal Canopy Bed",
    size: "560 sq.ft",
    view: "Jungle & Estuary View",
    image: "/assets/images/sonar-bangla-hotel-cottage.webp",
    amenities: ["Private Wooden Deck", "Personal Sun Lounge", "VIP Check-in", "Luxury Bathtub", "Customized Evening Snacks", "Free Speedboat Transfer"],
  },
  {
    id: "family-cottage",
    name: "Family Presidential Cottage",
    subtitle: "Double bedroom villa with exclusive living lounge & garden deck",
    price: "₹8,900",
    capacity: "4-6 Guests",
    bed: "2 King Size Beds",
    size: "750 sq.ft",
    view: "Exclusive Waterfront Lawn",
    image: "/assets/images/sonarbanglahotel.jpg",
    amenities: ["2 Attached Bedrooms", "Private Living Room", "Dedicated Butler Service", "Complimentary Dinner Thali", "Late Check-out", "All Inclusive"],
  },
];

export function HotelRooms() {
  return (
    <section id="rooms" className="py-8 md:py-16 bg-slate-50 text-[#0f172a]">
      <div className="container">
        {/* Section Header */}
        <div className="sec-header max-w-2xl mx-auto mb-14">
          <span className="sec-tagline">
            Accommodations & Suites
          </span>
          <h2 className="sec-title">
            Luxury Rooms & Villa Suites
          </h2>
          <p className="sec-desc">
            Designed for supreme comfort with riverfront views, high-end amenities, and warm eco-friendly interiors.
          </p>
        </div>

        {/* 2x2 Grid of Rooms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="bg-white  border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image & Price Tag Header */}
              <div className="relative w-full h-[260px] sm:h-[300px] bg-slate-100 overflow-hidden group">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#064e3b] text-white px-4 py-2 rounded-sm shadow-md border border-amber-400/30">
                  <span className="text-lg font-black text-[#fbbf24]">{room.price}</span>
                  <span className="text-xs font-normal text-slate-300"> / Night</span>
                </div>

                {/* View Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-sm border border-white/20">
                  {room.view}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-5">
                    {room.subtitle}
                  </p>

                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-sm bg-slate-100/80 text-xs font-semibold text-slate-700 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#d97706]" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-[#d97706]" />
                      <span>{room.bed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-[#d97706]" />
                      <span>{room.size}</span>
                    </div>
                  </div>

                  {/* Amenities Pills */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      Room Amenities:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((am, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#d97706] flex-shrink-0" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Taxes & Breakfast Included</span>
                    <span className="text-sm font-bold text-[#064e3b]">Instant Confirmation</span>
                  </div>
                  <a
                    href="#booking-form"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#064e3b] hover:bg-[#d97706] text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    <span>Book Suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelRooms;
