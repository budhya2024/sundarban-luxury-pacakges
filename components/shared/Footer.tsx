"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Star,
} from "lucide-react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa6";
import { useAdmin } from "@/context/AdminContext";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Hotel Sonar Bangla", href: "/hotel-sonar-bangla" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Contact Us", href: "/contact" },
];



function FooterSundarbanLogo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/assets/images/brand-logo.png"
        alt="Sundarban Luxury Package"
        width={180}
        height={50}
        className="h-10 sm:h-12 w-auto object-contain"
      />
    </Link>
  );
}

const footerSeoLinks = [
  {
    label: "Sundarban Package Tour with Luxury Hotel Sonar Bangla",
    href: "/sundarban-package-tour-with-luxury-hotel-sonar-bangla",
  },
  {
    label: "Hotel Sonar Bangla Sundarban Weekend Tour Package from Kolkata",
    href: "/hotel-sonar-bangla-sundarban-weekend-tour-package-from-kolkata",
  },
  {
    label: "Best Sundarban Tour Package with Hotel Sonar Bangla Stay",
    href: "/best-sundarban-tour-package-with-hotel-sonar-bangla-stay",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { packages } = useAdmin();

  // Get up to 4 active/published packages for popular tours
  const popularTours = packages
    .filter((p) => p.status !== "Draft")
    .slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-brand-green-dark text-slate-200 pt-8 md:pt-16 relative z-20 border-t border-primary">
      <div className="container">
        {/* 2. Main 4-Column Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-8 md:pb-16">
          {/* Col 1: Brand Info & Socials (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <FooterSundarbanLogo />
              <p className="text-sm text-white/90 leading-relaxed mt-5 max-w-sm font-normal">
                Experience the magical Sundarban mangrove forest with the premier luxury safari tour company. Premium AC boat cruises, Hotel Sonar Bangla stays, and curated wildlife expeditions.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61594403583459"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-secondary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="https://wa.me/917001403498"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-secondary hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/sundarbanluxurypackage/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-secondary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.youtube.com/@sundarbanluxurypackage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.pinterest.com/sundarbanluxurypackage/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-red-700 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterestP className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 hover:text-brand-yellow-light transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-amber-400 group-hover:text-brand-yellow-light transition-transform group-hover:translate-x-0.5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Tours (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white mb-5">Popular Tours</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {popularTours.length > 0 ? (
                popularTours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      href={`/tour/${tour.slug || tour.id}`}
                      className="group inline-flex items-center gap-2 hover:text-brand-yellow-light transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-amber-400 group-hover:text-brand-yellow-light transition-transform group-hover:translate-x-0.5" />
                      <span>{tour.name}</span>
                    </Link>
                  </li>
                ))
              ) : (
                [
                  { label: "Sundarban 1N 2D Tour", href: "/packages" },
                  { label: "Sundarban 2N 3D Tour", href: "/packages" },
                  { label: "Sundarban 3N 4D Tour", href: "/packages" },
                  { label: "Luxury Cruise Package", href: "/packages" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 hover:text-brand-yellow-light transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-amber-400 group-hover:text-brand-yellow-light transition-transform group-hover:translate-x-0.5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Col 4: Get In Touch (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white mb-5">Get In Touch</h3>
            <div className="flex flex-col gap-4 text-sm text-white/90">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="leading-snug">
                  <a href="tel:+917001403498" className="hover:text-brand-yellow-light transition-colors block">
                    +91 70014 03498
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div className="leading-snug">
                  <a href="mailto:sundarbanluxurypackage@gmail.com" className="hover:text-brand-yellow-light transition-colors block break-all">
                    sundarbanluxurypackage@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="leading-snug">
                  <a
                    href="https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-yellow-light transition-colors block"
                  >
                    Sundarban Luxury Package, <br />
                    Dulki, Gosaba, West Bengal 743370
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Horizontal SEO Footer Links Section */}
        <div className="border-t border-white/10 py-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex flex-wrap items-center justify-start gap-x-2.5 gap-y-2 text-left">
            {footerSeoLinks.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-white/30 font-light">|</span>}
                <Link
                  href={item.href}
                  className="hover:text-brand-yellow-light transition-colors"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4. Bottom Copyright & Legal Links */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-200">
          <p className="text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} Sundarban Luxury Package. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs text-slate-200">
            <Link href="/terms-and-conditions" className="hover:text-brand-yellow-light transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/sitemap" className="hover:text-brand-yellow-light transition-colors">
              Site Map
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/privacy-policy" className="hover:text-brand-yellow-light transition-colors">
              Privacy Policy
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

