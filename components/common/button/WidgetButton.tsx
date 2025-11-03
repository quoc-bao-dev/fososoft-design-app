"use client";

import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useCallback, useEffect } from "react";
import PhoneLink from "../contact-links/PhoneLink";
import SocialMediaButton from "./SocialMediaButton";
import ButtonToTop from "./ButtonToTop";
import { motion, AnimatePresence } from "framer-motion";

// Danh sách các button mạng xã hội với `handleClick` riêng
const socialButtons = [
  {
    icon: "/icons/social-media/zalo3.svg",
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
    icon: "/icons/social-media/call2.svg",
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

// Function kiểm tra xem có phải trang blog chi tiết không
const isBlogDetailPage = (pathname: string) => {
  return /^\/blogs\/[^\/]+$/.test(pathname);
};

const WidgetButton: React.FC = () => {
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(false);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const handleNavigation = useCallback(() => {
    const scrollY = window.scrollY;
    const heightScreen = window.innerHeight;

    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (scrollY > heightScreen && lastScrollY.current <= heightScreen) {
          setIsShow(true);
        } else if (scrollY <= heightScreen && lastScrollY.current > heightScreen) {
          setIsShow(false);
        }

        lastScrollY.current = scrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  // Xác định vị trí của các nút dựa trên pathname
  const positionClass = isBlogDetailPage(pathname)
    ? "bottom-1/2 translate-y-1/2 right-3 " // Vị trí bottom cho trang blog chi tiết
    : "bottom-1/2 translate-y-1/2 right-3 "; // Vị trí mặc định

  return (
    <div className={`flex flex-col gap-0 fixed z-40 ${positionClass}`}>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-xl bg-white shadow-[0px_4px_24px_0px_#0000001A]"
          >
            {socialButtons.map((button, index) => (
              <SocialMediaButton
                key={index}
                info={button.info}
                handleClick={button.handleClick}
                tooltipPosition={isBlogDetailPage(pathname) ? "top" : "left"}
                icon={
                  <div
                    className={`${
                      dataFmrpPages.includes(pathname)
                        ? "hover:bg-gray-50"
                        : "hover:scale-[1.04]"
                    } 
                    ${index === 0 && "rounded-t-xl"}
                    ${index === socialButtons.length - 1 && "rounded-b-xl"}
                    ${index === 1 && "border-y border-[#F6F6F8]"}
                    p-3 custom-transition flex justify-center items-center`}
                  >
                    <Image
                      width={200}
                      height={200}
                      alt="social-media"
                      className="size-8 aspect-square object-cover flex-shrink-0"
                      src={button.icon}
                    />
                  </div>
                }
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* <ButtonToTop /> */}
    </div>
  );
};

export default React.memo(WidgetButton);
