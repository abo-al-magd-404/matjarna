"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, Category } from "@/lib/api";

const categoryImages = [
  "/imgs/categories/camera.jpg",
  "/imgs/categories/earphones.jpg",
  "/imgs/categories/headphones.jpg",
  "/imgs/categories/laptop.jpg",
  "/imgs/categories/microphone.jpg",
  "/imgs/categories/smartphone.jpg",
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 sm:px-8 py-24">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs tracking-[0.25em] uppercase text-[#6C63FF] mb-3">
          Browse
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold">Categories</h1>
        <div className="mt-4 w-12 h-px bg-[#6C63FF]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center">
        {/* Loading */}
        {loading && (
          <p className="text-[#8B8B9E] text-center py-20 tracking-wider">
            Loading categories...
          </p>
        )}

        {/* Empty */}
        {!loading && categories.length === 0 && (
          <p className="text-[#8B8B9E] text-center py-20">
            No categories found
          </p>
        )}

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 place-items-center">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="w-full"
            >
              <div
                className="group relative w-full h-56 rounded-2xl overflow-hidden cursor-pointer
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

                {/* Arrow */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[rgba(255,255,255,0.12)]
                  bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-white/40
                  group-hover:border-[rgba(108,99,255,0.6)] group-hover:text-[#a89fff] transition-all duration-300 text-sm"
                >
                  ↗
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-start justify-center">
                  <h3 className="text-base font-semibold capitalize tracking-wide">
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
    </main>
  );
}
