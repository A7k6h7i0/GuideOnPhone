"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { apiClient } from "@/lib/apiClient";
import type { Agent, Booking } from "@/types/models";

export default function AgentDashboardPage() {
  const [profile, setProfile] = useState<Agent | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    apiClient.get<Agent>("/agents/dashboard/me").then((res) => setProfile(res.data)).catch(() => setProfile(null));
    apiClient.get<Booking[]>("/bookings/me/agent").then((res) => setBookings(res.data)).catch(() => setBookings([]));
  }, []);

  const activeBookings = useMemo(() => bookings.filter((booking) => booking.status !== "COMPLETED" && booking.status !== "CANCELLED").length, [bookings]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Agent Dashboard</h1>
      {profile?.status !== "APPROVED" ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Complete Aadhaar and GST verification to activate your profile.</p>
          <Link
            href="/agent/profile"
            className="w-full rounded-xl bg-brand-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brand-900 sm:w-fit"
          >
            Complete next steps
          </Link>
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Customers Served" value={profile?.totalCustomersServed ?? 0} />
        <StatsCard label="Active Bookings" value={activeBookings} />
        <StatsCard label="Avg Rating" value={profile?.avgRating?.toFixed(1) ?? "0.0"} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Verification Status: {profile?.status ?? "PENDING_VERIFICATION"}</p>
        <p className="mt-2">City Coverage: {profile ? `${profile.city}, ${profile.state}` : "-"}</p>
        <p>Available Hours: {profile?.availableHours ?? "-"}</p>
      </div>
    </div>
  );
}
