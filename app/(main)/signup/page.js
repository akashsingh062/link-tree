"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/create",
      });
    } catch (err) {
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Auto-login after signup
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (loginRes.ok) {
        toast.success("Account created successfully!");
        window.location.href = "/create";
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative floating blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-lime-dark/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest/20 rounded-full blur-3xl pointer-events-none animate-float [animation-delay:2s]" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-navy-light/10 rounded-full blur-2xl pointer-events-none animate-float [animation-delay:1s]" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glowing border card container */}
        <div className="relative p-[1.5px] overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(31,35,47,0.35)] bg-forest/10 backdrop-blur-xl group hover:shadow-[0_20px_50px_rgba(214,231,82,0.15)] transition-all duration-300">
          
          {/* Rotating gradient highlight */}
          <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_15%,var(--lime)_35%,transparent_55%,var(--lime-light)_75%,transparent_95%)] opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-spin-border pointer-events-none" />

          {/* Form Card */}
          <div className="relative z-10 bg-navy/95 rounded-[22.5px] p-8 sm:p-10 text-white flex flex-col">
            
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5 hover:scale-102 transition-transform duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Linkify" className="w-8 h-8 rounded-lg shadow-md shadow-lime/20" />
                <span className="text-2xl font-extrabold text-lime tracking-tight">Linkify</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create your Linkify
              </h1>
              <p className="mt-1.5 text-sm text-lime-light/60 font-medium">
                Free forever. Set up in 30 seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Social Sign In Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="w-full py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Sign up with Google
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  className="w-full py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  Sign up with GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs font-bold uppercase tracking-wider text-lime-light/35">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-lime-light/80 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none transition-all duration-300 focus:border-lime focus:ring-4 focus:ring-lime/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-lime-light/80 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none transition-all duration-300 focus:border-lime focus:ring-4 focus:ring-lime/10"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-lime-light/80 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lime font-extrabold text-sm select-none">
                    linkify/
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    className="w-full pl-20 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none transition-all duration-300 focus:border-lime focus:ring-4 focus:ring-lime/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-lime-light/80 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm font-medium outline-none transition-all duration-300 focus:border-lime focus:ring-4 focus:ring-lime/10"
                  />
                </div>
                <p className="mt-1.5 text-xs text-lime-light/40">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-lime text-navy font-bold text-sm transition-all duration-300 hover:bg-lime-light hover:shadow-lg hover:shadow-lime/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-white/50 font-medium mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-lime hover:text-lime-light transition-colors underline underline-offset-2"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
