"use client";

import { useEffect, useState } from "react";
import {
  FiMail,
  FiEye,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
  FiFileText,
} from "react-icons/fi";
import StatsCard from "@/components/admin/StatsCard";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface AnalyticsData {
  totalMessages?: number;
  messagesThisMonth?: number;
  totalPageViews?: number;
  pageViewsThisMonth?: number;
  totalServices?: number;
  totalTeam?: number;
  totalTestimonials?: number;
  totalPosts?: number;
  totalApplications?: number;
  topPages?: { path: string; views: number }[];
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size={40} className="text-amber-600" />
      </div>
    );
  }

  const maxViews =
    data?.topPages && data.topPages.length > 0
      ? Math.max(...data.topPages.map((p) => p.views))
      : 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-gray-500">Website performance and statistics.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Messages"
          value={data?.totalMessages ?? 0}
          icon={<FiMail size={22} />}
        />
        <StatsCard
          title="Messages This Month"
          value={data?.messagesThisMonth ?? 0}
          icon={<FiMessageSquare size={22} />}
        />
        <StatsCard
          title="Total Page Views"
          value={data?.totalPageViews ?? 0}
          icon={<FiEye size={22} />}
        />
        <StatsCard
          title="Views This Month"
          value={data?.pageViewsThisMonth ?? 0}
          icon={<FiTrendingUp size={22} />}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Services" value={data?.totalServices ?? 0} icon={<FiFileText size={22} />} />
        <StatsCard title="Team Members" value={data?.totalTeam ?? 0} icon={<FiUsers size={22} />} />
        <StatsCard title="Testimonials" value={data?.totalTestimonials ?? 0} icon={<FiMessageSquare size={22} />} />
        <StatsCard title="Blog Posts" value={data?.totalPosts ?? 0} icon={<FiFileText size={22} />} />
      </div>

      {data?.topPages && data.topPages.length > 0 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Viewed Pages</h2>
          <div className="space-y-4">
            {data.topPages.map((page) => (
              <div key={page.path} className="flex items-center gap-4">
                <span className="w-48 truncate text-sm text-gray-700 font-medium">
                  {page.path}
                </span>
                <div className="flex-1">
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${(page.views / maxViews) * 100}%` }}
                    >
                      {page.views / maxViews > 0.15 && (
                        <span className="text-xs text-white font-medium">{page.views}</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-16 text-right font-mono">{page.views}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(!data?.topPages || data.topPages.length === 0) && (
        <Card>
          <div className="text-center py-8">
            <FiEye size={40} className="mx-auto text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">No page view data available yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
