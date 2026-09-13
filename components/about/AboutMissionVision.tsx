"use client";

import React from "react";


export function AboutMissionVision() {
  return (
    <section className="py-12 md:py-16 bg-[#fef8e2] border-y border-amber-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <p className="font-montez text-3xl sm:text-4xl text-[#d97706] mb-1">
            Driven By Purpose
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            Our Mission, Vision & Values
          </h2>
        </div>

        <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed text-left">
          <p>
            <strong className="text-[#0f172a] font-semibold">Our Mission</strong> is to provide immersive, eco-conscious luxury river expeditions through the world’s largest mangrove delta. We are dedicated to delivering five-star comfort and authentic Bengali hospitality while actively championing tiger conservation, mangrove reforestation, and sustainable tourism.
          </p>
          <p>
            <strong className="text-[#0f172a] font-semibold">Our Vision</strong> is to set the gold standard for sustainable eco-tourism across South Asia, proving that premium maritime hospitality and environmental preservation can flourish together. We envision a travel future where every journey leaves the mangrove delta protected, supported, and vibrant.
          </p>
          <p>
            <strong className="text-[#0f172a] font-semibold">Our Values</strong> center on ecological respect, guest safety, and transparent local partnership. Every voyage enforces zero single-use plastics, collaborates directly with native forest guides, and complies with international safety and navigation protocols.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMissionVision;
