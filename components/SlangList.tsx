"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
import { getCountry } from "@/utils/getCountry";
import { customFetch } from "@/utils/fetch";
import { toast } from "sonner";

const SlangList = () => {
  const [slangs, setSlang] = useState([]);
  const [postsbyCountry, setPostsbyCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSlang = async () => {
      setLoading(true);
      const res = await fetch("/api/slang/trending");
      const post = await res.json();
      setSlang(post);

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
          {Array.isArray(slangs) &&
            slangs.map((item, index) => (
              <CustomCard key={index} item={item} setSlang={setSlang} />
            ))}
        </div>
      )}

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => router.push("/slang/explore")}>
          View More
        </Button>
      </div>

      {Object.entries(postsbyCountry).map(([country, posts]) => (
        <>
          <h3 className="font-bold text-3xl mt-10">
            {getCountry(country)} slang
          </h3>
          {loading ? (
            <CardSkeleton />
          ) : (
            <div className="grid grid-cols-1 bg-transparent  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
              {Array.isArray(posts) &&
                posts.map((item, index) => (
                  <CustomCard key={index} item={item} setSlang={setSlang} />
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
        </>
      ))}
    </div>
  );
};

export default SlangList;
