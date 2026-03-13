"use client";

import { useEffect } from "react";
import type { Role } from "@/types/models";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/apiClient";
import { authStorage } from "@/lib/auth";

export const AuthBootstrap = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    const bootstrap = async () => {
      const token = authStorage.getToken();
      if (!token) {
        setHydrated(true);
        return;
      }

      try {
        const { data } = await apiClient.get("/users/me");
        setUser({
          id: data._id as string,
          name: data.name as string,
          email: data.email as string,
          role: data.role as Role
        });
      } catch {
        setUser(null);
      } finally {
        setHydrated(true);
      }
    };

    bootstrap().catch(() => setHydrated(true));
  }, [setHydrated, setUser]);

  return null;
};
