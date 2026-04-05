// "use client";

// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { LogOut, User, Mail } from "lucide-react";

// export default function AccountPage() {
//   const { user, loading, logout } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   // If no user, show login/signup prompt
//   if (!user) {
//     return (
//       <div className="space-y-8">
//         <div className="bg-white shadow-xl rounded-b-2xl p-12 border border-gray-100 text-center">
//           <User className="w-20 h-20 text-gray-300 mx-auto mb-6" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Welcome to Your Account
//           </h1>
//           <p className="text-gray-500 mb-8">
//             Please sign in or create an account to continue
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/account/login"
//               className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-medium text-lg"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/account/register"
//               className="px-8 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all font-medium text-lg"
//             >
//               Create Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Check if user is admin
//   const isAdmin = user.role === "Admin" || user.email === "admin@matjarna.com";

//   // If user exists, show user details
//   return (
//     <div className="space-y-8">
//       <div className="bg-white shadow-xl rounded-b-2xl p-8 border border-gray-100">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
//           <button
//             onClick={logout}
//             className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
//           >
//             <LogOut className="w-4 h-4" />
//             Sign Out
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Profile Information
//             </h2>

//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <User className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Username</p>
//                   <p className="text-gray-900 font-medium">{user.username}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Mail className="w-5 h-5 text-gray-400 mt-1" />
//                 <div>
//                   <p className="text-gray-500 text-sm">Email</p>
//                   <p className="text-gray-900 font-medium">{user.email}</p>
//                 </div>
//               </div>

//               {user.role && (
//                 <div className="flex items-start gap-3">
//                   <User className="w-5 h-5 text-gray-400 mt-1" />
//                   <div>
//                     <p className="text-gray-500 text-sm">Role</p>
//                     <p className="text-gray-900 font-medium">{user.role}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Quick Actions
//             </h2>
//             <div className="flex flex-col gap-3">
//               <Link
//                 href="/cart"
//                 className="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
//               >
//                 View Cart
//               </Link>
//               {isAdmin && (
//                 <Link
//                   href="/admin"
//                   className="block w-full text-center py-3 px-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
//                 >
//                   Admin Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogOut, User, Mail, ShieldCheck, ShoppingCart } from "lucide-react";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#6C63FF] border-t-transparent animate-spin" />
          <p
            style={{ color: "var(--foreground-secondary)" }}
            className="text-sm tracking-widest uppercase"
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  /* ==================== Not logged in ==================== */
  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--background)" }}
      >
        {/* Soft glow backdrop */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, #6C63FF, transparent 70%)",
          }}
        />

        <div
          className="relative z-10 w-full max-w-md flex flex-col items-center text-center p-10 rounded-3xl"
          style={{
            background: "var(--background-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "var(--accent-soft)",
              border: "1px solid var(--accent-border)",
            }}
          >
            <User className="w-9 h-9" style={{ color: "var(--accent)" }} />
          </div>

          <span
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "var(--accent)" }}
          >
            Account
          </span>
          <h1
            className="text-3xl font-black tracking-tight mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "var(--foreground-secondary)" }}
          >
            Sign in or create an account to manage your orders and profile.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/account/login" className="flex-1">
              <button
                className="w-full py-3 px-6 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                  boxShadow: "0 6px 24px var(--accent-glow)",
                }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/account/register" className="flex-1">
              <button
                className="w-full py-3 px-6 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "var(--background-hover)",
                  border: "1px solid var(--border-hover)",
                  color: "var(--foreground)",
                }}
              >
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== Logged in ==================== */
  const isAdmin = user.role === "Admin" || user.email === "admin@matjarna.com";

  return (
    <div
      className="min-h-screen px-4 sm:px-8 py-16"
      style={{ background: "var(--background)" }}
    >
      {/* Glow blob */}
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #6C63FF, transparent 65%)",
        }}
      />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="relative z-10 w-full max-w-4xl space-y-6">
          {/* Header card */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-8 rounded-3xl"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-xl font-black"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                  color: "#fff",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                }}
              >
                {user.username?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div>
                <span
                  className="text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {isAdmin ? "Administrator" : "Member"}
                </span>
                <h1
                  className="text-2xl font-black tracking-tight mt-0.5"
                  style={{ color: "var(--foreground)" }}
                >
                  {user.username}
                </h1>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 self-start sm:self-auto"
              style={{
                background: "var(--danger-soft)",
                border: "1px solid var(--danger-border)",
                color: "var(--danger)",
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Info + Actions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile info */}
            <div
              className="p-8 rounded-3xl space-y-6"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--accent-soft)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  <User
                    className="w-4 h-4"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <h2
                  className="text-base font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Profile Information
                </h2>
              </div>

              <div
                className="h-px w-full"
                style={{ background: "var(--border)" }}
              />

              <div className="space-y-5">
                {/* Username */}
                <div className="flex items-start gap-4">
                  <User
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "var(--foreground-muted)" }}
                  />
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Username
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {user.username}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "var(--foreground-muted)" }}
                  />
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Role */}
                {user.role && (
                  <div className="flex items-start gap-4">
                    <ShieldCheck
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "var(--foreground-muted)" }}
                    />
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-1"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        Role
                      </p>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: isAdmin
                            ? "rgba(108,99,255,0.12)"
                            : "var(--success-soft)",
                          color: isAdmin ? "var(--accent)" : "var(--success)",
                          border: `1px solid ${isAdmin ? "var(--accent-border)" : "var(--success-border)"}`,
                        }}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div
              className="p-8 rounded-3xl space-y-4"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--success-soft)",
                    border: "1px solid var(--success-border)",
                  }}
                >
                  <ShoppingCart
                    className="w-4 h-4"
                    style={{ color: "var(--success)" }}
                  />
                </div>
                <h2
                  className="text-base font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Quick Actions
                </h2>
              </div>

              <div
                className="h-px w-full"
                style={{ background: "var(--border)" }}
              />

              <div className="flex flex-col gap-3 pt-2">
                <Link href="/cart">
                  <button
                    className="w-full py-3 px-6 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                      boxShadow: "0 4px 20px var(--accent-glow)",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    View Cart
                  </button>
                </Link>

                {isAdmin && (
                  <Link href="/admin">
                    <button
                      className="w-full py-3 px-6 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                      style={{
                        background: "var(--accent-soft)",
                        border: "1px solid var(--accent-border)",
                        color: "var(--accent)",
                      }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Dashboard
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
