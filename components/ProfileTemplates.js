"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlatformIcon } from "@/components/PlatformIcons";
import ProfileAvatar from "@/components/ProfileAvatar";

// ─── Template 1: Classic ───
// Dark navy bg, lime accents, current design
function ClassicTemplate({ tree }) {
  return (
    <main className="flex-1 bg-navy min-h-screen relative overflow-hidden">
      <div className="absolute top-20 left-10 w-96 h-96 bg-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <ProfileAvatar
          src={tree.profilePicture}
          fallbackLetter={tree.username?.charAt(0)?.toUpperCase() || "?"}
          className="w-28 h-28 rounded-full overflow-hidden bg-lime flex items-center justify-center text-navy text-4xl font-extrabold shadow-xl shadow-lime/20 mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-lime text-center tracking-tight">
          {tree.title}
        </h1>
        <p className="text-sm font-semibold text-lime/50 mt-1 mb-8">@{tree.username}</p>
        <div className="w-full space-y-3">
          {tree.socialLinks?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-lime/10 border border-lime/15 text-lime transition-all duration-300 hover:bg-lime hover:text-navy hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime/20">
              <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-sm font-bold truncate">{link.label?.trim() ? link.label : link.platform}</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
        <Branding />
      </div>
    </main>
  );
}

// ─── Template 2: Minimal ───
// Clean white bg, soft shadows, elegant typography
function MinimalTemplate({ tree }) {
  return (
    <main className="flex-1 min-h-screen bg-stone-50">
      <div className="max-w-md mx-auto px-4 py-16 sm:py-20 flex flex-col items-center">
        <ProfileAvatar
          src={tree.profilePicture}
          fallbackLetter={tree.username?.charAt(0)?.toUpperCase() || "?"}
          className="w-28 h-28 rounded-full overflow-hidden bg-stone-900 flex items-center justify-center text-white text-3xl font-light mb-5"
        />
        <h1 className="text-xl font-medium text-stone-900 text-center tracking-tight">
          {tree.title}
        </h1>
        <p className="text-xs font-medium text-stone-400 mt-1 mb-10 tracking-wider uppercase">@{tree.username}</p>
        <div className="w-full space-y-2.5">
          {tree.socialLinks?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full px-5 py-4 rounded-xl bg-white border border-stone-200 text-stone-800 transition-all duration-300 hover:border-stone-400 hover:shadow-md hover:-translate-y-0.5">
              <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0 text-stone-500 group-hover:text-stone-800 transition-colors" />
              <span className="flex-1 text-sm font-medium truncate">{link.label?.trim() ? link.label : link.platform}</span>
              <svg className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          ))}
        </div>
        <Branding dark />
      </div>
    </main>
  );
}

// ─── Template 3: Gradient ───
// Vibrant gradient bg, glassmorphic cards
function GradientTemplate({ tree }) {
  return (
    <main className="flex-1 min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2cpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] pointer-events-none" />
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <ProfileAvatar
          src={tree.profilePicture}
          fallbackLetter={tree.username?.charAt(0)?.toUpperCase() || "?"}
          className="w-28 h-28 rounded-full overflow-hidden bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center text-white text-4xl font-extrabold mb-4 shadow-2xl"
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
          {tree.title}
        </h1>
        <p className="text-sm font-semibold text-white/60 mt-1 mb-8">@{tree.username}</p>
        <div className="w-full space-y-3">
          {tree.socialLinks?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10">
              <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-sm font-bold truncate">{link.label?.trim() ? link.label : link.platform}</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
        <Branding />
      </div>
    </main>
  );
}

// ─── Template 4: Neon ───
// Dark bg with neon glow effects
function NeonTemplate({ tree }) {
  return (
    <main className="flex-1 min-h-screen bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <ProfileAvatar
          src={tree.profilePicture}
          fallbackLetter={tree.username?.charAt(0)?.toUpperCase() || "?"}
          className="w-28 h-28 rounded-full overflow-hidden bg-zinc-900 border-2 border-cyan-400/50 flex items-center justify-center text-cyan-400 text-4xl font-extrabold mb-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight">
          {tree.title}
        </h1>
        <p className="text-sm font-semibold text-cyan-400/50 mt-1 mb-8">@{tree.username}</p>
        <div className="w-full space-y-3">
          {tree.socialLinks?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-0.5">
              <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-sm font-bold truncate">{link.label?.trim() ? link.label : link.platform}</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
        <Branding />
      </div>
    </main>
  );
}

// ─── Template 5: Custom ───
// User-defined background (color, gradient, or image)
function getCustomBgStyle(customBg) {
  if (!customBg) return { backgroundColor: "#1f232f" };
  const { bgType, color1, color2, imageUrl } = customBg;
  switch (bgType) {
    case "gradient":
      return { background: `linear-gradient(135deg, ${color1 || "#1f232f"}, ${color2 || "#304e21"})` };
    case "image":
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    case "color":
    default:
      return { backgroundColor: color1 || "#1f232f" };
  }
}

function CustomTemplate({ tree }) {
  const bg = tree.customBg || {};
  const isLight = bg.textColor === "dark";
  const textMain = isLight ? "text-gray-900" : "text-white";
  const textSub = isLight ? "text-gray-500" : "text-white/50";
  const cardBg = isLight
    ? "bg-black/5 border-black/10 text-gray-900 hover:bg-black/10"
    : "bg-white/10 border-white/15 text-white hover:bg-white/20";
  const avatarBg = isLight
    ? "bg-gray-900 text-white"
    : "bg-white/20 text-white border-2 border-white/30";

  // For color/gradient use inline style, for image use <img> tag
  const bgStyle = bg.bgType === "image" ? {} : getCustomBgStyle(bg);

  return (
    <main className="flex-1 min-h-screen relative overflow-hidden" style={bgStyle}>
      {/* Image background — using <img> for cross-origin reliability */}
      {bg.bgType === "image" && bg.imageUrl && (
        <>
          <img
            src={bg.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </>
      )}
      <div className="relative z-10 max-w-md mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <ProfileAvatar
          src={tree.profilePicture}
          fallbackLetter={tree.username?.charAt(0)?.toUpperCase() || "?"}
          className={`w-28 h-28 rounded-full overflow-hidden flex items-center justify-center text-4xl font-extrabold mb-4 shadow-xl ${avatarBg}`}
        />
        <h1 className={`text-2xl sm:text-3xl font-extrabold text-center tracking-tight ${textMain}`}>
          {tree.title}
        </h1>
        <p className={`text-sm font-semibold mt-1 mb-8 ${textSub}`}>@{tree.username}</p>
        <div className="w-full space-y-3">
          {tree.socialLinks?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className={`group flex items-center gap-4 w-full px-5 py-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${cardBg}`}>
              <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0" />
              <span className="flex-1 text-sm font-bold truncate">{link.label?.trim() ? link.label : link.platform}</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
        <Branding dark={isLight} />
      </div>
    </main>
  );
}

// ─── Shared Branding ───
function Branding({ dark = false }) {
  return (
    <div className="mt-12 mb-4">
      <Link href="/"
        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
          dark
            ? "text-stone-300 hover:text-stone-500"
            : "text-white/30 hover:text-white/60"
        }`}>
        🔗 Made with Linkify
      </Link>
    </div>
  );
}

// ─── Template Renderer ───
export default function ProfileTemplate({ tree }) {
  switch (tree.template) {
    case "minimal":
      return <MinimalTemplate tree={tree} />;
    case "gradient":
      return <GradientTemplate tree={tree} />;
    case "neon":
      return <NeonTemplate tree={tree} />;
    case "custom":
      return <CustomTemplate tree={tree} />;
    case "classic":
    default:
      return <ClassicTemplate tree={tree} />;
  }
}

// ─── Template Metadata (for the selector UI) ───
export const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    desc: "Dark & clean",
    preview: { bg: "bg-navy", accent: "bg-lime", text: "text-lime" },
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Light & elegant",
    preview: { bg: "bg-stone-50", accent: "bg-stone-900", text: "text-stone-900" },
  },
  {
    id: "gradient",
    name: "Gradient",
    desc: "Vibrant & bold",
    preview: { bg: "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400", accent: "bg-white/30", text: "text-white" },
  },
  {
    id: "neon",
    name: "Neon",
    desc: "Dark & glowing",
    preview: { bg: "bg-zinc-950", accent: "bg-zinc-800 border border-cyan-400/50", text: "text-cyan-400" },
  },
  {
    id: "custom",
    name: "Custom",
    desc: "Your own style",
    preview: { bg: "bg-gradient-to-br from-rose-500 to-indigo-600", accent: "bg-white/30", text: "text-white" },
    isCustom: true,
  },
];

export { getCustomBgStyle };
