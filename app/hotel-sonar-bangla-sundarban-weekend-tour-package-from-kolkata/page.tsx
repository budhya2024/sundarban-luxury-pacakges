import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  HelpCircle,
  MapPin,
  Compass,
  ShieldCheck,
  Trees,
  Calendar,
  Clock,
  Sparkles,
  Ship,
  Car,
  Sun,
  Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hotel Sonar Bangla Sundarban Weekend Tour Package from Kolkata",
  description:
    "Book Hotel Sonar Bangla Sundarban weekend tour package from Kolkata. Enjoy a 2N/3D luxury weekend getaway with jungle safari, premium stay, and delicious food.",
  keywords: [
    "Hotel Sonar Bangla Sundarban weekend tour package from Kolkata",
    "weekend sundarban tour",
    "luxury weekend trip kolkata",
    "sonar bangla weekend package",
    "2 days 1 night Sundarban luxury trip",
    "weekend resort getaway Kolkata",
    "short holiday Sundarban",
  ],
  alternates: {
    canonical:
      "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id":
        "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata#trip",
      "name": "Hotel Sonar Bangla Sundarban Weekend Tour Package from Kolkata",
      "description":
        "Perfect 2 Nights / 3 Days luxury weekend tour package to Sundarban featuring premium stay at Hotel Sonar Bangla and guided boat safaris.",
      "provider": {
        "@type": "TravelAgency",
        "name": "Sundarban Luxury Package",
        "url": "https://sundarbanluxurypackage.com/",
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "8500",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
      },
    },
    {
      "@type": "LodgingBusiness",
      "@id":
        "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata#hotel",
      "name": "Hotel Sonar Bangla Sundarban",
      "description":
        "Luxury resort in Sundarban ideal for weekend getaways from Kolkata.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sundarban",
        "addressRegion": "West Bengal",
        "addressCountry": "IN",
      },
      "priceRange": "₹₹₹",
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://sundarbanluxurypackage.com/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name":
            "What is the duration of the Sundarban weekend tour package?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The standard weekend package is typically a 2 Nights and 3 Days trip starting from Kolkata on Friday/Saturday.",
          },
        },
        {
          "@type": "Question",
          "name":
            "Does the weekend package include pickup and drop from Kolkata?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, comfortable AC transport from Kolkata to Godkhali jetty and back is included in our weekend package.",
          },
        },
      ],
    },
  ],
};

export default function WeekendTourPackagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <main className="min-h-screen bg-white text-slate-900 font-sans">
        {/* Header Hero Section */}
        <div className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{
              backgroundImage: "url('/assets/images/sonar-bangla-hotel.jpg')",
            }}
          />

          {/* Black Overlay Layer */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              {/* Hero Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-2">
                Hotel Sonar Bangla Sundarban weekend tour package from Kolkata
              </h1>

              {/* Breadcrumbs */}
              <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-white flex-wrap justify-center mt-2">
                <Link
                  href="/"
                  className="text-white hover:text-secondary transition-colors"
                >
                  Home
                </Link>
                <span className="text-white font-bold">»</span>
                <Link
                  href="/hotel-sonar-bangla"
                  className="text-white hover:text-secondary transition-colors"
                >
                  Hotel Sonar Bangla
                </Link>
                <span className="text-white font-bold">»</span>
                <span className="text-secondary">Weekend Package</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Introductory Content: Text on Left, Photo on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  Enjoy the vacation in the largest mangrove delta of the world
                  right from the heart of the city. By opting for the{" "}
                  <strong className="text-slate-900 font-bold">
                    Hotel Sonar Bangla Sundarban weekend tour package from
                    Kolkata
                  </strong>{" "}
                  which is available in Kolkata, you will have a fantastic
                  weekend with a perfect combination of fun and relaxation.
                  Located by the banks of the river Dulki and Gosaba, Hotel
                  Sonar Bangla ensures you comfortable lodging and adventurous
                  boat safari
                </p>

                <Link
                  href="/hotel-sonar-bangla"
                  className="inline-flex px-6 py-2.5 bg-primary text-white font-semibold rounded-sm shadow-md hover:bg-secondary transition-colors"
                >
                  Check here.
                </Link>
              </div>

              {/* Right Column: Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden shadow-xl border border-slate-200 group">
                  <Image
                    src="/assets/images/hotel (2).jpeg"
                    alt="Hotel Sonar Bangla Sundarban weekend tour package from Kolkata"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-8 md:my-12" />

            {/* H2 Section */}
            <div className="space-y-8 mb-12">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Plan Your Hotel Sonar Bangla Sundarban weekend tour package
                  from Kolkata This Friday
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  A very early start to your tour on a Friday will help you
                  enjoy your weekend to the fullest without using much vacation
                  time from your office.
                </p>
              </div>

              {/* 4 Feature Bullet Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Point 1 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Car className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Easy Connect</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    This tour starts with an air conditioned road journey from
                    Kolkata to Godkhali Jetty (from Science City &amp; Airport).
                    This road journey takes three to three and half hours.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Ship className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Seamless Journey</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Board the private motor boat cruise from Godkhali and travel
                    through the river channels to reach the destination point
                    where the resort is situated.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Travel Package Solution</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    The packaged tours provide you with all your transportation
                    needs including road travel, boat ride, jungle permit,
                    guides, accommodation and fine dining arrangements.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Trees className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Resort Luxuries</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Return to the air-conditioned luxurious rooms after the
                    morning cruise and relax in the swimming pool.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-8 md:my-12" />

            {/* H3 Section */}
            <div className="space-y-8 mb-12">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Itinerary Highlights for Your 2-Day / 3-Day Weekend Trip
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  Regardless of which Hotel Sonar Bangla Sundarban weekend tour
                  package from Kolkata you opt for between the 2-day one and the
                  3-day one, you can definitely expect lots of exciting
                  encounters with the mangrove jungle over the weekend.
                </p>
              </div>

              {/* Day 1, Day 2, Day 3 Breakdown */}
              <div className="space-y-6">
                {/* Day 1 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-700" />
                    <span>
                      Day 1: Departure from Kolkata, Arrival and Sunset Cruise
                    </span>
                  </h4>
                  <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Morning Departure:
                        </strong>{" "}
                        Depart from Kolkata in the early morning in an air
                        conditioned vehicle to Godkhali Jetty.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Resort Check-In:
                        </strong>{" "}
                        Take the boat ride from the river to reach Hotel Sonar
                        Bangla Sundarbans. Check into your room and have your
                        breakfast.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Sunset Cruise:
                        </strong>{" "}
                        Take part in sunset cruise in the river to have a look at
                        the incredible sight of sun setting down in the
                        mangroves.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Day 2 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-700" />
                    <span>
                      Day 2: Full Day Safari in Jungles and Visit to Watchtowers
                    </span>
                  </h4>
                  <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Morning Activity:
                        </strong>{" "}
                        Take a private boat safari in the morning after having
                        your breakfast at the hotel’s restaurant.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Visit to Watchtowers:
                        </strong>{" "}
                        Embark upon the boat safari in the narrow creeks and
                        rivers to reach watchtowers such as Sajnekhali,
                        Sudhanya Khali, and Dobanki (you will be able to
                        experience the canopy walk here). Sites of visitation:
                        Royal Bengal Tigers, Saltwater Crocodiles, Spotted
                        Deer, and migratory birds.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Lunch on the Boat:
                        </strong>{" "}
                        have a delicious and authentic lunch in the boat with
                        various authentic sundarbani and Bengali food items and
                        return to hotel for stay at night.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Day 3 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                    <span>
                      Day 3: Heritage Walk, Visit to Village, and Returning to
                      Kolkata
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <strong className="text-slate-900">
                      Timing for the departure:
                    </strong>{" "}
                    You will board a boat from the resort to Godkhali Jetty and
                    then take the road trip back to Kolkata.
                  </p>
                  <p className="text-slate-700 font-semibold text-sm sm:text-base">
                    Make a wonderful weekend getaway to Hotel Sonar Bangla.
                  </p>
                </div>
              </div>

              {/* Topics to Cover Showcase */}
              <div className="bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm mt-8">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>Topics Covered</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm sm:text-base text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Perfect short itinerary (2N/3D or 1N/2D)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Hassle-free Friday/Saturday departure from Kolkata</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Quick check-in at the resort</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Maximizing sightseeing in limited time</span>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-slate-200 my-8 md:my-12" />

            {/* FAQ Section */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>
                      What is the duration of the Sundarban weekend tour
                      package?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    The standard weekend package is typically a 2 Nights and 3
                    Days trip starting from Kolkata on Friday/Saturday.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>
                      Does the weekend package include pickup and drop from
                      Kolkata?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    Yes, comfortable AC transport from Kolkata to Godkhali jetty
                    and back is included in our weekend package.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
