"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogOut, User, Mail } from "lucide-react";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // If no user, show login/signup prompt
  if (!user) {
    return (
      <div className="space-y-8">
        <div className="bg-white shadow-xl rounded-b-2xl p-12 border border-gray-100 text-center">
          <User className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Account
          </h1>
          <p className="text-gray-500 mb-8">
            Please sign in or create an account to continue
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-medium text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/account/register"
              className="px-8 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all font-medium text-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is admin
  const isAdmin = user.role === "Admin" || user.email === "admin@matjarna.com";

  // If user exists, show user details
  return (
    <div className="space-y-8">
      <div className="bg-white shadow-xl rounded-b-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Username</p>
                  <p className="text-gray-900 font-medium">{user.username}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
              </div>

              {user.role && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-500 text-sm">Role</p>
                    <p className="text-gray-900 font-medium">{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/cart"
                className="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                View Cart
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block w-full text-center py-3 px-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
