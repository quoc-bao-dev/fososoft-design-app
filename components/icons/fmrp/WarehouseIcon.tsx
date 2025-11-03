"use client";

import React, { useEffect, useState } from "react";

interface WarehouseIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const WarehouseIcon: React.FC<WarehouseIconProps> = ({
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
                d="M52.25 36V54H20.75V36H52.25Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
            <path
                d="M68 51.7499H65.75V16.2842L68.4697 15.6992C68.7649 15.6439 69.046 15.53 69.2964 15.3643C69.5469 15.1986 69.7617 14.9844 69.9281 14.7344C70.0944 14.4843 70.2091 14.2035 70.2653 13.9085C70.3214 13.6135 70.3179 13.3102 70.255 13.0165C70.1921 12.7229 70.0711 12.4448 69.899 12.1986C69.7269 11.9525 69.5073 11.7433 69.2531 11.5834C68.9989 11.4234 68.7153 11.316 68.4189 11.2674C68.1226 11.2188 67.8195 11.2301 67.5275 11.3005L4.5275 24.8005C3.98476 24.9176 3.50448 25.2313 3.17906 25.6811C2.85364 26.131 2.70605 26.6853 2.76468 27.2375C2.82331 27.7896 3.08403 28.3006 3.49668 28.672C3.90933 29.0435 4.44476 29.2493 5 29.2499C5.15977 29.2496 5.31907 29.2326 5.47531 29.1992L7.25 28.8195V51.7499H5C4.40326 51.7499 3.83097 51.9869 3.40901 52.4089C2.98705 52.8308 2.75 53.4031 2.75 53.9999C2.75 54.5966 2.98705 55.1689 3.40901 55.5909C3.83097 56.0128 4.40326 56.2499 5 56.2499H68C68.5967 56.2499 69.169 56.0128 69.591 55.5909C70.0129 55.1689 70.25 54.5966 70.25 53.9999C70.25 53.4031 70.0129 52.8308 69.591 52.4089C69.169 51.9869 68.5967 51.7499 68 51.7499ZM11.75 27.8436L61.25 17.2489V51.7499H54.5V35.9999C54.5 35.4031 54.2629 34.8308 53.841 34.4089C53.419 33.9869 52.8467 33.7499 52.25 33.7499H20.75C20.1533 33.7499 19.581 33.9869 19.159 34.4089C18.7371 34.8308 18.5 35.4031 18.5 35.9999V51.7499H11.75V27.8436ZM50 42.7499H23V38.2499H50V42.7499ZM23 47.2499H50V51.7499H23V47.2499Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>

    );
};

export default WarehouseIcon;
