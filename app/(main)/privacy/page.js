import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Linkify",
  description:
    "Privacy Policy for Linkify. Learn how we collect, use, and safeguard your data. Linkify is a privacy-first, secure link-in-bio tool.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 border-b border-forest/10">
        {/* Glow blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-lime-dark/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-forest/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-widest mb-6">
            Legal & Security
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-forest-light max-w-lg mx-auto">
            Last Updated: May 22, 2026. Your privacy and trust are our top priorities.
          </p>
        </div>
      </section>

      {/* ───── Content ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-navy max-w-none text-forest-light space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed">
                Linkify is designed to be a privacy-first link-in-bio utility. We only collect the minimal required information necessary to provide and secure our service:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Account Information:</strong> When you sign up, we store your username, email, and securely hashed passwords.</li>
                <li><strong>Profile Details:</strong> We store the links, customized page templates, colors, text labels, and profile picture URLs you configure.</li>
                <li><strong>Usage Data:</strong> We do not employ invasive tracking cookies. We log standard error/traffic patterns to maintain server health and performance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the data we collect solely to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Display your public custom link-in-bio page correctly to your visitors.</li>
                <li>Authenticate your identity when signing in.</li>
                <li>Improve application performance, load times, and resolve system issues.</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                We <strong>never sell, lease, or distribute</strong> your email address or profile details to third-party advertisers or data brokers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">3. Public Data Exposure</h2>
              <p className="leading-relaxed">
                By design, any links, text descriptions, and branding details you add to your profile page are <strong>completely public</strong> and accessible to anyone on the internet, including search engine web crawlers. Please avoid sharing sensitive or confidential credentials on your public page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Cookies and Sessions</h2>
              <p className="leading-relaxed">
                Linkify uses highly secure, industry-standard HTTP-only cookies to keep you securely signed in while editing your link dashboard. These cookies do not track your browsing behavior across other websites.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal account details, feel free to open a ticket or contact us via our official support channels:
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="https://github.com/akashsingh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-lime bg-navy rounded-full hover:bg-forest transition-colors"
                >
                  Contact Support
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
