import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    agentId: z.string(),
    city: z.string().min(2),
    date: z.coerce.date(),
    durationHours: z.number().int().min(1),
    notes: z.string().optional()
  })
});
