import React from 'react';

interface EmailLinkProps {
    email: string;
    children?: React.ReactNode;
    className?: string;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email, children, className }) => {
    return (
        <a
            href={`mailto:${email}`}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Gửi email đến ${email}`}
        >
            {children || email}
        </a>
    );
};

export default EmailLink;
