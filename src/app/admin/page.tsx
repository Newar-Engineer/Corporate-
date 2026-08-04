"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiBriefcase, FiMessageSquare, FiEye, FiFileText, FiStar } from "react-icons/fi";
import StatsCard from "@/features/admin/StatsCard";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface DashboardStats {
  totalServices?: number;
  totalTeam?: number;
  totalTestimonials?: number;
  totalPosts?: number;
  totalCareers?: number;
  totalApplications?: number;
  totalMessages?: number;
  totalPageViews?: number;
  topPages?: { path: string; views: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(user.name || user.email || "Admin");
    } catch {
      setUserName("Admin");
    }

    const token = localStorage.getItem("token");
    fetch("/api/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size={40} className="text-amber-600" />
      </div>
    );
  }

  const maxViews = stats?.topPages?.length ? Math.max(...stats.topPages.map((p) => p.views)) : 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}</h1>
        <p className="mt-1 text-gray-500">Here&apos;s an overview of your website.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard title="Services" value={stats?.totalServices ?? 0} icon={<FiBriefcase size={22} />} />
        <StatsCard title="Team Members" value={stats?.totalTeam ?? 0} icon={<FiUsers size={22} />} />
        <StatsCard title="Testimonials" value={stats?.totalTestimonials ?? 0} icon={<FiStar size={22} />} />
        <StatsCard title="Blog Posts" value={stats?.totalPosts ?? 0} icon={<FiFileText size={22} />} />
        <StatsCard title="Careers" value={stats?.totalCareers ?? 0} icon={<FiBriefcase size={22} />} />
        <StatsCard title="Applications" value={stats?.totalApplications ?? 0} icon={<FiFileText size={22} />} />
        <StatsCard title="Messages" value={stats?.totalMessages ?? 0} icon={<FiMessageSquare size={22} />} />
        <StatsCard title="Page Views" value={stats?.totalPageViews ?? 0} icon={<FiEye size={22} />} />
      </div>

      {stats?.topPages && stats.topPages.length > 0 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Viewed Pages</h2>
          <div className="space-y-3">
            {stats.topPages.map((page) => (
              <div key={page.path} className="flex items-center gap-4">
                <span className="w-40 truncate text-sm text-gray-700 font-medium">{page.path}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${(page.views / maxViews) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-16 text-right">{page.views}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
