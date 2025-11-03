"use client";

import React from "react";
import { motion } from "framer-motion";

interface ArrowLongIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const ArrowLongIcon: React.FC<ArrowLongIconProps> = ({
    size = 32,
    color = "currentColor",
    className = "",
}) => {
    return (
        <svg
            width={size}
            height={(size * 80) / 136} // Giữ tỷ lệ phù hợp
            viewBox="0 0 136 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Gradient cho hiệu ứng chạy màu */}
            <defs>
                <linearGradient id="arrowGradient" x1="0" y1="0" x2="136" y2="80" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1AD598" />
                    <stop offset="100%" stopColor="#ffcc00" />
                </linearGradient>
            </defs>

            <motion.path
                d="M1.50241 19.8011C1.54031 20.3521 2.01769 20.768 2.56867 20.7301L11.5475 20.1126C12.0984 20.0747 12.5144 19.5973 12.4765 19.0463C12.4386 18.4953 11.9612 18.0794 11.4102 18.1173L3.42908 18.6662L2.88012 10.6851C2.84223 10.1341 2.36484 9.71817 1.81386 9.75607C1.26288 9.79396 0.846939 10.2713 0.884837 10.8223L1.50241 19.8011ZM135.99 79.5912C134.331 67.9804 127.88 55.2241 118.525 43.4391C109.162 31.6422 96.8339 20.7462 83.3161 12.8686C69.8036 4.99418 55.0439 0.102762 40.8304 0.40465C26.5832 0.707254 12.9383 6.23006 1.74609 19.0756L3.25401 20.3894C14.0619 7.98496 27.167 2.69531 40.8729 2.4042C54.6126 2.11237 69.0091 6.84599 82.3091 14.5966C95.6037 22.3441 107.744 33.073 116.959 44.6825C126.183 56.3037 132.419 68.7349 134.01 79.8741L135.99 79.5912Z"
                stroke="url(#arrowGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
                animate={{
                    strokeDashoffset: [200, 0], // Chạy từ dưới lên trên, không quay lại
                }}
                transition={{
                    duration: 2.5, // Làm chậm lại
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </svg>
    );
};

export default ArrowLongIcon;
