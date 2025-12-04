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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="w-[90%] mx-auto py-20 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center mb-8">Categories</h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">
          Loading categories...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
          {categories.map((cat, index) => (
            <Link key={cat.id} href={`/categories/${cat.id}`}>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image
                  src={
                    cat.imageUrl ||
                    categoryImages[index] ||
                    "/imgs/categories/default.jpg"
                  }
                  alt={cat.name}
                  fill
                  className="object-cover"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-semibold capitalize">
                  {cat.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
