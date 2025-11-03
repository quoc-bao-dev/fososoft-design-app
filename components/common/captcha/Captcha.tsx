'use client';

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import { motion } from "framer-motion";
import CheckIcon from './../../icons/common/CheckIcon';
import { useStatePageContactUs } from "@/app/(client)/contact-us/_state/useStatePageContactUs";
import { useToastStore } from "@/stores/useToastStore";
import { useStateComponentContact } from "@/managers/state/contact/useStateComponentContact";
import { useSheetStores } from '../../../stores/useSheetStores';

interface CaptchaProps {
    onVerify: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const { setToast } = useToastStore()
    const { statusSheet } = useSheetStores()

    const { isStateComponentContact, queryKeyIsStateComponentContact } = useStateComponentContact()

    // ✅ Xử lý khi reCAPTCHA đã tải
    useEffect(() => {
        if (recaptchaRef.current) {
            setRecaptchaLoaded(true);
            console.log("✅ reCAPTCHA đã mount!");
        }
    }, []);

    // ✅ Khi xác minh thành công
    const handleVerify = (token: string | null) => {
        if (token) {
            onVerify(token);
            queryKeyIsStateComponentContact({
                tokenChecked: true,
                tokenFailed: false
            });
        } else {
            queryKeyIsStateComponentContact({
                tokenChecked: false,
                tokenFailed: true
            });
            setToast(true, "error", "Xác minh captcha thất bại!");
        }

        setIsVerifying(false);
        recaptchaRef.current?.reset();  // Reset trạng thái captcha
    };

    // ✅ Kích hoạt reCAPTCHA
    const handleSubmit = async () => {
        if (!recaptchaRef.current || !recaptchaLoaded) {
            console.error("🚨 reCAPTCHA chưa sẵn sàng!");
            return;
        }

        console.log("🔄 Kích hoạt reCAPTCHA...");
        setIsVerifying(true); // Hiển thị trạng thái loading

        try {
            const token = await recaptchaRef.current.executeAsync();

            if (!token) {
                console.error("🚨 Không có token!");
                queryKeyIsStateComponentContact({
                    tokenChecked: false,
                    tokenFailed: true
                })
                handleVerify(null);
                return setToast(true, "error", "Xác minh captcha thất bại!")
                // throw new Error("🚨 reCAPTCHA không trả về token!");
            }

            handleVerify(token);
        } catch (err) {
            console.error("❌ Lỗi executeAsync():", err);
            setIsVerifying(false);
            return setToast(true, "error", "Xác minh captcha thất bại!")
        }

    };


    const handleCheck = () => {
        if (!isVerifying) {
            queryKeyIsStateComponentContact({
                tokenChecked: !isStateComponentContact?.tokenChecked
            })
        }
    };

    if (!siteKey) {
        return <p className="text-red-500">Lỗi: Chưa có reCAPTCHA Site Key</p>;
    }

    return (
        <div className="flex justify-center pointer-events-auto">
            {/* 🔍 reCAPTCHA Invisible */}
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                size="invisible"
                
                onChange={handleVerify}
            />

            {/* 🔘 Nút Custom */}
            <div
                className={`${isStateComponentContact?.tokenFailed ? "!border-red-500" : "border-[#09224B]"}
                ${statusSheet === "contact" ? "3xl:p-6 p-5 3xl:w-[360px] 3xl:h-[90px] md:w-[320px] w-[260px] h-[70px]" : "p-6 w-[360px] h-[90px]"}
                relative flex items-center justify-between  border rounded-2xl overflow-hidden shadow-md bg-white transition-all  hover:bg-gray-100
                `}
            >
                {/* 🔲 Custom Checkbox */}
                <div className="relative flex items-center gap-3">
                    {/* 🔲 Ô Checkbox (ẨN khi đang loading hoặc đã check thành công) */}
                    {!isVerifying && !isStateComponentContact?.tokenChecked && (
                        <motion.div
                            className={`${statusSheet === "contact" ? "3xl:size-10 md:size-9 size-8" : "size-10"} border rounded-md flex items-center justify-center transition-all relative
            bg-white border-[#09224B]/[22%] cursor-pointer hover:border-blue-400`}
                            whileTap={{ scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: 0.2 }}
                            onClick={handleSubmit}
                        />
                    )}

                    <div className={`${(isVerifying || !isVerifying && isStateComponentContact?.tokenChecked) ? "size-10" : "hidden"} flex items-center justify-center`}>
                        {/* 🔄 Loading animation (Hiển thị khi đang xác minh) */}
                        {isVerifying && (
                            <motion.div
                                className={`${statusSheet === "contact" ? "3xl:size-6 size-5" : "size-6"} border-4 border-gray-300 border-t-green-500 rounded-full animate-spin`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        {/* ✔ Checkmark (Hiển thị khi thành công) */}
                        {!isVerifying && isStateComponentContact?.tokenChecked && (
                            <motion.span
                                className={`${statusSheet === "contact" ? "3xl:size-8 size-7" : "size-8"} font-bold `}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <CheckIcon className="size-full" color="#22c55e" />
                            </motion.span>
                        )}
                    </div>

                    {/* 📢 Text hướng dẫn */}
                    <span className="3xl:text-base text-sm text-[#09224B] font-medium cursor-default">
                        {isVerifying ? "Verifying..." : "Click to Verify"}
                    </span>
                </div>

                {/* 🔹 Phần logo reCAPTCHA */}
                <div className={` w-[90px] absolute right-0  h-full bg-[#09224B] border border-[#09224B] flex items-center justify-center`}>
                    <div className={`${statusSheet === "contact" ? "3xl:size-14 size-12" : "size-14"}`}>
                        <Image
                            width={100}
                            height={100}
                            src="/icons/svg/captcha/captcha.png"
                            alt="Custom reCAPTCHA"
                            className="size-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Captcha;
