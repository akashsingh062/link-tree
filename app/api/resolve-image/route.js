import { NextResponse } from "next/server";

// GET /api/resolve-image?url=https://pin.it/...
// Follows redirects, checks if URL is a direct image, or extracts og:image from HTML
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { message: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the URL, following all redirects
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Linkify/1.0; +https://link-tree-rho-dun.vercel.app)",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Could not fetch the URL" },
        { status: 400 }
      );
    }

    const contentType = res.headers.get("content-type") || "";

    // If the final URL is already a direct image, return it
    if (contentType.startsWith("image/")) {
      return NextResponse.json({ imageUrl: res.url }, { status: 200 });
    }

    // Otherwise, parse the HTML and look for og:image
    const html = await res.text();

    // Try og:image first
    let match = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
    );

    // Try alternate attribute order: content before property
    if (!match) {
      match = html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i
      );
    }

    // Try twitter:image as fallback
    if (!match) {
      match = html.match(
        /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i
      );
    }
    if (!match) {
      match = html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i
      );
    }

    if (match && match[1]) {
      let imageUrl = match[1];

      // Handle relative URLs
      if (imageUrl.startsWith("//")) {
        imageUrl = "https:" + imageUrl;
      } else if (imageUrl.startsWith("/")) {
        const origin = new URL(res.url).origin;
        imageUrl = origin + imageUrl;
      }

      return NextResponse.json({ imageUrl }, { status: 200 });
    }

    return NextResponse.json(
      { message: "No image found at this URL. Try pasting a direct image link instead." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Resolve image error:", error);
    return NextResponse.json(
      { message: "Could not resolve image from this URL" },
      { status: 500 }
    );
  }
}
