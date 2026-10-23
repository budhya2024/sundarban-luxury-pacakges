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
  bookingStatus: "Confirmed" | "Pending" | "Checked In" | "Completed" | "Cancelled";
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
  callCardTitle?: string;
  callCardSubtitle?: string;
  callCardStatus?: "Active" | "Inactive";
  emailCardTitle?: string;
  emailCardSubtitle?: string;
  emailCardStatus?: "Active" | "Inactive";
  visitCardTitle?: string;
  visitCardSubtitle?: string;
  visitCardStatus?: "Active" | "Inactive";
  hoursCardTitle?: string;
  hoursCardSubtitle?: string;
  hoursCardStatus?: "Active" | "Inactive";
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
  pageKey: "home" | "about" | "hotel" | "tours" | "contact" | "gallery";
  pageName: string;
  pageRoute: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  heroBackgroundImage?: string;
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
  source?: "manual" | "google";
}

export interface AdminTestimonialSettings {
  id: string;
  displayMode: "manual" | "google";
  googlePlaceId: string;
  googlePlaceUrl: string;
  featurableId?: string;
  googleApiKey?: string;
  googleRating: number;
  googleReviewsCount: number;
  googleBadgeText: string;
}

export const initialAdminTestimonialSettings: AdminTestimonialSettings = {
  id: "default",
  displayMode: "google",
  googlePlaceId: "ChIJtRQ1dQCLAToR6rAo34zLXEo",
  googlePlaceUrl: "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
  featurableId: "3244b520-3369-414c-a09e-339ea6dbd9e9",
  googleApiKey: "",
  googleRating: 4.9,
  googleReviewsCount: 32,
  googleBadgeText: "Verified Google Business Rating",
};

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

export interface AdminHotelPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
  order?: number;
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
    "id": "pkg-1",
    "name": "1 Night 2 Days Luxury Cruise Package",
    "slug": "1-night-2-days-luxury-cruise",
    "subtitle": "Discover the true wilderness of the mangrove delta with our premier 1N/2D AC river cruise & cultural stay.",
    "duration": "2 Days / 1 Night",
    "price": 3999,
    "originalPrice": 4999,
    "category": "Luxury Cruise",
    "rating": 4.9,
    "reviewsCount": 128,
    "image": "https://br-snowy-mountain-b54pwsv4.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1790184085513-bedroom-with-four-poster-bed-2.webp",
    "bannerImage": "https://br-summer-base-b5g5ej9g.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1791801459683-img_20260924_175810.jpg",
    "gallery": [
      "https://br-summer-base-b5g5ej9g.storage.c-7.us-east-2.aws.neon.tech/uploads/packages/1792737162536-72.webp"
    ],
    "status": "Active",
    "maxGuests": 45,
    "departure": "Godkhali Ferry Ghat (8:30 AM)",
    "pickupDrop": "Kolkata (Science City / Airport / Howrah Station) & Canning",
    "mealsSummary": "6 Times Fresh Cooked Bengali Buffet Meals",
    "minGroupSize": "Min 2 People",
    "overview": "Sundarban tour 1 night 2 days is the most familiar sundarban tour package now. Tourists are enjoying a lot in this package. But it is very top to cover all sightseeing. Some logical reason for Sundarban tour.",
    "highlightQuote": "“Sundarban 1 Night 2 Days Tour is the most popular tour package from Kolkata. Discover mangroves, watchtowers, and pristine tranquility with our luxury eco package.”",
    "inclusions": [
      "Pick up & Drop from Kolkata in AC Vehicle",
      "Accommodation in Luxury Resort / Boat Cabins",
      "All Forest Department Entry Permits & Watchtower Fees",
      "Cultural Folk Dance Show & Evening Bonfire",
      "Luxury Boat Cruise through Mangrove Creeks",
      "Meal plan – Bed Tea or Coffee ,Breakfast ,DinnerEvening Snacks ,Lunch ,",
      "Bengali Hindi English Speaking Tour Guide"
    ],
    "exclusions": [
      "Any Personal Expenses or Tips",
      "Video Camera Permit Charges",
      "Anything Not Mentioned in Inclusions List",
      "Medical or Travel Insurance",
      "GST 5% Extra Applicable",
      "Personal Beverages & Bottled Water",
      "Any optional tour",
      "Any optional food menu",
      "Individual still / video camera permission charge",
      "Soft drinks and Alcoholic Drinks"
    ],
    "thingsToCarry": [
      "Original Photo ID Proof (Aadhaar / Voter ID / Passport)",
      "Comfortable Cotton Clothes & Walking Shoes",
      "Sunscreen Lotion, Sunglasses & Sun Hat",
      "Personal Medicines & Basic First Aid Kit",
      "Camera with Extra Memory Card & Power Bank",
      "Insect Repellent Cream",
      "Cash for Personal Shopping & Local Handicrafts"
    ],
    "childPolicy": [],
    "importantNotes": [],
    "itinerary": [
      {
        "dayTitle": "Day 1 - Starting in Sundarban",
        "dayNumber": 1,
        "activities": [
          {
            "desc": "Pick up from Kolkata (Science City / Airport / Howrah Station) in AC luxury vehicle and drive towards Godkhali Ferry Ghat. The beautiful landscape covered with yellowish paddy fields, mud house, ponds Three hours and a half drive to Godkhali Tea Break on the way",
            "time": "8:00 AM",
            "title": "Pick up from Kolkata"
          },
          {
            "desc": "Reach Godkhali (the gateway to Sundarban) and cross the historic Gosaba Island by boat.",
            "time": "11:30 AM",
            "title": "Arrive at Godkhali & Board Cruise"
          },
          {
            "desc": "Reaching Cottage / Hotel, which is located just opposite to the Sundarban Tiger Reserve Place surrounded by the village, forests, breeze of the river The place where you can enjoy a peaceful and pleasure weekend",
            "time": "1:00 PM",
            "title": "Reaching Cottage/ Boat Lunch"
          },
          {
            "desc": "Village walking tour, knowing their simple culture. A short introduction via boat to the Sundarban Bird Jungle Experience the lovely sunset view in the jungle",
            "time": "3:00 PM",
            "title": "Visit Sundarban Bird Jungle"
          },
          {
            "desc": "Return to Hotel Sonar Bangla. Fresh evening pakora and tea served.",
            "time": "5:30 PM",
            "title": "Back hotel"
          },
          {
            "desc": "Enjoy traditional Jhumur & Tribal Folk Dance cultural performance by local artists.",
            "time": "6:00 - 7:00 PM",
            "title": "Folk Dance Show"
          },
          {
            "desc": "Sumptuous dinner served at resort/cruise dining deck.",
            "time": "9:30 PM",
            "title": "Dinner"
          }
        ]
      },
      {
        "dayTitle": "Day 2 - Deep Forest & Return",
        "dayNumber": 2,
        "activities": [
          {
            "desc": "Boat cruise which will enter inside one of the biggest mangrove forest through the narrow creek followed around the islands of the Sundarban Tiger Reserve You may get to see crocodiles, wild boars, spotted deers, water monitor lizards, kingfisher or different types of birds If you lucky, you can get a glimpse of ‘Royal Bengal Tiger’ of India. Living in the natural habitat. We will also take you to the watch towers where from you can get a distant / bird's eye view of wild animals in the mangroves.",
            "time": "8:30 AM",
            "title": "Followed around the islands of the Sundarban Tiger Reserve"
          },
          {
            "desc": "Sajnekhali Sudhanyakhali Dobanki Breakfast, Lunch and Tea will be served on the boat",
            "time": "4:00 PM",
            "title": "During this period you will visit 3 watch tower"
          },
          {
            "desc": "Sundarban jungle trip end, head back for Kolkata",
            "time": "5:00 PM",
            "title": "Trip end"
          },
          {
            "desc": "Board AC return vehicle for Kolkata transfer.",
            "time": "6:00 PM",
            "title": "Return to Godkhali Ghat"
          },
          {
            "desc": "Reach Kolkata with unforgettable memories of Sundarban wildlife safari.",
            "time": "9:30 PM",
            "title": "Back to Kolkata"
          }
        ]
      }
    ],
    "foodMenu": [
      {
        "courses": [
          {
            "menuItems": "Sandwich, Sweet, Bisleri, Tea.",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna.",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Chicken/Veg Pakora, Tea/Coffee.",
            "courseName": "Evening Snacks"
          },
          {
            "menuItems": "Fried Rice, Roti, Sabji, Chilli Chicken/Chicken Kosha, Salad.",
            "courseName": "Dinner"
          }
        ],
        "dayTitle": "Day 1 Delicious Cuisine Menu",
        "dayNumber": 1
      },
      {
        "courses": [
          {
            "menuItems": "Bed Tea, Biscuits, Puri, Chana Masala, Sweet, Tea / Coffee, Amudi Fish Fry.",
            "courseName": "Morning Bed Tea"
          },
          {
            "menuItems": "Rice, Dal, Fries, Sabji, Prawn Malai Curry + Fish, Chatni, Papad, Salad, Paneer/Dhoka Dalna.",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Egg/Veg Noodles, Pakora/Veg Pakora, Salad, Tea/Coffee.",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Rice, Roti, Dal, Mix Veg, Mutton Kosha, Salad, Paneer Item.",
            "courseName": "Return Refreshment"
          }
        ],
        "dayTitle": "Day 2 Delicious Cuisine Menu",
        "dayNumber": 2
      }
    ],
    "helplinePhone": "+91 70014 03498",
    "featured": true
  },
  {
    "id": "pkg-2",
    "name": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "slug": "2-nights-3-days-tiger-trail",
    "subtitle": "The ultimate 3-day deep delta safari covering Burirdabri, Netidhopani, Dobanki canopy walk & Sajnekhali.",
    "duration": "3 Days / 2 Nights",
    "price": 5499,
    "originalPrice": 6499,
    "category": "Luxury Cruise",
    "rating": 4.9,
    "reviewsCount": 245,
    "image": "https://br-snowy-mountain-b54pwsv4.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1790186638603-hotel-building-twilight-lit-pathways-1.webp",
    "bannerImage": "https://br-snowy-mountain-b54pwsv4.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1790186659527-hotel-building-twilight-lit-pathways-1.webp",
    "gallery": [],
    "status": "Active",
    "maxGuests": 40,
    "departure": "Godkhali Ghat / Canning",
    "pickupDrop": "Kolkata (AC Coach Pickup & Drop Included)",
    "mealsSummary": "9 Fresh Buffet Meals (3 Breakfast, 3 Lunch, 2 Dinner, 2 High Tea)",
    "minGroupSize": "Min 2 People",
    "overview": "Sundarban tour 2 nights 3 days - Sundarban tour 2 nights 3 days is the standard sundarban tour package which can cover all the sightseeing with comfortably. Some logical reason for Sundarban tour.",
    "highlightQuote": "“Experience the deep heart of Sundarban Tiger Reserve with 3 days of uninterrupted estuary cruising and 5 iconic watchtowers.”",
    "inclusions": [
      "AC Premium Cruiser & Experienced Crew",
      "All 9 Buffet Meals with Hilsa & Mutton specials",
      "Sajnekhali, Dobanki & Sudhanyakhali Forest Entry Permits",
      "Village Folk Dance & Campfire Evening",
      "Pick & Drop in AC Coach from Kolkata",
      "Exclusive High-Deck Viewing & Binoculars on Loan",
      "Bengali Hindi English Speaking Tourist Guide"
    ],
    "exclusions": [
      "Personal shopping and souvenirs",
      "Camera fees applicable at watchtowers",
      "Optional room service orders",
      "Any optional food menu",
      "Alcoholic Drinks, Soft drinks"
    ],
    "thingsToCarry": [
      "Government Photo ID Card",
      "Binoculars & Telephoto Lens",
      "Comfortable Walking Attire & Cap",
      "Light Jacket or Shawl for Early Mornings"
    ],
    "childPolicy": [],
    "importantNotes": [],
    "itinerary": [
      {
        "dayTitle": "Day 1 - Kolkata Departure & Sajnekhali Watchtower",
        "dayNumber": 1,
        "activities": [
          {
            "desc": "Board comfortable AC coach from central Kolkata locations.The beautiful landscape covered with yellowish paddy fields, mud house, ponds, fishing ponds Three hours and a half drive to Godkhali Tea Break on the way",
            "time": "7:30 - 8:00 AM",
            "title": "Kolkata Pickup"
          },
          {
            "desc": "Cross the Gosaba island by boat",
            "time": "11:00 AM",
            "title": "Gosaba islan visit"
          },
          {
            "desc": "Reaching Cottage/hotel, which is located just opposite to the Sundarban Tiger Reserve Cottage surrounded by the village, forests, breeze of the river The place where you can enjoy a peaceful and pleasure weekend",
            "time": "1:00 PM",
            "title": "Reaching Cottage/hotel/ Boat Lunch"
          },
          {
            "desc": "A short introduction via boat to the Sundarban Bird Jungle with the lovely sunset view",
            "time": "3:30 PM",
            "title": "sunset view"
          },
          {
            "desc": "Back to Hotel Sonar Bangla",
            "time": "5:00 PM",
            "title": "Back to resort / cottage."
          },
          {
            "desc": "Local folk dance followed by complimentary snacks",
            "time": "6:30 PM",
            "title": "Enjoy local folk dance"
          },
          {
            "desc": "Dinner",
            "time": "9:00 PM",
            "title": "Dinner time"
          }
        ]
      },
      {
        "dayTitle": "Day 2 - Core Reserve Safari & Canopy Walk",
        "dayNumber": 2,
        "activities": [
          {
            "desc": "Sajnekhali Watchtower: Visit the Interpretation Center and Crocodile Park",
            "time": "8:00 AM",
            "title": "Watchtower Sightseeing"
          },
          {
            "desc": "Sudhanyakhali Watchtower: High chances of spotting Tigers, Deer and monkeys near the sweet-water pond. Dobanki Watchtower ; Experience the famous Canopy Walk, half- kilometer elevated pathway covered with netting for safe viewing, (Note: Breakfast,Lunch,and Afternoon Tea will be freshly coked and served directly on the boat during the cruise",
            "time": "1:00 AM",
            "title": "Watchtower Sightseeing"
          },
          {
            "desc": "Reaching Cottage/ Sonar Bangla hotel",
            "time": "5:00 PM",
            "title": "Reaching Cottage/hotel"
          },
          {
            "desc": "Bonfire party (only winter season)",
            "time": "6:00 PM",
            "title": "party"
          },
          {
            "desc": "Dinner",
            "time": "9:30 PM",
            "title": "Dinner Time"
          }
        ]
      },
      {
        "dayTitle": "Day 3 - Sudhanyakhali Safari & Return Transfer",
        "dayNumber": 3,
        "activities": [
          {
            "desc": "After breakfast we go to the local village walk for a couple of hours Experiencing local culture.",
            "time": "8:00 AM",
            "title": "Breakfast Time"
          },
          {
            "desc": "Back to the cottages A ride to go to Hamilton Bungalow & Rabindranath Tagore Bungalow",
            "time": "10:00 AM",
            "title": "Back to the cottages"
          },
          {
            "desc": "Boat Lunch / On the way lunch",
            "time": "1:30 PM",
            "title": "Lunch Time"
          },
          {
            "desc": "Drive back to Kolkata",
            "time": "2:00 PM",
            "title": "Back to Kolkata"
          },
          {
            "desc": "Reach Kolkata",
            "time": "5:00 PM - 6:00 PM",
            "title": "Reach Kolkata"
          }
        ]
      }
    ],
    "foodMenu": [
      {
        "courses": [
          {
            "menuItems": "Sandwich, Sweet, Bisleri, Tea. ( only kolkata to koltaka ava.)",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna.",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Chicken/Veg Pakora, Tea/Coffee.",
            "courseName": "Evening Snacks"
          },
          {
            "menuItems": "Fried Rice, Roti, Sabji, Chilli Chicken/Chicken Kosha, Salad.",
            "courseName": "Dinner"
          }
        ],
        "dayTitle": "Day 1 Feast",
        "dayNumber": 1
      },
      {
        "courses": [
          {
            "menuItems": "Bed tea, Biscuities.",
            "courseName": "Morning Tea"
          },
          {
            "menuItems": "Puri, Chana Masala, Sweet, Tea / Coffee, Amudi Fish Fry.",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Rice, Dal, Fries, Sabji, Prawn Malai Curry + Fish, Chatni, Papad, Salad, Paneer/Dhoka Dalna.",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Egg/Veg Noodles, Pakora/Veg Pakora, Salad, Tea/Coffee.",
            "courseName": "Evening Snacks"
          },
          {
            "menuItems": "Rice, Roti, Dal, Mix Veg, Mutton Kosha, Salad, Paneer Item.",
            "courseName": "Dinner"
          }
        ],
        "dayTitle": "Day 2 Royal Menu",
        "dayNumber": 2
      },
      {
        "courses": [
          {
            "menuItems": "Bed tea, Biscuities, Luchi, Sabji, Sweet, Tea/coffee.",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Chicken Biryani, Salad, 500ml Water Bottle OR Rice, Dal, Sabji, Chicken Kosha/Fish, Salad | Veg Items: Veg Manchurian, Veg Fried Rice.",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Packaged Sweet & Savory Box with Frooti for return journey",
            "courseName": "Snack Box"
          }
        ],
        "dayTitle": "Day 3 Farewell Menu",
        "dayNumber": 3
      }
    ],
    "helplinePhone": "+91 70014 03498",
    "featured": true
  },
  {
    "id": "pkg-4",
    "name": "1 Day Sundarban Safari",
    "slug": "1-day-sundarban-safari",
    "subtitle": "Quick 1-day power-packed boat safari for busy travelers and day excursionists.",
    "duration": "1 Day Excursion",
    "price": 2499,
    "originalPrice": 2999,
    "category": "Standard Eco",
    "rating": 4.7,
    "reviewsCount": 67,
    "image": "https://br-snowy-mountain-b54pwsv4.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1790182551847-exterior-architecture-1.webp",
    "bannerImage": "https://br-snowy-mountain-b54pwsv4.storage.c-7.us-east-2.aws.neon.tech/uploads/uploads/1790182566686-bedroom-layout-view-1.webp",
    "gallery": [],
    "status": "Active",
    "maxGuests": 60,
    "departure": "Godkhali Ferry Ghat (7:30 AM)",
    "pickupDrop": "Pickup & Drop from Science City Kolkata (6:00 AM)",
    "mealsSummary": "Breakfast & Fresh Cooked Lunch on Boat Deck",
    "minGroupSize": "Min 1 Person",
    "overview": "Sundarban day trip is the most familiar sundarban tour package now. Tourists are enjoying a lot in this package. But it is very top to cover all sightseeing. Some logical reason for Sundarban tour.",
    "highlightQuote": "“Explore the delta in a single action-packed day with breakfast, hot lunch, and watchtower safaris included.”",
    "inclusions": [
      "Same day AC Coach transfer from Kolkata",
      "Full Day Boat Safari through Sajnekhali & Sudhanyakhali",
      "Breakfast on boat with hot Tea/Coffee",
      "Fresh Cooked Bengali Lunch on Boat Deck",
      "Watchtower Entry Permits & Guide Fees",
      "Breakfast",
      "Lunch",
      "Evening Snacks",
      "Permission of jungle authority, all entry fees, launch permission"
    ],
    "exclusions": [
      "Dinner and personal shopping",
      "Any optional tour",
      "Any optional food menu",
      "Individual still / video camera permission charge",
      "Alcoholic Drinks",
      "Soft drinks",
      "Personal expenditure"
    ],
    "thingsToCarry": [
      "Photo ID",
      "Sun Hat & Sunglasses",
      "Powerbank"
    ],
    "childPolicy": [],
    "importantNotes": [],
    "itinerary": [
      {
        "dayTitle": "Full Day Safari Schedule",
        "dayNumber": 1,
        "activities": [
          {
            "desc": "Start from Kolkata at Indian Museum (main gate)/Science City The beautiful landscape covered with yellowish paddy fields, mud house, ponds Three hours and a half drive to Godkhali Tea Break on the way",
            "time": "5:00 AM",
            "title": "Start from Kolkata"
          },
          {
            "desc": "Then on the Boat Sundarban begin and head toward the biggest mangrove forest (narrow creek) and delta region On the way you may see different animals such as crocodiles, water monitor, spotted deer, different kind of birds etc. If you are lucky enough you may also face a Royal Bengal Tiger in his natural habitat. During this period you will visit 3 watch towers (Sajnekhali, Sudhanyakhali & Dobanki) (Breakfast and lunch will be cooked and served on the boat)",
            "time": "9:00 AM",
            "title": "Sundarban Safari"
          },
          {
            "desc": "Lunch",
            "time": "1:30 PM",
            "title": "Lunch Time"
          },
          {
            "desc": "A short introduction via boat to the Sundarban Bird Jungle with the lovely sunset view",
            "time": "4:00 PM",
            "title": "sunset view"
          },
          {
            "desc": "Creek cruise in search of tigers & deer.",
            "time": "5:30 PM",
            "title": "Sudhanyakhali Safari"
          },
          {
            "desc": "Return journey to Kolkata.",
            "time": "8:30 PM",
            "title": "Godkhali to Kolkata"
          }
        ]
      }
    ],
    "foodMenu": [
      {
        "courses": [
          {
            "menuItems": "Sandwich, Sweet, Bisleri, Tea.",
            "courseName": "Breakfast"
          },
          {
            "menuItems": "Rice, Dal, Fries, Sabji, Vetki Fish + Other Fish, Chatni, Papad, Salad, Sweet, Paneer/Dhoka Dalna",
            "courseName": "Lunch"
          },
          {
            "menuItems": "Chicken/Veg Pakora, Tea/Coffee.",
            "courseName": "Evening Tea"
          },
          {
            "menuItems": "Fried Rice, Roti, Sabji, Chilli Chicken/Chicken Kosha, Salad.",
            "courseName": "Dinner"
          }
        ],
        "dayTitle": "Day Safari Meals",
        "dayNumber": 1
      }
    ],
    "helplinePhone": "+91 70014 03498",
    "featured": false
  }
];

export const initialAdminBookings: AdminBooking[] = [
  {
    "id": "bk-101",
    "bookingCode": "SB-2026-901",
    "guestName": "Subhashis Mukherjee",
    "email": "subhashis.m@gmail.com",
    "phone": "+91 98301 23456",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-09-18",
    "guestsCount": 4,
    "totalAmount": 19996,
    "paidAmount": 19996,
    "paymentStatus": "Paid",
    "bookingStatus": "Confirmed",
    "createdAt": "2026-09-12T09:02:00.000Z",
    "specialRequests": "Need vegetarian meals for 2 elderly guests."
  },
  {
    "id": "bk-102",
    "bookingCode": "SB-2026-902",
    "guestName": "Priyanka Roy",
    "email": "priyanka.roy@yahoo.com",
    "phone": "+91 94331 88990",
    "packageOrRoom": "Hotel Sonar Bangla 5-Star Resort Stay & Cruise",
    "type": "Hotel Resort",
    "travelDate": "2026-09-22",
    "guestsCount": 2,
    "totalAmount": 16998,
    "paidAmount": 5000,
    "paymentStatus": "Partial",
    "bookingStatus": "Confirmed",
    "createdAt": "2026-09-12T05:45:00.000Z",
    "specialRequests": "Anniversary room decoration requested."
  },
  {
    "id": "bk-103",
    "bookingCode": "SB-2026-903",
    "guestName": "Amitabh Sen",
    "email": "amitabh.sen@tcs.com",
    "phone": "+91 98310 55443",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-25",
    "guestsCount": 6,
    "totalAmount": 17994,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-12T04:10:00.000Z",
    "specialRequests": "AC pickup from Science City Kolkata."
  },
  {
    "id": "bk-104",
    "bookingCode": "SB-2026-904",
    "guestName": "Dr. Debolina Das",
    "email": "debolina.das@apollo.org",
    "phone": "+91 97482 11223",
    "packageOrRoom": "Private Luxury Houseboat Royal Charter",
    "type": "Tour Package",
    "travelDate": "2026-10-02",
    "guestsCount": 8,
    "totalAmount": 24999,
    "paidAmount": 24999,
    "paymentStatus": "Paid",
    "bookingStatus": "Confirmed",
    "createdAt": "2026-09-11T11:20:00.000Z"
  },
  {
    "id": "bk-105",
    "bookingCode": "SB-2026-905",
    "guestName": "Vikramaditya Bose",
    "email": "vikram.bose@gmail.com",
    "phone": "+91 98305 66778",
    "packageOrRoom": "1 Day Sundarban Day Safari",
    "type": "Tour Package",
    "travelDate": "2026-09-15",
    "guestsCount": 3,
    "totalAmount": 5697,
    "paidAmount": 5697,
    "paymentStatus": "Paid",
    "bookingStatus": "Completed",
    "createdAt": "2026-09-10T12:50:00.000Z"
  },
  {
    "id": "bk-1790665893469-815",
    "bookingCode": "SB-2026-6209",
    "guestName": "Budhya Das",
    "email": "Budhyadas41@gmail.com",
    "phone": "09883564745",
    "packageOrRoom": "1 Day Sundarban Safari",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 3,
    "totalAmount": 7497,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-29T07:11:34.859Z",
    "specialRequests": "Direct homepage hero reservation for 1 Day Sundarban Safari."
  },
  {
    "id": "bk-1789922606089-880",
    "bookingCode": "SB-2026-8093",
    "guestName": "Test",
    "email": "test@test.com",
    "phone": "9876543210",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-29",
    "guestsCount": 2,
    "totalAmount": 5998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Confirmed",
    "createdAt": "2026-09-20T16:43:26.996Z",
    "specialRequests": "Direct reservation request for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "b-h-inq-1789922518199",
    "bookingCode": "HSB-2026-6711",
    "guestName": "Test",
    "email": "test@test.com",
    "phone": "9876543210",
    "packageOrRoom": "1 Night 2 Days Deluxe Package - Test Premium",
    "type": "Hotel Resort",
    "travelDate": "2026-09-20",
    "guestsCount": 2,
    "totalAmount": 19798,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Confirmed",
    "createdAt": "2026-09-20T16:41:59.460Z",
    "specialRequests": "Tour Package: 1 Night 2 Days Deluxe Package (1 Night / 2 Days). Transfer: AC Vehicle from Kolkata."
  },
  {
    "id": "bk-test-1790441552387",
    "bookingCode": "SB-2026-3902",
    "guestName": "Verification Guest",
    "email": "verify@example.com",
    "phone": "+91 98765 43210",
    "packageOrRoom": "Sundarban 2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-10-15",
    "guestsCount": 2,
    "totalAmount": 9998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-26T16:52:32.579Z",
    "specialRequests": "Verification test from Hero Booking Bar"
  },
  {
    "id": "bk-1790445444242-283",
    "bookingCode": "SB-2026-7574",
    "guestName": "Test",
    "email": "test@test.com",
    "phone": "7654321098",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-29",
    "guestsCount": 2,
    "totalAmount": 7998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-26T17:57:25.380Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "bk-1790605729947-300",
    "bookingCode": "SB-2026-3861",
    "guestName": "Test",
    "email": "Budhyadas41@gmail.com",
    "phone": "9883564745",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-28",
    "guestsCount": 10,
    "totalAmount": 39990,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-28T14:28:51.858Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "bk-1790663178676-922",
    "bookingCode": "SB-2026-1487",
    "guestName": "test",
    "email": "Budhyadas41@gmail.com",
    "phone": "09883564745",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 2,
    "totalAmount": 7998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-29T06:26:20.320Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "bk-1790663922529-795",
    "bookingCode": "SB-2026-6874",
    "guestName": "test",
    "email": "Budhyadas41@gmail.com",
    "phone": "9883564745",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 2,
    "totalAmount": 10998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-29T06:38:44.163Z",
    "specialRequests": "Direct homepage hero reservation for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "bk-1790665316990-326",
    "bookingCode": "SB-2026-2825",
    "guestName": "testting",
    "email": "Budhyadas41@gmail.com",
    "phone": "09883564745",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 2,
    "totalAmount": 7998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-29T07:01:58.624Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "bk-1790665519456-109",
    "bookingCode": "SB-2026-5011",
    "guestName": "Budhya Das",
    "email": "Budhyadas41@gmail.com",
    "phone": "09883564745",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 4,
    "totalAmount": 15996,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-09-29T07:05:20.046Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "bk-1790706909936-857",
    "bookingCode": "SB-2026-4530",
    "guestName": "TECHSHIFT TECHNOLOGY",
    "email": "techshifttechnology@gmail.com",
    "phone": "6252584521",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-09-30",
    "guestsCount": 4,
    "totalAmount": 21996,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Cancelled",
    "createdAt": "2026-09-29T18:35:10.082Z",
    "specialRequests": "Direct homepage hero reservation for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "bk-1790707055801-313",
    "bookingCode": "SB-2026-4236",
    "guestName": "TECHSHIFT TECHNOLOGY",
    "email": "techshifttechnology@gmail.com",
    "phone": "1452852452",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-09-29",
    "guestsCount": 10,
    "totalAmount": 54990,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Cancelled",
    "createdAt": "2026-09-29T18:37:36.453Z",
    "specialRequests": "Direct homepage hero reservation for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "bk-1790972111384-351",
    "bookingCode": "SB-2026-7544",
    "guestName": "Payton Wehner",
    "email": "your.email+fakedata80055@gmail.com",
    "phone": "9988776655",
    "packageOrRoom": "1 Day Sundarban Safari",
    "type": "Tour Package",
    "travelDate": "2027-01-27",
    "guestsCount": 1,
    "totalAmount": 2499,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-02T20:15:11.516Z",
    "specialRequests": "Direct homepage hero reservation for 1 Day Sundarban Safari."
  },
  {
    "id": "bk-1791171803816-655",
    "bookingCode": "SB-2026-7163",
    "guestName": "testing",
    "email": "budhyadas41@gmail.com",
    "phone": "9883564745",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-10-09",
    "guestsCount": 2,
    "totalAmount": 10998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-05T03:43:24.423Z",
    "specialRequests": "Direct homepage hero reservation for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "bk-1791289590473-640",
    "bookingCode": "SB-2026-3993",
    "guestName": "rajesh",
    "email": "test@gmail.com",
    "phone": "8617352330",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-10-21",
    "guestsCount": 5,
    "totalAmount": 27495,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-06T12:26:31.079Z",
    "specialRequests": "Direct homepage hero reservation for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "bk-1791289790925-715",
    "bookingCode": "SB-2026-9274",
    "guestName": "sundarban bengal trip",
    "email": "info.sundarbanbengaltrip@gmail.com",
    "phone": "8617352330",
    "packageOrRoom": "1 Night 2 Days Luxury Cruise Package",
    "type": "Tour Package",
    "travelDate": "2026-10-22",
    "guestsCount": 4,
    "totalAmount": 15996,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-06T12:29:51.532Z",
    "specialRequests": "Direct homepage hero reservation for 1 Night 2 Days Luxury Cruise Package."
  },
  {
    "id": "b-h-inq-1791799000563",
    "bookingCode": "HSB-2026-2527",
    "guestName": "Budhya Das",
    "email": "Budhyadas41@gmail.com",
    "phone": "+919883564745",
    "packageOrRoom": "1 Night 2 Days Deluxe Package - Royal Mangrove Heritage Suite",
    "type": "Hotel Resort",
    "travelDate": "2026-10-14",
    "guestsCount": 2,
    "totalAmount": 34797,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-12T09:56:41.950Z",
    "specialRequests": "Tour Package: 1 Night 2 Days Deluxe Package (1 Night / 2 Days). Transfer: Direct Godkhali Ferry."
  },
  {
    "id": "b-h-inq-1791800763237",
    "bookingCode": "HSB-2026-1260",
    "guestName": "Budhya Das",
    "email": "Budhyadas41@gmail.com",
    "phone": "+919883564745",
    "packageOrRoom": "1 Night 2 Days Deluxe Package - Executive Riverview Deluxe Room",
    "type": "Hotel Resort",
    "travelDate": "2026-10-21",
    "guestsCount": 2,
    "totalAmount": 19798,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-12T10:26:06.612Z",
    "specialRequests": "Tour Package: 1 Night 2 Days Deluxe Package (1 Night / 2 Days). Transfer: AC Vehicle from Kolkata."
  },
  {
    "id": "bk-1792050915775-178",
    "bookingCode": "SB-2026-3112",
    "guestName": "bu",
    "email": "udhyadas41@gmail.com",
    "phone": "x,",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-10-23",
    "guestsCount": 2,
    "totalAmount": 10998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-15T07:55:16.402Z",
    "specialRequests": "Direct reservation request for 2 Nights 3 Days Complete Tiger Trail Expedition."
  },
  {
    "id": "b-h-inq-1790665673098",
    "bookingCode": "HSB-2026-5748",
    "guestName": "Budhya Das",
    "email": "Budhyadas41@gmail.com",
    "phone": "+919883564745",
    "packageOrRoom": "1 Night 2 Days Deluxe Package - Premium Forest View Family Suite",
    "type": "Hotel Resort",
    "travelDate": "2026-09-30",
    "guestsCount": 16,
    "totalAmount": 205784,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Completed",
    "createdAt": "2026-09-29T07:07:56.603Z",
    "specialRequests": "Tour Package: 1 Night 2 Days Deluxe Package (1 Night / 2 Days). Transfer: Direct Godkhali Ferry."
  },
  {
    "id": "b-h-inq-1789837202408",
    "bookingCode": "HSB-2026-3453",
    "guestName": "Test",
    "email": "test@test.com",
    "phone": "9876543210",
    "packageOrRoom": "1 Night 2 Days Deluxe Package - Deluxe Premium AC Room",
    "type": "Hotel Resort",
    "travelDate": "2026-09-29",
    "guestsCount": 2,
    "totalAmount": 19798,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Completed",
    "createdAt": "2026-09-19T17:00:03.646Z",
    "specialRequests": "Tour Package: 1 Night 2 Days Deluxe Package (1 Night / 2 Days). Transfer: AC Vehicle from Kolkata."
  },
  {
    "id": "bk-1792147730364-350",
    "bookingCode": "SB-2026-9149",
    "guestName": "জন duo",
    "email": "sample@outlook.com",
    "phone": "685945",
    "packageOrRoom": "2 Nights 3 Days Complete Tiger Trail Expedition",
    "type": "Tour Package",
    "travelDate": "2026-10-31",
    "guestsCount": 2,
    "totalAmount": 10998,
    "paidAmount": 0,
    "paymentStatus": "Unpaid",
    "bookingStatus": "Pending",
    "createdAt": "2026-10-16T10:48:50.983Z",
    "specialRequests": "Direct reservation request for 2 Nights 3 Days Complete Tiger Trail Expedition."
  }
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
    image: "/assets/images/sonarbanglahotel.jpg",
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
    image: "/assets/images/sonarbanglahotel.jpg",
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
    image: "/assets/images/sonarbanglahotel.jpg",
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
    image: "/assets/images/sonarbanglahotel.jpg",
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
    image: "/assets/images/Punjabi-Mutton-Curry-5.jpg",
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
    image: "/assets/images/Ilish-Sorshe.jpg",
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
    image: "/assets/images/Bhetki-Curry.jpeg",
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
    image: "/assets/images/Prawn-Malai-Curry.jpg",
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
    details: ["Sundarban Luxury Package, Dulki, Gosaba", "South 24 Parganas, West Bengal 743370"],
    actionType: "map",
    actionValue: "https://www.google.com/maps/place/Sundarban+Luxury+Package/@22.1416837,88.8094906,17z/data=!3m1!4b1!4m6!3m5!1s0x3a018b93c291328f:0x9053b19002605ee0!8m2!3d22.1416837!4d88.8094906!16s%2Fg%2F11zxrs2zsc?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
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
  mainAddress: "Sundarban Luxury Package, Dulki, Gosaba, South 24 Parganas, West Bengal 743370",
  workingHours: "Monday to Sunday: 8:00 AM – 9:00 PM IST",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.697089422998!2d88.80691567586522!3d22.14168367980598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a018b93c291328f%3A0x9053b19002605ee0!2sSundarban%20Luxury%20Package!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
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
    heroBackgroundImage: "/assets/images/royal-bengal-tiger.jpg",
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
    heroTitle: "Pioneering Luxury In Sundarban",
    heroSubtitle: "Dedicated to sustainable eco-tourism, local community empowerment, and unforgettable luxury wilderness expeditions in the Sundarbans delta.",
    heroBadge: "Our Legacy & Heritage",
    heroBackgroundImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
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
    pageKey: "contact",
    pageName: "Contact & Assistance",
    pageRoute: "/contact",
    heroTitle: "Contact Sundarban Luxury",
    heroSubtitle: "Have questions about our luxury river cruises, customized tiger safari packages, or private resort bookings? Our expert travel advisors are available 24/7 to assist you.",
    heroBadge: "24/7 Fast Response",
    heroBackgroundImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
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
  {
    pageKey: "gallery",
    pageName: "Photo Gallery Page",
    pageRoute: "/gallery",
    heroTitle: "Sundarban Moments & Safari Highlights",
    heroSubtitle: "Explore high-definition captures of wild royal tigers, exotic mangrove birds, sunset cruises, and luxury resort stays.",
    heroBadge: "Visual Wilderness",
    heroBackgroundImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80",
    metaDescription: "Visual gallery of Sundarban luxury tours, royal Bengal tiger tracking, river cruises, and Hotel Sonar Bangla resort moments.",
    sections: [],
  },
  {
    pageKey: "hotel",
    pageName: "Hotel Sonar Bangla",
    pageRoute: "/hotel-sonar-bangla",
    heroTitle: "Hotel Sonar Bangla Sundarban — 5-Star Riverfront Luxury",
    heroSubtitle: "Immerse yourself in lush landscaped gardens, infinity swimming pool, multi-cuisine dining, and luxury suites facing the calm mangrove waters.",
    heroBadge: "Exclusive Resort Partner",
    heroBackgroundImage: "/assets/images/sonarbanglahotel.jpg",
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
    heroBackgroundImage: "/assets/images/boat-safari.jpg",
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
