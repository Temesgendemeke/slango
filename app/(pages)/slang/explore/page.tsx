"use client";
import CustomCard from "@/components/CustomCard";
import Menu from "@/components/Menu";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { title } from "process";
import React, { useEffect, useState } from "react";

const page = () => {
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

  const menu = [
    { title: "trending", icon: <TrendingUp /> },
    { title: "recent" },
    { title: "Popular" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSlang, setFilteredSlang] = useState(slang);

  useEffect(() => {
    const res = searchTerm == "" ? slang.filter((item) => item.name.includes(searchTerm)) : slang
    setFilteredSlang(res)
  }, [searchTerm]);

  return (
    <div className="px-2 ">
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between md:items-center mt-10 ">
        <Menu/>

        <div className="relative">
          <Input
            type="text"
            placeholder="search slang term"
            className="w-full h-full p-3 md:p-4 pl-10 md:px-10 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute transform top-1/2 -translate-y-1/2 left-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 w-full">
        {filteredSlang.map((item, index) => {
          return <CustomCard key={index} item={item} setSlang={setSlang} />;
        })}
      </div>
    </div>
  );
};

export default page;
