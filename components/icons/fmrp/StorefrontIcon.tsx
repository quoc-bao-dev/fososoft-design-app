"use client";

import React, { useEffect, useState } from "react";

interface StorefrontIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const StorefrontIcon: React.FC<StorefrontIconProps> = ({
    size = 32,
    color = "currentColor",
    style = {},
    className = "",
    isActive = false, // Nhận từ prop để kiểm soát trạng thái
}) => {
    const [gradientStops, setGradientStops] = useState<string[]>([]);

    useEffect(() => {
        if (isActive && style.background && style.background.includes("linear-gradient")) {
            // Chỉ lấy màu gradient khi active
            const colorMatches = style.background.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g);
            if (colorMatches) {
                setGradientStops(colorMatches);
            }
        } else {
            // Khi mất active, reset gradient
            setGradientStops([]);
        }
    }, [isActive, style.background]);

    const useGradient = isActive && gradientStops.length > 1; // Chỉ dùng gradient nếu active

    return (
        <svg
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ ...style }}
            width={size}
            height={size}
        >
            {
                useGradient && (
                    <defs>
                        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            {gradientStops.map((color, index) => (
                                <stop
                                    key={index}
                                    offset={`${(index / (gradientStops.length - 1)) * 100}%`}
                                    stopColor={color}
                                />
                            ))}
                        </linearGradient>
                    </defs>
                )
            }

            <path
                opacity="0.2"
                d="M63 27V31.5C63 33.8869 62.0518 36.1761 60.364 37.864C58.6761 39.5518 56.3869 40.5 54 40.5C51.6131 40.5 49.3239 39.5518 47.636 37.864C45.9482 36.1761 45 33.8869 45 31.5V27H27V31.5C27 33.8869 26.0518 36.1761 24.364 37.864C22.6761 39.5518 20.3869 40.5 18 40.5C15.6131 40.5 13.3239 39.5518 11.636 37.864C9.94821 36.1761 9 33.8869 9 31.5V27L13.0331 12.8812C13.1671 12.4127 13.4496 12.0004 13.8382 11.7062C14.2267 11.412 14.7002 11.2519 15.1875 11.25H56.8125C57.3013 11.2501 57.7767 11.4093 58.1669 11.7037C58.5571 11.998 58.8409 12.4113 58.9753 12.8812L63 27Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
            <path
                d="M65.25 27C65.2512 26.7908 65.2228 26.5825 65.1656 26.3813L61.1297 12.2625C60.8584 11.3257 60.2914 10.5018 59.5133 9.91376C58.7352 9.32575 57.7878 9.00521 56.8125 9H15.1875C14.2122 9.00521 13.2648 9.32575 12.4867 9.91376C11.7086 10.5018 11.1416 11.3257 10.8703 12.2625L6.83719 26.3813C6.77909 26.5824 6.74973 26.7907 6.75 27V31.5C6.75 33.2465 7.15663 34.969 7.9377 36.5312C8.71876 38.0933 9.8528 39.4521 11.25 40.5V58.5C11.25 59.6935 11.7241 60.8381 12.568 61.682C13.4119 62.5259 14.5565 63 15.75 63H56.25C57.4435 63 58.5881 62.5259 59.432 61.682C60.2759 60.8381 60.75 59.6935 60.75 58.5V40.5C62.1472 39.4521 63.2812 38.0933 64.0623 36.5312C64.8434 34.969 65.25 33.2465 65.25 31.5V27ZM15.1875 13.5H56.8125L60.0244 24.75H11.9841L15.1875 13.5ZM29.25 29.25H42.75V31.5C42.75 33.2902 42.0388 35.0071 40.773 36.273C39.5071 37.5388 37.7902 38.25 36 38.25C34.2098 38.25 32.4929 37.5388 31.227 36.273C29.9612 35.0071 29.25 33.2902 29.25 31.5V29.25ZM24.75 29.25V31.5C24.75 33.2902 24.0388 35.0071 22.773 36.273C21.5071 37.5388 19.7902 38.25 18 38.25C16.2098 38.25 14.4929 37.5388 13.227 36.273C11.9612 35.0071 11.25 33.2902 11.25 31.5V29.25H24.75ZM56.25 58.5H15.75V42.525C16.4907 42.6743 17.2444 42.7497 18 42.75C19.7465 42.75 21.469 42.3434 23.0312 41.5623C24.5933 40.7812 25.9521 39.6472 27 38.25C28.0479 39.6472 29.4067 40.7812 30.9688 41.5623C32.531 42.3434 34.2535 42.75 36 42.75C37.7465 42.75 39.469 42.3434 41.0312 41.5623C42.5933 40.7812 43.9521 39.6472 45 38.25C46.0479 39.6472 47.4067 40.7812 48.9688 41.5623C50.531 42.3434 52.2535 42.75 54 42.75C54.7556 42.7497 55.5093 42.6743 56.25 42.525V58.5ZM54 38.25C52.2098 38.25 50.4929 37.5388 49.227 36.273C47.9612 35.0071 47.25 33.2902 47.25 31.5V29.25H60.75V31.5C60.75 33.2902 60.0388 35.0071 58.773 36.273C57.5071 37.5388 55.7902 38.25 54 38.25Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>
    );
};

export default StorefrontIcon;
