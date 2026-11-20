import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db";
import { INITIAL_ADMIN_FULL_STATE } from "../data/adminMockData";
import {
  Inquiry,
  JournalMemo,
  Service,
  Plan,
  PortfolioProject,
  ClientReview,
  Faq,
  AgencySettings,
} from "../models";

async function seedDatabase() {
  console.log("==================================================");
  console.log("   CodeClovers Database Seeder (MongoDB + Mongoose)");
  console.log("==================================================");

  try {
    console.log("[Seeder] Connecting to MongoDB...");
    await connectToDatabase();
    console.log("[Seeder] Connected successfully.");

    // 1. Inquiries
    console.log("\n[Seeder] Seeding Inquiries...");
    await Inquiry.deleteMany({});
    const inquiriesResult = await Inquiry.insertMany(INITIAL_ADMIN_FULL_STATE.inquiries);
    console.log(`[Seeder] Inserted ${inquiriesResult.length} inquiries.`);

    // 2. Journal Memos
    console.log("\n[Seeder] Seeding Journal Memos...");
    await JournalMemo.deleteMany({});
    const memosResult = await JournalMemo.insertMany(INITIAL_ADMIN_FULL_STATE.memos);
    console.log(`[Seeder] Inserted ${memosResult.length} journal memos.`);

    // 3. Services
    console.log("\n[Seeder] Seeding Services...");
    await Service.deleteMany({});
    const servicesResult = await Service.insertMany(INITIAL_ADMIN_FULL_STATE.services);
    console.log(`[Seeder] Inserted ${servicesResult.length} services.`);

    // 4. Plans
    console.log("\n[Seeder] Seeding Plans...");
    await Plan.deleteMany({});
    const plansResult = await Plan.insertMany(INITIAL_ADMIN_FULL_STATE.plans);
    console.log(`[Seeder] Inserted ${plansResult.length} plans.`);

    // 5. Portfolio Projects
    console.log("\n[Seeder] Seeding Portfolio Projects...");
    await PortfolioProject.deleteMany({});
    const projectsResult = await PortfolioProject.insertMany(INITIAL_ADMIN_FULL_STATE.projects);
    console.log(`[Seeder] Inserted ${projectsResult.length} portfolio projects.`);

    // 6. Client Reviews
    console.log("\n[Seeder] Seeding Client Reviews...");
    await ClientReview.deleteMany({});
    const reviewsResult = await ClientReview.insertMany(INITIAL_ADMIN_FULL_STATE.reviews);
    console.log(`[Seeder] Inserted ${reviewsResult.length} client reviews.`);

    // 7. FAQs
    console.log("\n[Seeder] Seeding FAQs...");
    await Faq.deleteMany({});
    const faqsResult = await Faq.insertMany(INITIAL_ADMIN_FULL_STATE.faqs);
    console.log(`[Seeder] Inserted ${faqsResult.length} FAQs.`);

    // 8. Agency Settings
    console.log("\n[Seeder] Seeding Agency Settings...");
    await AgencySettings.deleteMany({});
    const settingsResult = await AgencySettings.create(INITIAL_ADMIN_FULL_STATE.settings);
    console.log(`[Seeder] Inserted Agency Settings (${settingsResult.agencyName}).`);

    console.log("\n==================================================");
    console.log("   Database Seeding Completed Successfully! 🍀");
    console.log("==================================================");
  } catch (error) {
    console.error("[Seeder] Error during database seeding:", error);
    process.exitCode = 1;
  } finally {
    console.log("[Seeder] Disconnecting from database...");
    await mongoose.disconnect();
    console.log("[Seeder] Disconnected.");
  }
}

// Execute directly if run as script
if (require.main === module || process.argv[1]?.includes("seed")) {
  seedDatabase();
}

export { seedDatabase };
