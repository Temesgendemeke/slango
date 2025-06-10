"use client";
import CustomCard from "@/components/CustomCard";
import GoBackHomeButton from "@/components/GoBackHomeButton";
import { authStore } from "@/store/useAuthStore";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const user = authStore((store) => store.user);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/bookmark/${user.id}`);

      if (!res.ok) return toast.error("Failed to fetch bookmarks");

      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);


  //   find user bookmarks

  return (
    <div className="flex flex-col w-full">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <CustomCard key={index} item={post} setSlang={setPosts} />
        ))
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
