"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Map,
  BookOpen,
  ShieldCheck,
  PhoneCall,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  FileText,
  Building2,
  Image as ImageIcon,
  HelpCircle,
  Clock,
  MapPin,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

interface SitemapCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  links: {
    label: string;
    href: string;
    badge?: string;
    description?: string;
    isExternal?: boolean;
  }[];
}

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicPackages, setDynamicPackages] = useState<{ name: string; slug: string; duration?: string }[]>([]);
  const [dynamicBlogs, setDynamicBlogs] = useState<{ title: string; slug: string }[]>([]);

  // Fetch dynamic packages and blogs for up-to-date sitemap links
  useEffect(() => {
    fetch("/api/packages?status=Active")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.packages)) {
          setDynamicPackages(
            data.packages.map((pkg: any) => ({
              name: pkg.name,
              slug: pkg.slug || pkg.id,
              duration: pkg.duration || pkg.tagline,
            }))
          );
        }
      })
      .catch(() => { });

    fetch("/api/blog")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.blogs)) {
          setDynamicBlogs(
            data.blogs.map((b: any) => ({
              title: b.title,
              slug: b.slug || b.id,
            }))
          );
        }
      })
      .catch(() => { });
  }, []);

  // Default packages list if API response isn't ready
  const packageLinks =
    dynamicPackages.length > 0
      ? dynamicPackages.map((p) => ({
        label: p.name,
        href: `/tour/${p.slug}`,
        badge: p.duration || "Tour Package",
        description: `Customized itinerary and luxury safari booking for ${p.name}.`,
      }))
      : [
        {
          label: "1 Night 2 Days Luxury Cruise Package",
          href: "/tour/1-night-2-days-luxury-cruise",
          badge: "1N / 2D",
          description: "Express weekend cruise & tiger watchtower safari.",
        },
        {
          label: "2 Nights 3 Days Complete Tiger Trail Expedition",
          href: "/tour/2-nights-3-days-tiger-trail",
          badge: "2N / 3D Popular",
          description: "Deep mangrove creeks, village cultural show & watchtowers.",
        },
        {
          label: "Hotel Sonar Bangla 5-Star Resort Stay Package",
          href: "/tour/hotel-sonar-bangla-resort-package",
          badge: "Luxury Resort",
          description: "Premium resort accommodation with private launch safari.",
        },
        {
          label: "1 Day Sundarban Day Safari Expedition",
          href: "/tour/1-day-sundarban-day-safari",
          badge: "Day Tour",
          description: "Same-day trip from Kolkata to Godkhali ghat and back.",
        },
        {
          label: "Private Houseboat Royal Charter Package",
          href: "/tour/private-luxury-houseboat-charter",
          badge: "Private Charter",
          description: "Exclusive AC houseboat for corporate & VIP family groups.",
        },
      ];

  // Default blogs list
  const blogLinks =
    dynamicBlogs.length > 0
      ? dynamicBlogs.map((b) => ({
        label: b.title,
        href: `/blog/${b.slug}`,
        description: `Read in-depth guide: ${b.title}.`,
      }))
      : [
        {
          label: "Honey Collectors of Sundarban (Mowalis)",
          href: "/blog/sundarban-honey-collectors",
          description: "The perilous journey of traditional wild honey gatherers.",
        },
        {
          label: "Wildlife Photography Guide in Sundarban",
          href: "/blog/wildlife-photography-sundarban",
          description: "Camera gear, best seasons, and tiger spotting camera tips.",
        },
      ];

  const categories: SitemapCategory[] = [
    {
      id: "main-pages",
      title: "Main Site Pages",
      description: "Primary landing pages and information portals",
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      color: "border-emerald-200 bg-emerald-50/50",
      links: [
        {
          label: "Home Page",
          href: "/",
          badge: "Main Landing",
          description: "Welcome portal, featured tour packages, customer reviews & booking bar.",
        },
        {
          label: "About Us",
          href: "/about",
          description: "Our company history, eco-tourism principles, boat fleet, and guide staff.",
        },
        {
          label: "Hotel Sonar Bangla Resort",
          href: "/hotel-sonar-bangla",
          badge: "5-Star Resort",
          description: "Luxury resort amenities, swimming pool, luxury dining, and room packages.",
        },
        {
          label: "Hotel Sonar Bangla Package Price & Cost",
          href: "/hotel-sonar-bangla-sundarban-tour-package-price-cost",
          badge: "Price & Cost Guide",
          description: "Complete transparent breakdown of package prices, room rates, inclusions & exclusions.",
        },
        {
          label: "Tour Packages Catalog",
          href: "/packages",
          description: "Browse all Sundarban jungle safari itineraries, pricing & inclusions.",
        },
        {
          label: "Photo & Video Gallery",
          href: "/gallery",
          description: "High-resolution photos of tigers, spotted deer, luxury boats & resorts.",
        },
        {
          label: "Contact Us & Helpline",
          href: "/contact",
          description: "Office location map, 24/7 travel advisor phone helpline, and inquiry form.",
        },
      ],
    },
    {
      id: "tour-packages",
      title: "Safari & Cruise Packages",
      description: "Customized tour itineraries and private charters",
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      color: "border-amber-200 bg-amber-50/50",
      links: packageLinks,
    },
    {
      id: "travel-blog",
      title: "Travel Guides & Blog",
      description: "Insights, wildlife tips, and local cultural stories",
      icon: <BookOpen className="w-5 h-5 text-teal-600" />,
      color: "border-teal-200 bg-teal-50/50",
      links: [
        {
          label: "Blog Home & Travel Directory",
          href: "/blog",
          badge: "All Articles",
          description: "Explore all articles on Sundarban ecosystem, flora & fauna.",
        },
        ...blogLinks,
      ],
    },
    {
      id: "legal-policies",
      title: "Legal & Governance",
      description: "Terms of service, privacy compliance, and site map",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      color: "border-blue-200 bg-blue-50/50",
      links: [
        {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
          description: "Permit rules, cancellation policy, refund terms & baggage guidelines.",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
          description: "How we collect, protect, and encrypt user data & permit IDs.",
        },
        {
          label: "HTML Site Map",
          href: "/sitemap",
          badge: "Current Page",
          description: "Complete list of active links and indexable website paths.",
        },
      ],
    },
    {
      id: "direct-contact",
      title: "Support & Instant Connect",
      description: "Reach our travel experts across multiple channels",
      icon: <PhoneCall className="w-5 h-5 text-rose-600" />,
      color: "border-rose-200 bg-rose-50/50",
      links: [
        {
          label: "Phone Helpline: +91 70014 03498",
          href: "tel:+917001403498",
          badge: "Call Now",
          description: "24/7 direct phone support with expert tour planner Souvik.",
          isExternal: true,
        },
        {
          label: "WhatsApp Support Chat",
          href: "https://wa.me/917001403498",
          badge: "Instant Chat",
          description: "Send a message on WhatsApp for instant quote and seat availability.",
          isExternal: true,
        },
        {
          label: "Official Email: sundarbanluxurypackage@gmail.com",
          href: "mailto:sundarbanluxurypackage@gmail.com",
          description: "Send formal booking requests, group quotes, or invoice inquiries.",
          isExternal: true,
        },
        {
          label: "Google Maps Office Location",
          href: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
          description: "Sundarban Luxury Package, Dulki, Gosaba, West Bengal 743370.",
          isExternal: true,
        },
      ],
    },
  ];

  // Filter links based on user search query
  const filteredCategories = categories.map((cat) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return cat;
    const matchingLinks = cat.links.filter(
      (l) =>
        l.label.toLowerCase().includes(q) ||
        (l.description && l.description.toLowerCase().includes(q)) ||
        (l.badge && l.badge.toLowerCase().includes(q))
    );
    return { ...cat, links: matchingLinks };
  }).filter((cat) => cat.links.length > 0);

  const totalLinks = categories.reduce((sum, c) => sum + c.links.length, 0);

  return (
    <main className="min-h-screen bg-[#fcfdfe] text-[#0f172a]">
      {/* Hero Header Banner */}
      <section className="relative bg-brand-green-dark text-white py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/images/winter.jpg')` }}
        />

        {/* Black 50% Overlay Layer */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">


          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md mb-4">
            HTML Site Map
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Navigate through all pages, safari tour packages, resort accommodations, wildlife guides, and contact channels across Sundarban Luxury Package.
          </p>

          {/* Breadcrumb Navigation */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <span className="text-amber-400">»</span>
            <span className="text-amber-300 font-bold">Site Map</span>
          </div>
        </div>
      </section>

      {/* Main Sitemap Content & Interactive Filter */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Top Search & Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-[6px] p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sitemap links (e.g. Sonar Bangla, Cruise, Contact)..."
                className="w-full h-10 pl-10 pr-4 rounded-[4px] border border-slate-300 bg-slate-50/50 text-slate-900 text-xs font-medium focus:outline-none focus:border-brand-green-medium focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-slate-100 border border-slate-200">
                <Layers className="w-3.5 h-3.5 text-brand-green-medium" />
                <span>{categories.length} Categories</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{totalLinks} Total Links</span>
              </span>
            </div>
          </div>

          {/* Sitemap Categories Display */}
          {filteredCategories.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-[6px] p-12 text-center max-w-md mx-auto space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No matching links found</h3>
              <p className="text-xs text-slate-500">
                No sitemap items matched &quot;{searchQuery}&quot;. Try searching for &quot;tour&quot;, &quot;resort&quot;, or &quot;contact&quot;.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-brand-green-dark text-white rounded-[4px] text-xs font-bold hover:bg-brand-green-primary transition-colors"
              >
                Reset Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white border border-slate-200 rounded-[6px] shadow-2xs overflow-hidden flex flex-col justify-between"
                >
                  {/* Category Header */}
                  <div className={`p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3 ${cat.color}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs">
                        {cat.icon}
                      </div>
                      <div>
                        <h2 className="text-base font-extrabold text-slate-900">
                          {cat.title}
                        </h2>
                        <p className="text-xs text-slate-600 mt-0.5 font-medium">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-[4px] border border-slate-200">
                      {cat.links.length} items
                    </span>
                  </div>

                  {/* Links List */}
                  <div className="p-4 sm:p-5 divide-y divide-slate-100 flex-1">
                    {cat.links.map((link, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 group">
                        <Link
                          href={link.href}
                          target={link.isExternal ? "_blank" : "_self"}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="flex items-start justify-between gap-3 text-slate-800 hover:text-brand-green-medium transition-colors"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <ChevronRight className="w-3.5 h-3.5 text-brand-yellow-dark group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-green-primary">
                                {link.label}
                              </span>
                              {link.badge && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  {link.badge}
                                </span>
                              )}
                              {link.isExternal && (
                                <ExternalLink className="w-3 h-3 text-slate-400 inline" />
                              )}
                            </div>
                            {link.description && (
                              <p className="text-[11px] text-slate-500 pl-5 leading-normal font-normal">
                                {link.description}
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 flex-shrink-0 pt-0.5">
                            {link.href}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Assistance Banner */}
          <div className="bg-brand-green-dark text-white rounded-[6px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-brand-green-medium">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Looking for something specific?</span>
              </h3>
              <p className="text-xs text-slate-200 max-w-xl">
                Our 24/7 Sundarban safari experts are available to guide you through customized package itineraries, Hotel Sonar Bangla resort bookings, and forest permits.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-[4px] bg-secondary hover:bg-secondary/90 text-white text-xs font-bold transition-all shadow-2xs"
              >
                Contact Support
              </Link>
              <a
                href="https://wa.me/917001403498"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-[4px] bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
