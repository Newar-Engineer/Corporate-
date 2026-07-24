"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string | null;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminTeamPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    setLoading(true);
    try {
      const res = await fetch("/api/team", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : data.team || []);
    } catch {
      showToast({ type: "error", message: "Failed to load team members" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchMembers(); }, []);

  async function handleDelete(member: TeamMember) {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Team member deleted" });
      fetchMembers();
    } catch {
      showToast({ type: "error", message: "Failed to delete team member" });
    }
  }

  const columns = [
    {
      key: "photo",
      label: "Photo",
      render: (item: TeamMember) =>
        item.photoUrl ? (
          <Image
            src={item.photoUrl}
            alt={item.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-sm font-bold">
            {item.name.charAt(0).toUpperCase()}
          </div>
        ),
    },
    {
      key: "name",
      label: "Name",
      render: (item: TeamMember) => <span className="font-medium text-gray-900">{item.name}</span>,
    },
    { key: "role", label: "Role" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <Button variant="primary" onClick={() => router.push("/admin/team/new")}>
          Add New Member
        </Button>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={members}
          onEdit={(item) => router.push(`/admin/team/${item.id}/edit`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>
    </div>
  );
}
