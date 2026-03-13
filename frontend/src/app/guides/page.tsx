"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { Agent } from "@/types/models";
import { GuideCard } from "@/components/guides/GuideCard";
import { GuideFilters } from "@/components/guides/GuideFilters";
import { demoGuides } from "@/lib/demoGuides";
import { APP_ROUTES } from "@/lib/routes";
import Link from "next/link";
import { useAuthStore } from "@/store";

export default function GuidesPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [city, setCity] = useState("");
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    const load = async () => {
      const { data } = await apiClient.get<Agent[]>("/agents", { params: city ? { city } : {} });
      setAgents(data);
    };
    load().catch(() => setAgents([]));
  }, [city]);

  const filteredDemoGuides = useMemo(() => {
    if (!city.trim()) return demoGuides;
    const query = city.trim().toLowerCase();
    return demoGuides.filter((guide) => guide.city.toLowerCase().includes(query));
  }, [city]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Find Guides</h1>
      <GuideFilters city={city} onCityChange={setCity} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.length > 0
          ? agents.map((agent) => <GuideCard key={agent._id} agent={agent} />)
          : filteredDemoGuides.map((guide) => (
            <div key={guide.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-lg font-semibold">{guide.name}</p>
              <p className="text-sm text-slate-600">{guide.city}, {guide.state}</p>
              <p className="mt-2 text-sm text-slate-700">{guide.bio}</p>
              <div className="mt-3 text-sm text-slate-700">
                <p>Languages: {guide.languages.join(", ")}</p>
                <p>Hours: {guide.availableHours}</p>
                <p>Rating: {guide.avgRating.toFixed(1)} | INR {guide.guideFee}/trip</p>
                <p>Cab booking: {guide.cabBooking ? "Yes" : "No"} | Hotel booking: {guide.hotelBooking ? "Yes" : "No"}</p>
                <p>Phone: {guide.phone}</p>
              </div>
              {isHydrated && user ? (
                <span className="mt-4 inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  Bookings opening soon
                </span>
              ) : (
                <Link href={APP_ROUTES.userLogin} className="mt-4 inline-block rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white">
                  Sign in to book
                </Link>
              )}
            </div>
          ))}
      </div>
      {agents.length === 0 && filteredDemoGuides.length > 0 ? (
        <p className="text-xs text-slate-500">
          Featured profiles are sample listings shown while verification is in progress.
        </p>
      ) : null}
      {agents.length === 0 && filteredDemoGuides.length === 0 ? (
        <p className="text-sm text-slate-600">No guides found for this city.</p>
      ) : null}
    </div>
  );
}
