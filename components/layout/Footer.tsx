"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Hotel Sonar Bangla", href: "/hotel-sonar-bangla" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Tour Packages", href: "/tour-details" },
  { label: "Contact Us", href: "/contact" },
];

const instagramPosts = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80",
    alt: "Eiffel Tower Paris",
  },
  {
    id: 2,
    src: "/assets/images/resort-deck.jpg",
    alt: "Sundarban luxury resort deck",
  },
  {
    id: 3,
    src: "/assets/images/boat-safari.jpg",
    alt: "Sundarban boat safari",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
    alt: "Family on beach",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=300&q=80",
    alt: "Scenic mountain view",
  },
  {
    id: 6,
    src: "/assets/images/luxury-cruise.jpg",
    alt: "Luxury cruise ship",
  },
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

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
        {/* 1. Top Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 md:pb-16">
          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight text-center lg:text-left">
              Get Updated The Latest <br />
              Newsletter
            </h2>
          </div>

          {/* Subscribe Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-xl"
          >
            <div className="relative w-full sm:w-[320px] md:w-[360px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-yellow-light focus:ring-1 focus:ring-brand-yellow-light transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 text-white px-7 py-3.5 font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>{subscribed ? "Subscribed!" : "Subscribe Now"}</span>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Separator Line */}
        <div className="border-t border-white/10" />

        {/* 2. Main 4-Column Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14 md:py-16">
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
                href="#instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-300 hover:bg-secondary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 Cols) */}
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

          {/* Col 3: Get In Touch (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white mb-5">Get In Touch</h3>
            <div className="flex flex-col gap-4 text-sm text-white/90">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="leading-snug">
                  <a href="tel:+917001403498" className="hover:text-brand-yellow-light transition-colors block">
                    +91 70014 03498
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="leading-snug">
                  <a href="mailto:sundarbanluxurypackage@gmail.com" className="hover:text-brand-yellow-light transition-colors block break-all">
                    sundarbanluxurypackage@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-yellow-light">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="leading-snug">
                  Godkhali Ferry Ghat, Canning Town, <br />
                  South 24 Parganas, West Bengal 743329
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Instagram Post (2.5 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white mb-5">Instagram Post</h3>
            <div className="grid grid-cols-3 gap-2.5 max-w-[260px]">
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative h-18 w-18 md:h-19 md:w-19 rounded-xl overflow-hidden bg-white/5 cursor-pointer"
                >
                  <Image
                    src={post.src}
                    alt={post.alt}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                    <FaInstagram className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Payment Gateways */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-200">
          <p className="text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} Sundarban Luxury Package. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-200">
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

