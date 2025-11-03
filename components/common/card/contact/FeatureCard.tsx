import { FC } from "react";
import Link from "next/link";
import ButtonAnimation from "../../button/ButtonAnimation";
import { GoArrowUpRight } from "react-icons/go";
import ButtonAnimationNew from '@/components/common/button/ButtonAnimationNew';
import ArrowUpRightIcon from '../../../icons/common/ArrowUpRightIcon';

import { motion } from 'framer-motion'

import { useState } from 'react'

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
    linkText: string;
    className?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, link, linkText, className }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Link
            className={`${className} bg-white hover:bg-white/80 rounded-3xl p-6 flex flex-col items-start justify-between 3xl:gap-8 gap-6 transition-all duration-500 ease-in-out group`}
            style={{
                // boxShadow: "2px 2px 8px 2px rgba(119, 114, 147, 0.05), 2px 2px 8px 2px rgba(119, 114, 147, 0.05)"
                boxShadow: isHovered ? "0px 10px 30px rgba(0, 0, 0, 0.08), 0px 4px 20px rgba(0, 0, 0, 0.04)" : "2px 2px 8px 2px rgba(119, 114, 147, 0.05), 2px 2px 8px 2px rgba(119, 114, 147, 0.05)"
            }}
            href={link}
            onMouseEnter={() => setIsHovered(true)} // Khi hover vào button
            onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi button
            target="_blank"
        >
            <div className="space-y-6">
                {/* Icon */}
                <div className="2xl:size-16 size-14">
                    {icon}
                </div>

                <div className='space-y-2'>
                    {/* Title */}
                    <h3 className="text-title font-bold text-[#33404A] line-clamp-2">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-base-default text-[#33404A] font-medium line-clamp-4">
                        {description}
                    </p>
                </div>
            </div>


            {/* CTA Button */}
            <ButtonAnimationNew
                title={linkText}
                icon={
                    <div className="md:size-10 size-8 rounded-full flex items-center justify-center group-hover:bg-[#10805B] group-hover:text-white duration-500 transition-colors">
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            animate={isHovered ? { x: 1, y: -1 } : { x: 0, y: 0 }} // Bay chéo lên phải và xuống lại
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <ArrowUpRightIcon className="md:size-5 size-4" />
                        </motion.div>
                    </div>
                }
                onClick={() => console.log('Button Clicked!')}
                reverse={true}
                className="flex items-center gap-2 xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group text-[#10805B] group-hover:bg-[#A3EED6]/40 group-hover:!backdrop-blur-[100px] group-hover:!backdrop-filter group-hover:text-[#10805B] font-medium pl-6 pr-1 py-1 border border-[#10805B] rounded-[40px] lg:w-fit w-full"
                style={{
                    WebkitBackdropFilter: "blur(15px)", // Safari
                    boxShadow: "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)"
                }}
            />
        </Link>
    );
};

export default FeatureCard;
