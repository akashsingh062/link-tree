import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { User } from "@/lib/model/User";
import ProfileClient from "./ProfileClient";

// Server-side data fetching helper
async function getTreeByUsername(username) {
  try {
    await connectDB();
    const user = await User.findOne({ username }).lean();
    if (!user) return null;

    const tree = await LinkTree.findOne({ user: user._id }).lean();
    if (!tree) return null;

    // Serialize MongoDB objects for client
    const serialized = JSON.parse(JSON.stringify(tree));
    serialized.username = user.username;
    return serialized;
  } catch (error) {
    console.error("getTreeByUsername error:", error);
    return null;
  }
}

// Dynamic SEO metadata per user profile
export async function generateMetadata({ params }) {
  const { username } = await params;
  const tree = await getTreeByUsername(username);

  if (!tree) {
    return {
      title: `@${username} — Profile Not Found`,
      description: `The page /${username} doesn't exist yet. Claim this username on Linkify — the free link-in-bio tool.`,
      robots: { index: false, follow: true },
    };
  }

  const linkCount = tree.socialLinks?.length || 0;
  const title = tree.title && tree.title !== "My Links" ? tree.title : `${username}'s Links`;

  return {
    title: `@${username} — ${title}`,
    description: `Check out @${username}'s link-in-bio page on Linkify. ${linkCount} link${linkCount !== 1 ? "s" : ""} shared. Explore their social profiles, portfolio, and more.`,
    alternates: { canonical: `/${username}` },
    openGraph: {
      title: `@${username} on Linkify`,
      description: `Explore ${username}'s curated links, social profiles, and more on their Linkify page.`,
      url: `https://linkify-ak.vercel.app/${username}`,
      type: "profile",
      ...(tree.profilePicture
        ? {
            images: [
              {
                url: tree.profilePicture,
                alt: `${username}'s profile picture`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: tree.profilePicture ? "summary" : "summary",
      title: `@${username} on Linkify`,
      description: `${linkCount} link${linkCount !== 1 ? "s" : ""} shared on Linkify.`,
    },
  };
}

// Server Component — renders metadata on the server, delegates interactivity to client
export default async function PublicProfilePage({ params }) {
  const { username } = await params;
  const tree = await getTreeByUsername(username);

  return <ProfileClient username={username} initialTree={tree || null} />;
}
