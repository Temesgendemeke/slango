"use client";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-9xl font-bold mt-20">NOT FOUND</h1>
      <Button onClick={() => router.push("/")}>
        <HomeIcon />
        go back to home
      </Button>
    </div>
  );
};

export default NotFound;
