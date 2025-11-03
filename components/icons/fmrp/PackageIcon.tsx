"use client";

import React, { useEffect, useState } from "react";

interface PackageIconProps {
    size?: number;
    color?: string; // Màu đơn
    style?: React.CSSProperties | any; // Nhận background linear-gradient từ style
    className?: string;
    isActive?: boolean; // Trạng thái active
}

const PackageIcon: React.FC<PackageIconProps> = ({
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
                d="M36.5 36.3067V65.2502C36.1221 65.2486 35.7507 65.1519 35.42 64.9689L10.67 51.4183C10.3166 51.2249 10.0216 50.9402 9.81578 50.5939C9.60997 50.2476 9.50091 49.8524 9.5 49.4495V22.5508C9.50089 22.2357 9.56797 21.9243 9.69688 21.6367L36.5 36.3067Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
            <path
                d="M63.41 18.6046L38.66 5.06243C37.9987 4.69703 37.2555 4.50537 36.5 4.50537C35.7445 4.50537 35.0013 4.69703 34.34 5.06243L9.59 18.6102C8.88319 18.997 8.29317 19.5664 7.88155 20.259C7.46994 20.9516 7.25183 21.742 7.25 22.5477V49.4465C7.25183 50.2522 7.46994 51.0426 7.88155 51.7352C8.29317 52.4278 8.88319 52.9973 9.59 53.384L34.34 66.9318C35.0013 67.2972 35.7445 67.4889 36.5 67.4889C37.2555 67.4889 37.9987 67.2972 38.66 66.9318L63.41 53.384C64.1168 52.9973 64.7068 52.4278 65.1185 51.7352C65.5301 51.0426 65.7482 50.2522 65.75 49.4465V22.5506C65.7497 21.7434 65.5323 20.9512 65.1206 20.257C64.7089 19.5628 64.1181 18.992 63.41 18.6046ZM36.5 8.99993L59.0956 21.3749L50.7228 25.9593L28.1244 13.5843L36.5 8.99993ZM36.5 33.7499L13.9044 21.3749L23.4387 16.1549L46.0344 28.5299L36.5 33.7499ZM11.75 25.3124L34.25 37.6255V61.754L11.75 49.4493V25.3124ZM61.25 49.438L38.75 61.754V37.6368L47.75 32.7121V42.7499C47.75 43.3467 47.9871 43.919 48.409 44.3409C48.831 44.7629 49.4033 44.9999 50 44.9999C50.5967 44.9999 51.169 44.7629 51.591 44.3409C52.0129 43.919 52.25 43.3467 52.25 42.7499V30.2484L61.25 25.3124V49.4352V49.438Z"
                fill={useGradient ? "url(#customGradient)" : color}
            />
        </svg>
    );
};

export default PackageIcon;
