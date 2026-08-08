import type { Metadata } from "next";
import { paymentMethods } from "@/lib/payment-methods";
import PaymentMethodCard from "./PaymentMethodCard";

export const metadata: Metadata = {
  title: "Payments — Newa Tech",
  description:
    "Pay Newa Tech directly via eSewa, Khalti, Global IME Bank, or Siddhartha Bank. Scan the QR code or use the account details below.",
};

export default function PaymentPage() {
  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-gold selection:text-black">
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,95,217,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold mb-6">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Payments
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              How to Pay Us
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Choose the method that works best for you. Your payment goes directly
            into our account — send a screenshot of the transaction to our
            contact channels so we can confirm it right away.
          </p>
        </div>
      </section>

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.name}
                name={method.name}
                icon={method.icon}
                number={method.number}
                type={method.type}
                description={method.description}
                qrPath={method.qrPath}
                href={`/payment/${method.slug}`}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gold/20 bg-gradient-to-br from-slate-900/90 via-amber-950/10 to-slate-900/90 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gold mb-2">
              Milestone-Based Payment Plan
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We work on simple milestone payments: 30% to start, 40% at design
              approval, 30% on delivery. Long-term retainers are invoiced
              monthly. Every milestone and schedule is transparently outlined in
              your project proposal before we begin.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
