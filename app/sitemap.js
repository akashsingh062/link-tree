import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { User } from "@/lib/model/User";

const BASE_URL = "https://linkify-ak.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic user profile pages
  let userPages = [];
  try {
    await connectDB();

    // Find all users who have a link tree
    const trees = await LinkTree.find({}, { user: 1, updatedAt: 1 }).lean();
    const userIds = trees.map((t) => t.user);
    const users = await User.find(
      { _id: { $in: userIds } },
      { username: 1 }
    ).lean();

    const usernameMap = {};
    users.forEach((u) => {
      usernameMap[u._id.toString()] = u.username;
    });

    userPages = trees
      .map((tree) => {
        const username = usernameMap[tree.user.toString()];
        if (!username) return null;
        return {
          url: `${BASE_URL}/${username}`,
          lastModified: tree.updatedAt || new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Sitemap: error fetching user profiles", error);
  }

  return [...staticPages, ...userPages];
}
