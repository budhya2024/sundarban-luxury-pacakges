import { pgTable, text, varchar, boolean, integer, timestamp, uuid, jsonb, real } from "drizzle-orm/pg-core";

// 1. Admin Users for Authentication
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 100 }).default("Super Admin").notNull(),
  role: varchar("role", { length: 50 }).default("super_admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  image: text("image"),
  category: varchar("category", { length: 100 }).notNull(),
  date: varchar("date", { length: 50 }),
  readTime: varchar("read_time", { length: 50 }),
  author: varchar("author", { length: 100 }).default("Editorial Team"),
  authorImage: text("author_image"),
  tags: jsonb("tags").$type<string[]>().default([]),
  status: varchar("status", { length: 20 }).default("Published").notNull(), // Published, Draft, Scheduled
  featured: boolean("featured").default(false).notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  views: integer("views").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Contact Inquiries & Leads
export const contactInquiries = pgTable("contact_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("New").notNull(), // New, Contacted, In Progress, Converted, Closed
  source: varchar("source", { length: 50 }).default("Contact Form").notNull(), // Contact Form, WhatsApp, Helpline Call, Custom Request
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Contact General Information & Global Hotlines
export const contactGeneralInfo = pgTable("contact_general_info", {
  id: varchar("id", { length: 50 }).primaryKey().default("default"),
  heroTitle: text("hero_title"),
  heroSubtitle: text("hero_subtitle"),
  helpdeskPhone: varchar("helpdesk_phone", { length: 50 }),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }),
  officialEmail: varchar("official_email", { length: 255 }),
  supportEmail: varchar("support_email", { length: 255 }),
  mainAddress: text("main_address"),
  workingHours: varchar("working_hours", { length: 255 }),
  googleMapEmbedUrl: text("google_map_embed_url"),
  emergencyHotline: varchar("emergency_hotline", { length: 50 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Contact Cards displayed on /contact
export const contactCards = pgTable("contact_cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  iconKey: varchar("icon_key", { length: 50 }).default("phone").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  details: jsonb("details").$type<string[]>().default([]).notNull(),
  actionType: varchar("action_type", { length: 50 }).default("none").notNull(), // call, whatsapp, email, map, none
  actionValue: text("action_value"),
  isPrimary: boolean("is_primary").default(false).notNull(),
  status: varchar("status", { length: 20 }).default("Active").notNull(), // Active, Inactive
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export type BlogPostRow = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type ContactInquiryRow = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;

export type ContactGeneralInfoRow = typeof contactGeneralInfo.$inferSelect;
export type NewContactGeneralInfo = typeof contactGeneralInfo.$inferInsert;

export type ContactCardRow = typeof contactCards.$inferSelect;
export type NewContactCard = typeof contactCards.$inferInsert;

// 6. Tour Packages & Safari Itineraries
export interface TourActivityItem {
  time: string;
  title: string;
  desc: string;
}

export interface TourItineraryDayItem {
  dayNumber: number;
  dayTitle: string;
  activities: TourActivityItem[];
}

export interface TourMealCourseItem {
  courseName: string;
  menuItems: string;
}

export interface TourDayFoodMenuItem {
  dayNumber: number;
  dayTitle: string;
  courses: TourMealCourseItem[];
}

export const tourPackages = pgTable("tour_packages", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  subtitle: text("subtitle"),
  duration: varchar("duration", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price").notNull(),
  category: varchar("category", { length: 100 }).default("Luxury Cruise"),
  rating: real("rating").default(4.9).notNull(),
  reviewsCount: integer("reviews_count").default(0).notNull(),
  image: text("image").notNull(),
  bannerImage: text("banner_image"),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  status: varchar("status", { length: 50 }).default("Active").notNull(), // Active, Draft, Archived
  maxGuests: integer("max_guests").default(40).notNull(),
  departure: varchar("departure", { length: 255 }).notNull(),
  pickupDrop: text("pickup_drop"),
  mealsSummary: text("meals_summary"),
  minGroupSize: varchar("min_group_size", { length: 100 }).default("Min 2 People"),
  overview: text("overview"),
  highlightQuote: text("highlight_quote"),
  itinerary: jsonb("itinerary").$type<TourItineraryDayItem[]>().default([]),
  foodMenu: jsonb("food_menu").$type<TourDayFoodMenuItem[]>().default([]),
  inclusions: jsonb("inclusions").$type<string[]>().default([]),
  exclusions: jsonb("exclusions").$type<string[]>().default([]),
  thingsToCarry: jsonb("things_to_carry").$type<string[]>().default([]),
  childPolicy: jsonb("child_policy").$type<string[]>().default([]),
  importantNotes: jsonb("important_notes").$type<string[]>().default([]),
  helplinePhone: varchar("helpline_phone", { length: 50 }).default("+91 70014 03498"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TourPackageRow = typeof tourPackages.$inferSelect;
export type NewTourPackage = typeof tourPackages.$inferInsert;

// 7. Tour & Resort Bookings
export const bookings = pgTable("bookings", {
  id: varchar("id", { length: 100 }).primaryKey(),
  bookingCode: varchar("booking_code", { length: 50 }).notNull().unique(),
  guestName: varchar("guest_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  packageOrRoom: varchar("package_or_room", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).default("Tour Package").notNull(), // Tour Package | Hotel Resort
  travelDate: varchar("travel_date", { length: 50 }).notNull(),
  guestsCount: integer("guests_count").default(1).notNull(),
  totalAmount: integer("total_amount").notNull(),
  paidAmount: integer("paid_amount").default(0).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default("Unpaid").notNull(), // Paid | Partial | Unpaid
  bookingStatus: varchar("booking_status", { length: 50 }).default("Pending").notNull(), // Confirmed | Pending | Completed | Cancelled
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BookingRow = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

// 8. Hotel Sonar Bangla Rooms & Suites
export const hotelRooms = pgTable("hotel_rooms", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  pricePerNight: integer("price_per_night").notNull(),
  capacity: varchar("capacity", { length: 100 }).notNull(),
  bedType: varchar("bed_type", { length: 100 }).notNull(),
  totalRooms: integer("total_rooms").default(10).notNull(),
  availableRooms: integer("available_rooms").default(5).notNull(),
  status: varchar("status", { length: 50 }).default("Available").notNull(), // Available, Sold Out, Maintenance
  image: text("image").notNull(),
  amenities: jsonb("amenities").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type HotelRoomRow = typeof hotelRooms.$inferSelect;
export type NewHotelRoom = typeof hotelRooms.$inferInsert;

// 9. Hotel Sonar Bangla Resort Photos
export const hotelPhotos = pgTable("hotel_photos", {
  id: varchar("id", { length: 100 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Swimming Pool, Riverfront Lawn, Dining & Bar, Luxury Suites, Jetty Deck, Resort Lobby
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type HotelPhotoRow = typeof hotelPhotos.$inferSelect;
export type NewHotelPhoto = typeof hotelPhotos.$inferInsert;

// 10. Hotel Sonar Bangla Booking Inquiries
export const hotelInquiries = pgTable("hotel_inquiries", {
  id: varchar("id", { length: 100 }).primaryKey(),
  refId: varchar("ref_id", { length: 50 }).notNull().unique(),
  guestName: varchar("guest_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  packageName: varchar("package_name", { length: 255 }),
  roomName: varchar("room_name", { length: 255 }).notNull(),
  roomCode: varchar("room_code", { length: 50 }),
  checkIn: varchar("check_in", { length: 50 }).notNull(),
  checkOut: varchar("check_out", { length: 50 }),
  nights: integer("nights").default(1).notNull(),
  guestsCount: varchar("guests_count", { length: 100 }).notNull(),
  roomsCount: integer("rooms_count").default(1).notNull(),
  totalAmount: integer("total_amount").notNull(),
  paidAmount: integer("paid_amount").default(0).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default("Pending").notNull(), // Paid, Partial, Pending, Unpaid
  status: varchar("status", { length: 50 }).default("Pending").notNull(), // Pending, Confirmed, Checked In, Completed, Cancelled
  date: varchar("date", { length: 50 }).notNull(),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type HotelInquiryRow = typeof hotelInquiries.$inferSelect;
export type NewHotelInquiry = typeof hotelInquiries.$inferInsert;

// 11. Page Contents (Home, About, Contact, Gallery, Hotel, Tours)
export interface PageSectionItem {
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

export const pageContents = pgTable("page_contents", {
  pageKey: varchar("page_key", { length: 50 }).primaryKey(),
  pageName: varchar("page_name", { length: 100 }).notNull(),
  pageRoute: varchar("page_route", { length: 100 }).notNull(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle"),
  heroBadge: varchar("hero_badge", { length: 100 }),
  heroBackgroundImage: text("hero_background_image"),
  metaDescription: text("meta_description"),
  sections: jsonb("sections").$type<PageSectionItem[]>().default([]).notNull(),
  customData: jsonb("custom_data").$type<Record<string, any>>().default({}),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PageContentRow = typeof pageContents.$inferSelect;
export type NewPageContent = typeof pageContents.$inferInsert;

// 12. Testimonials (Manual and Verified Google Reviews)
export const testimonials = pgTable("testimonials", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).default("Guest").notNull(),
  avatar: text("avatar"),
  rating: integer("rating").default(5).notNull(),
  text: text("text").notNull(),
  tourPackage: varchar("tour_package", { length: 255 }),
  date: varchar("date", { length: 100 }),
  featured: boolean("featured").default(false).notNull(),
  status: varchar("status", { length: 50 }).default("Active").notNull(), // Active, Inactive
  source: varchar("source", { length: 50 }).default("manual").notNull(), // manual, google
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TestimonialRow = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

// 13. Testimonial Settings (Switch between manual & live Google reviews)
export const testimonialSettings = pgTable("testimonial_settings", {
  id: varchar("id", { length: 50 }).primaryKey().default("default"),
  displayMode: varchar("display_mode", { length: 50 }).default("manual").notNull(), // manual | google
  googlePlaceId: varchar("google_place_id", { length: 255 }).default("ChIJ74-8t225-TkRk9b3Psm9Fz8"),
  googlePlaceUrl: text("google_place_url").default("https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb"),
  featurableId: varchar("featurable_id", { length: 255 }),
  googleApiKey: varchar("google_api_key", { length: 255 }),
  googleRating: real("google_rating").default(4.9).notNull(),
  googleReviewsCount: integer("google_reviews_count").default(284).notNull(),
  googleBadgeText: varchar("google_badge_text", { length: 255 }).default("Verified Google Business Rating"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TestimonialSettingsRow = typeof testimonialSettings.$inferSelect;
export type NewTestimonialSettings = typeof testimonialSettings.$inferInsert;

// 14. Photo Gallery Items
export const galleryItems = pgTable("gallery_items", {
  id: varchar("id", { length: 100 }).primaryKey(),
  src: text("src").notNull(),
  alt: varchar("alt", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  column: varchar("column", { length: 50 }).default("col1").notNull(), // col1, col2, col3, col4, col5
  category: varchar("category", { length: 100 }).default("Cruises"),
  order: integer("order").default(0).notNull(),
  status: varchar("status", { length: 50 }).default("Active").notNull(), // Active, Inactive
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GalleryItemRow = typeof galleryItems.$inferSelect;
export type NewGalleryItem = typeof galleryItems.$inferInsert;

// 15. Menu Items (Traditional Sundarban Bengali Cuisine)
export const menuItems = pgTable("menu_items", {
  id: varchar("id", { length: 100 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Bengali Non-Veg, Bengali Fish & Seafood, Bengali Veg, Dessert & Beverage
  priceTag: varchar("price_tag", { length: 100 }),
  tag: varchar("tag", { length: 100 }),
  image: text("image").notNull(),
  description: text("description"),
  isChefSpecial: boolean("is_chef_special").default(false).notNull(),
  status: varchar("status", { length: 50 }).default("Active").notNull(), // Active, Unavailable
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type MenuItemRow = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;

// 16. FAQs (Frequently Asked Questions)
export const faqs = pgTable("faqs", {
  id: varchar("id", { length: 100 }).primaryKey(),
  questionNumber: varchar("question_number", { length: 50 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).default("General"),
  order: integer("order").default(0).notNull(),
  status: varchar("status", { length: 50 }).default("Active").notNull(), // Active, Inactive
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FaqRow = typeof faqs.$inferSelect;
export type NewFaq = typeof faqs.$inferInsert;

// 17. Global Top Alert Banner
export const globalAlertBanner = pgTable("global_alert_banner", {
  id: varchar("id", { length: 50 }).primaryKey().default("default"),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  text: text("text").notNull(),
  badge: varchar("badge", { length: 100 }).default("Urgent Update").notNull(),
  type: varchar("type", { length: 50 }).default("alert-red").notNull(), // alert-red, promo-gold, info-blue
  actionText: varchar("action_text", { length: 100 }),
  actionUrl: varchar("action_url", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GlobalAlertBannerRow = typeof globalAlertBanner.$inferSelect;
export type NewGlobalAlertBanner = typeof globalAlertBanner.$inferInsert;

