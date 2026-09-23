"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Star,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check,
  Phone,
  Sparkles,
  MapPin,
  Compass,
} from "lucide-react";
import {
  FaBinoculars,
  FaVanShuttle,
  FaUtensils,
  FaUserDoctor,
  FaShip,
  FaHotel,
  FaWhatsapp,
} from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";
import { BookingModal } from "@/components/tour/BookingModal";
import { AdminTourPackage } from "@/lib/admin-data";

export default function PackagesPage() {
  const { packages } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState("Sundarban 2 Nights 3 Days Complete Tiger Trail Expedition");
  const [selectedPrice, setSelectedPrice] = useState(4999);

  // Filter active packages
  const activePackages = packages.filter((p) => p.status !== "Draft");

  // Filter by category if selected
  const filteredPackages =
    selectedCategory === "All"
      ? activePackages
      : activePackages.filter((p) => {
        if (selectedCategory === "1 Day") return p.duration.toLowerCase().includes("1 day");
        if (selectedCategory === "2 Days") return p.duration.toLowerCase().includes("1 night") || p.duration.toLowerCase().includes("2 days");
        if (selectedCategory === "3 Days") return p.duration.toLowerCase().includes("2 nights") || p.duration.toLowerCase().includes("3 days");
        if (selectedCategory === "Resort Stay") return p.name.toLowerCase().includes("hotel") || p.name.toLowerCase().includes("resort");
        return true;
      });

  const handleOpenBooking = (pkg: AdminTourPackage) => {
    setSelectedTour(pkg.name);
    setSelectedPrice(pkg.price);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-16">
      {/* 1. Hero Banner with Dark Overlay & Breadcrumbs */}
      <div className="relative bg-black text-white py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{
            backgroundImage: `url('/assets/images/luxury-cruise.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Sundarban Tour Packages
          </h1>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            All-inclusive luxury river cruises, 5-star Hotel Sonar Bangla stays, Bengali gourmet dining, and guided tiger safari watchtower expeditions.
          </p>

          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-white">
            <Link href="/" className="text-white hover:text-secondary transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-secondary">Tour Packages</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* 2. Top Filter / Category Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Available Safari Packages ({filteredPackages.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Govt. permit assistance, experienced naturalist guides, and 100% customized private options.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "1 Day", "2 Days", "3 Days", "Resort Stay"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
              >
                {cat === "All" ? "All Packages" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Vertical Package Cards List */}
        <div className="space-y-6 md:space-y-8">
          {filteredPackages.map((pkg) => {
            const discountPercent =
              pkg.originalPrice && pkg.originalPrice > pkg.price
                ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                : 15;
            const detailHref = `/tour/${pkg.slug}`;

            return (
              <div
                key={pkg.id || pkg.slug}
                className="group bg-white rounded-xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col lg:flex-row"
              >
                {/* Left Column: Big Package Image */}
                <div className="relative w-full lg:w-[380px] xl:w-[420px] h-[260px] sm:h-[300px] lg:h-auto shrink-0 overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    unoptimized={pkg.image?.startsWith("data:")}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Left Discount Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="offer-shine-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-red-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                      <Tag className="w-3 h-3 text-white" />
                      <span>{discountPercent}% OFF</span>
                    </div>
                  </div>

                  {/* Top-Right Google Rating */}
                  <div className="absolute top-3 right-3 bg-amber-500/95 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs z-10">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{pkg.rating || 4.9}</span> Rating
                  </div>

                  {/* Bottom Gradient with Duration */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between text-white lg:hidden">
                    <span className="flex items-center gap-1.5 text-xs font-bold bg-secondary/90 text-white px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </span>
                    <span className="text-base font-extrabold text-amber-300">
                      ₹{pkg.price.toLocaleString("en-IN")} / person
                    </span>
                  </div>
                </div>

                {/* Middle Column: Detailed Information */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div>
                    {/* Duration Badge & Departure */}
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-white bg-secondary px-3 py-1 rounded-full shadow-2xs">
                        <Clock className="w-3.5 h-3.5" />
                        {pkg.duration}
                      </span>
                      {pkg.departure && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>Departure: {pkg.departure}</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors mb-2">
                      <Link href={detailHref}>{pkg.name}</Link>
                    </h3>

                    {/* Subtitle / Overview */}
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {pkg.subtitle || pkg.overview || "Experience Royal Bengal Tigers, mangrove creeks, 5-star AC accommodation, gourmet Bengali meals, and canopy watchtower safaris."}
                    </p>

                    {/* 4 Inclusions Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <FaBinoculars className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="text-xs font-semibold truncate">All Watchtowers</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <FaUtensils className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="text-xs font-semibold truncate">All Buffet Meals</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <FaVanShuttle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="text-xs font-semibold truncate">Pick &amp; Drop</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <FaUserDoctor className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="text-xs font-semibold truncate">Doctor on Call</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Highlights:</span>
                    <span className="text-[11px] font-semibold text-white bg-primary px-3 py-1 rounded-full shadow-2xs">
                      Sajnekhali &amp; Sudhanyakhali
                    </span>
                    <span className="text-[11px] font-semibold text-white bg-primary px-3 py-1 rounded-full shadow-2xs">
                      Dobanki Canopy Walk
                    </span>
                    <span className="text-[11px] font-semibold text-white bg-primary px-3 py-1 rounded-full shadow-2xs">
                      Govt Forest Permits Included
                    </span>
                  </div>
                </div>

                {/* Right Column: Pricing & CTAs */}
                <div className="p-5 sm:p-7 w-full lg:w-[260px] xl:w-[290px] shrink-0 bg-slate-50/70 flex flex-col justify-between items-start text-left lg:items-center lg:text-center">
                  <div className="w-full text-left lg:text-center">
                    <span className="text-xs text-slate-500 font-semibold block mb-1">Starting From</span>
                    <div className="flex items-baseline justify-start lg:justify-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-black text-foreground">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-slate-400 line-through font-medium">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold block mb-4">
                      Per Person (Taxes &amp; Permits Included)
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full space-y-2.5 ">
                    <button
                      onClick={() => handleOpenBooking(pkg)}
                      className="btn btn-secondary w-full cursor-pointer text-sm!"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <Link
                      href={detailHref}
                      className="btn btn-outline w-full cursor-pointer text-sm!"
                    >
                      <span>View Day Plan &amp; Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/917001403498?text=${encodeURIComponent(`Hi, I would like to inquire about the ${pkg.name} package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold pt-1 transition-colors"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Bottom Support / Assurance Banner */}
        <div className="mt-8 md:mt-16 bg-brand-green-dark rounded-xl p-4 sm:p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-wide block mb-1">
              Need A Customized Private Charter?
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Plan Your Dream Sundarban Tour With Our Cruise Concierge
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Family trips, corporate getaways, photography groups, or private honeymoon charters with customized pickup timings from Kolkata.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:+917001403498"
              className="btn btn-secondary w-full sm:w-auto cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+91 70014 03498</span>
            </a>
            <Link
              href="/contact"
              className="btn btn-outline !text-white !border-white/40 hover:!border-secondary w-full sm:w-auto cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedTour}
        pricePerPerson={selectedPrice}
      />
    </main>
  );
}
