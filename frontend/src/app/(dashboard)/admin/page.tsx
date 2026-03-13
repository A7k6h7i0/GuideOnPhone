 "use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { apiClient } from "@/lib/apiClient";

export default function AdminDashboardPage() {
  const [data, setData] = useState<{ totalBookings: number; platformRevenue: number; pendingAgents: number } | null>(null);

  useEffect(() => {
    apiClient.get("/admin/analytics").then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Pending Agents" value={data?.pendingAgents ?? 0} />
        <StatsCard label="Total Bookings" value={data?.totalBookings ?? 0} />
        <StatsCard label="Platform Revenue" value={`INR ${data?.platformRevenue ?? 0}`} />
      </div>
    </div>
  );
}
