import { create } from "zustand";

interface DialogStoreProps {
    openDialogCustom: boolean
    statusDialog: string
    setStatusDialog: (type: string) => void
    setOpenDialogCustom: (key: boolean) => void
}

export const useDialogStore = create<DialogStoreProps>((set) => ({
    openDialogCustom: false,
    statusDialog: "",
    setStatusDialog: (type: string) => set((state: DialogStoreProps) => ({ statusDialog: type })),
    setOpenDialogCustom: (key: boolean) => set((state: DialogStoreProps) => ({ openDialogCustom: key })),
}));