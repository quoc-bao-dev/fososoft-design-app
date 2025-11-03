"use client";

import { KEY_COOKIES } from "@/constants/Cookie";
import { useModalContext } from "@/contexts/ModalContext";
import { dataLanguageOptions } from "@/data/DataTranslate";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";
import { useStateClientLayout } from "@/managers/state/client/useStateClientLayout";
import useCookieStore from "@/stores/useCookieStore";
import { useDialogStore } from "@/stores/useDialogStores";
import { useResizeStore } from "@/stores/useResizeStore";
import { IMenuHeader } from "@/types/ui/menu/IMenuUI";
import { motion, useAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSheetStores } from "../../../../stores/useSheetStores";

const FosoDesktopHeader = dynamic(() => import("./sections/FosoDesktopHeader"));
const FosoTabletHeader = dynamic(() => import("./sections/FosoTabletHeader"));

const dataHeader: IMenuHeader[] = [
  {
    id: "quy-trinh",
    name: "Quy Trình",
    link: "/quy-trinh",
    active: ["quy-trinh", "process"],
    type: "default",
    visible: true,
  },
  {
    id: "du-an",
    name: "Dự Án",
    link: "/du-an",
    active: ["du-an", "projects"],
    type: "default",
    visible: true,
  },
  {
    id: "bang-gia",
    name: "Bảng Giá",
    link: "/bang-gia",
    active: ["bang-gia", "price-list"],
    type: "default",
    visible: true,
  },
  {
    id: "cau-hoi-thuong-gap",
    name: "Câu Hỏi Thường Gặp",
    link: "/cau-hoi-thuong-gap",
    active: ["cau-hoi-thuong-gap", "faq"],
    type: "default",
    visible: true,
  },
];

const FosoHeaderContainer = () => {
  const pathname = usePathname();

  const { setCookie } = useCookieStore();

  const { isVisibleTablet } = useResizeStore();

  const { setOpenDialogCustom, setStatusDialog } = useDialogStore();
  const { setOpenSheetCustom, setStatusSheet } = useSheetStores();

  // const { onSubmitChangeLanguage, isLoading } = usePostChangeLanguage()

  const { isStateClientLayout, queryKeyIsStateClientLayout } =
    useStateClientLayout();

  const controls = useAnimation(); // Framer Motion controls

  const [isAtPageTop, setIsAtPageTop] = useState(true); // Track if we're at the top of the page

  const ticking = useRef<boolean>(false); // Prevents redundant re-renders
  const lastScrollY = useRef<number>(0); // Stores last known scroll position
  const lastScrollX = useRef<number>(0); // Lưu vị trí scroll ngang trước đó
  const isHeaderVisible = useRef<boolean>(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const forceCheckScroll = useRef<boolean>(false); // Flag để kiểm tra hướng cuộn sau khi tự hiện header

  const { openModal, closeModal } = useModalContext();

  // ✅ Ép điều kiện false cho trang bắt đầu bằng "/du-an"
  const isDuAnPage = pathname.startsWith("/du-an");

  // ✅ Xử lý scroll để kiểm tra hướng cuộn (dùng throttle để tránh lag)
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Update whether we're at the top of the page
    setIsAtPageTop(scrollY === 0);

    // Nếu chỉ cuộn ngang (scrollX thay đổi mà scrollY không đổi) → Bỏ qua
    if (scrollX !== lastScrollX.current && scrollY === lastScrollY.current) {
      lastScrollX.current = scrollX; // Cập nhật scrollX để không xử lý lần sau
      return;
    }

    if (!ticking.current) {
      requestAnimationFrame(() => {
        let shouldShowHeader = isHeaderVisible.current;

        if (dataFmrpPages.includes(pathname)) {
          // Nếu `theme === "fmrp"`, chỉ hiển thị header khi ở đầu trang
          shouldShowHeader = scrollY === 0;
        } else {
          if (scrollY === 0) {
            // ✅ Nếu đang ở trang chủ => Ẩn header khi ở vị trí đầu trang
            shouldShowHeader = true;
          } else if (
            scrollY > lastScrollY.current ||
            forceCheckScroll.current
          ) {
            shouldShowHeader = false; // Ẩn header khi cuộn xuống
            forceCheckScroll.current = false; // Reset flag sau lần đầu tiên kiểm tra
          } else if (scrollY < lastScrollY.current) {
            shouldShowHeader = true; // Hiện header khi cuộn lên
          }
        }

        if (shouldShowHeader !== isHeaderVisible.current) {
          isHeaderVisible.current = shouldShowHeader;
          controls.start({
            y: shouldShowHeader ? 0 : -100,
            opacity: shouldShowHeader ? 1 : 0,
            transition: { duration: 0.3 },
          });
        }

        lastScrollY.current = scrollY;
        lastScrollX.current = scrollX; // Cập nhật vị trí scroll ngang
        ticking.current = false;
      });
      ticking.current = true;
    }

    if (!dataFmrpPages.includes(pathname)) resetInactivityTimer();
  }, [controls, pathname]);

  // ✅ Xử lý khi không thao tác để tự hiện header
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      if (!isHeaderVisible.current) {
        isHeaderVisible.current = true;
        forceCheckScroll.current = true;
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }
      inactivityTimer.current = null;
    }, 500);
  }, [controls]);

  useEffect(() => {
    lastScrollY.current = window.scrollY; // Cập nhật vị trí scroll ngay khi tải trang
    // 🚀 Khi load trang, đảm bảo header HIỆN ra trước
    isHeaderVisible.current = true; // Đặt lại giá trị ref

    // Set initial page top state
    setIsAtPageTop(window.scrollY === 0);

    window.addEventListener("scroll", handleScroll, { passive: true });

    const interactionEvents = ["mousemove", "keydown"];

    if (!dataFmrpPages.includes(pathname)) {
      // window.addEventListener('mousemove', resetInactivityTimer);
      // window.addEventListener('keydown', resetInactivityTimer);

      interactionEvents.forEach((evt) =>
        window.addEventListener(evt, resetInactivityTimer)
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (!dataFmrpPages.includes(pathname)) {
        // window.removeEventListener('mousemove', resetInactivityTimer);
        // window.removeEventListener('keydown', resetInactivityTimer);

        interactionEvents.forEach((evt) =>
          window.removeEventListener(evt, resetInactivityTimer)
        );
      }
    };
  }, [handleScroll, resetInactivityTimer, pathname]);

  // ✨ BỔ SUNG THÊM EFFECT DƯỚI ĐÂY
  useEffect(() => {
    isHeaderVisible.current = true;
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    });
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    if (!isStateClientLayout?.header?.isShowMenuMobileFoso) {
      body.style.overflow = "auto"; // Cho phép cuộn
      closeModal();
    } else {
      body.style.overflow = "hidden"; // Chặn cuộn
      openModal();
    }
  }, [isStateClientLayout?.header?.isShowMenuMobileFoso]);

  // bật/tắt menu dưới tablet/mobile
  const handleToggleMenu = useCallback(
    (action: string): void => {
      if (action === "on") {
        queryKeyIsStateClientLayout({
          header: {
            ...isStateClientLayout?.header,
            isShowMenuMobileFoso: true,
          },
        });
      } else if (action === "off") {
        queryKeyIsStateClientLayout({
          header: {
            ...isStateClientLayout?.header,
            isShowMenuMobileFoso: false,
          },
        });
      }
    },
    [isStateClientLayout?.header]
  );

  // chuyển đổi ngôn ngữ
  const handleChangeLanguage = useCallback(
    async (value: string) => {
      const selectedCountry = dataLanguageOptions.find(
        (option) => option.code === value
      );
      if (!selectedCountry) return;

      queryKeyIsStateClientLayout({
        header: {
          ...isStateClientLayout?.header,
          selectedCodeCountry: selectedCountry,
        },
      });

      setCookie(KEY_COOKIES.WEBSITE_LANG, value);
    },
    [isStateClientLayout?.header, setCookie]
  );

  // bật/tắt dialog
  const handleOpenDialog = useCallback(
    (status: string, type_device: string) => {
      if (type_device === "desktop") {
        setOpenDialogCustom(true);
        setStatusDialog(status);
      } else {
        queryKeyIsStateClientLayout({
          header: {
            ...isStateClientLayout?.header,
            isShowMenuMobileFoso: false,
          },
        });
        setTimeout(() => {
          setOpenDialogCustom(true);
          setStatusDialog(status);
        }, 500);
      }
    },
    [isStateClientLayout?.header, setOpenDialogCustom, setStatusDialog]
  );

  // bật/tắt sheet
  const handleOpenSheet = useCallback(
    (status: string, type_device: string) => {
      if (type_device === "desktop") {
        setOpenSheetCustom(true);
        setStatusSheet(status);
      } else {
        queryKeyIsStateClientLayout({
          header: {
            ...isStateClientLayout?.header,
            isShowMenuMobileFoso: false,
          },
        });
        setTimeout(() => {
          setOpenSheetCustom(true);
          setStatusSheet(status);
        }, 500);
      }
    },
    [isStateClientLayout?.header, setOpenSheetCustom, setStatusSheet]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <motion.div
        initial={{ y: 0, opacity: 1 }} // 🚀 Đảm bảo header HIỆN khi vào trang
        // initial={{ y: pathname === "/" ? -100 : 0, opacity: pathname === "/" ? 0 : 1 }}
        animate={controls}
        // 4xl:mt-36 2xl:mt-24 lg:mt-20 mt-14 thay class này cho mt-4 điều kiện true khi có banner ở trên đầu web
        className={`${
          isStateClientLayout?.header?.isShowMenuMobileFoso
            ? "mx-0"
            : `md:mx-8 mx-4 ${!isDuAnPage && isAtPageTop ? "mt-4" : "mt-4"} `
        } 3xl:mx-60 xxl:mx-40 xl:mx-32 lg:mx-10 4xl:px-[10%] z-50  lg:bg-[#FFFFFF]/65 bg-[#FFFFFF]/50 !backdrop-filter !backdrop-blur-[25px] 3xl:px-12 xxl:px-10 lg:px-8 px-6 xxl:py-3 py-2 lg:space-y-0 -space-y-4 pointer-events-auto lg:rounded-[40px] rounded-xl custom-transition
                `}
        style={{
          willChange: "transform, opacity", // Tối ưu hóa GPU rendering
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Đảm bảo nền trong suốt
          boxShadow:
            "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)",
        }}
      >
        {isVisibleTablet ? (
          // màn hình mobile, tablet
          <FosoTabletHeader
            dataHeader={dataHeader}
            handleToggleMenu={handleToggleMenu}
            handleChangeLanguage={handleChangeLanguage}
            handleOpenDialog={handleOpenDialog}
          />
        ) : (
          // màn hình desktop
          <FosoDesktopHeader
            dataHeader={dataHeader}
            handleToggleMenu={handleToggleMenu}
            handleChangeLanguage={handleChangeLanguage}
            handleOpenDialog={handleOpenDialog}
            handleOpenSheet={handleOpenSheet}
          />
        )}
      </motion.div>
    </header>
  );
};

export default FosoHeaderContainer;
