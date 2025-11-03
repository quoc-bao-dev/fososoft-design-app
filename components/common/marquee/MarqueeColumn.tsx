import { motion, useMotionValue } from "framer-motion";
import React, { memo, useRef, useEffect, useCallback } from "react";
import AvatarCustom from "../avatar/AvatarCustom";
import { FeedbackItem } from "@/types/feedback/IFeedback";
import { usePathname } from 'next/navigation';
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";

type MarqueeColumnProps = {
    feedbacks: FeedbackItem[];
    direction: "up" | "down";
};

const MarqueeColumn = memo(({ feedbacks, direction }: MarqueeColumnProps) => {
    const pathname = usePathname()
    const y = useMotionValue(0); // Lưu vị trí hiện tại
    const marqueeRef = useRef<HTMLDivElement>(null);
    const animationFrame = useRef<number | null>(null);
    const speed = 400;

    // Hàm chạy marquee, sử dụng useCallback để tránh re-render không cần thiết
    const runMarquee = useCallback(() => {
        if (!marqueeRef.current) return;

        let currentY = y.get();
        const step = (marqueeRef.current.offsetHeight / speed) * 0.1; // Điều chỉnh tốc độ

        if (direction === "down") {
            currentY -= step;
            if (currentY <= -marqueeRef.current.offsetHeight / 2) {
                currentY = 0; // Reset về đầu khi chạy hết
            }
        } else {
            currentY += step;
            if (currentY >= 0) {
                currentY = -marqueeRef.current.offsetHeight / 2; // Reset về cuối khi chạy hết
            }
        }

        y.set(currentY);
        animationFrame.current = requestAnimationFrame(runMarquee);
    }, [direction, speed, y]);

    // Start animation khi component mount
    useEffect(() => {
        animationFrame.current = requestAnimationFrame(runMarquee);
        return () => {
            if (animationFrame.current !== null) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [runMarquee]);

    // Dừng animation khi hover vào
    const handleMouseEnter = () => {
        if (animationFrame.current !== null) {
            cancelAnimationFrame(animationFrame.current);
            animationFrame.current = null;
        }
    };

    // Tiếp tục animation khi bỏ hover
    const handleMouseLeave = () => {
        if (animationFrame.current === null) {
            animationFrame.current = requestAnimationFrame(runMarquee);
        }
    };

    return (
        <div
            className="relative lg:w-1/2 w-full h-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={marqueeRef}
                className="absolute flex flex-col 3xl:gap-6 md:gap-4 gap-2"
                style={{ y }}
            >
                {[...feedbacks, ...feedbacks].map((feedback, index) => (
                    <div
                        key={`${direction}-${index}`}
                        className="flex flex-col gap-2 justify-between h-full w-full 3xl:p-6 md:p-4 p-3 lg:rounded-3xl rounded-2xl border border-[#09090B1A]"
                        style={{
                            background: "linear-gradient(180deg, rgba(9, 9, 11, 0.04) 0%, rgba(9, 9, 11, 0.02) 100%)",
                        }}
                    >
                        <div className="flex items-center 3xl:space-x-4 space-x-2">
                            <AvatarCustom classNameContainer={`${feedback.gender === "male" ? "bg-[#76E6C1]" : "bg-[#92BFF7]"} 3xl:size-12 md:size-10 size-8 p-1.5`} avatar={feedback?.image} />
                            <div>
                                <p className="md:text-base text-sm font-bold text-gray-800">{feedback.name}</p>
                                <p className="md:text-sm text-xs text-[#667F93]">{feedback.position}</p>
                            </div>
                        </div>
                        <p className="3xl:text-base lg:text-sm text-xs text-[#667F93]">{feedback.message}</p>
                    </div>
                ))}
            </motion.div>

            {
                !dataFmrpPages.includes(pathname) ?
                    <React.Fragment>
                        <div
                            className="absolute bottom-0 left-0 w-full h-20"
                            style={{
                                background: "linear-gradient(360deg, #fff 24%, hsla(0, 0%, 100%, 0))",
                            }}
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-12"
                            style={{
                                background: "linear-gradient(180deg, #fff 24%, hsla(0, 0%, 100%, 0))",
                            }}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div
                            className="absolute bottom-0 left-0 w-full h-20"
                            style={{
                                background: "linear-gradient(360deg, #fff 24%, hsla(0, 0%, 100%, 0))",
                            }}
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-12"
                            style={{
                                background: "linear-gradient(180deg, #fff 24%, hsla(0, 0%, 100%, 0))",
                            }}
                        />
                    </React.Fragment>
            }
        </div>
    );
});

export default MarqueeColumn;
