"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Utensils,
  Users,
  CheckCircle2,
  XCircle,
  Briefcase,
  ChevronLeft,
  Calendar,
  PhoneCall,
  ShieldCheck,
  Star,
  Info,
  Send,
  Sparkles,
  Tag,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaAngleRight,
} from "react-icons/fa6";
import { BookingModal } from "./BookingModal";
import { useAdmin } from "@/context/AdminContext";

import { TourDayFoodMenu, TourItineraryDay } from "@/lib/admin-data";

interface TourDetailsProps {
  packageSlug?: string;
  packageName?: string;
  packageSubtitle?: string;
}

// Guaranteed static defaults for Menu Details matching exact user screenshot
const staticMenuDefaults: Record<string, TourDayFoodMenu[]> = {
  "1-day": [
    {
      dayNumber: 1,
      dayTitle: "Day 1",
      courses: [
        { courseName: "Breakfast", menuItems: "Sandwich, Sweet, Bisleri, Tea. ( only kolkata to koltaka ava.)" },
        { courseName: "Lunch", menuItems: "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna." },
        { courseName: "Evening Snacks", menuItems: "Chicken/Veg Pakora, Tea/Coffee." },
      ],
    },
  ],
  "2-days": [
    {
      dayNumber: 1,
      dayTitle: "Day 1",
      courses: [
        { courseName: "Breakfast", menuItems: "Sandwich, Sweet, Bisleri, Tea. ( only kolkata to koltaka ava.)" },
        { courseName: "Lunch", menuItems: "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna." },
        { courseName: "Evening Snacks", menuItems: "Chicken/Veg Pakora, Tea/Coffee." },
        { courseName: "Dinner", menuItems: "Fried Rice, Roti, Sabji, Chilli Chicken/Chicken Kosha, Salad." },
      ],
    },
    {
      dayNumber: 2,
      dayTitle: "Day 2",
      courses: [
        { courseName: "Breakfast", menuItems: "Bed tea, Biscuities, Puri, Chana Masala, Sweet, Tea / Coffee, Amudi Fish Fry." },
        { courseName: "Lunch", menuItems: "Rice, Dal, Fries, Sabji, Prawn Malai Curry + Fish, Chatni, Papad, Salad, Paneer/Dhoka Dalna." },
        { courseName: "Evening Snacks", menuItems: "Egg/Veg Noodles, Pakora/Veg Pakora, Salad, Tea/Coffee." },
        { courseName: "Dinner", menuItems: "Rice, Roti, Dal, Mix Veg, Mutton Kosha, Salad, Paneer Item." },
      ],
    },
  ],
  "3-days": [
    {
      dayNumber: 1,
      dayTitle: "Day 1",
      courses: [
        { courseName: "Breakfast", menuItems: "Sandwich, Sweet, Bisleri, Tea. ( only kolkata to koltaka ava.)" },
        { courseName: "Lunch", menuItems: "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna." },
        { courseName: "Evening Snacks", menuItems: "Chicken/Veg Pakora, Tea/Coffee." },
        { courseName: "Dinner", menuItems: "Fried Rice, Roti, Sabji, Chilli Chicken/Chicken Kosha, Salad." },
      ],
    },
    {
      dayNumber: 2,
      dayTitle: "Day 2",
      courses: [
        { courseName: "Breakfast", menuItems: "Bed tea, Biscuities, Puri, Chana Masala, Sweet, Tea / Coffee, Amudi Fish Fry." },
        { courseName: "Lunch", menuItems: "Rice, Dal, Fries, Sabji, Prawn Malai Curry + Fish, Chatni, Papad, Salad, Paneer/Dhoka Dalna." },
        { courseName: "Evening Snacks", menuItems: "Egg/Veg Noodles, Pakora/Veg Pakora, Salad, Tea/Coffee." },
        { courseName: "Dinner", menuItems: "Rice, Roti, Dal, Mix Veg, Mutton Kosha, Salad, Paneer Item." },
      ],
    },
    {
      dayNumber: 3,
      dayTitle: "Day 3",
      courses: [
        { courseName: "Breakfast", menuItems: "Puri / Radhaballavi, Cholar Dal, Sweet, Tea / Coffee, Boiled Egg." },
        { courseName: "Lunch", menuItems: "Basmati Rice, Sona Moong Dal, Shorshe Ilish / Gold Prawn Malai Curry, Chatni, Papad, Salad, Mishti Doi." },
        { courseName: "Evening Refreshment", menuItems: "Evening Tea & Packaged Snack Box for return journey." },
      ],
    },
  ],
};

// Guaranteed static defaults for Tour Timeline
const staticItineraryDefaults: Record<string, TourItineraryDay[]> = {
  "1-day": [
    {
      dayNumber: 1,
      dayTitle: "Day 1 - Full Day Sundarban Tour",
      activities: [
        { time: "8:00 AM", title: "Pick up from kolkata", desc: "Pick up from kolkata in AC luxury vehicle and drive towards godkhali ferry ghat." },
        { time: "11:30 AM", title: "Arrive at godkhali & board cruise", desc: "Board our luxury vessel with welcome drinks. sail towards sajnekhali watchtower area." },
        { time: "1:30 PM", title: "Cruising through mangrove creek", desc: "Enjoy hot cooked bengali lunch served on boat deck while cruising through narrow forest creeks." },
        { time: "4:00 PM", title: "Sajnekhali watchtower visit", desc: "Visit sajnekhali watchtower, mangrove interpretation center, and crocodile pond with our certified guide." },
        { time: "6:00 PM", title: "Return transfer to kolkata", desc: "Board AC return vehicle for kolkata transfer." },
      ],
    },
  ],
  "2-days": [
    {
      dayNumber: 1,
      dayTitle: "Day 1 - Starting in sundarban",
      activities: [
        { time: "8:00 AM", title: "Pick up from kolkata", desc: "Pick up from kolkata in AC luxury vehicle and drive towards godkhali ferry ghat." },
        { time: "11:30 AM", title: "Arrive at godkhali & board cruise", desc: "Board our luxury vessel with welcome drinks. sail towards sajnekhali watchtower area." },
        { time: "1:30 PM", title: "Cruising through mangrove creek", desc: "Enjoy hot cooked bengali lunch served on boat deck while cruising through narrow forest creeks." },
        { time: "4:00 PM", title: "Sajnekhali watchtower visit", desc: "Visit sajnekhali watchtower, mangrove interpretation center, and crocodile pond with our certified guide." },
        { time: "6:30 PM", title: "Evening snacks & tea", desc: "Fresh evening pakora and tea served." },
        { time: "8:00 PM", title: "Folk dance show", desc: "Enjoy traditional jhumur & tribal folk dance cultural performance by local artists." },
        { time: "9:30 PM", title: "Dinner", desc: "Sumptuous dinner served at resort/cruise dining deck." },
      ],
    },
    {
      dayNumber: 2,
      dayTitle: "Day 2 - Deep forest & return",
      activities: [
        { time: "6:30 AM", title: "Early morning boat safari", desc: "Sailing through sudhanyakhali & dobanki canopy watchtowers inside deep tiger reserve core area." },
        { time: "8:30 AM", title: "Dobanki watchtower & canopy walk", desc: "Walk along the 496m elevated netted canopy walk for high-altitude wildlife viewing." },
        { time: "1:30 PM", title: "Lunch on boat", desc: "Freshly prepared lunch served on boat while returning along pirkhali & panchamukhani 5-river junction." },
        { time: "4:30 PM", title: "Return to godkhali ghat", desc: "Board AC return vehicle for kolkata transfer." },
        { time: "7:30 PM", title: "Drop off at kolkata", desc: "Reach kolkata with unforgettable memories of sundarban wildlife safari." },
      ],
    },
  ],
  "3-days": [
    {
      dayNumber: 1,
      dayTitle: "Day 1 - Starting in sundarban",
      activities: [
        { time: "8:00 AM", title: "Pick up from kolkata", desc: "Pick up from kolkata in AC luxury vehicle and drive towards godkhali ferry ghat." },
        { time: "11:30 AM", title: "Arrive at godkhali & board cruise", desc: "Board our luxury vessel with welcome drinks. sail towards sajnekhali watchtower area." },
        { time: "1:30 PM", title: "Cruising through mangrove creek", desc: "Enjoy hot cooked bengali lunch served on boat deck while cruising through narrow forest creeks." },
        { time: "4:00 PM", title: "Sajnekhali watchtower visit", desc: "Visit sajnekhali watchtower, mangrove interpretation center, and crocodile pond with our certified guide." },
        { time: "6:30 PM", title: "Evening snacks & tea", desc: "Fresh evening pakora and tea served." },
        { time: "8:00 PM", title: "Folk dance show", desc: "Enjoy traditional jhumur & tribal folk dance cultural performance by local artists." },
        { time: "9:30 PM", title: "Dinner", desc: "Sumptuous dinner served at resort/cruise dining deck." },
      ],
    },
    {
      dayNumber: 2,
      dayTitle: "Day 2 - Core reserve safari & canopy walk",
      activities: [
        { time: "6:00 AM", title: "Morning tiger safari", desc: "Dawn cruise across Pirkhali & Gazikhali narrow tiger crossings." },
        { time: "8:30 AM", title: "Dobanki watchtower & walkway", desc: "Walk the famous 0.5km canopy bridge inside heavy tiger habitat." },
        { time: "1:00 PM", title: "Buffet lunch on deck", desc: "Gold Prawn & Fish curry feast served on upper observation deck." },
        { time: "4:00 PM", title: "Panchamukhani confluence", desc: "View the confluence of 5 major delta rivers at sunset." },
        { time: "8:30 PM", title: "Gala dinner with bonfire", desc: "Traditional slow-cooked Mutton Kosha with steamed basmati rice." },
      ],
    },
    {
      dayNumber: 3,
      dayTitle: "Day 3 - Sudhanyakhali safari & return",
      activities: [
        { time: "7:00 AM", title: "Sudhanyakhali watchtower", desc: "Sweet-water pond wildlife viewing for spotted deer and wild boars." },
        { time: "12:30 PM", title: "Farewell lunch on boat", desc: "Final sumptuous lunch before disembarking at Godkhali." },
        { time: "3:30 PM", title: "Godkhali to kolkata transfer", desc: "AC coach journey back to Kolkata with drop-off by evening." },
      ],
    },
  ],
};

export function TourDetails({
  packageSlug,
  packageName = "Sundarban 1 Night 2 Days Package",
  packageSubtitle = "Prepare to discover the real beauty of the mangrove forest with our luxury adventure.",
}: TourDetailsProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Load from Admin Context
  const { packages } = useAdmin();

  // Find matching package or fallback to first package or defaults
  const currentPackage =
    packages.find(
      (p) =>
        (packageSlug && p.slug === packageSlug) ||
        (packageName && p.name.toLowerCase() === packageName.toLowerCase())
    ) || packages[0];

  // Resolve dynamic values
  const title = currentPackage?.name || packageName;
  const subtitle = currentPackage?.subtitle || packageSubtitle;
  const heroImage =
    currentPackage?.bannerImage ||
    currentPackage?.image ||
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000";
  const duration = currentPackage?.duration || "2 Days / 1 Night";
  const pickupDrop = currentPackage?.pickupDrop || "Kolkata / Canning";
  const mealsSummary = currentPackage?.mealsSummary || "6 Times Fresh Cooked";
  const minGroupSize = currentPackage?.minGroupSize || "Min 2 People";
  const price = currentPackage?.price || 2999;
  const originalPrice = currentPackage?.originalPrice || 3999;
  const overview =
    currentPackage?.overview ||
    "Sundarban 1 Night 2 Days Tour is the most popular tour package among tourists. You will experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers.";
  const highlightQuote =
    currentPackage?.highlightQuote ||
    `“${title} is the most popular tour package from Kolkata. Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”`;
  const helplinePhone = currentPackage?.helplinePhone || "+91 98765 43210";
  const rating = currentPackage?.rating || 4.9;
  const reviewsCount = currentPackage?.reviewsCount || 128;
  const category = currentPackage?.category || "Luxury Cruise";

  // Determine package duration type (1-day, 2-days, 3-days)
  const fullText = (duration + " " + title + " " + (packageSlug || "")).toLowerCase();
  let pkgCategoryKey: "1-day" | "2-days" | "3-days" = "2-days";
  if (fullText.includes("1 day") || fullText.includes("day safari") || fullText.includes("1d")) {
    pkgCategoryKey = "1-day";
  } else if (fullText.includes("3 day") || fullText.includes("2 night") || fullText.includes("3d") || fullText.includes("2n")) {
    pkgCategoryKey = "3-days";
  } else {
    pkgCategoryKey = "2-days";
  }

  // Arrays with guaranteed static fallbacks!
  const itinerary: TourItineraryDay[] =
    currentPackage?.itinerary && currentPackage.itinerary.length > 0
      ? currentPackage.itinerary
      : staticItineraryDefaults[pkgCategoryKey];

  const foodMenu: TourDayFoodMenu[] =
    currentPackage?.foodMenu && currentPackage.foodMenu.length > 0
      ? currentPackage.foodMenu
      : staticMenuDefaults[pkgCategoryKey];
  const inclusions = currentPackage?.inclusions || [
    "Pick up & Drop from Kolkata in AC Vehicle",
    "Accommodation in Luxury Resort / Boat Cabins",
    "All Meals (2 Breakfast, 2 Lunch, 1 Dinner, Evening Snacks)",
    "All Forest Department Entry Permits & Watchtower Fees",
    "Certified Forest Naturalist Tour Guide",
    "Cultural Folk Dance Show & Evening Bonfire",
    "Luxury Boat Cruise through Mangrove Creeks",
  ];
  const exclusions = currentPackage?.exclusions || [
    "Any Personal Expenses or Tips",
    "Video Camera Permit Charges",
    "Anything Not Mentioned in Inclusions List",
    "Medical or Travel Insurance",
    "GST 5% Extra Applicable",
    "Personal Beverages & Bottled Water",
  ];
  const thingsToCarry = currentPackage?.thingsToCarry || [
    "Original Photo ID Proof (Aadhaar / Voter ID / Passport)",
    "Comfortable Cotton Clothes & Walking Shoes",
    "Sunscreen Lotion, Sunglasses & Sun Hat",
    "Personal Medicines & Basic First Aid Kit",
    "Camera with Extra Memory Card & Power Bank",
    "Insect Repellent Cream",
    "Cash for Personal Shopping & Local Handicrafts",
  ];
  const childPolicy = currentPackage?.childPolicy || [
    "Child below 5 years: 100% Complimentary / FREE (sharing parents' bed).",
    "Child between 5 to 10 years: 50% of adult package price applicable.",
    "Child above 10 years: Charged as full adult rate with separate bed & seat.",
  ];
  const importantNotes = currentPackage?.importantNotes || [
    "Forest Department entry permissions require government ID submission 24h before cruise departure.",
    "Plastic bottles and plastic bags are strictly prohibited inside Sundarban Tiger Reserve core areas.",
    "Itinerary timings may slightly adjust based on river high-tide and low-tide schedules.",
    "Swimming in mangrove river creeks is strictly forbidden for wildlife safety.",
  ];

  return (
    <div className="bg-slate-50/70 min-h-screen text-[#0f172a] font-sans relative">
      {/* Sticky Right Side Floating Contact Bar */}
      <div className="fixed right-3 top-1/3 z-50 flex flex-col gap-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Facebook"
        >
          <FaFacebookF className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-[#15803d] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Instagram"
        >
          <FaInstagram className="w-4 h-4" />
        </a>
        <a
          href={`tel:${helplinePhone.replace(/\s+/g, "")}`}
          className="w-10 h-10 rounded-full bg-[#15803d] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Call Us"
        >
          <FaPhone className="w-4 h-4" />
        </a>
        <a
          href={`https://wa.me/${helplinePhone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          <FaWhatsapp className="w-4.5 h-4.5" />
        </a>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Dark Black Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        />

        {/* Deep Black Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Duration Badge Chip */}
          <div className="mb-4">
            <span className="inline-block bg-[#064e3b] text-[#fbbf24] text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {duration}
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 max-w-4xl mx-auto">
            {title}
          </h1>

          {/* Subdescription */}
          <p className="max-w-2xl mx-auto text-white/95 text-base sm:text-lg leading-relaxed mb-8 font-normal">
            {subtitle}
          </p>

          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white flex-wrap justify-center">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <Link href="/tour-details" className="text-white hover:text-[#fbbf24] transition-colors">
              Sundarban Packages
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24]">{title}</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER CONTENT */}
      <div className="py-8 md:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#064e3b] hover:text-[#d97706] hover:-translate-x-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back To All Packages</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded border border-amber-200">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{rating} / 5.0</span>
              <span className="text-slate-500 font-normal">({reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* 2-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT MAIN CONTENT (8 COLS) */}
            <div className="lg:col-span-8 space-y-10">
              {/* SECTION A: OVERVIEW */}
              <div className="bg-white p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                  Package Overview
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">
                  {overview}
                </p>

                {/* Highlight Callout Box */}
                {highlightQuote && (
                  <div className="rounded-sm bg-amber-50/70 border-l-4 border-[#d97706] p-5 sm:p-6 text-sm sm:text-base text-[#0f172a] font-medium leading-relaxed shadow-xs">
                    {highlightQuote}
                  </div>
                )}

                {/* 4 Feature Badges in a Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="flex flex-col items-center justify-center p-4 rounded-sm bg-slate-50 border border-slate-200/80 text-center">
                    <Clock className="w-6 h-6 text-[#d97706] mb-2" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Duration
                    </span>
                    <span className="text-sm font-bold text-[#0f172a] mt-0.5">
                      {duration}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 rounded-sm bg-slate-50 border border-slate-200/80 text-center">
                    <MapPin className="w-6 h-6 text-[#d97706] mb-2" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Pick &amp; Drop
                    </span>
                    <span className="text-sm font-bold text-[#0f172a] mt-0.5 truncate max-w-full">
                      {pickupDrop}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 rounded-sm bg-slate-50 border border-slate-200/80 text-center">
                    <Utensils className="w-6 h-6 text-[#d97706] mb-2" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Meals Included
                    </span>
                    <span className="text-sm font-bold text-[#0f172a] mt-0.5 truncate max-w-full">
                      {mealsSummary}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 rounded-sm bg-slate-50 border border-slate-200/80 text-center">
                    <Users className="w-6 h-6 text-[#d97706] mb-2" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Group Size
                    </span>
                    <span className="text-sm font-bold text-[#0f172a] mt-0.5">
                      {minGroupSize}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION B: DAY-WISE MENU DETAILS (BOX / CARD STYLE) */}
              <div className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 rounded-sm">
                <div className="border-b border-slate-100 pb-4">
                  <div className="">

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                      Day-Wise Menu Details
                    </h2>
                  </div>
                </div>

                {/* Day Cards Container */}
                <div className="space-y-6">
                  {foodMenu.map((menuDay, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="border border-emerald-100 bg-[#fbfdfe] rounded-sm p-5 sm:p-6 shadow-2xs space-y-4 hover:border-emerald-200/80 transition-colors"
                    >
                      {/* Day Card Header */}
                      <div className="flex items-center justify-between border-b border-emerald-100/80 pb-3">
                        <div className="">

                          <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
                            {menuDay.dayTitle || `Day ${menuDay.dayNumber || dayIdx + 1}`} Menu
                          </h3>
                        </div>
                      </div>

                      {/* Meal Courses Grid (Box Style) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        {menuDay.courses.map((course, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-white border border-slate-200/80 rounded-sm p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                          >
                            <div>
                              <div className="mb-2">
                                <h4 className="text-xs sm:text-sm font-extrabold text-[#d97706] uppercase tracking-wider">
                                  {course.courseName}
                                </h4>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                {course.menuItems}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: TOUR TIMELINE */}
              <div className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 rounded-sm">
                <div className="border-b border-slate-100 pb-4 flex items-center gap-2.5">

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
                    Tour Timeline
                  </h2>
                </div>

                <div className="space-y-8">
                  {itinerary.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="border-l-4 border-[#064e3b] pl-4 sm:pl-5 space-y-4 py-1"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f172a]">
                        {day.dayTitle || `Day ${day.dayNumber || dayIdx + 1}`}
                      </h3>

                      <div className="space-y-4 pt-1">
                        {day.activities.map((step, actIdx) => (
                          <div key={actIdx} className="space-y-0.5">
                            <span className="text-[#d97706] font-bold text-xs sm:text-sm block">
                              {step.time}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-[#0f172a]">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION D: WHAT'S INCLUDED */}
              <div className="bg-[#ecfdf5] border border-emerald-200/80 p-6 sm:p-8 space-y-4 rounded-sm">
                <h3 className="text-xl font-extrabold text-[#064e3b] flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#047857]" />
                  <span>What&apos;s Included in this Package</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-emerald-950">
                  {inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION E: WHAT'S NOT INCLUDED */}
              <div className="bg-slate-100/80 border border-slate-200 p-6 sm:p-8 space-y-4 rounded-sm">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-slate-700" />
                  <span>What&apos;s Not Included (Exclusions)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  {exclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION F: THINGS TO CARRY */}
              <div className="bg-amber-50/60 border border-amber-200/80 p-6 sm:p-8 space-y-4 rounded-sm">
                <h3 className="text-xl font-extrabold text-[#78350f] flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-[#d97706]" />
                  <span>Things to Carry Checklist</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-amber-950">
                  {thingsToCarry.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#d97706] flex-shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION G: CHILD POLICY */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-4 rounded-sm">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#064e3b]" />
                  <span>Child &amp; Age Policy</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm font-medium text-slate-800">
                  {childPolicy.map((policy, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#064e3b] flex-shrink-0 mt-1.5" />
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION H: IMPORTANT NOTES */}
              <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 space-y-4 rounded-sm">
                <h3 className="text-lg font-extrabold text-[#064e3b] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#064e3b]" />
                  <span>Important Safari Guidelines &amp; Notes</span>
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-normal">
                  {importantNotes.map((note, idx) => (
                    <p key={idx}>• {note}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT STICKY SIDEBAR (4 COLS) */}
            <div className="lg:col-span-4 sticky top-6 space-y-6">
              {/* Image & Booking Card */}
              <div className="bg-white border border-slate-200 p-5 shadow-md overflow-hidden space-y-5 rounded-sm">
                <div className="relative h-56 rounded-sm overflow-hidden bg-slate-100">
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-bold bg-[#064e3b] text-white px-2.5 py-1 rounded-sm uppercase">
                      {duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Tariff Per Person
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#064e3b]">
                        ₹{price.toLocaleString()}
                      </span>
                      {originalPrice > price && (
                        <div className="text-xs text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Two Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="btn btn-primary w-full !py-3 !px-4 !rounded-sm text-sm font-bold shadow-md text-center cursor-pointer"
                    >
                      <span>Book Now</span>
                    </button>
                    <a
                      href={`tel:${helplinePhone.replace(/\s+/g, "")}`}
                      className="btn btn-outline w-full !py-3 !px-4 !rounded-sm text-sm font-bold text-center cursor-pointer"
                    >
                      <span>Call Expert</span>
                    </a>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Direct Call Box */}
                <div className="flex items-center gap-3 p-3.5 rounded-sm bg-amber-50/70 border border-amber-200/80">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Direct Package Helpline
                    </span>
                    <span className="text-sm font-extrabold text-[#064e3b]">
                      {helplinePhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-5 space-y-3 text-xs text-[#0f172a] font-medium rounded-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#064e3b]">
                  <ShieldCheck className="w-5 h-5 text-[#064e3b]" />
                  <span>Why Book With Us</span>
                </div>
                <p>✓ Instant Confirmation with WhatsApp Voucher</p>
                <p>✓ 100% Verified Forest Permits Included</p>
                <p>✓ Free Date Rescheduling Up To 7 Days Prior</p>
                <p>✓ 24/7 Dedicated Forest Naturalist Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK BOOKING MODAL */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        packageName={title}
        pricePerPerson={price}
      />
    </div>
  );
}

export default TourDetails;
