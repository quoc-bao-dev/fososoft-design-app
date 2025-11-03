import BasicArrowLeftIcon from '@/components/icons/common/BasicArrowLeftIcon'
import { uuidv4 } from '@/lib/uuid'
import { IBlogItem, IBlogTag } from '@/types/blog/IBlog'
import Image from 'next/image'
import React from 'react'

import { motion } from 'framer-motion'
import CalendarBlankIcon from '@/components/icons/common/CalendarBlankIcon'
import ClockIcon from '@/components/icons/common/ClockIcon'
import Link from 'next/link'
import { FORMAT_DATE } from '../../../../constants/FormatDate';
import moment from 'moment';
import BlurImage from '../../blur/BlurImage'

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

const BlogCardVertical = ({ blog, className }: Props) => {
    return (
        <Link
            href={`/blogs/${blog.slug}`}
        >
            <motion.div
                className={`${className} flex flex-col gap-2 cursor-pointer group`}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="press"
            >
                {/* Hình ảnh chính */}
                <div className='relative w-full h-auto aspect-3/2 rounded-3xl overflow-hidden'>
                    {/* <Image
                        src={blog.image}
                        alt="BOM là gì?"
                        width={1000}
                        height={1000}
                        className="size-full object-cover aspect-3/2 rounded-3xl group-hover:scale-105 custom-transition"
                    /> */}
                    <BlurImage
                        src={blog.image}
                        alt="BOM là gì?"
                        width={900}
                        height={600}
                        className="size-full object-cover aspect-3/2 rounded-3xl group-hover:scale-105 custom-transition"
                        classNameContainer='w-full aspect-3/2'
                        loading="lazy"
                    />
                    {/* Overlay - Hiện dần khi hover */}
                    {/* <motion.div
                        className="absolute inset-0 bg-[#0F4F9E]/40 rounded-3xl"
                        variants={fadeVariants}
                    /> */}

                    {/* Nút "Xem thêm" */}
                    {/* <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        variants={hoverVariants}
                    >
                        <div className="flex items-center justify-center p-4  aspect-square 3xl:text-base text-sm rounded-full bg-[#15AA7A] text-white font-semibold shadow-lg capitalize">
                            Xem chi tiết
                        </div>
                    </motion.div> */}
                </div>

                <div className="mt-2 space-y-4">
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            blog && blog?.type_blog?.map((item: IBlogTag) => (
                                <div
                                    key={`tag-${item.id}`}
                                    className='px-2 py-1 text-xs text-white font-semibold rounded-lg capitalize'
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
                                {moment(blog?.updated_at)?.format(FORMAT_DATE?.DATE_TIME_SLASH_SHORT)}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#667F93]">
                            <ClockIcon className="mr-1 size-5" />

                            <span>
                                {blog.number_read ?? "20"} phút đọc
                            </span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-[#667F93] 3xl:text-lg text-base group-hover:text-[#667F93]/80 font-semibold custom-transition'>
                            Khám phá ngay
                        </span>

                        <div className='text-[#667F93] group-hover:text-white group-hover:translate-x-1 group-hover:bg-[#15AA7A]  p-3 rounded-full custom-transition'>
                            <BasicArrowLeftIcon className='size-4' />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default BlogCardVertical