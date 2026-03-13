import type { PropsWithChildren } from "react";

export const Badge = ({ children }: PropsWithChildren) => (
  <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-900">{children}</span>
);
