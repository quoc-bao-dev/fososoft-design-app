import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const BlogContentSkeleton = (props: Props) => {
    return (
        <div className="w-full p-4 space-y-6">
            {/* Category Badge */}
            <div className="w-fit">
                <Skeleton className="h-8 w-32 rounded-md" />
            </div>

            {/* Blog Title */}
            <Skeleton className="h-12 w-full max-w-full" />

            {/* Author and Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-4 sm:mt-0 sm:ml-auto">
                    <div className="flex items-center gap-2 border-r pr-6">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <Skeleton className="w-full h-auto aspect-3/2 rounded-lg" />

            {/* Content Placeholder */}
            <div className="space-y-4 mt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                <div className="py-2" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="py-2" />

                <Skeleton className="h-6 w-48" />
                <div className="space-y-3 mt-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>

                <div className="py-2" />

                <Skeleton className="h-6 w-48" />
                <div className="space-y-3 mt-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="py-2" />

                <Skeleton className="h-6 w-48" />
                <div className="space-y-3 mt-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        </div>
    )
}

export default BlogContentSkeleton