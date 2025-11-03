"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
    const [bgColor, setBgColor] = useState<string>("rgba(255, 255, 255, 0.9)");
    const [size, setSize] = useState<number>(20); // Kích thước mặc định nhỏ

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - size / 2);
            mouseY.set(e.clientY - size / 2);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY, size]);

    useEffect(() => {
        // Chọn tất cả các phần tử có class `cursor-pointer`
        const interactiveElements = document.querySelectorAll(".cursor-pointer, button, a");

        const handleHover = (e: Event) => {
            const target = e.target as HTMLElement;

            if (target.closest("header")) {
                setSize(0); // Header - Zoom nhẹ
                setBgColor("rgba(255, 100, 100, 0.9)"); // Màu đỏ nhạt
            } else if (target.closest("footer")) {
                setSize(60); // Footer - Zoom mạnh
                setBgColor("rgba(100, 255, 100, 0.9)"); // Màu xanh nhạt
            } else {
                setSize(30); // Default khi hover vào button hoặc chữ
                setBgColor("rgba(255, 255, 255, 0.9)");
            }
        };

        const handleLeave = () => {
            setSize(20); // Quay về kích thước mặc định khi rời đi
            setBgColor("rgba(255, 255, 255, 0.9)");
        };

        // const handleHover = () => setSize(50); // Khi hover vào, tăng kích thước
        // const handleLeave = () => setSize(20); // Khi rời đi, quay lại kích thước mặc định

        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", handleHover);
            element.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            interactiveElements.forEach((element) => {
                element.removeEventListener("mouseenter", handleHover);
                element.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-50"
            style={{
                x: smoothX,
                y: smoothY,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: bgColor,
                transition: "width 0.2s ease-out, height 0.2s ease-out",
            }}
        />
    );
};

export default CursorFollower;
