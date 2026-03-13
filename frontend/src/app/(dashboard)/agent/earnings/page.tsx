"use client";

import { useEffect, useMemo, useState } from "react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PaymentsTable } from "@/components/dashboard/PaymentsTable";
import { apiClient } from "@/lib/apiClient";
import type { Payment } from "@/types/models";

interface AgentSummary {
  totalEarnings: number;
  totalCommission: number;
  totalPaidBookings: number;
}

export default function AgentEarningsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<AgentSummary | null>(null);

  useEffect(() => {
    apiClient.get<Payment[]>("/payments/me/agent").then((res) => setPayments(res.data)).catch(() => setPayments([]));
    apiClient.get<AgentSummary>("/payments/me/agent/summary").then((res) => setSummary(res.data)).catch(() => setSummary(null));
  }, []);

  const monthlyEarnings = useMemo(() => {
    const buckets = Array.from({ length: 12 }).map(() => 0);
    payments
      .filter((payment) => payment.status === "PAID")
      .forEach((payment) => {
        const createdAt = payment.createdAt ? new Date(payment.createdAt) : null;
        if (!createdAt || Number.isNaN(createdAt.valueOf())) {
          return;
        }
        buckets[createdAt.getMonth()] += payment.payoutAmount;
      });
    const maxValue = Math.max(...buckets, 1);
    return buckets.map((bucket) => Math.round((bucket / maxValue) * 100));
  }, [payments]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Earnings</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Total Payout to You" value={`INR ${(summary?.totalEarnings ?? 0).toFixed(2)}`} />
        <StatsCard label="Platform Commission" value={`INR ${(summary?.totalCommission ?? 0).toFixed(2)}`} />
        <StatsCard label="Paid Bookings" value={summary?.totalPaidBookings ?? 0} />
      </div>
      <EarningsChart monthlyEarnings={monthlyEarnings} />
      <PaymentsTable payments={payments} />
    </div>
  );
}
