import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { Role } from "../constants/roles.js";
import type { SignOptions } from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  email: string;
  role: Role;
}

export const signAccessToken = (payload: AuthPayload): string =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXP as SignOptions["expiresIn"] });

export const signRefreshToken = (payload: AuthPayload): string =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXP as SignOptions["expiresIn"] });

export const verifyAccessToken = (token: string): AuthPayload =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;
