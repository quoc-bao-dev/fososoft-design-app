"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PulseGlowProps {
    children: React.ReactNode;
    className?: string;
}

const PulseGlowAnimation: React.FC<PulseGlowProps> = ({ children, className }) => {
    return (
        <motion.div
            className={`${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.05, 1], // Hiệu ứng phóng to - nhỏ lại
                    boxShadow: [
                        "0px 0px 10px rgba(255,255,255,0.2)",
                        "0px 0px 20px rgba(255,255,255,0.5)",
                        "0px 0px 10px rgba(255,255,255,0.2)"
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default PulseGlowAnimation;
