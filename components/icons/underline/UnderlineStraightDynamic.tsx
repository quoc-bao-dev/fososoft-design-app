import { motion } from "framer-motion";

const UnderlineStraightDynamic = ({
    className = "w-full h-[14px]",
    width = 200,
    height = 14,
    isActive = false,
    startColor = "#1556D9",
    endColor = "#8FE8FA",
}: {
    className?: string;
    width?: number;
    height?: number;
    isActive?: boolean;
    startColor?: string;
    endColor?: string;
}) => {
    return (
        <motion.svg
            className={className}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1],
            }}
        >
            <defs>
                <linearGradient id="underlineGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor={startColor} />
                    <stop offset="1" stopColor={endColor} />
                </linearGradient>
            </defs>
            <path
                d={`M0 ${height - 1} L${width} ${height - 1}`}
                stroke="url(#underlineGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export default UnderlineStraightDynamic;
