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
        <h2 className="text-center">
          Invalid or expired token! <br /> Please request a new password reset
          link.
        </h2>
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
