"use client";

import { useEffect, useState, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

const typeOptions = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function EditCareerPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    department: "",
    description: "",
    requirements: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/careers/${id}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          location: data.location || "",
          type: data.type || "",
          department: data.department || "",
          description: data.description || "",
          requirements: data.requirements || "",
          salary: data.salary || "",
        });
      })
      .catch(() => {
        showToast({ type: "error", message: "Failed to load career" });
        router.push("/admin/careers");
      })
      .finally(() => setLoading(false));
  }, [id, router, showToast]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.department.trim()) errs.department = "Department is required";
    if (!form.type) errs.type = "Type is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/careers/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update career");
      }

      showToast({ type: "success", message: "Career updated successfully" });
      router.push("/admin/careers");
    } catch (err) {
      showToast({ type: "error", message: err instanceof Error ? err.message : "Failed to update career" });
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
      <h1 className="text-2xl font-bold text-gray-900">Edit Position</h1>
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
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={errors.location}
            required
          />
          <Select
            label="Type"
            name="type"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            options={typeOptions}
            error={errors.type}
            required
          />
          <Input
            label="Department"
            name="department"
            value={form.department}
            onChange={(e) => handleChange("department", e.target.value)}
            error={errors.department}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            required
          />
          <Textarea
            label="Requirements"
            name="requirements"
            value={form.requirements}
            onChange={(e) => handleChange("requirements", e.target.value)}
          />
          <Input
            label="Salary"
            name="salary"
            value={form.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            placeholder="e.g. $50,000 - $70,000"
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" loading={saving}>
              Update Position
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/careers")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
