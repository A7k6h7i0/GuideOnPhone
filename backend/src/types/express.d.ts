import type { Role } from "../constants/roles.js";

declare global {
  namespace Express {
    interface UserClaims {
      id: string;
      role: Role;
      email: string;
    }

    interface Request {
      user?: UserClaims;
    }
  }
}

export {};
