import type { Metadata } from "next";
import { FiSmartphone, FiSend, FiCreditCard, FiDollarSign } from "react-icons/fi";
import PaymentCopyButton from "./PaymentCopyButton";

export const metadata: Metadata = {
  title: "Payments — Newa Tech",
  description:
    "Pay Newa Tech directly via eSewa, Khalti, Global IME Bank, or Siddhartha Bank. Use the account details below to complete your payment.",
};

const paymentMethods = [
  {
    name: "eSewa",
    icon: FiSmartphone,
    number: "9766453836",
    type: "Wallet",
    description:
      "Pay directly into our eSewa wallet. Open eSewa, go to Send Money, and use this mobile number.",
  },
  {
    name: "Khalti",
    icon: FiSend,
    number: "9766453836",
    type: "Wallet",
    description:
      "Pay directly into our Khalti wallet. Open Khalti, go to Send Money, and use this mobile number.",
  },
  {
    name: "Global IME Bank",
    icon: FiCreditCard,
    number: "9744400011",
    type: "Bank Transfer",
    description:
      "Transfer directly to our Global IME Bank account using this account number.",
  },
  {
    name: "Siddhartha Bank",
    icon: FiDollarSign,
    number: "9766453836",
    type: "Bank Transfer",
    description:
      "Transfer directly to our Siddhartha Bank account using this account number.",
  },
];

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
              <div
                key={method.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,95,217,0.15)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary-light">
                    <method.icon size={22} />
                  </div>
                  <span className="rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300">
                    {method.type}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white mb-1.5">{method.name}</h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {method.description}
                </p>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 mb-4">
                  <span className="text-sm text-slate-400">Account Number</span>
                  <span className="text-base font-mono font-bold text-primary-light tracking-wider">
                    {method.number}
                  </span>
                </div>

                <PaymentCopyButton accountNumber={method.number} />
              </div>
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
