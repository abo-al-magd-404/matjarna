"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const centerLinks = user
    ? [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "Cart", href: "/cart" },
        { name: "Account", href: "/account" },
      ]
    : [{ name: "Account", href: "/account" }];

  const isAdminActive = pathname.startsWith("/admin");

  return (
    <nav
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50
      w-[95%] max-w-7xl transition-all duration-300
      ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          : "bg-slate-900/70 backdrop-blur-md"
      }
      border border-white/10
      rounded-2xl`}
    >
      {/* subtle glow */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl
      bg-linear-to-r from-sky-500/10 via-blue-500/10 to-rose-500/10 blur-xl"
      ></div>

      {/* bottom highlight line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-px
      bg-linear-to-r from-transparent via-sky-400/40 to-transparent"
      ></div>

      <div className="px-5 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/">
          <h1
            className={`text-xl sm:text-2xl font-extrabold tracking-wide transition-all duration-300
            ${
              pathname === "/"
                ? "text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                : "text-white hover:text-sky-300 hover:scale-105"
            }`}
          >
            MATJARNA
          </h1>
        </Link>

        {/* CENTER */}
        <div className="hidden sm:flex items-center gap-6">
          {centerLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1 text-sm font-medium text-white group"
              >
                <span className="relative z-10 group-hover:text-sky-300 transition">
                  {link.name}
                </span>

                {/* active bg */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-md
                  bg-linear-to-r from-sky-500/20 via-blue-500/20 to-green-500/20 blur-sm"
                  ></span>
                )}

                {/* hover glow */}
                <span
                  className="absolute inset-0 rounded-md opacity-0
                group-hover:opacity-100 transition
                bg-linear-to-r from-sky-500/10 via-blue-500/10 to-rose-500/10"
                ></span>

                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5
                  bg-linear-to-r from-sky-400 to-blue-400
                  transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* ADMIN */}
        {user && (
          <Link
            href="/admin"
            className="hidden sm:block relative px-4 py-2 text-sm font-semibold rounded-md overflow-hidden group border border-white/20"
          >
            <span
              className={`relative z-10 transition
              ${
                isAdminActive
                  ? "text-black"
                  : "text-white group-hover:text-black"
              }`}
            >
              Admin
            </span>

            {/* active */}
            {isAdminActive && (
              <span
                className="absolute inset-0
              bg-linear-to-r from-sky-400 via-blue-500 to-green-400"
              ></span>
            )}

            {/* hover */}
            <span
              className="absolute inset-0
            bg-linear-to-r from-sky-400 via-blue-500 to-green-400
            translate-y-full group-hover:translate-y-0
            transition-transform duration-300"
            ></span>
          </Link>
        )}

        {/* MOBILE BTN */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md text-white transition
              ${
                pathname === link.href
                  ? "bg-linear-to-r from-sky-500/20 to-blue-500/20"
                  : "hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md text-center text-white border border-white/20
              ${
                isAdminActive
                  ? "bg-linear-to-r from-sky-500/30 to-green-500/30 text-black"
                  : "hover:bg-linear-to-r hover:from-sky-500/30 hover:to-green-500/30"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
