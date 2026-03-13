import { z } from "zod";

export const verifyPaymentSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    razorpayOrderId: z.string(),
    razorpayPaymentId: z.string(),
    razorpaySignature: z.string()
  })
});
