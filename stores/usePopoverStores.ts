import { create } from "zustand";
// import { IPopoverCustom } from "@/types/popover/IPopover";

export const usePopoverStore = create<any>((set) => ({
    openPopover: false,
    statusPopover: "",
    setStatusPopover: (key: string) => set((state: any) => ({ statusPopover: key })),
    setOpenPoppoverCustom: (key: boolean) => set((state: any) => ({ openPopover: key })),
}));
