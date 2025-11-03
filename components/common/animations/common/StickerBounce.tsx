"use client";

import { motion } from "framer-motion";
import React from "react";

interface StickerBounceProps {
    children: React.ReactNode;
    className?: string;
    shadowSize?: string; // ví dụ: w-10
    bounceHeight?: number; // px
    duration?: number; // sec
}

const StickerBounce: React.FC<StickerBounceProps> = ({
    children,
    className = "",
    shadowSize = "w-10",
    bounceHeight = 10,
    duration = 1.8,
}) => {
    return (
        <div className={`${className}`}>
            <motion.div
                className="relative z-10"
                animate={{ y: [0, -bounceHeight, 0] }}
                transition={{
                    duration: duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                {children}
            </motion.div>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-2 ${shadowSize} bg-black/10 rounded-full blur-sm z-0`} />
        </div>
    );
};

export default StickerBounce;
