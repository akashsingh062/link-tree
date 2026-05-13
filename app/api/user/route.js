import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, username, password } = await request.json();

    // Validate required fields
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Block reserved usernames that conflict with app routes
    const RESERVED_USERNAMES = [
      "admin", "api", "login", "signup", "create", "about",
      "settings", "dashboard", "profile", "help", "support",
    ];
    if (RESERVED_USERNAMES.includes(username.toLowerCase().trim())) {
      return NextResponse.json(
        { message: "This username is reserved. Please choose another." },
        { status: 400 }
      );
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: "This username is already taken" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      username: username.toLowerCase().replace(/\s/g, ""),
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { name: user.name, username: user.username, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
