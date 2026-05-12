import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Helper: extract user from JWT cookie
function getUser(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// ─── GET: Fetch the logged-in user's link tree ───
export async function GET(request) {
  await connectDB();
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const tree = await LinkTree.findOne({ user: user.id });

    if (!tree) {
      return NextResponse.json(
        { message: "No link tree found", tree: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ tree }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tree error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── POST: Create a new link tree for the logged-in user ───
export async function POST(request) {
  await connectDB();
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Check if user already has a link tree
    const existing = await LinkTree.findOne({ user: user.id });
    if (existing) {
      return NextResponse.json(
        { message: "Link tree already exists. Use PUT to update." },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if username handle is taken
    const handleTaken = await LinkTree.findOne({ username: body.username });
    if (handleTaken) {
      return NextResponse.json(
        { message: "This username handle is already taken" },
        { status: 400 }
      );
    }

    const tree = new LinkTree({
      user: user.id,
      title: body.title || "My Links",
      username: body.username,
      profilePicture: body.profilePicture || "",
      template: body.template || "classic",
      customBg: body.customBg || {},
      socialLinks: body.socialLinks || [],
    });

    await tree.save();

    return NextResponse.json(
      { message: "Link tree created successfully", tree },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/tree error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── PUT: Update the logged-in user's link tree ───
export async function PUT(request) {
  await connectDB();
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const tree = await LinkTree.findOne({ user: user.id });
    if (!tree) {
      return NextResponse.json(
        { message: "No link tree found. Create one first." },
        { status: 404 }
      );
    }

    const body = await request.json();

    // If username is being changed, check it's not taken by someone else and enforce 7-day rule
    if (body.username && body.username !== tree.username) {
      if (tree.lastUsernameChange) {
        const daysSinceLastChange = (new Date() - new Date(tree.lastUsernameChange)) / (1000 * 60 * 60 * 24);
        if (daysSinceLastChange < 7) {
          return NextResponse.json(
            { message: `You can only change your username once every 7 days. Please wait ${Math.ceil(7 - daysSinceLastChange)} more days.` },
            { status: 400 }
          );
        }
      }

      const handleTaken = await LinkTree.findOne({ username: body.username });
      if (handleTaken) {
        return NextResponse.json(
          { message: "This username handle is already taken" },
          { status: 400 }
        );
      }
      tree.username = body.username;
      tree.lastUsernameChange = new Date();
    }

    // Update fields
    if (body.title !== undefined) tree.title = body.title;
    if (body.profilePicture !== undefined) tree.profilePicture = body.profilePicture;
    if (body.template !== undefined) tree.template = body.template;
    if (body.customBg !== undefined) {
      tree.customBg = body.customBg;
      tree.markModified("customBg");
    }
    if (body.socialLinks !== undefined) tree.socialLinks = body.socialLinks;

    await tree.save();

    return NextResponse.json(
      { message: "Link tree updated successfully", tree },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/tree error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── DELETE: Delete the logged-in user's link tree ───
export async function DELETE(request) {
  await connectDB();
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const tree = await LinkTree.findOneAndDelete({ user: user.id });

    if (!tree) {
      return NextResponse.json(
        { message: "No link tree found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Link tree deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/tree error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
