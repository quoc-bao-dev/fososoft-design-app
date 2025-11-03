import { create } from "zustand";

export interface IToastStore {
    openToast: boolean;
    type?: "success" | "error" | "warning";
    message?: string;
    duration?: number;
    description?: string;
    style?: {
        className: string;
        classNameDescription: {} | any;
    };
    showType: boolean;
    dataObject: any;
    setToast: (
        key: any,
        type?: "success" | "error" | "warning",
        message?: string,
        duration?: number,
        description?: string,
        style?: { className: string; classNameDescription: {} | any }
    ) => void;
    setShowType: (key: boolean) => void;
    setDataObject: (key: any) => void;
}

export const useToastStore = create<IToastStore>((set) => ({
    openToast: false,
    type: "success",
    message: "",
    duration: 1200,
    style: {
        className: "",
        classNameDescription: {},
    },
    description: "",
    showType: true,
    setShowType: (key: boolean) => set((state) => ({ showType: key })),
    setDataObject: (key: any) => set((state) => ({ dataObject: key })),
    dataObject: null,
    setToast: (
        key: any,
        type?: "success" | "error" | "warning",
        message?: string,
        duration?: number,
        description?: string,
        style?: {
            className: string;
            classNameDescription: any;
        }
    ) =>
        set((state) => ({
            openToast: key,
            type,
            message,
            duration,
            description,
            style,
        })),
}));
