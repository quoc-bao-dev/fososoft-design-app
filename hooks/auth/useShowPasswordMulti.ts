import { IChangePasswordState } from "@/types/auth/IAuth";
import { useState } from "react";

const initialState: IChangePasswordState = {
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
}

export const useShowPasswordMulti = () => {
    const [showPassword, setShowPassword] = useState<IChangePasswordState>(initialState)

    const togglePasswordVisibility = (key: keyof IChangePasswordState) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const resetPasswordVisibility = () => {
        setShowPassword(initialState);
    };

    return { showPassword, togglePasswordVisibility, resetPasswordVisibility };
};
