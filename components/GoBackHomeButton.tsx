"use client";
import React from "react";
import { Button } from "./ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackHomeButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/")} className="w-40">
      <HomeIcon />
      go back to home
    </Button>
  );
};

export default GoBackHomeButton;
