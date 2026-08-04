"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  link: string | null;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminPortfolioPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    client: "",
    link: "",
    description: "",
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  function getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  }

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio?all=true", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data.portfolioItems || []);
    } catch {
      showToast({ type: "error", message: "Failed to load portfolio items" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => {
    fetchItems();
  }, []);

  function handleOpenCreate() {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Web Development",
      client: "",
      link: "",
      description: "",
      isActive: true,
    });
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: PortfolioItem) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category || "Web Development",
      client: item.client || "",
      link: item.link || "",
      description: item.description || "",
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  }

  async function handleToggleActive(item: PortfolioItem) {
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showToast({
        type: "success",
        message: `Project ${!item.isActive ? "activated" : "deactivated"} successfully`,
      });
      fetchItems();
    } catch {
      showToast({ type: "error", message: "Failed to change project status" });
    }
  }

  async function handleDelete(item: PortfolioItem) {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Portfolio project deleted" });
      fetchItems();
    } catch {
      showToast({ type: "error", message: "Failed to delete project" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast({ type: "error", message: "Title and description are required" });
      return;
    }

    setSubmitting(true);
    try {
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : "/api/portfolio";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save portfolio project");
      }

      showToast({
        type: "success",
        message: editingItem ? "Project updated successfully" : "Project created successfully",
      });
      setIsModalOpen(false);
      fetchItems();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      showToast({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title & Client",
      render: (item: PortfolioItem) => (
        <div>
          <div className="font-semibold text-gray-900">{item.title}</div>
          {item.client && <div className="text-xs text-gray-500">{item.client}</div>}
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item: PortfolioItem) => (
        <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {item.category}
        </span>
      ),
    },
    {
      key: "link",
      label: "Live Link",
      render: (item: PortfolioItem) =>
        item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline max-w-[150px] truncate block"
          >
            {item.link}
          </a>
        ) : (
          <span className="text-xs text-gray-400">None</span>
        ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (item: PortfolioItem) => (
        <button
          onClick={() => handleToggleActive(item)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            item.isActive
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.isActive ? "Active" : "Draft"}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Projects</h1>
          <p className="text-sm text-gray-500">Manage projects showcased in your portfolio section.</p>
        </div>
        <Button variant="primary" onClick={handleOpenCreate}>
          Add Project
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={items}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>

      {/* Modal for Creating / Editing Portfolio Item */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Portfolio Project" : "Add Portfolio Project"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Acme E-Commerce Platform"
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={[
              { value: "Web Development", label: "Web Development" },
              { value: "E-Commerce", label: "E-Commerce" },
              { value: "Education", label: "Education" },
              { value: "Portfolio Website", label: "Portfolio Website" },
              { value: "Food & Restaurant", label: "Food & Restaurant" },
              { value: "Mobile App", label: "Mobile App" },
            ]}
          />

          <Input
            label="Client Name (Optional)"
            name="client"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="e.g. Acme Corp"
          />

          <Input
            label="Live Website URL (Optional)"
            name="link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="e.g. https://example.com"
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief overview of the project..."
            rows={3}
            required
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Publish immediately (Active)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Saving..." : editingItem ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
