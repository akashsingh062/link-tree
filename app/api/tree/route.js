import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { User } from "@/lib/model/User";
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

// Helper: merge username from User doc into tree response object
function treeWithUsername(tree, username) {
  const obj = tree.toObject();
  obj.username = username;
  return obj;
}

// Reserved usernames that conflict with app routes
const RESERVED_USERNAMES = [
  "admin", "api", "login", "signup", "create", "about",
  "settings", "dashboard", "profile", "help", "support",
];

// Helper: validate and apply a username change on the User model.
// Returns { userDoc, error? }
async function handleUsernameChange(userId, newUsername) {
  const userDoc = await User.findById(userId);

  if (!newUsername.trim()) {
    return { error: { message: "Username cannot be empty", status: 400 } };
  }

  // No change needed
  if (newUsername === userDoc.username) {
    return { userDoc };
  }

  // 7-day restriction
  if (userDoc.lastUsernameChange) {
    const daysSince = (new Date() - new Date(userDoc.lastUsernameChange)) / (1000 * 60 * 60 * 24);
    if (daysSince < 7) {
      return {
        error: {
          message: `You can only change your username once every 7 days. Please wait ${Math.ceil(7 - daysSince)} more days.`,
          status: 400,
        },
      };
    }
  }

  // Reserved check
  if (RESERVED_USERNAMES.includes(newUsername.toLowerCase().trim())) {
    return { error: { message: "This username is reserved. Please choose another.", status: 400 } };
  }

  // Uniqueness check
  const taken = await User.findOne({ username: newUsername });
  if (taken) {
    return { error: { message: "This username is already taken", status: 400 } };
  }

  // Apply change
  userDoc.username = newUsername;
  userDoc.lastUsernameChange = new Date();
  await userDoc.save();

  return { userDoc, changed: true };
}

// Helper: set a fresh JWT cookie on the response after username change
function refreshJwtCookie(response, userDoc) {
  const token = jwt.sign(
    { id: userDoc._id, username: userDoc.username, email: userDoc.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
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

    // Resolve current username from User model
    const userDoc = await User.findById(user.id).select("username");

    return NextResponse.json(
      { tree: treeWithUsername(tree, userDoc.username) },
      { status: 200 }
    );
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

    // If a different username was provided, update it on the User model
    let userDoc = await User.findById(user.id);
    let usernameChanged = false;

    if (body.username && body.username !== userDoc.username) {
      const result = await handleUsernameChange(user.id, body.username);
      if (result.error) {
        return NextResponse.json(
          { message: result.error.message },
          { status: result.error.status }
        );
      }
      userDoc = result.userDoc;
      usernameChanged = result.changed || false;
    }

    const tree = new LinkTree({
      user: user.id,
      title: body.title || "My Links",
      profilePicture: body.profilePicture || "",
      template: body.template || "classic",
      ...(body.customBg && { customBg: body.customBg }),
      socialLinks: body.socialLinks || [],
    });

    await tree.save();

    const response = NextResponse.json(
      { message: "Link tree created successfully", tree: treeWithUsername(tree, userDoc.username) },
      { status: 201 }
    );

    // Re-issue JWT if username was changed
    if (usernameChanged) {
      refreshJwtCookie(response, userDoc);
    }

    return response;
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
    let userDoc = await User.findById(user.id);
    let usernameChanged = false;

    // Handle username change on the User model
    if (body.username !== undefined) {
      if (!body.username.trim()) {
        return NextResponse.json(
          { message: "Username cannot be empty" },
          { status: 400 }
        );
      }

      if (body.username !== userDoc.username) {
        const result = await handleUsernameChange(user.id, body.username);
        if (result.error) {
          return NextResponse.json(
            { message: result.error.message },
            { status: result.error.status }
          );
        }
        userDoc = result.userDoc;
        usernameChanged = result.changed || false;
      }
    }

    // Update tree fields
    if (body.title !== undefined) tree.title = body.title;
    if (body.profilePicture !== undefined) tree.profilePicture = body.profilePicture;
    if (body.template !== undefined) tree.template = body.template;
    if (body.customBg !== undefined) {
      tree.customBg = body.customBg;
      tree.markModified("customBg");
    }
    if (body.socialLinks !== undefined) tree.socialLinks = body.socialLinks;

    await tree.save();

    const response = NextResponse.json(
      { message: "Link tree updated successfully", tree: treeWithUsername(tree, userDoc.username) },
      { status: 200 }
    );

    // Re-issue JWT if username changed so session stays fresh
    if (usernameChanged) {
      refreshJwtCookie(response, userDoc);
    }

    return response;
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
