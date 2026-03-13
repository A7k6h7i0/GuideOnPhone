import type { PropsWithChildren } from "react";

export const Modal = ({ children }: PropsWithChildren) => {
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">{children}</div>;
};
