interface IPIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const IPIcon: React.FC<IPIconProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4.47949 17.9166C6.22458 17.1884 8.09649 16.8127 9.98741 16.8112C11.8863 16.804 13.7674 17.1764 15.5203 17.9066M9.99741 15.4862C9.99741 15.4862 14.5141 10.6166 14.5141 6.5995C14.5137 4.10534 12.4916 2.08325 9.99699 2.08325C7.50241 2.08325 5.48116 4.10534 5.48116 6.5995C5.48116 10.6166 9.99783 15.4862 9.99783 15.4862M8.61366 5.02575V9.21033" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.71631 9.21046V5.02588H11.0859C11.8609 5.02588 12.4884 5.65505 12.4884 6.4313C12.4884 7.20755 11.8605 7.83671 11.0859 7.83671H9.71673" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default IPIcon;