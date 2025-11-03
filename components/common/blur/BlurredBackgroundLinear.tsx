"use client";

import React from "react";

type BlurredBackground2Props = {
    background?: string;
    className?: string;
    style?: React.CSSProperties;
    x?: number;
    y?: number;
};

const BlurredBackgroundLinear: React.FC<BlurredBackground2Props> = ({
    background = "linear-gradient(90deg, #E0FFCC 0%, #CCFFEC 100%)",
    className = "",
    style = {},
    x = 0,
    y = 0
}) => {
    return (
        <div
            className={`3xl:w-[480px] lg:w-[350px] w-[320px] aspect-square absolute -z-0 ${className}`}
            style={{
                background,
                filter: "blur(290.23px)",
                backdropFilter: "blur(290.23px)",
                WebkitBackdropFilter: "blur(290.23px)",
                opacity: 0.8,
                transform: `translate(${x}px, ${y}px)`,
                transition: "transform 0.3s ease-out", // Làm mượt khi quay lại trung tâm
                ...style
            }}
        />
    );
};

export default BlurredBackgroundLinear;
