"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, ShieldCheck, HeartHandshake } from "lucide-react";

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

              {/* Secondary Overlapping Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=600"
                  alt="Royal Bengal Tiger in Sundarban Delta"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Floating 12+ Years Experience Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 rounded-2xl bg-[#064e3b] text-white p-4 sm:p-5 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-[#fbbf24]" />
                </div>
                <div>
                  <span className="block text-2xl font-extrabold leading-none text-[#fbbf24]">12+ Years</span>
                  <span className="text-xs font-medium text-white uppercase tracking-wider mt-1 block">
                    Luxury Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Text (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-montez text-3xl sm:text-4xl text-[#d97706] mb-1">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
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
