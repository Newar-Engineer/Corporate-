import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { paymentMethods, getPaymentMethodBySlug, getIconByName } from "@/lib/payment-methods";
import PaymentCopyButton from "../PaymentCopyButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return paymentMethods.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const method = getPaymentMethodBySlug(slug);
  if (!method) return {};
  return {
    title: `Pay with ${method.name} — Newa Tech`,
    description: method.description,
  };
}

export default async function PaymentMethodPage({ params }: Props) {
  const { slug } = await params;
  const method = getPaymentMethodBySlug(slug);
  if (!method) notFound();

  const Icon = getIconByName(method.icon);

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-gold selection:text-black">
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,95,217,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/payment"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary-light transition-colors mb-8"
          >
            <FiArrowLeft size={15} />
            Back to all payment options
          </Link>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-light">
              <Icon size={26} />
            </div>
            <div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                {method.type === "Wallet" ? "Digital Wallet" : "Bank Transfer"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Pay with {method.name}
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {method.description}
          </p>
        </div>
      </section>

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8">
              {method.qrPath ? (
                <div className="text-center">
                  <div className="relative mx-auto aspect-square w-56 sm:w-64 overflow-hidden rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-600/50">
                    <Image
                      src={method.qrPath}
                      alt={`${method.name} payment QR code`}
                      fill
                      sizes="(max-width: 640px) 224px, 256px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-slate-400">
                    Open your {method.name} app and scan this QR code to pay directly
                  </p>
                </div>
              ) : (
                <div className="flex min-h-56 items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-slate-500">
                      <Icon size={28} />
                    </div>
                    <p className="text-sm text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                      No QR code needed — just send money to the {method.name} number below from your app.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3">
                <span className="text-sm text-slate-400">
                  {method.type === "Wallet" ? "Wallet Number" : "Account Number"}
                </span>
                <span className="text-base font-mono font-bold text-primary-light tracking-wider">
                  {method.number}
                </span>
              </div>
              <div className="mt-4 flex justify-center">
                <PaymentCopyButton accountNumber={method.number} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-1.5">
                How to Pay with {method.name}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Follow these simple steps — it takes less than a minute.
              </p>

              <ol className="space-y-4">
                {method.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary-light">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-4">
                <p className="flex items-start gap-2 text-xs text-gold leading-relaxed">
                  <FiCheckCircle size={15} className="mt-0.5 shrink-0" />
                  Keep the transaction screenshot — send it to our contact channels so we can confirm your payment right away.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Prefer another method?</h3>
              <p className="text-sm text-slate-400">
                We accept eSewa, Khalti, Global IME Bank, and Siddhartha Bank.
              </p>
            </div>
            <Link
              href="/payment"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:bg-primary/20"
            >
              View all payment options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}