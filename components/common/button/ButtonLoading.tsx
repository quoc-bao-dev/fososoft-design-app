import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ReactNode } from "react";

type Props = {
    onClick?: () => void;
    title: string | ReactNode,
    disabled?: boolean
    className?: string
    type?: "button" | "submit" | "reset"
    style?: React.CSSProperties,
    isStateloading?: boolean,
    classLoading?: string,
}
const ButtonLoading = ({
    onClick = () => { },
    style,
    title,
    disabled,
    className,
    isStateloading = false,
    type,
    classLoading = 'border-current'
}: Props) => {

    return (
        <motion.div
            whileTap={disabled ? { scale: 1 } : { scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <Button
                style={style}
                onClick={() => onClick()}
                type={type ? type : "button"}
                className={`${className} flex items-center gap-2`}
                disabled={disabled}
                variant="custom"
            >
                {
                    isStateloading &&
                    <span className={`${classLoading} text-white inline-block min-h-4 min-w-4 h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} />
                }
                <>{title}</>
            </Button>
        </motion.div>
    )
}
export default ButtonLoading