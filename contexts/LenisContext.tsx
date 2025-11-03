"use client";
import { useRef, createContext, useContext, useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

// 1️⃣ Tạo context cho Lenis
const LenisContext = createContext<{
    lenis: Lenis | null;
    pauseLenis: () => void;
    resumeLenis: () => void;
    scrollTo: (target: number | string) => void;
} | undefined>(undefined);

// 2️⃣ Provider cho Lenis
export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const requestIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        console.log("🔄 Initializing Lenis...");
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            orientation: "vertical",
            gestureOrientation: "vertical",
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        let requestId: number;

        function raf(time: number) {
            lenisInstance.raf(time);
            requestId = requestAnimationFrame(raf);
        }
        requestId = requestAnimationFrame(raf);

        setLenis(lenisInstance);

        // Theo dõi khi body có class "overflow-hidden"
        const observer = new MutationObserver(() => {
            const isHidden = document.body.classList.contains("overflow-hidden");
            if (isHidden) {
                console.log("🚫 Stopping Lenis due to overflow-hidden");
                lenisInstance.stop();
            } else {
                console.log("✅ Resuming Lenis after removing overflow-hidden");
                lenisInstance.start();
            }
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => {
            console.log("🛑 Destroying Lenis...");
            observer.disconnect();
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current);
            }
            lenisInstance.destroy()
        }
    }, []);

    // 3️⃣ Hàm tạm dừng Lenis
    const pauseLenis = () => {
        if (!lenis) {
            console.warn("Lenis is not initialized yet.");
            return;
        }
        lenis.stop();
    };
    // 4️⃣ Hàm kích hoạt lại Lenis
    const resumeLenis = () => {
        if (!lenis) {
            console.warn("Lenis is not initialized yet.");
            return;
        }
        lenis.start();
    };
    // 5️⃣ Hàm scroll tới vị trí mong muốn
    const scrollTo = (target: number | string) => {
        if (!lenis) {
            console.warn("⚠️ Lenis is not initialized yet.");
            return;
        }
        console.log(`📍 Scrolling to: ${target}`);
        lenis.scrollTo(target, { duration: 1.5 });
    };


    return <LenisContext.Provider value={{ lenis, pauseLenis, resumeLenis, scrollTo }}>{children}</LenisContext.Provider>;
};

// 5️⃣ Custom hook để sử dụng Lenis trong component khác
export const useLenis = () => {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error("useLenis must be used within a LenisProvider");
    }
    return context;
};
