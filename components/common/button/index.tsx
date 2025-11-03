
import React from "react";
import Image from "next/image";
import ButtonToTop from "./ButtonToTop";
import SocialMediaButton from "./SocialMediaButton";
import { usePathname } from "next/navigation";
import PhoneLink from "../contact-links/PhoneLink";
import EmailLink from "../contact-links/EmailLink";
import Link from "next/link";
import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";
import ButtonAnimation from "./ButtonAnimation";

// Danh sách các button mạng xã hội với `handleClick` riêng
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
  // {
  //     icon: "/icons/social-media/gmail.svg",
  //     background_animation: "linear-gradient(90deg, #53B086 0%, #53B086 100%)",
  //     className: "bg-[#53B086]/80",
  //     info: (
  //         <p className="text-sm text-nowrap space-x-1 text-gray-500">
  //             <span className='text-nowrap'>Email:</span>
  //             <EmailLink email="info@fososoft.com" className="text-gray-500 font-semibold !text-nowrap">
  //                 info@fososoft.com
  //             </EmailLink>
  //         </p>
  //     ),
  //     handleClick: () => { window.open("https://m.me/yourpage", "_blank") },
  //     // handleClick: () => { window.open("mailto:info@fososoft.com", "_blank") }
  //     // handleClick: () => { window.location.href = `mailto:info@fososoft.com` }
  // }
];

// Component WidgetButton
const RegisterButton: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-3 fixed bottom-8 left-5 sm:left-auto sm:right-8 z-[999]">
      <div className="flex flex-col gap-3">
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

      {pathname === "/phan-mem-quan-ly-san-xuat-fmrp" && (
        <ButtonAnimation
          icon={
            <div className="xl:size-6 size-5 flex-shrink-0 flex items-center justify-center bg-[#000000] rounded-full">
              <Image
                width={100}
                height={100}
                alt="icon"
                src={"/icons/common/arrow/ArrowUpRight.svg"}
                className="size-4 object-contain"
              />
            </div>
          }
          reverse={true}
          title="Đăng ký"
          onClick={() => {
            window.open("https://hub.fmrp.vn/auth/register");
          }}
          className="hidden border-gradient-button-fmrp md:flex items-center gap-2 text-sm text-white font-semibold capitalize border-none w-fit rounded-full px-4 py-2 transition-colors duration-300 ease-in-out"
          style={{
            background:
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(118.21deg, #0375F3 10.03%, #013DA0 107.74%)",
          }}
          whileHover={{
            background: [
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)",
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)",
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #0375F3 10.03%, #013DA0 107.74%)",
            ],
            transition: {
              duration: 1.5,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
            },
            boxShadow: [
              "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.15)",
              "inset -3px -3px 6px rgba(255,255,255,0.7), inset 3px 3px 6px rgba(0,0,0,0.35)",
              "inset -3px -3px 7px rgba(255,255,255,0.7), inset 3px 3px 7px rgba(0,0,0,0.4)",
              "inset -2px -2px 5px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.3)",
            ],
          }}
        />
      )}
      <ButtonToTop />
    </div>
  );
};

export default React.memo(RegisterButton);
