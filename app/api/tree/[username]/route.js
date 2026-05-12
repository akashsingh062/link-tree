import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { NextResponse } from "next/server";

// GET: Fetch a public link tree by username
export async function GET(request, { params }) {
  await connectDB();

  const { username } = await params;

  try {
    const tree = await LinkTree.findOne({ username });

    if (!tree) {
      return NextResponse.json(
        { message: "Link tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ tree }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tree/[username] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
