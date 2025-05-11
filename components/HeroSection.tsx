"use client";
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { Plus, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="flex justify-center  flex-col items-center gap-4 mt-10 md:mt-20 w-full">
      <h1 className="text-center text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-slate-50 dark:to-slate-300 from-black to-gray-700">
        DISCOVER, SHARE, DEFINE SLANG
      </h1>
      <p className="dark:text-gray-300 text-black text-center text-sm md:text-lg max-w-sm md:max-w-2xl">
        The community driven platform for sharing and discover the latest slang
      </p>
      <div className="flex gap-2 flex-col md:flex-row ">
        <Button
          className="uppercase font-bold"
          variant={"outline"}
          onClick={() => redirect("submit-slang")}
        >
          <Plus />
          Submit new slang
        </Button>
        <Button
          className="uppercase font-bold"
          onClick={() => redirect("/slang/explore")}
        >
          <Search />
          search slang
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
