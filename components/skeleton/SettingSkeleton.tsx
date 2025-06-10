import React from "react";
import { Skeleton } from "../ui/skeleton";

const SettingSkeleton = () => {
  return (
    <div className="flex flex-col mt-10 items-center gap-4">
      <Skeleton className="h-52 w-52 rounded-full" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-full  md:w-3xl mt-6" />
      <Skeleton className="h-10 w-full  md:w-3xl" />
      <Skeleton className="h-10 w-full  md:w-3xl" />
      <Skeleton className="h-10 w-full  md:w-3xl" />
    </div>
  );
};

export default SettingSkeleton;
