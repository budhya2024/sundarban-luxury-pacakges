export interface TourActivity {
  time: string;
  title: string;
  desc: string;
}

export interface TourItineraryDay {
  dayNumber: number;
  dayTitle: string;
  activities: TourActivity[];
}

export interface TourMealCourse {
  courseName: string;
  menuItems: string;
}

export interface TourDayFoodMenu {
  dayNumber: number;
  dayTitle: string;
  courses: TourMealCourse[];
}

export interface AdminTourPackage {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  duration: string;
  price: number;
  originalPrice: number;
  category?: "Luxury Cruise" | "Standard Eco" | "Resort Stay" | "Private Charter";
  rating: number;
  reviewsCount: number;
  image: string;
  bannerImage?: string;
  gallery?: string[];
  status: "Active" | "Draft" | "Archived";
  maxGuests: number;
  departure: string;
  pickupDrop?: string;
  mealsSummary?: string;
  minGroupSize?: string;
  overview?: string;
  highlightQuote?: string;
  itinerary?: TourItineraryDay[];
  foodMenu?: TourDayFoodMenu[];
  inclusions: string[];
  exclusions?: string[];
  thingsToCarry?: string[];
  childPolicy?: string[];
  importantNotes?: string[];
  helplinePhone?: string;
  featured: boolean;
}

export interface AdminBooking {
  id: string;
  bookingCode: string;
  guestName: string;
  email: string;
  phone: string;
  packageOrRoom: string;
  type: "Tour Package" | "Hotel Resort";
  travelDate: string;
  guestsCount: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: "Paid" | "Partial" | "Unpaid";
  bookingStatus: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  createdAt: string;
  specialRequests?: string;
}

export interface AdminHotelRoom {
  id: string;
  name: string;
  code: string;
  pricePerNight: number;
  capacity: string;
  bedType: string;
  totalRooms: number;
  availableRooms: number;
  status: "Available" | "Sold Out" | "Maintenance";
  image: string;
  amenities: string[];
}

export interface AdminMenuItem {
  id: string;
  name: string;
  category: "Bengali Non-Veg" | "Bengali Fish & Seafood" | "Bengali Veg" | "Dessert & Beverage";
  priceTag: string;
  tag: string;
  image: string;
  description: string;
  isChefSpecial: boolean;
  status: "Active" | "Unavailable";
}

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "In Progress" | "Converted" | "Closed";
  source: "Contact Form" | "WhatsApp" | "Custom Request" | "Helpline Call";
}

export interface AdminContactCard {
  id: string;
  iconKey: "location" | "phone" | "email" | "clock" | "support" | "building";
  title: string;
  subtitle: string;
  details: string[];
  actionType?: "call" | "whatsapp" | "email" | "map" | "none";
  actionValue?: string;
  isPrimary?: boolean;
  status: "Active" | "Inactive";
}

export interface AdminContactGeneralInfo {
  heroTitle: string;
  heroSubtitle: string;
  helpdeskPhone: string;
  whatsappNumber: string;
  officialEmail: string;
  supportEmail: string;
  mainAddress: string;
  workingHours: string;
  googleMapEmbedUrl: string;
  emergencyHotline: string;
}

export interface AdminPageSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  styleType: "standard" | "alert-red" | "highlight-gold" | "feature-box";
  badgeText?: string;
  ctaText?: string;
  ctaUrl?: string;
  order: number;
  isActive: boolean;
}

export interface AdminPageContent {
  pageKey: "home" | "about" | "hotel" | "tours" | "contact";
  pageName: string;
  pageRoute: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  metaDescription?: string;
  sections: AdminPageSection[];
}

export interface AdminFaqItem {
  id: string;
  questionNumber: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface AdminTestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  tourPackage?: string;
  date?: string;
  featured?: boolean;
  status: "Active" | "Inactive";
}

export interface AdminGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  column: "col1" | "col2" | "col3" | "col4" | "col5";
  category?: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface AdminGlobalAlertBanner {
  isEnabled: boolean;
  text: string;
  badge: string;
  type: "alert-red" | "promo-gold" | "info-blue";
  actionText?: string;
  actionUrl?: string;
}

export const initialAdminAlertBanner: AdminGlobalAlertBanner = {
  isEnabled: true,
  text: "Special Winter Wildlife Festival 2026: Book 2N/3D Royal Tiger Tour early and receive complimentary Sonar Bangla Resort Jacuzzi upgrade!",
  badge: "Urgent Update",
  type: "alert-red",
  actionText: "Book Safari Now",
  actionUrl: "/tour/2-nights-3-days-tiger-trail",
};

export const initialAdminPackages: AdminTourPackage[] = [
  {
    id: "pkg-1",
    name: "1 Night 2 Days Luxury Cruise Package",
    slug: "1-night-2-days-luxury-cruise",
    subtitle: "Discover the true wilderness of the mangrove delta with our premier 1N/2D AC river cruise & cultural stay.",
    duration: "2 Days / 1 Night",
    price: 2999,
    originalPrice: 3999,
    category: "Luxury Cruise",
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
    maxGuests: 45,
    departure: "Godkhali Ferry Ghat (8:30 AM)",
    pickupDrop: "Kolkata (Science City / Airport / Howrah Station) & Canning",
    mealsSummary: "6 Times Fresh Cooked Bengali Buffet Meals",
    minGroupSize: "Min 2 People",
    overview: "Sundarban 1 Night 2 Days Tour is the most popular tour package among tourists. You will experience rich wildlife, thick estuarine mangroves, serene watchtowers, and authentic local folk traditions in the land of Royal Bengal Tigers. Sail comfortably on our state-of-the-art vessel with freshly prepared delicacies and expert forest naturalists.",
    highlightQuote: "“Sundarban 1 Night 2 Days Tour is the most popular tour package from Kolkata. Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”",
    helplinePhone: "+91 70014 03498",
    inclusions: [
      "Pick up & Drop from Kolkata in AC Vehicle",
      "Accommodation in Luxury Resort / Boat Cabins",
      "All Meals (2 Breakfast, 2 Lunch, 1 Dinner, Evening Snacks)",
      "All Forest Department Entry Permits & Watchtower Fees",
      "Certified Forest Naturalist Tour Guide",
      "Cultural Folk Dance Show & Evening Bonfire",
      "Luxury Boat Cruise through Mangrove Creeks",
    ],
    exclusions: [
      "Any Personal Expenses or Tips",
      "Video Camera Permit Charges",
      "Anything Not Mentioned in Inclusions List",
      "Medical or Travel Insurance",
      "GST 5% Extra Applicable",
      "Personal Beverages & Bottled Water",
    ],
    thingsToCarry: [
      "Original Photo ID Proof (Aadhaar / Voter ID / Passport)",
      "Comfortable Cotton Clothes & Walking Shoes",
      "Sunscreen Lotion, Sunglasses & Sun Hat",
      "Personal Medicines & Basic First Aid Kit",
      "Camera with Extra Memory Card & Power Bank",
      "Insect Repellent Cream",
      "Cash for Personal Shopping & Local Handicrafts",
    ],
    childPolicy: [
      "Child below 5 years: 100% Complimentary / FREE (sharing parents' bed).",
      "Child between 5 to 10 years: 50% of adult package price applicable.",
      "Child above 10 years: Charged as full adult rate with separate bed & seat.",
    ],
    importantNotes: [
      "Forest Department entry permissions require government ID submission 24h before cruise departure.",
      "Plastic bottles and plastic bags are strictly prohibited inside Sundarban Tiger Reserve core areas.",
      "Itinerary timings may slightly adjust based on river high-tide and low-tide schedules.",
      "Swimming in mangrove river creeks is strictly forbidden for wildlife safety.",
    ],
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - Starting in Sundarban",
        activities: [
          { time: "8:00 AM", title: "Pick up from Kolkata", desc: "Pick up from Kolkata (Science City / Airport / Howrah Station) in AC luxury vehicle and drive towards Godkhali Ferry Ghat." },
          { time: "11:30 AM", title: "Arrive at Godkhali & Board Cruise", desc: "Board our luxury vessel with welcome drinks. Sail towards Sajnekhali watchtower area." },
          { time: "1:30 PM", title: "Cruising Through Mangrove Creek", desc: "Enjoy hot cooked Bengali lunch served on the boat deck while cruising through narrow forest creeks." },
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
    ],
    foodMenu: [
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
    ],
    featured: true,
  },
  {
    id: "pkg-2",
    name: "2 Nights 3 Days Complete Tiger Trail Expedition",
    slug: "2-nights-3-days-tiger-trail",
    subtitle: "The ultimate 3-day deep delta safari covering Burirdabri, Netidhopani, Dobanki canopy walk & Sajnekhali.",
    duration: "3 Days / 2 Nights",
    price: 4999,
    originalPrice: 6499,
    category: "Luxury Cruise",
    rating: 4.9,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    ],
    status: "Active",
    maxGuests: 40,
    departure: "Godkhali Ghat / Canning",
    pickupDrop: "Kolkata (AC Coach Pickup & Drop Included)",
    mealsSummary: "9 Fresh Buffet Meals (3 Breakfast, 3 Lunch, 2 Dinner, 2 High Tea)",
    minGroupSize: "Min 2 People",
    overview: "Our 2 Nights 3 Days Tiger Trail is our highest-rated wildlife itinerary designed for photographers, nature enthusiasts, and families. Sail deep into the core delta areas where Royal Bengal Tigers, saltwater crocodiles, and rare mangrove kingfishers thrive.",
    highlightQuote: "“Experience the deep heart of Sundarban Tiger Reserve with 3 days of uninterrupted estuary cruising and 5 iconic watchtowers.”",
    helplinePhone: "+91 70014 03498",
    inclusions: [
      "AC Premium Cruiser & Experienced Crew",
      "All 9 Buffet Meals with Hilsa & Mutton specials",
      "Sajnekhali, Dobanki & Sudhanyakhali Forest Entry Permits",
      "Village Folk Dance & Campfire Evening",
      "Pick & Drop in AC Coach from Kolkata",
      "Exclusive High-Deck Viewing & Binoculars on Loan",
    ],
    exclusions: [
      "Personal shopping and souvenirs",
      "Camera fees applicable at watchtowers",
      "Optional room service orders",
      "Medical emergency air ambulance",
    ],
    thingsToCarry: [
      "Government Photo ID Card",
      "Binoculars & Telephoto Lens",
      "Comfortable Walking Attire & Cap",
      "Light Jacket or Shawl for Early Mornings",
    ],
    childPolicy: [
      "Under 5 yrs: Free",
      "5 to 10 yrs: 50% charge",
      "Above 10 yrs: Adult tariff",
    ],
    importantNotes: [
      "Valid Government ID required at boarding.",
      "Eco-friendly zero-plastic guidelines strictly enforced.",
    ],
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - Kolkata Departure & Sajnekhali Watchtower",
        activities: [
          { time: "7:30 AM", title: "Kolkata Pickup", desc: "Board comfortable AC coach from central Kolkata locations." },
          { time: "11:00 AM", title: "Godkhali Boarding", desc: "Welcome drink & check-in to luxury cruiser." },
          { time: "1:00 PM", title: "River Lunch & Mangrove Entry", desc: "Savour authentic Bengali feast while gliding into Vidya river." },
          { time: "3:30 PM", title: "Sajnekhali Watchtower", desc: "Explore interpretation center, crocodile sanctuary, and bird hide." },
          { time: "7:00 PM", title: "Cultural Program & Evening Tea", desc: "Live Baul & Bonobibi theater drama by local village artists." },
          { time: "9:00 PM", title: "Dinner", desc: "Chef's special Chicken Kosha & Bengali sweets." },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 - Core Reserve Safari & Canopy Walk",
        activities: [
          { time: "6:00 AM", title: "Morning Tiger Safari", desc: "Dawn cruise across Pirkhali & Gazikhali narrow tiger crossings." },
          { time: "8:30 AM", title: "Dobanki Watchtower & Walkway", desc: "Walk the famous 0.5km canopy bridge inside heavy tiger habitat." },
          { time: "1:00 PM", title: "Buffet Lunch on Deck", desc: "Gold Prawn & Fish curry feast served on upper observation deck." },
          { time: "4:00 PM", title: "Panchamukhani Confluence", desc: "View the confluence of 5 major delta rivers at sunset." },
          { time: "8:30 PM", title: "Gala Dinner with Bonfire", desc: "Traditional slow-cooked Mutton Kosha with steamed basmati rice." },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Day 3 - Sudhanyakhali Safari & Return Transfer",
        activities: [
          { time: "7:00 AM", title: "Sudhanyakhali Watchtower", desc: "Sweet-water pond wildlife viewing for spotted deer and wild boars." },
          { time: "12:30 PM", title: "Farewell Lunch on Boat", desc: "Final sumptuous lunch before disembarking at Godkhali." },
          { time: "3:30 PM", title: "Godkhali to Kolkata Transfer", desc: "AC coach journey back to Kolkata with drop-off by evening." },
        ],
      },
    ],
    foodMenu: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 Feast",
        courses: [
          { courseName: "Breakfast", menuItems: "Puri Sabji / Bread Omelette, Sweets, Hot Tea / Coffee" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Begun Bhaja, Katla Fish Curry / Vetki Paturi, Chutney, Papad" },
          { courseName: "Evening Snacks", menuItems: "Fish Finger / Veg Cutlet with Hot Coffee" },
          { courseName: "Dinner", menuItems: "Roti / Rice, Desi Murgh Curry, Salad, Rasgulla" },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 Royal Menu",
        courses: [
          { courseName: "Morning Tea", menuItems: "Bed Tea with Butter Cookies" },
          { courseName: "Breakfast", menuItems: "Radhaballavi, Cholar Dal, Boiled Egg / Banana, Tea" },
          { courseName: "Lunch", menuItems: "Basmati Rice, Sona Moong Dal, Chingri Malai Curry / Crab Masala, Papad" },
          { courseName: "Evening Snacks", menuItems: "Chicken Pakora / Paneer Pakora, Masala Tea" },
          { courseName: "Dinner", menuItems: "Jeera Rice / Roti, Special Mutton Kosha, Salad, Gulab Jamun" },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Day 3 Farewell Menu",
        courses: [
          { courseName: "Breakfast", menuItems: "Kachori Alur Dom, Jalebi, Tea / Coffee" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Shorshe Ilish / Rui Kalia, Tomato Chutney, Papad" },
          { courseName: "Snack Box", menuItems: "Packaged Sweet & Savory Box with Frooti for return journey" },
        ],
      },
    ],
    featured: true,
  },
  {
    id: "pkg-3",
    name: "Hotel Sonar Bangla 5-Star Resort Stay & Cruise",
    slug: "hotel-sonar-bangla-resort-package",
    subtitle: "5-Star luxury resort living at Hotel Sonar Bangla Sundarban combined with private luxury boat safaris.",
    duration: "3 Days / 2 Nights",
    price: 8499,
    originalPrice: 10999,
    category: "Resort Stay",
    rating: 4.8,
    reviewsCount: 92,
    image: "/assets/sonarbanglahotel.jpg",
    status: "Active",
    maxGuests: 50,
    departure: "Gosaba / Godkhali Jetty",
    pickupDrop: "Private Luxury AC Car Transfer from Kolkata Doorstep",
    mealsSummary: "All Gourmet Buffet Meals at Hotel Sonar Bangla & Cruise",
    minGroupSize: "Min 2 People",
    overview: "Indulge in unmatched delta luxury at Hotel Sonar Bangla Sundarban. Enjoy sprawling manicured gardens, swimming pool, luxury air-conditioned riverfront suites, multi-cuisine dining, and private speed boat / cruise safaris inside the national park.",
    highlightQuote: "“The pinnacle of luxury in Sundarban: 5-Star resort comfort by night and thrilling mangrove safaris by day.”",
    helplinePhone: "+91 70014 03498",
    inclusions: [
      "Executive AC Deluxe Suite at Hotel Sonar Bangla",
      "Resort Swimming Pool, Jacuzzi & Gym Access",
      "Private AC Boat Safari with Certified Naturalist",
      "All Forest Permits & Watchtower Access",
      "Buffet Breakfast & Dinner at Resort Restaurant",
      "Private Car Transfer from Kolkata Airport/Hotel",
    ],
    exclusions: [
      "Alcoholic beverages and room minibar",
      "Spa & Ayurveda therapy charges",
      "Personal laundry and phone charges",
    ],
    thingsToCarry: [
      "ID Proof for Resort & Forest Check-in",
      "Swimwear for Resort Pool",
      "Casual Resort Wear & Binoculars",
    ],
    childPolicy: [
      "Under 5 yrs: Free sharing bed",
      "5 to 12 yrs: 50% with extra bed",
      "Above 12 yrs: Full adult tariff",
    ],
    importantNotes: [
      "Resort check-in 12:00 PM, check-out 10:00 AM.",
      "Early morning boat safari leaves resort jetty at 6:30 AM.",
    ],
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - Luxury Transfer & Sonar Bangla Check-in",
        activities: [
          { time: "8:00 AM", title: "Private Car Pickup", desc: "Chauffeured luxury car pickup from your residence in Kolkata." },
          { time: "12:00 PM", title: "Resort Welcome & Check-in", desc: "Traditional Bengali welcome drink, check-in to Executive Suite." },
          { time: "1:30 PM", title: "Gourmet Buffet Lunch", desc: "Enjoy luxury dining at Sonar Bangla restaurant." },
          { time: "4:00 PM", title: "Sunset Village Walk & Pool Relax", desc: "Relax by the infinity pool or take a stroll through the delta village." },
          { time: "8:00 PM", title: "Resort Gala Dinner", desc: "Live music and lavish multi-cuisine buffet dinner." },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 - Full Day Exclusive Boat Safari",
        activities: [
          { time: "6:30 AM", title: "Private Boat Boarding", desc: "Board private safari boat directly from the resort riverfront jetty." },
          { time: "9:00 AM", title: "Dobanki & Sajnekhali Watchtowers", desc: "Guided exploration of watchtowers and high canopy walk." },
          { time: "1:30 PM", title: "Fresh Fish Lunch on Boat", desc: "Chef-prepared river meal served on luxury observation deck." },
          { time: "5:00 PM", title: "Return to Resort & High Tea", desc: "High tea by the pool followed by resort recreation facilities." },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Day 3 - Morning Leisure & Private Return",
        activities: [
          { time: "8:00 AM", title: "Resort Buffet Breakfast", desc: "Continental and Indian buffet breakfast spread." },
          { time: "11:00 AM", title: "Check-out & Return Journey", desc: "Chauffeured vehicle transfer back to Kolkata." },
        ],
      },
    ],
    foodMenu: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 Resort Menu",
        courses: [
          { courseName: "Lunch Buffet", menuItems: "Multi-cuisine spread with Bhetki Paturi, Mutton Rogan Josh & Desserts" },
          { courseName: "High Tea", menuItems: "Cookies, Canape, Assorted Teas & Cappuccino" },
          { courseName: "Dinner Buffet", menuItems: "Live counter Pasta, Indian breads, Biryani & Sundarban Sweet Curd" },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 Safari & Resort Dining",
        courses: [
          { courseName: "Breakfast", menuItems: "Eggs to order, Dosa, Paratha, Fresh Juices & Fruits" },
          { courseName: "Safari Lunch", menuItems: "Steamed Rice, Moong Dal, Gold Prawn Malai Curry, Tomato Chutney" },
          { courseName: "Dinner", menuItems: "Chef's Special Continental & Bengali Fusion Dinner" },
        ],
      },
    ],
    featured: true,
  },
  {
    id: "pkg-4",
    name: "1 Day Sundarban Day Safari",
    slug: "1-day-sundarban-day-safari",
    subtitle: "Quick 1-day power-packed boat safari for busy travelers and day excursionists.",
    duration: "1 Day Excursion",
    price: 1899,
    originalPrice: 2499,
    category: "Standard Eco",
    rating: 4.7,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    status: "Active",
    maxGuests: 60,
    departure: "Godkhali Ferry Ghat (7:30 AM)",
    pickupDrop: "Pickup & Drop from Science City Kolkata (6:00 AM)",
    mealsSummary: "Breakfast & Fresh Cooked Lunch on Boat Deck",
    minGroupSize: "Min 1 Person",
    overview: "Short on time but eager to witness the majestic Sundarbans? Our 1 Day Safari departs Kolkata at dawn, provides 6 hours of prime boat safari through Sajnekhali and mangrove creeks, and returns you back to Kolkata by 9 PM same day.",
    highlightQuote: "“Explore the delta in a single action-packed day with breakfast, hot lunch, and watchtower safaris included.”",
    helplinePhone: "+91 70014 03498",
    inclusions: [
      "Same day AC Coach transfer from Kolkata",
      "Full Day Boat Safari through Sajnekhali & Sudhanyakhali",
      "Breakfast on boat with hot Tea/Coffee",
      "Fresh Cooked Bengali Lunch on Boat Deck",
      "Watchtower Entry Permits & Guide Fees",
    ],
    exclusions: [
      "Dinner and personal shopping",
      "Camera permits",
    ],
    thingsToCarry: [
      "Photo ID",
      "Sun Hat & Sunglasses",
      "Powerbank",
    ],
    childPolicy: [
      "Under 5 yrs: Free",
      "Above 5 yrs: Standard seat rate",
    ],
    importantNotes: [
      "Strict departure time from Kolkata 6:00 AM sharp.",
    ],
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: "Full Day Safari Schedule",
        activities: [
          { time: "6:00 AM", title: "Kolkata Pickup", desc: "Board AC bus from Kolkata." },
          { time: "9:00 AM", title: "Godkhali Boat Departure", desc: "Board boat with breakfast." },
          { time: "11:30 AM", title: "Sajnekhali Watchtower", desc: "Guided watchtower & interpretation visit." },
          { time: "1:30 PM", title: "Lunch on River", desc: "Freshly cooked fish & chicken lunch on deck." },
          { time: "3:30 PM", title: "Sudhanyakhali Safari", desc: "Creek cruise in search of tigers & deer." },
          { time: "5:30 PM", title: "Godkhali to Kolkata", desc: "Return journey to Kolkata." },
        ],
      },
    ],
    foodMenu: [
      {
        dayNumber: 1,
        dayTitle: "Day Safari Meals",
        courses: [
          { courseName: "Breakfast", menuItems: "Luchi, Alur Dom, Sweet, Tea" },
          { courseName: "Lunch", menuItems: "Rice, Dal, Veg Fry, Fish / Chicken Curry, Chutney, Papad" },
          { courseName: "Evening Tea", menuItems: "Biscuits & Hot Tea" },
        ],
      },
    ],
    featured: false,
  },
  {
    id: "pkg-5",
    name: "Private Luxury Houseboat Royal Charter",
    slug: "private-luxury-houseboat-charter",
    subtitle: "Exclusive private charter of a luxury AC houseboat with personal butler, private chef, and custom route.",
    duration: "3 Days / 2 Nights",
    price: 24999,
    originalPrice: 29999,
    category: "Private Charter",
    rating: 5.0,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
    status: "Active",
    maxGuests: 12,
    departure: "Custom Port Departure",
    pickupDrop: "VIP Doorstep Transfer in Luxury SUV",
    mealsSummary: "Custom 5-Star Ala-Carte Menu Prepared by Private Onboard Chef",
    minGroupSize: "Private Group (Up to 12 Guests)",
    overview: "The most exclusive way to explore Sundarbans. You charter the entire AC luxury cruiser for your family or VIP corporate group. Includes custom route planning, flexible timing, private naturalist guide, and 5-star personalized hospitality.",
    highlightQuote: "“Your private luxury floating palace in the heart of the world’s largest mangrove forest.”",
    helplinePhone: "+91 70014 03498",
    inclusions: [
      "Exclusive charter of entire luxury boat (no other tourists)",
      "Dedicated Private Chef, Butler and Navigator Crew",
      "Full AC Bedrooms with Attached Modern Bathrooms",
      "Customised Gourmet Dining (Hilsa, Mutton, Lobster, Crab)",
      "VIP Fast-Track Forest Entry Permits",
      "Luxury SUV Pick & Drop from Kolkata",
    ],
    exclusions: [
      "Any external helicopter or special transfer requests",
    ],
    thingsToCarry: [
      "Passport or National ID for VIP clearance",
      "Camera & binoculars",
    ],
    childPolicy: [
      "Children of all ages welcome under private charter.",
    ],
    importantNotes: [
      "Itinerary can be customized to guests' preference.",
    ],
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 - VIP Boarding & Private Cruise",
        activities: [
          { time: "9:00 AM", title: "Luxury SUV Transfer", desc: "Private pickup from residence." },
          { time: "12:00 PM", title: "Champagne & Coconut Welcome", desc: "Board private houseboat." },
          { time: "2:00 PM", title: "Custom Delta Cruise", desc: "Sail to secluded mangrove channels." },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 - Deep Wilderness Exploration",
        activities: [
          { time: "6:00 AM", title: "Private Dawn Tiger Safari", desc: "Exclusive access to deep watchtowers." },
          { time: "1:00 PM", title: "Chef's Special Lobster Lunch", desc: "Private dining on sundeck." },
        ],
      },
      {
        dayNumber: 3,
        dayTitle: "Day 3 - Sunrise Cruise & Return",
        activities: [
          { time: "7:00 AM", title: "Sunrise Safari", desc: "Final scenic safari through delta channels." },
          { time: "2:00 PM", title: "VIP SUV Return", desc: "Disembark and return to Kolkata in comfort." },
        ],
      },
    ],
    foodMenu: [
      {
        dayNumber: 1,
        dayTitle: "Day 1 Bespoke Menu",
        courses: [
          { courseName: "Welcome & Lunch", menuItems: "Jumbo Gold Prawns, Bhetki Paturi, Basmati Rice, Desserts" },
          { courseName: "Dinner", menuItems: "Slow Roasted Royal Mutton, Naan, Gulab Jamun" },
        ],
      },
      {
        dayNumber: 2,
        dayTitle: "Day 2 Gourmet Feast",
        courses: [
          { courseName: "Breakfast", menuItems: "Custom full English & Indian breakfast" },
          { courseName: "Lunch", menuItems: "Steamed Hilsa, Delta Mud Crab Masala, Chutney, Papad" },
        ],
      },
    ],
    featured: true,
  },
];

export const initialAdminBookings: AdminBooking[] = [
  {
    id: "bk-101",
    bookingCode: "SB-2026-901",
    guestName: "Subhashis Mukherjee",
    email: "subhashis.m@gmail.com",
    phone: "+91 98301 23456",
    packageOrRoom: "2 Nights 3 Days Complete Tiger Trail Expedition",
    type: "Tour Package",
    travelDate: "2026-09-18",
    guestsCount: 4,
    totalAmount: 19996,
    paidAmount: 19996,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-09-12 14:32",
    specialRequests: "Need vegetarian meals for 2 elderly guests.",
  },
  {
    id: "bk-102",
    bookingCode: "SB-2026-902",
    guestName: "Priyanka Roy",
    email: "priyanka.roy@yahoo.com",
    phone: "+91 94331 88990",
    packageOrRoom: "Hotel Sonar Bangla 5-Star Resort Stay & Cruise",
    type: "Hotel Resort",
    travelDate: "2026-09-22",
    guestsCount: 2,
    totalAmount: 16998,
    paidAmount: 5000,
    paymentStatus: "Partial",
    bookingStatus: "Confirmed",
    createdAt: "2026-09-12 11:15",
    specialRequests: "Anniversary room decoration requested.",
  },
  {
    id: "bk-103",
    bookingCode: "SB-2026-903",
    guestName: "Amitabh Sen",
    email: "amitabh.sen@tcs.com",
    phone: "+91 98310 55443",
    packageOrRoom: "1 Night 2 Days Luxury Cruise Package",
    type: "Tour Package",
    travelDate: "2026-09-25",
    guestsCount: 6,
    totalAmount: 17994,
    paidAmount: 0,
    paymentStatus: "Unpaid",
    bookingStatus: "Pending",
    createdAt: "2026-09-12 09:40",
    specialRequests: "AC pickup from Science City Kolkata.",
  },
  {
    id: "bk-104",
    bookingCode: "SB-2026-904",
    guestName: "Dr. Debolina Das",
    email: "debolina.das@apollo.org",
    phone: "+91 97482 11223",
    packageOrRoom: "Private Luxury Houseboat Royal Charter",
    type: "Tour Package",
    travelDate: "2026-10-02",
    guestsCount: 8,
    totalAmount: 24999,
    paidAmount: 24999,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-09-11 16:50",
  },
  {
    id: "bk-105",
    bookingCode: "SB-2026-905",
    guestName: "Vikramaditya Bose",
    email: "vikram.bose@gmail.com",
    phone: "+91 98305 66778",
    packageOrRoom: "1 Day Sundarban Day Safari",
    type: "Tour Package",
    travelDate: "2026-09-15",
    guestsCount: 3,
    totalAmount: 5697,
    paidAmount: 5697,
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    createdAt: "2026-09-10 18:20",
  },
];

export const initialAdminRooms: AdminHotelRoom[] = [
  {
    id: "rm-1",
    name: "Executive Riverview Deluxe Room",
    code: "HSB-DLX-01",
    pricePerNight: 5500,
    capacity: "2 Adults + 1 Child",
    bedType: "1 King Size Bed",
    totalRooms: 16,
    availableRooms: 6,
    status: "Available",
    image: "/assets/sonarbanglahotel.jpg",
    amenities: ["River Facing Balcony", "Air Conditioned", "Buffet Breakfast", "Swimming Pool Access", "Free Wi-Fi"],
  },
  {
    id: "rm-2",
    name: "Royal Presidential Mangrove Suite",
    code: "HSB-STE-02",
    pricePerNight: 9500,
    capacity: "4 Adults",
    bedType: "2 Queen Size Beds",
    totalRooms: 8,
    availableRooms: 2,
    status: "Available",
    image: "/assets/sonarbanglahotel.jpg",
    amenities: ["Spacious Living Area", "Jacuzzi", "Forest & River Panorama", "Butler Service", "24/7 Dining"],
  },
  {
    id: "rm-3",
    name: "Deluxe Premium AC Room",
    code: "HSB-DLX-03",
    pricePerNight: 4800,
    capacity: "2 Adults",
    bedType: "1 Queen Size Bed",
    totalRooms: 20,
    availableRooms: 9,
    status: "Available",
    image: "/assets/sonarbanglahotel.jpg",
    amenities: ["Garden View", "Air Conditioning", "LED TV", "Tea/Coffee Maker", "Attached Luxury Bath"],
  },
  {
    id: "rm-4",
    name: "Heritage Mangrove Wooden Villa",
    code: "HSB-VILLA-04",
    pricePerNight: 12000,
    capacity: "4 Adults + 2 Children",
    bedType: "2 King Beds + Lounge",
    totalRooms: 4,
    availableRooms: 0,
    status: "Sold Out",
    image: "/assets/sonarbanglahotel.jpg",
    amenities: ["Private Lawn", "Direct Jetty Access", "Personal Chef", "Complimentary High Tea", "Eco-friendly Wooden Interior"],
  },
];

export const initialAdminMenuItems: AdminMenuItem[] = [
  {
    id: "menu-1",
    name: "Royal Bengali Mutton Kosha",
    category: "Bengali Non-Veg",
    priceTag: "Included in Package",
    tag: "Royal Delicacy",
    image: "/assets/images/menu/mutton-curry.jpg",
    description: "Tender goat meat slow-cooked with golden potatoes & authentic Bengali garam masala.",
    isChefSpecial: true,
    status: "Active",
  },
  {
    id: "menu-2",
    name: "Traditional Steamed Hilsa (Ilish Bhapa)",
    category: "Bengali Fish & Seafood",
    priceTag: "Included in Package",
    tag: "Monsoon Special",
    image: "/assets/images/menu/ilish-paturi.jpg",
    description: "Fresh Padma/Hooghly river Hilsa steamed with freshly ground mustard & green chillies.",
    isChefSpecial: true,
    status: "Active",
  },
  {
    id: "menu-3",
    name: "Bhetki Macher Paturi",
    category: "Bengali Fish & Seafood",
    priceTag: "Included in Package",
    tag: "Fresh Catch",
    image: "/assets/images/menu/bhetki-curry.jpg",
    description: "Fresh river bhetki fish cutlets simmered in mustard and fragrant panch phoron gravy.",
    isChefSpecial: true,
    status: "Active",
  },
  {
    id: "menu-4",
    name: "Gold Tiger Prawn Malai Curry",
    category: "Bengali Fish & Seafood",
    priceTag: "Included in Package",
    tag: "Signature Dish",
    image: "/assets/images/menu/prawn-malai-curry.jpg",
    description: "Luscious gold tiger prawns cooked in creamy coconut milk and aromatic spices.",
    isChefSpecial: true,
    status: "Active",
  },
];

export const initialAdminInquiries: AdminInquiry[] = [
  {
    id: "inq-1",
    name: "Sourav Ganguly & Family",
    email: "sourav.g@outlook.com",
    phone: "+91 98300 11223",
    subject: "Private Houseboat booking for 12 members during Diwali",
    message: "We want to book the full luxury cruiser for a 3-day private family vacation in late October. Please share customized package quote and menu options.",
    date: "2026-09-12 16:10",
    status: "New",
    source: "WhatsApp",
  },
  {
    id: "inq-2",
    name: "Pooja Hegde (Corporate Admin, Cognizant)",
    email: "pooja.h@cognizant.com",
    phone: "+91 99001 88776",
    subject: "Corporate Team Offsite for 35 Executives",
    message: "Looking for an all-inclusive 2N/3D tour with Hotel Sonar Bangla conference room facilities and boat safaris. Need formal GST invoice.",
    date: "2026-09-12 12:45",
    status: "In Progress",
    source: "Contact Form",
  },
  {
    id: "inq-3",
    name: "Dr. Anupam Ghosh",
    email: "anupam.ghosh@aiims.edu",
    phone: "+91 94340 55667",
    subject: "Custom Wildlife Birdwatching Photography tour",
    message: "Interested in early morning small country boat permits into deep creek channels for kingfisher and masked finfoot photography.",
    date: "2026-09-11 19:30",
    status: "Contacted",
    source: "Custom Request",
  },
  {
    id: "inq-4",
    name: "Swati Chakraborty",
    email: "swati.c@gmail.com",
    phone: "+91 98741 22334",
    subject: "Pickup from Kolkata Airport to Godkhali Ghat",
    message: "Can you provide AC Innova pickup directly from Netaji Subhash Chandra Bose International Airport at 6 AM?",
    date: "2026-09-10 14:15",
    status: "Converted",
    source: "Helpline Call",
  },
];

export const initialAdminContactCards: AdminContactCard[] = [
  {
    id: "card-1",
    iconKey: "location",
    title: "Head Office",
    subtitle: "Launch & Reservation Center",
    details: ["Godkhali Ferry Ghat, Canning Town", "South 24 Parganas, West Bengal 743329"],
    actionType: "map",
    actionValue: "https://maps.google.com",
    isPrimary: true,
    status: "Active",
  },
  {
    id: "card-2",
    iconKey: "phone",
    title: "Phone & WhatsApp",
    subtitle: "24/7 Cruise Assistance",
    details: ["+91 70014 03498 (Hotline)", "+91 70014 03498 (WhatsApp)"],
    actionType: "call",
    actionValue: "+917001403498",
    isPrimary: true,
    status: "Active",
  },
  {
    id: "card-3",
    iconKey: "email",
    title: "Email Support",
    subtitle: "Inquiries & Reservations",
    details: ["sundarbanluxurypackage@gmail.com"],
    actionType: "email",
    actionValue: "sundarbanluxurypackage@gmail.com",
    isPrimary: true,
    status: "Active",
  },
  {
    id: "card-4",
    iconKey: "clock",
    title: "Operating Hours",
    subtitle: "Always At Your Service",
    details: ["Mon - Sat: 8:00 AM - 9:00 PM", "Sunday: 9:00 AM - 6:00 PM"],
    actionType: "none",
    isPrimary: false,
    status: "Active",
  },
  {
    id: "card-5",
    iconKey: "building",
    title: "Kolkata City Booking Office",
    subtitle: "City Coordination Desk",
    details: ["Park Street Commercial Hub, Kolkata", "West Bengal 700016"],
    actionType: "map",
    actionValue: "https://maps.google.com",
    isPrimary: false,
    status: "Active",
  },
];

export const initialAdminContactGeneralInfo: AdminContactGeneralInfo = {
  heroTitle: "Contact Our Sundarban Luxury Expeditions Team",
  heroSubtitle: "24/7 Reservation Assistance, Custom Houseboat Charter Planning & Tour Inquiries",
  helpdeskPhone: "+91 70014 03498",
  whatsappNumber: "+91 70014 03498",
  officialEmail: "sundarbanluxurypackage@gmail.com",
  supportEmail: "sundarbanluxurypackage@gmail.com",
  mainAddress: "Godkhali Ferry Ghat, Canning Town, South 24 Parganas, West Bengal 743329",
  workingHours: "Monday to Sunday: 8:00 AM – 9:00 PM IST",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118228.4550882196!2d88.65780529999999!3d22.2152865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0210f69a538221%3A0x6b4fb6c17e657e5e!2sGodkhali%20Ferry%20Ghat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  emergencyHotline: "+91 70014 03498",
};

export const initialAdminPages: AdminPageContent[] = [
  {
    pageKey: "home",
    pageName: "Home Page",
    pageRoute: "/",
    heroTitle: "Luxury Eco Expeditions in the World's Largest Mangrove Delta",
    heroSubtitle: "Experience Royal Bengal Tiger sightings, boutique river cruisers, gourmet dining, and 5-star Hotel Sonar Bangla hospitality.",
    heroBadge: "Official Sundarban Tourism Partner",
    metaDescription: "Sundarban Luxury Tour packages, 5-star river safaris, and luxury resort stays in the Sundarbans mangrove forest.",
    sections: [
      {
        id: "sec-h1",
        title: "Important Travel Advisory: Mandatory Government Permit Requirements",
        subtitle: "Forest Department Notice",
        content: "All travellers visiting core wildlife zones (Sudhanyakhali, Dobanki, Sajnekhali) must carry valid Government Photo ID (Aadhaar / Voter ID / Passport for foreign nationals). All required permits are arranged in advance by our cruise concierge.",
        styleType: "alert-red",
        badgeText: "Required Notice",
        ctaText: "Read Travel Guidelines",
        ctaUrl: "/terms-and-conditions",
        order: 1,
        isActive: true,
      },
      {
        id: "sec-h2",
        title: "Why Choose Sundarban Luxury Packages",
        subtitle: "Unmatched Hospitality & Wildlife Standards",
        content: "We provide private double-decker AC luxury vessels equipped with safety life-jackets, GPS tracking, experienced local naturalists, fresh seafood buffets, and private transfers from Kolkata airport & railway stations.",
        styleType: "feature-box",
        badgeText: "Premium Features",
        ctaText: "Explore Packages",
        ctaUrl: "/#packages",
        order: 2,
        isActive: true,
      },
    ],
  },
  {
    pageKey: "about",
    pageName: "About Us Page",
    pageRoute: "/about",
    heroTitle: "Crafting Unforgettable Sundarban Wildlife Adventures",
    heroSubtitle: "Dedicated to sustainable eco-tourism, local community empowerment, and unforgettable luxury wilderness expeditions.",
    heroBadge: "Our Legacy & Heritage",
    metaDescription: "Learn about Sundarban Luxury Package history, eco-conservation pledges, and professional expedition team.",
    sections: [
      {
        id: "sec-a1",
        title: "Eco-Conservation & Mangrove Protection Pledge",
        subtitle: "Zero-Waste & Plastic-Free Biosphere Zone",
        content: "We strictly observe non-intrusive wildlife observation guidelines. No single-use plastic is permitted aboard our cruise vessels. 5% of all package proceeds are directly reinvested into local mangrove reforestation and tiger tracker support.",
        styleType: "alert-red",
        badgeText: "Biosphere Protection",
        order: 1,
        isActive: true,
      },
      {
        id: "sec-a2",
        title: "15+ Years of Royal Bengal Tiger Tracking",
        subtitle: "Certified Forest Guides & Navigators",
        content: "Our skippers and naturalists have spent generations navigating the complex tidal maze of Sundarbans rivers, giving our guests the highest documented sighting success rate in eastern India.",
        styleType: "standard",
        order: 2,
        isActive: true,
      },
    ],
  },
  {
    pageKey: "hotel",
    pageName: "Hotel Sonar Bangla",
    pageRoute: "/hotel-sonar-bangla",
    heroTitle: "Hotel Sonar Bangla Sundarban — 5-Star Riverfront Luxury",
    heroSubtitle: "Immerse yourself in lush landscaped gardens, infinity swimming pool, multi-cuisine dining, and luxury suites facing the calm mangrove waters.",
    heroBadge: "Exclusive Resort Partner",
    metaDescription: "Book luxury rooms, presidential suites, and villa cottages at Hotel Sonar Bangla resort in the Sundarbans.",
    sections: [
      {
        id: "sec-ht1",
        title: "Resort Health & Safety Protocol",
        subtitle: "Guest Safety Advisory",
        content: "24/7 on-call medical assistance, purified RO water filtration throughout the resort, full inverter and power backup, and gated private jetty for direct boat boarding.",
        styleType: "alert-red",
        badgeText: "Safety Standards",
        order: 1,
        isActive: true,
      },
      {
        id: "sec-ht2",
        title: "Riverfront Dining & Bengali Culinary Experience",
        subtitle: "Fresh Fish & Local Catch",
        content: "Enjoy fresh Bhetki paturi, Gold Tiger Prawn malai curry, and traditional Bengali sweets prepared daily by executive resort chefs.",
        styleType: "highlight-gold",
        badgeText: "Gourmet Dining",
        order: 2,
        isActive: true,
      },
    ],
  },
  {
    pageKey: "tours",
    pageName: "Tour Packages & Safaris",
    pageRoute: "/tour-details",
    heroTitle: "Handcrafted Luxury Cruise Itineraries",
    heroSubtitle: "From 1-Day Day Safaris to 3D/2N Royal Houseboat Charters — All-Inclusive Luxury with Gourmet Dining & Forest Permits.",
    heroBadge: "All-Inclusive Safaris",
    metaDescription: "Explore all Sundarban tour packages, pricing itineraries, inclusions, and boat safari schedules.",
    sections: [
      {
        id: "sec-t1",
        title: "Cancellation & Rescheduling Policy (No Risk Booking)",
        subtitle: "Flexible Date Guarantee",
        content: "In the event of severe weather advisories issued by IMD / Forest Department, 100% free date rescheduling is guaranteed. Cancellations made 7+ days before departure receive immediate refund processing.",
        styleType: "alert-red",
        badgeText: "Booking Assurance",
        order: 1,
        isActive: true,
      },
    ],
  },
  {
    pageKey: "contact",
    pageName: "Contact & Assistance",
    pageRoute: "/contact",
    heroTitle: "Connect With Our Sundarban Expedition Planners",
    heroSubtitle: "24/7 Hotline Support, WhatsApp Instant Desk, and Kolkata Office Coordination.",
    heroBadge: "24/7 Fast Response",
    metaDescription: "Contact Sundarban Luxury Tours for instant quotes, customized itineraries, and phone assistance.",
    sections: [
      {
        id: "sec-c1",
        title: "Emergency Cruise Helpline & Instant WhatsApp Support",
        subtitle: "24/7 Assistance",
        content: "For immediate booking confirmations or boarding inquiries for tomorrow morning's Godkhali departure, call our 24/7 on-duty cruise master directly at +91 70014 03498.",
        styleType: "alert-red",
        badgeText: "24/7 Hotline",
        ctaText: "Call Hotline",
        ctaUrl: "tel:+917001403498",
        order: 1,
        isActive: true,
      },
    ],
  },
];

export const monthlyRevenueData = [
  { month: "Apr", revenue: 420000, bookings: 38 },
  { month: "May", revenue: 380000, bookings: 32 },
  { month: "Jun", revenue: 290000, bookings: 24 },
  { month: "Jul", revenue: 310000, bookings: 26 },
  { month: "Aug", revenue: 460000, bookings: 42 },
  { month: "Sep", revenue: 680000, bookings: 64 },
  { month: "Oct", revenue: 950000, bookings: 88 },
  { month: "Nov", revenue: 1250000, bookings: 114 },
  { month: "Dec", revenue: 1680000, bookings: 148 },
  { month: "Jan", revenue: 1520000, bookings: 136 },
  { month: "Feb", revenue: 1100000, bookings: 98 },
  { month: "Mar", revenue: 750000, bookings: 70 },
];

export const initialAdminFaqs: AdminFaqItem[] = [
  {
    id: "faq-1",
    questionNumber: "Q1",
    question: "How do I start the process of booking a luxury Sundarban tour package?",
    answer:
      "You can easily book online by clicking 'Request A Quote' or selecting your preferred package on our website. Our travel coordinator will immediately contact you with customized itineraries, vessel options, and pickup logistics from Kolkata or Godkhali.",
    category: "Booking & Reservations",
    order: 1,
    status: "Active",
  },
  {
    id: "faq-2",
    questionNumber: "Q2",
    question: "What is the best time of year to visit the Sundarbans for tiger sightings?",
    answer:
      "The ideal season to explore the Sundarbans is between September and March when the weather is pleasantly cool and wildlife (including Royal Bengal Tigers, saltwater crocodiles, and spotted deer) frequently bask along the sunlit riverbanks.",
    category: "Wildlife & Safari",
    order: 2,
    status: "Active",
  },
  {
    id: "faq-3",
    questionNumber: "Q3",
    question: "Are luxury accommodation, meals, and forest permits included in the package?",
    answer:
      "Yes, all our luxury tour packages are completely all-inclusive. This includes AC deluxe cabins / premium eco-resort stays, all freshly prepared organic gourmet meals, mineral water, luxury cruise safaris, forest entry permits, and government-certified naturalist guides.",
    category: "Package Inclusions",
    order: 3,
    status: "Active",
  },
  {
    id: "faq-4",
    questionNumber: "Q4",
    question: "Is the Sundarban tour safe for families, senior citizens, and children?",
    answer:
      "Absolutely! Our luxury cruises and eco-resorts adhere to the highest international maritime safety standards, complete with life jackets, first-aid kits, licensed captains, and secure watchtower observation decks tailored for all age groups.",
    category: "Safety & Guidelines",
    order: 4,
    status: "Active",
  },
  {
    id: "faq-5",
    questionNumber: "Q5",
    question: "What should I pack for the mangrove river safari?",
    answer:
      "We recommend comfortable light cotton clothing, neutral jungle colors (greens, khakis, browns), walking shoes, sunglasses, a wide-brim hat, sunscreen, binoculars, cameras with zoom lenses, and personal medications.",
    category: "Preparation & Packing",
    order: 5,
    status: "Active",
  },
  {
    id: "faq-6",
    questionNumber: "Q6",
    question: "What is the cancellation and rescheduling policy?",
    answer:
      "We offer flexible cancellation policies. Cancellations made 7 days prior to departure receive a 100% full refund or free rescheduling to any available future date of your choice.",
    category: "Booking & Reservations",
    order: 6,
    status: "Active",
  },
];

export const initialAdminTestimonials: AdminTestimonialItem[] = [
  {
    id: "test-1",
    name: "Andrew Simon",
    role: "Wildlife Photographer, UK",
    avatar: "/assets/images/avatars/andrew.jpg",
    rating: 5,
    text: "A trip that perfectly blends adventure with luxury until I discovered the Sundarban Luxury tour package. The moment I stepped onto the safari cruise, I knew it was the best vacation choice I had ever made.",
    tourPackage: "2 Nights 3 Days Tiger Trail",
    date: "2026-08-15",
    featured: true,
    status: "Active",
  },
  {
    id: "test-2",
    name: "Maria Doe",
    role: "Travel Blogger, Mumbai",
    avatar: "/assets/images/avatars/maria.jpg",
    rating: 5,
    text: "The tour boasts sleek, contemporary luxury vessels with clean lines and expansive windows, allowing natural light to flood the interiors. It incorporates premier safety and sustainable eco principles.",
    tourPackage: "Hotel Sonar Bangla Resort Stay",
    date: "2026-08-28",
    featured: true,
    status: "Active",
  },
  {
    id: "test-3",
    name: "Angelina Rose",
    role: "Eco-Tourist, Australia",
    avatar: "/assets/images/avatars/angelina.jpg",
    rating: 5,
    text: "Solar powered luxury cruises adorn the fleet, harnessing renewable energy to navigate the serene mangrove waters. Exceptional hospitality, pristine eco-cabins, and breathtaking Royal Bengal Tiger sightings.",
    tourPackage: "1 Night 2 Days Luxury Cruise",
    date: "2026-09-02",
    featured: true,
    status: "Active",
  },
  {
    id: "test-4",
    name: "David Miller",
    role: "Family Vacationer, Delhi",
    avatar: "/assets/images/avatars/david.jpg",
    rating: 5,
    text: "From the Dobanki canopy watchtower walk to the night starry river cruise, every detail was pure magic. The personalized attention to detail and five-star standards exceeded all our family expectations.",
    tourPackage: "2 Nights 3 Days Tiger Trail",
    date: "2026-09-05",
    featured: true,
    status: "Active",
  },
  {
    id: "test-5",
    name: "Sophia Turner",
    role: "Nature Enthusiast, Bangalore",
    avatar: "/assets/images/avatars/maria.jpg",
    rating: 5,
    text: "An unforgettable eco-safari experience! The guides were extremely knowledgeable about the Sundarban wildlife, and the delicious organic meals served on deck made every moment exceptional.",
    tourPackage: "Private Houseboat Charter",
    date: "2026-09-10",
    featured: true,
    status: "Active",
  },
];

export const initialAdminGallery: AdminGalleryItem[] = [
  {
    id: "gal-1",
    src: "/assets/images/resort-deck.jpg",
    alt: "Luxury eco-resort wooden deck overlooking Sundarban river channel",
    title: "Luxury Eco-Resort Deck",
    location: "Sundarban Eco Resort",
    column: "col1",
    category: "Resort Stay",
    order: 1,
    status: "Active",
  },
  {
    id: "gal-2",
    src: "/assets/images/boat-safari.jpg",
    alt: "Traditional wooden safari boat sailing on tranquil Sundarban creek",
    title: "Mangrove Creek Safari",
    location: "Sajnekhali Channel",
    column: "col2",
    category: "Boat Safari",
    order: 2,
    status: "Active",
  },
  {
    id: "gal-3",
    src: "/assets/images/spotted-deer.jpg",
    alt: "Spotted chital deer herd standing among mangrove roots",
    title: "Spotted Deer in Mangroves",
    location: "Sundarban National Park",
    column: "col2",
    category: "Wildlife",
    order: 3,
    status: "Active",
  },
  {
    id: "gal-4",
    src: "/assets/images/royal-bengal-tiger.jpg",
    alt: "Majestic Royal Bengal Tiger standing along the mangrove riverbank",
    title: "Royal Bengal Tiger",
    location: "Sundarban Tiger Reserve",
    column: "col3",
    category: "Wildlife",
    order: 4,
    status: "Active",
  },
  {
    id: "gal-5",
    src: "/assets/images/watchtower-view.jpg",
    alt: "Tourists on high observation watchtower viewing Sundarban forest canopy",
    title: "Watchtower Canopy Vista",
    location: "Dobanki Watch Tower",
    column: "col4",
    category: "Watchtower",
    order: 5,
    status: "Active",
  },
  {
    id: "gal-6",
    src: "/assets/images/estuary-sunset.jpg",
    alt: "Golden sunset over the Sundarban river estuary with wooden boat",
    title: "Golden Estuary Sunset",
    location: "Matla River Delta",
    column: "col4",
    category: "Landscape",
    order: 6,
    status: "Active",
  },
  {
    id: "gal-7",
    src: "/assets/images/luxury-cruise.jpg",
    alt: "Luxury tourism cruise vessel sailing through Sundarban waters",
    title: "Sundarban Odyssey Cruise",
    location: "Sundarban Waterways",
    column: "col5",
    category: "Boat Safari",
    order: 7,
    status: "Active",
  },
  {
    id: "gal-8",
    src: "/assets/images/sonarbanglahotel.jpg",
    alt: "Hotel Sonar Bangla Sundarban luxury resort front view",
    title: "Hotel Sonar Bangla 5-Star Resort",
    location: "Gosaba, Sundarban",
    column: "col1",
    category: "Resort Stay",
    order: 8,
    status: "Active",
  },
  {
    id: "gal-9",
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80",
    alt: "River crocodile basking in morning sun on Sundarban muddy banks",
    title: "Estuarine Saltwater Crocodile",
    location: "Bhagabatpur Sanctuary",
    column: "col2",
    category: "Wildlife",
    order: 9,
    status: "Active",
  },
  {
    id: "gal-10",
    src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80",
    alt: "Authentic cooked Bengali Gold Prawn Malai Curry and Fish Feast",
    title: "Authentic Bengali Safari Feast",
    location: "Onboard Dining Deck",
    column: "col3",
    category: "Bengali Cuisine",
    order: 10,
    status: "Active",
  },
  {
    id: "gal-11",
    src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1000&q=80",
    alt: "Dobanki 496m elevated canopy walkway through mangrove canopy",
    title: "Dobanki Aerial Canopy Walk",
    location: "Dobanki Core Area",
    column: "col4",
    category: "Watchtower",
    order: 11,
    status: "Active",
  },
  {
    id: "gal-12",
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    alt: "Evening tribal Jhumur dance and Bonobibi cultural show",
    title: "Traditional Folk Dance & Bonfire",
    location: "Resort Cultural Courtyard",
    column: "col5",
    category: "Culture & Folk",
    order: 12,
    status: "Active",
  },
];
