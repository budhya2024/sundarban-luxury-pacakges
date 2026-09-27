import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import {
  initialAdminPages,
  initialAdminTestimonials,
  initialAdminGallery,
  initialAdminMenuItems,
  initialAdminFaqs,
  initialAdminAlertBanner,
} from "../lib/admin-data";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const client = neon(connectionString);
const db = drizzle(client, { schema });



async function seed() {
  console.log("Starting database seeding for dynamic pages & widgets...");

  // 1. Seed Page Contents
  console.log("Seeding page_contents...");
  for (const page of initialAdminPages) {
    await db
      .insert(schema.pageContents)
      .values({
        pageKey: page.pageKey,
        pageName: page.pageName,
        pageRoute: page.pageRoute,
        heroTitle: page.heroTitle,
        heroSubtitle: page.heroSubtitle,
        heroBadge: page.heroBadge,
        heroBackgroundImage: page.heroBackgroundImage,
        metaDescription: page.metaDescription,
        sections: page.sections,
        customData: {},
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.pageContents.pageKey,
        set: {
          pageName: page.pageName,
          pageRoute: page.pageRoute,
          heroTitle: page.heroTitle,
          heroSubtitle: page.heroSubtitle,
          heroBadge: page.heroBadge,
          heroBackgroundImage: page.heroBackgroundImage,
          metaDescription: page.metaDescription,
          sections: page.sections,
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${initialAdminPages.length} pages.`);

  // 2. Seed Testimonial Settings
  console.log("Seeding testimonial_settings...");
  await db
    .insert(schema.testimonialSettings)
    .values({
      id: "default",
      displayMode: "manual",
      googlePlaceId: "ChIJ74-8t225-TkRk9b3Psm9Fz8",
      googlePlaceUrl: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
      googleRating: 4.9,
      googleReviewsCount: 284,
      googleBadgeText: "Verified Google Business Rating",
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.testimonialSettings.id,
      set: {
        googlePlaceId: "ChIJ74-8t225-TkRk9b3Psm9Fz8",
        googlePlaceUrl: "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
        googleRating: 4.9,
        googleReviewsCount: 284,
        googleBadgeText: "Verified Google Business Rating",
        updatedAt: new Date(),
      },
    });

  // 3. Seed Testimonials (Manual + Google)
  console.log("Seeding testimonials...");
  let orderIndex = 1;
  for (const t of initialAdminTestimonials) {
    await db
      .insert(schema.testimonials)
      .values({
        id: t.id,
        name: t.name,
        role: t.role,
        avatar: t.avatar,
        rating: t.rating || 5,
        text: t.text,
        tourPackage: t.tourPackage,
        date: t.date,
        featured: t.featured || false,
        status: t.status || "Active",
        source: "manual",
        order: orderIndex++,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.testimonials.id,
        set: {
          name: t.name,
          role: t.role,
          avatar: t.avatar,
          rating: t.rating || 5,
          text: t.text,
          tourPackage: t.tourPackage,
          status: t.status || "Active",
          source: "manual",
          updatedAt: new Date(),
        },
      });
  }

  console.log(`Seeded ${initialAdminTestimonials.length} manual testimonials.`);

  // 4. Seed Gallery Items
  console.log("Seeding gallery_items...");
  for (const g of initialAdminGallery) {
    await db
      .insert(schema.galleryItems)
      .values({
        id: g.id,
        src: g.src,
        alt: g.alt,
        title: g.title,
        location: g.location,
        column: g.column,
        category: g.category || "Cruises",
        order: g.order || 0,
        status: g.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.galleryItems.id,
        set: {
          src: g.src,
          alt: g.alt,
          title: g.title,
          location: g.location,
          column: g.column,
          category: g.category || "Cruises",
          order: g.order || 0,
          status: g.status || "Active",
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${initialAdminGallery.length} gallery items.`);

  // 5. Seed Menu Items
  console.log("Seeding menu_items...");
  let menuOrder = 1;
  for (const m of initialAdminMenuItems) {
    await db
      .insert(schema.menuItems)
      .values({
        id: m.id,
        name: m.name,
        category: m.category,
        priceTag: m.priceTag,
        tag: m.tag,
        image: m.image,
        description: m.description,
        isChefSpecial: m.isChefSpecial || false,
        status: m.status || "Active",
        order: menuOrder++,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.menuItems.id,
        set: {
          name: m.name,
          category: m.category,
          priceTag: m.priceTag,
          tag: m.tag,
          image: m.image,
          description: m.description,
          isChefSpecial: m.isChefSpecial || false,
          status: m.status || "Active",
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${initialAdminMenuItems.length} menu items.`);

  // 6. Seed FAQs
  console.log("Seeding faqs...");
  for (const f of initialAdminFaqs) {
    await db
      .insert(schema.faqs)
      .values({
        id: f.id,
        questionNumber: f.questionNumber,
        question: f.question,
        answer: f.answer,
        category: f.category || "General",
        order: f.order || 0,
        status: f.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.faqs.id,
        set: {
          questionNumber: f.questionNumber,
          question: f.question,
          answer: f.answer,
          category: f.category || "General",
          order: f.order || 0,
          status: f.status || "Active",
          updatedAt: new Date(),
        },
      });
  }
  console.log(`Seeded ${initialAdminFaqs.length} faqs.`);

  // 7. Seed Global Alert Banner
  console.log("Seeding global_alert_banner...");
  await db
    .insert(schema.globalAlertBanner)
    .values({
      id: "default",
      isEnabled: initialAdminAlertBanner.isEnabled,
      text: initialAdminAlertBanner.text,
      badge: initialAdminAlertBanner.badge,
      type: initialAdminAlertBanner.type,
      actionText: initialAdminAlertBanner.actionText,
      actionUrl: initialAdminAlertBanner.actionUrl,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.globalAlertBanner.id,
      set: {
        isEnabled: initialAdminAlertBanner.isEnabled,
        text: initialAdminAlertBanner.text,
        badge: initialAdminAlertBanner.badge,
        type: initialAdminAlertBanner.type,
        actionText: initialAdminAlertBanner.actionText,
        actionUrl: initialAdminAlertBanner.actionUrl,
        updatedAt: new Date(),
      },
    });
  console.log("Seeded global_alert_banner.");

  console.log("Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
