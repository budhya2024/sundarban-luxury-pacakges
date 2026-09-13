"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Trash2,
  Calendar,
  Utensils,
  CheckCircle,
  XCircle,
  Briefcase,
  Users,
  Clock,
  Sparkles,
  Info,
  DollarSign,
  Tag,
  MapPin,
  ExternalLink,
  Layers,
  FileText,
  Star,
  Check,
  ChevronRight,
  ShieldCheck,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import {
  AdminTourPackage,
  TourItineraryDay,
  TourDayFoodMenu,
  TourActivity,
  TourMealCourse,
} from "@/lib/admin-data";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Omit<AdminTourPackage, "id">) => void;
  initialPackage?: AdminTourPackage | null;
}

type TabType =
  | "basic"
  | "overview"
  | "itinerary"
  | "menu"
  | "inclusions"
  | "policies"
  | "preview";

export function PackageModal({
  isOpen,
  onClose,
  onSave,
  initialPackage,
}: PackageModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("basic");

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
  const [status, setStatus] = useState<AdminTourPackage["status"]>("Active");
  const [maxGuests, setMaxGuests] = useState(45);
  const [departure, setDeparture] = useState("Godkhali Ferry Ghat (8:30 AM)");
  const [pickupDrop, setPickupDrop] = useState("Kolkata / Canning / Godkhali");
  const [mealsSummary, setMealsSummary] = useState("6 Times Fresh Cooked Bengali Buffet Meals");
  const [minGroupSize, setMinGroupSize] = useState("Min 2 People");
  const [overview, setOverview] = useState("");
  const [highlightQuote, setHighlightQuote] = useState("");
  const [helplinePhone, setHelplinePhone] = useState("+91 98765 43210");
  const [featured, setFeatured] = useState(false);

  // Arrays
  const [itinerary, setItinerary] = useState<TourItineraryDay[]>([]);
  const [foodMenu, setFoodMenu] = useState<TourDayFoodMenu[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [thingsToCarry, setThingsToCarry] = useState<string[]>([]);
  const [childPolicy, setChildPolicy] = useState<string[]>([]);
  const [importantNotes, setImportantNotes] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  // Input states for adding new list items
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newCarryItem, setNewCarryItem] = useState("");
  const [newChildPolicy, setNewChildPolicy] = useState("");
  const [newImportantNote, setNewImportantNote] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  useEffect(() => {
    if (initialPackage) {
      setName(initialPackage.name || "");
      setSlug(initialPackage.slug || "");
      setSubtitle(initialPackage.subtitle || "");
      setDuration(initialPackage.duration || "2 Days / 1 Night");
      setPrice(initialPackage.price || 2999);
      setOriginalPrice(initialPackage.originalPrice || 3999);
      setRating(initialPackage.rating || 4.9);
      setReviewsCount(initialPackage.reviewsCount || 128);
      setImage(initialPackage.image || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
      setStatus(initialPackage.status || "Active");
      setMaxGuests(initialPackage.maxGuests || 45);
      setDeparture(initialPackage.departure || "Godkhali Ferry Ghat (8:30 AM)");
      setPickupDrop(initialPackage.pickupDrop || "Kolkata / Canning / Godkhali");
      setMealsSummary(initialPackage.mealsSummary || "6 Times Fresh Cooked Bengali Buffet Meals");
      setMinGroupSize(initialPackage.minGroupSize || "Min 2 People");
      setOverview(initialPackage.overview || "Sundarban 1 Night 2 Days Tour is the most popular tour package among tourists. You will experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers.");
      setHighlightQuote(initialPackage.highlightQuote || "“Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”");
      setHelplinePhone(initialPackage.helplinePhone || "+91 98765 43210");
      setFeatured(!!initialPackage.featured);
      setItinerary(initialPackage.itinerary ? JSON.parse(JSON.stringify(initialPackage.itinerary)) : defaultItinerary());
      setFoodMenu(initialPackage.foodMenu ? JSON.parse(JSON.stringify(initialPackage.foodMenu)) : defaultFoodMenu());
      setInclusions(initialPackage.inclusions?.length ? [...initialPackage.inclusions] : defaultInclusions());
      setExclusions(initialPackage.exclusions?.length ? [...initialPackage.exclusions] : defaultExclusions());
      setThingsToCarry(initialPackage.thingsToCarry?.length ? [...initialPackage.thingsToCarry] : defaultThingsToCarry());
      setChildPolicy(initialPackage.childPolicy?.length ? [...initialPackage.childPolicy] : defaultChildPolicy());
      setImportantNotes(initialPackage.importantNotes?.length ? [...initialPackage.importantNotes] : defaultImportantNotes());
      setGallery(initialPackage.gallery?.length ? [...initialPackage.gallery] : []);
    } else {
      // Default initial state for creating a brand new package
      setName("");
      setSlug("");
      setSubtitle("Experience prime mangrove wilderness, watchtowers & authentic Bengali hospitality.");
      setDuration("2 Days / 1 Night");
      setPrice(2999);
      setOriginalPrice(3999);
      setRating(4.9);
      setReviewsCount(95);
      setImage("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80");
      setStatus("Active");
      setMaxGuests(45);
      setDeparture("Godkhali Ferry Ghat (8:30 AM)");
      setPickupDrop("Kolkata / Canning / Godkhali");
      setMealsSummary("6 Times Fresh Cooked Bengali Buffet Meals");
      setMinGroupSize("Min 2 People");
      setOverview("Experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers. Sail comfortably on our state-of-the-art vessel with freshly prepared delicacies and expert forest naturalists.");
      setHighlightQuote("“Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”");
      setHelplinePhone("+91 98765 43210");
      setFeatured(false);
      setItinerary(defaultItinerary());
      setFoodMenu(defaultFoodMenu());
      setInclusions(defaultInclusions());
      setExclusions(defaultExclusions());
      setThingsToCarry(defaultThingsToCarry());
      setChildPolicy(defaultChildPolicy());
      setImportantNotes(defaultImportantNotes());
      setGallery([]);
    }
    setActiveTab("basic");
  }, [initialPackage, isOpen]);

  // Default Template Data Generators
  function defaultItinerary(): TourItineraryDay[] {
    return [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - Starting in Sundarban",
        activities: [
          { time: "8:00 AM", title: "Pick up from Kolkata", desc: "Pick up from Kolkata in AC luxury vehicle and drive towards Godkhali Ferry Ghat." },
          { time: "11:30 AM", title: "Arrive at Godkhali & Board Cruise", desc: "Board our luxury vessel with welcome drinks. Sail towards Sajnekhali watchtower area." },
          { time: "1:30 PM", title: "Cruising Through Mangrove Creek", desc: "Enjoy hot cooked Bengali lunch served on boat deck while cruising through narrow forest creeks." },
          { time: "4:00 PM", title: "Sajnekhali Watchtower Visit", desc: "Visit Sajnekhali Watchtower, Mangrove Interpretation Center, and Crocodile Pond with our certified guide." },
          { time: "6:30 PM", title: "Evening Snacks & Tea", desc: "Return to cruise/resort deck. Fresh evening pakora and tea served." },
          { time: "8:00 PM", title: "Folk Dance Show", desc: "Enjoy traditional Jhumur & Tribal Folk Dance cultural performance by local artists." },
          { time: "9:30 PM", title: "Dinner", desc: "Sumptuous dinner served at resort/cruise dining deck." },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 - Deep Forest & Return",
        activities: [
          { time: "6:30 AM", title: "Early Morning Boat Safari", desc: "Sailing through Sudhanyakhali & Dobanki canopy watchtowers inside deep tiger reserve core area." },
          { time: "8:30 AM", title: "Dobanki Watchtower & Canopy Walk", desc: "Walk along the 496m elevated netted canopy walk for high-altitude wildlife viewing." },
          { time: "1:30 PM", title: "Lunch on Boat", desc: "Freshly prepared lunch served on boat while returning along Pirkhali & Panchamukhani 5-river junction." },
          { time: "4:30 PM", title: "Return to Godkhali Ghat", desc: "Board AC return vehicle for Kolkata transfer." },
          { time: "7:30 PM", title: "Drop off at Kolkata", desc: "Reach Kolkata with unforgettable memories of Sundarban wildlife safari." },
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
          { courseName: "Morning Bed Tea", menuItems: "Bed Tea, Biscuits, Fresh Fruit / Cookies" },
          { courseName: "Breakfast", menuItems: "Radhaballavi / Luchi, Chana Masala, Sweet, Tea / Coffee" },
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
      "All Meals (2 Breakfast, 2 Lunch, 1 Dinner, Evening Snacks)",
      "All Forest Department Entry Permits & Watchtower Fees",
      "Certified Forest Naturalist Tour Guide",
      "Cultural Folk Dance Show & Evening Bonfire",
      "Luxury Boat Cruise through Mangrove Creeks",
    ];
  }

  function defaultExclusions(): string[] {
    return [
      "Any Personal Expenses or Tips",
      "Video Camera Permit Charges",
      "Anything Not Mentioned in Inclusions List",
      "Medical or Travel Insurance",
      "GST 5% Extra Applicable",
      "Personal Beverages & Bottled Water",
    ];
  }

  function defaultThingsToCarry(): string[] {
    return [
      "Original Photo ID Proof (Aadhaar / Voter ID / Passport)",
      "Comfortable Cotton Clothes & Walking Shoes",
      "Sunscreen Lotion, Sunglasses & Sun Hat",
      "Personal Medicines & Basic First Aid Kit",
      "Camera with Extra Memory Card & Power Bank",
      "Insect Repellent Cream",
      "Cash for Personal Shopping & Local Handicrafts",
    ];
  }

  function defaultChildPolicy(): string[] {
    return [
      "Child below 5 years: 100% Complimentary / FREE (sharing parents' bed).",
      "Child between 5 to 10 years: 50% of adult package price applicable.",
      "Child above 10 years: Charged as full adult rate with separate bed & seat.",
    ];
  }

  function defaultImportantNotes(): string[] {
    return [
      "Forest Department entry permissions require government ID submission 24h before cruise departure.",
      "Plastic bottles and plastic bags are strictly prohibited inside Sundarban Tiger Reserve core areas.",
      "Itinerary timings may slightly adjust based on river high-tide and low-tide schedules.",
      "Swimming in mangrove river creeks is strictly forbidden for wildlife safety.",
    ];
  }

  if (!isOpen) return null;

  // Auto slug generator helper
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialPackage || !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Itinerary handlers
  const handleAddItineraryDay = () => {
    const nextDayNum = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        dayNumber: nextDayNum,
        dayTitle: `Day ${nextDayNum} - New Safari Day`,
        activities: [
          {
            time: "8:00 AM",
            title: "Morning Safari",
            desc: "Cruise through scenic delta creeks and watchtowers.",
          },
        ],
      },
    ]);
  };

  const handleRemoveItineraryDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const handleUpdateDayTitle = (index: number, newTitle: string) => {
    const updated = [...itinerary];
    updated[index].dayTitle = newTitle;
    setItinerary(updated);
  };

  const handleAddActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({
      time: "12:00 PM",
      title: "Activity Title",
      desc: "Description of the safari event or attraction.",
    });
    setItinerary(updated);
  };

  const handleUpdateActivity = (
    dayIndex: number,
    actIndex: number,
    field: keyof TourActivity,
    val: string
  ) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[actIndex][field] = val;
    setItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter(
      (_, i) => i !== actIndex
    );
    setItinerary(updated);
  };

  // Food Menu Handlers
  const handleAddFoodMenuDay = () => {
    const nextDayNum = foodMenu.length + 1;
    setFoodMenu([
      ...foodMenu,
      {
        dayNumber: nextDayNum,
        dayTitle: `Day ${nextDayNum} Delicious Cuisine Menu`,
        courses: [
          { courseName: "Breakfast", menuItems: "Luchi, Alur Dom, Sweets, Tea" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Veg, Fish/Chicken Curry, Chutney, Papad" },
          { courseName: "Evening Snacks", menuItems: "Pakora & Tea / Coffee" },
          { courseName: "Dinner", menuItems: "Rice/Roti, Special Chicken/Mutton Curry, Sweets" },
        ],
      },
    ]);
  };

  const handleRemoveFoodMenuDay = (index: number) => {
    setFoodMenu(foodMenu.filter((_, i) => i !== index));
  };

  const handleUpdateMenuDayTitle = (index: number, newTitle: string) => {
    const updated = [...foodMenu];
    updated[index].dayTitle = newTitle;
    setFoodMenu(updated);
  };

  const handleAddCourse = (dayIndex: number) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses.push({
      courseName: "Special Course",
      menuItems: "Describe delicious dishes served...",
    });
    setFoodMenu(updated);
  };

  const handleUpdateCourse = (
    dayIndex: number,
    courseIndex: number,
    field: keyof TourMealCourse,
    val: string
  ) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses[courseIndex][field] = val;
    setFoodMenu(updated);
  };

  const handleRemoveCourse = (dayIndex: number, courseIndex: number) => {
    const updated = [...foodMenu];
    updated[dayIndex].courses = updated[dayIndex].courses.filter(
      (_, i) => i !== courseIndex
    );
    setFoodMenu(updated);
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") ||
      `tour-package-${Date.now()}`;

    onSave({
      name: name || "Custom Sundarban Tour Package",
      slug: finalSlug,
      subtitle,
      duration,
      price: Number(price),
      originalPrice: Number(originalPrice),
      rating: Number(rating),
      reviewsCount: Number(reviewsCount),
      image,
      gallery,
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
      childPolicy: childPolicy.length ? childPolicy : defaultChildPolicy(),
      importantNotes: importantNotes.length ? importantNotes : defaultImportantNotes(),
    });
    onClose();
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "basic", label: "1. Basic & Pricing", icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: "overview", label: "2. Overview & Badges", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "itinerary", label: "3. Day Itinerary", icon: <Calendar className="w-3.5 h-3.5" />, badge: itinerary.length },
    { id: "menu", label: "4. Food Menu", icon: <Utensils className="w-3.5 h-3.5" />, badge: foodMenu.length },
    { id: "inclusions", label: "5. Inclusions & Exclusions", icon: <CheckCircle className="w-3.5 h-3.5" />, badge: inclusions.length },
    { id: "policies", label: "6. Policies & Notes", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "preview", label: "7. Live Preview & Save", icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-md shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Navigation Tabs Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-1 overflow-x-auto select-none no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${activeTab === tab.id
                ? "border-blue-600 text-blue-700 bg-white shadow-2xs font-extrabold"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${activeTab === tab.id ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-700"
                  }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800">
          {/* TAB 1: BASIC & PRICING */}
          {activeTab === "basic" && (
            <div className="space-y-5 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block font-bold text-slate-900 mb-1">
                    Package Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. 2 Nights 3 Days Royal Bengal Tiger Safari"
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block font-bold text-slate-900 mb-1">
                    URL Slug * (public route: /tour/[slug])
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
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Days / 2 Nights"
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Max Guest Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="p-4 rounded bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Selling Price (₹ per person) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      min="500"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full h-10 pl-7 pr-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
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
                      min="500"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full h-10 pl-7 pr-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Estimated Discount
                  </label>
                  <div className="h-10 px-3 rounded border border-slate-200 bg-white flex items-center justify-between text-slate-700 font-bold">
                    <span>
                      {originalPrice > price
                        ? `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`
                        : "No Discount"}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Save ₹{Math.max(0, originalPrice - price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image & Departure */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                <div className="sm:col-span-8">
                  <ImageUploadDropzone
                    value={image}
                    onChange={(newVal) => setImage(newVal)}
                    label="Cover Banner Photo Upload *"
                    helperText="Upload safari boat or tiger cover photo from your device"
                    aspectRatio="wide"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block font-bold text-slate-900 mb-1">
                    Departure Station &amp; Time
                  </label>
                  <input
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="e.g. Godkhali Ferry Ghat (8:30 AM)"
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Status & Featured */}
              <div className="p-4 rounded bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AdminTourPackage["status"])}
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option value="Active">Active (Visible on public site)</option>
                    <option value="Draft">Draft (Hidden from public)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-2 sm:pt-4">
                  <input
                    type="checkbox"
                    id="featured-pkg"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="featured-pkg" className="font-bold text-slate-900 cursor-pointer">
                    Highlight as &ldquo;Featured Package&rdquo; on Homepage
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & BADGES */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in duration-100">
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Tagline / Header Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Prepare to discover the real beauty of the mangrove forest with our luxury cruise."
                  className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Full Overview Narrative
                </label>
                <textarea
                  rows={4}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Detailed paragraph explaining the tour experience, safety, mangrove ecosystems, and stay highlights..."
                  className="w-full p-3 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Highlight Callout Quote (Golden Quote Box on Details Page)
                </label>
                <textarea
                  rows={2}
                  value={highlightQuote}
                  onChange={(e) => setHighlightQuote(e.target.value)}
                  placeholder="e.g. “Sundarban 1 Night 2 Days Tour is the most popular tour package from Kolkata. Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”"
                  className="w-full p-3 rounded border border-amber-300 bg-amber-50/50 text-slate-900 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 4 Feature Badges */}
              <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 block uppercase tracking-wider text-[11px]">
                  4 Main Feature Badges Displayed on Tour Page
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Pick &amp; Drop Badge
                    </label>
                    <input
                      type="text"
                      value={pickupDrop}
                      onChange={(e) => setPickupDrop(e.target.value)}
                      placeholder="e.g. Kolkata / Canning"
                      className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Meals Included Badge
                    </label>
                    <input
                      type="text"
                      value={mealsSummary}
                      onChange={(e) => setMealsSummary(e.target.value)}
                      placeholder="e.g. 6 Times Fresh Cooked"
                      className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Group Size Badge
                    </label>
                    <input
                      type="text"
                      value={minGroupSize}
                      onChange={(e) => setMinGroupSize(e.target.value)}
                      placeholder="e.g. Min 2 People"
                      className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Ratings & Contact Helpline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Rating (e.g. 4.9)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Package Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={helplinePhone}
                    onChange={(e) => setHelplinePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DAY-WISE ITINERARY */}
          {activeTab === "itinerary" && (
            <div className="space-y-6 animate-in fade-in duration-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Day-Wise Safari Timeline Itinerary ({itinerary.length} Days)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add days, time slots, and activity descriptions for the public timeline view
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day {itinerary.length + 1}</span>
                  </button>
                </div>
              </div>

              {/* Quick Template Presets for Itinerary */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/70 rounded flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Quick Itinerary Templates:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setItinerary(defaultItinerary())}
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold text-[11px]"
                  >
                    Standard 1N/2D Plan (2 Days)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setItinerary([
                        ...defaultItinerary(),
                        {
                          dayNumber: 3,
                          dayTitle: "Day 3 - Sudhanyakhali Safari & Return Transfer",
                          activities: [
                            { time: "7:00 AM", title: "Sudhanyakhali Watchtower", desc: "Sweet-water pond wildlife viewing for spotted deer and wild boars." },
                            { time: "12:30 PM", title: "Farewell Lunch on Boat", desc: "Final sumptuous lunch before disembarking at Godkhali." },
                            { time: "3:30 PM", title: "Godkhali to Kolkata Transfer", desc: "AC coach journey back to Kolkata with drop-off by evening." },
                          ],
                        },
                      ])
                    }
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold text-[11px]"
                  >
                    Deep Delta 2N/3D Plan (3 Days)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setItinerary([
                        {
                          dayNumber: 1,
                          dayTitle: "Full Day Safari Schedule",
                          activities: [
                            { time: "6:00 AM", title: "Kolkata Pickup", desc: "Board AC bus from Science City Kolkata." },
                            { time: "9:00 AM", title: "Godkhali Boat Departure", desc: "Board boat with hot breakfast & tea." },
                            { time: "11:30 AM", title: "Sajnekhali Watchtower", desc: "Guided watchtower & interpretation visit." },
                            { time: "1:30 PM", title: "Lunch on River", desc: "Freshly cooked fish & chicken lunch on deck." },
                            { time: "3:30 PM", title: "Sudhanyakhali Safari", desc: "Creek cruise in search of tigers & deer." },
                            { time: "5:30 PM", title: "Godkhali to Kolkata", desc: "Return AC vehicle journey to Kolkata." },
                          ],
                        },
                      ])
                    }
                    className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold text-[11px]"
                  >
                    1-Day Day Safari (1 Day)
                  </button>
                </div>
              </div>

              {itinerary.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">No itinerary days added yet</p>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="mt-3 px-3 py-1.5 rounded bg-blue-600 text-white text-xs font-bold"
                  >
                    Add Day 1
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {itinerary.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="border border-slate-200 rounded bg-white shadow-2xs overflow-hidden"
                    >
                      {/* Day Header */}
                      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-extrabold text-xs">
                            DAY {day.dayNumber || dayIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={day.dayTitle}
                            onChange={(e) => handleUpdateDayTitle(dayIdx, e.target.value)}
                            placeholder="e.g. Day 1 - Starting in Sundarban"
                            className="flex-1 h-8 px-2.5 rounded border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:border-blue-600 text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddActivity(dayIdx)}
                            className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Activity</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(dayIdx)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Delete Day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day Activities List */}
                      <div className="p-4 space-y-3">
                        {day.activities.map((act, actIdx) => (
                          <div
                            key={actIdx}
                            className="p-3 rounded bg-slate-50/70 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start"
                          >
                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                Time
                              </label>
                              <input
                                type="text"
                                value={act.time}
                                onChange={(e) =>
                                  handleUpdateActivity(dayIdx, actIdx, "time", e.target.value)
                                }
                                placeholder="8:00 AM"
                                className="w-full h-8 px-2 rounded border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                              />
                            </div>

                            <div className="sm:col-span-8 space-y-1.5">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                  Activity Title
                                </label>
                                <input
                                  type="text"
                                  value={act.title}
                                  onChange={(e) =>
                                    handleUpdateActivity(dayIdx, actIdx, "title", e.target.value)
                                  }
                                  placeholder="e.g. Sajnekhali Watchtower Visit"
                                  className="w-full h-8 px-2 rounded border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                  Description
                                </label>
                                <textarea
                                  rows={2}
                                  value={act.desc}
                                  onChange={(e) =>
                                    handleUpdateActivity(dayIdx, actIdx, "desc", e.target.value)
                                  }
                                  placeholder="Describe the wildlife spots, watchtower walkthrough, or meal details..."
                                  className="w-full p-2 rounded border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1 flex sm:justify-end pt-5">
                              <button
                                type="button"
                                onClick={() => handleRemoveActivity(dayIdx, actIdx)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                                title="Remove Activity"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FOOD MENU */}
          {activeTab === "menu" && (
            <div className="space-y-6 animate-in fade-in duration-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-700" />
                    <span>Day-Wise Food &amp; Cuisine Menu ({foodMenu.length} Days)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure Breakfast, Lunch, Evening Snacks, and Dinner courses for each day
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddFoodMenuDay}
                    className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day {foodMenu.length + 1} Menu</span>
                  </button>
                </div>
              </div>

              {/* Quick Template Presets for Food Menu */}
              <div className="p-3 bg-emerald-50/60 border border-emerald-200/70 rounded flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Quick Food Menu Templates:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFoodMenu(defaultFoodMenu())}
                    className="px-2.5 py-1 rounded bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-[11px]"
                  >
                    1N/2D Bengali Safari Menu (2 Days)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFoodMenu([
                        ...defaultFoodMenu(),
                        {
                          dayNumber: 3,
                          dayTitle: "Day 3 Farewell Royal Menu",
                          courses: [
                            { courseName: "Breakfast", menuItems: "Kachori Alur Dom, Jalebi, Tea / Coffee" },
                            { courseName: "Lunch", menuItems: "Rice, Dal, Shorshe Ilish / Vetki Paturi, Tomato Chutney, Papad" },
                            { courseName: "Snack Box", menuItems: "Packaged Sweet & Savory Box with Juice for return journey" },
                          ],
                        },
                      ])
                    }
                    className="px-2.5 py-1 rounded bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-[11px]"
                  >
                    2N/3D Royal Mutton &amp; Crab Menu (3 Days)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFoodMenu([
                        {
                          dayNumber: 1,
                          dayTitle: "Full Day Safari Feast Menu",
                          courses: [
                            { courseName: "Welcome Drink", menuItems: "Fresh Coconut Water / Mango Mint Cooler" },
                            { courseName: "Morning Breakfast", menuItems: "Puri Sabji / Bread Omelette, Sweets, Hot Darjeeling Tea" },
                            { courseName: "River Cruise Lunch", menuItems: "Basmati Rice, Moong Dal, Begun Bhaja, Vetki Curry / Chicken Kasha, Salad, Chutney, Papad" },
                            { courseName: "Evening High Tea", menuItems: "Vegetable / Chicken Pakora, Tea / Coffee & Biscuits" },
                          ],
                        },
                      ])
                    }
                    className="px-2.5 py-1 rounded bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-[11px]"
                  >
                    1-Day Express Safari Menu
                  </button>
                </div>
              </div>

              {foodMenu.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded">
                  <Utensils className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">No food menu days created yet</p>
                  <button
                    type="button"
                    onClick={handleAddFoodMenuDay}
                    className="mt-3 px-3 py-1.5 rounded bg-emerald-700 text-white text-xs font-bold"
                  >
                    Add Day 1 Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {foodMenu.map((menuDay, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="border border-emerald-200 rounded bg-white shadow-2xs overflow-hidden"
                    >
                      {/* Day Menu Header */}
                      <div className="p-3 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="px-2.5 py-1 rounded bg-[#064e3b] text-white font-extrabold text-xs">
                            DAY {menuDay.dayNumber || dayIdx + 1} MENU
                          </span>
                          <input
                            type="text"
                            value={menuDay.dayTitle}
                            onChange={(e) => handleUpdateMenuDayTitle(dayIdx, e.target.value)}
                            placeholder="e.g. Day 1 Delicious Cuisine Menu"
                            className="flex-1 h-8 px-2.5 rounded border border-emerald-300 bg-white font-bold text-slate-900 focus:outline-none focus:border-emerald-600 text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddCourse(dayIdx)}
                            className="px-2.5 py-1 rounded bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Meal Course</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveFoodMenuDay(dayIdx)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Delete Day Menu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Course items */}
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {menuDay.courses.map((c, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 rounded bg-slate-50 border border-slate-200 space-y-2 relative group"
                          >
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={c.courseName}
                                onChange={(e) =>
                                  handleUpdateCourse(dayIdx, cIdx, "courseName", e.target.value)
                                }
                                placeholder="e.g. Lunch"
                                className="h-7 px-2 rounded border border-slate-300 bg-white font-extrabold text-amber-700 text-xs uppercase focus:outline-none focus:border-blue-600"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCourse(dayIdx, cIdx)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Remove Course"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <textarea
                              rows={2}
                              value={c.menuItems}
                              onChange={(e) =>
                                handleUpdateCourse(dayIdx, cIdx, "menuItems", e.target.value)
                              }
                              placeholder="e.g. Rice, Dal, Veg Fry, Gold Prawn Curry / Fish Curry, Salad, Chutney, Papad"
                              className="w-full p-2 rounded border border-slate-300 bg-white text-slate-800 font-medium focus:outline-none focus:border-blue-600 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INCLUSIONS & EXCLUSIONS */}
          {activeTab === "inclusions" && (
            <div className="space-y-6 animate-in fade-in duration-100">
              {/* Inclusions Section */}
              <div className="p-5 rounded bg-emerald-50/50 border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#064e3b] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>What&apos;s Included in this Tour Package ({inclusions.length})</span>
                  </h3>
                </div>

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
                    placeholder="Type inclusion (e.g. Forest Watchtower entry permits) and press Add..."
                    className="flex-1 h-9 px-3 rounded border border-emerald-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newInclusion.trim()) {
                        setInclusions([...inclusions, newInclusion.trim()]);
                        setNewInclusion("");
                      }
                    }}
                    className="px-4 h-9 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {inclusions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-white border border-emerald-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const copy = [...inclusions];
                            copy[idx] = e.target.value;
                            setInclusions(copy);
                          }}
                          className="flex-1 bg-transparent font-medium text-slate-800 focus:outline-none border-b border-transparent focus:border-emerald-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setInclusions(inclusions.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions Section */}
              <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-slate-600" />
                    <span>What&apos;s Not Included (Exclusions) ({exclusions.length})</span>
                  </h3>
                </div>

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
                    placeholder="Type exclusion (e.g. Camera permits, Personal expenses) and press Add..."
                    className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newExclusion.trim()) {
                        setExclusions([...exclusions, newExclusion.trim()]);
                        setNewExclusion("");
                      }
                    }}
                    className="px-4 h-9 rounded bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {exclusions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-white border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <X className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const copy = [...exclusions];
                            copy[idx] = e.target.value;
                            setExclusions(copy);
                          }}
                          className="flex-1 bg-transparent font-medium text-slate-800 focus:outline-none border-b border-transparent focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setExclusions(exclusions.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: POLICIES & NOTES */}
          {activeTab === "policies" && (
            <div className="space-y-6 animate-in fade-in duration-100">
              {/* Things to Carry */}
              <div className="p-4 rounded bg-amber-50/50 border border-amber-200 space-y-3">
                <h3 className="text-sm font-extrabold text-amber-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <span>Things To Carry Checklist ({thingsToCarry.length})</span>
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCarryItem}
                    onChange={(e) => setNewCarryItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCarryItem.trim()) {
                        e.preventDefault();
                        setThingsToCarry([...thingsToCarry, newCarryItem.trim()]);
                        setNewCarryItem("");
                      }
                    }}
                    placeholder="e.g. Original Photo ID proof (Aadhaar / Passport)..."
                    className="flex-1 h-9 px-3 rounded border border-amber-300 bg-white font-medium focus:outline-none focus:border-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCarryItem.trim()) {
                        setThingsToCarry([...thingsToCarry, newCarryItem.trim()]);
                        setNewCarryItem("");
                      }
                    }}
                    className="px-4 h-9 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {thingsToCarry.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white border border-amber-200 flex items-center justify-between gap-2"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const copy = [...thingsToCarry];
                          copy[idx] = e.target.value;
                          setThingsToCarry(copy);
                        }}
                        className="flex-1 text-slate-800 font-medium focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setThingsToCarry(thingsToCarry.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Child Policy */}
              <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Child &amp; Age Policies ({childPolicy.length})</span>
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChildPolicy}
                    onChange={(e) => setNewChildPolicy(e.target.value)}
                    placeholder="e.g. Child below 5 years: 100% Complimentary / FREE"
                    className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white font-medium focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newChildPolicy.trim()) {
                        setChildPolicy([...childPolicy, newChildPolicy.trim()]);
                        setNewChildPolicy("");
                      }
                    }}
                    className="px-4 h-9 rounded bg-blue-600 text-white font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {childPolicy.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const copy = [...childPolicy];
                          copy[idx] = e.target.value;
                          setChildPolicy(copy);
                        }}
                        className="flex-1 text-slate-800 font-medium focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setChildPolicy(childPolicy.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes */}
              <div className="p-4 rounded bg-emerald-50/60 border border-emerald-200 space-y-3">
                <h3 className="text-sm font-extrabold text-[#064e3b] flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>Important Notes &amp; Environmental Guidelines ({importantNotes.length})</span>
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImportantNote}
                    onChange={(e) => setNewImportantNote(e.target.value)}
                    placeholder="e.g. Plastic bottles are strictly banned inside tiger reserve..."
                    className="flex-1 h-9 px-3 rounded border border-emerald-300 bg-white font-medium focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newImportantNote.trim()) {
                        setImportantNotes([...importantNotes, newImportantNote.trim()]);
                        setNewImportantNote("");
                      }
                    }}
                    className="px-4 h-9 rounded bg-emerald-700 text-white font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {importantNotes.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white border border-emerald-200 flex items-center justify-between gap-2"
                    >
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const copy = [...importantNotes];
                          copy[idx] = e.target.value;
                          setImportantNotes(copy);
                        }}
                        className="flex-1 text-slate-800 font-medium focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setImportantNotes(importantNotes.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LIVE PREVIEW & SAVE */}
          {activeTab === "preview" && (
            <div className="space-y-6 animate-in fade-in duration-100">
              {/* Summary Card */}
              <div className="p-5 rounded bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row gap-6 items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px] uppercase">
                      {duration}
                    </span>
                    {featured && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
                        Featured Package
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 font-bold text-[10px]">
                      {status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {name || "Untitled Package"}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
                    {subtitle || "No subtitle provided."}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <span>⏱ {duration}</span>
                    <span>👥 Max {maxGuests} Guests</span>
                    <span>📍 {departure}</span>
                    <span>⭐ {rating} ({reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="bg-slate-800/90 p-4 rounded border border-slate-700 text-right min-w-[180px]">
                  <span className="text-[10px] text-slate-400 block uppercase">Price Per Person</span>
                  <div className="text-2xl font-black text-white">₹{price.toLocaleString()}</div>
                  {originalPrice > price && (
                    <div className="text-xs text-slate-400 line-through">₹{originalPrice.toLocaleString()}</div>
                  )}
                  <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                    {originalPrice > price ? `${Math.round(((originalPrice - price) / originalPrice) * 100)}% DISCOUNT` : "STANDARD RATE"}
                  </span>
                </div>
              </div>

              {/* Statistics Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block font-bold">Itinerary Days</span>
                  <span className="text-lg font-black text-blue-600">{itinerary.length} Days</span>
                </div>
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block font-bold">Menu Days</span>
                  <span className="text-lg font-black text-emerald-600">{foodMenu.length} Days</span>
                </div>
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block font-bold">Inclusions</span>
                  <span className="text-lg font-black text-slate-900">{inclusions.length} Items</span>
                </div>
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block font-bold">Public URL</span>
                  <span className="text-xs font-mono font-bold text-blue-700 block truncate">
                    /tour/{slug || "slug"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded bg-blue-50 border border-blue-200 flex items-center justify-between text-blue-900 text-xs font-medium">
                <div>
                  <strong>Ready to Publish?</strong> Clicking save will store this package in your database/state and make its public page live at <code>/tour/{slug || "slug"}</code>.
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500 font-semibold">
              * Required fields. All changes are saved to persistent local storage.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-extrabold transition-colors shadow-sm flex items-center gap-1.5 text-xs"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{initialPackage ? "Update & Save Package" : "Publish & Create Package"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
