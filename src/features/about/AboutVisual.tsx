import Image from "next/image";

const chips = [
  { label: "Website Design", position: "top-6 -left-2 sm:-left-6", animation: "animate-float-y" },
  { label: "App Development", position: "top-1/3 -right-2 sm:-right-8", animation: "animate-float-y-slow" },
  { label: "E-Commerce", position: "bottom-1/4 -left-2 sm:-left-8", animation: "animate-bob-y" },
  { label: "UI/UX Design", position: "bottom-6 -right-2 sm:-right-6", animation: "animate-float-y" },
];

export default function AboutVisual() {
  return (
    <div className="relative mx-auto flex items-center justify-center w-full max-w-md aspect-square" aria-hidden="true">
      {/* Rotating gradient ring */}
      <div className="absolute inset-6 rounded-full animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(30,95,217,0.55)_20%,rgba(41,171,226,0.25)_40%,transparent_60%,rgba(255,201,60,0.35)_80%,transparent_100%)] blur-sm" />
      </div>

      {/* Pulsing radar rings */}
      <div className="absolute inset-0 rounded-full border border-primary/15 animate-ping [animation-duration:3s]" />
      <div className="absolute inset-8 rounded-full border border-primary/10 animate-ping [animation-duration:3s] [animation-delay:0.8s]" />

      {/* Dotted orbit markers */}
      <div className="absolute inset-2 rounded-full border border-dashed border-primary/15" />

      {/* Logo core */}
      <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border border-white/10 bg-[#0A0E1A]/90 shadow-2xl shadow-primary/20 backdrop-blur-xl">
        <Image
          src="/logo-removebg-preview.png"
          alt=""
          width={120}
          height={120}
          className="h-24 w-24 sm:h-28 sm:w-28 object-contain animate-bob-y"
        />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-gold backdrop-blur-md">
          Baneshwor, Kathmandu
        </span>
      </div>

      {/* Floating service chips */}
      {chips.map((chip) => (
        <div
          key={chip.label}
          className={`absolute ${chip.position} z-20 rounded-xl border border-white/10 bg-[#0A0E1A]/90 backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 shadow-xl shadow-black/30 ${chip.animation}`}
        >
          <span className="gradient-text">{chip.label}</span>
        </div>
      ))}
    </div>
  );
}
