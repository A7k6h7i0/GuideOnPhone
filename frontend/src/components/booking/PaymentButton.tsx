"use client";

import { Button } from "@/components/ui/Button";

export const PaymentButton = ({ onPay }: { onPay: () => void }) => (
  <Button onClick={onPay}>Pay Now</Button>
);
