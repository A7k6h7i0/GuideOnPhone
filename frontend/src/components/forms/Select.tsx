import type { SelectHTMLAttributes } from "react";

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2 ${props.className || ""}`}
  />
);
