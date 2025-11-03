'use client'

import { motion } from 'framer-motion'

interface Letter {
    id: number
    letter: string
}

interface AnimatedTitleProps {
    heroPerTitle: Letter[]
    className?: string
    delay?: number
    style?: any
}

export default function AnimatedTitleGradient({ heroPerTitle, className, delay = 0, style }: AnimatedTitleProps) {
    const container = {
        hidden: { opacity: 1 }, // Luôn hiển thị để giữ màu gradient
        visible: {
            transition: { staggerChildren: 0.05, delayChildren: delay },
        },
    }

    const child = {
        visible: {
            opacity: 1,
            scaleX: 1,
            transition: {
                type: "easeOut",
                damping: 15, // ⬅️ Tăng damping để giảm rung
                stiffness: 20, // ⬅️ Giảm stiffness để mượt hơn
            },
        },
        hidden: {
            opacity: 0,
            scaleX: 0,
            transition: {
                type: "easeOut",
                damping: 15,
                stiffness: 20,
            },
        },
    }

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
            style={{
                ...style,
                display: "inline-block", // Giữ inline nhưng vẫn áp dụng gradient toàn bộ
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            {heroPerTitle.map((e) => (
                <motion.span key={e.id.toString()} variants={child} style={{ display: "inline" }}>
                    {e.letter}
                </motion.span>
            ))}
        </motion.span>
    )
}
