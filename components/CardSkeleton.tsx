import { _ } from "better-auth/dist/shared/better-auth.DNTAFSt1";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = ({length=3}) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-3  gap-2 w-full">
      {Array.from({ length}).map((_, index) => {
        return (
          <Skeleton key={index} className="w-full h-[220px] rounded-lg flex flex-col p-4 gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <Skeleton className="w-3/4 h-4 rounded" />
            <Skeleton className="w-1/2 h-4 rounded" />
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="w-full h-3 rounded" />
              <Skeleton className="w-5/6 h-3 rounded" />
              <Skeleton className="w-2/3 h-3 rounded" />
            </div>
            <div className="flex justify-between mt-auto">
              <Skeleton className="w-12 h-4 rounded" />
              <Skeleton className="w-12 h-4 rounded" />
            </div>
          </Skeleton>
        );
      })}
    </div>
  );
};

export default CardSkeleton;
