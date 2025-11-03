import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import {
  useRegisterButtonDelayCleanup,
  useRegisterButtonVisibility,
} from "@/hooks/custom/useRegisterButtonVisibility";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import PhoneLink from "../contact-links/PhoneLink";
import ButtonAnimation from "./ButtonAnimation";
import ButtonToTop from "./ButtonToTop";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";
import SocialMediaButton from "./SocialMediaButton";
import { useResizeStore } from "@/stores/useResizeStore";

const socialButtons = [
  {
    icon: "/icons/social-media/zalo2.svg",
    background_animation:
      "linear-gradient(212.75deg, #FF7061 5.92%, #FF5280 34.96%, #A033FF 68.84%, #0099FF 96.41%)",
    info: (
      <div className="flex flex-col items-center gap-2 !text-nowrap">
        <p className="text-sm text-nowrap">Quét mã QR Zalo: </p>
        <div className="3xl:size-24 size-20 flex items-center justify-center">
          <Image
            width={400}
            height={400}
            src="/icons/qr/zalo-qr.png"
            alt="Zalo QR"
            className="size-full object-cover rounded aspect-square"
          />
        </div>
      </div>
    ),
    handleClick: () => {
      window.open("https://zalo.me/2281264205827497572");
    },
  },
  {
    icon: "/icons/social-media/messenger.svg",
    background_animation:
      "linear-gradient(212.75deg, #FF7061 5.92%, #FF5280 34.96%, #A033FF 68.84%, #0099FF 96.41%)",
    info: (
      <p className="flex flex-col items-center justify-center text-center text-sm space-y-1 text-gray-500 !text-nowrap">
        <span className="text-nowrap">Nhắn tin qua Messenger:</span>
        <ButtonAnimationNew
          icon={
            <div className="size-4 aspect-square shrink-0">
              <Image
                width={100}
                height={100}
                alt="icon"
                src="/icons/social-media/live-chat.png"
                className="size-full object-contain aspect-square"
              />
            </div>
          }
          onClick={() => {
            window.open("https://m.me/fososoftware");
          }}
          title="Chat Ngay!"
          className="flex items-center gap-2 border rounded-lg px-2 py-1"
        />
      </p>
    ),
    handleClick: () => {
      window.open("https://m.me/fososoftware");
    },
  },
  {
    icon: "/icons/social-media/call.svg",
    background_animation: "linear-gradient(90deg, #53B086 0%, #53B086 100%)",
    info: (
      <p className="text-sm text-nowrap space-x-1 text-gray-500">
        <span className="text-nowrap">Gọi ngay:</span>
        <PhoneLink
          phoneNumber="0901136968"
          className="text-gray-500 font-semibold !text-nowrap"
        >
          0901 136 968
        </PhoneLink>
      </p>
    ),
    handleClick: () => {
      window.location.href = `tel:0901136968`;
    },
  },
];

// Component WidgetButton
const RegisterButton: React.FC = () => {
  const pathname = usePathname();

  // Sử dụng hook kiểm soát hiển thị nút đăng ký
  const { canShowButton } = useRegisterButtonVisibility();

  // Kiểm tra kích thước màn hình
  const { isVisibleTablet } = useResizeStore();

  // Sử dụng hook để cleanup khi unmount
  useRegisterButtonDelayCleanup();

  // Chỉ hiển thị trên màn hình PC và khi nút header bị ẩn
  const shouldShowRegisterButton =
    pathname === "/phan-mem-quan-ly-san-xuat-fmrp" &&
    !isVisibleTablet &&
    canShowButton("floating");

  return (
    <div className="flex flex-col lg:flex-row gap-3 fixed bottom-20 left-5 sm:left-auto sm:right-8 z-[999]">
      <div className="flex flex-col lg:hidden gap-3">
        {socialButtons.map((button, index) => (
          <SocialMediaButton
            key={index}
            // className={button?.className || ""}
            // background_animation={button.background_animation}
            info={button.info}
            handleClick={button.handleClick} // ✅ Truyền `handleClick` riêng cho từng button
            icon={
              <div
                className={`${
                  dataFmrpPages.includes(pathname)
                    ? "hover:bg-[#0375f3]/80"
                    : "hover:scale-[1.04]"
                } bg-[#48DDAD] border border-[#15AA7A] p-3 rounded-full custom-transition`}
                style={{
                  boxShadow:
                    "0px 4px 6px -1px #0000001A, 0px 2px 4px -2px #0000001A",
                }}
              >
                <Image
                  width={100}
                  height={100}
                  alt="social-media"
                  className="size-6 object-contain"
                  src={button.icon}
                />
              </div>
            }
          />
        ))}
      </div>

      {/* {shouldShowRegisterButton && (
        <ButtonAnimation
          icon={<IconRegisterButton />}
          reverse={false}
          title="Đăng Ký Trải Nghiệm Miễn Phí FMRP Ngay!"
          onClick={() => {
            window.open("https://hub.fmrp.vn/auth/register");
          }}
          className="h-full w-fit border-gradient-button-fmrp-new flex items-center gap-2 bg-white text-base text-[#25387A] font-semibold capitalize border-none rounded-full px-4 py-2 transition-colors duration-300 ease-in-out 
    ![box-shadow:inset_1px_-1px_20px_-5px_rgba(3,117,243,0.15),0px_20px_25px_-5px_rgba(18,18,23,0.10),0px_10px_10px_-5px_rgba(18,18,23,0.04)]"
          style={{
            background: "white",
          }}
          whileHover={{
            background: [
              "radial-gradient(100% 100% at 50% 0%, rgba(3,117,243,0.15) 0%, rgba(3,117,243,0) 100%), white",
              "radial-gradient(100% 100% at 50% 0%, rgba(3,117,243,0) 0%, rgba(3,117,243,0.15) 100%), white",
              "radial-gradient(100% 100% at 50% 0%, rgba(3,117,243,0.15) 0%, rgba(3,117,243,0) 100%), white",
            ],
            boxShadow: [
              "inset 1px -1px 20px -4px rgba(3,117,243,0.25), 0px 12px 20px -6px rgba(3,117,243,0.15)",
              "inset 1px -1px 22px -3px rgba(3,117,243,0.35), 0px 16px 24px -6px rgba(3,117,243,0.2)",
              "inset 1px -1px 20px -4px rgba(3,117,243,0.25), 0px 12px 20px -6px rgba(3,117,243,0.15)",
            ],
            transition: {
              duration: 2,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
            },
          }}
        />
      )} */}
      <ButtonToTop />
    </div>
  );
};

export default React.memo(RegisterButton);
