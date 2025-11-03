import { create } from "zustand";

interface LoadingStore {
    loading: boolean;
    setLoading: (value: boolean) => void;
}
interface LoadingFormStore {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),
}));

export const useLoadingFormStore = create<LoadingFormStore>((set) => ({
    isLoading: true,
    setIsLoading: (value) => set({ isLoading: value }),
}));
