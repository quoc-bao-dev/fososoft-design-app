import { Skeleton } from "@/components/ui/skeleton"

const BlogCardSkeletonVertical = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`${className} flex flex-col gap-2`}>
            {/* Image skeleton */}
            <Skeleton className="w-full aspect-3/2 rounded-3xl" />

            <div className="mt-2 space-y-4">
                {/* Tags skeleton */}
                <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                </div>

                {/* Title skeleton */}
                <div className="space-y-2 min-h-[56px]">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-4/5" />
                </div>

                {/* Date and reading time skeleton */}
                <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-1 pr-4 border-r">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    <div className="flex items-center gap-1">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>

                {/* Explore now section skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </div>
    )
}

export default BlogCardSkeletonVertical

