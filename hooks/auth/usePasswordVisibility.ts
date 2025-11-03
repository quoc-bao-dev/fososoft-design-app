import { useState } from "react";

export const usePasswordVisibility = () => {
    const [passwordStates, setPasswordStates] = useState<Record<string, boolean>>({});

    // Toggle hiển thị/ẩn mật khẩu theo tên trường
    const togglePasswordVisibility = (field: string) => {
        setPasswordStates((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Kiểm tra trạng thái hiện tại
    const isPasswordVisible = (field: string) => passwordStates[field] || false;

    // Reset tất cả các trường mật khẩu về trạng thái ẩn
    const resetPasswordVisibilityAll = () => {
        setPasswordStates({});
    };

    // Reset một key cụ thể về giá trị boolean được chỉ định
    const resetPasswordVisibilityKey = (field: string, value: boolean) => {
        setPasswordStates((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return {
        isPasswordVisible,
        togglePasswordVisibility,
        resetPasswordVisibilityAll,
        resetPasswordVisibilityKey,
    };
};
