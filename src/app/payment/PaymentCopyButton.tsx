"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { FiCopy, FiCheck } from "react-icons/fi";

interface PaymentCopyButtonProps {
  accountNumber: string;
}

export default function PaymentCopyButton({ accountNumber }: PaymentCopyButtonProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      showToast({ type: "success", message: "Account number copied" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast({ type: "error", message: "Could not copy. Copy it manually." });
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary-light transition-colors hover:bg-primary/20"
      aria-label={`Copy account number ${accountNumber}`}
    >
      {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
