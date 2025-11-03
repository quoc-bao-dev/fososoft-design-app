'use client'

import { useTranslate } from '@/contexts/TranslateContext'
import { useStateClientLayout } from '@/managers/state/client/useStateClientLayout'
import { useAuthStore } from '@/stores/useAuthStores'
import useCookieStore from '@/stores/useCookieStore'
import { useResizeStore } from '@/stores/useResizeStore'
import { IMenuHeader } from '@/types/ui/menu/IMenuUI'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi"
import { IoCloseSharp } from "react-icons/io5"
import { TbMenu3 } from "react-icons/tb"

interface TabletHeaderProps {
    dataHeader: IMenuHeader[]
    handleToggleMenu: (action: string) => void
    handleChangeLanguage: (value: string) => void
    handleOpenDialog: (value: string, type_device: string) => void
}

const FosoTabletHeader: React.FC<TabletHeaderProps> = ({
    dataHeader,
    handleToggleMenu,
}: TabletHeaderProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null); // Tham chiếu đến div cần kiểm tra
    const { dataLang } = useTranslate()
    const router = useRouter()

    const pathname = usePathname()

    const { getCookie } = useCookieStore()
    const { isVisibleTablet } = useResizeStore()
    const { informationUser } = useAuthStore()

    const { isStateClientLayout, queryKeyIsStateClientLayout } = useStateClientLayout()

    const handleToggleSubMenu = (id: string) => {
        let active = isStateClientLayout?.header?.isActiveSubMenuFoso === id ? null : id

        queryKeyIsStateClientLayout({
            header: {
                ...isStateClientLayout?.header,
                isActiveSubMenuFoso: active
            }
        })
    };

    return (
        <React.Fragment>
            <div className='grid grid-cols-16 items-center justify-center'>
                <div className='col-span-12 w-full flex items-center justify-start gap-2'>
                    <Link
                        href="/"
                        className='flex items-center justify-start w-auto h-[55px] shrink-0 py-4'
                        prefetch={false}
                        onClick={() => handleToggleMenu("off")}
                    >
                        <Image
                            width={800}
                            height={800}
                            alt="logo"
                            src="/logo/foso/logo-final.png"
                            className="w-auto h-[55px] object-contain cursor-pointer shrink-0"
                            priority
                        />
                    </Link>
                </div>

                <div className="col-span-4 flex items-center justify-end gap-1">
                    <motion.div
                        initial={false}
                        animate="rest"
                        whileTap="press"
                        variants={{
                            rest: { scale: 1 },
                            press: { scale: 1.03, transition: { duration: 0.2 } },
                        }}
                        className="flex items-center justify-center bg-transparent p-3 rounded-[6px] cursor-pointer border-gradient-gray"
                        onClick={() => handleToggleMenu('on')}
                        style={{
                            background: "linear-gradient(360deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 100%)",
                            "--border-radius": "6px",
                            "--border-width": "1.5px",
                            "--border-color": " rgba(9, 9, 11, 0.2) 0%, rgba(9, 9, 11, 0.05) 16%, rgba(9, 9, 11, 0.05) 86%, rgba(9, 9, 11, 0) 100%"
                        } as React.CSSProperties}
                    >
                        <TbMenu3 className='size-5 scale-110 text-[#28303F]' />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {
                    isStateClientLayout?.header?.isShowMenuMobileFoso &&
                    <motion.div
                        initial={{ x: '100%' }} // Bắt đầu từ ngoài bên phải
                        animate={{ x: 0 }}      // Trượt vào vị trí hiển thị
                        exit={{ x: '100%' }}    // Trượt ra khi đóng
                        transition={{ duration: 0.5 }} // Tốc độ trượt
                        className={`flex flex-col justify-between z-[999] absolute w-screen h-[calc(100svh_+_16px)] pt-4 -top-2 -left-0 bg-white`}
                    >
                        <div className='grid grid-cols-16 py-3 items-center justify-center md:px-8 px-6'>
                            <div className='col-span-12 w-full flex items-center justify-start gap-2'>
                                <Link
                                    href="/"
                                    className='flex items-center justify-start w-auto h-[55px] py-4'
                                    prefetch={false}
                                    onClick={() => handleToggleMenu("off")}
                                >
                                    <Image
                                        width={800}
                                        height={800}
                                        alt="logo"
                                        src="/logo/foso/logo-final.png"
                                        className="w-auto h-[55px] object-contain cursor-pointer"
                                        priority
                                    />
                                </Link>
                            </div>

                            <div className="col-span-4 flex items-center justify-end gap-3">
                                {/* <LanguageSelector
                                    classNameTrigger='text-[#25272A] border border-[#09090B]/[2%] !w-full !p-0 bg-white'
                                    styleTrigger={{
                                        background: isVisibleTablet ? "" : "linear-gradient(360deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 100%)",
                                        boxShadow: isVisibleTablet ? "" : "0 0 0 1px rgba(9, 9, 11, 0.05), 0 0 0 1px rgba(9, 9, 11, 0.1)"
                                    }}
                                /> */}

                                <motion.div
                                    initial={false}
                                    animate="rest"
                                    whileTap="press"
                                    variants={{
                                        rest: { scale: 1 },
                                        press: { scale: 1.03, transition: { duration: 0.2 } },
                                    }}
                                    className="flex items-center justify-center bg-transparent p-3 rounded-[6px] cursor-pointer border-gradient-gray"
                                    onClick={() => handleToggleMenu('off')}
                                    style={{
                                        background: "linear-gradient(360deg, rgba(9, 9, 11, 0.05) 0%, rgba(9, 9, 11, 0.1) 100%)",
                                        "--border-radius": "6px",
                                        "--border-width": "1.5px",
                                        "--border-color": " rgba(9, 9, 11, 0.2) 0%, rgba(9, 9, 11, 0.05) 16%, rgba(9, 9, 11, 0.05) 86%, rgba(9, 9, 11, 0) 100%"
                                    } as React.CSSProperties}
                                >
                                    <IoCloseSharp className='size-5 scale-110 text-[#28303F]' />
                                </motion.div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-6 py-4 h-[calc(100dvh_-_68px)] w-full'>
                            <div className="relative flex flex-col gap-4 overflow-y-auto">
                                {
                                    dataHeader.map((data) => (
                                        <React.Fragment key={`menu-${data.id}`}>
                                            {
                                                data.subMenu ?
                                                    (
                                                        // Nếu có submenu
                                                        <React.Fragment>
                                                            <div
                                                                className="flex justify-between items-center cursor-pointer md:px-8 px-6"
                                                                onClick={() => handleToggleSubMenu(data.id)}
                                                            >
                                                                <span
                                                                    className={`text-2xl font-medium transition-all 
                                                                        ${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#10805B] font-medium decoration-[3px] decoration-[#25272A]/90' : 'text-[#25272A]'}
                                                                        ${isStateClientLayout?.header?.isActiveSubMenuFoso === data.id ? "text-[#1AD598]" : "text-[#25272A]"}`}
                                                                >
                                                                    {data.name}
                                                                </span>

                                                                {/* Animated Icon */}
                                                                <div className="relative w-6 h-6 flex items-center justify-center">
                                                                    <AnimatePresence mode="wait">
                                                                        {
                                                                            isStateClientLayout?.header?.isActiveSubMenuFoso === data.id ?
                                                                                (
                                                                                    <motion.span
                                                                                        key="minus"
                                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                                                        transition={{ duration: 0.2 }}
                                                                                        className="absolute"
                                                                                    >
                                                                                        <FiMinus className="text-[#1AD598] size-6" />
                                                                                    </motion.span>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <motion.span
                                                                                        key="plus"
                                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                                                        transition={{ duration: 0.2 }}
                                                                                        className="absolute"
                                                                                    >
                                                                                        <FiPlus className="text-[#25272A] size-6" />
                                                                                    </motion.span>
                                                                                )
                                                                        }
                                                                    </AnimatePresence>
                                                                </div>
                                                            </div>

                                                            {/* Submenu Animation */}
                                                            <AnimatePresence>
                                                                {
                                                                    isStateClientLayout?.header?.isActiveSubMenuFoso === data.id &&
                                                                    (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, height: 0 }}
                                                                            animate={{ opacity: 1, height: "auto" }}
                                                                            exit={{ opacity: 0, height: 0 }}
                                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                            className="md:px-6 px-4 flex flex-col gap-2"
                                                                        >
                                                                            {/* Dịch vụ & Sản phẩm */}
                                                                            {
                                                                                data?.subMenu?.tabs && data?.subMenu?.tabs?.map((tab) => (
                                                                                    <React.Fragment key={`submenu-${tab}`}>
                                                                                        <span className="text-base font-normal text-[#667F93] mb-1 block">
                                                                                            {tab}
                                                                                        </span>
                                                                                        <div className="flex flex-col gap-2">
                                                                                            {
                                                                                                data?.subMenu?.content[tab]?.items?.map((item) => (
                                                                                                    <Link
                                                                                                        key={item.id}
                                                                                                        href={item.link}
                                                                                                        className="flex items-center gap-2 text-[#33404A] hover:text-[#1AD598] transition-all"
                                                                                                        onClick={() => handleToggleMenu("off")}
                                                                                                    >
                                                                                                        <div className={`${item.typeIcon === "default" ? "border-[#15AA7A]" : "border-transparent"} size-12 flex items-center justify-center border  rounded-xl shrink-0`}>
                                                                                                            <div className={`${item.typeIcon === "default" ? "size-8" : "size-full"}`}>
                                                                                                                {
                                                                                                                    typeof item.icon === "string" ?
                                                                                                                        (
                                                                                                                            <Image
                                                                                                                                src={item.icon}
                                                                                                                                alt="icon"
                                                                                                                                width={200}
                                                                                                                                height={200}
                                                                                                                                className='size-full object-contain'
                                                                                                                            />
                                                                                                                        )
                                                                                                                        :
                                                                                                                        (
                                                                                                                            <React.Fragment>
                                                                                                                                {item.icon}
                                                                                                                            </React.Fragment>
                                                                                                                        )
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='space-y-1'>
                                                                                                            <h4 className="text-lg font-bold text-[#33404A]">
                                                                                                                {item?.name ?? ""}
                                                                                                            </h4>
                                                                                                            <p className="text-sm-default font-normal text-[#667F93]">
                                                                                                                {item?.description ?? ""}
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </React.Fragment>
                                                                                ))
                                                                            }
                                                                        </motion.div>
                                                                    )
                                                                }
                                                            </AnimatePresence>
                                                        </React.Fragment>
                                                    )
                                                    :
                                                    (
                                                        // Nếu không có submenu
                                                        <Link
                                                            key={data.id}
                                                            href={data.link}
                                                            className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#10805B] font-medium decoration-[3px] decoration-[#25272A]/90' : 'text-[#25272A]'} text-2xl w-fit duration-300 transition ease-in-out flex items-center font-medium md:px-8 px-6`}
                                                            onClick={() => {

                                                                handleToggleMenu("off")
                                                            }}
                                                            prefetch={false}
                                                        >
                                                            {data.name}
                                                        </Link>
                                                    )
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

        </React.Fragment>
    )
}

export default FosoTabletHeader