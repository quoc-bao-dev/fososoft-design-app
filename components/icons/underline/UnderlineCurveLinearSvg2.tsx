import { motion } from "framer-motion";
import React from "react";

interface UnderlineCurveLinearSvgProps {
    className?: string;
    inView: boolean;
    delay?: number
}

const UnderlineCurveLinearSvg2: React.FC<UnderlineCurveLinearSvgProps> = ({ className = "", inView, delay = 0.4 }) => {
    return (
        <motion.svg
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[14px] pointer-events-none ${className}`}
            viewBox="0 0 300 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
                duration: 4,
                delay: delay,
                ease: [0.25, 1, 0.5, 1],
            }}
        >
            <defs>
                <linearGradient id="underlineGradient" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8FE8FA" />
                    <stop offset="1" stopColor="#1556D9" />
                </linearGradient>
            </defs>
            <path
                d="M0 13 C 60 0, 145 0, 300 13"
                stroke="url(#underlineGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export default UnderlineCurveLinearSvg2;
