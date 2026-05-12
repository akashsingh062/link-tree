"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProfileTemplate from "@/components/ProfileTemplates";

export default function PublicProfilePage() {
  const { username } = useParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await fetch(`/api/tree/${username}`);
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setTree(data.tree);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchTree();
  }, [username]);

  // ─── Loading State ───
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-navy relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Animated logo */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-lime/10 border-2 border-lime/20 flex items-center justify-center animate-pulse">
              <span className="text-2xl">🔗</span>
            </div>
            {/* Spinning ring */}
            <svg
              className="absolute inset-0 w-16 h-16 animate-spin"
              style={{ animationDuration: "2s" }}
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32" cy="32" r="30"
                stroke="rgba(214, 231, 82, 0.15)"
                strokeWidth="2"
              />
              <path
                d="M32 2 A30 30 0 0 1 62 32"
                stroke="rgb(214, 231, 82)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-lime font-bold text-lg tracking-tight">
              Loading
            </p>
            <p className="text-lime/40 text-sm font-medium mt-1">
              @{username}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ─── Not Found State ───
  if (notFound || !tree) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-lime via-lime-light to-lime relative overflow-hidden px-4">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md w-full">
          {/* Glass card */}
          <div className="bg-white/50 backdrop-blur-2xl border border-forest/10 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-navy/5 text-center">
            {/* 404 illustration */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-navy/10 flex items-center justify-center mx-auto">
                <span className="text-5xl">🔍</span>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                !
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Page not found
            </h1>
            <p className="text-forest-light leading-relaxed mb-2">
              The link{" "}
              <span className="font-bold text-navy bg-navy/5 px-2 py-0.5 rounded-lg">
                /{username}
              </span>{" "}
              doesn&apos;t exist yet.
            </p>
            <p className="text-forest-light/60 text-sm mb-8">
              Maybe it&apos;s a typo, or this username hasn&apos;t been claimed.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-lime bg-navy rounded-full transition-all duration-300 hover:bg-forest hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/20"
              >
                Claim this username
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
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-navy rounded-full border-2 border-navy/20 transition-all duration-200 hover:border-navy hover:bg-navy/5"
              >
                Go Home
              </Link>
            </div>
          </div>

          {/* Branding */}
          <p className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-light/50 hover:text-forest transition-colors uppercase tracking-widest"
            >
              🔗 Linkify
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // ─── Background config per template ───
  const t = tree.template || "classic";
  const containerBg = {
    classic: "bg-[#0d0f14]",
    minimal: "bg-stone-100",
    gradient: "bg-[#1a0825]",
    neon: "bg-[#050507]",
    custom: "bg-[#0d0f14]",
  }[t];

  const glowOrbs = {
    classic: (
      <>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime/4 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-forest/4 rounded-full blur-[120px] pointer-events-none" />
      </>
    ),
    minimal: (
      <>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-stone-300/30 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-stone-200/40 rounded-full blur-[120px] pointer-events-none" />
      </>
    ),
    gradient: (
      <>
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-fuchsia-500/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />
      </>
    ),
    neon: (
      <>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[120px] pointer-events-none" />
      </>
    ),
    custom: (() => {
      const bg = tree.customBg || {};
      const c1 = bg.color1 || "#1f232f";
      return (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10" style={{ backgroundColor: c1 }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-8" style={{ backgroundColor: bg.color2 || c1 }} />
        </>
      );
    })(),
  }[t];

  const topBarText = t === "minimal" ? "text-stone-400 hover:text-stone-600" : "text-white/30 hover:text-white/60";
  const shareBtn = t === "minimal"
    ? "bg-stone-900/5 border-stone-300 text-stone-400 hover:text-stone-700 hover:bg-stone-900/10"
    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10";

  // ─── Render the user's selected template in a container ───
  return (
    <div className={`min-h-screen ${containerBg} relative overflow-hidden`}>
      {/* Ambient background glow */}
      {glowOrbs}

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between max-w-2xl mx-auto px-4 py-4">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors uppercase tracking-widest ${topBarText}`}
        >
          🔗 Linkify
        </Link>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            import("react-hot-toast").then(({ default: toast }) =>
              toast.success("Link copied!")
            );
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-semibold ${shareBtn}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Share
        </button>
      </div>

      {/* Rotating Glow Card */}
      <div className="relative z-10 max-w-lg mx-auto px-4 pb-8">
        <RotatingGlowCard>
          <ProfileTemplate tree={tree} />
        </RotatingGlowCard>
      </div>
    </div>
  );
}

// ─── Rotating Glow Border Card ───
function RotatingGlowCard({ children }) {
  const beamGradient = `conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 280deg,
    #ff6b6b 290deg,
    #ffd93d 310deg,
    #6bff6b 325deg,
    #6bd4ff 340deg,
    #d46bff 350deg,
    transparent 360deg
  )`;

  return (
    <div className="relative rounded-3xl">
      {/* Spinning beam — only the 2px border edge is visible */}
      <div className="absolute -inset-[2px] rounded-3xl overflow-hidden" aria-hidden>
        <div
          className="absolute inset-[-50%] w-[200%] h-[200%]"
          style={{
            background: beamGradient,
            animation: "spin-border 4s linear infinite",
          }}
        />
      </div>

      {/* Card content sits on top, covering the center */}
      <div className="relative z-10 rounded-3xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

