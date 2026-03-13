"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_ROUTES, defaultDashboardByRole } from "@/lib/routes";
import { useAuthStore } from "@/store";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, isHydrated, setUser } = useAuthStore();

  const onLogout = () => {
    setUser(null);
    setIsOpen(false);
    router.push(APP_ROUTES.login);
  };

  const commonLinks = (
    <>
      <Link href="/how-it-works" onClick={() => setIsOpen(false)}>How it works</Link>
      <Link href="/guides" onClick={() => setIsOpen(false)}>Find guides</Link>
    </>
  );

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href={APP_ROUTES.home} className="text-lg font-bold text-brand-900">Guide on Phone</Link>

        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          {commonLinks}
          {!isHydrated ? null : user ? (
            <>
              <Link href={defaultDashboardByRole(user.role)}>Dashboard</Link>
              <button type="button" onClick={onLogout} className="rounded-lg bg-ink px-3 py-2 text-white">Logout</button>
            </>
          ) : null}
        </nav>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} border-t border-slate-200 bg-white md:hidden`}>
        <nav className="container-shell flex flex-col gap-3 py-4 text-sm font-medium">
          {commonLinks}
          {!isHydrated ? null : user ? (
            <>
              <Link href={defaultDashboardByRole(user.role)} onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button type="button" onClick={onLogout} className="rounded-lg bg-ink px-3 py-2 text-white">Logout</button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
};
