"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiMaximize2, FiSmartphone, FiSend, FiCreditCard, FiDollarSign } from "react-icons/fi";
import type { PaymentIconName } from "@/lib/payment-methods";
import PaymentCopyButton from "./PaymentCopyButton";

const iconMap: Record<PaymentIconName, React.ComponentType<{ size?: number; className?: string }>> = {
  smartphone: FiSmartphone,
  send: FiSend,
  creditcard: FiCreditCard,
  dollar: FiDollarSign,
};

interface PaymentMethodCardProps {
  name: string;
  number: string;
  type: string;
  description: string;
  qrPath?: string | null;
  icon: PaymentIconName;
  href: string;
}

export default function PaymentMethodCard({
  name,
  number,
  type,
  description,
  qrPath,
  icon,
  href,
}: PaymentMethodCardProps) {
  const Icon = iconMap[icon];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,95,217,0.15)]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary-light">
          <Icon size={22} />
        </div>
        <span className="rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300">
          {type}
        </span>
      </div>

      <h2 className="text-lg font-bold text-white mb-1.5">{name}</h2>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        {description}
      </p>

      {qrPath ? (
        <Link
          href={href}
          aria-label={`Open the ${name} payment page to scan and pay`}
          className="relative mx-auto mb-5 block h-44 w-44 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-600/50 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="relative h-[calc(100%-22px)] w-full">
            <Image
              src={qrPath}
              alt={`${name} payment QR code`}
              fill
              sizes="176px"
              className="object-contain rounded-lg"
            />
          </div>
          <span className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-primary">
            <FiMaximize2 size={12} />
            Tap QR, scan & pay
          </span>
        </Link>
      ) : (
        <div className="mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/40">
          <div className="text-center">
            <Icon size={30} className="mx-auto text-slate-500" />
            <p className="mt-3 text-xs text-slate-500 px-4">Copy the {type === "Wallet" ? "wallet number" : "account number"} below</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3">
        <span className="text-sm text-slate-400">Account Number</span>
        <span className="text-base font-mono font-bold text-primary-light tracking-wider">
          {number}
        </span>
      </div>

      <div className="mt-4 flex justify-center">
        <PaymentCopyButton accountNumber={number} />
      </div>

      <Link
        href={href}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Pay with {name}
        <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}