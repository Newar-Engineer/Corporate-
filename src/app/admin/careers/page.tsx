"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface Career {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  active: boolean;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminCareersPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCareers() {
    setLoading(true);
    try {
      const res = await fetch("/api/careers", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCareers(Array.isArray(data) ? data : data.careers || []);
    } catch {
      showToast({ type: "error", message: "Failed to load careers" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchCareers(); }, []);

  async function handleDelete(career: Career) {
    if (!confirm("Are you sure you want to delete this career?")) return;
    try {
      const res = await fetch(`/api/careers/${career.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Career deleted" });
      fetchCareers();
    } catch {
      showToast({ type: "error", message: "Failed to delete career" });
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item: Career) => <span className="font-medium text-gray-900">{item.title}</span>,
    },
    { key: "department", label: "Department" },
    {
      key: "type",
      label: "Type",
      render: (item: Career) => (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 capitalize">
          {item.type}
        </span>
      ),
    },
    { key: "location", label: "Location" },
    {
      key: "active",
      label: "Status",
      render: (item: Career) =>
        item.active ? (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Inactive
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
        <Button variant="primary" onClick={() => router.push("/admin/careers/new")}>
          Add New Position
        </Button>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={careers}
          onEdit={(item) => router.push(`/admin/careers/${item.id}/edit`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>
    </div>
  );
}
