import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // 1. Check Better Auth session first
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.json(
        {
          loggedIn: true,
          user: {
            id: session.user.id,
            username: session.user.username || "",
            email: session.user.email,
            name: session.user.name,
          },
        },
        { status: 200 }
      );
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
    return NextResponse.json(
      {
        loggedIn: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
