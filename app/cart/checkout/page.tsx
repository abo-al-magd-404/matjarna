"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Truck,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();

      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 2500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#00D9A6] blur-[60px] opacity-20 rounded-full" />
          <div className="w-24 h-24 bg-[rgba(0,217,166,0.1)] border border-[rgba(0,217,166,0.3)] rounded-full flex items-center justify-center relative z-10 animate-pulse">
            <CheckCircle className="w-12 h-12 text-[#00D9A6]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Payment <span className="text-[#00D9A6]">Successful!</span>
        </h1>
        <p className="text-[#8B8B9E] text-lg mb-10 max-w-md">
          Your premium order is being prepared. Check your email for the receipt
          and tracking details.
        </p>
        <div className="flex items-center gap-2 text-[#8B8B9E] text-sm animate-bounce">
          <div className="w-4 h-4 border-2 border-t-transparent border-[#6C63FF] rounded-full animate-spin" />
          Redirecting to home...
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-20 h-20 text-[#3F3F46] mb-6" />
        <h1 className="text-2xl font-bold text-white mb-6">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="px-8 py-3 bg-[#111118] border border-[rgba(255,255,255,0.1)] text-white rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link
            href="/cart"
            className="text-[#8B8B9E] hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Cart
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">
            Secure <span className="text-[#6C63FF]">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Section */}
              <div className="bg-[#111118] rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(108,99,255,0.1)] flex items-center justify-center border border-[rgba(108,99,255,0.2)]">
                    <Truck className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <h2 className="text-xl font-semibold">
                    Shipping Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-[#3F3F46]"
                      placeholder="e.g. John Wick"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-[#3F3F46]"
                      placeholder="123 Neon Boulevard"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-[#3F3F46]"
                      placeholder="Night City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-[#3F3F46]"
                      placeholder="10101"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-[#111118] rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(0,217,166,0.1)] flex items-center justify-center border border-[rgba(0,217,166,0.2)]">
                    <CreditCard className="w-5 h-5 text-[#00D9A6]" />
                  </div>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#00D9A6] focus:ring-1 focus:ring-[#00D9A6] outline-none transition-all placeholder:text-[#3F3F46]"
                        placeholder="0000 0000 0000 0000"
                      />
                      <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3F3F46]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        maxLength={5}
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#00D9A6] focus:ring-1 focus:ring-[#00D9A6] outline-none transition-all placeholder:text-[#3F3F46]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-[#8B8B9E] mb-2 ml-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        required
                        maxLength={3}
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0F] px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] focus:border-[#00D9A6] focus:ring-1 focus:ring-[#00D9A6] outline-none transition-all placeholder:text-[#3F3F46]"
                        placeholder="***"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 px-6 bg-linear-to-r from-[#6C63FF] to-[#4F46E5] text-white rounded-2xl transition-all shadow-[0_0_30px_rgba(108,99,255,0.2)] font-bold text-lg flex items-center justify-center gap-3 active:scale-95 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.01]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Encrypted Payment...
                  </>
                ) : (
                  `Authorize Payment $${getCartTotal().toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] rounded-3xl p-8 border border-[rgba(255,255,255,0.06)] sticky top-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-8">
                Order Summary
              </h2>

              <div className="space-y-5 mb-8 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3F3F46]">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-16 h-16 shrink-0 bg-[#0A0A0F] rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden">
                      <Image
                        src={item.imageUrl || "/imgs/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6C63FF] text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-[#111118]">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-medium text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#00D9A6] font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 space-y-4">
                <div className="flex justify-between text-[#8B8B9E] text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#8B8B9E] text-sm">
                  <span>Express Shipping</span>
                  <span className="text-[#00D9A6] font-bold uppercase text-[10px]">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold text-white">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#00D9A6]">
                      ${getCartTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-3 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-5 bg-white/10 rounded-sm" />
                    <div className="w-8 h-5 bg-white/20 rounded-sm" />
                    <div className="w-8 h-5 bg-white/10 rounded-sm" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    End-to-End Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
