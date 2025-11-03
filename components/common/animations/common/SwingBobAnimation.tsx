"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SwingBobProps {
    children: React.ReactNode;
    className?: string;
}

const SwingBobAnimation: React.FC<SwingBobProps> = ({ children, className }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <motion.div
                animate={{
                    rotate: [-5, 5, -5], // Đu đưa trái phải
                    y: [0, -5, 0], // Trôi nhẹ
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default SwingBobAnimation;
