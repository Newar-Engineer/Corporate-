"use client";

import { useState } from "react";
import { FiSend, FiZap, FiShield, FiCreditCard } from "react-icons/fi";
import Button, { ButtonLink } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

export default function LeadBanner() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Quick Inquiry from Homepage" }),
      });
      if (!res.ok) throw new Error("Failed");
      showToast({ type: "success", message: "Message sent! We'll get back to you shortly." });
      setShowModal(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      showToast({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-light/10 to-primary/20" />
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Let&apos;s discuss your website or app idea. From design to
                launch — we build digital products that deliver real results.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <FiShield size={16} className="text-gold shrink-0" />
                  3 months free bug fixes after launch
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <FiCreditCard size={16} className="text-gold shrink-0" />
                  Pay with eSewa, Khalti or bank transfer
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="shadow-lg shadow-primary/25"
              >
                <FiZap size={18} />
                Get a Free Quote in 24 Hours
              </Button>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
              >
                <FiSend size={16} />
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-800 bg-black shadow-2xl shadow-black/40">
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Quick Inquiry</h3>
              <button
                onClick={() => setShowModal(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <Input
                label="Your Name"
                name="name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                placeholder="John Shakya"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                placeholder="john@example.com"
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+977-98XXXXXXXX"
              />
              <Textarea
                label="Brief Message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Tell us about your project..."
              />
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                <FiSend size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}