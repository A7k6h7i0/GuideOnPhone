export const EarningsChart = ({ monthlyEarnings }: { monthlyEarnings: number[] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-5">
    <p className="text-sm font-semibold">Monthly Earnings</p>
    <div className="mt-4 flex h-56 items-end gap-2 sm:h-40">
      {monthlyEarnings.map((value, idx) => (
        <div key={idx} className="flex-1 rounded-t bg-brand-500" style={{ height: `${Math.max(value, 5)}%` }} />
      ))}
    </div>
  </div>
);
