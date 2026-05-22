import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen bg-linear-to-br from-lime via-lime-light to-lime relative overflow-hidden px-4">
      <head>
        <title>Page Not Found | Linkify</title>
        <meta name="description" content="The page you're looking for doesn't exist. Create your free link-in-bio page on Linkify." />
        <meta name="robots" content="noindex, follow" />
      </head>
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        {/* Glass card */}
        <div className="bg-white/50 backdrop-blur-2xl border border-forest/10 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-navy/5 text-center">
          {/* 404 illustration */}
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full bg-navy/10 flex items-center justify-center mx-auto">
              <span className="text-6xl">404</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
            Page not found
          </h1>
          <p className="text-forest-light leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-lime bg-navy rounded-full transition-all duration-300 hover:bg-forest hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/20"
            >
              Go Home
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-navy rounded-full border-2 border-navy/20 transition-all duration-200 hover:border-navy hover:bg-navy/5"
            >
              Create your Linkify
            </Link>
          </div>
        </div>

        {/* Branding */}
        <p className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest-light/50 hover:text-forest transition-colors uppercase tracking-widest"
          >
            <Image
              src="/logo.svg"
              alt="Linkify — free link-in-bio tool"
              width={20}
              height={20}
              className="rounded"
            />
            Linkify
          </Link>
        </p>
      </div>
    </main>
  );
}
