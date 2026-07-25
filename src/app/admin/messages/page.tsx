"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminMessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch {
      showToast({ type: "error", message: "Failed to load messages" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchMessages(); }, []);

  async function handleMarkRead(msg: ContactMessage) {
    if (msg.isRead) return;
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isRead: true }),
      });
      if (!res.ok) throw new Error("Update failed");
      showToast({ type: "success", message: "Message marked as read" });
      fetchMessages();
    } catch {
      showToast({ type: "error", message: "Failed to update message" });
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item: ContactMessage) => (
        <span className={`${item.isRead ? "text-gray-600" : "font-semibold text-gray-900"}`}>{item.name}</span>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "subject",
      label: "Subject",
      render: (item: ContactMessage) => (
        <span className={item.isRead ? "text-gray-600" : "font-medium text-gray-900"}>
          {item.subject && item.subject.length > 40 ? item.subject.substring(0, 40) + "..." : item.subject || "-"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: ContactMessage) => (
        <span className="text-gray-500 text-xs">{item.createdAt ? formatDate(item.createdAt) : "-"}</span>
      ),
    },
    {
      key: "isRead",
      label: "Status",
      render: (item: ContactMessage) =>
        item.isRead ? (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            Read
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            New
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={messages}
          onEdit={(item) => {
            setSelected(item);
            if (!item.isRead) handleMarkRead(item);
          }}
          loading={loading}
        />
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Message Details">
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
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Subject</p>
              <p className="text-sm text-gray-900">{selected.subject || "(No subject)"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Message</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Received</p>
              <p className="text-sm text-gray-500">{selected.createdAt ? formatDate(selected.createdAt) : "-"}</p>
            </div>
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
