"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/features/admin/DataTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: string;
  publishedAt?: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminBlogPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    } catch {
      showToast({ type: "error", message: "Failed to load blog posts" });
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchPosts(); }, []);

  async function handleDelete(post: BlogPost) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast({ type: "success", message: "Post deleted" });
      fetchPosts();
    } catch {
      showToast({ type: "error", message: "Failed to delete post" });
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item: BlogPost) => <span className="font-medium text-gray-900">{item.title}</span>,
    },
    { key: "author", label: "Author" },
    {
      key: "status",
      label: "Status",
      render: (item: BlogPost) =>
        item.status === "published" ? (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Published
          </span>
        ) : item.status === "draft" ? (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Draft
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {item.status}
          </span>
        ),
    },
    {
      key: "publishedAt",
      label: "Published Date",
      render: (item: BlogPost) => (
        <span className="text-gray-500">
          {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Button variant="primary" onClick={() => router.push("/admin/blog/new")}>
          Add New Post
        </Button>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={posts}
          onEdit={(item) => router.push(`/admin/blog/${item.id}/edit`)}
          onDelete={handleDelete}
          loading={loading}
        />
      </Card>
    </div>
  );
}
