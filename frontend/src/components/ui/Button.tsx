import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ children, variant = "primary", className = "", ...props }: PropsWithChildren<ButtonProps>) => {
  const styles =
    variant === "primary"
      ? "bg-brand-700 text-white hover:bg-brand-900"
      : "bg-white text-ink border border-slate-200 hover:bg-slate-50";

  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${styles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
