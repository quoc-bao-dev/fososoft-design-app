"use client";

import React, { useEffect, useState } from "react";

interface FactoryIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const FactoryIcon: React.FC<FactoryIconProps> = ({
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
            viewBox="0 0 73 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={size}
            height={size}
        >
            {
                useGradient && (
                    <defs>
                        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            {
                                gradientStops.map((color, index) => (
                                    <stop
                                        key={index}
                                        offset={`${(index / (gradientStops.length - 1)) * 100}%`}
                                        stopColor={color}
                                    />
                                ))
                            }
                        </linearGradient>
                    </defs>
                )
            }
            <path
                opacity="0.2"
                d="M61.25 38.25V60.75H11.75V24.75L29.75 38.25V24.75L47.75 38.25H61.25Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
            <path
                d="M33.125 49.5C33.125 50.0967 32.8879 50.669 32.466 51.091C32.044 51.5129 31.4717 51.75 30.875 51.75H23C22.4033 51.75 21.831 51.5129 21.409 51.091C20.9871 50.669 20.75 50.0967 20.75 49.5C20.75 48.9033 20.9871 48.331 21.409 47.909C21.831 47.4871 22.4033 47.25 23 47.25H30.875C31.4717 47.25 32.044 47.4871 32.466 47.909C32.8879 48.331 33.125 48.9033 33.125 49.5ZM50 47.25H42.125C41.5283 47.25 40.956 47.4871 40.534 47.909C40.1121 48.331 39.875 48.9033 39.875 49.5C39.875 50.0967 40.1121 50.669 40.534 51.091C40.956 51.5129 41.5283 51.75 42.125 51.75H50C50.5967 51.75 51.169 51.5129 51.591 51.091C52.0129 50.669 52.25 50.0967 52.25 49.5C52.25 48.9033 52.0129 48.331 51.591 47.909C51.169 47.4871 50.5967 47.25 50 47.25ZM70.25 60.75C70.25 61.3467 70.0129 61.919 69.591 62.341C69.169 62.7629 68.5967 63 68 63H5C4.40326 63 3.83097 62.7629 3.40901 62.341C2.98705 61.919 2.75 61.3467 2.75 60.75C2.75 60.1533 2.98705 59.581 3.40901 59.159C3.83097 58.7371 4.40326 58.5 5 58.5H9.5V24.75C9.5 24.3321 9.61636 23.9226 9.83604 23.5671C10.0557 23.2117 10.37 22.9244 10.7438 22.7375C11.1175 22.5507 11.5359 22.4716 11.9521 22.5091C12.3682 22.5466 12.7657 22.6993 13.1 22.95L27.5 33.75V24.75C27.5 24.3321 27.6164 23.9226 27.836 23.5671C28.0557 23.2117 28.37 22.9244 28.7438 22.7375C29.1175 22.5507 29.5359 22.4716 29.9521 22.5091C30.3682 22.5466 30.7657 22.6993 31.1 22.95L41.9956 31.1203L45.2469 8.36437C45.4043 7.29381 45.9404 6.31518 46.7578 5.60614C47.5752 4.89709 48.6198 4.50463 49.7019 4.5H54.7981C55.8802 4.50463 56.9248 4.89709 57.7422 5.60614C58.5596 6.31518 59.0957 7.29381 59.2531 8.36437L63.4719 37.9322C63.4719 37.9322 63.4944 38.1516 63.4944 38.25V58.5H67.9944C68.2903 58.4993 68.5835 58.5569 68.8571 58.6697C69.1308 58.7824 69.3795 58.948 69.589 59.157C69.7985 59.366 69.9648 59.6143 70.0782 59.8877C70.1916 60.161 70.25 60.4541 70.25 60.75ZM46.1019 34.2L48.5009 36H58.6569L54.7981 9H49.7019L46.1019 34.2ZM14 58.5H59V40.5H47.75C47.2632 40.5 46.7895 40.3421 46.4 40.05L42.35 37.0125L32 29.25V38.25C32 38.6679 31.8836 39.0774 31.664 39.4329C31.4443 39.7883 31.13 40.0756 30.7562 40.2625C30.3825 40.4493 29.9641 40.5284 29.5479 40.4909C29.1318 40.4534 28.7343 40.3007 28.4 40.05L14 29.25V58.5Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>

    );
};

export default FactoryIcon;
