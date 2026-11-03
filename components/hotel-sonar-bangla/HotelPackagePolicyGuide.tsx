"use client";

import React from "react";
import {
  Briefcase,
  Users,
  AlertTriangle,
  Check,
  X,
  Info,
  ShieldAlert,
  Sun,
  Camera,
  HeartPulse,
  Compass,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const THINGS_TO_CARRY = [
  {
    title: "Original Photo ID Proof",
    desc: "Voter Card / Aadhaar / Passport / Driving License – Mandatory for Forest Permissions & police check-posts (carry physical copies).",
  },
  {
    title: "Light Cotton & Earth-Tone Clothing",
    desc: "Light comfortable clothing & walking shoes/sandals for watchtowers. Prefer olive, khaki, green, or beige; avoid bright red/orange.",
  },
  {
    title: "Sun Protection Essentials",
    desc: "Wide-brim sun hat, UV-protected sunglasses, and high-SPF sunscreen lotion for open-deck river cruising.",
  },
  {
    title: "Personal Medicines & First Aid",
    desc: "Prescribed medicines with extra backup, motion sickness tablets for boat cruising, ORS sachets, and band-aids.",
  },
  {
    title: "Mosquito & Insect Repellent",
    desc: "Odomos cream, mosquito spray, or roll-on for watchtower walks and evening riverbank bonfire.",
  },
  {
    title: "Binoculars & Camera Gear",
    desc: "High-zoom binoculars (8x42 / 10x42) and camera with spare batteries and memory cards (safari boat charging is limited).",
  },
  {
    title: "Refillable Water Bottle & Daypack",
    desc: "Handy refillable water bottle and a lightweight backpack for watchtowers and village walks.",
  },
  {
    title: "Light Woolens (Nov to Feb)",
    desc: "Light windbreaker jacket, sweater, or shawl for early morning delta breeze and winter nights.",
  },
  {
    title: "Personal Toiletries & Flashlight",
    desc: "Hand sanitizer, wet wipes, lip balm, and small LED flashlight / torch for resort grounds.",
  },
  {
    title: "Sufficient Cash in Hand",
    desc: "Delta islands have intermittent network connectivity; ATMs and digital payments (UPI) are limited.",
  },
];

export const CHILD_AGE_POLICIES = [
  {
    title: "Kids below 4 Years (Complimentary)",
    badge: "100% FREE",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    desc: "Children aged 0 to 4 years travel free of charge when sharing bed and food with parents (no separate seat/bed).",
  },
  {
    title: "Kids between 4 to 8 Years (50% Tariff)",
    badge: "50% OF PACKAGE",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    desc: "Charged at 50% of package tariff. Includes full buffet meal plan, dedicated boat safari seat, and shared resort room with parents.",
  },
  {
    title: "Children above 8 Years (Full Tariff)",
    badge: "FULL ADULT TARIFF",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    desc: "Considered as full adult guest with separate bed / extra mattress, full gourmet meal privileges, and safari seat.",
  },
  {
    title: "Child Identification Verification",
    badge: "MANDATORY",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    desc: "Valid photo ID (Aadhaar card, birth certificate, or school ID) must be furnished for government forest permit issuance.",
  },
];

export const IMPORTANT_SAFARI_GUIDELINES = [
  {
    title: "Mandatory Forest Entry Permits",
    desc: "Forest entry permits are strictly issued subject to West Bengal Forest Department regulations and timely submission of government IDs.",
  },
  {
    title: "Tide-Dependent River Cruise Timings",
    desc: "Boat safari timings depend strictly on high tide and low tide river cycles; captains and naturalists may alter creek routes to maximize wildlife sightings.",
  },
  {
    title: "Silent Forest & Wildlife Decorum",
    desc: "Maintain strict silence inside core wildlife channels and watchtowers. Avoid loud talking, shouting, or music.",
  },
  {
    title: "Strict Plastic-Free Bio-Reserve",
    desc: "Sundarban is a protected UNESCO World Heritage plastic-free reserve. Littering, throwing plastic, or waste into riverways is illegal and punishable.",
  },
  {
    title: "No Alcohol & No Smoking on Safaris",
    desc: "Alcohol consumption and smoking are strictly forbidden inside core forest zones, on cruiser boats, and on watchtowers.",
  },
  {
    title: "Wildlife Sightings & Nature's Discretion",
    desc: "Tiger, dolphin, and crocodile sightings depend purely on natural wildlife movements and cannot be guaranteed, though naturalists follow active tracks.",
  },
];

export function ThingsToCarryCard() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-amber-950">
              Things to Carry Checklist
            </h4>
            <span className="text-xs text-amber-700 font-semibold block">
              Essential items recommended for a hassle-free Sundarban mangrove safari
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs hidden sm:inline">
          {THINGS_TO_CARRY.length} Items Checklist
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {THINGS_TO_CARRY.map((item, idx) => (
          <div
            key={idx}
            className="p-3 sm:p-3.5 rounded-lg bg-white border border-amber-200/70 shadow-2xs space-y-1 hover:border-amber-300 transition-colors"
          >
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                  {item.title}
                </h5>
                <p className="text-xs sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChildAgePolicyCard() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 text-blue-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-blue-950">
              Child &amp; Age Policy
            </h4>
            <span className="text-xs text-blue-700 font-semibold block">
              Clear age criteria for complimentary stays, half tickets, and full tariffs
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs hidden sm:inline">
          Official Resort Rules
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {CHILD_AGE_POLICIES.map((policy, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-lg bg-white border border-blue-200/70 shadow-2xs space-y-2 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">
                {policy.title}
              </h5>

            </div>
            <p className="text-xs sm:text-xs text-slate-600 leading-relaxed">
              {policy.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImportantGuidelinesCard() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-emerald-950">
              Important Safari Guidelines &amp; Notes
            </h4>
            <span className="text-xs text-emerald-700 font-semibold block">
              Essential government forest protocols and wildlife reserve compliance
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs hidden sm:inline">
          Forest Dept. Rules
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {IMPORTANT_SAFARI_GUIDELINES.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-lg bg-white border border-emerald-200/70 shadow-2xs space-y-1 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                !
              </span>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                  {item.title}
                </h5>
                <p className="text-xs sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PolicyGuideCardsAll() {
  return (
    <div className="space-y-6">
      <ThingsToCarryCard />
      <ChildAgePolicyCard />
      <ImportantGuidelinesCard />
    </div>
  );
}

