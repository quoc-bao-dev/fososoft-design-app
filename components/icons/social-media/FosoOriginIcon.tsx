'use client';

import React from 'react';

interface FosoOriginIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const FosoOriginIcon: React.FC<FosoOriginIconProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg
            viewBox="0 0 34 45"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M16.8515 0.675781L17.8715 1.69578C19.4015 3.22578 20.2415 5.25578 20.2415 7.40578C20.2415 9.55578 19.4115 11.5758 17.9015 13.0958L10.1515 20.8458C9.75151 21.2458 9.53151 21.7758 9.53151 22.3458C9.53151 22.9158 9.75151 23.4558 10.1515 23.8558L20.2915 33.9958C22.1615 35.7858 25.1215 35.7558 26.9515 33.9258L21.5515 39.3258L16.8415 44.0258L3.41151 30.5958C1.02151 28.2058 -0.178494 25.0158 0.0215057 21.6358C0.191506 18.7958 1.46151 16.0758 3.58151 13.9458L16.8515 0.675781Z"
                fill="url(#paint0_linear_2305_3610)"
            />
            <path
                d="M24.5516 8.385L30.2916 14.125C32.4916 16.325 33.7016 19.245 33.7016 22.365C33.7016 25.475 32.4916 28.395 30.2916 30.595L26.9516 33.935C25.1216 35.765 22.1516 35.795 20.2916 34.005L16.8516 30.565L23.5616 23.855C23.9616 23.455 24.1816 22.915 24.1816 22.355C24.1816 21.785 23.9616 21.245 23.5616 20.845C22.0116 19.295 21.1716 17.265 21.1716 15.105C21.1716 12.945 22.0116 10.915 23.5416 9.395L24.5616 8.375L24.5516 8.385Z"
                fill="url(#paint1_linear_2305_3610)"
            />
            <path
                d="M16.8466 17.5664L20.7851 21.505C21.2518 21.9717 21.2518 22.7354 20.7851 23.202L16.8466 27.1406L12.908 23.202C12.4413 22.7354 12.4413 21.9717 12.908 21.505L16.8466 17.5664Z"
                fill="url(#paint2_linear_2305_3610)"
            />

            <defs>
                <linearGradient id="paint0_linear_2305_3610" x1="8.50151" y1="10.9358" x2="20.4015" y2="42.4858" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0375F3" />
                    <stop offset="1" stopColor="#25387A" />
                </linearGradient>
                <linearGradient id="paint1_linear_2305_3610" x1="26.8416" y1="21.195" x2="20.5516" y2="44.905" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1FC583" />
                    <stop offset="1" stopColor="#1F9285" />
                </linearGradient>
                <linearGradient id="paint2_linear_2305_3610" x1="16.8533" y1="17.0501" x2="16.8533" y2="28.4901" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0375F3" />
                    <stop offset="1" stopColor="#013DA0" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default FosoOriginIcon;