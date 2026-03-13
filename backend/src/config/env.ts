import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("5000").transform(Number),
  MONGODB_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXP: z.string().default("15m"),
  JWT_REFRESH_EXP: z.string().default("7d"),
  AADHAAR_ENCRYPTION_KEY: z.string().min(16).optional(),
  CLIENT_URL: z.string().url(),
  KYC_PROVIDER_MODE: z.enum(["mock", "live"]).default("mock"),
  FACE_PROVIDER_MODE: z.enum(["mock", "live"]).default("mock"),
  GST_PROVIDER_MODE: z.enum(["mock", "live"]).default("mock"),
  KYC_PROVIDER_URL: z.string().url().optional(),
  KYC_PROVIDER_API_KEY: z.string().optional(),
  FACE_PROVIDER_URL: z.string().url().optional(),
  FACE_PROVIDER_API_KEY: z.string().optional(),
  GST_PROVIDER_URL: z.string().url().optional(),
  GST_PROVIDER_API_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  PLATFORM_COMMISSION_PERCENT: z.string().default("10").transform(Number),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);
