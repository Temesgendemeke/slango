"use client";

import React, { useState } from "react";
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

const SlangList = () => {
  const [slang, setSlang] = useState([
    {
      id: 1,
      name: "ghosted",
      explanation:
        "When someone suddenly stops all communication without explanation.",
      example: "We were texting every day and then she ghosted me.",
      date: "2024-10-15",
      author: "slang_user_001",
      bookmarked: false,
    },
    {
      id: 2,
      name: "no cap",
      explanation:
        "Used to emphasize that someone is telling the truth; 'no lie'.",
      example: "That movie was the best I've seen all year, no cap.",
      date: "2024-11-22",
      author: "urban_wizard",
      bookmarked: false,
    },
    {
      id: 3,
      name: "simp",
      explanation:
        "A person who is overly attentive and submissive to someone they like, often at the cost of their own self-respect.",
      example:
        "He bought her flowers, did her homework, and still got friendzoned. What a simp.",
      date: "2025-01-04",
      author: "slangmaster42",
      bookmarked: false,
    },
    {
      id: 4,
      name: "vibe check",
      explanation:
        "A spontaneous check to see if someone is acting right or the mood is good.",
      example:
        "He failed the vibe check when he started yelling at the waiter.",
      date: "2024-12-10",
      author: "queenofslang",
      bookmarked: false,
    },
    {
      id: 5,
      name: "drip",
      explanation:
        "Refers to someone's style or outfit, usually meaning it's fashionable.",
      example: "Check out his sneakers—man's got drip!",
      date: "2025-02-14",
      author: "fitlord",
      bookmarked: true,
    },
  ]);

  return (
    <div className="mt-10 px-2">
      <h3 className="font-bold text-3xl">🔥 Trending</h3>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
        {slang.map((item, index) => (
          <CustomCard key={index} item={item} setSlang={setSlang} />
        ))}
      </div>

      <h4 className="font-bold text-3xl mt-10">✨ Latest Slangs ✨</h4>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
        {slang.map((item, index) => (
          <CustomCard key={index} item={item} setSlang={setSlang} />
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => redirect("/slang/explore")}>
          View More
        </Button>
      </div>
    </div>
  );
};

export default SlangList;
