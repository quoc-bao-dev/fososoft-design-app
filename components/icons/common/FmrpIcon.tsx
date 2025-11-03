"use client";

import React from "react";
import { motion } from "framer-motion";

interface FmrpIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const FmrpIcon: React.FC<FmrpIconProps> = ({
    size = 32,
    color = "currentColor",
    className = "",
}) => {
    return (
        <svg
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M40 0.6362H8C3.58172 0.6362 0 4.21792 0 8.6362V40.6362C0 45.0545 3.58172 48.6362 8 48.6362H40C44.4183 48.6362 48 45.0545 48 40.6362V8.6362C48 4.21792 44.4183 0.6362 40 0.6362Z" fill="url(#paint0_linear_2213_9852)" />
            <path d="M24.4439 9.00738L25.1967 9.76015C26.3258 10.8893 26.9458 12.3875 26.9458 13.9742C26.9458 15.5609 26.3332 17.0517 25.2188 18.1734L19.4993 23.893C19.2041 24.1882 19.0417 24.5793 19.0417 25C19.0417 25.4207 19.2041 25.8192 19.4993 26.1144L26.9827 33.5978C28.3627 34.9188 30.5472 34.8967 31.8978 33.5461L27.9126 37.5314L24.4365 41L14.5177 31.0812C12.7539 29.3173 11.8683 26.9705 12.0159 24.4686C12.1413 22.3727 13.0786 20.3653 14.6432 18.7934L24.4365 9L24.4439 9.00738Z" fill="url(#paint1_linear_2213_9852)" />
            <path d="M30.1266 14.6974L34.3627 18.9336C35.9863 20.5572 36.8793 22.7122 36.8793 25.0148C36.8793 27.31 35.9863 29.465 34.3627 31.0886L31.8978 33.5535C30.5472 34.9041 28.3553 34.9262 26.9827 33.6052L24.4439 31.0664L29.3959 26.1144C29.6911 25.8192 29.8535 25.4207 29.8535 25.0074C29.8535 24.5867 29.6911 24.1882 29.3959 23.893C28.252 22.7491 27.6321 21.2509 27.6321 19.6569C27.6321 18.0628 28.252 16.5646 29.3812 15.4428L30.1339 14.6901L30.1266 14.6974Z" fill="url(#paint2_linear_2213_9852)" />
            <path d="M24.4499 21.4747L27.3566 24.3814C27.701 24.7259 27.701 25.2895 27.3566 25.6339L24.4499 28.5406L21.5432 25.6339C21.1987 25.2895 21.1987 24.7259 21.5432 24.3814L24.4499 21.4747Z" fill="url(#paint3_linear_2213_9852)" />
            <defs>
                <linearGradient id="paint0_linear_2213_9852" x1="0" y1="0.6362" x2="30.0451" y2="58.0553" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0375F3" />
                    <stop offset="1" stopColor="#013DA0" />
                </linearGradient>
                <linearGradient id="paint1_linear_2213_9852" x1="32.3923" y1="32.9557" x2="10.4218" y2="10.9852" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F1F2F2" />
                    <stop offset="1" stopColor="#BCBEC0" />
                </linearGradient>
                <linearGradient id="paint2_linear_2213_9852" x1="31.2262" y1="25.3616" x2="28.1487" y2="33.6495" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F1F2F2" />
                    <stop offset="1" stopColor="#BCBEC0" />
                </linearGradient>
                <linearGradient id="paint3_linear_2213_9852" x1="22.9472" y1="28.0922" x2="29.5154" y2="14.5719" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F1F2F2" />
                    <stop offset="1" stopColor="#BCBEC0" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default FmrpIcon;
