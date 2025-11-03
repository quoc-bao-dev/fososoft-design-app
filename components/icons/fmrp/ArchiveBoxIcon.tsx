"use client";

import React, { useEffect, useState } from "react";

interface ArchiveBoxIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const ArchiveBoxIcon: React.FC<ArchiveBoxIconProps> = ({
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
            {/* Nếu có gradient, tạo linearGradient */}
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
                d="M60.75 20.25V58.5C60.75 59.0967 60.5129 59.669 60.091 60.091C59.669 60.5129 59.0967 60.75 58.5 60.75H13.5C12.9033 60.75 12.331 60.5129 11.909 60.091C11.4871 59.669 11.25 59.0967 11.25 58.5V20.25H60.75Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
            <path
                d="M62.7638 19.2431L58.2638 10.2431C58.0767 9.86931 57.7892 9.555 57.4335 9.33542C57.0778 9.11585 56.668 8.9997 56.25 9H15.75C15.332 8.9997 14.9222 9.11585 14.5665 9.33542C14.2108 9.555 13.9233 9.86931 13.7362 10.2431L9.23625 19.2431C9.08116 19.5561 9.00032 19.9007 9 20.25V58.5C9 59.6935 9.47411 60.8381 10.318 61.682C11.1619 62.5259 12.3065 63 13.5 63H58.5C59.6935 63 60.8381 62.5259 61.682 61.682C62.5259 60.8381 63 59.6935 63 58.5V20.25C62.9997 19.9007 62.9188 19.5561 62.7638 19.2431ZM17.1394 13.5H54.8606L57.1106 18H14.8894L17.1394 13.5ZM58.5 58.5H13.5V22.5H58.5V58.5ZM46.5919 41.1581C46.8011 41.3671 46.967 41.6152 47.0803 41.8884C47.1935 42.1615 47.2518 42.4543 47.2518 42.75C47.2518 43.0457 47.1935 43.3385 47.0803 43.6116C46.967 43.8848 46.8011 44.1329 46.5919 44.3419L37.5919 53.3419C37.3829 53.5511 37.1348 53.717 36.8616 53.8303C36.5885 53.9435 36.2957 54.0018 36 54.0018C35.7043 54.0018 35.4115 53.9435 35.1384 53.8303C34.8652 53.717 34.6171 53.5511 34.4081 53.3419L25.4081 44.3419C24.9859 43.9197 24.7487 43.3471 24.7487 42.75C24.7487 42.1529 24.9859 41.5803 25.4081 41.1581C25.8303 40.7359 26.4029 40.4987 27 40.4987C27.5971 40.4987 28.1697 40.7359 28.5919 41.1581L33.75 46.3191V29.25C33.75 28.6533 33.9871 28.081 34.409 27.659C34.831 27.2371 35.4033 27 36 27C36.5967 27 37.169 27.2371 37.591 27.659C38.0129 28.081 38.25 28.6533 38.25 29.25V46.3191L43.4081 41.1581C43.6171 40.9489 43.8652 40.783 44.1384 40.6697C44.4115 40.5565 44.7043 40.4982 45 40.4982C45.2957 40.4982 45.5885 40.5565 45.8616 40.6697C46.1348 40.783 46.3829 40.9489 46.5919 41.1581Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>
    );
};

export default ArchiveBoxIcon;
