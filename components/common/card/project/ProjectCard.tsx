"use client"
import Link from 'next/link';
import { motion } from 'framer-motion'
import React, { useState, useCallback } from 'react';

import BlurImage from '../../blur/BlurImage';
import { useResizeStore } from '@/stores/useResizeStore';
import { HiArrowUpRight } from 'react-icons/hi2';

type ProjectCardProps = {
    project: {
        id: string;
        image: string;
        content: string;
        logo: string;
    };
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const { isVisibleTablet } = useResizeStore()
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(0);

    const handleHover = useCallback((hovering: boolean) => {
        setIsHovered(hovering);
        if (hovering) setRotation((prev) => prev + 360); // Xoay icon 360° mỗi lần hover
    }, []);

    return (
        <Link
            href="#"
            className='col-span-1 flex items-end relative w-full rounded-3xl group'
            style={{
                aspectRatio: '0.87 / 1' ,
                boxShadow: "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A"
            }}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >

            <div className='absolute inset-0 rounded-3xl z-0 overflow-hidden'>
                {/* Skeleton Loading */}
                <BlurImage
                    src={project?.image ?? "/default/default.png"}
                    alt="Project Image"
                    width={500}
                    height={800}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..." // Chuỗi Base64 của ảnh mờ
                    priority
                    className="size-full object-cover object-top rounded-3xl"
                    classNameContainer="size-full rounded-3xl"
                />

                {/* Hover Overlay */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute blur-md"
                    style={{
                        background: "linear-gradient(to bottom, rgba(216, 230, 255, 0.9) 0%, rgba(216, 230, 255, 0.1) 40%, rgba(157, 255, 179, 0.5) 100%)",
                        WebkitMaskImage: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 33%, rgba(0, 0, 0, 0) 100%)"
                        // background: "background: linear-gradient(180deg, #9DFFB3 0%, #1AA37A 100%)"
                    }}
                />
            </div>

            {/* Project Details (Trigger hover effect) */}
            <div
                className='w-full p-3 relative z-10 rounded-3xl'
                style={{
                    // boxShadow: "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A",
                    // background: "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 12.85%, rgba(0, 0, 0, 0) 100%)"
                    boxShadow: isVisibleTablet ? "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A" : "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A",
                    background: isVisibleTablet ? "linear-gradient(360deg, rgba(0, 0, 0, 0.5) 12.85%, rgba(0, 0, 0, 0) 100%)" : "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 12.85%, rgba(0, 0, 0, 0) 100%)"
                }}
            >
                <div className='flex items-center justify-between gap-6 bg-white rounded-3xl px-6 py-3 relative z-20'>
                    <div className='flex flex-col gap-4 max-w-full'>
                        <div className='flex items-start w-full h-8'>
                            <BlurImage
                                alt="logo"
                                src={project?.logo ?? "/default/default.png"}
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..." // Base64 của ảnh mờ
                                className='!w-auto h-full object-contain'
                                classNameContainer='h-8 w-full'
                                loading='lazy'
                            />
                        </div>

                        <div className='text-sm-default text-[#667F93] group-hover:text-[#667F93]/80 line-clamp-3'>
                            {project?.content}
                        </div>
                    </div>

                    {/* Rotating Arrow Icon */}
                    <motion.div
                        animate={{ rotate: rotation }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center 3xl:max-w-12 max-w-10 w-full relative text-white"
                    >
                        <div className="bg-[#000000] 3xl:p-3.5 p-3 rounded-full shrink-0">
                            <HiArrowUpRight className='3xl:size-5 size-[18px] ' /> 
                        </div>
                    </motion.div>
                </div>
            </div>
        </Link >
    )
}

export default ProjectCard;