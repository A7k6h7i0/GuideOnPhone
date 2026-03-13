import type { Role } from "@/types/models";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface UserState {
  user: AuthUser | null;
  isHydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  setHydrated: (hydrated: boolean) => void;
}
