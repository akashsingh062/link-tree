export default function manifest() {
  return {
    name: "Linkify — Free Link-in-Bio Tool",
    short_name: "Linkify",
    description:
      "Create your free link-in-bio page in seconds. Share all your social media, portfolio, and content with one customizable URL. No coding needed.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f14",
    theme_color: "#d6e752",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
