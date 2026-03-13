import crypto from "crypto";
import { env } from "../../config/env.js";

export const verifyRazorpayWebhook = (payload: string, signature: string): boolean => {
  if (!env.RAZORPAY_WEBHOOK_SECRET) return false;

  const expected = crypto.createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET).update(payload).digest("hex");
  return expected === signature;
};
