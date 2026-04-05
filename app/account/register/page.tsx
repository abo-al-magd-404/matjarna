"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (success) router.push("/");
      else setError("Registration failed.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { width: 0, color: "#444", text: "" };
    if (p.length < 6) return { width: 33, color: "#FF6B6B", text: "Weak" };
    if (p.length < 10) return { width: 66, color: "#FFD166", text: "Medium" };
    return { width: 100, color: "#00D9A6", text: "Strong" };
  };

  const strength = getPasswordStrength();

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-24 px-5 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #6C63FF, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-xl p-8 rounded-3xl space-y-6"
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
            <UserPlus className="w-7 h-7" style={{ color: "var(--accent)" }} />
          </div>

          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--accent)" }}
          >
            Account
          </span>

          <h2
            className="text-3xl font-black mt-2"
            style={{ color: "var(--foreground)" }}
          >
            Create Account
          </h2>

          <p
            className="text-sm mt-2"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Join MATJARNA and start shopping
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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div>
            <label className="text-xs uppercase tracking-widest mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="text-xs uppercase tracking-widest mb-2 block">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          {/* Email full */}
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-widest mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
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
            <label className="text-xs uppercase tracking-widest mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Strength</span>
                  <span style={{ color: strength.color }}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#222]">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${strength.width}%`,
                      background: strength.color,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="text-xs uppercase tracking-widest mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
          </div>

          {/* Button full */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full font-semibold text-white text-sm transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                boxShadow: "0 4px 20px var(--accent-glow)",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div
          className="text-center pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p style={{ color: "var(--foreground-secondary)" }}>
            Already have an account?{" "}
            <Link href="/account/login" style={{ color: "var(--accent)" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}