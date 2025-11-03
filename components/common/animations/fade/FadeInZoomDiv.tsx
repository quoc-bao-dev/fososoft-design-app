"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface FadeInZoomProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const FadeInZoomSpan: React.FC<FadeInZoomProps> = ({
    children,
    delay = 0,
    duration = 1, // ⬅️ Hiệu ứng rõ hơn (tăng duration)
    className = "",
    style,
    onMouseEnter,
    onMouseLeave,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" }); // ⬅️ Phát hiện sớm hơn khi cuộn tới

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.6 }} // ⬅️ Bắt đầu nhỏ hơn
            animate={isInView ? { opacity: 1, scale: [0.6, 1.1, 1] } : { opacity: 0, scale: 0.6 }} // ⬅️ Zoom lên rồi trở về 1
            transition={{
                duration,
                delay,
                ease: [0.33, 1, 0.68, 1], // ⬅️ Ease mạnh hơn
            }}
            className={className}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </motion.div>
    );
};

export default FadeInZoomSpan;
