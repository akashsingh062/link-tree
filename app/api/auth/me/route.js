import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
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
