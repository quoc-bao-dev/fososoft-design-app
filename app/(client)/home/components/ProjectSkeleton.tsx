"use client";

import { Skeleton } from "@/components/ui/skeleton";

type ProjectSkeletonProps = {
  items?: number;
};

const ProjectSkeleton = ({ items = 5 }: ProjectSkeletonProps) => {
  return (
    <div className="flex overflow-x-auto xl:overflow-visible items-center gap-y-10 gap-x-2 xl:gap-x-8 xl:flex-wrap xl:justify-center xl:max-w-[1016px] mx-auto w-full">
      {Array.from({ length: items }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center shrink-0 min-w-[160px] xl:shrink-0 xl:basis-[30%]"
        >
          <div className="flex justify-center items-center w-fit gap-1.5 py-1.5 px-3 rounded-full bg-[#F9F9F9]">
            <Skeleton className="w-4 xl:w-[140px] h-[40px]" />
          </div>
          <div className="mt-3">
            <Skeleton className="min-w-[114px] max-w-[114px] xl:min-w-[234px] xl:max-w-[234px] h-[114px] xl:h-[234px] rounded-xl" />
          </div>
          <div className="flex flex-col gap-2 xl:gap-4 items-center justify-center mt-3">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="size-10 xl:size-[82px] rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
