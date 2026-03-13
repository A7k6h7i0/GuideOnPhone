"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

export const Sidebar = ({ links }: { links: Array<{ href: Route; label: string }> }) => {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 lg:block">
        <ul className="grid gap-2 lg:grid-cols-1">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                <Link
                  className={`block rounded-lg px-3 py-2 text-sm transition ${isActive ? "bg-brand-50 text-brand-900" : "hover:bg-slate-100"}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden">
        <ul className="mx-auto flex max-w-md items-center justify-between px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href} className="flex-1">
                <Link
                  className={`mx-1 block rounded-lg px-2 py-2 text-center text-xs font-semibold transition ${isActive ? "bg-brand-50 text-brand-900" : "text-slate-600 hover:bg-slate-100"}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
