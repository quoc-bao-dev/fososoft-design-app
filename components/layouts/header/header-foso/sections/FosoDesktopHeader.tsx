import HoverEffect from "@/components/common/animations/hover-button/HoverEffectButton";
import ButtonAnimation from "@/components/common/button/ButtonAnimation";
import { ActionTooltip } from "@/components/common/tooltip/ActionTooltip";
import SubmenuTooltip from "@/components/common/tooltip/SubmenuTooltip";
import { IMenuHeader } from "@/types/ui/menu/IMenuUI";
import { variantButtonScaleZoom } from "@/utils/animations/variantsAnimation";
import { scrollToTop } from "@/utils/scroll/scrollUtils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DesktopHeaderClientProps {
  dataHeader: IMenuHeader[];
  handleToggleMenu?: (action: string) => void;
  handleChangeLanguage?: (value: string) => void;
  handleOpenDialog?: (value: string, type_device: string) => void;
  handleOpenSheet: (value: string, type_device: string) => void;
}

const FosoDesktopHeader = ({
  dataHeader,
  handleOpenSheet,
}: DesktopHeaderClientProps) => {
  // Luôn dùng chế độ click cho mọi kích thước màn hình
  const router = useRouter();
  const pathname = usePathname();

  // Chỉ mở submenu bằng click (không dùng hover)
  const isClickMode = true;

  const [openId, setOpenId] = React.useState<string | null>(null);

  // Đóng menu khi đổi route
  useEffect(() => {
    setOpenId(null);
  }, [pathname]);

  // Đóng khi click ra ngoài (phòng trường hợp ActionTooltip không tự close)
  useEffect(() => {
    if (!isClickMode) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Nếu click vào phần tử có data-submenu-root thì không đóng
      if (target?.closest?.('[data-submenu-root="true"]')) return;
      setOpenId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isClickMode]);

  const checkIsActive = (
    pathname: string,
    keywords: string | string[]
  ): boolean => {
    if (Array.isArray(keywords)) {
      return keywords.some((keyword) => pathname.includes(keyword));
    }
    return pathname.includes(keywords);
  };

  // Toggle khi click ở chế độ click
  const handleToggleSubmenu = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <motion.div
        initial={false}
        animate="rest"
        whileTap="press"
        variants={variantButtonScaleZoom}
        className="aspect-2.4/1 3xl:w-[134px] xl:w-[110px] w-[86px] h-auto cursor-pointer"
        onClick={() => {
          router.push("/");
          scrollToTop();
        }}
      >
        <Image
          alt="logo"
          src="/logo/foso/logo.svg"
          width={134}
          height={55}
          quality={100}
          priority
          className="size-full object-contain aspect-2.4/1"
        />
      </motion.div>

      <div className="flex-grow max-w-[65%] flex items-center justify-center 2xl:gap-4 xl:gap-2 lg:gap-1">
        {dataHeader.map((item) => {
          const isActive = checkIsActive(pathname, item.active);
          const clickable = isClickMode && !!item.subMenu; // chỉ click khi có submenu và đang ở lg
          const isOpen = openId === String(item.id);

          return (
            <React.Fragment key={item.id}>
              {item.subMenu ? (
                <ActionTooltip
                  classNameContent="bg-white rounded-3xl xl:p-6 p-4"
                  classNameArrow="fill-white custom-arrow"
                  label={<SubmenuTooltip subMenu={item.subMenu} />}
                  styleContent={{ boxShadow: "0px 1px 1px 2px #1018280D" }}
                  side="bottom"
                  align="center"
                  // Controlled theo state click: chỉ đóng khi v=false, bỏ mở bằng hover
                  open={isOpen}
                  onOpenChange={(v: boolean) => {
                    if (!v) setOpenId(null);
                  }}
                  openMode="click"
                >
                  <div
                    data-submenu-root="true"
                    className={[
                      isActive
                        ? "text-[#25272A] font-bold"
                        : "text-[#25272A] font-medium hover:text-[#10805B] hover:font-bold",
                      "flex items-center text-sm-default gap-2 px-2 cursor-pointer custom-transition relative",
                    ].join(" ")}
                    // Click chỉ có tác dụng trong click mode (lg)
                    onClick={(e) => {
                      if (clickable) {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleSubmenu(String(item.id));
                      }
                    }}
                    // Keyboard access (Enter/Space) trong click mode
                    onKeyDown={(e) => {
                      if (!clickable) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleSubmenu(String(item.id));
                      }
                    }}
                    role={clickable ? "button" : "menuitem"}
                    aria-expanded={clickable ? isOpen : undefined}
                    aria-haspopup="menu"
                    tabIndex={0}
                  >
                    <span className="relative">
                      <HoverEffect
                        title={item.name}
                        hoverTitle={item.name}
                        reverse={false}
                        className={[
                          isActive
                            ? "text-[#25272A] font-bold"
                            : "text-[#25272A] hover:text-[#10805B] font-medium hover:font-bold",
                          "text-sm-default !tracking-[1%] px-2 py-1 cursor-pointer custom-transition capitalize relative text-nowrap w-fit flex flex-col overflow-hidden",
                        ].join(" ")}
                      />
                      {isActive && item.link !== "/" && (
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#1AD598] z-[999]" />
                      )}
                    </span>
                    <IoIosArrowDown
                      className={`size-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </ActionTooltip>
              ) : (
                <Link href={item.link} className="inline-flex relative">
                  <HoverEffect
                    title={item.name}
                    hoverTitle={item.name}
                    reverse={false}
                    className={[
                      isActive
                        ? "text-[#25272A] font-bold"
                        : "text-[#25272A] hover:text-[#10805B] font-medium hover:font-bold",
                      "text-sm-default !tracking-[1%] px-2 py-1 cursor-pointer custom-transition capitalize relative text-nowrap w-fit flex flex-col overflow-hidden",
                    ].join(" ")}
                  />
                  {isActive && item.link !== "/" && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#1AD598] z-[999]" />
                  )}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Nút chuyển ngôn ngữ + CTA */}
      <div className="flex items-center justify-end gap-2 max-w-[30%]">
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
          title="090 113 6968"
          onClick={() => {
            window.location.href = "tel:0901136968";
          }}
          className="border-gradient-button-foso flex items-center gap-2 text-sm-default text-[#052B1E] font-bold border-none w-fit rounded-full px-4 py-2 transition-colors duration-300 ease-in-out"
          style={{
            background:
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #1AD598, #1AD598)",
          }}
          whileHover={{
            background: [
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #1AD598, #1AD598)",
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(0deg, #1AD598, #1AD598)",
              "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #1AD598, #1AD598)",
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
      </div>
    </div>
  );
};

export default FosoDesktopHeader;
