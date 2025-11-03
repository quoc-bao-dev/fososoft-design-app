import { animate, motionValue } from 'framer-motion';
import { RefObject, useCallback } from 'react';


// Khi reload page thì sử dụng hàm này để tự động chuyển lên đầu trang
const scrollToTop = () => {
    const scrollY = motionValue(window.scrollY); // Lưu giá trị hiện tại vào motionValue

    animate(scrollY, 0, {
        type: "keyframes",
        stiffness: 120,
        damping: 25,
        mass: 0.8,
        onUpdate: (value) => window.scrollTo(0, value),
    });
};


// scroll đến section có id phù hợp
const scrollToSection = (idSection: number | string) => {
    const element = document.getElementById(String(idSection));
    if (element) {
        const yOffset = 0; // Khoảng cách muốn trừ đi
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        const scrollY = motionValue(window.scrollY); // Lưu giá trị cuộn hiện tại

        // Sử dụng framer-motion để cuộn đến vị trí tính toán
        animate(scrollY, y, {
            type: "keyframes",
            stiffness: 120,
            damping: 25,
            mass: 0.8,
            onUpdate: (value: number) => window.scrollTo(0, value),
        });
    }
};


// scroll đến ref đã được chọn
const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()

    const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const step = (currentTime: number) => {
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easeInOutQuad(progress)

        window.scrollTo(0, startY + distance * easedProgress)

        if (timeElapsed < duration) {
            requestAnimationFrame(step)
        }
    }

    requestAnimationFrame(step)
}

export {
    scrollToTop,
    scrollToSection,
    smoothScrollTo
}