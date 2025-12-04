
export default function Footer() {
  const team = [
    { name: "abd alrahman sobhy", colors: "from-indigo-500 to-purple-500" },
    { name: "tawfeeq", colors: "from-blue-600 to-cyan-500" },
    { name: "abd allattif", colors: "from-emerald-500 to-teal-500" },
    { name: "abd alrahman adel", colors: "from-rose-500 to-pink-500" },
    { name: "abo al magd", colors: "from-purple-600 to-fuchsia-600" },
    { name: "abd alrahman mohamed", colors: "from-orange-500 to-amber-500" },
    { name: "ahmed", colors: "from-teal-500 to-green-500" },
    { name: "ali", colors: "from-red-500 to-rose-500" },
    { name: "sayed", colors: "from-sky-500 to-blue-600" },
    { name: "ziad", colors: "from-yellow-500 to-orange-500" },
  ];

  return (
    <footer className="w-full mt-auto bg-gradient-to-b from-[#0e0e0f] to-[#111827] text-white py-12 relative overflow-hidden rounded-t-3xl">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 blur-[160px] rounded-full"></div>
      </div>

      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8 tracking-wide drop-shadow-lg">
          MATJARNA Development Team
        </h2>

        {/* team capsules */}
        <div className="flex flex-wrap justify-center gap-4">
          {team.map((m, index) => (
            <span
              key={index}
              className={`
                px-5 py-2 rounded-full 
                bg-gradient-to-r ${m.colors}
                font-medium shadow-lg shadow-black/20
                hover:scale-110 hover:shadow-xl
                transition-all duration-300 cursor-default
                animate-[float_4s_ease-in-out_infinite]
              `}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              dev / {m.name}
            </span>
          ))}
        </div>

        <p className="mt-10 text-sm opacity-70 tracking-wide">
          © {new Date().getFullYear()} MATJARNA — All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </footer>
  );
}
