"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/forms/Input";
import { Checkbox } from "@/components/forms/Checkbox";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/lib/apiClient";
import { authStorage } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/error";
import { useAuthStore } from "@/store";
import { APP_ROUTES, defaultDashboardByRole } from "@/lib/routes";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    state: "",
    availableHours: "9:00-18:00",
    guideFee: "1000",
    cabBooking: false,
    hotelBooking: false,
    languages: "English"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedRole = useMemo<"USER" | "AGENT">(() => {
    const roleParam = searchParams.get("role");
    return roleParam === "AGENT" ? "AGENT" : "USER";
  }, [searchParams]);

  useEffect(() => {
    if (isHydrated && user) {
      router.replace(defaultDashboardByRole(user.role));
    }
  }, [isHydrated, router, user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.phone.trim().length < 8) {
      setError("Phone number must be at least 8 digits.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (selectedRole === "AGENT") {
      const parsedFee = Number(form.guideFee);
      if (form.city.trim().length < 2 || form.state.trim().length < 2) {
        setError("City and State must each be at least 2 characters.");
        return;
      }
      if (!Number.isFinite(parsedFee) || parsedFee <= 0) {
        setError("Guide fee must be a positive number.");
        return;
      }
      if (form.languages.split(",").map((value) => value.trim()).filter(Boolean).length === 0) {
        setError("At least one language is required.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      if (selectedRole === "AGENT") {
        const { data } = await apiClient.post("/agent/register", {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          city: form.city.trim(),
          state: form.state.trim(),
          availableHours: form.availableHours.trim(),
          guideFee: Number(form.guideFee),
          cabBooking: form.cabBooking,
          hotelBooking: form.hotelBooking,
          languages: form.languages.split(",").map((value) => value.trim()).filter(Boolean)
        });

        authStorage.setToken(data.tokens.accessToken);
        setUser({ id: data.user._id, name: data.user.name, email: data.user.email, role: data.user.role });
        router.push("/agent/profile");
      } else {
        const { data } = await apiClient.post("/auth/register", {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          role: selectedRole
        });

        authStorage.setToken(data.tokens.accessToken);
        setUser({ id: data.user._id, name: data.user.name, email: data.user.email, role: data.user.role });
        router.push(defaultDashboardByRole(data.user.role));
      }
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Registration failed. Please check your details."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-2xl font-semibold">Create {selectedRole === "AGENT" ? "Agent" : "Traveler"} Account</h1>
      <p className="text-sm text-slate-600">
        {selectedRole === "AGENT"
          ? "Agent signup includes profile details. Aadhaar OTP, selfie, face match, and GST verification continue on your dashboard."
          : "Create your traveler account to find and book verified local guides."}
      </p>
      <Input required minLength={2} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input required minLength={8} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Input required minLength={8} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

      {selectedRole === "AGENT" ? (
        <>
          <Input required minLength={2} placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input required minLength={2} placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <Input required placeholder="Available Hours" value={form.availableHours} onChange={(e) => setForm({ ...form, availableHours: e.target.value })} />
          <Input required placeholder="Guide Fee" value={form.guideFee} onChange={(e) => setForm({ ...form, guideFee: e.target.value })} />
          <Input required placeholder="Languages (comma separated)" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.cabBooking} onChange={(e) => setForm({ ...form, cabBooking: e.target.checked })} /> Cab booking option</label>
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.hotelBooking} onChange={(e) => setForm({ ...form, hotelBooking: e.target.checked })} /> Hotel booking option</label>
        </>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : `Create ${selectedRole === "AGENT" ? "agent" : "traveler"} account`}
      </Button>
      <div className="space-y-2 text-center text-sm text-slate-600">
        <p>
          Already have an account?{" "}
          <Link href={selectedRole === "AGENT" ? APP_ROUTES.agentLogin : APP_ROUTES.userLogin} className="font-semibold text-ink">
            Login
          </Link>
        </p>
        {selectedRole === "AGENT" ? (
          <p>
            Traveler sign in?{" "}
            <Link href={APP_ROUTES.userLogin} className="font-semibold text-ink">
              User Sign In
            </Link>
          </p>
        ) : (
          <p>
            Agent sign in?{" "}
            <Link href={APP_ROUTES.agentLogin} className="font-semibold text-ink">
              Agent Sign In
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RegisterPageContent />
    </Suspense>
  );
}
