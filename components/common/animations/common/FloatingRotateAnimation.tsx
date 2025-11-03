"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FloatingRotateProps {
    children: React.ReactNode;
    className?: string;
}

const FloatingRotateAnimation: React.FC<FloatingRotateProps> = ({ children, className }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <motion.div
                animate={{
                    rotate: [0, 5, -5, 0], // Xoay nhẹ theo trục
                    y: [0, -3, 3, 0] // Trôi lên xuống
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default FloatingRotateAnimation;
