import { IInformationUser } from "@/types/auth/IAuth";
import { create } from "zustand";

interface AuthStoreProps {
    informationUser?: IInformationUser
    setInformationUser: (user?: IInformationUser) => void
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
    informationUser: undefined,
    setInformationUser: (user?: IInformationUser) => set((state: any) => ({ ...state, informationUser: user })),
}));
