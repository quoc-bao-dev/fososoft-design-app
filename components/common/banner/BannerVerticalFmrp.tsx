import React, { useState } from 'react'
import ButtonAnimationNew from '../button/ButtonAnimationNew';
import Image from 'next/image';
import { useResizeStore } from '@/stores/useResizeStore';

import { motion } from 'framer-motion'
import ArrowUpRightLinearBlueIcon from '@/components/icons/common/ArrowUpRightLinearBlueIcon';
import { ArrowUpRightIcon } from 'lucide-react';
import SalyAnimation from '../animations/common/SalyAnimation';
import StickerHighlight from '../animations/common/StickerHighlight';

type Props = {}

const BannerVerticalFmrp = (props: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const { isVisibleTablet } = useResizeStore()

    return (
        <div
            className="relative rounded-3xl 2xl:pb-14 xl:pb-12 lg:pb-8 pb-8 pt-4 3xl:space-y-4 space-y-4 w-full overflow-hidden"
            style={{
                background: "linear-gradient(36.82deg, #013DA0 2.16%, #0142A9 12.83%, #0148B3 23.51%, #024EBC 34.18%, #0254C5 44.85%, #025ACE 55.53%, #0261D7 66.2%, #0267E1 76.87%, #036EEA 87.55%, #0375F3 98.22%)"
            }}
        >
            {/* Ảnh hiển thị trên Tablet */}
            <div className="flex items-center justify-end translate-x-6">
                <motion.div
                    className="lg:w-[425px] w-[290px] h-auto relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        alt="community"
                        src="/background/banner/mockup1.png"
                        width={625}
                        height={336}
                        className="size-full object-contain relative z-[3]"
                    />
                </motion.div>
            </div>


            {/* Nội dung */}
            <div className="flex flex-col 3xl:gap-12 gap-10 px-6">
                <div className="flex items-center justify-between gap-2">
                    {/* <motion.div
                        
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                    </motion.div> */}
                    <StickerHighlight className="w-[126px] h-auto aspect-square relative shrink">
                        <Image
                            alt="community"
                            src="/background/banner/ai-robot-2.svg"
                            width={500}
                            height={450}
                            className="size-full object-contain relative z-[3]"
                        />
                    </StickerHighlight>

                    <div className="flex flex-col items-end justify-center gap-0.5">
                        {/* <motion.span
                            animate={{
                                x: [0, -2, 0],   // Trôi lên xuống
                                rotate: [-4, 2, -4,] // Lắc đều trái phải
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className='text-base-default text-white font-bold'
                        >
                            Miễn phí dùng thử
                        </motion.span> */}

                        <motion.div
                            className="w-[150px] h-auto aspect-3/1 relative shrink"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <Image
                                alt="community"
                                src="/logo/fmrp/logo-fmrp-new.svg"
                                width={500}
                                height={450}
                                className="size-full object-contain relative z-[3]"
                            />
                        </motion.div>

                        <motion.span
                            // animate={{
                            //     x: [0, -2, 0],   // Trôi lên xuống
                            //     rotate: [-4, 2, -4,] // Lắc đều trái phải
                            // }}
                            // transition={{
                            //     duration: 2,
                            //     repeat: Infinity,
                            //     ease: "easeInOut"
                            // }}
                            className='text-sm-default text-white font-medium capitalize'
                        >
                            Quản Lý Xưởng Online
                        </motion.span>
                    </div>
                </div>

                {/* Button */}
                <ButtonAnimationNew
                    title="Trải nghiệm ngay"
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
                        window.open("https://hub.fmrp.vn/auth/register");
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

export default BannerVerticalFmrp