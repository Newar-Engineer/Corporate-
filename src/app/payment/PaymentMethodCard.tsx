"use client";

import { useState } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FiMaximize2, FiX } from "react-icons/fi";
import PaymentCopyButton from "./PaymentCopyButton";

interface PaymentMethodCardProps {
  name: string;
  number: string;
  type: string;
  description: string;
  qrPath?: string | null;
  icon: IconType;
}

export default function PaymentMethodCard({
  name,
  number,
  type,
  description,
  qrPath,
  icon: Icon,
}: PaymentMethodCardProps) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,95,217,0.15)]">
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

        {qrPath && (
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="relative mx-auto mb-5 flex h-44 w-44 flex-col items-center rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-600/50 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Open ${name} QR code to scan and pay`}
          >
            <div className="relative h-full w-full">
              <Image
                src={qrPath}
                alt={`${name} payment QR code`}
                fill
                sizes="176px"
                className="object-contain rounded-lg"
              />
            </div>
            <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <FiMaximize2 size={11} />
              Tap to scan & pay
            </span>
          </button>
        )}

        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 mb-4">
          <span className="text-sm text-slate-400">Account Number</span>
          <span className="text-base font-mono font-bold text-primary-light tracking-wider">
            {number}
          </span>
        </div>

        <PaymentCopyButton accountNumber={number} />
      </div>

      {qrOpen && qrPath && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setQrOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} payment QR code`}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
              aria-label="Close QR code"
            >
              <FiX size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Scan & Pay with {name}
            </h3>
            <p className="text-sm text-slate-500 text-center mb-5 leading-relaxed">
              Open your {name} app, tap the scan icon, and point your camera at
              this QR code to pay us directly.
            </p>

            <div className="relative h-72 w-full rounded-xl bg-slate-50 p-3">
              <Image
                src={qrPath}
                alt={`${name} payment QR code`}
                fill
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
