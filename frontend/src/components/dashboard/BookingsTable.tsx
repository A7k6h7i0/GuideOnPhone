import type { Booking } from "@/types/models";
import { Button } from "@/components/ui/Button";

interface BookingsTableProps {
  bookings: Booking[];
  view?: "USER" | "AGENT";
  onMarkCompleted?: (bookingId: string) => void;
}

export const BookingsTable = ({ bookings, view = "USER", onMarkCompleted }: BookingsTableProps) => (
  <div className="overflow-x-hidden rounded-2xl border border-slate-200 bg-white">
    <table className="w-full table-fixed text-xs sm:text-sm">
      <thead className="bg-slate-50 text-left">
        <tr>
          {view === "AGENT" ? <th className="px-2 py-2 md:px-4 md:py-3">Customer</th> : null}
          <th className="px-2 py-2 md:px-4 md:py-3">City</th>
          <th className="px-2 py-2 md:px-4 md:py-3">Date</th>
          <th className="px-2 py-2 md:px-4 md:py-3">Status</th>
          <th className="px-2 py-2 md:px-4 md:py-3">Amount</th>
          {view === "AGENT" ? <th className="px-2 py-2 md:px-4 md:py-3">Action</th> : null}
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b._id} className="border-t border-slate-100 align-top">
            {view === "AGENT" ? (
              <td className="px-2 py-2 md:px-4 md:py-3">
                {typeof b.userId === "string" ? (
                  "-"
                ) : (
                  <div className="min-w-0">
                    <p className="font-medium break-words">{b.userId.name}</p>
                    <p className="text-xs text-slate-500 break-words">{b.userId.phone} {b.userId.email ? `| ${b.userId.email}` : ""}</p>
                  </div>
                )}
              </td>
            ) : null}
            <td className="px-2 py-2 md:px-4 md:py-3 break-words">{b.city}</td>
            <td className="px-2 py-2 md:px-4 md:py-3 break-words">{new Date(b.date).toLocaleDateString()}</td>
            <td className="px-2 py-2 md:px-4 md:py-3 break-words">{b.status}</td>
            <td className="px-2 py-2 md:px-4 md:py-3 break-words">INR {b.totalAmount}</td>
            {view === "AGENT" ? (
              <td className="px-2 py-2 md:px-4 md:py-3">
                <Button
                  className="w-full px-2 py-2 text-[11px] sm:w-auto sm:px-3 sm:py-1 sm:text-xs"
                  disabled={b.status === "COMPLETED"}
                  onClick={() => onMarkCompleted?.(b._id)}
                >
                  {b.status === "COMPLETED" ? "Completed" : "Mark Completed"}
                </Button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
