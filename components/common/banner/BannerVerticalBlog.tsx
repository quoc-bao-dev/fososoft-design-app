import React, { useState } from 'react'
import ButtonAnimationNew from '../button/ButtonAnimationNew';
import Image from 'next/image';
import { useResizeStore } from '@/stores/useResizeStore';

import { motion } from 'framer-motion'
import ArrowUpRightLinearBlueIcon from '@/components/icons/common/ArrowUpRightLinearBlueIcon';
import { ArrowUpRightIcon } from 'lucide-react';

type Props = {}

const BannerVerticalBlog = (props: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const { isVisibleTablet } = useResizeStore()

    return (
        <div
            className="relative rounded-3xl 2xl:py-14 xl:py-12 lg:py-8 py-8 3xl:space-y-8 space-y-6 w-full overflow-hidden"
            style={{
                background: "linear-gradient(357.92deg, #013DA0 2.23%, #0142A9 12.81%, #0148B3 23.39%, #024EBC 33.96%, #0254C5 44.54%, #025ACE 55.12%, #0261D7 65.7%, #0267E1 76.28%, #036EEA 86.86%, #0375F3 97.44%)"
            }}
        >
            {/* Ảnh hiển thị trên Tablet */}
            <div className="flex items-center justify-center">
                <motion.div
                    className="w-auto lg:h-[250px] md:h-[312px] h-[360px] aspect-1.92/1 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        alt="community"
                        src="/animation/contact/main-blog.png"
                        width={500}
                        height={450}
                        className="size-full object-cover relative z-[3]"
                    />

                    {/* animation mây */}
                    <motion.div
                        className="absolute  top-0 right-0 2xl:w-[260px] xxl:w-[260px] xl:w-[260px] w-[260px] h-auto aspect-1.92/1 z-[2]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: ["0%", "-5%", "5%", "0%"], // Di chuyển qua lại
                        }}
                        transition={{
                            duration: 6, // Tổng thời gian cho một chu kỳ
                            ease: "linear",
                            repeat: Infinity, // Lặp vô hạn
                            repeatType: "mirror", // Đảo chiều khi lặp
                        }}
                    >
                        <Image
                            alt="community"
                            src="/animation/contact/deco-cloud.png"
                            width={500}
                            height={450}
                            className="size-full object-contain"
                        />
                    </motion.div>

                    {/* animation contact */}
                    <motion.div
                        className="absolute top-20 -right-3 2xl:w-[320px] xxl:w-[280px] xl:w-[280px] w-[280px] h-auto aspect-1.92/1 z-[3]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: ["0%", "-5%", "5%", "0%"], // Di chuyển qua lại
                        }}
                        transition={{
                            duration: 6, // Tổng thời gian cho một chu kỳ
                            ease: "linear",
                            repeat: Infinity, // Lặp vô hạn
                            repeatType: "mirror", // Đảo chiều để không bị reset animation
                        }}
                    >
                        <Image
                            alt="community"
                            src="/animation/contact/deco-blog-2.png"
                            width={1200}
                            height={600}
                            className="size-full object-contain"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Nội dung */}
            <div className="flex flex-col 3xl:gap-8 gap-6 px-6">
                {/* Hiệu ứng chuyển động chữ */}
                <motion.div
                    className="3xl:!text-xl xl:!text-lg lg:!text-base !text-xl !tracking-[1%] max-w-full text-white font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className=""
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                        }}
                    >
                        Gia nhập cộng đồng{" "}
                    </motion.span>
                    <motion.span
                        className=""
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        FMRP
                    </motion.span>
                    <motion.span
                        className=""
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                    >
                        {" "}
                        – Kết nối, chia sẻ, cùng phát triển!
                    </motion.span>
                </motion.div>

                {/* Button */}
                <ButtonAnimationNew
                    title="Tham Gia Ngay"
                    icon={
                        <div className="2xl:size-10 md:size-10 size-9 rounded-full capitalize flex items-center justify-center group-hover:bg-white group-hover:text-gray-400 duration-500 transition-colors">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }} // Bay chéo lên phải và xuống lại
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                {/* <ArrowUpRightIcon className="2xl:size-6 md:size-5 size-4 text-white" /> */}
                                {isHovered ? <ArrowUpRightLinearBlueIcon className="2xl:size-6 md:size-5 size-4" /> : <ArrowUpRightIcon className="md:size-5 size-4" />}
                            </motion.div>
                        </div>
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        window.open("https://www.facebook.com/groups/mrpvn");
                    }}
                    reverse={true}
                    className="border border-white flex items-center gap-2 xl:!text-base lg:!text-sm md:!text-base text-sm tracking-[1%] group text-white hover:!bg-[#FFFFFF]/40 hover:!backdrop-blur-[100px] hover:!backdrop-filter font-medium pl-6 pr-1 py-1 rounded-[40px] w-full"
                    style={{
                        WebkitBackdropFilter: "blur(15px)",
                        boxShadow:
                            "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)",
                    }}
                />
            </div>
        </div>
    )
}

export default BannerVerticalBlog