"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    ...(user ? [{ name: "Cart", href: "/cart" }] : []),
    { name: "Account", href: "/account" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-md shadow-lg rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-extrabold text-white cursor-pointer drop-shadow-lg">
            MATJARNA
          </h1>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:items-center w-full sm:w-auto gap-3 sm:gap-6 mt-3 sm:mt-0`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors duration-300 text-white ${
                pathname === link.href
                  ? "bg-white/20 text-white shadow-md"
                  : "hover:bg-white/10 hover:text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
