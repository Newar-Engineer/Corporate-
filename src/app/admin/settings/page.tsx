"use client";

import { useEffect, useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

interface Settings {
  siteName?: string;
  siteDescription?: string;
  address?: string;
  phone?: string;
  email?: string;
  businessHours?: string;
  socialLinks?: Record<string, string>;
  [key: string]: unknown;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [socialJson, setSocialJson] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/settings", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const settings = data.settings || data;
        setForm(settings);
        if (settings.socialLinks) {
          setSocialJson(JSON.stringify(settings.socialLinks, null, 2));
        }
      })
      .catch(() => {
        showToast({ type: "error", message: "Failed to load settings" });
      })
      .finally(() => setLoading(false));
  }, [showToast]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let socialLinksParsed = {};
      if (socialJson.trim()) {
        try {
          socialLinksParsed = JSON.parse(socialJson);
        } catch {
          showToast({ type: "error", message: "Social links must be valid JSON" });
          setSaving(false);
          return;
        }
      }

      const payload = { ...form, socialLinks: socialLinksParsed };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save settings");
      }

      showToast({ type: "success", message: "Settings saved successfully" });
    } catch (err) {
      showToast({ type: "error", message: err instanceof Error ? err.message : "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size={40} className="text-amber-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your website configuration.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Site Name"
            name="siteName"
            value={form.siteName || ""}
            onChange={(e) => handleChange("siteName", e.target.value)}
          />
          <Textarea
            label="Site Description"
            name="siteDescription"
            value={form.siteDescription || ""}
            onChange={(e) => handleChange("siteDescription", e.target.value)}
          />
          <Input
            label="Address"
            name="address"
            value={form.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            label="Business Hours"
            name="businessHours"
            value={form.businessHours || ""}
            onChange={(e) => handleChange("businessHours", e.target.value)}
            placeholder="e.g. Mon-Fri: 9:00 AM - 6:00 PM"
          />
          <Textarea
            label="Social Links (JSON)"
            name="socialLinks"
            value={socialJson}
            onChange={(e) => setSocialJson(e.target.value)}
            placeholder='{"facebook": "https://facebook.com/...", "twitter": "https://twitter.com/..."}'
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" loading={saving}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
