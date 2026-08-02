"use client";

import { useEffect } from "react";
import Button, { ButtonLink } from "@/components/ui/Button";

export default function ServiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Service detail page error:", error);
  }, [error]);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-md px-4 text-center">
        <div className="mb-4 text-6xl text-red-400">:(</div>
        <h1 className="mb-3 text-2xl font-bold text-white">Something went wrong</h1>
        <p className="mb-8 text-sm text-slate-400 leading-relaxed">
          We encountered an error while loading this service page. Please try again or contact us.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>
            Try Again
          </Button>
          <ButtonLink href="/services" variant="secondary">
            Browse Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
