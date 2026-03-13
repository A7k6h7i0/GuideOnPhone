"use client";

import { useEffect, useMemo, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { GuideFilters } from "@/components/guides/GuideFilters";
import { apiClient } from "@/lib/apiClient";
import type { Agent, Booking, Payment } from "@/types/models";
import { demoGuides } from "@/lib/demoGuides";

export default function UserDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    apiClient.get<Booking[]>("/bookings/me/user").then((res) => setBookings(res.data)).catch(() => setBookings([]));
    apiClient.get<Payment[]>("/payments/me").then((res) => setPayments(res.data)).catch(() => setPayments([]));
  }, []);

  useEffect(() => {
    apiClient.get<Agent[]>("/agents", { params: city ? { city } : {} }).then((res) => setAgents(res.data)).catch(() => setAgents([]));
  }, [city]);

  const filteredDemoGuides = useMemo(() => {
    if (!city.trim()) return demoGuides;
    const query = city.trim().toLowerCase();
    return demoGuides.filter((guide) => guide.city.toLowerCase().includes(query));
  }, [city]);

  const completedTrips = useMemo(() => bookings.filter((booking) => booking.status === "COMPLETED").length, [bookings]);
  const totalSpend = useMemo(() => payments.filter((payment) => payment.status === "PAID").reduce((sum, payment) => sum + payment.amount, 0), [payments]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Traveler Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Total Bookings" value={bookings.length} />
        <StatsCard label="Completed Trips" value={completedTrips} />
        <StatsCard label="Total Spend" value={`INR ${totalSpend.toFixed(2)}`} />
      </div>
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold">Search Local Agents by City</h2>
        <GuideFilters city={city} onCityChange={setCity} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                <span className="mt-4 inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  Bookings opening soon
                </span>
              </div>
            ))}
        </div>
        {agents.length === 0 && filteredDemoGuides.length === 0 ? (
          <p className="text-sm text-slate-600">No guides found for this city.</p>
        ) : null}
        {agents.length === 0 && filteredDemoGuides.length > 0 ? (
          <p className="text-xs text-slate-500">Featured profiles are sample listings shown while verification is in progress.</p>
        ) : null}
      </div>
    </div>
  );
}
