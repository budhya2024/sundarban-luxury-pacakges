import React from "react";
import { Users, ShieldCheck, Headset, Heart } from "lucide-react";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: Users,
    title: "10,000+ Happy Travellers",
    description: "4.9+ Google ratings from verified happy guests.",
  },
  {
    icon: ShieldCheck,
    title: "100% Safe & Secure",
    description: "Your safety and peace of mind matter the most.",
  },
  {
    icon: Headset,
    title: "24/7 Dedicated Support",
    description: "Always here whenever you need quick assistance.",
  },
  {
    icon: Heart,
    title: "Quick & Easy Booking",
    description: "Plan and book your dream safari in a few clicks.",
  },
];

export function HeroFeaturesBar() {
  return (
    <section className="w-full bg-[#fbfcfb] border-y border-slate-200 py-7 sm:py-9 md:py-11">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            const hasMobileRightBorder = index % 2 === 0;
            const hasMobileBottomBorder = index < 2;
            const hasDesktopRightBorder = index < 3;

            return (
              <div
                key={index}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left px-3 sm:px-6 lg:px-8 ${hasMobileRightBorder ? "border-r border-slate-200" : ""
                  } ${hasMobileBottomBorder ? "border-b border-slate-200 pb-5 sm:pb-6" : "pt-5 sm:pt-6"
                  } ${hasDesktopRightBorder ? "lg:border-r lg:border-slate-200" : "lg:border-r-0"
                  } lg:border-b-0 lg:py-1 first:lg:pl-2 last:lg:pr-2`}
              >
                {/* Icon Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ebf7ee] flex items-center justify-center text-[#2d7a46] mb-2.5 sm:mb-3.5 shadow-xs">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="text-sm lg:text-base font-bold text-[#142d3d] mb-1 sm:mb-1.5 tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs lg:text-sm text-slate-500 font-medium leading-snug sm:leading-relaxed max-w-[220px]">
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
