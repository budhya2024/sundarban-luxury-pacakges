import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { blogPosts as defaultBlogPosts } from "../lib/blog-data";
import {
  initialAdminContactGeneralInfo,
  initialAdminContactCards,
  initialAdminInquiries,
  initialAdminPackages,
  initialAdminBookings,
  initialAdminRooms,
} from "../lib/admin-data";


async function seed() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing!");
  }

  console.log("🌱 Starting Neon Database Seed...");
  const client = neon(connectionString);
  const db = drizzle(client, { schema });

  // 1. Seed Admin User
  const existingAdmin = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.username, "admin"))
    .limit(1);

  if (existingAdmin.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Admin@Sundarban2026", salt);
    await db.insert(schema.adminUsers).values({
      username: "admin",
      email: "admin@sundarban.com",
      passwordHash,
      name: "Super Admin",
      role: "super_admin",
    });
    console.log("✅ Admin user seeded: username=admin, password=Admin@Sundarban2026");
  } else {
    console.log("ℹ️ Admin user already exists, skipping.");
  }

  // 2. Seed Blog Posts
  for (const post of defaultBlogPosts) {
    const existing = await db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.slug, post.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(schema.blogPosts).values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        author: post.author,
        authorImage: post.authorImage,
        tags: post.tags,
        status: post.status || "Published",
        featured: post.featured ?? false,
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.excerpt,
        views: post.views || 0,
      });
      console.log(`✅ Seeded blog post: ${post.slug}`);
    }
  }

  // 3. Seed Contact General Info
  const existingGeneral = await db
    .select()
    .from(schema.contactGeneralInfo)
    .where(eq(schema.contactGeneralInfo.id, "default"))
    .limit(1);

  if (existingGeneral.length === 0) {
    await db.insert(schema.contactGeneralInfo).values({
      id: "default",
      heroTitle: initialAdminContactGeneralInfo.heroTitle,
      heroSubtitle: initialAdminContactGeneralInfo.heroSubtitle,
      helpdeskPhone: initialAdminContactGeneralInfo.helpdeskPhone,
      whatsappNumber: initialAdminContactGeneralInfo.whatsappNumber,
      officialEmail: initialAdminContactGeneralInfo.officialEmail,
      supportEmail: initialAdminContactGeneralInfo.supportEmail,
      mainAddress: initialAdminContactGeneralInfo.mainAddress,
      workingHours: initialAdminContactGeneralInfo.workingHours,
      googleMapEmbedUrl: initialAdminContactGeneralInfo.googleMapEmbedUrl,
      emergencyHotline: initialAdminContactGeneralInfo.emergencyHotline,
    });
    console.log("✅ Seeded contact general info");
  }

  // 4. Seed Contact Cards
  const existingCards = await db.select().from(schema.contactCards);
  if (existingCards.length === 0) {
    for (let i = 0; i < initialAdminContactCards.length; i++) {
      const card = initialAdminContactCards[i];
      await db.insert(schema.contactCards).values({
        iconKey: card.iconKey,
        title: card.title,
        subtitle: card.subtitle,
        details: card.details,
        actionType: card.actionType || "none",
        actionValue: card.actionValue || "",
        isPrimary: card.isPrimary || false,
        status: card.status || "Active",
        order: i + 1,
      });
    }
    console.log(`✅ Seeded ${initialAdminContactCards.length} contact cards`);
  }

  // 5. Seed Contact Inquiries
  const existingInquiries = await db.select().from(schema.contactInquiries);
  if (existingInquiries.length === 0) {
    for (const inq of initialAdminInquiries) {
      await db.insert(schema.contactInquiries).values({
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        subject: inq.subject,
        message: inq.message,
        status: inq.status,
        source: inq.source,
      });
    }
    console.log(`✅ Seeded ${initialAdminInquiries.length} initial inquiries`);
  }

  // 6. Seed Tour Packages

  const existingPackages = await db.select().from(schema.tourPackages);
  if (existingPackages.length === 0) {
    const baseTime = Date.now() - 5 * 24 * 60 * 60 * 1000; // 5 days ago
    for (let i = 0; i < initialAdminPackages.length; i++) {
      const pkg = initialAdminPackages[i];
      // Increment created_at by 1 hour for each package so createdAt ASC preserves order
      const createdAt = new Date(baseTime + i * 3600 * 1000);
      await db.insert(schema.tourPackages).values({
        id: pkg.id,
        name: pkg.name,
        slug: pkg.slug,
        subtitle: pkg.subtitle,
        duration: pkg.duration,
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        category: pkg.category || "Luxury Cruise",
        rating: pkg.rating,
        reviewsCount: pkg.reviewsCount,
        image: pkg.image,
        bannerImage: pkg.bannerImage,
        gallery: pkg.gallery || [],
        status: pkg.status || "Active",
        maxGuests: pkg.maxGuests,
        departure: pkg.departure,
        pickupDrop: pkg.pickupDrop,
        mealsSummary: pkg.mealsSummary,
        minGroupSize: pkg.minGroupSize,
        overview: pkg.overview,
        highlightQuote: pkg.highlightQuote,
        itinerary: pkg.itinerary || [],
        foodMenu: pkg.foodMenu || [],
        inclusions: pkg.inclusions || [],
        exclusions: pkg.exclusions || [],
        thingsToCarry: pkg.thingsToCarry || [],
        childPolicy: pkg.childPolicy || [],
        importantNotes: pkg.importantNotes || [],
        helplinePhone: pkg.helplinePhone || "+91 70014 03498",
        featured: pkg.featured || false,
        createdAt,
        updatedAt: createdAt,
      });
    }
    console.log(`✅ Seeded ${initialAdminPackages.length} tour packages`);
  }

  // 7. Seed Bookings
  const existingBookings = await db.select().from(schema.bookings);
  if (existingBookings.length === 0) {
    for (const b of initialAdminBookings) {
      const createdDate = b.createdAt ? new Date(b.createdAt) : new Date();
      await db.insert(schema.bookings).values({
        id: b.id,
        bookingCode: b.bookingCode,
        guestName: b.guestName,
        email: b.email,
        phone: b.phone,
        packageOrRoom: b.packageOrRoom,
        type: b.type || "Tour Package",
        travelDate: b.travelDate,
        guestsCount: b.guestsCount || 1,
        totalAmount: b.totalAmount,
        paidAmount: b.paidAmount || 0,
        paymentStatus: b.paymentStatus || "Unpaid",
        bookingStatus: b.bookingStatus || "Pending",
        specialRequests: b.specialRequests || null,
        createdAt: isNaN(createdDate.getTime()) ? new Date() : createdDate,
        updatedAt: isNaN(createdDate.getTime()) ? new Date() : createdDate,
      });
    }
    console.log(`✅ Seeded ${initialAdminBookings.length} initial bookings`);
  }

  // 8. Seed Hotel Rooms
  const existingRooms = await db.select().from(schema.hotelRooms);
  if (existingRooms.length === 0) {
    for (const rm of initialAdminRooms) {
      await db.insert(schema.hotelRooms).values({
        id: rm.id,
        name: rm.name,
        code: rm.code,
        pricePerNight: rm.pricePerNight,
        capacity: rm.capacity,
        bedType: rm.bedType,
        totalRooms: rm.totalRooms,
        availableRooms: rm.availableRooms,
        status: rm.status || "Available",
        image: rm.image,
        amenities: rm.amenities || [],
      });
    }
    console.log(`✅ Seeded ${initialAdminRooms.length} initial hotel rooms`);
  }

  // 9. Seed Hotel Photos
  const existingPhotos = await db.select().from(schema.hotelPhotos);
  if (existingPhotos.length === 0) {
    const initialHotelPhotosSeed = [
      {
        id: "ph-1",
        title: "Infinity Pool overlooking Delta Waterways",
        category: "Swimming Pool",
        imageUrl: "/assets/images/sonar-bangla-hotel-pool.jpg",
        featured: true,
        order: 1,
      },
      {
        id: "ph-2",
        title: "Executive River View Master Suite Bed",
        category: "Luxury Suites",
        imageUrl: "/assets/images/sonar-bangla-hotel-deluxe.jpg",
        featured: true,
        order: 2,
      },
      {
        id: "ph-3",
        title: "Sunset Dining Lawn & Bonfire Pavilion",
        category: "Riverfront Lawn",
        imageUrl: "/assets/images/sonar-bangla-hotel-ambience.jpg",
        featured: true,
        order: 3,
      },
      {
        id: "ph-4",
        title: "Private Boat Boarding Jetty at Dusk",
        category: "Jetty Deck",
        imageUrl: "/assets/images/resort-deck.jpg",
        featured: false,
        order: 4,
      },
      {
        id: "ph-5",
        title: "Royal Sonar Multi-Cuisine Dining Restaurant",
        category: "Dining & Bar",
        imageUrl: "/assets/images/hotel-lounge.jpeg",
        featured: false,
        order: 5,
      },
      {
        id: "ph-6",
        title: "Grand Resort Reception & Facade",
        category: "Resort Lobby",
        imageUrl: "/assets/images/sonarbanglahotel.jpg",
        featured: false,
        order: 6,
      },
      {
        id: "ph-7",
        title: "Riverfront Balcony Suite View",
        category: "Luxury Suites",
        imageUrl: "/assets/images/sonar-bangla-hotel-balcony.webp",
        featured: true,
        order: 7,
      },
      {
        id: "ph-8",
        title: "Heritage Mangrove Wooden Villa",
        category: "Luxury Suites",
        imageUrl: "/assets/images/sonar-bangla-hotel-cottage.webp",
        featured: true,
        order: 8,
      },
      {
        id: "ph-9",
        title: "Manicured Grounds & Garden Walkway",
        category: "Riverfront Lawn",
        imageUrl: "/assets/images/sonar-bangla-hotel-grounds.jpg",
        featured: false,
        order: 9,
      },
      {
        id: "ph-10",
        title: "Panoramic Aerial Resort Panorama",
        category: "Resort Lobby",
        imageUrl: "/assets/images/sonar-bangla-hotel-bg.jpg",
        featured: true,
        order: 10,
      },
      {
        id: "ph-11",
        title: "King Bedroom Suite Interior",
        category: "Luxury Suites",
        imageUrl: "/assets/images/hotel-bedroom.jpeg",
        featured: false,
        order: 11,
      },
      {
        id: "ph-12",
        title: "Deluxe Premium AC Room",
        category: "Luxury Suites",
        imageUrl: "/assets/images/hotel-room-1.jpeg",
        featured: false,
        order: 12,
      },
    ];

    for (const ph of initialHotelPhotosSeed) {
      await db.insert(schema.hotelPhotos).values(ph);
    }
    console.log(`✅ Seeded ${initialHotelPhotosSeed.length} initial hotel photos`);
  }

  // 10. Seed Hotel Inquiries
  const existingHotelInquiries = await db.select().from(schema.hotelInquiries);
  if (existingHotelInquiries.length === 0) {
    const initialHotelInquiriesSeed = [
      {
        id: "h-inq-1",
        refId: "HSB-2026-8810",
        guestName: "Ananya Roy",
        phone: "+91 98301 24567",
        email: "ananya.roy@example.com",
        packageName: "2 Nights 3 Days Deluxe Package",
        roomName: "Executive Riverview Deluxe Room",
        roomCode: "HSB-DLX-01",
        checkIn: "2026-09-20",
        checkOut: "2026-09-22",
        nights: 2,
        guestsCount: "2 Adults, 1 Child",
        roomsCount: 1,
        totalAmount: 15998,
        paidAmount: 15998,
        paymentStatus: "Paid",
        status: "Confirmed",
        date: "2026-09-13",
        specialRequests: "River facing upper floor requested with extra buffet breakfast.",
      },
      {
        id: "h-inq-2",
        refId: "HSB-2026-8811",
        guestName: "Vikram Malhotra",
        phone: "+91 98112 34567",
        email: "vikram.m@example.com",
        packageName: "2 Nights 3 Days Grand Expedition",
        roomName: "Heritage Mangrove Wooden Villa",
        roomCode: "HSB-VILLA-04",
        checkIn: "2026-09-25",
        checkOut: "2026-09-27",
        nights: 2,
        guestsCount: "4 Adults, 2 Children",
        roomsCount: 2,
        totalAmount: 23996,
        paidAmount: 10000,
        paymentStatus: "Partial",
        status: "Pending",
        date: "2026-09-12",
        specialRequests: "Need adjacent inter-connected rooms near swimming pool lawn.",
      },
      {
        id: "h-inq-3",
        refId: "HSB-2026-8812",
        guestName: "Dr. Sourav Banerjee",
        phone: "+91 94330 98765",
        email: "sourav.banerjee@example.com",
        packageName: "1 Day Luxury Package",
        roomName: "Deluxe Premium AC Room",
        roomCode: "HSB-DLX-03",
        checkIn: "2026-09-18",
        checkOut: "2026-09-19",
        nights: 1,
        guestsCount: "2 Adults",
        roomsCount: 1,
        totalAmount: 5999,
        paidAmount: 5999,
        paymentStatus: "Paid",
        status: "Checked In",
        date: "2026-09-11",
        specialRequests: "Early check-in at 10 AM requested.",
      },
      {
        id: "h-inq-4",
        refId: "HSB-2026-8813",
        guestName: "Priyanka Sharma",
        phone: "+91 97178 54321",
        email: "priyanka.s@example.com",
        packageName: "2 Nights 3 Days Grand Expedition",
        roomName: "Royal Presidential Mangrove Suite",
        roomCode: "HSB-STE-02",
        checkIn: "2026-10-02",
        checkOut: "2026-10-05",
        nights: 3,
        guestsCount: "2 Adults",
        roomsCount: 1,
        totalAmount: 38997,
        paidAmount: 0,
        paymentStatus: "Pending",
        status: "Pending",
        date: "2026-09-10",
        specialRequests: "Honeymoon decoration package with private candlelight dinner on jetty deck.",
      },
    ];

    for (const inq of initialHotelInquiriesSeed) {
      await db.insert(schema.hotelInquiries).values(inq);
    }
    console.log(`✅ Seeded ${initialHotelInquiriesSeed.length} initial hotel inquiries`);
  }

  console.log("🎉 Database seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

