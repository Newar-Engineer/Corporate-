import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const methods = ["eSewa", "Khalti", "Global IME Bank", "Siddhartha Bank"];

export default function PaymentStrip() {
  return (
    <section className="section-gradient-alt relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,201,60,0.04),transparent)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="lg:max-w-md">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold mb-4">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Payments
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
              Prefer to pay online?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Send your payment via any of these methods and confirm with a
              transaction screenshot on our contact channels.
            </p>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-3">
              {methods.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-md"
                >
                  <FiCheckCircle size={15} className="text-gold" />
                  {m}
                </span>
              ))}
            </div>
            <Link
              href="/payment"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary transition-colors"
            >
              View payment details
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
