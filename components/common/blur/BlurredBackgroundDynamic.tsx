"use client";

import React from "react";

type BlurredBackground2Props = {
    background?: string;
    className?: string;
    style?: React.CSSProperties;
    x?: number;
    y?: number;
};

const BlurredBackgroundDynamic: React.FC<BlurredBackground2Props> = ({
    background = "linear-gradient(90deg, #E0FFCC 0%, #CCFFEC 100%)",
    className = "",
    style = {},
    x = 0,
    y = 0
}) => {
    return (
        <div
            className={`3xl:w-[500px] lg:w-[400px] w-[320px] absolute aspect-square -z-0 ${className}`}
            style={{
                background: background,
                filter: "blur(100px)",
                backdropFilter: "blur(100px)",
                WebkitBackdropFilter: "blur(100px)",
                opacity: 0.8,
                transform: `translate(${x}px, ${y}px)`,
                transition: "transform 0.3s ease-out", // Làm mượt khi quay lại trung tâm
                ...style
            }}
        />
    );
};

export default BlurredBackgroundDynamic;
