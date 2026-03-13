export const ROLES = {
  USER: "USER",
  AGENT: "AGENT",
  ADMIN: "ADMIN"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
