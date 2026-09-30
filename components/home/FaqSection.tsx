"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function FaqSection() {
  const { faqs } = useAdmin();
  const activeFaqs = faqs.filter((f) => f.status === "Active");
  const displayFaqs = activeFaqs.length > 0 ? activeFaqs : faqs;

  const [openId, setOpenId] = useState<string | null>(
    displayFaqs[0]?.id || "faq-1"
  );

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="sec-header">
          <p className="sec-tagline">
            FAQ
          </p>
          <h2 className="sec-title">
            Frequently Asked Questions
          </h2>
          <p className="sec-desc">
            Have questions you want answers to?
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4 md:gap-5">
          {displayFaqs.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`border transition-all duration-300 overflow-hidden cursor-pointer bg-white ${isOpen
                  ? "border-[#064e3b] shadow-md shadow-[#064e3b]/5"
                  : "border-slate-200/90 hover:border-[#064e3b]/60"
                  }`}
              >
                {/* Accordion Question Trigger */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className={`w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer transition-colors ${isOpen ? "bg-emerald-50" : "hover:bg-emerald-50/20"}`}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-lg font-bold text-[#0f172a] leading-snug">
                    <span className="text-[#0f172a] mr-1.5">
                      {item.questionNumber || `Q${idx + 1}`}.
                    </span>{" "}
                    {item.question}
                  </span>

                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full group-hover:bg-amber-100 transition-colors duration-300 ${isOpen ? "text-[#064e3b]" : "text-slate-500"
                      }`}
                  >
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-4 text-slate-600 text-xs sm:text-[15px] leading-relaxed border-t border-slate-100/80 bg-white">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
