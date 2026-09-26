"use client";

import React from "react";
import { FaPhone, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";

import { useAdmin } from "@/context/AdminContext";

export function ContactInfoCards() {
  const { contactGeneralInfo } = useAdmin();

  const [info, setInfo] = React.useState({
    phone: contactGeneralInfo?.helpdeskPhone || "+91 70014 03498",
    email: contactGeneralInfo?.officialEmail || "sundarbanluxurypackage@gmail.com",
    address: contactGeneralInfo?.mainAddress || "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
    mapLink: contactGeneralInfo?.googleMapEmbedUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
    workingHours: contactGeneralInfo?.workingHours
      ? contactGeneralInfo.workingHours.split("\n").filter(Boolean)
      : ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
  });

  React.useEffect(() => {
    if (contactGeneralInfo) {
      setInfo({
        phone: contactGeneralInfo.helpdeskPhone || "+91 70014 03498",
        email: contactGeneralInfo.officialEmail || "sundarbanluxurypackage@gmail.com",
        address: contactGeneralInfo.mainAddress || "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
        mapLink: contactGeneralInfo.googleMapEmbedUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
        workingHours: contactGeneralInfo.workingHours
          ? contactGeneralInfo.workingHours.split("\n").filter(Boolean)
          : ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      });
    }
  }, [contactGeneralInfo]);

  const callCard = {
    title: contactGeneralInfo?.callCardTitle || "Call Us",
    subtitle: contactGeneralInfo?.callCardSubtitle || "Speak directly with our travel experts",
    detail: contactGeneralInfo?.helpdeskPhone || "+91 70014 03498",
    status: contactGeneralInfo?.callCardStatus || "Active",
  };

  const emailCard = {
    title: contactGeneralInfo?.emailCardTitle || "Email Us",
    subtitle: contactGeneralInfo?.emailCardSubtitle || "Get a response within 24 hours",
    detail: contactGeneralInfo?.officialEmail || "sundarbanluxurypackage@gmail.com",
    status: contactGeneralInfo?.emailCardStatus || "Active",
  };

  const visitCard = {
    title: contactGeneralInfo?.visitCardTitle || "Visit Us",
    subtitle: contactGeneralInfo?.visitCardSubtitle || "Our office location",
    detail: contactGeneralInfo?.mainAddress || "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370",
    mapLink: contactGeneralInfo?.googleMapEmbedUrl || "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
    status: contactGeneralInfo?.visitCardStatus || "Active",
  };

  const hoursCard = {
    title: contactGeneralInfo?.hoursCardTitle || "Working Hours",
    subtitle: contactGeneralInfo?.hoursCardSubtitle || "We're available for you",
    detail: contactGeneralInfo?.workingHours
      ? contactGeneralInfo.workingHours.split("\n").filter(Boolean)
      : ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    status: contactGeneralInfo?.hoursCardStatus || "Active",
  };

  return (
    <section className="py-8 sm:py-16 bg-secondary/5 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">

          {/* 1. Call Us */}
          {callCard.status !== "Inactive" && (
            <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1c4e3a] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                  <FaPhone />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {callCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {callCard.subtitle}
                </p>
              </div>
              <div>
                <a
                  href={`tel:${callCard.detail.replace(/[^0-9+]/g, "")}`}
                  className="text-sm font-bold text-slate-900 hover:text-[#1c4e3a] transition-colors"
                >
                  {callCard.detail}
                </a>
              </div>
            </div>
          )}

          {/* 2. Email Us */}
          {emailCard.status !== "Inactive" && (
            <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e78d1f] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                  <FaEnvelope />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {emailCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {emailCard.subtitle}
                </p>
              </div>
              <div>
                <a
                  href={`mailto:${emailCard.detail}`}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#e78d1f] transition-colors break-all"
                >
                  {emailCard.detail}
                </a>
              </div>
            </div>
          )}

          {/* 3. Visit Us */}
          {visitCard.status !== "Inactive" && (
            <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#237c73] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                  <FaLocationDot />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {visitCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {visitCard.subtitle}
                </p>
              </div>
              <div>
                <a
                  href={visitCard.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-slate-800 leading-snug hover:text-[#237c73] transition-colors block"
                >
                  {visitCard.detail}
                </a>
              </div>
            </div>
          )}

          {/* 4. Working Hours */}
          {hoursCard.status !== "Inactive" && (
            <div className="bg-[#f9fbf9] rounded-2xl p-6 sm:p-7 border border-[#e1e9e1] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1c4e3a] text-white flex items-center justify-center text-xl mb-5 shadow-xs">
                  <FaClock />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {hoursCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {hoursCard.subtitle}
                </p>
              </div>
              <div className="space-y-0.5 text-xs sm:text-sm font-medium text-slate-800">
                {Array.isArray(hoursCard.detail) ? (
                  hoursCard.detail.map((line, idx) => <p key={idx}>{line}</p>)
                ) : (
                  <p>{hoursCard.detail}</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default ContactInfoCards;


