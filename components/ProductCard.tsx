"use client";

import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Product } from "@/lib/api";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Derive quantity directly from cart context instead of maintaining local state
  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative w-full h-56 bg-gray-100">
        <Image
          src={product.imageUrl || "/imgs/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <button
              onClick={handleRemove}
              className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              -
            </button>
            <span className="text-gray-700 font-medium">{quantity}</span>
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
