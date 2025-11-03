import { memo } from "react";

import { motion } from 'framer-motion'
import HoverUnderlineEffect from '../../../icons/underline/HoverUnderlineEffect';

type WhyCardProps = {
    icon: React.ReactNode | any;
    title: string;
    description: string;
    linearImageColor?: string
    className?: string
};

const WhyCard = memo(({
    icon,
    title,
    description,
    linearImageColor = "linear-gradient(270deg, rgba(3, 117, 243, 0) 0%, #0375F3 32%, #0375F3 61.5%, rgba(3, 117, 243, 0) 100%)",
    className = ""
}: WhyCardProps) => (
    <motion.div
        initial={{ scale: 1 }}
        className={`${className} bg-white rounded-3xl shadow-sm p-6 hover:shadow-md h-full transition-all duration-200 border border-gray-100 group`}
        whileHover={{
            scale: 1.01,
            // boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.02)", // Shadow mạnh hơn khi hover
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
        <div className="flex flex-col items-start 3xl:gap-6 gap-4 relative z-50">
            <div className="3xl:size-16 xl:size-14 size-12 flex items-center justify-center bg-inherit">
                {icon}
            </div>
            <div className='space-y-2'>
                <h3 className="text-title text-[#33404A] font-extrabold">{title}</h3>
                <p className="text-base-default text-[#33404A] font-medium">{description}</p>
            </div>
        </div>

        <HoverUnderlineEffect
            className="-bottom-[1px]"
            blurImageColor={"/background/blur/blur-fmrp.svg"}
            linearImageColor={linearImageColor}
        />
    </motion.div>
));

export default WhyCard