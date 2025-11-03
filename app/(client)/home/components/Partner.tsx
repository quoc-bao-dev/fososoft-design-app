"use client";
import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import ArrowUpRightLinearBlueIcon from "@/components/icons/common/ArrowUpRightLinearBlueIcon";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { useResizeStore } from "@/stores/useResizeStore";
import { useSheetStores } from "@/stores/useSheetStores";
import LogoMarquee from "./LogoMarquee";

type Props = {};

const Partner = (props: Props) => {
  const { setOpenSheetCustom, setStatusSheet } = useSheetStores();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { isVisibleTablet } = useResizeStore();

  const logos = [
    "/logo/partner/partner-logo1.svg",
    "/logo/partner/partner-logo2.svg",
    "/logo/partner/partner-logo3.svg",
    "/logo/partner/partner-logo4.svg",
    "/logo/partner/partner-logo5.svg",
    "/logo/partner/partner-logo6.svg",
    "/logo/partner/partner-logo7.svg",
    "/logo/partner/partner-logo8.svg",
    "/logo/partner/partner-logo9.svg",
    "/logo/partner/partner-logo10.svg",
    "/logo/partner/partner-logo11.svg",
    "/logo/partner/partner-logo12.svg",
    "/logo/partner/partner-logo13.svg",
    "/logo/partner/partner-logo14.svg",
    "/logo/partner/partner-logo15.svg",
    "/logo/partner/partner-logo16.svg",
    "/logo/partner/partner-logo17.svg",
    "/logo/partner/partner-logo18.svg",
    "/logo/partner/partner-logo19.svg",
    "/logo/partner/partner-logo20.svg",
    "/logo/partner/partner-logo14.svg",
  ];

  return (
    <div className="py-0 xl:py-12 bg-white px-2 xl:px-0">
      <div className="custom-container-new flex flex-col items-center justify-center 3xl:gap-12 xl:gap-10 gap-6 relative z-[1]">
        <div className="space-x-2 font-extrabold">
          <span className="text-title-section-small text-[#1A2025] capitalize">
            Khách hàng và đối tác
          </span>
        </div>

        <LogoMarquee logos={logos} />

        <ButtonAnimationNew
          title="Trở Thành Khách Hàng Của Chúng Tôi"
          icon={
            <div className="text-[#10805B] 2xl:size-12 md:size-10 size-9 rounded-full capitalize flex items-center justify-center xl:group-hover:bg-[#F3654A] group-hover:text-white duration-500 transition-colors">
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }} // Bay chéo lên phải và xuống lại
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {isHovered ? (
                  <ArrowUpRightIcon className="2xl:size-6 md:size-5 size-4 text-[#F3654A] group-hover:text-white " />
                ) : (
                  <ArrowUpRightLinearBlueIcon className="2xl:size-6 md:size-5 size-4 text-[#F3654A] " />
                )}
              </motion.div>
            </div>
          }
          onMouseEnter={() => setIsHovered(true)} // Khi hover vào button
          onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi button
          onClick={() => {
            setOpenSheetCustom(true);
            setStatusSheet("contact");
          }}
          reverse={true}
          className={`border border-[#F3654A] flex items-center gap-2 3xl:!text-lg xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group xl:hover:!bg-[#024EBC]/40 hover:!backdrop-blur-[100px] hover:!backdrop-filter font-medium pl-6 pr-1 py-1 rounded-[40px] lg:w-fit w-full
            ${
              !isVisibleTablet
                ? "border-gradient-button-no-bg-orange"
                : "border-[#F3654A] text-[#F3654A]"
            }`}
          style={{
            background: isVisibleTablet
              ? ""
              : "linear-gradient(77.74deg, #F3654A 11.85%, #F3654A 20.65%, #F3654A 29.45%, #F3654A 38.25%, #F3654A 47.05%, #F3654A 55.84%, #F3654A 64.64%, #F3654A 73.44%, #F3654A 82.24%, #F3654A 91.04%)",
            WebkitBackgroundClip: isVisibleTablet ? "" : "text",
            WebkitTextFillColor: isVisibleTablet ? "" : "transparent",
            WebkitBackdropFilter: "blur(15px)", // Safari
            boxShadow:
              "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default Partner;
