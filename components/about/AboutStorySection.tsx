"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";

export function AboutStorySection() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Large Image */}
              <div className="relative h-[340px] sm:h-[420px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000"
                  alt="Sundarban Luxury Boat Safari Vessel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>



            </div>
          </div>

          {/* Right Column: Story Text (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="sec-tagline text-left">
                Our Story
              </p>
              <h2 className="sec-title text-left leading-tight">
                Crafting Unforgettable Sundarban Expeditions
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Founded with a passion for wildlife conservation and refined hospitality, <span className="font-semibold text-[#0f172a]">Sundarban Luxury Package</span> was created to revolutionize eco-tourism in the world’s largest estuarine mangrove delta.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We operate state-of-the-art solar hybrid vessels equipped with luxury AC cabins, panoramic observation decks, and zero-emission electric motors to navigate narrow mangrove creeks without disturbing the wildlife.
            </p>

            {/* Feature Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Solar Hybrid Vessels", desc: "Zero noise & low emission navigation" },
                { title: "Forest Department Guides", desc: "Expert tracking & watchtower permits" },
                { title: "Chef-Curated Meals", desc: "Organic Bengali & continental cuisine" },
                { title: "AC Luxury Transfers", desc: "Kolkata pickup & drop-off included" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-sm bg-amber-50/70 border border-amber-100">
                  <CheckCircle2 className="w-5 h-5 text-[#064e3b] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#064e3b]" />
                <span>100% Certified Eco-Tour Operator</span>
              </div>
              <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm">
                <HeartHandshake className="w-5 h-5 text-[#064e3b]" />
                <span>Local Community Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStorySection;
