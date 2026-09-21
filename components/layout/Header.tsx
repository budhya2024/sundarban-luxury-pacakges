"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import {
    MapPin,
    Clock,
    Sparkles,
    ChevronDown,
    ChevronRight,
    ArrowRight,
    Menu,
    X,
    Globe,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface NavItem {
    label: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { label: string; href: string }[];
}

const DEFAULT_TRIP_DROPDOWN = [
    { label: "1 Night 2 Days Luxury Cruise Package", href: "/tour/1-night-2-days-luxury-cruise" },
    { label: "2 Nights 3 Days Complete Tiger Trail Expedition", href: "/tour/2-nights-3-days-tiger-trail" },
    { label: "Hotel Sonar Bangla 5-Star Resort Stay & Cruise", href: "/tour/hotel-sonar-bangla-resort-package" },
    { label: "1 Day Sundarban Day Safari", href: "/tour/1-day-sundarban-day-safari" },
    { label: "Private Luxury Houseboat Royal Charter", href: "/tour/private-luxury-houseboat-charter" },
];

function SundarbanLogo() {
    return (
        <Link href="/" className="inline-flex items-center">
            <Image
                src="/assets/images/brand-logo.png"
                alt="Sundarban Luxury Package"
                width={180}
                height={50}
                priority
                className="h-10 sm:h-12 w-auto object-contain"
            />
        </Link>
    );
}

export function Header() {
    const pathname = usePathname();
    const { packages } = useAdmin();
    const [apiTripItems, setApiTripItems] = useState<{ label: string; href: string }[] | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isPastHero, setIsPastHero] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const lastScrollY = useRef(0);

    // Fetch live tour packages sorted by createdAt ascending
    useEffect(() => {
        fetch("/api/packages?sort=createdAt_asc&status=Active")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.success && Array.isArray(data.packages) && data.packages.length > 0) {
                    setApiTripItems(
                        data.packages.map((pkg: any) => ({
                            label: pkg.name,
                            href: `/tour/${pkg.slug}`,
                        }))
                    );
                }
            })
            .catch(() => {});
    }, []);

    // Memoize Trip Dropdown in created datetime ascending manner
    const tripDropdownItems = useMemo(() => {
        if (apiTripItems && apiTripItems.length > 0) {
            return apiTripItems;
        }
        if (packages && packages.length > 0) {
            const activePkgs = [...packages].filter((p) => p.status === "Active");
            activePkgs.sort((a, b) => {
                const timeA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
                const timeB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
                return timeA - timeB;
            });
            return activePkgs.map((pkg) => ({
                label: pkg.name,
                href: `/tour/${pkg.slug}`,
            }));
        }
        return DEFAULT_TRIP_DROPDOWN;
    }, [apiTripItems, packages]);

    const navItems: NavItem[] = useMemo(
        () => [
            {
                label: "Home",
                href: "/",
            },
            {
                label: "About Us",
                href: "/about",
            },
            {
                label: "Trip",
                href: "#trip",
                hasDropdown: true,
                dropdownItems: tripDropdownItems,
            },
            {
                label: "Hotel",
                href: "/hotel-sonar-bangla",
            },
            {
                label: "Gallery",
                href: "/gallery",
            },
            {
                label: "Blog",
                href: "/blog",
            },
            {
                label: "Contact Us",
                href: "/contact",
            },
        ],
        [tripDropdownItems]
    );


    const isItemActive = (item: NavItem) => {
        if (item.href === "/" && pathname === "/") return true;
        if (item.href !== "/" && item.href !== "#trip" && item.href !== "#" && pathname.startsWith(item.href)) return true;
        if (item.hasDropdown && item.dropdownItems) {
            return item.dropdownItems.some(
                (sub) => sub.href !== "#" && (pathname === sub.href || pathname.startsWith(sub.href))
            );
        }
        return false;
    };

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const delta = currentScrollY - lastScrollY.current;
                    const heroThreshold = 460; // Complete hero section threshold

                    if (currentScrollY <= heroThreshold) {
                        // While inside or at the hero section, let the header stay in its natural top place
                        setIsPastHero(false);
                        setIsRevealed(false);
                    } else {
                        // After completing/passing the hero section
                        setIsPastHero(true);

                        // Scrolling DOWN -> hide sticky header
                        if (delta > 6) {
                            setIsRevealed(false);
                        }
                        // Scrolling UP -> smoothly reveal sticky header
                        else if (delta < -6) {
                            setIsRevealed(true);
                        }
                    }

                    lastScrollY.current = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="w-full relative z-40 bg-white">
            {/* 1. Top Bar — Rotating Sliding Announcement Component */}
            <AnnouncementBar />

            {/* 2. Main Navigation Bar (Normal Top Flow & Sticky Scroll-Up after Hero) */}
            <div
                className={`w-full z-50 transition-all duration-300 ease-out will-change-transform ${isPastHero
                    ? `fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] border-b border-slate-100 ${isRevealed ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
                    }`
                    : "relative bg-white border-b border-transparent translate-y-0 opacity-100 pointer-events-auto"
                    }`}
            >
                <div className="container flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="relative flex items-center py-3.5 pr-6">
                        <SundarbanLogo />
                    </div>

                    {/* Center Navigation Links (Desktop) */}
                    <nav className="hidden xl:flex items-center gap-7 text-[15px] font-semibold">
                        {navItems.map((item) => {
                            const active = isItemActive(item);
                            return (
                                <div
                                    key={item.label}
                                    className="relative group py-5"
                                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                                    onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={`relative py-1 inline-flex items-center gap-1.5 transition-colors duration-200 ${active
                                            ? "text-primary font-bold"
                                            : "text-foreground hover:text-primary"
                                            }`}
                                    >
                                        <span>{item.label}</span>
                                        {item.hasDropdown && (
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 group-hover:rotate-180 ${active
                                                    ? "text-primary"
                                                    : "text-slate-500 group-hover:text-primary"
                                                    }`}
                                            />
                                        )}

                                        {/* Left-to-right animated bottom border */}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-[2.5px] bg-primary rounded-full transition-all duration-300 ease-out origin-left ${active
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                                }`}
                                        />
                                    </Link>

                                    {/* Dropdown Menu with Arrow */}
                                    {item.hasDropdown && item.dropdownItems && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                                            {/* Arrow */}
                                            <div
                                                className="absolute top-[3px] left-1/2 -translate-x-1/2 w-0 h-0"
                                                style={{
                                                    borderLeft: '9px solid transparent',
                                                    borderRight: '9px solid transparent',
                                                    borderBottom: '9px solid #ffffff',
                                                    filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.06))',
                                                }}
                                            />
                                            {/* Panel */}
                                            <div className="w-[250px] bg-white rounded-xl shadow-[0_12px_30px_-5px_rgba(0,0,0,0.18)] border border-slate-100 p-2">
                                                <div className="flex flex-col gap-1">
                                                    {item.dropdownItems.map((sub) => {
                                                        const isSubActive = pathname === sub.href;
                                                        return (
                                                            <Link
                                                                key={sub.label}
                                                                href={sub.href}
                                                                className={`relative group/sub block px-3.5 py-2.5 text-sm hover:bg-secondary/10 rounded-sm font-medium transition-colors duration-150 ${isSubActive
                                                                    ? "text-primary font-bold"
                                                                    : "text-foreground hover:text-primary"
                                                                    }`}
                                                            >
                                                                <span className="relative inline-block">
                                                                    {sub.label}
                                                                    <span
                                                                        className={`   ${isSubActive
                                                                            ? "w-full"
                                                                            : "w-0 group-hover/sub:w-full"
                                                                            }`}
                                                                    />
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right: CTA Button */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="#quote"
                            className="btn btn-primary cursor-pointer !px-7 !py-3"
                        >
                            <span>Request A Quote</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex xl:hidden items-center gap-3">

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Mobile Slide-out Left Drawer (Full Height, 360px) */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 xl:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-50 h-full w-[360px] max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out xl:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                    <SundarbanLogo />
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary  hover:bg-secondary text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Drawer Nav Items */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100">
                    {navItems.map((item) => {
                        const active = isItemActive(item);
                        return (
                            <div key={item.label} className="py-0.5">
                                <div
                                    className="flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                                    onClick={() => {
                                        if (item.hasDropdown) {
                                            setActiveDropdown(
                                                activeDropdown === item.label ? null : item.label
                                            );
                                        } else {
                                            setMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={(e) => {
                                            if (item.hasDropdown) {
                                                e.preventDefault();
                                                setActiveDropdown(
                                                    activeDropdown === item.label ? null : item.label
                                                );
                                            } else {
                                                setMobileMenuOpen(false);
                                            }
                                        }}
                                        className={`flex-1 text-[15px] font-semibold transition-colors ${active
                                            ? "text-primary font-bold"
                                            : "text-foreground hover:text-primary"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>

                                    {item.hasDropdown ? (
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.label
                                                ? "rotate-180 text-primary"
                                                : "text-slate-400"
                                                }`}
                                        />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                    )}
                                </div>

                                {/* Dropdown Sub Items */}
                                {item.hasDropdown && activeDropdown === item.label && (
                                    <div className="ml-2 pl-3 my-1 border-l-2 border-primary/30 flex flex-col divide-y divide-slate-100 bg-slate-50/70 rounded-md overflow-hidden">
                                        {item.dropdownItems?.map((sub) => {
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center justify-between py-2.5 px-3 text-sm font-medium transition-colors ${isSubActive
                                                        ? "text-primary font-bold bg-brand-green-soft"
                                                        : "text-slate-600 hover:text-primary hover:bg-white"
                                                        }`}
                                                >
                                                    <span>{sub.label}</span>
                                                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex flex-col gap-3">
                    <Link
                        href="#quote"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn btn-primary cursor-pointer w-full !py-3 flex items-center justify-center gap-2"
                    >
                        <span>Request A Quote</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                        <span>Mon to Sun: 8.00 am - 9.00 pm</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
