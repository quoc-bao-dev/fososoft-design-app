
import { motion } from 'framer-motion'
import CheckIcon from "@/components/icons/common/CheckIcon";
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";


import { ToastClose } from "@/components/ui/toast";
import { useToastStore } from "@/stores/useToastStore";
import { useRouter } from "next/navigation";

type Props = {
    type: 'success' | 'error' | 'warning'
    content: string,
    description?: string,
}
const ToastCustom = ({ type, content, description }: Props) => {
    const router = useRouter()

    const { showType, dataObject } = useToastStore()

    const types = {
        success:
            <motion.span
                className=" font-bold size-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <CheckIcon className="size-full" color="#22c55e" />
            </motion.span>
        ,
        error:
            <motion.span
                className=" font-bold size-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >

                <MdError className="size-full" color="#ef4444" />
            </motion.span>,
        warning:
            <motion.span
                className=" font-bold size-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >

                <IoIosWarning className="size-full" color="#f97316" />
            </motion.span>
    } as const

    return (
        <div className={'flex items-start gap-3'}>
            <ToastClose className={'opacity-100 text-[#00000073] dark:text-white'} />
            <div className={'size-5'}>
                {types[type]}
            </div>
            <div className={'flex flex-col gap-2'}>
                <h1 className={'text-[#1B2124] dark:text-white font-bold text-base leading-5'}>
                    {
                        showType
                            ?
                            type.replace(/^./, (char) => char.toUpperCase())
                            :
                            content
                    }
                </h1>
                <div className="flex flex-col gap-0.5">
                    {
                        showType && (
                            <h2 className={'text-[#717A95] dark:text-white font-normal text-base'}>
                                {content}
                            </h2>
                        )
                    }
                    {
                        description &&
                        <h2 className={`${dataObject ? "cursor-pointer" : ""} text-[#717A95] dark:text-white font-normal text-sm`}>
                            {description}
                        </h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default ToastCustom