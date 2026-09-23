"use client";

import React from "react";
import { FaPhone, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";

export function ContactInfoCards() {
  const [info, setInfo] = React.useState({
    phone: "+91 70014 03498",
    email: "sundarbanluxurypackage@gmail.com",
    address: "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
    mapLink: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
    workingHours: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
  });

  React.useEffect(() => {
    fetch("/api/contact")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.generalInfo) {
          const g = data.generalInfo;
          setInfo({
            phone: g.helpdeskPhone || "+91 70014 03498",
            email: g.officialEmail || "sundarbanluxurypackage@gmail.com",
            address: g.mainAddress || "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
            mapLink: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
            workingHours: g.workingHours
              ? g.workingHours.split("\n").filter(Boolean)
              : ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
          });
        }
      })
      .catch(() => { });
  }, []);

  return (
    <section className="py-8 sm:py-16 bg-secondary/5 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">

          {/* 1. Call Us */}
          <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1c4e3a] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                <FaPhone />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Call Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Speak directly with our travel experts
              </p>
            </div>
            <div>
              <a
                href={`tel:${info.phone.replace(/[^0-9+]/g, "")}`}
                className="text-sm font-bold text-slate-900 hover:text-[#1c4e3a] transition-colors"
              >
                {info.phone}
              </a>
            </div>
          </div>

          {/* 2. Email Us */}
          <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e78d1f] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                <FaEnvelope />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Email Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Get a response within 24 hours
              </p>
            </div>
            <div>
              <a
                href={`mailto:${info.email}`}
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#e78d1f] transition-colors break-all"
              >
                {info.email}
              </a>
            </div>
          </div>

          {/* 3. Visit Us */}
          <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#237c73] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                <FaLocationDot />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Visit Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                Our office location
              </p>
            </div>
            <div>
              <a
                href={info.mapLink || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-slate-800 leading-snug hover:text-[#237c73] transition-colors block"
              >
                {info.address}
              </a>
            </div>
          </div>

          {/* 4. Working Hours */}
          <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1c4e3a] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                <FaClock />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Working Hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-4">
                We&apos;re available for you
              </p>
            </div>
            <div className="space-y-0.5 text-xs sm:text-sm font-medium text-slate-800">
              {info.workingHours.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactInfoCards;


