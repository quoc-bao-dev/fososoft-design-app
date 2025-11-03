"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface WiggleRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}

const WiggleReveal: React.FC<WiggleRevealProps> = ({
    children,
    delay = 0,
    duration = 0.8,
    className = "",
    style,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });

    const variants = {
        hidden: { opacity: 0, rotateZ: 0 },
        visible: {
            opacity: 1,
            rotateZ: [-5, 5, -3, 0],
            transition: {
                duration,
                delay,
                ease: "easeInOut",
                type: "spring",
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

export default WiggleReveal;
