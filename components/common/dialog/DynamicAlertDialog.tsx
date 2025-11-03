import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

import { X } from "lucide-react";

type Props = {}

const DynamicAlertDialog = (props: Props) => {
    const { openAlertDialog, setOpenAlertDialog, type } = useAlertDialogStore()

    return (
        <AlertDialog open={openAlertDialog}>
            <AlertDialogOverlay onClick={() => setOpenAlertDialog(false, '') } className='bg-[#161515]/50' />

            <AlertDialogContent className={`${type.includes('orderSuccess') ? "max-w-[540px]" : "max-w-[380px]"} custom-size-text dark-mode p-0 !rounded-2xl`}>
                    <div
                        onClick={() => setOpenAlertDialog(false, "", undefined)}
                        className="cursor-pointer size-5 z-20 flex items-center justify-center absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="size-full text-[#505458]" />
                        <span className="sr-only"/>
                        {/* <span className="sr-only">{dataLang?.h_dialog_close ?? "h_dialog_close"}</span> */}
                    </div>

                {/* {type === 'logout' && <LogoutComponent />} */}
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DynamicAlertDialog