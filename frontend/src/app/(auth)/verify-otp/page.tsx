"use client";

import { useState } from "react";
import { OTPInput } from "@/components/forms/OTPInput";
import { Button } from "@/components/ui/Button";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
      <h1 className="text-2xl font-semibold">Verify OTP</h1>
      <OTPInput value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button className="w-full">Verify</Button>
    </div>
  );
}
