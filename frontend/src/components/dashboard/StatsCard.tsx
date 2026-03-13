export const StatsCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-5">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
  </div>
);
