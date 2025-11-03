import { create } from "zustand";

interface SheetStoresProps {
    openSheetCustom: boolean
    statusSheet: string
    setStatusSheet: (type: string) => void
    setOpenSheetCustom: (key: boolean) => void
}

export const useSheetStores = create<SheetStoresProps>((set) => ({
    openSheetCustom: false,
    statusSheet: "",
    setStatusSheet: (type: string) => set((state: SheetStoresProps) => ({ statusSheet: type })),
    setOpenSheetCustom: (key: boolean) => set((state: SheetStoresProps) => ({ openSheetCustom: key })),
}));