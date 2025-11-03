'use client';

import React from 'react';

interface EnvelopeSimpleIconLinearProps {
    size?: number;
    color?: string;
    className?: string;
}

const EnvelopeSimpleIconLinear: React.FC<EnvelopeSimpleIconLinearProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path opacity="0.2" d="M21 5.66003L12 13.91L3 5.66003H21Z" fill="url(#paint0_linear_1865_247)" />
            <path d="M21 4.91003H3C2.80109 4.91003 2.61032 4.98905 2.46967 5.1297C2.32902 5.27036 2.25 5.46112 2.25 5.66003V18.41C2.25 18.8079 2.40804 19.1894 2.68934 19.4707C2.97064 19.752 3.35218 19.91 3.75 19.91H20.25C20.6478 19.91 21.0294 19.752 21.3107 19.4707C21.592 19.1894 21.75 18.8079 21.75 18.41V5.66003C21.75 5.46112 21.671 5.27036 21.5303 5.1297C21.3897 4.98905 21.1989 4.91003 21 4.91003ZM19.0716 6.41003L12 12.8928L4.92844 6.41003H19.0716ZM20.25 18.41H3.75V7.36535L11.4928 14.4632C11.6312 14.5902 11.8122 14.6607 12 14.6607C12.1878 14.6607 12.3688 14.5902 12.5072 14.4632L20.25 7.36535V18.41Z" fill="url(#paint1_linear_1865_247)" />
            <defs>
                <linearGradient id="paint0_linear_1865_247" x1="12" y1="5.66003" x2="12" y2="13.91" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9DFFB3" />
                    <stop offset="1" stopColor="#1AA37A" />
                </linearGradient>
                <linearGradient id="paint1_linear_1865_247" x1="12" y1="4.91003" x2="12" y2="19.91" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9DFFB3" />
                    <stop offset="1" stopColor="#1AA37A" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default EnvelopeSimpleIconLinear;