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
    <main className="w-[90%] mx-auto py-20 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center capitalize mb-8">
        {loading ? "Loading..." : category?.name || "Category"}
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && products.length === 0 && !error && (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
