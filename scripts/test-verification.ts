import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

async function verify() {
  console.log("--- 1. Testing Page Contents in DB ---");
  const pages = await db.select().from(schema.pageContents);
  console.log(`Found ${pages.length} pages in DB:`, pages.map(p => p.pageKey));

  console.log("\n--- 2. Testing Testimonial Settings in DB ---");
  const [settings] = await db.select().from(schema.testimonialSettings);
  console.log("Current Testimonial Mode:", settings?.displayMode, "| Rating:", settings?.googleRating, "| Reviews Count:", settings?.googleReviewsCount);

  console.log("\n--- 3. Testing Testimonials in DB ---");
  const tests = await db.select().from(schema.testimonials);
  const manualCount = tests.filter(t => t.source === "manual").length;
  const googleCount = tests.filter(t => t.source === "google").length;
  console.log(`Total Testimonials: ${tests.length} (Manual: ${manualCount}, Google: ${googleCount})`);

  console.log("\n--- 4. Testing Gallery Items in DB ---");
  const gallery = await db.select().from(schema.galleryItems);
  console.log(`Total Gallery Items: ${gallery.length}`);

  console.log("\n--- 5. Testing Menu Items & FAQs in DB ---");
  const menu = await db.select().from(schema.menuItems);
  const faqs = await db.select().from(schema.faqs);
  console.log(`Menu Items: ${menu.length}, FAQs: ${faqs.length}`);

  console.log("\n--- 6. Testing Hero Booking Creation Simulation ---");
  const testId = `bk-test-${Date.now()}`;
  const testCode = `SB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const [newBooking] = await db.insert(schema.bookings).values({
    id: testId,
    bookingCode: testCode,
    guestName: "Verification Guest",
    email: "verify@example.com",
    phone: "+91 98765 43210",
    packageOrRoom: "Sundarban 2 Nights 3 Days Complete Tiger Trail Expedition",
    type: "Tour Package",
    travelDate: "2026-10-15",
    guestsCount: 2,
    totalAmount: 9998,
    paidAmount: 0,
    paymentStatus: "Unpaid",
    bookingStatus: "Pending",
    specialRequests: "Verification test from Hero Booking Bar",
  }).returning();

  console.log(`Created booking successfully: Code = ${newBooking.bookingCode}, Guest = ${newBooking.guestName}, Total = ₹${newBooking.totalAmount}`);

  // Clean up verification booking
  await db.delete(schema.bookings).where(eq(schema.bookings.id, testId));
  console.log("Cleaned up verification test booking.");

  console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
