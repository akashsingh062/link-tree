"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Create", href: "/create" },
  ];

  // Re-check auth status on every route change
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-lime/80 border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.svg"
              alt="Linkify"
              className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-extrabold text-navy tracking-tight">
              Linkify
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-forest rounded-lg transition-all duration-200 hover:text-navy hover:bg-forest/8"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Area */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              /* Skeleton placeholder while checking auth */
              <div className="flex items-center gap-3">
                <div className="w-16 h-8 rounded-full bg-forest/10 animate-pulse" />
                <div className="w-20 h-8 rounded-full bg-forest/10 animate-pulse" />
              </div>
            ) : user ? (
              /* Logged in — show avatar + dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border-2 border-forest/15 transition-all duration-200 hover:border-navy hover:bg-forest/5"
                >
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-lime text-xs font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-navy max-w-[100px] truncate">
                    {user.username}
                  </span>
                  <svg
                    className={`w-4 h-4 text-forest transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-xl bg-white border border-forest/10 shadow-xl shadow-navy/10 transition-all duration-200 origin-top-right ${
                    dropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-forest/10">
                    <p className="text-sm font-bold text-navy truncate">
                      @{user.username}
                    </p>
                    <p className="text-xs text-forest-light truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      href="/create"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-forest hover:text-navy hover:bg-lime-light/40 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      My Links
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                      </svg>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Not logged in — show Login & Signup */
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-semibold text-forest rounded-full border-2 border-forest/30 transition-all duration-200 hover:border-navy hover:text-navy hover:shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-bold text-lime rounded-full bg-navy transition-all duration-200 hover:bg-forest hover:shadow-lg hover:shadow-navy/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-forest hover:bg-forest/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-5 pt-2 space-y-1 border-t border-forest/10">
          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-forest rounded-lg transition-colors hover:text-navy hover:bg-forest/8"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-forest/10 my-2" />

          {loading ? (
            <div className="space-y-2 pt-2">
              <div className="h-11 rounded-full bg-forest/10 animate-pulse" />
              <div className="h-11 rounded-full bg-forest/10 animate-pulse" />
            </div>
          ) : user ? (
            /* Mobile — Logged in */
            <>
              {/* User info card */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-lime text-sm font-bold shrink-0">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy truncate">
                    @{user.username}
                  </p>
                  <p className="text-xs text-forest-light truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/create"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-navy rounded-full border-2 border-forest/15 transition-colors hover:border-navy hover:bg-forest/5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                My Links
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 rounded-full border-2 border-red-200 transition-colors hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
                Log out
              </button>
            </>
          ) : (
            /* Mobile — Not logged in */
            <div className="pt-1 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-semibold text-forest rounded-full border-2 border-forest/30 transition-colors hover:border-navy hover:text-navy"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 text-sm font-bold text-lime rounded-full bg-navy transition-colors hover:bg-forest"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;