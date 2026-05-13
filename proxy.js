import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = ["/create"];

  // Routes that logged-in users should NOT access (redirect to /create)
  const authRoutes = ["/login", "/signup"];

  // If trying to access a protected route without a token → redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and trying to access login/signup → redirect to /create
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/create", request.url));
    }
  }

  return NextResponse.next();
}

// Only run proxy on these paths (skip static files, api routes, etc.)
export const config = {
  matcher: ["/create/:path*", "/login", "/signup"],
};
