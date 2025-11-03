import { create } from "zustand";

interface AlertDialogProps {
    type: string
    openAlertDialog: boolean
    data?: any
    setOpenAlertDialog: (key: boolean, type?: string, data?: any) => void
}

export const useAlertDialogStore = create<AlertDialogProps>((set) => ({
    type: "",
    data: undefined,
    openAlertDialog: false,
    setOpenAlertDialog: (key: boolean, type?: string, data?: any) => set((state: any) => ({
        ...state,
        openAlertDialog: key,
        type: type,
        data: data
    })),
}));
