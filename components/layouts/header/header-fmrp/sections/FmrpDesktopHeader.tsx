import HoverEffect from '@/components/common/animations/hover-button/HoverEffectButton'
import ButtonAnimation from '@/components/common/button/ButtonAnimation'
import { ActionTooltip } from '@/components/common/tooltip/ActionTooltip'
import SubmenuTooltip from '@/components/common/tooltip/SubmenuTooltip'
import { useRegisterButtonDelayCleanup } from '@/hooks/custom/useRegisterButtonVisibility'
import { IMenuHeader } from '@/types/ui/menu/IMenuUI'
import { variantButtonScaleZoom } from '@/utils/animations/variantsAnimation'
import { scrollToTop } from '@/utils/scroll/scrollUtils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface DesktopHeaderClientProps {
    dataHeader: IMenuHeader[]
    handleToggleMenu: (action: string) => void
    handleChangeLanguage: (value: string) => void
    handleOpenDialog: (value: string, type_device: string) => void
    handleValueChange: (e?: any) => void
}

const FmrpDesktopHeader = ({ dataHeader, handleToggleMenu, handleChangeLanguage, handleOpenDialog, handleValueChange }: DesktopHeaderClientProps) => {
    const pathname = usePathname();
    
    // Sử dụng hook để reset trạng thái khi unmount
    useRegisterButtonDelayCleanup();

    return (
        <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <motion.div
                initial={false}
                animate="rest"
                whileTap="press"
                variants={variantButtonScaleZoom}
                className="aspect-2.4/1 3xl:w-[134px] xl:w-[110px] w-[86px] h-auto cursor-pointer"
                onClick={() => { scrollToTop() }}
            >
                <Image
                    alt="logo"
                    src="/logo/fmrp/logo-fmrp.svg"
                    width={200}
                    height={100}
                    priority
                    className="size-full object-contain aspect-2.4/1"
                />
            </motion.div>

            {/* Menu Navigation */}
            <div className="flex-grow max-w-[65%] flex items-center justify-center 2xl:gap-4 xl:gap-2 lg:gap-1">
                {
                    dataHeader.map((item) => (
                        <React.Fragment key={item.id}>
                            {
                                item.subMenu ?
                                    (
                                        <ActionTooltip
                                            side="bottom"
                                            align="center"
                                            classNameContent="bg-white rounded-3xl xl:p-6 p-4"
                                            classNameArrow="fill-white custom-arrow"
                                            label={
                                                <SubmenuTooltip
                                                    subMenu={item.subMenu}
                                                />
                                            }
                                            styleContent={{
                                                boxShadow: "0px 1px 1px 2px #1018280D",
                                            }}
                                        >
                                            <div
                                                className={`${pathname.includes(item.link)
                                                    ? "text-[#25272A] font-bold"
                                                    : "text-[#25272A] hover:text-[#0F4F9E] font-medium hover:font-bold"
                                                    } flex items-center text-sm-default gap-2 px-2 cursor-pointer custom-transition relative`}
                                            >
                                                <span className='relative'>
                                                    <HoverEffect
                                                        title={item.name}
                                                        hoverTitle={item.name}
                                                        reverse={false}
                                                        className={`${pathname.includes(item.link)
                                                            ? "text-[#25272A] font-bold"
                                                            : "text-[#25272A] hover:text-[#0F4F9E] font-medium hover:font-bold"
                                                            }  text-sm-default !tracking-[1%] px-2 py-1 cursor-pointer custom-transition capitalize relative text-nowrap
                                                    w-fit flex flex-col overflow-hidden
                                                    `}
                                                    />
                                                    {
                                                        (pathname.includes(item.link) && item.link !== "/") &&
                                                        <div className='absolute -bottom-2.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#0375F3] z-[999]' />
                                                    }
                                                </span>
                                                <IoIosArrowDown className="size-4" />

                                            </div>
                                        </ActionTooltip>
                                    )
                                    :
                                    (
                                        <Link
                                            href={item.link}
                                            className='inline-flex relative'
                                            target={item.typeLink === "new_tab" ? '_blank' : '_self'}
                                        >
                                            <HoverEffect
                                                title={item.name}
                                                hoverTitle={item.name}
                                                reverse={false}
                                                className={`${pathname.includes(item.link)
                                                    ? "text-[#25272A] font-bold"
                                                    : "text-[#25272A] hover:text-[#0F4F9E] font-medium hover:font-bold"
                                                    }  text-sm-default !tracking-[1%] px-2 py-1 cursor-pointer custom-transition capitalize relative text-nowrap
                                                    w-fit flex flex-col overflow-hidden
                                                    `}
                                            />

                                            {
                                                (pathname.includes(item.link) && item.link !== "/") &&
                                                <div className='absolute -bottom-2.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#0375F3] z-[999]' />
                                            }
                                        </Link>
                                    )
                            }
                        </React.Fragment>
                    ))
                }
            </div>

            {/* Nút chuyển ngôn ngữ + CTA */}
            <div className="flex items-center justify-end gap-2 max-w-[30%]">
                <ButtonAnimation
                    reverse={true}
                    title="Đăng Nhập"
                    onClick={() => {
                        window.open("https://hub.fmrp.vn/auth/login")
                    }}
                    className='border-gradient-login flex items-center gap-2 text-sm text-[#25272A] font-medium capitalize border-none w-fit rounded-full px-3 py-2.5 transition-colors duration-300 ease-in-out'
                    style={{
                        background: "linear-gradient(360deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 100%)"
                    }}
                    whileHover={{
                        background: [
                            "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 80%)",
                            "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(0deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 80%)",
                            "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 80%)"
                        ],
                        transition: {
                            duration: 1.5,
                            ease: [0.4, 0, 0.6, 1],
                            repeat: Infinity
                        },
                        boxShadow: [
                            "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.15)",
                            "inset -3px -3px 6px rgba(255,255,255,0.7), inset 3px 3px 6px rgba(0,0,0,0.35)",
                            "inset -3px -3px 7px rgba(255,255,255,0.7), inset 3px 3px 7px rgba(0,0,0,0.4)",
                            "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.3)"
                        ],
                    }}
                />

                {/* {shouldShowRegisterButton && ( */}
                    <ButtonAnimation
                        icon={
                            <div className='xl:size-6 size-5 flex-shrink-0 flex items-center justify-center bg-[#000000] rounded-full'>
                                <Image
                                    width={100}
                                    height={100}
                                    alt='icon'
                                    src={"/icons/common/arrow/ArrowUpRight.svg"}
                                    className='size-4 object-contain'
                                />
                            </div>
                        }
                        reverse={true}
                        title="Đăng ký"
                        onClick={() => {
                            window.open("https://hub.fmrp.vn/auth/register")
                        }}
                        className='border-gradient-button-fmrp flex items-center gap-2 text-sm text-white font-semibold capitalize border-none w-fit rounded-full px-4 py-2 transition-colors duration-300 ease-in-out'
                        style={{
                            background: "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(118.21deg, #0375F3 10.03%, #013DA0 107.74%)"
                        }}
                        whileHover={{
                            background: [
                                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)",
                                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)",
                                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)"
                            ],
                            transition: {
                                duration: 1.5,
                                ease: [0.4, 0, 0.6, 1],
                                repeat: Infinity
                            },
                            boxShadow: [
                                "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.15)",
                                "inset -3px -3px 6px rgba(255,255,255,0.7), inset 3px 3px 6px rgba(0,0,0,0.35)",
                                "inset -3px -3px 7px rgba(255,255,255,0.7), inset 3px 3px 7px rgba(0,0,0,0.4)",
                                "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.3)"
                            ],
                        }}
                    />
                {/* )} */}
            </div>
        </div>
    )
}

export default FmrpDesktopHeader



