import { Slang } from "@/types/slang";
import { create } from "zustand";

interface BookmarkState {
  bookmarks: string[];
  posts: Slang[];
  setBookmarks: (ids: string[]) => void;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  setPosts: (post: Slang[]) => void;
}

const useBookmark = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  posts: [],
  setPosts: (posts) => set({ posts }),
  setBookmarks: (ids) => set({ bookmarks: ids }),
  addBookmark: (id: string) =>
    set((state) => ({ bookmarks: [...state.bookmarks, id] })),
  removeBookmark: (id: string) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark != id),
      posts: state.posts.filter((post) => post.id != id),
    })),
  isBookmarked: (id: string) => get().bookmarks.includes(id),
}));

export default useBookmark;
