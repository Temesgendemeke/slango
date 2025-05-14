import { create } from "zustand";

interface AuthStore {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string } | null) => void;
  clearUser: () => void;
}

export const authStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
