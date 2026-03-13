import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(8),
    role: z.enum(["USER", "AGENT"]).default("USER")
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    expectedRole: z.enum(["USER", "AGENT", "ADMIN"]).optional()
  })
});
