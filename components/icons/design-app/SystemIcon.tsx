interface SystemIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const SystemIcon: React.FC<SystemIconProps> = ({ size = 32, color = 'currentColor', className = '' }) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M6.005 9.88954L7.42 8.47754L10.756 11.8135L16.591 5.97754L18.006 7.39254L10.756 14.6405L6.005 9.88954Z" fill={color} />
            <path d="M21 2.96973H3C2.47005 2.97131 1.96227 3.18253 1.58753 3.55726C1.2128 3.93199 1.00158 4.43978 1 4.96973L1.004 16.9737C1.00506 17.5028 1.21569 18.0098 1.58978 18.3839C1.96388 18.758 2.47095 18.9687 3 18.9697H10V20.9697L8.004 20.9737L8 22.9697H16L16.004 20.9737L14 20.9697V18.9697H21C21.5299 18.9681 22.0377 18.7569 22.4125 18.3822C22.7872 18.0075 22.9984 17.4997 23 16.9697V4.96973C22.9984 4.43978 22.7872 3.93199 22.4125 3.55726C22.0377 3.18253 21.5299 2.97131 21 2.96973ZM21 16.9697H3V4.96973H21V16.9697Z" fill={color} />
        </svg>
    );
};

export default SystemIcon;