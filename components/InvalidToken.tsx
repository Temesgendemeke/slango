"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import stress_pan from "@/assets/Stress-pana.svg";

const InvalidToken = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col gap-2 lg:flex-row">
      <Image alt="stress person picture" src={stress_pan} className=""></Image>
      <div className="flex items-center   gap-5 flex-col ">
        <h2 className="text-center text-3xl font-extrabold text-white animate-bounce drop-shadow-lg">
          Yikes! <span className="text-black bg-white px-2 rounded">Token went ghost 👻</span>
        </h2>
        <p className="text-center text-lg text-gray-200 mt-3 italic">
          Looks like this link dipped out faster than your fave TikTok trend.<br />
          <span className="text-black bg-white px-1 rounded">Your token is expired or invalid! 🕒🚫</span><br />
          Smash that button for a do-over! 🔄✨
        </p>
        <Button
          className="w-full sm:w-40"
          onClick={() => router.push("/login/forgot-password")}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default InvalidToken;
