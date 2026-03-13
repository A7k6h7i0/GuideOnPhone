"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { Booking } from "@/types/models";
import { BookingsTable } from "@/components/dashboard/BookingsTable";

export default function AgentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    apiClient.get<Booking[]>("/bookings/me/agent").then((res) => setBookings(res.data)).catch(() => setBookings([]));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    document.body.classList.add("hide-agent-bookings-footer");
    return () => document.body.classList.remove("hide-agent-bookings-footer");
  }, []);

  const markCompleted = async (bookingId: string) => {
    await apiClient.patch(`/bookings/${bookingId}/complete`);
    loadBookings();
  };

  return (
    <div className="space-y-4 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">Assigned Bookings</h1>
      <BookingsTable bookings={bookings} view="AGENT" onMarkCompleted={markCompleted} />
    </div>
  );
}
