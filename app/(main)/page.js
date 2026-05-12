import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      {/* ───── Hero Section ───── */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-lime-dark/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-forest/8 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-navy animate-pulse" />
            One link to rule them all
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl lg:text-7xl font-extrabold text-navy leading-[1.08] tracking-tight">
            Your entire online{" "}
            <span className="text-forest">presence</span>
            <br className="hidden sm:block" />{" "}
            in one simple link
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 mt-6 text-lg sm:text-xl text-forest-light max-w-2xl mx-auto leading-relaxed">
            Share everything you create, curate and sell with a single bio link. Connect your audience to all of your content with just one URL.
          </p>

          {/* CTA Group */}
          <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-lime rounded-full bg-navy transition-all duration-300 hover:bg-forest hover:shadow-2xl hover:shadow-navy/25 hover:-translate-y-1 active:translate-y-0"
            >
              Get Started — it&apos;s free
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-navy rounded-full border-2 border-navy/25 transition-all duration-200 hover:border-navy hover:bg-navy/5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ───── How It Works ───── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Up and running in <span className="text-forest">3 steps</span>
            </h2>
            <p className="mt-4 text-forest-light text-lg max-w-xl mx-auto">
              No coding. No learning curve. Just claim, customize, and share.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Claim your link",
                desc: "Sign up and pick a unique username. Your page goes live instantly.",
              },
              {
                step: "02",
                title: "Add your links",
                desc: "Drop in your social profiles, portfolio, shop, or any URL. Give each one a custom name and icon.",
              },
              {
                step: "03",
                title: "Choose your style",
                desc: "Pick from 5 templates or create your own with custom colors, gradients, or image backgrounds.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-forest/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
              >
                <span className="text-5xl font-extrabold text-navy/10 group-hover:text-navy/20 transition-colors absolute top-4 right-6">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-navy mb-2 mt-4">
                  {item.title}
                </h3>
                <p className="text-sm text-forest-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Features Section ───── */}
      <section className="relative py-20 sm:py-28 bg-navy text-lime">
        {/* Subtle top wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0,60 C300,0 900,80 1200,20 L1200,0 L0,0 Z" fill="rgb(214,231,82)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Everything you need,<br />
              <span className="text-lime-light">nothing you don&apos;t.</span>
            </h2>
            <p className="mt-4 text-lime-light/70 text-lg max-w-xl mx-auto">
              Powerful features wrapped in a simple, beautiful interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Instant Setup",
                desc: "Claim your unique link and go live in under 60 seconds. No coding needed.",
              },
              {
                icon: "🎨",
                title: "5 Beautiful Templates",
                desc: "Classic, Minimal, Gradient, Neon, or fully Custom — pick the vibe that fits you.",
              },
              {
                icon: "🖼️",
                title: "Custom Backgrounds",
                desc: "Use solid colors, gradients, or any image as your profile background.",
              },
              {
                icon: "✏️",
                title: "Custom Link Names",
                desc: "Rename your links to anything — 'My Portfolio', 'Book a Call', or 'Latest Video'.",
              },
              {
                icon: "📱",
                title: "Mobile First",
                desc: "Looks stunning on every device. Optimized for the best mobile experience.",
              },
              {
                icon: "👤",
                title: "Profile Picture",
                desc: "Add your avatar to make your page personal. Displays beautifully on every template.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-navy-light/50 border border-lime/10 transition-all duration-300 hover:bg-navy-light/80 hover:border-lime/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-lime/5"
              >
                <span className="text-3xl block mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </span>
                <h3 className="text-lg font-bold text-lime mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-lime-light/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Template Showcase ───── */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Templates for every style
          </h2>
          <p className="text-forest-light text-lg max-w-xl mx-auto mb-14">
            Choose a preset or design your own — your page, your rules.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { name: "Classic", bg: "bg-navy", text: "text-lime", accent: "bg-lime" },
              { name: "Minimal", bg: "bg-stone-50 border border-stone-200", text: "text-stone-900", accent: "bg-stone-900" },
              { name: "Gradient", bg: "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400", text: "text-white", accent: "bg-white/30" },
              { name: "Neon", bg: "bg-zinc-950", text: "text-cyan-400", accent: "bg-zinc-800 border border-cyan-400/50" },
              { name: "Custom", bg: "bg-gradient-to-br from-rose-500 to-indigo-600", text: "text-white", accent: "bg-white/30" },
            ].map((t) => (
              <div key={t.name} className="group">
                <div className={`${t.bg} rounded-2xl p-5 aspect-[3/4] flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                  <div className={`w-10 h-10 rounded-full ${t.accent}`} />
                  <div className={`w-full h-2 rounded-full ${t.accent} opacity-60`} />
                  <div className={`w-3/4 h-2 rounded-full ${t.accent} opacity-40`} />
                </div>
                <p className={`mt-3 text-sm font-bold text-navy`}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA Banner ───── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy rounded-3xl p-10 sm:p-16 relative overflow-hidden animate-pulse-glow">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-forest/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-lime tracking-tight">
            Ready to simplify your links?
          </h2>
          <p className="relative z-10 mt-4 text-lime-light/70 text-lg max-w-lg mx-auto">
            Create your personal link page in under a minute. Free forever.
          </p>
          <Link
            href="/signup"
            className="relative z-10 inline-flex items-center gap-2 mt-8 px-8 py-4 text-base font-bold text-navy bg-lime rounded-full transition-all duration-300 hover:bg-lime-light hover:shadow-2xl hover:shadow-lime/30 hover:-translate-y-1 active:translate-y-0"
          >
            Create your Linkify
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
