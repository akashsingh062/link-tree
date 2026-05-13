import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { User } from "@/lib/model/User";
import { NextResponse } from "next/server";

// GET: Fetch a public link tree by username
export async function GET(request, { params }) {
  await connectDB();

  const { username } = await params;

  try {
    // Find the user by username first, then get their tree
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "Link tree not found" },
        { status: 404 }
      );
    }

    const tree = await LinkTree.findOne({ user: user._id });
    if (!tree) {
      return NextResponse.json(
        { message: "Link tree not found" },
        { status: 404 }
      );
    }

    // Merge username into the tree response
    const treeObj = tree.toObject();
    treeObj.username = user.username;

    return NextResponse.json({ tree: treeObj }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tree/[username] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
