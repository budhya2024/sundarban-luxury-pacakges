"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  CloudSun,
  CloudRain,
  Thermometer,
  Compass,
  Waves,
  Eye,
  Sparkles,
  ArrowRight,
  Check,
  Calendar,
} from "lucide-react";

interface SeasonData {
  id: string;
  name: string;
  months: string;
  badge: string;
  icon: React.ElementType;
  tempRange: string;
  avgHigh: string;
  avgLow: string;
  humidity: string;
  rainfall: string;
  bestFor: string;
  riverCondition: string;
  clothingTip: string;
  spottingRating: string;
  natureDescription: string;
  image: string;
  keyFauna: string[];
}

const seasons: SeasonData[] = [
  {
    id: "winter",
    name: "Winter",
    months: "October – March",
    badge: "Peak Safari Season",
    icon: CloudSun,
    tempRange: "15°C – 25°C",
    avgHigh: "26°C",
    avgLow: "12°C",
    humidity: "60% – 70%",
    rainfall: "Minimal",
    bestFor: "Tiger sightings, boat cruising & migratory birds",
    riverCondition: "Calm tides with clear skies",
    clothingTip: "Light woolens for mornings, cottons for day",
    spottingRating: "5/5 (Highest)",
    natureDescription:
      "Winter is the ideal time to explore the Sundarbans. Crisp morning mists clear into bright sunny days, and wildlife frequently sunbathes along riverbanks during low tide.",
    image: "/assets/images/royal-bengal-tiger.jpg",
    keyFauna: [
      "Royal Bengal Tiger Basking",
      "Migratory Avian Flocks",
      "Estuarine Crocodiles",
      "Spotted Axis Deer",
    ],
  },
  {
    id: "summer",
    name: "Summer",
    months: "April – June",
    badge: "Active Wildlife",
    icon: Sun,
    tempRange: "26°C – 37°C",
    avgHigh: "38°C",
    avgLow: "24°C",
    humidity: "75% – 85%",
    rainfall: "Occasional Showers",
    bestFor: "Watchtower sightings near sweet-water ponds",
    riverCondition: "Breezy river channels",
    clothingTip: "Light breathable cottons & sun hats",
    spottingRating: "4.5/5 (High)",
    natureDescription:
      "During summer, wildlife gathers around fresh-water ponds inside watchtowers like Sudhanyakhali and Dobanki, making it a rewarding season for dedicated wildlife enthusiasts.",
    image: "/assets/images/watchtower-view.jpg",
    keyFauna: [
      "Tigers at Sweet-Water Ponds",
      "Wild Boars & Monitors",
      "Kingfishers (8 Species)",
      "River Dolphins",
    ],
  },
  {
    id: "monsoon",
    name: "Monsoon",
    months: "July – September",
    badge: "Lush Canopy",
    icon: CloudRain,
    tempRange: "24°C – 32°C",
    avgHigh: "32°C",
    avgLow: "24°C",
    humidity: "85% – 95%",
    rainfall: "Moderate to Heavy",
    bestFor: "Bird sanctuary breeding & emerald landscapes",
    riverCondition: "Full tidal estuaries",
    clothingTip: "Rainwear & quick-dry clothing",
    spottingRating: "4/5 (Good)",
    natureDescription:
      "The monsoons rejuvenate the mangrove ecosystem. Thousands of waterbirds nest at the Sajnekhali Bird Sanctuary amidst lush emerald canopies and misty waterways.",
    image: "/assets/images/estuary-sunset.jpg",
    keyFauna: [
      "Breeding Water Birds",
      "Mudskippers & Crabs",
      "Estuarine Dolphins",
      "Lush Mangrove Bloom",
    ],
  },
];

const natureHighlights = [
  {
    title: "World's Largest Mangrove",
    description: "Over 10,000 sq. km of protected halophytic delta designated as a UNESCO World Heritage Site.",
    icon: Waves,
  },
  {
    title: "Twice-Daily Tidal Cycle",
    description: "Dynamic tides reshape the waterways every 6 hours, exposing mudflats teeming with life.",
    icon: Compass,
  },
  {
    title: "Pneumatophores (Roots)",
    description: "Botanical wonder where mangrove roots grow upwards from saline soil to breathe air.",
    icon: Sparkles,
  },
  {
    title: "300+ Wildlife Species",
    description: "Home to Bengal Tigers, saltwater crocodiles, deer, and rare Gangetic river dolphins.",
    icon: Eye,
  },
];

export function SundarbanEnvironmentSection() {
  const [activeTab, setActiveTab] = useState("winter");

  const current = seasons.find((s) => s.id === activeTab) || seasons[0];

  return (
    <section className="py-8 md:py-16 bg-primary/5">
      <div className="container">
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="sec-tagline">
            Ecosystem & Seasons
          </p>
          <h2 className="sec-title mt-1.5">
            Sundarban Climate & Nature Guide
          </h2>

        </div>

        {/* Clean Tabs Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-full border border-border">
            {seasons.map((season) => {
              const Icon = season.icon;
              const isActive = season.id === activeTab;
              return (
                <button
                  key={season.id}
                  onClick={() => setActiveTab(season.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-foreground"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-secondary" : "text-slate-400"}`} />
                  <span>{season.name}</span>
                  <span className="hidden sm:inline text-xs opacity-70">
                    ({season.months.split(" ")[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Season Card - Simple 2 Column Layout with subtle corners */}
        <div className="bg-slate-50/70 border border-border rounded-lg p-5 sm:p-7 md:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image with Clean Overlay */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 lg:h-[380px] w-full rounded-md overflow-hidden shadow-xs bg-slate-200">
                <Image
                  src={current.image}
                  alt={`${current.name} in Sundarban`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


                {/* Image Bottom Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-brand-yellow-light font-medium mb-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{current.months}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black">
                    {current.tempRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Clean Content */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {current.name} Season ({current.months})
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-brand-yellow-soft text-brand-yellow-dark rounded-sm">
                    Spotting: {current.spottingRating}
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {current.natureDescription}
                </p>

                {/* 4 Minimal Metric Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  <div className="bg-white p-3 rounded-md border border-border">
                    <span className="text-xs text-muted-foreground font-medium block">Avg High</span>
                    <span className="text-sm sm:text-base font-bold text-foreground">{current.avgHigh}</span>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-border">
                    <span className="text-xs text-muted-foreground font-medium block">Avg Low</span>
                    <span className="text-sm sm:text-base font-bold text-foreground">{current.avgLow}</span>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-border">
                    <span className="text-xs text-muted-foreground font-medium block">Humidity</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{current.humidity}</span>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-border">
                    <span className="text-xs text-muted-foreground font-medium block">Rainfall</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{current.rainfall}</span>
                  </div>
                </div>

                {/* 3 Quick Facts with Clean Icons */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Highlights:</strong> {current.bestFor}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Waterways:</strong> {current.riverCondition}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Recommended Attire:</strong> {current.clothingTip}</span>
                  </div>
                </div>

                {/* Wildlife Tags */}
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                    Key Wildlife:
                  </span>
                  {current.keyFauna.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-border text-foreground text-xs px-2.5 py-0.5 rounded-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA bar */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs md:text-base text-muted-foreground">
                  Daily departures with luxury AC boat suites & guided safaris.
                </span>
                <Link
                  href="/tour-details"
                  className="btn btn-primary   font-bold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Clean Minimal Nature Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {natureHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-lg border border-border hover:border-primary/40 transition-colors"
              >
                <div className="h-8 w-8 md:w-10 md:h-10 rounded-md bg-brand-green-soft text-primary flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 md:h-6 md:w-6" />
                </div>
                <h4 className="text-sm  md:text-base font-bold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
