"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import type { Booking } from "@/types/models";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { PaymentButton } from "@/components/booking/PaymentButton";

export default function BookingDetailPage() {
  const params = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    apiClient.get<Booking[]>("/bookings/me/user").then((res) => {
      const found = res.data.find((b) => b._id === params.bookingId) ?? null;
      setBooking(found);
    }).catch(() => setBooking(null));
  }, [params.bookingId]);

  const pay = async () => {
    if (!booking) return;
    await apiClient.post(`/payments/booking/${booking._id}/order`);
    alert("Payment order created. Integrate Razorpay checkout in production.");
  };

  if (!booking) return <p>Loading booking...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Booking Details</h1>
      <BookingSummary booking={booking} />
      <PaymentButton onPay={pay} />
    </div>
  );
}
