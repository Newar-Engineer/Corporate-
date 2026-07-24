"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    role: "",
    photoUrl: "",
    bio: "",
    socialLinks: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.role.trim()) errs.role = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let socialLinksParsed = {};
      if (form.socialLinks.trim()) {
        try {
          socialLinksParsed = JSON.parse(form.socialLinks);
        } catch {
          showToast({ type: "error", message: "Social links must be valid JSON" });
          setLoading(false);
          return;
        }
      }

      const payload = {
        name: form.name,
        role: form.role,
        photoUrl: form.photoUrl || undefined,
        bio: form.bio,
        socialLinks: socialLinksParsed,
      };

      const res = await fetch("/api/team", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create team member");
      }

      showToast({ type: "success", message: "Team member created" });
      router.push("/admin/team");
    } catch (err) {
      showToast({ type: "error", message: err instanceof Error ? err.message : "Failed to create team member" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Add New Team Member</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            required
          />
          <Input
            label="Role"
            name="role"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            error={errors.role}
            required
          />
          <ImageUpload
            label="Photo"
            onUpload={(url) => handleChange("photoUrl", url)}
            currentImage={form.photoUrl}
          />
          <Textarea
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
          <Textarea
            label="Social Links (JSON)"
            name="socialLinks"
            value={form.socialLinks}
            onChange={(e) => handleChange("socialLinks", e.target.value)}
            placeholder='{"linkedin": "https://linkedin.com/in/...", "twitter": "https://twitter.com/..."}'
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" loading={loading}>
              Create Member
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
