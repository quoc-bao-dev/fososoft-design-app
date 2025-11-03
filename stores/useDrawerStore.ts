import {create} from "zustand";
// import {IDrawer} from "@/types/drawer/IDrawer";

export const useDrawerStore = create<any>((set) => ({
    openDrawer: false,
    statusDrawer: "",
    setStatusDrawer: (type: string) => set((state: any) => ({statusDrawer: type})),
    setOpenDrawerCustom: (key: boolean) => set((state: any) => ({openDrawer: key})),
}));

