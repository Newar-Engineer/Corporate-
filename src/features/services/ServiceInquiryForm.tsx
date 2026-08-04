"use client";

import { useState, type FormEvent } from "react";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

interface ServiceInquiryFormProps {
  serviceTitle: string;
  isModal?: boolean;
  onSuccess?: () => void;
}

export default function ServiceInquiryForm({
  serviceTitle,
  isModal = false,
  onSuccess,
}: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
    requirements: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Inquiry for ${serviceTitle}`,
          message: `Budget Range: ${formData.budget}\nTarget Timeline: ${formData.timeline}\n\nRequirements:\n${formData.requirements}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", budget: "", timeline: "", requirements: "" });
      setTimeout(() => {
        setStatus("idle");
        onSuccess?.();
      }, 3000);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "success" ? (
        <div className="glass-light rounded-xl p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
            <FiCheck className="text-emerald-400" size={24} />
          </div>
          <h4 className="text-lg font-semibold text-white mb-1">Inquiry Sent!</h4>
          <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <>
          {!isModal && (
            <h3 className="text-xl font-bold text-white mb-2">
              Request a Quote for {serviceTitle}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Business Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="+977-98XXXXXXXX"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Project Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="bg-slate-800">Select range</option>
                <option value="Under NPR 50,000" className="bg-slate-800">Under NPR 50,000</option>
                <option value="NPR 50,000 - 1,00,000" className="bg-slate-800">NPR 50,000 - 1,00,000</option>
                <option value="NPR 1,00,000 - 5,00,000" className="bg-slate-800">NPR 1,00,000 - 5,00,000</option>
                <option value="NPR 5,00,000 - 10,00,000" className="bg-slate-800">NPR 5,00,000 - 10,00,000</option>
                <option value="Above NPR 10,00,000" className="bg-slate-800">Above NPR 10,00,000</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Target Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="bg-slate-800">Select timeline</option>
                <option value="ASAP (Within 2 weeks)" className="bg-slate-800">ASAP (Within 2 weeks)</option>
                <option value="1-2 Months" className="bg-slate-800">1-2 Months</option>
                <option value="2-4 Months" className="bg-slate-800">2-4 Months</option>
                <option value="4-6 Months" className="bg-slate-800">4-6 Months</option>
                <option value="Flexible / Not sure" className="bg-slate-800">Flexible / Not sure</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Project Requirements *</label>
            <textarea
              required
              rows={4}
              value={formData.requirements}
              onChange={(e) => setFormData((p) => ({ ...p, requirements: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe your project, goals, and any specific requirements..."
            />
          </div>
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
              <FiAlertCircle size={16} />
              {errorMsg}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? (
              "Sending..."
            ) : (
              <>
                <FiSend size={16} />
                Send Inquiry
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
}
