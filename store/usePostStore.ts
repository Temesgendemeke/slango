import { Slang } from "@/types/slang";
import { create } from "zustand";

type PostsByCountry = {
  [countryName: string]: Slang[];
};

interface PostStore {
  posts: Slang[];
  postsbyCountry: PostsByCountry;
  latestPost: Slang[];
  setPosts: (posts: Slang[]) => void;
  setPost: (post: Slang) => void;
  deletePost: (slug: string) => void;
  setPostsbyCountry: (postsbyCountry: PostsByCountry) => void;
  setLatestPost: (post: Slang[]) => void;
  toggleBookmark: (slug: string, userId: string) => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  postsbyCountry: {},
  latestPost: [],
  selectedPost: {} as Slang,
  setPosts: (posts) => set({ posts }),
  setPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  deletePost: (slug) => {
    const { posts, postsbyCountry, latestPost } = get();

    const updatedPosts = posts.filter((item) => item.slug !== slug);

    const updatedPostsByCountry: PostsByCountry = {};
    Object.entries(postsbyCountry).forEach(([country, posts]) => {
      updatedPostsByCountry[country] = posts.filter(
        (post) => post.slug !== slug
      );
    });

    const updatedLatestPost = latestPost.filter((post) => post.slug !== slug);

    set({
      posts: updatedPosts,
      postsbyCountry: updatedPostsByCountry,
      latestPost: updatedLatestPost,
    });
  },
  setPostsbyCountry: (postsbyCountry) => set({ postsbyCountry }),
  setLatestPost: (latestPost) => set({ latestPost }),
  toggleBookmark: (slug, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.slug === slug
          ? {
              ...post,
              bookmarked_by: post.bookmarked_by?.includes(userId)
                ? post.bookmarked_by.filter((id: string) => id !== userId)
                : [...(post.bookmarked_by || []), userId],
            }
          : post
      ),
      postsbyCountry: Object.fromEntries(
        Object.entries(state.postsbyCountry).map(([country, posts]) => [
          country,
          posts.map((post) =>
            post.slug === slug
              ? {
                  ...post,
                  bookmarked_by: post.bookmarked_by?.includes(userId)
                    ? post.bookmarked_by.filter((id: string) => id !== userId)
                    : [...(post.bookmarked_by || []), userId],
                }
              : post
          ),
        ])
      ),
      latestPost: state.latestPost.map((post) =>
        post.slug === slug
          ? {
              ...post,
              bookmarked_by: post.bookmarked_by?.includes(userId)
                ? post.bookmarked_by.filter((id: string) => id !== userId)
                : [...(post.bookmarked_by || []), userId],
            }
          : post
      ),
    })),

}));
