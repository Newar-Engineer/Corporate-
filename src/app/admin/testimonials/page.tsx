"use client";

import { useEffect, useState } from "react";
import DataTable from "@/features/admin/DataTable";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { FiStar } from "react-icons/fi";

interface Testimonial {
  id: string;
  client: string;
  company: string;
  message: string;
  rating: number;
  approved: boolean;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : data.testimonials || []);
    } catch {
      showToast({ type: "error", message: "Failed to load testimonials" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchTestimonials(); }, []);

  async function handleDelete(item: Testimonial) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Testimonial deleted" });
      fetchTestimonials();
    } catch {
      showToast({ type: "error", message: "Failed to delete testimonial" });
    }
  }

  async function handleToggleApprove(item: Testimonial) {
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ approved: !item.approved }),
      });
      if (!res.ok) throw new Error("Update failed");
      showToast({ type: "success", message: `Testimonial ${item.approved ? "unapproved" : "approved"}` });
      fetchTestimonials();
    } catch {
      showToast({ type: "error", message: "Failed to update testimonial" });
    }
  }

  const columns = [
    { key: "client", label: "Client" },
    { key: "company", label: "Company" },
    {
      key: "message",
      label: "Message",
      render: (item: Testimonial) => (
        <span className="text-gray-600">
          {item.message.length > 100 ? item.message.substring(0, 100) + "..." : item.message}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (item: Testimonial) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <FiStar
              key={i}
              size={14}
              className={i < item.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
            />
          ))}
        </div>
      ),
    },
    {
      key: "approved",
      label: "Approved",
      render: (item: Testimonial) =>
        item.approved ? (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Approved
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Pending
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={testimonials}
          onEdit={(item) => handleToggleApprove(item)}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>
    </div>
  );
}
