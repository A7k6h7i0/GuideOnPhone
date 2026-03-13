import { Sidebar } from "@/components/layout/Sidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import type { Route } from "next";

const links: Array<{ href: Route; label: string }> = [
  { href: "/agent", label: "Overview" },
  { href: "/agent/bookings", label: "Bookings" },
  { href: "/agent/earnings", label: "Earnings" },
  { href: "/agent/profile", label: "Profile" }
];

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["AGENT"]}>
      <div className="agent-dashboard-layout grid gap-6 pb-24 lg:grid-cols-[240px_1fr] lg:pb-0">
        <Sidebar links={links} />
        <div>{children}</div>
      </div>
    </RoleGuard>
  );
}
