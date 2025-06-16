"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
import { getCountry } from "@/utils/getCountry";
import { customFetch } from "@/utils/fetch";
import { toast } from "sonner";
import { usePostStore } from "@/store/usePostStore";
import { authStore } from "@/store/useAuthStore";
import useBookmark from "@/store/useBookmark";

const SlangList = () => {
  const latestPost = usePostStore((state) => state.latestPost);
  const setLatestPost = usePostStore((state) => state.setLatestPost);
  const postsbyCountry = usePostStore((state) => state.postsbyCountry) || {};
  const setPostsbyCountry = usePostStore((state) => state.setPostsbyCountry);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setPosts = usePostStore((store) => store.setPosts);
  const posts = usePostStore((store) => store.posts);

  const user = authStore((store) => store.user);
  const setBookmarks = useBookmark((store) => store.setBookmarks);

  const fetchBookmark = async () => {
    if (!user) return;
    const { data } = await customFetch({
      route: `/api/user/bookmark/${user.id}`,
    });

    setBookmarks(data);
  };

  useEffect(() => {
    fetchBookmark();
  }, [user]);

  useEffect(() => {
    const fetchSlang = async () => {
      setLoading(true);
      const res = await fetch("/api/slang/trending");
      const post = await res.json();
      setPosts(post);

      const { error, data } = await customFetch({
        route: `/api/slang/country`,
      });
      if (error) {
        return toast.error("Uh-oh! Something went wrong 😅 Please try again!");
      }

      await customFetch({ route: "/api/slang/latest" }).then((res) => {
        const { error, data } = res;
        if (error) {
          return toast.error(
            "Uh-oh! Something went wrong 😅 Please try again!"
          );
        }
        setLatestPost(data);
      });

      setPostsbyCountry(data);
      setLoading(false);
    };

    fetchSlang();
  }, []);

  return (
    <div className="mt-10 px-2">
      <h3 className="font-bold text-3xl">🔥 Trending</h3>

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 bg-transparent  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
          {Array.isArray(posts) &&
            posts.map((post, index) => <CustomCard key={index} post={post} />)}
        </div>
      )}

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => router.push("/slang/explore")}>
          View More
        </Button>
      </div>

      <h3 className="font-bold text-3xl">🆕 Latest</h3>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 bg-transparent  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
          {Array.isArray(posts) &&
            latestPost.map((post, index) => (
              <CustomCard key={index} post={post} />
            ))}
        </div>
      )}

      {Object.entries(postsbyCountry).map(([country, posts], index) => (
        <React.Fragment key={index}>
          <h3 className="font-bold text-3xl mt-10">
            {getCountry(country)} slang
          </h3>
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="grid grid-cols-1 bg-transparent  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
              {Array.isArray(posts) &&
                posts.map((post, index) => (
                  <CustomCard key={index} post={post} />
                ))}
            </div>
          )}
          <Button
            variant="outline"
            className="flex  mx-auto mt-5"
            onClick={() => router.push(`/slang/explore?country=${country}`)}
          >
            🚀 Discover more {getCountry(country)} slang!
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SlangList;
