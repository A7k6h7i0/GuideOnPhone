"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/types/models";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/apiClient";
import { authStorage } from "@/lib/auth";
import { APP_ROUTES, defaultDashboardByRole } from "@/lib/routes";

interface RoleGuardProps {
  allowedRoles?: Role[];
  children: React.ReactNode;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const allowedRolesKey = allowedRoles?.join(",") ?? "";
  const resolvedAllowedRoles = useMemo(
    () => (allowedRolesKey ? (allowedRolesKey.split(",") as Role[]) : undefined),
    [allowedRolesKey]
  );

  useEffect(() => {
    const bootstrap = async () => {
      const token = authStorage.getToken();
      if (!token) {
        router.replace(APP_ROUTES.login);
        return;
      }

      if (user) {
        if (resolvedAllowedRoles && !resolvedAllowedRoles.includes(user.role)) {
          router.replace(defaultDashboardByRole(user.role));
          return;
        }
        setIsReady(true);
        return;
      }

      try {
        const { data } = await apiClient.get("/users/me");
        const hydratedUser = {
          id: data._id as string,
          name: data.name as string,
          email: data.email as string,
          role: data.role as Role
        };
        setUser(hydratedUser);

        if (resolvedAllowedRoles && !resolvedAllowedRoles.includes(hydratedUser.role)) {
          router.replace(defaultDashboardByRole(hydratedUser.role));
          return;
        }
        setIsReady(true);
      } catch {
        setUser(null);
        router.replace(APP_ROUTES.login);
      }
    };

    bootstrap().catch(() => {
      setUser(null);
      router.replace(APP_ROUTES.login);
    });
  }, [allowedRolesKey, resolvedAllowedRoles, router, setUser, user]);

  if (!isReady) {
    return <div className="rounded-xl bg-white p-6 text-sm text-slate-600">Loading dashboard...</div>;
  }

  return <>{children}</>;
};
