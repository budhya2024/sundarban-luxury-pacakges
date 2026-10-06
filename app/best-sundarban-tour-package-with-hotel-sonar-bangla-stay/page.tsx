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
  Sparkles,
  Award,
  Users2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Sundarban Tour Package with Hotel Sonar Bangla Stay",
  description:
    "Book the best Sundarban tour package with Hotel Sonar Bangla stay. Experience UNESCO mangrove safari, luxury riverfront resort, and expert forest guide.",
  keywords: [
    "Best Sundarban tour package with Hotel Sonar Bangla stay",
    "top rated Sundarban luxury trip",
    "best safari and resort package",
    "expert guided Sundarban tour",
  ],
  alternates: {
    canonical:
      "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id":
        "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay#trip",
      "name": "Best Sundarban tour package with Hotel Sonar Bangla stay",
      "description":
        "Carefully crafted top-rated luxury Sundarban tour package featuring Hotel Sonar Bangla resort stay, guided core safari, and gourmet dining.",
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
        "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay#hotel",
      "name": "Hotel Sonar Bangla Sundarban",
      "description":
        "5-star luxury eco resort in Sundarban situated by Dulki riverbank.",
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
        "https://sundarbanluxurypackage.com/best-sundarban-tour-package-with-hotel-sonar-bangla-stay#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name":
            "What makes this the best Sundarban tour package with Hotel Sonar Bangla stay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "It offers an ideal combination of 5-star resort hospitality at Hotel Sonar Bangla, expert-guided jungle boat safaris, full-board gourmet dining, and seamless Kolkata transfers.",
          },
        },
        {
          "@type": "Question",
          "name": "Are forest permits and guide fees included in the package?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, all compulsory forest department permits, watchtower entry fees, and government-certified guide charges are included.",
          },
        },
      ],
    },
  ],
};

export default function BestPackagePage() {
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
                Best Sundarban tour package with Hotel Sonar Bangla stay
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
                <span className="text-secondary">Best Package</span>
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
                  A trip to the untouched UNESCO mangroves of the Sundarbans need
                  not entail sacrificing comfort and luxury in order to experience
                  these magical forests. This carefully crafted{" "}
                  <strong className="text-slate-900 font-bold">
                    Best Sundarban tour package with Hotel Sonar Bangla stay
                  </strong>{" "}
                  including a stay at the Hotel Sonar Bangla allows one to enjoy
                  wildlife adventures along with an oasis by the riverside. Located
                  in the village of Dulki right by the riverside of the Sundarban
                  Tiger Reserve, the Hotel Sonar Bangla provides the perfect
                  retreat within the untamed wildness of the delta.
                </p>

                <p>
                  Starting from hassle-free transfers from Kolkata all the way to
                  exciting cruises through the narrow creeks of the delta, this
                  package is sure to satisfy everyone’s desires.
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
                    src="/assets/images/soanr-bangla.webp"
                    alt="Best Sundarban tour package with Hotel Sonar Bangla stay"
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
                  What Makes This the Best Sundarban tour package with Hotel
                  Sonar Bangla stay?
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  Choosing the right package will make your regular holiday
                  become an unforgettable eco-tour. Here are a few things that
                  make this tour unique:
                </p>
              </div>

              {/* 5 Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* 1 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Trees className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Resort Services</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Relax after spending a day exploring the mangrove forest in
                    the air-conditioned rooms with nature-view balconies. You
                    get to enjoy resort facilities such as the swimming pool,
                    gaming area, gardens, and spa.
                  </p>
                </div>

                {/* 2 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Utensils className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Dining with Gourmet Flavors</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Delight yourself with multi-cuisine buffet with local catch
                    from the rivers – Bengali prawn and fish specialties as well as
                    custom-made dishes according to your preferences.
                  </p>
                </div>

                {/* 3 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Compass className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Effortless Travel from Kolkata to Kolkata</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Benefit from the pick-up and drop-off services through private
                    AC transport from Kolkata to the Godkhali jetty and through
                    private boats to the resort.
                  </p>
                </div>

                {/* 4 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Chosen River Safari Trails</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Cruise through the rivers in the heavy duty safari boats
                    suitable not only for wide river junctions but also for the
                    narrow creeks such as Sarakkhali Canal and Pirkhali.
                  </p>
                </div>

                {/* 5 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <Users2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <h3>Cultural Tourism</h3>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Immerse yourself in the culture of the region by exploring the
                    villages on guided morning walks and watching traditional
                    tribal dances in the evenings.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-8 md:my-12" />

            {/* H3 Section */}
            <div className="space-y-8 mb-12">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Expert Guides, Safety Measures, and Unmatched Hospitality
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  Exploring the largest mangrove forest of the world needs local
                  insight, timing of tides in rivers, and high levels of safety
                  standards. The Best Sundarban tour package with Hotel Sonar
                  Bangla stay prioritizes guest safety and enriching experience as
                  follows:
                </p>
              </div>

              {/* 2 Safety & Guide Boxes */}
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-700" />
                    <span>
                      Government Certified Forest Guides and Wildlife Observation
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Each safari boat trip comes with government certified forest
                    guides and expert naturalists from the area. Their profound
                    knowledge of animal behavior, tides, and bird sounds ensures
                    that you see some of the rare species in the forest including
                    the Royal Bengal Tiger, estuarine crocodiles, spotted deer, and
                    kingfishers through watchtowers such as Sajnekhali,
                    Sudhanyakhali, and Dobanki.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Water Safety</span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    There is no exception in terms of safety in the water. Safari
                    boats are provided with government certified life jackets,
                    first aid kits, GPS navigation system, and skilled river
                    captains who know how to deal with the flowing river water.
                    Your tour coordinator will take care of all forest
                    permissions and clearing of route.
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
                    <span>Customer satisfaction and reviews</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Government-authorized expert naturalists/guides</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Strict safety protocols on boats</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Wildlife spotting tips (tigers, crocodiles, birds)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Cultural evening programs</span>
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
                      What makes this the best Sundarban tour package with Hotel
                      Sonar Bangla stay?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    It offers an ideal combination of 5-star resort hospitality at
                    Hotel Sonar Bangla, expert-guided jungle boat safaris,
                    full-board gourmet dining, and seamless Kolkata transfers.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>
                      Are forest permits and guide fees included in the package?
                    </span>
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
                    Yes, all compulsory forest department permits, watchtower entry
                    fees, and government-certified guide charges are included.
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
