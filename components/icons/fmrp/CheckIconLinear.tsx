'use client';

import React from 'react';

interface CheckIconLinearProps {
    size?: number;
    color?: string;
    className?: string;
}

const CheckIconLinear: React.FC<CheckIconLinearProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_3147_6028)">
                <path
                    d="M21.7959 7.75887L9.7959 19.7589C9.69138 19.8637 9.56719 19.947 9.43044 20.0037C9.2937 20.0605 9.14709 20.0898 8.99902 20.0898C8.85096 20.0898 8.70435 20.0605 8.5676 20.0037C8.43085 19.947 8.30666 19.8637 8.20215 19.7589L2.95215 14.5089C2.8475 14.4042 2.76449 14.28 2.70785 14.1433C2.65122 14.0065 2.62207 13.86 2.62207 13.712C2.62207 13.564 2.65122 13.4175 2.70785 13.2807C2.76449 13.144 2.8475 13.0198 2.95215 12.9151C3.05679 12.8105 3.18103 12.7275 3.31776 12.6708C3.45448 12.6142 3.60103 12.585 3.74902 12.585C3.89702 12.585 4.04356 12.6142 4.18029 12.6708C4.31702 12.7275 4.44125 12.8105 4.5459 12.9151L8.99996 17.3692L20.204 6.16699C20.4154 5.95565 20.702 5.83691 21.0009 5.83691C21.2998 5.83691 21.5864 5.95565 21.7978 6.16699C22.0091 6.37833 22.1278 6.66498 22.1278 6.96387C22.1278 7.26275 22.0091 7.5494 21.7978 7.76074L21.7959 7.75887Z"
                    fill="url(#paint0_linear_3147_6028)"
                />
            </g>
            <defs>
                <linearGradient id="paint0_linear_3147_6028" x1="12.375" y1="5.83691" x2="12.375" y2="20.0898" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9DFFB3" />
                    <stop offset="1" stopColor="#1AA37A" />
                </linearGradient>
                <clipPath id="clip0_3147_6028">
                    <rect y="0.356445" width="24" height="24" rx="12" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
};

export default CheckIconLinear;