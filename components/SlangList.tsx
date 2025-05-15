"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, ThumbsUp } from "lucide-react";
import Bookmark from "./Bookmark";
import CustomCard from "./CustomCard";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import CardSkeleton from "./CardSkeleton";

const SlangList = () => {
  const [slangs, setSlang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlang = async () => {
      setLoading(true);
      const data = await fetch("/api/slang");
      setSlang(await data.json());
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
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
          {slangs.map((item, index) => (
            <CustomCard key={index} item={item} setSlang={setSlang} />
          ))}
        </div>
      )}

      <h4 className="font-bold text-3xl mt-10">✨ Latest Slangs ✨</h4>
      {loading?<CardSkeleton/>:<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
        {slangs.map((item, index) => (
          <CustomCard key={index} item={item} setSlang={setSlang} />
        ))}
      </div>}

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => redirect("/slang/explore")}>
          View More
        </Button>
      </div>
    </div>
  );
};

export default SlangList;
