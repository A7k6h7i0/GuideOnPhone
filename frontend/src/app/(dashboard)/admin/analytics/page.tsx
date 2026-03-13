"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<{ totalBookings: number; platformRevenue: number; pendingAgents: number } | null>(null);

  useEffect(() => {
    apiClient.get("/admin/analytics").then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      {data ? (
        <div className="mt-4 space-y-2 text-sm">
          <p>Total bookings: {data.totalBookings}</p>
          <p>Platform revenue: INR {data.platformRevenue}</p>
          <p>Pending agents: {data.pendingAgents}</p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-slate-600">Unable to fetch analytics.</p>
      )}
    </div>
  );
}
