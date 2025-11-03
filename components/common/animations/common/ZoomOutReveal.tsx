"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface ZoomOutRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    from?: "left" | "right" | "top" | "bottom";
    once?: boolean;
    stagger?: number;
    speed?: "slow" | "normal" | "fast";
    className?: string;
    style?: React.CSSProperties;
}

const ZoomOutReveal: React.FC<ZoomOutRevealProps> = ({
    children,
    delay = 0,
    duration = 0.8,
    from,
    once = false,
    stagger = 0,
    speed = "normal",
    className = "",
    style,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once });

    // Điều chỉnh tốc độ animation
    const speedMap = {
        slow: 1.2,
        normal: 0.8,
        fast: 0.4,
    };

    // Xác định hướng xuất hiện nếu có `from`, nếu không thì giữ nguyên
    const xMove = from === "left" ? -100 : from === "right" ? 100 : 0;
    const yMove = from === "top" ? -100 : from === "bottom" ? 100 : 0;

    const variants = {
        hidden: {
            opacity: 0,
            scale: 1.15, // Bắt đầu lớn hơn bình thường
            x: from ? xMove : 0,
            y: from ? yMove : 0,
        },
        visible: {
            opacity: 1,
            scale: [1.15, 0.95, 1], // Hiệu ứng thu nhỏ nhẹ rồi về kích thước chuẩn
            x: 0,
            y: 0,
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

export default ZoomOutReveal;
