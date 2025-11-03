// components/icons/ArrowIcon.tsx
import React from "react";

interface IconProps {
    size?: number;
    color?: string;
}

const ArrowIcon: React.FC<IconProps> = ({ size = 24, color = "black" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 4L4 12L12 20"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ArrowIcon;
