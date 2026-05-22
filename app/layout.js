import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Linkify — Free Link-in-Bio Tool | One Link for Everything",
    template: "%s | Linkify",
  },
  description:
    "Create your free link-in-bio page in seconds. Share all your social media, portfolio, and content with one customizable URL. No coding needed.",
  keywords: [
    "link in bio",
    "linktree alternative",
    "bio link",
    "link page",
    "social media links",
    "free linktree",
    "bio link tool",
    "link in bio tool free",
    "one link for everything",
  ],
  authors: [{ name: "Akash Singh", url: "https://github.com/akashsingh062" }],
  creator: "Akash Singh",
  metadataBase: new URL("https://linkify-ak.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linkify-ak.vercel.app",
    siteName: "Linkify",
    title: "Linkify — Free Link-in-Bio Tool | One Link for Everything",
    description:
      "Create your free link-in-bio page in seconds. Share all your social media, portfolio, and content with one customizable URL.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Linkify — Your links. One page. Zero friction.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkify — Free Link-in-Bio Tool",
    description:
      "One link to share everything. Create your free bio link page in seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlee07843d3e8ac66fc",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Linkify",
                  url: "https://linkify-ak.vercel.app",
                  logo: "https://linkify-ak.vercel.app/logo.svg",
                  description:
                    "Free link-in-bio tool. One link for everything you create, curate, and sell.",
                  founder: {
                    "@type": "Person",
                    name: "Akash Singh",
                    url: "https://github.com/akashsingh062",
                  },
                  sameAs: [
                    "https://github.com/akashsingh062",
                    "https://linkedin.com/in/akashsingh062",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Linkify",
                  url: "https://linkify-ak.vercel.app",
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://linkify-ak.vercel.app/{username}",
                    "query-input": "required name=username",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Linkify",
                  applicationCategory: "WebApplication",
                  operatingSystem: "Web",
                  url: "https://linkify-ak.vercel.app",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  description:
                    "Free link-in-bio tool to create your custom link page with 5 premium templates.",
                  featureList: [
                    "5 customizable templates",
                    "Custom backgrounds and gradients",
                    "Unlimited links",
                    "Profile pictures",
                    "Live preview editor",
                    "Mobile-first responsive design",
                  ],
                },
              ],
            }),
          }}
        />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(31, 35, 47, 0.95)',
              backdropFilter: 'blur(12px)',
              color: '#e4f08c',
              borderRadius: '16px',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid rgba(214, 231, 82, 0.15)',
              boxShadow: '0 20px 40px rgba(31, 35, 47, 0.4)',
              maxWidth: '420px',
            },
            success: {
              iconTheme: {
                primary: '#d6e752',
                secondary: '#1f232f',
              },
              style: {
                border: '1px solid rgba(214, 231, 82, 0.25)',
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171',
                secondary: '#1f232f',
              },
              style: {
                color: '#fca5a5',
                border: '1px solid rgba(248, 113, 113, 0.25)',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
