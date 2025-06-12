import { Slang } from "@/types/slang";
import { create } from "zustand";

interface PostStore {
  posts: Slang[];
  setPosts: (posts: Slang[]) => void;
  setPost: (post: Slang) => void;
  deletePost: (slug: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  setPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  deletePost: (slug) =>
    set((state) => ({
      posts: state.posts.filter((item) => item.slug != slug),
    })),
}));
