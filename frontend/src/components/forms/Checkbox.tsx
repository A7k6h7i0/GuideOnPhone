import type { InputHTMLAttributes } from "react";

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} type="checkbox" className={`h-4 w-4 rounded border-slate-300 ${props.className || ""}`} />
);
