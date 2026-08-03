import { FiMonitor, FiSmartphone, FiShoppingBag, FiZap, FiCheckCircle, FiShield } from "react-icons/fi";

export default function HeroDemoMockup() {
  return (
    <div className="hidden lg:block relative" aria-hidden="true">
      {/* ambient glow behind the window */}
      <div className="absolute -inset-10 bg-gradient-to-br from-primary/30 via-transparent to-gold/25 blur-3xl rounded-full" />

      {/* floating badge — top left */}
      <div className="animate-float-y absolute -top-7 -left-10 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur px-3.5 py-2 shadow-xl shadow-black/40">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary-light">
          <FiZap size={14} />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-white leading-none">Fast &amp; Responsive</p>
          <p className="mt-0.5 text-[9px] text-slate-400 leading-none">Built with Next.js</p>
        </div>
      </div>

      {/* floating badge — bottom right */}
      <div className="animate-float-y-slow absolute -bottom-8 -right-6 z-20 flex items-center gap-2 rounded-xl border border-gold/20 bg-slate-900/90 backdrop-blur px-3.5 py-2 shadow-xl shadow-black/40">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/15 text-gold">
          <FiCheckCircle size={14} />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-white leading-none">150+ Projects</p>
          <p className="mt-0.5 text-[9px] text-slate-400 leading-none">Delivered in Nepal</p>
        </div>
      </div>

      {/* browser window */}
      <div className="animate-float-y relative z-10 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur shadow-2xl shadow-primary/20 rotate-[1.2deg]">
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 max-w-[60%]">
            <FiShield size={9} className="text-emerald-400" />
            <span className="text-[9px] text-slate-400 truncate">newatech.com.np</span>
          </div>
        </div>

        {/* mini website preview */}
        <div className="space-y-4 p-5">
          {/* mini navbar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-md bg-gradient-to-br from-primary to-primary-light" />
              <span className="text-[10px] font-bold text-white">NewaTech</span>
            </div>
            <div className="hidden xl:flex items-center gap-2 text-[8px] text-slate-400">
              <span className="text-white">Services</span>
              <span>Portfolio</span>
              <span>About</span>
              <span>Contact</span>
            </div>
            <span className="rounded-md bg-gradient-to-r from-primary to-accent px-2 py-1 text-[8px] font-semibold text-white">
              Get a Quote
            </span>
          </div>

          {/* mini hero */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary/25 via-slate-900 to-gold/15 p-4">
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl animate-pulse" />
            <p className="relative text-[11px] font-bold text-white leading-snug">
              Your Business Deserves a Website That Works
            </p>
            <div className="relative mt-2 h-1.5 w-4/5 overflow-hidden rounded-full bg-white/10">
              <div className="animate-pulse-width h-full rounded-full bg-gradient-to-r from-primary-light to-accent" />
            </div>
            <div className="relative mt-3 flex items-center gap-1.5">
              <span className="rounded-md bg-gradient-to-r from-primary to-primary-light px-2 py-1 text-[8px] font-semibold text-white">
                Get Started
              </span>
              <span className="rounded-md border border-white/20 px-2 py-1 text-[8px] text-slate-300">
                View Our Work
              </span>
            </div>
          </div>

          {/* mini service cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <FiMonitor size={12} />, label: "Websites", sub: "Next.js & React", delay: "0s" },
              { icon: <FiSmartphone size={12} />, label: "Mobile Apps", sub: "iOS & Android", delay: "0.15s" },
              { icon: <FiShoppingBag size={12} />, label: "E-Commerce", sub: "eSewa & Khalti", delay: "0.3s" },
            ].map((c) => (
              <div
                key={c.label}
                className="animate-bob-y rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
                style={{ animationDelay: c.delay }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary-light">
                  {c.icon}
                </span>
                <p className="mt-1.5 text-[9px] font-semibold text-white leading-none">{c.label}</p>
                <p className="mt-0.5 text-[7px] text-slate-400 leading-none">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* mini stats bar */}
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2.5 text-center">
            <div>
              <p className="text-[11px] font-bold gradient-text leading-none">150+</p>
              <p className="mt-0.5 text-[7px] text-slate-400 leading-none">Projects</p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-[11px] font-bold gradient-text leading-none">200+</p>
              <p className="mt-0.5 text-[7px] text-slate-400 leading-none">Clients</p>
            </div>
            <div>
              <p className="text-[11px] font-bold gradient-text leading-none">24h</p>
              <p className="mt-0.5 text-[7px] text-slate-400 leading-none">Quote Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
