import Link from "next/link";

export const metadata = {
  title: "About — Linkify",
  description:
    "Learn how Linkify helps creators, influencers, and businesses share everything they do with a single bio link.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-16 -left-20 w-80 h-80 bg-forest/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-dark/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-widest mb-6">
            The Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight">
            Built solo.
            <br />
            Built with <span className="text-forest">passion</span>.
          </h1>
          <p className="mt-6 text-lg text-forest-light max-w-xl mx-auto leading-relaxed">
            Linkify is a passion project by Akash Singh — designed and
            developed from scratch in a single day to solve the
            &quot;too many links&quot; problem every creator faces.
          </p>
        </div>
      </section>

      {/* ───── Mission ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual card */}
          <div className="relative rounded-3xl bg-navy p-10 sm:p-14 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-lime/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-forest/10 rounded-full blur-2xl pointer-events-none" />
            <p className="relative z-10 text-5xl sm:text-6xl font-extrabold text-lime leading-tight">
              One link.
              <br />
              Infinite
              <br />
              <span className="text-lime-light/70">possibilities.</span>
            </p>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-6">
              Why I Built This
            </h2>
            <div className="space-y-4 text-forest-light leading-relaxed">
              <p>
                As a developer and content creator, I was tired of juggling
                dozens of links across bios, profiles, and social posts. I
                wanted a clean, fast, and customizable link-in-bio tool that
                I could actually control.
              </p>
              <p>
                So I built Linkify — a full-stack Next.js application with
                custom templates, profile pictures, gradient backgrounds, and
                a real-time live preview editor. All free, all open.
              </p>
              <p>
                No bloat. No subscriptions. Just a beautiful page that
                connects your audience to everything you do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Values ───── */}
      <section className="py-16 sm:py-24 px-4 bg-navy text-lime relative overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-12 sm:h-16"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,0 900,80 1200,20 L1200,0 L0,0 Z"
              fill="rgb(214,231,82)"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto pt-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What I stand for
            </h2>
            <p className="mt-3 text-lime-light/60 text-lg max-w-lg mx-auto">
              The principles that guided every line of code.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "✨",
                title: "Simplicity",
                desc: "Great tools should get out of your way. Every feature is designed to be intuitive.",
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                desc: "Your link page is your brand. It should look premium, not generic.",
              },
              {
                icon: "⚡",
                title: "Performance",
                desc: "Built with Next.js for blazing-fast load times. No one likes a slow page.",
              },
              {
                icon: "🔐",
                title: "Privacy",
                desc: "Your data belongs to you. No tracking scripts, no third-party analytics.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group p-6 rounded-2xl bg-navy-light/50 border border-lime/10 transition-all duration-300 hover:bg-navy-light/80 hover:border-lime/25 hover:-translate-y-1"
              >
                <span className="text-3xl block mb-4 transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </span>
                <h3 className="text-lg font-bold text-lime mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-lime-light/60 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-12 sm:h-16"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,0 900,80 1200,20 L1200,0 L0,0 Z"
              fill="rgb(214,231,82)"
            />
          </svg>
        </div>
      </section>

      {/* ───── Build Journey ───── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight text-center mb-16">
            The Build Journey
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-navy/15 -translate-x-1/2" />

            {[
              {
                time: "Morning",
                title: "The Spark",
                desc: "Woke up with an idea — build a Linktree alternative from scratch. Set up Next.js, MongoDB, and the authentication system.",
              },
              {
                time: "Midday",
                title: "Core Features",
                desc: "Built the link editor with live phone preview, platform icons, and the template system with 4 unique themes.",
              },
              {
                time: "Afternoon",
                title: "Custom Templates",
                desc: "Added the custom template engine — solid colors, gradients, and image backgrounds with a full visual editor.",
              },
              {
                time: "Evening",
                title: "Polish & Ship",
                desc: "Profile pictures, custom link labels, toast notifications, the 7-day username lock, and final design polish. Shipped it.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  i % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-navy rounded-full border-4 border-lime -translate-x-1/2 mt-1.5 z-10" />

                {/* Card */}
                <div
                  className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"
                  }`}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-bold mb-2">
                    {item.time}
                  </span>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-forest-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Solo Dev ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Built by one developer,
            <br />
            for every creator.
          </h2>
          <p className="text-forest-light text-lg max-w-xl mx-auto mb-12">
            Linkify is a solo project — designed, coded, and shipped by me.
          </p>

          <div className="inline-block">
            <div className="group text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-navy flex items-center justify-center text-lime font-extrabold text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-navy/20">
                AS
              </div>
              <p className="mt-4 font-bold text-navy text-lg">
                Akash Singh
              </p>
              <p className="text-sm text-forest-light">
                Full-Stack Developer
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href="https://github.com/akashsingh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-navy/10 text-navy hover:bg-navy hover:text-lime transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/akashsingh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-navy/10 text-navy hover:bg-navy hover:text-lime transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Tech Stack ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight text-center mb-12">
            Built With
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Next.js", desc: "React Framework" },
              { name: "MongoDB", desc: "Database" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Vercel", desc: "Deployment" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-forest/10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5"
              >
                <p className="font-bold text-navy text-lg">{tech.name}</p>
                <p className="text-xs text-forest-light mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy rounded-3xl p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-forest/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-lime tracking-tight">
            Try Linkify for yourself
          </h2>
          <p className="relative z-10 mt-4 text-lime-light/70 text-lg max-w-lg mx-auto">
            Create your personal link page in under a minute. Completely free.
          </p>
          <Link
            href="/signup"
            className="relative z-10 inline-flex items-center gap-2 mt-8 px-8 py-4 text-base font-bold text-navy bg-lime rounded-full transition-all duration-300 hover:bg-lime-light hover:shadow-2xl hover:shadow-lime/30 hover:-translate-y-1 active:translate-y-0"
          >
            Get Started Free
            <svg
              className="w-5 h-5"
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
        </div>
      </section>
    </main>
  );
}
