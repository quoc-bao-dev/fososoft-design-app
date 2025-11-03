"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface ScaleRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    once?: boolean;
    stagger?: number;
    speed?: "slow" | "normal" | "fast";
    className?: string;
    style?: React.CSSProperties;
}

const ScaleReveal: React.FC<ScaleRevealProps> = ({
    children,
    delay = 0,
    duration = 0.8,
    once = false,
    stagger = 0,
    speed = "normal",
    className = "",
    style,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once });

    // Điều chỉnh tốc độ
    const speedMap = {
        slow: 1.2,
        normal: 0.8,
        fast: 0.4,
    };

    const variants = {
        hidden: {
            scale: 0.8, // Thu nhỏ ban đầu
            opacity: 0,
        },
        visible: {
            scale: [0.8, 1.1, 1], // Scale lên rồi trở lại bình thường
            opacity: 1,
            transition: {
                duration: speedMap[speed],
                delay: delay + stagger,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export default ScaleReveal;
