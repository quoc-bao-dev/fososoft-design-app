"use client";

import { motion } from "framer-motion";

interface StickerHighlightProps {
    children: React.ReactNode;
    className?: string;
    shadowColor?: string; // Màu ánh sáng của boxShadow (mặc định là xanh)
}

const StickerHighlight: React.FC<StickerHighlightProps> = ({
    children,
    className,
    shadowColor = "rgba(21, 170, 122, 0.4)", // Default FMRP green
    ...props
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 0px rgba(255, 255, 255, 0)",
                        `0 0 10px ${shadowColor}`,
                        "0 0 0px rgba(255, 255, 255, 0)"
                    ]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="rounded-full"
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export default StickerHighlight;
