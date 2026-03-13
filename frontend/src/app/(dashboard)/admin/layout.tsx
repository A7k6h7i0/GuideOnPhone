import { Sidebar } from "@/components/layout/Sidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import type { Route } from "next";

const links: Array<{ href: Route; label: string }> = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/agents", label: "Verify Agents" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/analytics", label: "Analytics" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <Sidebar links={links} />
        <div>{children}</div>
      </div>
    </RoleGuard>
  );
}
