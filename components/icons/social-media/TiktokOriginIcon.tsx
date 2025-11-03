'use client';

import React from 'react';

interface TiktokOriginIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const TiktokOriginIcon: React.FC<TiktokOriginIconProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10 21.41C13.3137 21.41 16 18.7237 16 15.41V8.60734C16.8825 9.11785 17.9071 9.41003 19 9.41003H20V6.41003H19C17.3431 6.41003 16 5.06689 16 3.41003H13V15.41C13 17.0669 11.6569 18.41 10 18.41C8.34315 18.41 7 17.0669 7 15.41C7 13.7532 8.34315 12.41 10 12.41V9.41003C6.68629 9.41003 4 12.0963 4 15.41C4 18.7237 6.68629 21.41 10 21.41Z"
                fill={color}
            />
        </svg>
    );
};

export default TiktokOriginIcon;