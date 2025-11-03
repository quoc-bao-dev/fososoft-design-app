import { create } from "zustand";

interface IResizeStore {
    isVisibleMobile: boolean;
    isVisibleTablet: boolean;
    isVisibleDesktopLG: boolean;
    isVisibleDesktopXL: boolean;
    isVisibleDesktopXXL: boolean;
    onResizeMobile: () => void;
    onResizeTablet: () => void;
    onResizeDesktopLG: () => void;
    onResizeDesktopXL: () => void;
    onResizeDesktopXXL: () => void;
    onCloseResizeMobile: () => void;
    onCloseResizeTablet: () => void;
    onCloseResizeDesktopXL: () => void;
    onCloseResizeDesktopLG: () => void;
    onCloseResizeDesktopXXL: () => void;
}

// resize responsive
export const useResizeStore = create<IResizeStore>((set) => ({
    isVisibleMobile: false,
    isVisibleTablet: false,
    isVisibleDesktopXL: false,
    isVisibleDesktopXXL: false,
    isVisibleDesktopLG: false,
    onResizeMobile: () => set({ isVisibleMobile: true }),
    onResizeTablet: () => set({ isVisibleTablet: true }),
    onResizeDesktopLG: () => set({ isVisibleDesktopLG: true }),
    onResizeDesktopXL: () => set({ isVisibleDesktopXL: true }),
    onResizeDesktopXXL: () => set({ isVisibleDesktopXXL: true }),
    onCloseResizeMobile: () => set({ isVisibleMobile: false }),
    onCloseResizeTablet: () => set({ isVisibleTablet: false }),
    onCloseResizeDesktopLG: () => set({ isVisibleDesktopLG: false }),
    onCloseResizeDesktopXL: () => set({ isVisibleDesktopXL: false }),
    onCloseResizeDesktopXXL: () => set({ isVisibleDesktopXXL: false }),
}));