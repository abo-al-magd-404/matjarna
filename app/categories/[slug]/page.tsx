"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { use } from "react";
import {
  getProductsByCategory,
  getCategory,
  Product,
  Category,
} from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const categoryId = parseInt(slug);

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch category details
        const categoryData = await getCategory(categoryId);
        setCategory(categoryData);

        // Fetch products in this category
        const productsData = await getProductsByCategory(categoryId);
        setProducts(productsData);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch category or products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(categoryId)) {
      fetchData();
    } else {
      setError("Invalid category");
      setLoading(false);
    }
  }, [categoryId]);

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white py-24 px-4 sm:px-8 font-sans w-full flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-[#6C63FF] mb-3">
            {loading ? "Loading" : "Collection"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white capitalize tracking-tight">
            {loading ? "..." : category?.name || "Category"}
          </h1>
          <div className="mt-6 w-16 h-px bg-[linear-gradient(90deg,transparent,#6C63FF,transparent)]" />
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[rgba(108,99,255,0.2)] border-t-[#6C63FF] rounded-full animate-spin mb-4" />
            <p className="text-[#8B8B9E] tracking-widest uppercase text-sm">
              Loading Products...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,107,107,0.08)] flex items-center justify-center mb-4 border border-[rgba(255,107,107,0.25)]">
              <span className="text-[#FF6B6B] text-2xl">!</span>
            </div>
            <p className="text-[#FF6B6B] font-medium">{error}</p>
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 border border-[rgba(255,255,255,0.05)] rounded-3xl bg-[#111118]">
            <span className="text-4xl mb-4 opacity-50">🛒</span>
            <p className="text-[#8B8B9E] text-lg">
              No products found in this category yet.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
