export const regexPatterns = {
    phone: /^(0|\+84)(\d{9})$/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    lengthPhone: /^[0-9]{10}$/,
};

export function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
