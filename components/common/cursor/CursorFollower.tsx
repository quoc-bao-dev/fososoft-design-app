"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";

const CursorFollower = () => {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

    const defaultSize = 16;
    const sizeRef = useRef(defaultSize);
    const prevSizeRef = useRef(defaultSize);
    const colorRef = useRef("");

    const updateCursorStyle = useCallback(() => {
        const el = cursorRef.current;
        if (!el) return;

        if (prevSizeRef.current !== sizeRef.current) {
            el.style.width = `${sizeRef.current}px`;
            el.style.height = `${sizeRef.current}px`;
            prevSizeRef.current = sizeRef.current;
        }

        el.style.backgroundColor = colorRef.current;
    }, []);

    const handleMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX - sizeRef.current / 2);
        mouseY.set(e.clientY - sizeRef.current / 2);
        updateCursorStyle();
    }, [mouseX, mouseY, updateCursorStyle]);

    const handleHover = useCallback((e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest("footer, footer *")) {
            sizeRef.current = 60;
            colorRef.current = "rgba(255, 255, 255, 0.9)";
            cursorRef.current?.classList.add("mix-blend-difference");
        }
    }, []);

    const handleLeave = useCallback(() => {
        sizeRef.current = defaultSize;
        colorRef.current = dataFmrpPages.includes(pathname)
            ? "rgba(3, 117, 243, 1)"
            : "rgba(26, 213, 152, 1)";
        cursorRef.current?.classList.remove("mix-blend-difference");
    }, [pathname]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMove, { passive: true });
        document.body.addEventListener("mouseenter", handleHover, true);
        document.body.addEventListener("mouseleave", handleLeave, true);

        // Set initial color
        handleLeave();

        return () => {
            window.removeEventListener("mousemove", handleMove);
            document.body.removeEventListener("mouseenter", handleHover, true);
            document.body.removeEventListener("mouseleave", handleLeave, true);
        };
    }, [handleMove, handleHover, handleLeave]);

    const isFmrp = dataFmrpPages.includes(pathname);
    const cursorColor = isFmrp ? "rgba(3, 117, 243, 1)" : "rgba(26, 213, 152, 1)";
    const shadowColor = isFmrp ? "rgba(3, 117, 243, 0.45)" : "rgba(26, 213, 152, 0.45)";

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-50"
            style={{
                x: smoothX,
                y: smoothY,
                width: defaultSize,
                height: defaultSize,
                borderRadius: "50%",
                backgroundColor: cursorColor,
                transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out",
                boxShadow: `4px 8px 25px 4px ${shadowColor}`
            }}
        />
    );
};

export default CursorFollower;
