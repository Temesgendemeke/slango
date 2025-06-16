import { create } from "zustand";

interface AuthStore {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  } | null;
  setUser: (user) => void;
  clearUser: () => void;
}

export const authStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => set({ user: null }),
}));
