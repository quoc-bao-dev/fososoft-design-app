import BasicArrowLeftIcon from '@/components/icons/common/BasicArrowLeftIcon'
import { uuidv4 } from '@/lib/uuid'
import { IBlogItem, IBlogTag } from '@/types/blog/IBlog'
import Image from 'next/image'
import React from 'react'

import { motion } from 'framer-motion'
import CalendarBlankIcon from '@/components/icons/common/CalendarBlankIcon'
import ClockIcon from '@/components/icons/common/ClockIcon'

type Props = {
    blog: IBlogItem
    className?: string
}

const dataBackgroundColor = [
    {
        id: uuidv4(),
        bg: "#0F4F9E"
    },
    {
        id: uuidv4(),
        bg: "#15AA7A"
    },
    {
        id: uuidv4(),
        bg: "#555CF3"
    },
    {
        id: uuidv4(),
        bg: "#F3654A"
    },
    {
        id: uuidv4(),
        bg: "#F47690"
    },
    {
        id: uuidv4(),
        bg: "#12AFF0"
    },
    {
        id: uuidv4(),
        bg: "#FACA4A"
    },
]

// ✅ Overlay xuất hiện dần (fade in)
const fadeVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

// ✅ Khai báo variants cho animation
const hoverVariants = {
    rest: { opacity: 0, y: 50 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const BlogCardHorizontal = ({ blog, className }: Props) => {
    return (
        <motion.div
            className={`${className} flex flex-row  gap-2 cursor-pointer group`}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap="press"
        >
            {/* Hình ảnh chính */}
            <div className='max-w-[30%] relative w-full aspect-square rounded-3xl overflow-hidden shrink-0'>
                <Image
                    src={blog.image}
                    alt="BOM là gì?"
                    width={1000}
                    height={1000}
                    className="size-full object-cover aspect-square rounded-3xl group-hover:scale-105 custom-transition"
                />
            </div>

            <div className="max-w-[70%] mt-2 space-y-4">
                <div className='flex flex-wrap items-center gap-2'>
                    {
                        blog && blog?.type_blog?.map((item: IBlogTag) => (
                            <div
                                key={`tag-${item.id}`}
                                className='px-3 py-2 3xl:text-[13px] text-xs text-white font-semibold rounded-lg capitalize'
                                style={{
                                    background: item.color
                                }}
                            >
                                {item?.name ?? ""}
                            </div>
                        ))
                    }
                </div>

                <h3 className="text-title font-extrabold text-[#33404A] group-hover:text-[#15AA7A] custom-transition min-h-[56px]">
                    {blog?.title ?? ""}
                </h3>

                <div className="mt-2 flex items-center gap-4 3xl:text-base text-sm  font-medium">
                    <div className="flex items-center gap-1 text-[#667F93] pr-4 border-r">
                        <CalendarBlankIcon className="mr-1 size-5" />
                        <span>
                            17/11/2022
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#667F93]">
                        <ClockIcon className="mr-1 size-5" />

                        <span>
                            10 phút đọc
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BlogCardHorizontal