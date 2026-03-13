import crypto from "crypto";
import { env } from "../config/env.js";

const deriveKey = (seed: string) => crypto.createHash("sha256").update(seed).digest();

const encryptionSeed = env.AADHAAR_ENCRYPTION_KEY || env.JWT_ACCESS_SECRET;
const encryptionKey = deriveKey(encryptionSeed);

export const maskAadhaar = (aadhaar: string): string => `XXXX-XXXX-${aadhaar.slice(-4)}`;

export const hashValue = (value: string): string => crypto.createHash("sha256").update(value).digest("hex");

export const encryptSensitiveText = (plainText: string): string => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
};
