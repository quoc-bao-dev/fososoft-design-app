"use client";

import React from "react";

type BlurredBackgroundProps = {
    background?: string;
    className?: string;
    style?: React.CSSProperties;
};

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({
    background = "linear-gradient(90deg, #E0FFCC 0%, #CCFFEC 100%)",
    className = "",
    style = {}
}) => {
    return (
        <div
            className={`3xl:w-[500px] lg:w-[400px] w-[320px] aspect-square absolute -z-0 !backdrop-filter !backdrop-blur-[267.447px] ${className}`}
            style={{
                background,
                filter: "blur(100px)", // Thay thế backdrop-filter nếu không hoạt động
                backdropFilter: "blur(150px)", // Áp dụng hiệu ứng mờ
                WebkitBackdropFilter: "blur(150px)", // Fix cho Safari
                opacity: 0.8, // Đảm bảo hiệu ứng hiển thị
                ...style
            }}
        />
    );
};

export default BlurredBackground;
