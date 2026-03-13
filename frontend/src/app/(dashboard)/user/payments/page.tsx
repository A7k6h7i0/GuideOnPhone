"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { Payment } from "@/types/models";
import { PaymentsTable } from "@/components/dashboard/PaymentsTable";

export default function UserPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    apiClient.get<Payment[]>("/payments/me").then((res) => setPayments(res.data)).catch(() => setPayments([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Payment History</h1>
      <PaymentsTable payments={payments} />
    </div>
  );
}
