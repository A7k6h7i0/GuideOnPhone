import type { Booking } from "@/types/models";

export const BookingSummary = ({ booking }: { booking: Booking }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="font-semibold">Booking #{booking._id.slice(-6)}</p>
    <p className="mt-2 text-sm">City: {booking.city}</p>
    <p className="text-sm">Status: {booking.status}</p>
    <p className="text-sm">Amount: INR {booking.totalAmount}</p>
  </div>
);
