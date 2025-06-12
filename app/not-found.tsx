"use client";
import GoBackHomeButton from "@/components/GoBackHomeButton";
import React from "react";

const NotFound = () => {

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-9xl font-bold mt-20">NOT FOUND</h1>
      <GoBackHomeButton/>
    </div>
  );
};

export default NotFound;
