"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/Button";

type PendingAgent = {
  _id: string;
  city: string;
  state: string;
  userId: { name: string; email: string; phone: string };
};

export default function AdminAgentsPage() {
  const [items, setItems] = useState<PendingAgent[]>([]);

  const load = async () => {
    const { data } = await apiClient.get<PendingAgent[]>("/admin/agents/pending");
    setItems(data);
  };

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  const verify = async (id: string, status: "APPROVED" | "REJECTED") => {
    await apiClient.patch(`/admin/agents/${id}/verify`, { status });
    await load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Pending Agent Verification</h1>
      {items.map((item) => (
        <div key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-semibold">{item.userId.name}</p>
          <p className="text-sm text-slate-600">{item.city}, {item.state} | {item.userId.email}</p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => verify(item._id, "APPROVED")}>Approve</Button>
            <Button variant="secondary" onClick={() => verify(item._id, "REJECTED")}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
