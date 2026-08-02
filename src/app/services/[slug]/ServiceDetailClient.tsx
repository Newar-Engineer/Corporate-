"use client";

import { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";

interface ServiceDetailClientProps {
  serviceTitle: string;
}

export default function ServiceDetailClient({ serviceTitle }: ServiceDetailClientProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} size="md">
        Quick Request Quote
        <FiArrowRight size={16} />
      </Button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Request a Quote for ${serviceTitle}`}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close quote request dialog"
              className="absolute right-4 top-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold text-white mb-1">
              Request a Quote
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              for {serviceTitle}
            </p>
            <ServiceInquiryForm
              serviceTitle={serviceTitle}
              isModal
              onSuccess={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
