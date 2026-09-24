"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BookingModal } from "@/components/tour/BookingModal";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

interface SpecialDish {
  id: string;
  name: string;
  image: string;
  tag: string;
  description: string;
}

const featuredDishes: SpecialDish[] = [
  {
    id: "mutton-curry",
    name: "Royal Mutton Kosha",
    image: "/assets/images/Punjabi-Mutton-Curry-5.jpg",
    tag: "Royal Delicacy",
    description: "Tender goat meat slow-cooked with golden potatoes & authentic Bengali garam masala.",
  },
  {
    id: "chicken-kosha",
    name: "Bengali Chicken Kosha",
    image: "/assets/images/ChickenKosha.webp",
    tag: "Bengal Special",
    description: "Rich roasted spicy chicken prepared with caramelised onions, ginger, and green chillies.",
  },
  {
    id: "bhetki-curry",
    name: "Bhetki Macher Paturi / Curry",
    image: "/assets/images/Bhetki-Curry.jpeg",
    tag: "Fresh Catch",
    description: "Fresh river bhetki fish cutlets simmered in mustard and fragrant panch phoron gravy.",
  },
  {
    id: "prawn-malai-curry",
    name: "Gold Prawn Malai Curry",
    image: "/assets/images/Prawn-Malai-Curry.jpg",
    tag: "Signature Dish",
    description: "Luscious gold tiger prawns cooked in creamy coconut milk and aromatic spices.",
  },
  {
    id: "shorshe-ilish",
    name: "Shorshe Ilish Bhapa",
    image: "/assets/images/Ilish-Sorshe.jpg",
    tag: "Chef's Special",
    description: "Fresh Hilsa fish steamed in freshly stone-ground mustard paste, green chillies & virgin mustard oil.",
  },
  {
    id: "doi-ilish",
    name: "Traditional Doi Ilish",
    image: "/assets/images/DoiIlish.JPG",
    tag: "Heritage Dish",
    description: "Authentic delta Hilsa simmered in spiced yoghurt gravy with aromatic whole spices.",
  },
  {
    id: "ilish-bhapa-special",
    name: "Sundarban Ilish Bhapa",
    image: "/assets/images/Ilish_Bhapa_Shorshe.webp",
    tag: "Fresh Catch",
    description: "Mouth-watering delta delicacy of succulent Hilsa pieces steamed in banana leaf.",
  },

];

export function TourMenuSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Sundarban Tour Package With Authentic Bengali Menu");

  const handleOpenBooking = (dishName?: string) => {
    setSelectedPackage(
      dishName
        ? `Sundarban Tour Package (Specialty: ${dishName})`
        : "Sundarban Tour Package With Authentic Bengali Menu"
    );
    setIsModalOpen(true);
  };

  return (
    <section
      id="tour-menu"
      className="relative py-8 md:py-16 bg-secondary/10 text-foreground overflow-hidden"
    >



      <div className="container relative z-10">
        {/* Centered Header Section */}
        <div className="sec-header">
          <span className="sec-tagline">
            Our Special Menu
          </span>
          <h2 className="sec-title">
            Best Sundarban Menu
          </h2>
        </div>

        {/* SWIPER SLIDER (HAND DRAG / TOUCH SWIPE - ALWAYS .2 FRACTION PEEK - NO ARROWS & NO BUTTONS) */}
        <div className="cursor-grab active:cursor-grabbing select-none">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.3}
            spaceBetween={16}
            grabCursor={true}
            loop={true}
            speed={600}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.3,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4.2,
                spaceBetween: 24,
              },
            }}
            className=""
          >
            {featuredDishes.map((dish) => (
              <SwiperSlide key={dish.id} className="h-auto">
                <div className="group relative flex flex-col justify-between h-full bg-white border border-border hover:border-secondary transition-all duration-300  overflow-hidden rounded-lg">
                  <div>
                    {/* Dish Image */}
                    <div className="relative h-48 md:h-60 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Tag Badge */}
                      <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 tracking-wider uppercase shadow-md">
                        {dish.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Included in package footer */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <Link href="/packages"

                      className="btn btn-secondary w-full !text-xs !py-2 font-bold  shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>View all package</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


    </section>
  );
}

export default TourMenuSection;
