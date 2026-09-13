"use client";

import React from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";

interface ContactCard {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  details: string[];
}

const contactCards: ContactCard[] = [
  {
    id: "address",
    icon: FaLocationDot,
    title: "Head Office",
    subtitle: "Launch & Reservation Center",
    details: ["Godkhali Ferry Ghat, Canning Town", "South 24 Parganas, West Bengal 743329"],
  },
  {
    id: "phone",
    icon: FaPhone,
    title: "Phone & WhatsApp",
    subtitle: "24/7 Cruise Assistance",
    details: ["+91 98765 43210 (Hotline)", "+91 91234 56789 (WhatsApp)"],
  },
  {
    id: "email",
    icon: FaEnvelope,
    title: "Email Support",
    subtitle: "Inquiries & Reservations",
    details: ["booking@sundarbanluxury.com", "info@sundarbanluxury.com"],
  },
  {
    id: "hours",
    icon: FaClock,
    title: "Operating Hours",
    subtitle: "Always At Your Service",
    details: ["Mon - Sat: 8:00 AM - 9:00 PM", "Sunday: 9:00 AM - 6:00 PM"],
  },
];

export function ContactInfoCards() {
  return (
    <section className="py-12 md:py-16 bg-[#fef8e2] border-b border-amber-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group flex flex-col rounded-sm justify-between  bg-white p-7 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-sm bg-amber-50 text-[#d97706] group-hover:bg-[#064e3b] group-hover:text-[#fbbf24] flex items-center justify-center text-2xl transition-colors duration-300 mb-6 shadow-xs">
                    <Icon />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#064e3b] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#d97706] mb-4">
                    {card.subtitle}
                  </p>

                  {/* Details Lines */}
                  <div className="space-y-1.5 text-sm text-slate-600 font-normal">
                    {card.details.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
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

export default ContactInfoCards;
