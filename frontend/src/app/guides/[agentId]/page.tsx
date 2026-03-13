"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import type { Agent } from "@/types/models";
import { GuideProfileHeader } from "@/components/guides/GuideProfileHeader";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store";
import { APP_ROUTES } from "@/lib/routes";

export default function GuideProfilePage() {
  const params = useParams<{ agentId: string }>();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    apiClient.get(`/agents/${params.agentId}`).then((res) => setAgent(res.data)).catch(() => setAgent(null));
  }, [params.agentId]);

  if (!agent) {
    return <p>Loading guide...</p>;
  }

  const bookNow = async () => {
    if (isHydrated && !user) {
      router.push(APP_ROUTES.userLogin);
      return;
    }

    if (user && user.role !== "USER") {
      alert("Please login as a traveler to book this guide.");
      router.push(APP_ROUTES.userLogin);
      return;
    }

    try {
      const { data } = await apiClient.post("/bookings", {
        agentId: agent._id,
        city: agent.city,
        date: new Date().toISOString(),
        durationHours: 1,
        notes: "Auto-created from guide profile"
      });
      router.push(`/bookings/${data._id}`);
    } catch {
      alert("Booking failed. Please login as traveler and try again.");
      router.push(APP_ROUTES.userLogin);
    }
  };

  return (
    <div className="space-y-6">
      <GuideProfileHeader agent={agent} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p>Available Hours: {agent.availableHours}</p>
        <p>Can book cab: {agent.cabBooking ? "Yes" : "No"}</p>
        <p>Can book hotel: {agent.hotelBooking ? "Yes" : "No"}</p>
      </div>
      <Button onClick={bookNow}>Book this guide</Button>
    </div>
  );
}
