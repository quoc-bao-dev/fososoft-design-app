"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";

// ✅ Định nghĩa kiểu cho context
interface ScrollContextType {
    registerRef: (key: string, ref: RefObject<HTMLElement>) => void;
    scrollToElementRef: (key: string) => void;
}

// ✅ Tạo context với giá trị mặc định
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// ✅ Hook để sử dụng context
export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }
    return context;
};

// ✅ Component Provider để bọc toàn bộ ứng dụng
export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const refs = useRef<{ [key: string]: RefObject<HTMLElement> }>({});

    // 📌 Đăng ký ref cho từng section
    const registerRef = (key: string, ref: RefObject<HTMLElement>) => {
        refs.current[key] = ref;
    };

    // 📌 Hàm cuộn đến section được chỉ định (Nhanh hơn)
    const scrollToElementRef = (key: string) => {
        const targetRef = refs.current[key];
        if (!targetRef?.current) return;

        const targetPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 500; // ⬅️ Giảm thời gian cuộn để nhanh hơn
        let startTime: number | null = null;

        // 📌 Tăng tốc easing để phản hồi nhanh hơn
        const easeInOutQuad = (t: number): number => {
            return t < 0.4 ? 3 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animateScroll = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOutQuad(progress);

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (elapsedTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    return (
        <ScrollContext.Provider value={{ registerRef, scrollToElementRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
