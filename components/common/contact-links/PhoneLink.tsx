import React from 'react';

interface PhoneLinkProps {
    phoneNumber: string;
    className?: string;
    children?: React.ReactNode;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({
    phoneNumber,
    className,
    children
}) => {
    return (
        <a
            href={`tel:${phoneNumber}`}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Gọi tới số ${phoneNumber}`}
        >
            {children || phoneNumber}
        </a>
    );
};

export default PhoneLink;
