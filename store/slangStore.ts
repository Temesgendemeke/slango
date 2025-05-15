import { create } from "zustand";

const initalState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};


export const getSlangStore = create((set) => ({
    ...initalState,
    execute: async () => {
        try {
            set({ ...initalState, loading: true });
            const res = await fetch(`/api/slang`);
            const data = await res.json();
            set({ ...initalState, data });
        } catch (error) {
            set({ ...initalState, error: true, errorData: error });
        }
    },
}));

