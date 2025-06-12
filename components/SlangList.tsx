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

const SlangList = () => {
  // const [slangs, setSlang] = useState([]);
  const [postsbyCountry, setPostsbyCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setPosts = usePostStore(store => store.setPosts)
  const posts = usePostStore(store => store.posts)


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
            posts.map((item, index) => (
              <CustomCard key={index} item={item}/>
            ))}
        </div>
      )}

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => router.push("/slang/explore")}>
          View More
        </Button>
      </div>

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
                posts.map((item, index) => (
                  <CustomCard key={index} item={item} />
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
