import { z } from "zod";

export const upsertAgentProfileSchema = z.object({
  body: z.object({
    city: z.string().min(2),
    state: z.string().min(2),
    bio: z.string().max(1000).optional(),
    languages: z.array(z.string().min(2)).min(1),
    availableHours: z.string().min(2),
    guideFee: z.number().positive(),
    cabBooking: z.boolean(),
    hotelBooking: z.boolean(),
    gstReferences: z.array(z.string()).max(2).optional()
  })
});

export const registerAgentSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(8),
    city: z.string().min(2),
    state: z.string().min(2),
    availableHours: z.string().min(2),
    guideFee: z.number().positive(),
    cabBooking: z.boolean(),
    hotelBooking: z.boolean(),
    languages: z.array(z.string().min(2)).min(1)
  })
});

export const sendAadhaarOtpSchema = z.object({
  body: z.object({
    aadhaarNumber: z.string().regex(/^\d{12}$/)
  })
});

export const verifyAadhaarOtpSchema = z.object({
  body: z.object({
    otp: z.string().regex(/^\d{6}$/),
    sessionId: z.string().min(8)
  })
});

export const uploadSelfieSchema = z.object({
  body: z.object({
    imageBase64: z.string().min(100)
  })
});

export const gstVerifySchema = z.object({
  body: z.object({
    gstReferences: z.array(z.string().min(15).max(15)).length(2)
  })
});
