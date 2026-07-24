"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  resumeUrl?: string;
}

interface ApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
}

export default function ApplicationForm({
  jobSlug,
  jobTitle,
}: ApplicationFormProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email address";
    }
    if (!form.resumeUrl.trim()) {
      errs.resumeUrl = "Resume URL is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, jobSlug }),
      });
      if (!res.ok) throw new Error("Failed to submit application");
      showToast({ type: "success", message: "Application submitted successfully!" });
      setSubmitted(true);
    } catch {
      showToast({ type: "error", message: "Failed to submit application. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Application Submitted
        </h3>
        <p className="text-sm text-green-700">
          Thank you for applying to <strong>{jobTitle}</strong>. We will review
          your application and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 mb-2">
        <p className="text-sm text-gray-700">
          Applying for: <span className="font-semibold text-gray-900">{jobTitle}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
          required
          placeholder="Your full name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          required
          placeholder="your@email.com"
        />
      </div>
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        placeholder="+977-98XXXXXXXX"
      />
      <Input
        label="Resume URL"
        name="resumeUrl"
        value={form.resumeUrl}
        onChange={(e) => updateField("resumeUrl", e.target.value)}
        error={errors.resumeUrl}
        required
        placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
      />
      <Textarea
        label="Cover Letter"
        name="coverLetter"
        value={form.coverLetter}
        onChange={(e) => updateField("coverLetter", e.target.value)}
        placeholder="Tell us why you'd be a great fit..."
        rows={5}
      />
      <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto">
        Submit Application
      </Button>
    </form>
  );
}
