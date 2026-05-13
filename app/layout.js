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
  title: "Linkify — One link for everything",
  description: "Share everything you create, curate and sell with a single bio link.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
