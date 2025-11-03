import { useState } from "react";

export const useShowPasswordSingle = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

    const togglePasswordVisibility = (type: string) => {
        if (type === "password") {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        }

        if (type === "passwordConfirm") {
            setShowPasswordConfirm((prevShowPasswordConfirm) => !prevShowPasswordConfirm);
        }
    };

    return { showPassword, showPasswordConfirm, togglePasswordVisibility };
};
