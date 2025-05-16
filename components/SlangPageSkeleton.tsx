import React from "react";
import { Skeleton } from "./ui/skeleton";

const SlangPageSkeleton = () => {
    return (
        <div className="flex justify-center items-center gap-5 flex-col w-full">
            <div className="lg:w-4xl w-full flex-col flex gap-5">
                <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <div className="flex items-center gap-4 mt-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                <Skeleton className="h-20 w-full rounded-xl" />

                <div className="flex gap-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>

                <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-full rounded-xl" />
                        <Skeleton className="h-8 w-full rounded-xl" />
                    </div>
                </div>

                <div className="bg-secondary p-4 rounded-xl gap-2 border border-primary flex flex-col">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-64 mb-2" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    );
};

export default SlangPageSkeleton;



