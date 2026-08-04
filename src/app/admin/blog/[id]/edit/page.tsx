"use client";

import { useEffect, useState, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import ImageUpload from "@/features/admin/ImageUpload";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function EditBlogPostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    coverImage: "",
    status: "draft",
    publishedAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/posts/${id}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          author: data.author || "",
          coverImage: data.coverImage || "",
          status: data.status || "draft",
          publishedAt: data.publishedAt ? data.publishedAt.split("T")[0] : "",
        });
      })
      .catch(() => {
        showToast({ type: "error", message: "Failed to load post" });
        router.push("/admin/blog");
      })
      .finally(() => setLoading(false));
  }, [id, router, showToast]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.content.trim()) errs.content = "Content is required";
    if (!form.author.trim()) errs.author = "Author is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt,
        author: form.author,
        coverImage: form.coverImage || undefined,
        status: form.status,
      };
      if (form.publishedAt) payload.publishedAt = form.publishedAt;

      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      showToast({ type: "success", message: "Post updated successfully" });
      router.push("/admin/blog");
    } catch (err) {
      showToast({ type: "error", message: err instanceof Error ? err.message : "Failed to update post" });
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
      <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
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
            label="Author"
            name="author"
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            error={errors.author}
            required
          />
          <Textarea
            label="Content"
            name="content"
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
            error={errors.content}
            required
          />
          <Textarea
            label="Excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={(e) => handleChange("excerpt", e.target.value)}
          />
          <ImageUpload
            label="Cover Image"
            onUpload={(url) => handleChange("coverImage", url)}
            currentImage={form.coverImage}
          />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            options={statusOptions}
          />
          <Input
            label="Published Date"
            name="publishedAt"
            type="date"
            value={form.publishedAt}
            onChange={(e) => handleChange("publishedAt", e.target.value)}
          />

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="primary" loading={saving}>
              Update Post
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
