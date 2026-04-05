"use client";

export default function FloatingFooter() {
  const team = [
    { name: "Abd Al Rahman Sobhy", colors: "from-indigo-500 to-purple-500" },
    { name: "Mohamed Tawfeeq", colors: "from-blue-600 to-cyan-500" },
    { name: "Mohamed Abd Al Lattif", colors: "from-emerald-500 to-teal-500" },
    { name: "Abd Al Rahman Adel", colors: "from-rose-500 to-pink-500" },
    { name: "Mohamed Abo Al Magd", colors: "from-purple-600 to-fuchsia-600" },
    { name: "Abd Al Rahman Mohamed", colors: "from-orange-500 to-amber-500" },
    { name: "Ahmed Abd Al Raouf", colors: "from-teal-500 to-green-500" },
    { name: "Ali Mohamed", colors: "from-red-500 to-rose-500" },
    { name: "Sayed Khaled", colors: "from-sky-500 to-blue-600" },
    { name: "Ziad Mamdouh", colors: "from-yellow-500 to-orange-500" },
  ];

  return (
    <footer
      className="w-full max-w-[90%] mx-auto
      bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl
      py-6 px-6 my-5 shadow-lg shadow-black/40 overflow-hidden"
    >
      {/* background magical glows */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500 blur-[120px] rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-2 right-1/4 w-64 h-64 bg-blue-500 blur-[140px] rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide drop-shadow-lg">
          MATJARNA Development Team
        </h2>

        {/* team capsules */}
        <div className="flex flex-wrap justify-center gap-3">
          {team.map((m, index) => (
            <span
              key={index}
              className={`
                relative px-4 py-2 rounded-full
                bg-linear-to-r ${m.colors}
                text-white font-semibold shadow-lg shadow-black/25
                hover:scale-110 hover:shadow-xl transition-transform duration-300
                cursor-default animate-[float_5s_ease-in-out_infinite]
                flex items-center justify-center
              `}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className="text-xs sm:text-sm tracking-wide">
                dev / {m.name}
              </span>
            </span>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/60 tracking-wide">
          © {new Date().getFullYear()} MATJARNA — All rights reserved.
        </p>
      </div>

      {/* floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-[float_5s_ease-in-out_infinite] {
          animation: float 5s ease-in-out infinite;
        }
        .animate-[float_6s_ease-in-out_infinite] {
          animation: float 6s ease-in-out infinite;
        }
        .animate-[float_8s_ease-in-out_infinite] {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
