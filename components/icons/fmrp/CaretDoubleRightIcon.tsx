"use client";

import React, { useEffect, useState } from "react";

interface CaretDoubleRightIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const CaretDoubleRightIcon: React.FC<CaretDoubleRightIconProps> = ({
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

    console.log('useGradient', useGradient);


    return (
        <svg
            viewBox="0 0 36 36"
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
                d="M19.921 18.7961L8.67095 30.0461C8.45986 30.2572 8.17355 30.3758 7.87502 30.3758C7.57648 30.3758 7.29017 30.2572 7.07908 30.0461C6.86798 29.835 6.74939 29.5487 6.74939 29.2501C6.74939 28.9516 6.86798 28.6653 7.07908 28.4542L17.5345 18.0001L7.07908 7.54607C6.86798 7.33498 6.74939 7.04867 6.74939 6.75014C6.74939 6.4516 6.86798 6.1653 7.07908 5.9542C7.29017 5.7431 7.57648 5.62451 7.87502 5.62451C8.17355 5.62451 8.45986 5.7431 8.67095 5.9542L19.921 17.2042C20.0256 17.3087 20.1085 17.4328 20.1651 17.5693C20.2218 17.7059 20.2509 17.8523 20.2509 18.0001C20.2509 18.148 20.2218 18.2944 20.1651 18.4309C20.1085 18.5675 20.0256 18.6916 19.921 18.7961ZM31.171 17.2042L19.921 5.9542C19.7099 5.7431 19.4235 5.62451 19.125 5.62451C18.8265 5.62451 18.5402 5.7431 18.3291 5.9542C18.118 6.1653 17.9994 6.4516 17.9994 6.75014C17.9994 7.04867 18.118 7.33498 18.3291 7.54607L28.7845 18.0001L18.3291 28.4542C18.118 28.6653 17.9994 28.9516 17.9994 29.2501C17.9994 29.5487 18.118 29.835 18.3291 30.0461C18.5402 30.2572 18.8265 30.3758 19.125 30.3758C19.4235 30.3758 19.7099 30.2572 19.921 30.0461L31.171 18.7961C31.2756 18.6916 31.3585 18.5675 31.4151 18.4309C31.4718 18.2944 31.5009 18.148 31.5009 18.0001C31.5009 17.8523 31.4718 17.7059 31.4151 17.5693C31.3585 17.4328 31.2756 17.3087 31.171 17.2042Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>
    );
};

export default CaretDoubleRightIcon;
