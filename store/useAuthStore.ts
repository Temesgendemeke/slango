import { create } from "zustand";
import { useSession } from "@/lib/auth/auth-client";

interface AuthStore {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string } | null) => void;
}

export const authStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
