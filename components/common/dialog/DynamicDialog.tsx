import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { useDialogStore } from "@/stores/useDialogStores";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
type Props = {};

export function DynamicDialog({ }: Props) {
    const pathname = usePathname()

    // const { dataLang } = useTranslate()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // const { isStateAuth, queryKeyIsStateAuth } = useStateAuth()

    const { openDialogCustom, statusDialog, setOpenDialogCustom, setStatusDialog } = useDialogStore()

    const handleCloseDialog = (value: boolean, type?: string) => {
        if (type === "action" && pathname === "/order-confirm") {
            setOpenDialogCustom(value)
        } else if (pathname !== "/order-confirm") {
            setOpenDialogCustom(value)
        }

    }

    if (!isMounted) {
        return null;
    }

    const isAuthTab = (statusDialog === "login" || statusDialog === "register")
    const isAuthStatusDialog = ['login', 'register']?.includes(statusDialog)

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            y: 20,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
    }

    return (
        <AnimatePresence mode="wait">
            {
                openDialogCustom && (
                    <Dialog
                        open={openDialogCustom}
                        onOpenChange={(value: boolean) => {
                            handleCloseDialog(value)
                            // if (isStateAuth?.otp_time > 0) {
                            //     queryKeyIsStateAuth({ otp_time: 0 })
                            // }
                        }}
                    >
                        <DialogPortal>
                            <DialogOverlay className="bg-[#09080D]/[48%]" />
                            {
                                isAuthStatusDialog &&
                                (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={modalVariants}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        <DialogContent
                                            className={`${statusDialog === "otp" ? 'lg:max-w-[420px]' : `lg:max-w-[520px]`} bg-white !text-black p-0 border-none max-w-[95%] max-h-[98vh] overflow-hidden
                                                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0
                                                    !rounded-2xl custom-size-text custom-tailwind`}
                                            style={{
                                                boxShadow: "0px 64px 64px -48px #0F0F0F14"
                                            }}
                                        >
                                            <div className={`h-full md:p-6 p-4 ${['login_temporary', 'forgot_password'].includes(statusDialog) ? "" : "md:pr-3 pr-1"} rounded-2xl`}>
                                                <div className="3xl:mb-8 mb-6">
                                                    <DialogClose
                                                        onClick={() => {
                                                            handleCloseDialog(false, "action")
                                                            // if (isStateAuth?.otp_time > 0) {
                                                            //     queryKeyIsStateAuth({ otp_time: 0 })
                                                            // }
                                                        }}
                                                        className="3xl:size-6 size-5 z-20 flex items-center justify-center absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                                                    >
                                                        <X className="size-full text-[#505458]" />
                                                        <span className="sr-only" />
                                                        {/* <span className="sr-only">{dataLang?.h_dialog_close ?? "h_dialog_close"}</span> */}
                                                    </DialogClose>


                                                    {
                                                        isAuthTab &&
                                                        <div className="flex flex-row items-center justify-center w-full gap-4">
                                                            <DialogTitle
                                                                className={`${statusDialog === "login" ? "!text-[#333538]" : "!text-[#C4CACC] hover:!text-[#333538]"} relative px-4 pb-2 capitalize 3xl:text-[22px] text-[20px] font-semibold cursor-pointer transition-all duration-300`}
                                                                onClick={() => setStatusDialog("login")}
                                                            >
                                                                {/* {dataLang?.h_dialog_title_login ?? "h_dialog_title_login"} */}
                                                                {statusDialog === "login" && <div className='absolute bottom-0 left-[40%] w-8 h-1 bg-[#FDA612] rounded-[3px]' />}
                                                            </DialogTitle>
                                                            <DialogTitle
                                                                className={`${statusDialog === "register" ? "!text-[#333538]" : "!text-[#C4CACC] hover:!text-[#333538]"} relative px-4 pb-2 capitalize 3xl:text-[22px] text-[20px] font-semibold cursor-pointer transition-all duration-300`}
                                                                onClick={() => setStatusDialog("register")}
                                                            >
                                                                {/* {dataLang?.h_dialog_title_register ?? "h_dialog_title_register"} */}
                                                                {statusDialog === "register" && <div className='absolute bottom-0 left-[40%] w-8 h-1 bg-[#FDA612] rounded-[3px]' />}
                                                            </DialogTitle>
                                                        </div>
                                                    }
                                                    {
                                                        !isAuthTab &&
                                                        <DialogHeader className="flex items-center justify-center gap-4 w-full">
                                                            <DialogTitle className={`text-[#333538] capitalize 3xl:text-[22px] text-[20px] font-semibold`}>
                                                                {/* {(statusDialog === "otp" || statusDialog === "update_password") && (dataLang?.h_dialog_title_enter_otp ?? "h_dialog_title_enter_otp")} */}
                                                            </DialogTitle>
                                                            {
                                                                (statusDialog === "otp" || statusDialog === "update_password") &&
                                                                <DialogDescription className='text-center text-[#808990] font-normal'>
                                                                    {/* {dataLang?.h_dialog_title_enter_verification_code ?? "h_dialog_title_enter_verification_code"}: <span className='font-semibold'>{isStateAuth?.form?.email}</span> */}
                                                                </DialogDescription>
                                                            }
                                                        </DialogHeader>
                                                    }
                                                </div>

                                                <ScrollArea
                                                    type="hover"
                                                    className={`max-h-[calc(90vh_-_50px)] overflow-y-auto pr-3 z-20`}
                                                >
                                                    {/* {statusDialog === "login" && <LoginComponent />}
                                                    {statusDialog === "register" && <RegisterComponent />} */}
                                                    <ScrollBar />
                                                </ScrollArea>
                                            </div>
                                        </DialogContent>
                                    </motion.div>
                                )
                            }
                        </DialogPortal>
                    </Dialog >
                )
            }
        </AnimatePresence>
    );
}
