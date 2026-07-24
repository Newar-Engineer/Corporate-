"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import ImageUpload from "@/components/admin/ImageUpload";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

const iconOptions = [
  { value: "FiMonitor", label: "Monitor" },
  { value: "FiShoppingBag", label: "Shopping Bag" },
  { value: "FiTruck", label: "Truck" },
  { value: "FiTool", label: "Tool" },
  { value: "FiUsers", label: "Users" },
  { value: "FiTrendingUp", label: "Trending Up" },
  { value: "FiSettings", label: "Settings" },
  { value: "FiHeadphones", label: "Headphones" },
];

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function NewServicePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    imageUrl: "",
    order: 0,
  });
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleChange(field: string, value: string | number) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (field === "title") {
      setSlug(generateSlug(value as string));
    }
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.icon) errs.icon = "Icon is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...form, slug }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create service");
      }

      showToast({ type: "success", message: "Service created successfully" });
      router.push("/admin/services");
    } catch (err) {
      showToast({ type: "error", message: err instanceof Error ? err.message : "Failed to create service" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
          />

          {slug && (
            <p className="-mt-3 text-xs text-gray-500">
              Slug: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-amber-600">{slug}</code>
            </p>
          )}

          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            required
          />

          <Select
            label="Icon"
            name="icon"
            value={form.icon}
            onChange={(e) => handleChange("icon", e.target.value)}
            options={iconOptions}
            error={errors.icon}
            required
          />

          <ImageUpload
            label="Service Image"
            onUpload={(url) => handleChange("imageUrl", url)}
            currentImage={form.imageUrl}
          />

          <Input
            label="Order"
            name="order"
            type="number"
            value={form.order}
            onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" loading={loading}>
              Create Service
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
