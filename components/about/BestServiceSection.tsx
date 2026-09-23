"use client";

import React from "react";
import Link from "next/link";
import { Award, Percent, Wallet, ArrowUpRight } from "lucide-react";

export function BestServiceSection() {
  const services = [
    {
      icon: Award,
      iconBg: "bg-secondary", // Theme Amber / Gold
      title: "Local Guidance",
      description: "Travel agencies have experienced professionals guidance.",
    },
    {
      icon: Percent,
      iconBg: "bg-primary", // Theme Deep Forest Green
      title: "Deals & Discounts",
      description: "Agencies have special discounts on flights, hotels, & packages.",
    },
    {
      icon: Wallet,
      iconBg: "bg-secondary", // Theme Amber / Gold
      title: "Saves Money",
      description: "Avoids hidden fees & tourist traps, Multi-destination & budget-friendly options.",
    },
  ];

  return (
    <section className="">
      <div className="container">
        <div className="bg-secondary/10 rounded-2xl p-4 sm:p-6 md:p-10 shadow-xs">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center tracking-tight mb-8 md:mb-12 border-b border-primary/9 pb-6">
            Best Sundarban Tour Packages provided by Us
          </h2>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pill CTA Button */}
          <div className="flex justify-center mt-6 md:mt-12">
            <Link
              href="/packages"
              className="btn btn-primary  flex-wrap cursor-pointer shadow-md"
            >
              <span>Up to 20% OFF All Packages</span>
              <span className="inline-flex items-center gap-1 font-semibold opacity-95 shrink-0">
                Check Offer <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestServiceSection;
