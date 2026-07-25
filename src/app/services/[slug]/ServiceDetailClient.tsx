"use client";

import { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";

interface ServiceDetailClientProps {
  serviceTitle: string;
}

export default function ServiceDetailClient({ serviceTitle }: ServiceDetailClientProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
      >
        Quick Request Quote
        <FiArrowRight size={16} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/50 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">
              Request a Quote
            </h3>
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
