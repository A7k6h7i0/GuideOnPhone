import type { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{children}</div>;
};
