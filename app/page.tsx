"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Category } from "@/lib/api";

// map images by index instead of name
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

export default function Home() {
  const [animateLanding, setAnimateLanding] = useState(false);
  const [categoriesFromApi, setCategoriesFromApi] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setAnimateLanding(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch categories from new API
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
    <main className="flex flex-col gap-24 w-full">
      {/* Landing Section */}
      <section className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-[#0d1117]">
        <div
          className={`flex flex-col items-center text-center text-white transition-all duration-1400 ${
            animateLanding
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          <h1 className="text-5xl font-bold text-blue-400 drop-shadow-2xl">
            MATJARNA
          </h1>
          <p className="text-2xl mt-7 text-gray-300 italic animate-bounce">
            Your Ultimate Hub for Electronics
          </p>
          <Link href="/categories">
            <button className="mt-10 px-10 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-xl hover:scale-110 transition-all duration-300 animate-pulse">
              Explore Now
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-[90%] mx-auto">
        <h2 className="text-4xl font-semibold mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {loading && (
            <p className="text-center text-gray-500 text-lg col-span-full">
              Loading categories...
            </p>
          )}

          {!loading && categoriesFromApi.length === 0 && (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No categories found
            </p>
          )}

          {categoriesFromApi.map((cat, index) => (
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
      </section>

      {/* Partners Section */}
      <section className="w-[90%] mx-auto">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-center items-center">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <Image
                src={p.img}
                alt={p.name}
                width={90}
                height={90}
                className="object-contain"
                suppressHydrationWarning
              />
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-20 bg-gray-100 rounded-3xl flex flex-col items-center gap-10">
        <h2 className="text-4xl font-bold text-gray-800">
          Why Choose MATJARNA?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[90%]">
          <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-full mb-5 text-2xl font-bold">
              ★
            </div>
            <h3 className="text-xl font-semibold mb-2">Top Quality</h3>
            <p className="text-gray-600 text-center">
              Highest-quality electronics from trusted global brands.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-5 text-2xl font-bold">
              ⚡
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-center">
              Your orders delivered quickly & reliably.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full mb-5 text-2xl font-bold">
              💬
            </div>
            <h3 className="text-xl font-semibold mb-2">Great Support</h3>
            <p className="text-gray-600 text-center">
              Always here to assist you with any questions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
