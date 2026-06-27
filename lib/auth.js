import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongodbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/linkify";
const client = new MongoClient(mongodbUri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
    usePlural: true, // Reuse 'users' collection instead of 'user'
  }),
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
        defaultValue: null,
      },
      lastUsernameChange: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  advanced: {
    database: {
      generateId: false, // Allow MongoDB default ObjectIds
    },
  },
});
