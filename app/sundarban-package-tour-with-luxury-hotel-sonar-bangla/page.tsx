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
  Utensils,
  Coffee,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Sundarban Package Tour with Luxury Hotel Sonar Bangla | Best Booking",
  description:
    "Book exclusive Sundarban package tour with luxury Hotel Sonar Bangla. Enjoy premium resort stay, thrilling jungle safari, and comfortable river cruise from Kolkata.",
  keywords: [
    "Sundarban Package Tour with Luxury Hotel Sonar Bangla",
    "Sundarban luxury tour package",
    "Sonar Bangla Sundarban resort booking",
    "luxury sundarban trip",
  ],
  alternates: {
    canonical:
      "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id":
        "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla#trip",
      "name": "Sundarban Package Tour with Luxury Hotel Sonar Bangla",
      "description":
        "Experience an unforgettable luxury Sundarban tour featuring premium accommodation at Hotel Sonar Bangla, guided mangrove safaris, and fine hospitality.",
      "provider": {
        "@type": "TravelAgency",
        "name": "Sundarban Luxury Package",
        "url": "https://sundarbanluxurypackage.com/",
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "7500",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
      },
    },
    {
      "@type": "LodgingBusiness",
      "@id":
        "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla#hotel",
      "name": "Hotel Sonar Bangla Sundarban",
      "description":
        "Premium luxury resort in Sundarban offering top-class amenities, scenic nature views, and comfortable stays.",
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
        "https://sundarbanluxurypackage.com/sundarban-package-tour-with-luxury-hotel-sonar-bangla#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name":
            "What makes the Sundarban tour with Hotel Sonar Bangla special?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "It combines thrilling wildlife safaris in the Sundarban mangrove forest with the unmatched luxury, safety, and hospitality of Hotel Sonar Bangla.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I book this luxury package from Kolkata?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You can book directly through our website Sundarban Luxury Package or contact us via phone/WhatsApp for customized itineraries and instant confirmation.",
          },
        },
      ],
    },
  ],
};

export default function LuxurySonarBanglaTourPage() {
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
              backgroundImage:
                "url('/assets/images/sonar-bangla-hotel.jpg')",
            }}
          />

          {/* Black Overlay Layer */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              {/* Hero Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-snug drop-shadow-md mb-2">
                Sundarban Package Tour with Luxury Hotel Sonar Bangla – Pure
                Indulgence
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
                <span className="text-secondary">
                  Sundarban Package Tour with Luxury Hotel Sonar Bangla
                </span>
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
                  Traveling to the largest mangrove forest in the world does not
                  necessarily mean settling for a compromise in terms of your
                  comfort and luxury. This is because a{" "}
                  <strong className="text-slate-900 font-bold">
                    Sundarban Package Tour with Luxury Hotel Sonar Bangla
                  </strong>{" "}
                  gives you a taste of exploring the wilderness while enjoying
                  high levels of luxury. Hotel Sonar Bangla is located at Dulki,
                  Gosaba, near the river’s gentle curves.
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
                <div className="relative h-72 sm:h-80  w-full rounded-xl overflow-hidden shadow-xl border border-slate-200 group">
                  <Image
                    src="/assets/images/soanr-bangla.webp"
                    alt="Sundarban Package Tour with Luxury Hotel Sonar Bangla"
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
                  Why Choose a Sundarban Package Tour with Luxury Hotel Sonar
                  Bangla?
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  The Sundarban Package Tour with Luxury Hotel Sonar Bangla trip
                  to the detailed trails and the zones of the protected wildlife
                  in the Sundarbans needs careful planning and future thinking.
                  Going for a luxurious tour package will make your normal
                  vacation an extraordinary one.
                </p>
              </div>

              {/* 4 Feature Bullet Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
                {/* Feature 1 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Best Location on the Riverfront</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Being situated at the opposite side of the reserve forest,
                    the location helps you in enjoying the nature of the
                    deltaic region from your own balcony.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Compass className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Easier Traveling Plan</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    The travel plan includes all the travel arrangements to
                    ensure your comfort such as transportation in
                    air-conditioned vehicles from Kolkata to Godkhali Jetty,
                    ferry ride, and also forest permission.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Sustainable Travel Plan</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    The latest safety standards are included in the travel
                    package along with sustainable resorts.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Trees className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Guided Jungle Safari Tours</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    You can take jungle safari tours at some important watch
                    towers including Sajnekhali, Sudhanyakhali, and Dobanki.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-8 md:my-12" />

            {/* H3 Section */}
            <div className="space-y-8 mb-12">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Premium Facilities and Fine Dining Experience
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  One of the highlights of accommodation at Hotel Sonar Bangla
                  Sundarban is the availability of various top-end facilities
                  that can be enjoyed to relax after an exhausting day of boat
                  safaris.
                </p>
              </div>

              {/* World-Class Facilities */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                  World-Class Facilities
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  The resort offers air-conditioned Deluxe rooms, Premium rooms
                  and Suites, which have comfortable beds, contemporary bathroom
                  facilities and wireless internet connection. In addition, one
                  can indulge in swimming in the swimming pool that overlooks
                  the river, walk in the manicured gardens, or enjoy leisure in
                  the indoor games room, library and gym.
                </p>
              </div>

              {/* Gourmet Food Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                    Gourmet Food Options
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Eating forms a significant component of the resort stay
                    experience. The multi-cuisine restaurant called Breathing
                    Roots provides various options from the selection of fresh
                    and exotic dishes from all over the world, prepared by expert
                    chefs maintaining high standards of hygiene.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Breakfast */}
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Sun className="w-4 h-4 text-amber-600" />
                      <span>Breakfast</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Selection of fresh fruits, dishes of South and North India,
                      egg preparations, juices and hot tea or coffee.
                    </p>
                  </div>

                  {/* Lunch */}
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Utensils className="w-4 h-4 text-emerald-600" />
                      <span>Lunch</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Combination consisting of fresh fish curry, Bengali
                      speciality dishes, seasonal vegetables, rice, lentils and
                      local sweets.
                    </p>
                  </div>

                  {/* Evening Tea */}
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Coffee className="w-4 h-4 text-orange-600" />
                      <span>Evening Tea/Coffee</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Hot tea/coffee along with regional snacks that are either
                      served at the resort or on cruise ships in the evening.
                    </p>
                  </div>

                  {/* Dinner */}
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span>Dinner</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Various options including Indian, Chinese and Continental
                      cuisines , Fresh meals and drinks
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-2">
                  The safari boats will provide packed lunch and other snacks to
                  keep you refreshed through your long hours spent exploring the
                  jungle. A perfect mixture of wild life adventure and luxury can
                  be had with a Sundarban Tour Package including Hotel Sonar
                  Bangla.
                </p>
              </div>

              {/* Topics to Cover Showcase */}
              <div className="bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-6 sm:p-8 space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>Topics Covered</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm sm:text-base text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>High-end amenities of the resort</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>River view balconies</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      Premium food menu (authentic Bengali and multi-cuisine
                      options)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Spa or relaxation zones</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>VIP boat arrangements</span>
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
                      What makes the Sundarban tour with Hotel Sonar Bangla
                      special?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    It combines thrilling wildlife safaris in the Sundarban
                    mangrove forest with the unmatched luxury, safety, and
                    hospitality of Hotel Sonar Bangla.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>How can I book this luxury package from Kolkata?</span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    You can book directly through our website Sundarban Luxury
                    Package or contact us via phone/WhatsApp for customized
                    itineraries and instant confirmation.
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
