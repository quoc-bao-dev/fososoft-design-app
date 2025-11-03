"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import BasicArrowLeftIcon from "@/components/icons/common/BasicArrowLeftIcon"
import { useResizeStore } from "@/stores/useResizeStore"

interface CustomPaginationProps extends React.ComponentProps<typeof Pagination> {
    totalPages: number
    currentPage: number
    onPageChange?: (page: number) => void
    maxVisiblePages?: number,
    className?: string
}

export function CustomPagination({
    totalPages,
    currentPage,
    onPageChange,
    maxVisiblePages = 5,
    className,
    ...props
}: CustomPaginationProps) {
    const { isVisibleTablet } = useResizeStore()
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        onPageChange?.(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []

        // Always show first page
        pageNumbers.push(1)


        let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

        // Adjust if we're near the end
        if (endPage >= totalPages - 1) {
            endPage = totalPages - 1
            startPage = Math.max(2, endPage - (maxVisiblePages - 3))
        }

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pageNumbers.push("ellipsis1")
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push("ellipsis2")
        }

        // Always show last page if there is more than one page
        if (totalPages > 1) {
            pageNumbers.push(totalPages)
        }

        return pageNumbers.map((page, index) => {
            if (page === "ellipsis1" || page === "ellipsis2") {
                return (
                    <PaginationItem key={`ellipsis-${index}`}>
                        <span className="flex h-9 w-9 items-center justify-center text-sm">...</span>
                    </PaginationItem>
                )
            }

            const pageNum = page as number

            return (
                <PaginationItem key={`page-${pageNum}`}>
                    <motion.button
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                            "relative flex size-10 items-center justify-center rounded-[8px] 3xl:text-base text-sm font-medium transition-colors",
                            currentPage === pageNum ? "text-[#052B1E]" : "text-[#809FB8] hover:text-foreground",
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentPage === pageNum && (
                            <motion.div
                                layoutId="activePage"
                                className="absolute inset-0 bg-[#D1F7EA] rounded-[8px]"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{pageNum}</span>
                    </motion.button>
                </PaginationItem>
            )
        })
    }

    return (
        <Pagination className={cn("w-full", className)} {...props}>
            <PaginationContent className="flex w-full justify-between">
                <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        "flex items-center gap-3 3xl:text-base text-sm shrink-0",
                        currentPage === 1
                            ? "text-[#B3C5D4] font-medium cursor-not-allowed"
                            : "text-[#4D5F6E] font-semibold hover:text-foreground",
                    )}
                    whileHover={currentPage !== 1 ? { x: -2 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                >
                    <BasicArrowLeftIcon className='size-4 rotate-180 shrink-0' />
                    {
                        !isVisibleTablet &&
                        <span>
                            Trang trước
                        </span>
                    }
                </motion.button>

                <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

                <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        "flex items-center gap-3 3xl:text-base text-sm shrink-0",
                        currentPage === totalPages
                            ? "text-[#B3C5D4] font-medium cursor-not-allowed"
                            : "text-[#4D5F6E] font-semibold hover:text-foreground",
                    )}
                    whileHover={currentPage !== totalPages ? { x: 2 } : {}}
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                >
                    {
                        !isVisibleTablet &&
                        <span>
                            Trang kế tiếp
                        </span>
                    }
                    <BasicArrowLeftIcon className='size-4 shrink-0' />
                </motion.button>
            </PaginationContent>
        </Pagination>
    )
}

