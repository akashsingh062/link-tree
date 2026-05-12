"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

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
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <footer className="bg-navy text-lime/60">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <img src="/logo.svg" alt="Linkify" className="w-7 h-7 rounded-md transition-transform duration-300 group-hover:scale-110" />
              <span className="font-extrabold text-lime text-lg">Linkify</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              One link to share everything you create, curate and sell online.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-lime uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Create", href: "/create" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold text-lime uppercase tracking-widest mb-4">
              Account
            </h4>
            <ul className="space-y-2.5">
              {user ? (
                <>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center text-lime text-[10px] font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-lime font-medium truncate">
                      @{user.username}
                    </span>
                  </li>
                  <li>
                    <Link
                      href="/create"
                      className="text-sm transition-colors hover:text-lime"
                    >
                      My Links
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-sm transition-colors hover:text-red-400"
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="text-sm transition-colors hover:text-lime"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="text-sm transition-colors hover:text-lime"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-lime uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm transition-colors hover:text-lime">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm transition-colors hover:text-lime">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-lime/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Linkify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a href="#" className="text-lime/40 hover:text-lime transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="text-lime/40 hover:text-lime transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;