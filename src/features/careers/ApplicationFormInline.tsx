"use client";

import { useState, type FormEvent } from "react";
import { FiSend, FiCheck, FiAlertCircle, FiLink, FiUser, FiMail, FiPhone, FiFileText } from "react-icons/fi";

interface ApplicationFormInlineProps {
  jobSlug: string;
  jobTitle: string;
}

export default function ApplicationFormInline({ jobSlug, jobTitle }: ApplicationFormInlineProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Name and email are required.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobSlug,
          name: form.name,
          email: form.email,
          phone: form.phone,
          resumeUrl: form.portfolioUrl,
          coverLetter: form.coverLetter,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", portfolioUrl: "", coverLetter: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
          <FiCheck className="text-emerald-400" size={22} />
        </div>
        <h4 className="text-base font-semibold text-white mb-1">Application Submitted!</h4>
        <p className="text-xs text-slate-400">
          Thank you for applying to <span className="text-slate-300">{jobTitle}</span>.
          We&apos;ll review your application and get back to you within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          <FiUser size={12} className="inline mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          <FiMail size={12} className="inline mr-1" />
          Email *
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          <FiPhone size={12} className="inline mr-1" />
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="+977-98XXXXXXXX"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          <FiLink size={12} className="inline mr-1" />
          Portfolio / LinkedIn URL
        </label>
        <input
          type="url"
          value={form.portfolioUrl}
          onChange={(e) => update("portfolioUrl", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-300">
          <FiFileText size={12} className="inline mr-1" />
          Cover Letter / Why You?
        </label>
        <textarea
          rows={4}
          value={form.coverLetter}
          onChange={(e) => update("coverLetter", e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Tell us about your experience, what excites you about this role, and why you'd be a great fit..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <FiAlertCircle size={14} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          "Submitting..."
        ) : (
          <>
            <FiSend size={14} />
            Submit Application
          </>
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center">
        We treat your data with care. Read our{" "}
        <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
