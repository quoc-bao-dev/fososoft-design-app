"use client";
import ButtonAnimation from "@/components/common/button/ButtonAnimation";
import { useResizeStore } from "@/stores/useResizeStore";
import { usePathname } from "next/navigation";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RegisterBttonNew = () => {
  const pathname = usePathname();

  // Kiểm tra kích thước màn hình
  const { isVisibleTablet } = useResizeStore();

  // Chỉ hiển thị trên màn hình PC và khi nút header bị ẩn
  const shouldShowRegisterButton =
    pathname === "/phan-mem-quan-ly-san-xuat-fmrp" && !isVisibleTablet;

  return (
    <div className="hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[999] sm:flex flex-col lg:flex-row gap-3">
      {shouldShowRegisterButton && (
        <ButtonAnimation
          icon={
            <div className="size-10 bg-linear-button-register rounded-full flex justify-center items-center">
              <DotLottieReact
                src="/gif/sparkle.lottie"
                autoplay
                loop
                style={{ width: 30, height: 30 }}
              />
            </div>
          }
          reverse={false}
          title="Đăng Ký Trải Nghiệm Miễn Phí FMRP Ngay!"
          onClick={() => {
            window.open("https://hub.fmrp.vn/auth/register");
          }}
          className="h-full w-fit border-gradient-button-fmrp-new bg-white flex items-center gap-2 bg-red text-base font-bold text-[#25387A] !text-nowrap whitespace-nowrap capitalize border-none rounded-full px-[14px] py-2 transition-colors duration-300 ease-in-out
        !shadow-[0px_2px_6px_rgba(3,117,243,0.15),-2px_-2px_16px_rgba(3,117,243,0.48)_inset,2px_2px_16px_-5px_rgba(31,197,131,0.48)_inset]"
        />
      )}
    </div>
  );
};

export default RegisterBttonNew;
