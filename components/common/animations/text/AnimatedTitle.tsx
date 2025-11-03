'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';

interface Letter {
    id: number
    letter: string
}

interface AnimatedTitleProps {
    heroPerTitle: Letter[]
    className?: string
    delay?: number // ⬅️ Thêm prop để điều chỉnh delay
    style?: any
}

export default function AnimatedTitle({ heroPerTitle, className, delay = 0, style }: AnimatedTitleProps) {
    const { ref, inView } = useInView({
        triggerOnce: true, // chỉ animate 1 lần
        rootMargin: '-20% 0px', // cho phép xuất hiện sớm hơn khi gần tới viewport
    })


    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }, // ⬅️ Tăng staggerChildren và dùng delay
        },
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15, // ⬅️ Tăng damping để giảm rung
                stiffness: 20, // ⬅️ Giảm stiffness để mượt hơn
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 20,
            },
        },
    }

    return (
        <motion.span
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
                ...style
            }}
        >
            {heroPerTitle.map((e) => (
                <motion.span key={e.id.toString()} variants={child}>
                    {e.letter}
                </motion.span>
            ))}
        </motion.span>
    )
}
