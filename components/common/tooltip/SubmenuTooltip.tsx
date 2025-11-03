import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CaretRightIcon from "@/components/icons/common/CaretRightIcon";
import Image from 'next/image';
import { variantButtonBasic, variantButtonPressZoom } from '@/utils/animations/variantsAnimation';
import { ISubMenuItem } from "@/types/ui/menu/IMenuUI";
import ButtonAnimationNew from "../button/ButtonAnimationNew";

interface SubmenuTooltipProps {
    subMenu: any;
}

const SubmenuTooltip = memo(({ subMenu }: SubmenuTooltipProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const hoveredRef = useRef<string | null>(null);

    // Hàm xử lý hover, chỉ cập nhật state nếu giá trị thay đổi
    const handleMouseEnter = useCallback((id: string) => {
        if (hoveredRef.current !== id) {
            hoveredRef.current = id;
            setHoveredItem(id);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (hoveredRef.current !== null) {
            hoveredRef.current = null;
            setHoveredItem(null);
        }
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 w-full min-w-fit">
            {/* <div className="grid grid-cols-1 gap-4 w-full 2xl:min-w-[880px] xl:min-w-[780px] min-w-[680px]"> */}
            {
                Object.keys(subMenu.content).map((category, index) => (
                    <div key={category} className={`${Object.keys(subMenu.content)?.length - 1 !== index ? "border-[#F1F5F7]" : "border-transparent"} col-span-1 space-y-3 pb-2 border-b`}>
                        <h3 className="2xl:text-base text-sm font-normal text-[#667F93]">{category}</h3>

                        <div className="space-y-3">
                            {
                                subMenu.content[category].items.map((item: ISubMenuItem) => (
                                    <motion.div key={`submenu-${item.id}`} whileTap={"press"} variants={variantButtonPressZoom} transition={{ duration: 0.2, ease: "easeOut" }}>
                                        <Link
                                            href={item.link}
                                            className="flex items-center 2xl:gap-3 gap-2.5 hover:bg-[#E8FBF5]/80 p-2 rounded-3xl relative custom-transition"
                                            onMouseEnter={() => handleMouseEnter(item.id)}
                                            onMouseLeave={handleMouseLeave}
                                            target={item.typeLink === "new_tab" ? "_blank" : "_self"}
                                        >
                                            {/* Icon */}
                                            <div className="2xl:size-12 size-11 flex items-center justify-center">
                                                <ButtonAnimationNew
                                                    key={item.id}
                                                    icon={
                                                        <div className={`${item.typeIcon === "default" ? "2xl:size-8 size-7" : "size-full"}`}>
                                                            {
                                                                typeof item.icon === "string" ? (
                                                                    <Image
                                                                        src={item.icon}
                                                                        alt="icon"
                                                                        width={200}
                                                                        height={200}
                                                                        className='size-full object-contain'
                                                                    />
                                                                ) :
                                                                    (
                                                                        <React.Fragment>
                                                                            {item.icon}
                                                                        </React.Fragment>
                                                                    )
                                                            }
                                                        </div>
                                                    }
                                                    hideTitle={true}
                                                    className='flex size-12 items-center justify-center rounded-xl border border-[#15AA7A] text-[#15AA7A] hover:bg-[#15AA7A]/20 backdrop-blur-lg transition-colors'
                                                    // onClick={() => handleShare(item.id)}
                                                    variant={variantButtonBasic}
                                                />
                                            </div>

                                            {/* Nội dung */}
                                            <div className="2xl:space-y-1.5 space-y-1 pr-8">
                                                <h4 className="2xl:text-lg text-base text-[#33404A] font-bold">{item.name}</h4>
                                                <p className="text-sm text-[#667F93] font-normal text-wrap">{item.description}</p>
                                            </div>

                                            {/* Mũi tên hiển thị khi hover */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{
                                                    opacity: hoveredItem === item.id ? 1 : 0,
                                                    x: hoveredItem === item.id ? 0 : -10,
                                                }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute right-3"
                                            >
                                                <CaretRightIcon className="2xl:size-6 size-5" color="#33404A" />
                                            </motion.div>
                                        </Link>
                                    </motion.div>

                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
});

export default SubmenuTooltip;
