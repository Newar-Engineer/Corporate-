"use client";

import { useEffect, useState } from "react";
import DataTable, { Column } from "@/features/admin/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  status: string;
  createdAt: string;
  resumeUrl?: string;
  coverLetter?: string;
  job?: { title: string; department: string };
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminApplicationsPage() {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/applications", { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : data.applications || []);
      } catch {
        showToast({ type: "error", message: "Failed to load applications" });
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const columns: Column<Application>[] = [
    {
      key: "name",
      label: "Applicant",
      render: (item: Application) => <span className="font-medium text-gray-900">{item.name}</span>,
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "jobTitle",
      label: "Job Title",
      render: (item: Application) => (
        <span className="text-gray-600">{item.job?.title || item.jobTitle || "-"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: Application) => {
        const colors: Record<string, string> = {
          pending: "bg-yellow-100 text-yellow-800",
          reviewed: "bg-blue-100 text-blue-800",
          shortlisted: "bg-purple-100 text-purple-800",
          rejected: "bg-red-100 text-red-800",
          hired: "bg-green-100 text-green-800",
        };
        const color = colors[item.status?.toLowerCase()] || "bg-gray-100 text-gray-800";
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${color}`}>
            {item.status || "pending"}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Applied Date",
      render: (item: Application) => (
        <span className="text-gray-500">{item.createdAt ? formatDate(item.createdAt) : "-"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={applications}
          onEdit={(item) => setSelected(item)}
          loading={loading}
        />
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Application Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Name</p>
                <p className="text-sm text-gray-900">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                <p className="text-sm text-gray-900">{selected.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                <p className="text-sm text-gray-900">{selected.phone || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                <p className="text-sm text-gray-900 capitalize">{selected.status || "pending"}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Job Applied For</p>
              <p className="text-sm text-gray-900">{selected.job?.title || selected.jobTitle || "-"}</p>
              {selected.job?.department && (
                <p className="text-xs text-gray-500">{selected.job.department}</p>
              )}
            </div>

            {selected.resumeUrl && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Resume</p>
                <a
                  href={selected.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:text-amber-700 underline"
                >
                  View Resume
                </a>
              </div>
            )}

            {selected.coverLetter && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Cover Letter</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.coverLetter}</p>
              </div>
            )}

            <div className="pt-2">
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
