import type { Payment } from "@/types/models";

export const PaymentsTable = ({ payments }: { payments: Payment[] }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50 text-left">
        <tr>
          <th className="px-5 py-4 sm:px-4 sm:py-3">Status</th>
          <th className="px-5 py-4 sm:px-4 sm:py-3">Amount</th>
          <th className="px-5 py-4 sm:px-4 sm:py-3">Txn</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p._id} className="border-t border-slate-100">
            <td className="px-5 py-4 sm:px-4 sm:py-3">{p.status}</td>
            <td className="px-5 py-4 sm:px-4 sm:py-3">INR {p.amount}</td>
            <td className="px-5 py-4 sm:px-4 sm:py-3">{p.transactionId ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
