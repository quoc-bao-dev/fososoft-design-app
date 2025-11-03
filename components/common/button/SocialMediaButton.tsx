"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type TooltipPosition = "left" | "right" | "top" | "bottom";

type SocialMediaProps = {
    icon: React.ReactNode;
    info: React.ReactNode;
    handleClick?: () => void;
    className?: string;
    tooltipPosition?: TooltipPosition;
};

const SocialMediaButton = ({
    icon,
    info,
    handleClick,
    className,
    tooltipPosition = "left"
}: SocialMediaProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative flex flex-col justify-center items-center">
            {/* Nút chính */}
            <motion.button
                type="button"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`${className}  z-[1] rounded-full text-white flex flex-col justify-center items-center`}
            >
                {icon}
            </motion.button>

            {/* Tooltip hiển thị bên trái */}
            <AnimatePresence>
                {isHovered && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="absolute right-[76px] z- bg-white rounded-xl shadow-2xl flex flex-col gap-2 min-w-fit max-w-[400px]"
                        >
                            <div className='relative z-50 bg-white text-black px-4 py-3 rounded-xl flex flex-col gap-2 min-w-fit max-w-[400px]'>
                                {info}
                            </div>
                            {/* Mũi tên */}
                            <div className="absolute z-10 right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 "></div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SocialMediaButton;
