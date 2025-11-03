"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetPortal } from "@/components/ui/sheet"
import { useSheetStores } from '../../../stores/useSheetStores';
import FormContact from '../form/FormContact';

interface DynamicSheetProps {

}

export function DynamicSheet({ }: DynamicSheetProps) {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { openSheetCustom, statusSheet, setOpenSheetCustom, setStatusSheet } = useSheetStores()

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const handleCloseDialog = (value: boolean, type?: string) => {
        setOpenSheetCustom(value)

        if (!value) {
            setStatusSheet("")
        }
    }


    const isAuthStatusSheet = ['contact']?.includes(statusSheet)

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet
            open={openSheetCustom}
            onOpenChange={(value: boolean) => {
                handleCloseDialog(value)
            }}
        >
            <SheetPortal forceMount>
                <SheetHeader>
                    <SheetTitle className="sr-only">Form Liên Hệ</SheetTitle>
                </SheetHeader>
                <SheetContent
                    overlayClassName={"backdrop-blur-[16px] bg-[#FFFFFF]/5"}
                    className="3xl:px-10 px-6 py-6 bg-white 3xl:!max-w-screen-lg xl:!max-w-[50%] lg:!max-w-[60%] md:!max-w-[90%] sm:!max-w-[90%] !max-w-[90%] lg:w-1/2 w-full overflow-y-auto custom-size-text"
                >
                    <AnimatePresence>
                        {
                            isAuthStatusSheet && (
                                statusSheet === "contact" &&
                                <motion.div
                                    key="sheet-container"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='h-full flex flex-col gap-3'
                                >
                                    <div className="text-[#1A2025] 3xl:text-[36px] 2xl:text-[28px] xxl:text-[24px] xl:text-[24px] md:text-[24px] text-[20px] 3xl:!leading-[56px] 2xl:!leading-[38px] xxl:!leading-[34px] xl:!leading-[34px] md:!leading-[34px] !leading-[28px] tracking-[-2%] font-extrabold">
                                        Cơ hội để kết nối với chuyên gia và bứt phá doanh thu – Hãy để lại thông tin ngay!
                                    </div>

                                    <FormContact className="lg:!p-0 !shadow-none" />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </SheetContent>
            </SheetPortal>
        </Sheet>
    )
}

