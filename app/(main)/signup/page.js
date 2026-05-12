"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-lime-dark/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-forest/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/logo.svg" alt="Linkify" className="w-8 h-8 rounded-lg" />
            <span className="text-2xl font-extrabold text-navy">Linkify</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Create your Linkify
          </h1>
          <p className="mt-2 text-forest-light">
            Free forever. Set up in 30 seconds.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-8 shadow-xl shadow-navy/5"
        >
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-navy mb-1.5"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-navy mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-navy mb-1.5"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-light/50 text-xs sm:text-sm font-medium">
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
                className="w-full pl-20 sm:pl-24 pr-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-navy mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
            <p className="mt-1.5 text-xs text-forest-light/50">
              Must be at least 6 characters
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-navy text-lime font-bold text-sm transition-all duration-200 hover:bg-forest hover:shadow-lg hover:shadow-navy/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-forest/10" />
            <span className="text-xs font-medium text-forest-light/60">or</span>
            <div className="flex-1 h-px bg-forest/10" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-forest-light">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-navy hover:text-forest transition-colors underline underline-offset-2"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
