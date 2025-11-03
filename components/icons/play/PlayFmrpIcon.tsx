"use client";

import React from "react";

interface PlayFmrpIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const PlayFmrpIcon: React.FC<PlayFmrpIconProps> = ({
    size = 32,
    color = "currentColor",
    className = "",
}) => {
    return (
        <svg
            viewBox="0 0 44 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M44 26.0769C44.0016 26.756 43.8275 27.4239 43.4946 28.0158C43.1617 28.6076 42.6812 29.1032 42.1 29.4544L6.08 51.4894C5.47272 51.8613 4.77717 52.0643 4.0652 52.0775C3.35322 52.0907 2.65064 51.9136 2.03 51.5644C1.41527 51.2207 0.903191 50.7195 0.54641 50.1123C0.189629 49.505 0.00102714 48.8137 0 48.1094V4.04443C0.00102714 3.34014 0.189629 2.64884 0.54641 2.04161C0.903191 1.43438 1.41527 0.933138 2.03 0.589431C2.65064 0.240303 3.35322 0.0631848 4.0652 0.0763695C4.77717 0.0895542 5.47272 0.292564 6.08 0.664432L42.1 22.6994C42.6812 23.0506 43.1617 23.5462 43.4946 24.1381C43.8275 24.7299 44.0016 25.3979 44 26.0769Z"
                fill={color}
            />
        </svg>
    );
};

export default PlayFmrpIcon;
