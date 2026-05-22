import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Linkify",
  description:
    "Terms of Service for Linkify. Learn about your rights, rules, and guidelines for using the free link-in-bio platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="flex-1">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 border-b border-forest/10">
        {/* Glow blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-lime-dark/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-forest/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-widest mb-6">
            Rules & Terms
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-forest-light max-w-lg mx-auto">
            Last Updated: May 22, 2026. Please read our guidelines and usage agreements carefully.
          </p>
        </div>
      </section>

      {/* ───── Content ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-navy max-w-none text-forest-light space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By signing up for, accessing, or using the Linkify platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the application.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Account Registration & Conduct</h2>
              <p className="leading-relaxed">
                To create a custom bio page, you must register for an account using a valid email. You are responsible for safeguarding your password and account details:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>You agree not to claim usernames that are deceptively mimicking registered brands, individuals, or institutions with the intent to impersonate or mislead.</li>
                <li>You are solely responsible for all content, links, and text shared on your public profile page.</li>
                <li>You agree not to publish any links or materials that contain viruses, trojans, phishing hooks, or malicious scripts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">3. Prohibited Content</h2>
              <p className="leading-relaxed">
                Linkify is a clean, creator-friendly platform. Profiles containing or linking to the following types of content may be suspended or deleted immediately without prior notice:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Phishing, online scams, fraud schemes, or malware distribution sites.</li>
                <li>Illegal drugs, regulated firearms, or highly dangerous activities.</li>
                <li>Spamming schemes or deceptive advertising designed to inflate search rankings unnaturally.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Platform Availability & License</h2>
              <p className="leading-relaxed">
                Linkify is a free, open-source utility provided &quot;as-is&quot; without warranties of any kind. We reserve the right to modify, optimize, or temporarily suspend portions of the service to perform critical system maintenance or prevent security exploits.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Reaching Out</h2>
              <p className="leading-relaxed">
                If you find any profile violating these terms, or have questions about legal licensing, feel free to submit an issue on our official open-source repository:
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="https://github.com/akashsingh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-lime bg-navy rounded-full hover:bg-forest transition-colors"
                >
                  Report Violation
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-navy border border-navy/20 rounded-full hover:bg-navy/5 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
