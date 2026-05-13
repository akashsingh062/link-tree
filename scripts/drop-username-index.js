/**
 * Migration: Drop the stale `username` unique index from the `linktrees` collection.
 * 
 * Run once after deploying the schema change:
 *   node scripts/drop-username-index.js
 * 
 * This is needed because Mongoose doesn't auto-drop indexes that are removed from the schema.
 */

import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not found. Create a .env or .env.local file.");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const collection = db.collection("linktrees");

  // List current indexes
  const indexes = await collection.indexes();
  console.log("Current indexes:", indexes.map(i => `${i.name} → ${JSON.stringify(i.key)}`));

  // Drop the username index if it exists
  const usernameIndex = indexes.find(i => i.key?.username);
  if (usernameIndex) {
    await collection.dropIndex(usernameIndex.name);
    console.log(`✅  Dropped index: ${usernameIndex.name}`);
  } else {
    console.log("ℹ️  No username index found — nothing to drop.");
  }

  // Also drop lastUsernameChange index if it exists
  const lastChangeIndex = indexes.find(i => i.key?.lastUsernameChange);
  if (lastChangeIndex) {
    await collection.dropIndex(lastChangeIndex.name);
    console.log(`✅  Dropped index: ${lastChangeIndex.name}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
