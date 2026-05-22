export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/create"],
      },
    ],
    sitemap: "https://linkify-ak.vercel.app/sitemap.xml",
    host: "https://linkify-ak.vercel.app",
  };
}
