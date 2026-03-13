"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { Booking } from "@/types/models";
import { BookingsTable } from "@/components/dashboard/BookingsTable";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    apiClient.get<Booking[]>("/bookings/me/user").then((res) => setBookings(res.data)).catch(() => setBookings([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
