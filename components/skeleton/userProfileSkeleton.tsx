import React from "react";
import { Skeleton } from "../ui/skeleton";

const userProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-center  mt-10 w-full">
      <div>
        <div className="relative">
          <Skeleton className="rounded-full p-4 w-60 h-60" />
        </div>
        <Skeleton className="h-8 w-40 mt-4 mx-auto" />
      </div>
      <div className="flex gap-5 text-center">
        <div>
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
        </div>
        <div>
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
        </div>
        <div>
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2  w-full mt-10">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-45 rounded" />
        ))}
      </div>
    </div>
  );
};

export default userProfileSkeleton;
