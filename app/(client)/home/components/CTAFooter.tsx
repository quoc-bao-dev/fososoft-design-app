"use client";
import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import ArrowUpRightIcon from "@/components/icons/common/ArrowUpRightIcon";
import ArrowUpRightLinearBlueIcon from "@/components/icons/common/ArrowUpRightLinearBlueIcon";
import { IMAGES } from "@/constants/Images";
import { useResizeStore } from "@/stores/useResizeStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


const CTAFooter = () => {
  return (
    <section className="relative xl:custom-padding-section">
      <div className="custom-container flex flex-col-reverse lg:flex-row gap-2 lg:gap-[72px] justify-center items-center">
        <div className="w-full">
          <Image
            width={800}
            height={800}
            alt="demo"
            src={IMAGES.ctaFooter}
            className="size-full object-cover "
          />
        </div>
        <div className="mt-[12%] w-full pb-9 xl:pb-0 px-2 xl:px-0 3xl:max-w-[37%] 2xl:max-w-[37%] xxl:max-w-[40%] xl:max-w-[45%] lg:max-w-[48%] flex flex-col shrink-0 lg:items-start lg:justify-normal justify-center lg:text-start text-center 3xl:gap-8 2xl:gap-6 gap-4">
          <div className="xxl:space-y-2 space-y-5">
            <h2 className="text-title-section-small text-[#1A2025] text-left font-extrabold capitalize">
              Cùng FOSO Nâng cấp vận hành, bứt phá doanh thu
            </h2>
            <p className="text-left">Hợp tác cùng FOSO để kiến tạo giải pháp số đột phá cho doanh nghiệp – bắt đầu ngay hôm nay!</p>
          </div>

          <ButtonAnimationNew
            title="Liên hệ ngay"
            icon={
              <div className="2xl:size-12 md:size-10 size-[22px] rounded-full capitalize flex items-center justify-center bg-white duration-500 transition-colors">
                <motion.div
                  initial={{ x: 0, y: 0 }}
                  // animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }} // Bay chéo lên phải và xuống lại
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <ArrowUpRightIcon className="text-[#F3654A] 2xl:size-6 md:size-5 size-4 hidden group-hover:block" />
                  <ArrowUpRightLinearBlueIcon className="text-[#F3654A] 2xl:size-6 md:size-5 size-4 group-hover:hidden" />
                </motion.div>
              </div>
            }
            // onMouseEnter={() => setIsHovered(true)} // Khi hover vào button
            // onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi button
            onClick={() => {
              window.open("https://zalo.me/2281264205827497572");
            }}
            reverse={true}
            className="border-gradient-orange xl:pl-6 xl:p-1 pl-3 p-2 text-white lg:mr-0 mr-1 flex items-center text-center gap-2 3xl:!text-lg xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group hover:!backdrop-blur-[100px] hover:!backdrop-filter font-medium rounded-full w-fit"
            style={{
              boxShadow:
                "0px -1px 2px 0px #FFFFFF4D inset, 0px -2px 5px 1px #FFFFFF1F inset, 0px 1px 2px 0px #151A364D inset, 0px 2px 6px 0px #151A3626 inset, 0px -2px 14px 0px #FFFFFF26 inset, 0px 20px 26px -8px #0F163A26",
              background: "linear-gradient(90deg, #F3654A 0%, #FFB9AC 100%)",
              border: "1px solid #FAC1B7",
            }}
            whileHover={{
              background: [
                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #F3654A 10.03%, #FFB9AC 107.74%)",
                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(0deg, #F3654A 10.03%, #FFB9AC 107.74%)",
                "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #F3654A 10.03%, #FFB9AC 107.74%)",
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
      <div className="absolute bottom-0 left-0 h-full xl:h-[70%] w-full overflow-hidden pointer-events-none">
        <Image src={IMAGES.blurOrangeLarge} alt="blurOrange" width={1000} height={1000} className='absolute top-[10%] right-[0%] w-[200%] xl:w-[40%] object-cover z-[-1] pointer-events-none' />
        <Image src={IMAGES.blurOrange} alt="blurOrange" width={1000} height={1000} className='absolute -top-[10%] left-0 -translate-x-[30%] w-full xl:w-[40%] object-cover z-[-1] pointer-events-none' />
        <Image src={IMAGES.blurOrange} alt="blurOrange" width={1000} height={1000} className='absolute -top-[10%] left-1/2 -translate-x-[50%] w-full xl:w-[40%] object-cover z-[-1] pointer-events-none' />
      </div>
    </section>
  );
};

export default CTAFooter;
