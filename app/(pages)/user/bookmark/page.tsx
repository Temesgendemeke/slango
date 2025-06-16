"use client";
import CustomCard from "@/components/CustomCard";
import GoBackHomeButton from "@/components/GoBackHomeButton";
import { authStore } from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useBookmark from "@/store/useBookmark";

const Page = () => {
  const user = authStore((store) => store.user);
  const posts = useBookmark((store) => store.posts);
  const setPosts = useBookmark((store) => store.setPosts);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch(`/api/user/bookmark/posts/${user?.id}`);

    if (!res.ok) return toast.error("Failed to fetch bookmarks");

    const data = await res.json();
    setPosts(data.map((bookmark) => bookmark.Slang));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [user]);


  return (
    <div className="flex flex-col w-full space-y-5">
      {!loading || posts.length ? (
        <div className="space-y-5 my-5">
          <div className="flex flex-col items-center my-8">
            <h2 className="text-2xl font-bold text-center">
              Bookmarked Slangs 🚀
            </h2>
          </div>
          {posts.map((post, index) => (
            <CustomCard key={index} post={post}></CustomCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl text-center mt-20 md:leading-12 md:mt-40">
            No bookmarks yet, fam 😅
            <br />
            Go save some bangers!
          </h2>

          <GoBackHomeButton />
        </div>
      )}
    </div>
  );
};

export default Page;
