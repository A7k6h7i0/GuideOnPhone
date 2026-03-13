"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/lib/apiClient";
import { authStorage } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/error";
import { useAuthStore } from "@/store";
import { APP_ROUTES, defaultDashboardByRole } from "@/lib/routes";
import type { Role } from "@/types/models";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const setUser = useAuthStore((s) => s.setUser);

  const selectedRole = useMemo<Role>(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "AGENT" || roleParam === "ADMIN") {
      return roleParam;
    }
    return "USER";
  }, [searchParams]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isHydrated && user) {
      router.replace(defaultDashboardByRole(user.role));
    }
  }, [isHydrated, router, user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await apiClient.post("/auth/login", { ...form, expectedRole: selectedRole });
      authStorage.setToken(data.tokens.accessToken);
      setUser({ id: data.user._id, name: data.user.name, email: data.user.email, role: data.user.role });
      router.push(defaultDashboardByRole(data.user.role));
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Invalid credentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-2xl font-semibold">
        {selectedRole === "ADMIN" ? "Admin Login" : selectedRole === "AGENT" ? "Agent Login" : "Login"}
      </h1>
      <p className="text-sm text-slate-600">
        {selectedRole === "ADMIN"
          ? "Sign in to manage the platform."
          : selectedRole === "AGENT"
            ? "Sign in to manage your guide profile."
            : "Sign in to your account."}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input required minLength={8} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="space-y-2 text-sm text-slate-600">
        {selectedRole === "AGENT" ? (
          <p>
            User sign in?{" "}
            <Link href={APP_ROUTES.userLogin} className="font-semibold text-ink">
              User Sign In
            </Link>
          </p>
        ) : (
          <p>
            New user?{" "}
            <Link href={APP_ROUTES.userRegister} className="font-semibold text-ink">
              Create account
            </Link>
          </p>
        )}
        {selectedRole === "AGENT" ? (
          <p>
            New agent?{" "}
            <Link href={APP_ROUTES.agentRegister} className="font-semibold text-ink">
              Create agent account
            </Link>
          </p>
        ) : (
          <p>
            Agent?{" "}
            <Link href={APP_ROUTES.agentLogin} className="font-semibold text-ink">
              Agent Sign In
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginPageContent />
    </Suspense>
  );
}
