"use client";

import { create } from "zustand";
import { authStorage } from "@/lib/auth";
import type { UserState } from "./userSlice";

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  isHydrated: false,
  setUser: (user) => {
    if (!user) {
      authStorage.clear();
    }
    set({ user });
  },
  setHydrated: (hydrated) => set({ isHydrated: hydrated })
}));
