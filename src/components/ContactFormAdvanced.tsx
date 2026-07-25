"use client";

import { useState } from "react";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

const inquiryTypes = [
  { id: "project", label: "Project Inquiry / Get Quote" },
  { id: "general", label: "General Question" },
  { id: "partnership", label: "Partnership" },
];

const services = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Cloud/DevOps",
  "Consulting",
];

const budgets = [
  { value: "under-2k", label: "< $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
];

const timelines = [
  { value: "immediate", label: "Immediate (< 1 month)" },
  { value: "1-3-months", label: "1 – 3 Months" },
  { value: "flexible", label: "Flexible" },
];

export default function ContactFormAdvanced() {
  const [inquiryType, setInquiryType] = useState("project");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    selectedServices: [] as string[],
    budget: "",
    timeline: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const toggleService = (svc: string) => {
    setForm((p) => ({
      ...p,
      selectedServices: p.selectedServices.includes(svc)
        ? p.selectedServices.filter((s) => s !== svc)
        : [...p.selectedServices, svc],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Name and email are required.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    try {
      const subject =
        inquiryType === "project"
          ? `Project Inquiry — ${form.selectedServices.join(", ") || "General"}`
          : inquiryType === "partnership"
          ? "Partnership Inquiry"
          : "General Question";

      const message = [
        form.company && `Company: ${form.company}`,
        form.selectedServices.length > 0 && `Services: ${form.selectedServices.join(", ")}`,
        form.budget && `Budget: ${budgets.find((b) => b.value === form.budget)?.label}`,
        form.timeline && `Timeline: ${timelines.find((t) => t.value === form.timeline)?.label}`,
        form.description && `\nDescription:\n${form.description}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject,
          message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", selectedServices: [], budget: "", timeline: "", description: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
          <FiCheck className="text-emerald-400" size={26} />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Message Sent!</h3>
        <p className="text-sm text-slate-400">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Inquiry Type Tabs */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-700/50 bg-slate-800/40 p-1">
        {inquiryTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setInquiryType(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 min-w-[120px] ${
              inquiryType === t.id
                ? "bg-primary text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Company Name</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Your company"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="+977-98XXXXXXXX"
          />
        </div>
      </div>

      {/* Services Checkbox Grid */}
      {inquiryType === "project" && (
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-300">Service Interested In</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {services.map((svc) => {
              const selected = form.selectedServices.includes(svc);
              return (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 ${
                    selected
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {selected && <FiCheck size={12} className="inline mr-1" />}
                  {svc}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Budget & Timeline */}
      {inquiryType === "project" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Estimated Budget</label>
            <select
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="" className="bg-slate-800">Select budget range</option>
              {budgets.map((b) => (
                <option key={b.value} value={b.value} className="bg-slate-800">{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Target Timeline</label>
            <select
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="" className="bg-slate-800">Select timeline</option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value} className="bg-slate-800">{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          {inquiryType === "project" ? "Project Description" : "Your Message"} *
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={
            inquiryType === "project"
              ? "Describe your project, goals, and specific requirements..."
              : "Tell us how we can help..."
          }
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
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            <FiSend size={16} />
            {inquiryType === "project" ? "Submit Inquiry" : "Send Message"}
          </>
        )}
      </button>
    </form>
  );
}
