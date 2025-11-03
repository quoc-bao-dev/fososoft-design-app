import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from 'next/navigation';
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (dataFmrpPages.includes(pathname)) {
            setTheme("fmrp");
        } else {
            setTheme("light");
        }
    }, [pathname, setTheme]); // Chỉ re-run khi pathname thay đổi

    return null; // Không cần render gì cả, chỉ cần chạy useEffect
};

export default ThemeSwitcher;
