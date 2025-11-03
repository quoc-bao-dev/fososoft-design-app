import { create } from "zustand";

interface IInput {
    value: string;
    selected: Record<string, any>;
    open: boolean;
}
interface IFilterApplication {
    roles?: IInput
}
// Factory function to create IInput defaults to avoid repetition
const createDefaultInput = (): IInput => ({
    value: "",
    selected: {},
    open: false,
});

interface InitialStateStore {
    isStateComponentContact: {
        tokenCaptcha: string,
        tokenChecked: boolean,
        tokenFailed: boolean,
        combobox: IFilterApplication;
    };
    queryKeyIsStateComponentContact: (key: Partial<InitialStateStore["isStateComponentContact"]>) => void;
}

export const useStateComponentContact = create<InitialStateStore>((set) => ({
    isStateComponentContact: {
        tokenCaptcha: "",
        tokenChecked: false,
        tokenFailed: false,
        combobox: {
            roles: createDefaultInput(),
        },
    },
    queryKeyIsStateComponentContact: (key: any) =>
        set((state) => ({
            ...state,
            isStateComponentContact: {
                ...state.isStateComponentContact,
                ...key,
            },
        })),
}));
