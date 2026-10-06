import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Star,
  MapPin,
  Utensils,
  Car,
  Ship,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { HotelBokingForm } from "@/components/hotel-sonar-bangla/HotelBokingForm";

export const metadata: Metadata = {
  title: "Hotel Sonar Bangla Sundarban Tour Package Price & Cost 2026",
  description:
    "Check Hotel Sonar Bangla Sundarban tour package price and cost. Get best deals on luxury resort stay, boat safari, and food inclusions from Kolkata.",
  keywords: [
    "Hotel Sonar Bangla Sundarban tour package price",
    "Hotel Sonar Bangla Sundarban cost",
    "Sundarban luxury resort price",
    "Sonar Bangla Sundarban package cost",
  ],
  alternates: {
    canonical:
      "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-tour-package-price-cost",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id":
        "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-tour-package-price-cost#trip",
      "name": "Hotel Sonar Bangla Sundarban Tour Package",
      "description":
        "Complete breakdown of Hotel Sonar Bangla Sundarban tour package price, cost, and itinerary options from Kolkata.",
      "provider": {
        "@type": "TravelAgency",
        "name": "Sundarban Luxury Package",
        "url": "https://sundarbanluxurypackage.com/",
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "7500",
        "highPrice": "15000",
        "offerCount": "3",
        "availability": "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-tour-package-price-cost#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name":
            "What is the starting price for Hotel Sonar Bangla Sundarban tour package?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The price for Hotel Sonar Bangla Sundarban tour package generally starts around ₹7,500 per person, depending on the room category, season, and duration of the trip.",
          },
        },
        {
          "@type": "Question",
          "name": "What is included in the Hotel Sonar Bangla package cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The package cost includes luxury resort accommodation at Hotel Sonar Bangla, all meals, jungle safari boat cruise, forest entry permits, and local guide charges.",
          },
        },
      ],
    },
  ],
};

export default function SonarBanglaPriceCostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <main className="min-h-screen bg-white text-slate-900 font-sans">
        {/* Header Hero Banner Section */}
        <div className="relative bg-slate-950 text-white py-20 lg:py-28 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-all duration-1000"
            style={{
              backgroundImage:
                "url('/assets/images/sonar-bangla-hotel-cottage.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/60" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              {/* Rating Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>Transparent 2026 Package Rates &amp; Details</span>
              </div>

              {/* Hero Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg tracking-tight">
                Hotel Sonar Bangla Sundarban Tour Package Price &amp; Cost Details
              </h1>

              {/* Breadcrumbs */}
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-300 flex-wrap justify-center pt-2">
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
                <span>»</span>
                <Link
                  href="/hotel-sonar-bangla"
                  className="hover:text-amber-400 transition-colors"
                >
                  Hotel Sonar Bangla
                </Link>
                <span>»</span>
                <span className="text-amber-400">Price and Cost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Feature Bar */}
        <div className="bg-emerald-900 text-white py-4 border-b border-emerald-800 shadow-inner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs sm:text-sm font-medium">
              <div className="flex items-center justify-center gap-2">
                <Car className="w-4 h-4 text-emerald-400" />
                <span>AC Vehicle Transfers</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Ship className="w-4 h-4 text-emerald-400" />
                <span>Jungle Cruise Permits</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>Full Board Dining Included</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Hidden Charges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Introductory Content: Text on Left, Photo on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Pricing Breakdown
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight mt-3">
                    Hotel Sonar Bangla Sundarban Tour Package Price Overview
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                  <p>
                    To plan a luxury getaway to the largest mangrove forest of the
                    world, one needs to have a clear idea about the total cost of
                    travel. Hotel Sonar Bangla Sundarban located at Dulki (Gosaba)
                    is the epitome of a luxurious eco-resort in terms of facilities
                    and services that is available near the riverfront.
                  </p>

                  <p>
                    Hotel Sonar Bangla Sundarban tour package price and cost lies
                    between ₹17,900 and ₹20,500 for each individual based on Twin
                    Sharing arrangements for a 2-Night/3-Day tour. The pricing for
                    a Deluxe Standard package in off-peak seasons i.e., June to
                    September costs around ₹17,900 per person while during peak
                    season (October to March) the price is ₹20,500 per person.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/hotel-sonar-bangla"
                    className="inline-flex items-center justify-center text-sm sm:text-base font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all duration-300 py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg"
                  >
                    View Package Details &amp; Itinerary
                  </Link>
                  <a
                    href="#booking-form"
                    className="inline-flex items-center justify-center text-sm sm:text-base font-bold bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all duration-300 py-3.5 px-6 rounded-lg border border-slate-300"
                  >
                    Book Room Online
                  </a>
                </div>
              </div>

              {/* Right Column: Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-80 sm:h-96 lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                  <Image
                    src="/assets/images/sonar-bangla-hotel-ambience.jpg"
                    alt="Hotel Sonar Bangla Sundarban Luxury Resort Ambience"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Dulki, Gosaba (Riverfront)</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-bold drop-shadow-md">
                    Hotel Sonar Bangla Sundarban Resort
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-10 md:my-14" />

            {/* H2 Section: Breakdown (Top Photo + Bottom Text Content 4 Boxes Grid) */}
            <div className="space-y-8 mb-16">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                  Cost Distribution
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Transparent Hotel Sonar Bangla Sundarban Tour Package Price &amp; Cost Breakdown
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  For ensuring that no unexpected expense occurs during your trip,
                  having knowledge of how every rupee will be used provides total
                  financial transparency. The total cost of an all-inclusive
                  package will be divided into the following four categories:
                </p>
              </div>

              {/* 4 Box Grid with Top Photo and Bottom Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {/* Box 1: Accommodation */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src="/assets/images/sonar-bangla-hotel-deluxe.jpg"
                      alt="Accommodation - Hotel Sonar Bangla Sundarban"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-800 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      40-45% Share
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-start space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Accommodation (40-45%)
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      It involves the cost of staying in luxurious air-conditioned
                      facilities in either Deluxe, Premium or Suite rooms. It also
                      includes the use of the outdoor swimming pool, garden, game
                      rooms, and riverside lounging facilities.
                    </p>
                  </div>
                </div>

                {/* Box 2: Transportation & Transfers */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src="/assets/images/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
                      alt="Transportation & Transfers - Hotel Sonar Bangla Sundarban"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-blue-800 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      25-30% Share
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-start space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Transportation &amp; Transfers (25-30%)
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      It involves private air-conditioned car transfers from either
                      Science City or Kolkata Airport in Kolkata and Godkhali
                      Jetty and also boat transfers to the resort landing point.
                    </p>
                  </div>
                </div>

                {/* Box 3: Jungle Safari & Boat Permits */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src="/assets/images/Sudhanyakhali-Watch-Tower.jpeg"
                      alt="Jungle safari and boat permit fees"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-amber-800 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      15-20% Share
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-start space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Jungle Safari &amp; Boat Permit Fees (15-20%)
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      It includes expenses incurred in renting private motorboats
                      for jungle trekking, compulsory permits from West Bengal
                      Forest Department, camera fee, and certified tourist guide.
                    </p>
                  </div>
                </div>

                {/* Box 4: Food & Beverage */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src="/assets/images/food-bevarge.jpeg"
                      alt="Food & Beverage - Hotel Sonar Bangla Sundarban"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-teal-800 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      15-20% Share
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-start space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Food &amp; Beverage (15-20%)
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      It involves all full board services for meals which include
                      breakfast, buffet lunch, afternoon tea with snacks, and
                      dinner.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-10 md:my-14" />

            {/* H3 Section: Inclusions & Exclusions */}
            <div className="space-y-8 mb-16">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                  Full Transparency
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  What’s Included in Your Hotel Sonar Bangla Package Cost?
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  A package for luxury travel tour includes all that is needed for
                  an easy journey without any troubles on ground. The cost of the
                  whole package includes:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h4 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>Package Inclusions:</span>
                  </h4>
                  <ul className="space-y-3.5 text-slate-700 text-xs sm:text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">
                          Transport Services:
                        </strong>{" "}
                        Two-way transfer using comfortable AC vehicles between Kolkata &amp; Godkhali Jetty plus motor boat transfers.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">
                          Luxury Resort Stay:
                        </strong>{" "}
                        Air-conditioned Deluxe or Premium rooms with swimming pool access &amp; scenic riverfront balcony views.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">
                          Full Fledged Meals:
                        </strong>{" "}
                        Complete gourmet meals (Breakfast, Lunch, Evening Snacks, Dinner) including Bengali seafood &amp; multi-cuisine options.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">
                          River Boat Safaris:
                        </strong>{" "}
                        Full-day jungle safaris visiting Sajnekhali, Sudhanyakhali, and Dobanki watch towers.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900">
                          Permits &amp; Guides:
                        </strong>{" "}
                        All forest department entry permits, boat clearances, and naturalist guide services.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h4 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-slate-500" />
                    <span>Standard Exclusions:</span>
                  </h4>
                  <ul className="space-y-3.5 text-slate-700 text-xs sm:text-sm">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Personal expenditures including laundry, telephone calls, and room service.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Professional/Commercial camera permits charged by the forest department.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Spa treatments, therapy sessions, soft drinks, or liquor.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Tips to boat crew members, drivers, local craftsmen, and tour guides.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Tribal folk dances performed specifically on individual guest requests.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-10 md:my-14" />

            {/* Section: Interactive Booking Form */}
            <div id="booking-form" className="py-4">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
                  Instant Online Booking
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Reserve Your Hotel Sonar Bangla Package
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Choose your room type, dates, and number of guests to confirm your luxury Sundarban retreat.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                <HotelBokingForm />
              </div>
            </div>

            <hr className="border-slate-200 my-10 md:my-14" />

            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Help Center
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base sm:text-xl flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>
                      What is the starting price for Hotel Sonar Bangla Sundarban tour package?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-9">
                    The price for Hotel Sonar Bangla Sundarban tour package
                    generally starts around ₹7,500 per person, depending on the
                    room category, season, and duration of the trip.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base sm:text-xl flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>
                      What is included in the Hotel Sonar Bangla package cost?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-9">
                    The package cost includes luxury resort accommodation at
                    Hotel Sonar Bangla, all meals, jungle safari boat cruise,
                    forest entry permits, and local guide charges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating / Bottom CTA Footer Banner */}
        <section className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white py-12 border-t border-emerald-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-extrabold">
                Get Best Guaranteed Rates for Hotel Sonar Bangla
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Call our travel desk now or connect via WhatsApp for customized itineraries &amp; instant vouchers.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 flex-shrink-0">
              <a
                href="https://wa.me/919830000000?text=Hi,%20I%20want%20to%20know%20Hotel%20Sonar%20Bangla%20Package%20Price"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 text-sm sm:text-base"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp Us Now
              </a>
              <a
                href="#booking-form"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 text-sm sm:text-base"
              >
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
