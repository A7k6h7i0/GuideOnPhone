import { Sidebar } from "@/components/layout/Sidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import type { Route } from "next";

const links: Array<{ href: Route; label: string }> = [
  { href: "/user", label: "Overview" },
  { href: "/user/bookings", label: "Bookings" },
  { href: "/user/payments", label: "Payments" },
  { href: "/user/profile", label: "Profile" }
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["USER"]}>
      <div className="grid gap-6 pb-24 lg:grid-cols-[240px_1fr] lg:pb-0">
        <Sidebar links={links} />
        <div>{children}</div>
      </div>
    </RoleGuard>
  );
}
