"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BookingModal } from "@/components/tour/BookingModal";

// Import Swiper styles
import "swiper/css";

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
  {
    id: "special-mutton-kasha",
    name: "Special Mutton Kosha",
    image: "/assets/images/menu/mutton-curry.jpg",
    tag: "House Special",
    description: "Slow-braised delta style rich mutton curry seasoned with whole aromatic spices.",
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
      className="relative py-8 md:py-16 bg-[#faf6ee] text-[#0f172a] border-b border-amber-900/10 overflow-hidden"
    >
      {/* Food & Culinary Related Texture Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23064e3b' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 10v10a3 3 0 0 0 3 3v8M18 10v10a3 3 0 0 1-3 3M15 10v6M26 10v21M26 10a4 4 0 0 1 4 4v7h-4'/%3E%3Cpath d='M72 24h24a12 12 0 0 1-24 0zM70 24h28M78 12c1 2-1 4 0 6M84 10c1 2-1 4 0 6M90 12c1 2-1 4 0 6'/%3E%3Cpath d='M42 58c10-8 24-8 32 2-8 10-22 10-32 2l-6 4v-8l6 2zM66 59a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/%3E%3Cpath d='M12 104h20v4H12zM14 104a6 6 0 0 1-3-11 7 7 0 0 1 12-4 7 7 0 0 1 12 4 6 6 0 0 1-3 11'/%3E%3Cpath d='M74 106h26M76 106a11 11 0 0 1 22 0M87 95a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/%3E%3Cpath d='M46 16c4-6 12-4 14 2s-4 8-10 6c-3-1-5-4-4-8zM58 14c2-2 5-2 6 0'/%3E%3Cpath d='M102 54h14v10a7 7 0 0 1-14 0v-10zM116 57h3a2 2 0 0 1 0 4h-3M100 68h18'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />



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
            slidesPerView={1.2}
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
                slidesPerView: 1.2,
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
            className="!pb-6 !pt-2"
          >
            {featuredDishes.map((dish) => (
              <SwiperSlide key={dish.id} className="h-auto">
                <div className="group relative flex flex-col justify-between h-full bg-white border border-amber-900/15 hover:border-[#064e3b] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
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
                      <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mb-1.5 group-hover:text-[#064e3b] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Included in package footer */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <button
                      onClick={() => handleOpenBooking(dish.name)}
                      className="btn btn-primary w-full !py-2.5 !px-3 !text-xs font-bold !rounded-md shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Book Package</span>
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
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedPackage}
      />
    </section>
  );
}

export default TourMenuSection;
