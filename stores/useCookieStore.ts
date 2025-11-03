"use client";
import Cookies from "js-cookie";
import { KEY_COOKIES } from "@/constants/Cookie";

const useCookieStore = () => {
    const setCookie = (key: string = KEY_COOKIES.WEBSITE, value: string, options?: Cookies.CookieAttributes) => {
        // Nếu không có giá trị expires trong options, mặc định đặt thời hạn là 1 năm
        const defaultOptions = { expires: 365 }; // 1 năm

        Cookies.set(key, value, { ...defaultOptions, ...options });
    };

    const removeCookie = (key: string = KEY_COOKIES.WEBSITE, options?: Cookies.CookieAttributes) => {
        Cookies.remove(key, options);
    };

    const getCookie = (key: string = KEY_COOKIES.WEBSITE) => {
        return Cookies.get(key);
    };

    return { setCookie, removeCookie, getCookie };
};

export default useCookieStore;
