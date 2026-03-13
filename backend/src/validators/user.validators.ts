import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(8).optional(),
    avatarUrl: z.string().url().optional()
  })
});
