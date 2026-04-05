"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5  relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Glow Background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #6C63FF, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-md p-8 rounded-3xl space-y-6"
        style={{
          background: "var(--background-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5"
            style={{
              background: "var(--accent-soft)",
              border: "1px solid var(--accent-border)",
            }}
          >
            <LogIn className="w-7 h-7" style={{ color: "var(--accent)" }} />
          </div>

          <span
            className="text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ color: "var(--accent)" }}
          >
            Account
          </span>

          <h2
            className="text-3xl font-black mt-2"
            style={{ color: "var(--foreground)" }}
          >
            Welcome Back
          </h2>

          <p
            className="text-sm mt-2"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Sign in to continue your journey
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              background: "var(--danger-soft)",
              border: "1px solid var(--danger-border)",
              color: "var(--danger)",
            }}
          >
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className="text-xs uppercase tracking-widest mb-2 block"
              style={{ color: "var(--foreground-muted)" }}
            >
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="text-xs uppercase tracking-widest mb-2 block"
              style={{ color: "var(--foreground-muted)" }}
            >
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full font-semibold text-sm tracking-wide text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
              boxShadow: "0 4px 20px var(--accent-glow)",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div
          className="text-center pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Don’t have an account?{" "}
            <Link
              href="/account/register"
              className="font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
