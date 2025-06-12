"use client";
import GoBackHomeButton from "@/components/GoBackHomeButton";
import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-5xl md:text-7xl font-bold mt-20">Yikes! 500 Error 🚨</h1>
      <p className="text-xl md:text-2xl text-center max-w-xl">
        Our server just had a major FOMO moment and glitched out. Even Gen Z
        tech can’t vibe 24/7! Refresh or bounce back home and let’s pretend this
        never happened. 😅
      </p>
      <GoBackHomeButton />
    </div>
  );
};

export default Error;
