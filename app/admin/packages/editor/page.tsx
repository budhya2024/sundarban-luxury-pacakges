"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Calendar,
  Utensils,
  Briefcase,
  Users,
  Clock,
  Sparkles,
  DollarSign,
  FileText,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminTourPackage,
  TourItineraryDay,
  TourDayFoodMenu,
  TourActivity,
  TourMealCourse,
} from "@/lib/admin-data";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { AdminHeader } from "@/components/admin/AdminHeader";

type SectionType = "basic" | "itinerary" | "menu" | "inclusions";

function PackageEditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("id");

  const { packages, addPackage, updatePackage, showToast } = useAdmin();

  const [activeSection, setActiveSection] = useState<SectionType>("basic");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const existingPackage = packages.find((p) => p.id === packageId) || null;

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [duration, setDuration] = useState("2 Days / 1 Night");
  const [price, setPrice] = useState(2999);
  const [originalPrice, setOriginalPrice] = useState(3999);
  const [rating, setRating] = useState(4.9);
  const [reviewsCount, setReviewsCount] = useState(128);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
  const [bannerImage, setBannerImage] = useState("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80");
  const [status, setStatus] = useState<AdminTourPackage["status"]>("Active");
  const [maxGuests, setMaxGuests] = useState(45);
  const [departure, setDeparture] = useState("Godkhali Ferry Ghat (8:30 AM)");
  const [pickupDrop, setPickupDrop] = useState("Kolkata / Canning / Godkhali");
  const [mealsSummary, setMealsSummary] = useState("6 Times Fresh Cooked Bengali Buffet Meals");
  const [minGroupSize, setMinGroupSize] = useState("Min 2 People");
  const [overview, setOverview] = useState("");
  const [highlightQuote, setHighlightQuote] = useState("");
  const [helplinePhone, setHelplinePhone] = useState("+91 70014 03498");
  const [featured, setFeatured] = useState(false);

  // Arrays
  const [itinerary, setItinerary] = useState<TourItineraryDay[]>([]);
  const [foodMenu, setFoodMenu] = useState<TourDayFoodMenu[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [thingsToCarry, setThingsToCarry] = useState<string[]>([]);

  // Inputs
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newCarryItem, setNewCarryItem] = useState("");

  useEffect(() => {
    if (existingPackage) {
      setName(existingPackage.name || "");
      setSlug(existingPackage.slug || "");
      setSubtitle(existingPackage.subtitle || "");
      setDuration(existingPackage.duration || "2 Days / 1 Night");
      setPrice(existingPackage.price || 2999);
      setOriginalPrice(existingPackage.originalPrice || 3999);
      setRating(existingPackage.rating || 4.9);
      setReviewsCount(existingPackage.reviewsCount || 128);
      setImage(existingPackage.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
      setBannerImage(existingPackage.bannerImage || existingPackage.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80");
      setStatus(existingPackage.status || "Active");
      setMaxGuests(existingPackage.maxGuests || 45);
      setDeparture(existingPackage.departure || "Godkhali Ferry Ghat (8:30 AM)");
      setPickupDrop(existingPackage.pickupDrop || "Kolkata / Canning / Godkhali");
      setMealsSummary(existingPackage.mealsSummary || "6 Times Fresh Cooked Bengali Buffet Meals");
      setMinGroupSize(existingPackage.minGroupSize || "Min 2 People");
      setOverview(existingPackage.overview || "Experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers.");
      setHighlightQuote(existingPackage.highlightQuote || "“Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”");
      setHelplinePhone(existingPackage.helplinePhone || "+91 70014 03498");
      setFeatured(!!existingPackage.featured);
      setItinerary(existingPackage.itinerary ? JSON.parse(JSON.stringify(existingPackage.itinerary)) : defaultItinerary());
      setFoodMenu(existingPackage.foodMenu ? JSON.parse(JSON.stringify(existingPackage.foodMenu)) : defaultFoodMenu());
      setInclusions(existingPackage.inclusions?.length ? [...existingPackage.inclusions] : defaultInclusions());
      setExclusions(existingPackage.exclusions?.length ? [...existingPackage.exclusions] : defaultExclusions());
      setThingsToCarry(existingPackage.thingsToCarry?.length ? [...existingPackage.thingsToCarry] : defaultThingsToCarry());
    } else {
      setName("");
      setSlug("");
      setSubtitle("Experience prime mangrove wilderness, watchtowers & authentic Bengali hospitality.");
      setDuration("2 Days / 1 Night");
      setPrice(2999);
      setOriginalPrice(3999);
      setRating(4.9);
      setReviewsCount(95);
      setImage("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
      setBannerImage("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80");
      setStatus("Active");
      setMaxGuests(45);
      setDeparture("Godkhali Ferry Ghat (8:30 AM)");
      setPickupDrop("Kolkata / Canning / Godkhali");
      setMealsSummary("6 Times Fresh Cooked Bengali Buffet Meals");
      setMinGroupSize("Min 2 People");
      setOverview("Experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers.");
      setHighlightQuote("“Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”");
      setHelplinePhone("+91 70014 03498");
      setFeatured(false);
      setItinerary(defaultItinerary());
      setFoodMenu(defaultFoodMenu());
      setInclusions(defaultInclusions());
      setExclusions(defaultExclusions());
      setThingsToCarry(defaultThingsToCarry());
    }
  }, [existingPackage]);

  useEffect(() => {
    if (packageId && !existingPackage) {
      fetch(`/api/admin/packages/${packageId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && data.package) {
            const p = data.package;
            setName(p.name || "");
            setSlug(p.slug || "");
            setSubtitle(p.subtitle || "");
            setDuration(p.duration || "2 Days / 1 Night");
            setPrice(p.price || 2999);
            setOriginalPrice(p.originalPrice || 3999);
            setRating(p.rating || 4.9);
            setReviewsCount(p.reviewsCount || 128);
            setImage(p.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
            setBannerImage(p.bannerImage || p.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80");
            setStatus(p.status || "Active");
            setMaxGuests(p.maxGuests || 45);
            setDeparture(p.departure || "Godkhali Ferry Ghat (8:30 AM)");
            setPickupDrop(p.pickupDrop || "Kolkata / Canning / Godkhali");
            setMealsSummary(p.mealsSummary || "6 Times Fresh Cooked Bengali Buffet Meals");
            setMinGroupSize(p.minGroupSize || "Min 2 People");
            setOverview(p.overview || "");
            setHighlightQuote(p.highlightQuote || "");
            setHelplinePhone(p.helplinePhone || "+91 70014 03498");
            setFeatured(!!p.featured);
            if (p.itinerary?.length) setItinerary(p.itinerary);
            if (p.foodMenu?.length) setFoodMenu(p.foodMenu);
            if (p.inclusions?.length) setInclusions(p.inclusions);
            if (p.exclusions?.length) setExclusions(p.exclusions);
            if (p.thingsToCarry?.length) setThingsToCarry(p.thingsToCarry);
          }
        })
        .catch(() => {});
    }
  }, [packageId, existingPackage]);


  function defaultItinerary(): TourItineraryDay[] {
    return [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - Starting in Sundarban",
        activities: [
          { time: "8:00 AM", title: "Pick up from Kolkata", desc: "Pick up from Kolkata in AC luxury vehicle and drive towards Godkhali Ferry Ghat." },
          { time: "11:30 AM", title: "Board Luxury Cruise & Welcome Drink", desc: "Board boat with fresh coconut water. Cruise towards Sajnekhali watchtower." },
          { time: "1:30 PM", title: "Bengali Buffet Lunch on Boat", desc: "Freshly cooked fish & prawn lunch served while sailing through narrow forest creeks." },
          { time: "4:00 PM", title: "Sajnekhali Watchtower & Interpretation Center", desc: "Guided watchtower walkthrough & crocodile pond visit." },
          { time: "8:00 PM", title: "Tribal Folk Dance & Dinner", desc: "Evening Jhumur dance show followed by dinner." },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 - Core Reserve Safari & Return",
        activities: [
          { time: "6:30 AM", title: "Morning Tiger Safari", desc: "Sailing through Sudhanyakhali & Dobanki canopy watchtowers." },
          { time: "8:30 AM", title: "Dobanki Canopy Walk", desc: "Walk along the 496m elevated netted canopy bridge." },
          { time: "1:30 PM", title: "Lunch on Boat", desc: "Special mutton / crab lunch served on deck." },
          { time: "4:30 PM", title: "Return to Kolkata", desc: "Disembark at Godkhali Ghat and AC coach return to Kolkata." },
        ],
      },
    ];
  }

  function defaultFoodMenu(): TourDayFoodMenu[] {
    return [
      {
        dayNumber: 1,
        dayTitle: "Day 1 Delicious Cuisine Menu",
        courses: [
          { courseName: "Breakfast", menuItems: "Luchi, Alur Dom, Sweets, Tea / Coffee" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Veg Fry, Gold Prawn Curry / Fish Curry, Salad, Chutney, Papad" },
          { courseName: "Evening Snacks", menuItems: "Chicken Pakora / Veg Pakora, Hot Tea / Coffee" },
          { courseName: "Dinner", menuItems: "Rice / Roti, Special Chicken Curry, Salad, Sweets" },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 Delicious Cuisine Menu",
        courses: [
          { courseName: "Morning Bed Tea", menuItems: "Bed Tea, Biscuits, Fresh Fruit" },
          { courseName: "Breakfast", menuItems: "Radhaballavi / Luchi, Chana Masala, Sweet, Tea" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Veg Fry, Special Mutton Curry / Crab Masala, Salad, Chutney, Papad" },
          { courseName: "Return Refreshment", menuItems: "Evening Tea & Packaged Snack Box for return journey" },
        ],
      },
    ];
  }

  function defaultInclusions(): string[] {
    return [
      "Pick up & Drop from Kolkata in AC Vehicle",
      "Accommodation in Luxury Resort / Boat Cabins",
      "All Freshly Cooked Meals (Breakfast, Lunch, Dinner, Evening Snacks)",
      "All Forest Department Entry Permits & Watchtower Fees",
      "Certified Forest Naturalist Tour Guide",
    ];
  }

  function defaultExclusions(): string[] {
    return [
      "Any Personal Expenses or Tips",
      "Video Camera Permit Charges",
      "Medical or Travel Insurance",
    ];
  }

  function defaultThingsToCarry(): string[] {
    return [
      "Original Photo ID Proof (Aadhaar / Voter ID / Passport)",
      "Comfortable Cotton Clothes & Walking Shoes",
      "Personal Medicines & Sunscreen",
    ];
  }

  const handleNameChange = (val: string) => {
    setName(val);
    if (!existingPackage || !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Easy Day Generator for Itinerary
  const handleIncreaseItineraryDay = () => {
    const nextDayNum = itinerary.length + 1;
    const newDay: TourItineraryDay = {
      dayNumber: nextDayNum,
      dayTitle: `Day ${nextDayNum} - Sundarban Wildlife Safari`,
      activities: [
        { time: "7:00 AM", title: "Morning Watchtower Safari", desc: "Early morning creek cruise for birdwatching and wildlife sighting." },
        { time: "1:00 PM", title: "Sumptuous Buffet Lunch", desc: "Fresh regional Bengali fish delicacies served on boat deck." },
        { time: "4:30 PM", title: "Sunset Village Walk & Return", desc: "Local handicraft village walkthrough and evening tea." },
      ],
    };
    setItinerary([...itinerary, newDay]);
    showToast(`Added Day ${nextDayNum} to Tour Itinerary`);
  };

  const handleRemoveItineraryDay = (index: number) => {
    if (itinerary.length <= 1) {
      alert("At least 1 day itinerary is required.");
      return;
    }
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const handleAddActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({
      time: "12:00 PM",
      title: "New Safari Activity",
      desc: "Describe the safari event, creek cruise, or watchtower visit...",
    });
    setItinerary(updated);
  };

  const handleUpdateActivity = (dayIndex: number, actIndex: number, field: keyof TourActivity, val: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[actIndex][field] = val;
    setItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter((_, i) => i !== actIndex);
    setItinerary(updated);
  };

  // Easy Day Generator for Food Menu
  const handleIncreaseMenuDay = () => {
    const nextDayNum = foodMenu.length + 1;
    const newMenuDay: TourDayFoodMenu = {
      dayNumber: nextDayNum,
      dayTitle: `Day ${nextDayNum} Delicious Food & Cuisine Menu`,
      courses: [
        { courseName: "Breakfast", menuItems: "Luchi / Puri, Alur Dom, Sweets, Hot Tea / Coffee" },
        { courseName: "Lunch", menuItems: "Basmati Rice, Dal, Veg Fry, Gold Prawn Curry / Fish Curry, Salad, Chutney, Papad" },
        { courseName: "Evening Snacks", menuItems: "Chicken Pakora / Veg Pakora, Tea / Coffee" },
        { courseName: "Dinner", menuItems: "Fried Rice / Roti, Special Chicken Kosha / Mutton Curry, Sweets" },
      ],
    };
    setFoodMenu([...foodMenu, newMenuDay]);
    showToast(`Added Day ${nextDayNum} to Food Menu`);
  };

  const handleRemoveFoodMenuDay = (index: number) => {
    if (foodMenu.length <= 1) {
      alert("At least 1 food menu day is required.");
      return;
    }
    setFoodMenu(foodMenu.filter((_, i) => i !== index));
  };

  const handleAddCourse = (dayIndex: number) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses.push({
      courseName: "Special Snack",
      menuItems: "Freshly prepared snacks, tea, or sweets...",
    });
    setFoodMenu(updated);
  };

  const handleUpdateCourse = (dayIndex: number, courseIndex: number, field: keyof TourMealCourse, val: string) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses[courseIndex][field] = val;
    setFoodMenu(updated);
  };

  const handleRemoveCourse = (dayIndex: number, courseIndex: number) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses = updated[dayIndex].courses.filter((_, i) => i !== courseIndex);
    setFoodMenu(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a package name.");
      return;
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `tour-package-${Date.now()}`;

    const packageData: Omit<AdminTourPackage, "id"> = {
      name: name.trim(),
      slug: finalSlug,
      subtitle,
      duration,
      price: Number(price),
      originalPrice: Number(originalPrice),
      rating: Number(rating),
      reviewsCount: Number(reviewsCount),
      image,
      bannerImage,
      gallery: [],
      status,
      maxGuests: Number(maxGuests),
      departure,
      pickupDrop,
      mealsSummary,
      minGroupSize,
      overview,
      highlightQuote,
      helplinePhone,
      featured,
      itinerary,
      foodMenu,
      inclusions: inclusions.length ? inclusions : defaultInclusions(),
      exclusions: exclusions.length ? exclusions : defaultExclusions(),
      thingsToCarry: thingsToCarry.length ? thingsToCarry : defaultThingsToCarry(),
      childPolicy: [],
      importantNotes: [],
    };

    if (existingPackage) {
      updatePackage(existingPackage.id, packageData);
      showToast(`Updated tour package: "${name}"`);
    } else {
      addPackage(packageData);
      showToast(`Created new tour package: "${name}"`);
    }

    router.push("/admin/packages");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title={existingPackage ? `Edit Package: ${existingPackage.name}` : "Create New Tour Package"}
        subtitle="Simple & easy editor for tour package timeline, food menu, and tariffs"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6  w-full">


        {/* Clean 4 Section Tabs */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveSection("basic")}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${activeSection === "basic"
                ? "border-blue-600 text-blue-700 bg-white shadow-2xs font-extrabold"
                : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>1. Basic Details &amp; Price</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("itinerary")}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${activeSection === "itinerary"
                ? "border-blue-600 text-blue-700 bg-white shadow-2xs font-extrabold"
                : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>2. Tour Timeline ({itinerary.length} Days)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("menu")}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${activeSection === "menu"
                ? "border-blue-600 text-blue-700 bg-white shadow-2xs font-extrabold"
                : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>3. Food Menu ({foodMenu.length} Days)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("inclusions")}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${activeSection === "inclusions"
                ? "border-blue-600 text-blue-700 bg-white shadow-2xs font-extrabold"
                : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              <CheckCircle className="w-4 h-4 text-slate-600" />
              <span>4. Inclusions &amp; Lists</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs text-slate-800">
            {/* SECTION 1: BASIC DETAILS */}
            {activeSection === "basic" && (
              <div className="space-y-5 animate-in fade-in duration-100">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label className="block font-bold text-slate-900 mb-1">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. 2 Nights 3 Days Royal Bengal Tiger Safari"
                      className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block font-bold text-slate-900 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="2-nights-3-days-royal-tiger"
                      className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">
                      Duration Text
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 2 Days / 1 Night"
                      className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">
                      Max Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
                    />
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded bg-blue-50/50 border border-blue-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">
                      Selling Price (₹ per person) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full h-10 pl-7 pr-3 rounded border border-slate-300 bg-white text-slate-900 font-extrabold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 mb-1">
                      Original Strike Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full h-10 pl-7 pr-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <ImageUploadDropzone
                      value={image}
                      onChange={(newVal) => setImage(newVal)}
                      label="Thumbnail Photo Upload *"
                      helperText="Upload thumbnail photo shown on package cards & table list"
                      aspectRatio="square"
                    />
                  </div>

                  <div>
                    <ImageUploadDropzone
                      value={bannerImage}
                      onChange={(newVal) => setBannerImage(newVal)}
                      label="Header Banner Photo Upload *"
                      helperText="Upload wide hero banner photo shown at top of tour details page"
                      aspectRatio="wide"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Tour Overview Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    placeholder="Short paragraph describing the tour experience..."
                    className="w-full p-3 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-100 rounded border border-slate-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="feat-check"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                    <label htmlFor="feat-check" className="font-bold text-slate-800 cursor-pointer">
                      Featured Package (Highlight on Homepage)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Status:</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as AdminTourPackage["status"])}
                      className="h-8 px-2 rounded border border-slate-300 bg-white font-bold"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: TOUR TIMELINE */}
            {activeSection === "itinerary" && (
              <div className="space-y-6 animate-in fade-in duration-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-blue-50/80 border border-blue-200 rounded">
                  <div>
                    <h3 className="text-sm font-extrabold text-blue-950 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Day-Wise Tour Timeline ({itinerary.length} Days)</span>
                    </h3>
                    <p className="text-xs text-blue-800 mt-0.5">
                      Add timeline activities for each day of the safari. Click &quot;Increase Day&quot; to automatically add Day {itinerary.length + 1}!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleIncreaseItineraryDay}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Day {itinerary.length + 1}</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {itinerary.map((day, dayIdx) => (
                    <div key={dayIdx} className="border border-slate-200 rounded bg-white shadow-2xs overflow-hidden">
                      <div className="p-3 bg-slate-900 text-white flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="px-2.5 py-1 rounded bg-blue-600 font-black text-xs uppercase">
                            DAY {day.dayNumber || dayIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={day.dayTitle}
                            onChange={(e) => {
                              const updated = [...itinerary];
                              updated[dayIdx].dayTitle = e.target.value;
                              setItinerary(updated);
                            }}
                            placeholder="e.g. Day 1 - Starting in Sundarban"
                            className="flex-1 h-8 px-2.5 rounded border border-slate-700 bg-slate-800 font-bold text-white focus:outline-none text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddActivity(dayIdx)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs flex items-center gap-1 border border-slate-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Activity</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(dayIdx)}
                            className="p-1 rounded text-rose-400 hover:bg-slate-800"
                            title="Remove Day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 bg-slate-50/50">
                        {day.activities.map((act, actIdx) => (
                          <div key={actIdx} className="p-3 rounded bg-white border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start shadow-2xs">
                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-bold text-slate-500 mb-0.5 uppercase">Time</label>
                              <input
                                type="text"
                                value={act.time}
                                onChange={(e) => handleUpdateActivity(dayIdx, actIdx, "time", e.target.value)}
                                className="w-full h-8 px-2 rounded border border-slate-300 bg-white font-bold text-slate-900 text-xs"
                              />
                            </div>

                            <div className="sm:col-span-8 space-y-1.5">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5 uppercase">Title</label>
                                <input
                                  type="text"
                                  value={act.title}
                                  onChange={(e) => handleUpdateActivity(dayIdx, actIdx, "title", e.target.value)}
                                  placeholder="Activity Title"
                                  className="w-full h-8 px-2 rounded border border-slate-300 bg-white font-extrabold text-slate-900 text-xs"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-0.5 uppercase">Description</label>
                                <textarea
                                  rows={2}
                                  value={act.desc}
                                  onChange={(e) => handleUpdateActivity(dayIdx, actIdx, "desc", e.target.value)}
                                  placeholder="Describe wildlife spot, boat cruise, watchtower..."
                                  className="w-full p-2 rounded border border-slate-300 bg-white font-medium text-slate-800 text-xs"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1 flex sm:justify-end pt-5">
                              <button
                                type="button"
                                onClick={() => handleRemoveActivity(dayIdx, actIdx)}
                                className="p-1 text-slate-400 hover:text-rose-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleAddActivity(dayIdx)}
                            className="px-3 py-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-extrabold text-xs flex items-center gap-1.5 border border-blue-200 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Time Slot Activity to Day {day.dayNumber || dayIdx + 1}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={handleIncreaseItineraryDay}
                    className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Day {itinerary.length + 1} to Itinerary</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 3: FOOD MENU */}
            {activeSection === "menu" && (
              <div className="space-y-6 animate-in fade-in duration-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/80 border border-emerald-200 rounded">
                  <div>
                    <h3 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-emerald-700" />
                      <span>Day-Wise Food &amp; Cuisine Menu ({foodMenu.length} Days)</span>
                    </h3>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Configure Breakfast, Lunch, Evening Snacks, and Dinner. Click &quot;Increase Menu Day&quot; to automatically add Day {foodMenu.length + 1}!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleIncreaseMenuDay}
                    className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Day {foodMenu.length + 1} Menu</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {foodMenu.map((menuDay, dayIdx) => (
                    <div key={dayIdx} className="border border-emerald-200 rounded bg-white shadow-2xs overflow-hidden">
                      <div className="p-3 bg-[#064e3b] text-white flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="px-2.5 py-1 rounded bg-emerald-600 font-black text-xs uppercase">
                            DAY {menuDay.dayNumber || dayIdx + 1} MENU
                          </span>
                          <input
                            type="text"
                            value={menuDay.dayTitle}
                            onChange={(e) => {
                              const updated = [...foodMenu];
                              updated[dayIdx].dayTitle = e.target.value;
                              setFoodMenu(updated);
                            }}
                            className="flex-1 h-8 px-2.5 rounded border border-emerald-700 bg-[#04392b] font-bold text-white focus:outline-none text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddCourse(dayIdx)}
                            className="px-2.5 py-1 rounded bg-[#04392b] hover:bg-[#032b20] text-emerald-200 font-bold text-xs flex items-center gap-1 border border-emerald-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Meal Course</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveFoodMenuDay(dayIdx)}
                            className="p-1 text-rose-300 hover:bg-[#04392b]"
                            title="Remove Day Menu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/30">
                        {menuDay.courses.map((c, cIdx) => (
                          <div key={cIdx} className="p-3 rounded bg-white border border-emerald-200 space-y-2 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={c.courseName}
                                onChange={(e) => handleUpdateCourse(dayIdx, cIdx, "courseName", e.target.value)}
                                className="h-7 px-2 rounded border border-emerald-300 bg-emerald-50/50 font-extrabold text-emerald-900 text-xs uppercase"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCourse(dayIdx, cIdx)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={c.menuItems}
                              onChange={(e) => handleUpdateCourse(dayIdx, cIdx, "menuItems", e.target.value)}
                              placeholder="e.g. Rice, Dal, Fish Curry, Sweet..."
                              className="w-full p-2 rounded border border-slate-300 bg-white text-slate-800 font-medium text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={handleIncreaseMenuDay}
                    className="px-6 py-2.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Day {foodMenu.length + 1} to Food Menu</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 4: INCLUSIONS & LISTS */}
            {activeSection === "inclusions" && (
              <div className="space-y-6 animate-in fade-in duration-100">
                <div className="p-5 rounded bg-emerald-50/50 border border-emerald-200 space-y-4">
                  <h3 className="text-sm font-extrabold text-[#064e3b] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>What&apos;s Included ({inclusions.length} Points)</span>
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newInclusion.trim()) {
                          e.preventDefault();
                          setInclusions([...inclusions, newInclusion.trim()]);
                          setNewInclusion("");
                        }
                      }}
                      placeholder="Add inclusion point (e.g. Kolkata AC pickup)..."
                      className="flex-1 h-9 px-3 rounded border border-emerald-300 bg-white font-medium text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newInclusion.trim()) {
                          setInclusions([...inclusions, newInclusion.trim()]);
                          setNewInclusion("");
                        }
                      }}
                      className="px-4 h-9 rounded bg-emerald-700 text-white font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {inclusions.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-white border border-emerald-200 flex items-center justify-between gap-3">
                        <span className="font-medium text-slate-800 text-xs flex-1">{item}</span>
                        <button type="button" onClick={() => setInclusions(inclusions.filter((_, i) => i !== idx))}>
                          <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-rose-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-slate-600" />
                    <span>What&apos;s Not Included (Exclusions) ({exclusions.length} Points)</span>
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newExclusion.trim()) {
                          e.preventDefault();
                          setExclusions([...exclusions, newExclusion.trim()]);
                          setNewExclusion("");
                        }
                      }}
                      placeholder="Add exclusion point..."
                      className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white font-medium text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newExclusion.trim()) {
                          setExclusions([...exclusions, newExclusion.trim()]);
                          setNewExclusion("");
                        }
                      }}
                      className="px-4 h-9 rounded bg-slate-800 text-white font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exclusions.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-white border border-slate-200 flex items-center justify-between gap-3">
                        <span className="font-medium text-slate-800 text-xs flex-1">{item}</span>
                        <button type="button" onClick={() => setExclusions(exclusions.filter((_, i) => i !== idx))}>
                          <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-rose-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 -mx-6 -mb-6 p-4 rounded-b border-t">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/packages"
                  className="px-4 py-2 rounded border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
                >
                  Cancel
                </Link>

                {/* Active / Draft Toggle Button at Bottom Site */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-300 shadow-2xs">
                  <span className="font-extrabold text-slate-700 text-xs">Package Status:</span>
                  <button
                    type="button"
                    onClick={() => setStatus(status === "Active" ? "Draft" : "Active")}
                    className={`px-3 py-1 rounded text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${status === "Active"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                        : "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${status === "Active" ? "bg-white animate-pulse" : "bg-white"}`} />
                    <span>{status === "Active" ? "Active (Live on Website)" : "Draft (Hidden Staged)"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{existingPackage ? "Save & Update Package" : "Publish & Create Package"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function PackageEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading package editor...</div>}>
      <PackageEditorForm />
    </Suspense>
  );
}
