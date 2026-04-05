"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Category } from "@/lib/api";

const categoryImages = [
  "/imgs/categories/camera.jpg",
  "/imgs/categories/earphones.jpg",
  "/imgs/categories/headphones.jpg",
  "/imgs/categories/laptop.jpg",
  "/imgs/categories/microphone.jpg",
  "/imgs/categories/smartphone.jpg",
];

const partners = [
  { name: "Apple", img: "/imgs/logos/apple.png" },
  { name: "Samsung", img: "/imgs/logos/samsung.png" },
  { name: "ROG", img: "/imgs/logos/rog.png" },
  { name: "Dell", img: "/imgs/logos/dell.png" },
  { name: "Lenovo", img: "/imgs/logos/lenovo.png" },
  { name: "Sony", img: "/imgs/logos/sony.png" },
  { name: "Bose", img: "/imgs/logos/bose.png" },
  { name: "Logitech", img: "/imgs/logos/logitech.png" },
  { name: "Anker", img: "/imgs/logos/anker.png" },
  { name: "Asus", img: "/imgs/logos/asus.png" },
];

const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Premium Quality",
    desc: "Only the finest electronics from trusted global brands — handpicked for excellence and durability.",
    accent: "#6C63FF",
    bg: "rgba(108,99,255,0.08)",
    border: "rgba(108,99,255,0.25)",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Lightning-fast shipping to your doorstep with real-time tracking and full care for your order.",
    accent: "#00D9A6",
    bg: "rgba(0,217,166,0.08)",
    border: "rgba(0,217,166,0.25)",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
    title: "Expert Support",
    desc: "A dedicated team of specialists ready to assist you at any stage of your shopping journey.",
    accent: "#FF6B6B",
    bg: "rgba(255,107,107,0.08)",
    border: "rgba(255,107,107,0.25)",
  },
];

export default function Home() {
  const [animateLanding, setAnimateLanding] = useState(false);
  const [categoriesFromApi, setCategoriesFromApi] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateLanding(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategoriesFromApi(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategoriesFromApi([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <main className="flex flex-col w-full font-sans bg-[#0A0A0F] text-white">
      {/* ==================== Landing Section ==================== */}
      <section className="relative min-h-screen w-full flex justify-center items-center overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(108,99,255,0.18),transparent)]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #6C63FF, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, #00D9A6, transparent 70%)",
          }}
        />

        <div
          className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
            animateLanding
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="mb-6 px-4 py-1.5 rounded-full border border-[rgba(108,99,255,0.4)] bg-[rgba(108,99,255,0.1)] text-[#a89fff] text-sm tracking-widest uppercase">
            Electronics Store
          </div>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #6C63FF, #00D9A6)",
            }}
          >
            MATJARNA
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[#8B8B9E] max-w-lg leading-relaxed">
            Your ultimate hub for electronics.
            <br />
            Explore, discover, and enjoy top-notch gadgets.
          </p>

          <Link href="/categories">
            <button
              className="mt-10 px-10 py-4 rounded-full text-white font-semibold text-base tracking-wide
                transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                boxShadow: "0 0 40px rgba(108,99,255,0.35)",
              }}
            >
              Explore Now →
            </button>
          </Link>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "10+", label: "Top Brands" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-[#8B8B9E] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-[#8B8B9E] tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-linear-to-b from-[#8B8B9E] to-transparent" />
        </div>
      </section>

      {/* ==================== Categories Section ==================== */}
      <section className="w-full py-28 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-[#6C63FF] mb-3">
              Browse
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Categories
            </h2>
            <div className="mt-4 w-12 h-px bg-[#6C63FF]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading && (
              <p className="text-center text-[#8B8B9E] col-span-full py-10 tracking-wider">
                Loading...
              </p>
            )}
            {!loading && categoriesFromApi.length === 0 && (
              <p className="text-center text-[#8B8B9E] col-span-full py-10">
                No categories found
              </p>
            )}
            {categoriesFromApi.map((cat, index) => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <div
                  className="group relative h-52 rounded-2xl overflow-hidden cursor-pointer
                    border border-[rgba(255,255,255,0.06)] transition-all duration-500
                    hover:border-[rgba(108,99,255,0.4)] hover:-translate-y-1"
                  style={{ background: "#111118" }}
                >
                  {/* Image */}
                  <Image
                    src={
                      cat.imageUrl ||
                      categoryImages[index] ||
                      "/imgs/categories/default.jpg"
                    }
                    alt={cat.name}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                    suppressHydrationWarning
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0F] via-[rgba(10,10,15,0.4)] to-transparent" />

                  {/* Arrow icon top-right */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[rgba(255,255,255,0.12)]
                    bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-white/40
                    group-hover:border-[rgba(108,99,255,0.6)] group-hover:text-[#a89fff] transition-all duration-300 text-sm"
                  >
                    ↗
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-base font-semibold capitalize text-white tracking-wide">
                      {cat.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-4 h-px bg-[#6C63FF] group-hover:w-8 transition-all duration-300" />
                      <span className="text-xs text-[#8B8B9E]">Explore</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Partners Section ==================== */}
      <section
        className="w-full py-28 px-4 sm:px-8 border-y border-[rgba(255,255,255,0.05)]"
        style={{ background: "#0D0D14" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-[#00D9A6] mb-3">
              Brands
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Trusted Partners
            </h2>
            <div className="mt-4 w-12 h-px bg-[#00D9A6]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-center rounded-2xl
                  border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]
                  hover:border-[rgba(0,217,166,0.3)] hover:bg-[rgba(0,217,166,0.05)]
                  transition-all duration-300 hover:-translate-y-0.5"
                style={{ height: "100px" }}
              >
                <div className="relative w-20 h-10">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-contain filter brightness-50 group-hover:brightness-100 transition-all duration-300"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Features Section ==================== */}
      <section className="w-full py-28 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs tracking-[0.25em] uppercase text-[#FF6B6B] mb-3">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Choose MATJARNA?
            </h2>
            <p className="mt-4 text-[#8B8B9E] max-w-xl text-base leading-relaxed">
              Every feature is built to make your shopping journey seamless,
              fast, and delightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col p-8 rounded-2xl
                  border transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: item.bg,
                  borderColor: item.border,
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: item.accent,
                    background: `${item.accent}18`,
                    border: `1px solid ${item.accent}30`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Number */}
                <span
                  className="absolute top-6 right-6 text-5xl font-black opacity-[0.06] select-none"
                  style={{ color: item.accent }}
                >
                  0{idx + 1}
                </span>

                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#8B8B9E] text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Footer CTA ==================== */}
      <section
        className="w-full py-24 px-4 sm:px-8 border-t border-[rgba(255,255,255,0.05)]"
        style={{ background: "#0D0D14" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-[#8B8B9E] mb-8 text-base">
            Join thousands of customers who trust MATJARNA for their electronics
            needs.
          </p>
          <Link href="/categories">
            <button
              className="px-10 py-4 rounded-full font-semibold text-white text-base
                transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                boxShadow: "0 0 40px rgba(108,99,255,0.3)",
              }}
            >
              Shop Now →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
