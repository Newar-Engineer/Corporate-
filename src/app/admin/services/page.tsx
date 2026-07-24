"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface Service {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  }

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/services", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : data.services || []);
    } catch {
      showToast({ type: "error", message: "Failed to load services" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchServices(); }, []);

  async function handleDelete(service: Service) {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Service deleted successfully" });
      fetchServices();
    } catch {
      showToast({ type: "error", message: "Failed to delete service" });
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item: Service) => <span className="font-semibold text-gray-900">{item.title}</span>,
    },
    {
      key: "slug",
      label: "Slug",
      render: (item: Service) => (
        <code className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{item.slug}</code>
      ),
    },
    {
      key: "order",
      label: "Order",
      render: (item: Service) => <span className="text-center block">{item.order}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <Button variant="primary" onClick={() => router.push("/admin/services/new")}>
          Add New Service
        </Button>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={services}
          onEdit={(item) => router.push(`/admin/services/${item.id}/edit`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>
    </div>
  );
}
