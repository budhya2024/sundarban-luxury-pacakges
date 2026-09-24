"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Compass,
  FileText,
  Building2,
  Navigation,
  ArrowRight,
  Sparkles,
  Clock,
  ChevronRight,
  Flame,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { blogPosts } from "@/lib/blog-data";

export interface SearchResultItem {
  id: string;
  type: "package" | "hotel" | "blog" | "page";
  title: string;
  subtitle?: string;
  url: string;
  image?: string;
  badge?: string;
  price?: string | number;
  duration?: string;
  rating?: number;
  tags?: string[];
  category?: string;
}

const STATIC_PAGES: SearchResultItem[] = [
  {
    id: "page-packages",
    type: "page",
    title: "All Tour Packages & Itineraries",
    subtitle: "Explore 1N/2D, 2N/3D, day trips and luxury private charters.",
    url: "/packages",
    badge: "All Tours",
    tags: ["Tours", "Itinerary", "Prices", "Bookings", "Cruises", "Weekend"],
  },
  {
    id: "page-hotel",
    type: "hotel",
    title: "Hotel Sonar Bangla Resort",
    subtitle: "5-Star riverfront cottages, suites, pool & multicuisine dining.",
    url: "/hotel-sonar-bangla",
    badge: "5-Star Resort",
    image: "/assets/images/sonarbanglahotel.jpg",
    tags: ["Hotel", "Sonar Bangla", "Resort", "Cottage", "Pool", "Luxury Stay", "Rooms"],
  },
  {
    id: "page-gallery",
    type: "page",
    title: "Sundarban Photo & Video Gallery",
    subtitle: "Wildlife photography, Royal Bengal tigers, and safari boats.",
    url: "/gallery",
    badge: "Gallery",
    tags: ["Photos", "Wildlife", "Tiger Photos", "Boats", "Images", "Videos"],
  },
  {
    id: "page-blog",
    type: "page",
    title: "Travel Blogs & Safari Guides",
    subtitle: "Tips, best time to visit, tiger tracking & photography guides.",
    url: "/blog",
    badge: "Blog",
    tags: ["Blog", "Travel Tips", "Articles", "Guides", "Wildlife", "News"],
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contact & 24/7 Helpline",
    subtitle: "Custom itinerary planning, group bookings & inquiries.",
    url: "/contact",
    badge: "Contact",
    tags: ["Contact", "Phone", "Email", "Location", "Support", "Booking", "Help"],
  },
];

const POPULAR_KEYWORDS = [
  "Tiger Safari",
  "Hotel Sonar Bangla",
  "1 Night 2 Days",
  "2 Nights 3 Days",
  "Luxury Boat Cruise",
  "Day Tour",
];

const CATEGORY_TABS: { key: "all" | "package" | "hotel" | "blog"; label: string; icon: any }[] = [
  { key: "all", label: "All", icon: Layers },
  { key: "package", label: "Tours", icon: Compass },
  { key: "hotel", label: "Resort", icon: Building2 },
  { key: "blog", label: "Guides", icon: FileText },
];

export interface HeaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderSearchModal({ isOpen, onClose }: HeaderSearchModalProps) {
  const router = useRouter();
  const { packages, blogPostsList } = useAdmin();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "package" | "hotel" | "blog">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveTab("all");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Global Esc & Ctrl+K listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Searchable Unified Data
  const allSearchableData: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [...STATIC_PAGES];

    // Packages
    const activePackages = packages.filter((p) => p.status !== "Draft");
    activePackages.forEach((pkg) => {
      items.push({
        id: `pkg-${pkg.id || pkg.slug}`,
        type: "package",
        title: pkg.name,
        subtitle: pkg.subtitle || `${pkg.duration} • Luxury boat safari & resort stay`,
        url: `/tour/${pkg.slug}`,
        image: pkg.image,
        badge: pkg.duration || "Tour Package",
        duration: pkg.duration,
        price: pkg.price,
        tags: [
          ...(pkg.inclusions || []),
          pkg.departure,
          pkg.category || "",
          "Tour",
          "Package",
          "Safari",
          "Tiger",
          pkg.name,
        ].filter(Boolean) as string[],
      });
    });

    // Blogs
    const allBlogs = blogPostsList && blogPostsList.length > 0 ? blogPostsList : blogPosts;
    allBlogs.forEach((post) => {
      items.push({
        id: `blog-${post.slug}`,
        type: "blog",
        title: post.title,
        subtitle: post.excerpt,
        url: `/blog/${post.slug}`,
        image: post.image,
        badge: post.category || "Guide",
        category: post.category,
        tags: [...(post.tags || []), post.author, "Blog", "Guide", "Tips"],
      });
    });

    return items;
  }, [packages, blogPostsList]);

  // Live Results Filter
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    const queryWords = cleanQuery.split(/\s+/).filter(Boolean);

    const scored = allSearchableData
      .filter((item) => (activeTab === "all" ? true : item.type === activeTab))
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subtitleLower = (item.subtitle || "").toLowerCase();
        const tagsString = (item.tags || []).join(" ").toLowerCase();

        if (titleLower === cleanQuery) score += 100;
        else if (titleLower.startsWith(cleanQuery)) score += 60;
        else if (titleLower.includes(cleanQuery)) score += 40;

        const allWordsMatch = queryWords.every(
          (w) => titleLower.includes(w) || subtitleLower.includes(w) || tagsString.includes(w)
        );

        if (allWordsMatch) {
          score += 30;
          queryWords.forEach((w) => {
            if (titleLower.includes(w)) score += 15;
            if (tagsString.includes(w)) score += 10;
          });
        } else {
          queryWords.forEach((w) => {
            if (titleLower.includes(w)) score += 8;
            if (tagsString.includes(w)) score += 5;
          });
        }

        return { item, score };
      })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item);

    return scored.slice(0, 7);
  }, [query, activeTab, allSearchableData]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = searchResults[selectedIndex];
      if (target) {
        onClose();
        router.push(target.url);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      />

      {/* Small, Clean, Compact Modal Container (max-w-xl) */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 transition-all duration-200 ease-out animate-in fade-in zoom-in-95 my-auto sm:my-10"
      >
        {/* Header Search Bar */}
        <div className="relative flex items-center px-4 py-3.5 bg-white border-b border-slate-100">
          <Search className="w-4 h-4 text-primary mr-3 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tours, hotel, blogs, tiger safari..."
            className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 bg-transparent outline-none focus:outline-none pr-3"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors mr-1.5 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}


        </div>

        {/* Compact Category Tabs (When Query Exists) */}
        {query && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSelectedIndex(0);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${isActive
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/70"
                    }`}
                >
                  <TabIcon className={`w-3 h-3 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State: Popular Searches & Suggested Results Before Search */}
        {!query && (
          <div className="p-3 sm:p-4 space-y-3 bg-slate-50/40">
            {/* Popular Search Pills (rounded-sm) */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => {
                      setQuery(keyword);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 text-xs font-medium text-slate-700 rounded-sm border border-slate-200 shadow-2xs transition-all cursor-pointer group"
                  >
                    <Search className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                    <span>{keyword}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Results Before Search (rounded-sm) */}
            <div className="pt-2 border-t border-slate-200/70">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Suggested Packages</span>
                </span>
                <Link
                  href="/packages"
                  onClick={onClose}
                  className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-1">
                {allSearchableData
                  .filter((i) => i.type === "package" || i.id === "page-hotel")
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={onClose}
                      className="flex items-center justify-between gap-3 p-2 rounded-sm bg-white hover:bg-slate-50 border border-slate-200/80 shadow-2xs transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 flex items-center justify-center">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Compass className="w-5 h-5 text-emerald-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {item.badge && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
                                {item.badge}
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </h4>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.price && (
                          <span className="text-xs font-extrabold text-emerald-800">
                            ₹{typeof item.price === "number" ? item.price.toLocaleString("en-IN") : item.price}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Search Results (Clean, rounded-sm Rows) */}
        {query && (
          <div
            ref={resultsContainerRef}
            className="max-h-[50vh] overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100"
          >
            {searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Found {searchResults.length} Results</span>
                  <span className="hidden sm:inline">Use ↑ ↓ to navigate • Enter to select</span>
                </div>

                {searchResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-sm transition-colors ${isSelected
                        ? "bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-2xs"
                        : "hover:bg-slate-50 text-slate-800 border border-transparent"
                        }`}
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 flex items-center justify-center">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : item.type === "package" ? (
                            <Compass className="w-5 h-5 text-emerald-600" />
                          ) : item.type === "hotel" ? (
                            <Building2 className="w-5 h-5 text-amber-600" />
                          ) : item.type === "blog" ? (
                            <FileText className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Navigation className="w-5 h-5 text-slate-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {item.badge && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 shrink-0">
                                {item.badge}
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </h4>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Price / Arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.price && (
                          <span className="text-xs font-extrabold text-emerald-800">
                            ₹{typeof item.price === "number" ? item.price.toLocaleString("en-IN") : item.price}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 px-4 text-center space-y-2">
                <Search className="w-6 h-6 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">
                  No matching results for &ldquo;{query}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Try searching for <span className="font-semibold text-slate-700">Tiger Safari</span>, <span className="font-semibold text-slate-700">Hotel Sonar Bangla</span>, or <span className="font-semibold text-slate-700">1 Night 2 Days</span>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderSearchModal;
