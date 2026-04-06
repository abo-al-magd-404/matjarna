"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#6C63FF] blur-[50px] opacity-20 rounded-full" />
          <ShoppingBag className="w-24 h-24 text-[#3F3F46] relative z-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Your cart is empty
        </h1>
        <p className="text-[#8B8B9E] mb-10 text-center max-w-md">
          Looks like you haven&apos;t added any premium electronics to your
          collection yet.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-linear-to-r from-[#6C63FF] to-[#4F46E5] text-white rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(108,99,255,0.3)] font-semibold"
        >
          Explore Products →
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center py-12 px-4 sm:px-8">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#8B8B9E] hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Shopping <span className="text-[#6C63FF]">Cart</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#111118] rounded-2xl p-5 border border-[rgba(255,255,255,0.06)] flex gap-6 hover:border-[rgba(108,99,255,0.3)] transition-all"
              >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-[#0A0A0F] rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden">
                  <Image
                    src={item.imageUrl || "/imgs/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-contain p-3 opacity-90 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#8B8B9E] hover:text-[#FF6B6B] hover:bg-[rgba(255,107,107,0.1)] rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <p className="text-[#00D9A6] font-bold text-xl">
                      ${(item.price || 0).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-1 bg-[#0A0A0F] border border-[rgba(255,255,255,0.1)] rounded-full p-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="w-7 h-7 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center text-white"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] rounded-3xl p-8 border border-[rgba(255,255,255,0.06)] shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#8B8B9E]">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#8B8B9E]">
                  <span>Shipping</span>
                  <span className="text-[#00D9A6] font-medium uppercase text-xs">
                    Free
                  </span>
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-end">
                  <span className="text-lg text-white font-semibold">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#00D9A6]">
                      ${getCartTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/cart/checkout"
                  className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-linear-to-r from-[#6C63FF] to-[#4F46E5] text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-bold shadow-[0_0_20px_rgba(108,99,255,0.2)]"
                >
                  <CreditCard className="w-5 h-5" />
                  Checkout Now
                </Link>
                <Link
                  href="/"
                  className="block w-full text-center py-4 px-4 bg-[rgba(255,255,255,0.03)] text-white border border-[rgba(255,255,255,0.08)] rounded-2xl hover:bg-[rgba(255,255,255,0.06)] transition-all font-medium"
                >
                  Keep Shopping
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
                <div className="w-1 h-1 rounded-full bg-[#00D9A6]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white">
                  Secure Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
