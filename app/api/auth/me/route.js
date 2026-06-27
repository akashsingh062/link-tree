import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/User";
import { LinkTree } from "@/lib/model/LinkTree";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // 1. Check Better Auth session first
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      await connectDB();
      const userDoc = await User.findById(session.user.id);
      
      if (userDoc) {
        // If user doesn't have a username yet (common for social signups)
        if (!userDoc.username) {
          // Generate a unique username
          let baseUsername = session.user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
          if (!baseUsername) {
            baseUsername = "user";
          }
          
          let uniqueUsername = baseUsername;
          let isTaken = true;
          let counter = 0;
          
          while (isTaken) {
            const testName = counter === 0 ? uniqueUsername : `${uniqueUsername}${counter}`;
            const existing = await User.findOne({ username: testName });
            if (!existing) {
              uniqueUsername = testName;
              isTaken = false;
            } else {
              counter++;
            }
          }
          
          userDoc.username = uniqueUsername;
          await userDoc.save();
        }

        // Check if a LinkTree profile exists for this user. If not, create a default one!
        let tree = await LinkTree.findOne({ user: session.user.id });
        if (!tree) {
          tree = new LinkTree({
            user: session.user.id,
            title: session.user.name ? `${session.user.name}'s Links` : "My Links",
            profilePicture: session.user.image || "",
            template: "classic",
            socialLinks: [],
          });
          await tree.save();
        }

        return NextResponse.json(
          {
            loggedIn: true,
            user: {
              id: session.user.id,
              username: userDoc.username,
              email: session.user.email,
              name: session.user.name,
              image: session.user.image || "", // Expose social avatar image
            },
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error("Better Auth session retrieval error:", error);
  }

  // 2. Fall back to legacy JWT token
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const userDoc = await User.findById(decoded.id);

    if (userDoc) {
      // Just in case, ensure tree exists if they have a username
      let tree = await LinkTree.findOne({ user: userDoc._id });
      if (!tree && userDoc.username) {
        tree = new LinkTree({
          user: userDoc._id,
          title: userDoc.name ? `${userDoc.name}'s Links` : "My Links",
          profilePicture: userDoc.image || "",
          template: "classic",
          socialLinks: [],
        });
        await tree.save();
      }

      return NextResponse.json(
        {
          loggedIn: true,
          user: {
            id: decoded.id,
            username: userDoc.username,
            email: decoded.email,
            name: userDoc.name || "",
            image: userDoc.image || "", // Expose legacy user avatar if configured
          },
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
