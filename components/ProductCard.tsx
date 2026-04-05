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

  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div
      className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden
                 border border-[rgba(255,255,255,0.06)] transition-all duration-500
                 hover:border-[rgba(108,99,255,0.4)] hover:-translate-y-1"
      style={{ background: "#111118" }}
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(108,99,255,0.03),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-[#0A0A0F] border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.05)]">
        <Image
          src={product.imageUrl || "/imgs/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain p-6 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2 tracking-wide">
            {product.name}
          </h3>
          <p className="text-[#8B8B9E] text-sm mb-4 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer: Price and Controls */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
          <span className="text-[#00D9A6] font-bold text-xl tracking-wide">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => removeFromCart(product.id)}
              disabled={quantity === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                quantity > 0
                  ? "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B] border border-[rgba(255,107,107,0.25)] hover:bg-[#FF6B6B] hover:text-white hover:shadow-[0_0_15px_rgba(255,107,107,0.3)]"
                  : "bg-[rgba(255,255,255,0.03)] text-gray-600 border border-transparent cursor-not-allowed"
              }`}
            >
              -
            </button>

            <span className="text-white font-medium min-w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={() => addToCart(product)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(0,217,166,0.08)] text-[#00D9A6] border border-[rgba(0,217,166,0.25)] transition-all duration-300 hover:bg-[#00D9A6] hover:text-white hover:shadow-[0_0_15px_rgba(0,217,166,0.3)]"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
