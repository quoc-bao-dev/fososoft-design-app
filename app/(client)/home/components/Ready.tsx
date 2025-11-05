"use client";
import ButtonAnimationNew from "@/components/common/button/ButtonAnimationNew";
import ArrowUpRightLinearBlueIcon from "@/components/icons/common/ArrowUpRightLinearBlueIcon";
import { IMAGES } from "@/constants/Images";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: IMAGES.edit,
    title: "Thiết Kế App iOS & Android",
    description:
      "Giúp doanh nghiệp mở rộng khách hàng và tối ưu trải nghiệm người dùng.",
    style: "hover:shadow-[0px_4px_20px_-5px_#C5F0BE,0px_4px_20px_-5px_#C5F0BE]",
  },
  {
    icon: IMAGES.pencil,
    title: "Thiết Kế Mini App",
    description:
      "Tiết kiệm chi phí, thời gian nhưng vẫn mang lại trải nghiệm tốt khi sử dụng.",
    style:
      "hover:shadow-[0px_4px_20px_-5px_#0375F340,0px_4px_20px_-5px_#0375F340]",
  },
  {
    icon: IMAGES.calendar,
    title: "Thiết Kế Web App",
    description:
      "Giao diện thân thiện, tương thích đa nền tảng và tối ưu chi phí vận hành.",
    style: "hover:shadow-[0px_4px_20px_-5px_#FFD4D3,0px_4px_20px_-5px_#FFD4D3]",
  },
];

const Ready = () => {
  return (
    <div className="relative">
      <div className="custom-container-new py-3 xl:py-24 flex flex-col gap-3 justify-center items-center">
        <h2 className="text-title-section-small text-[#050505] font-extrabold capitalize">
          Nền tảng thiết kế app{" "}
          <span
            style={{
              background:
                "linear-gradient(to bottom, #85EEB3 0%, #53B086 100%), radial-gradient(219.3% 1471.82% at 24.6% -30.56%, rgba(84, 171, 177, 0) 0%, rgba(84, 171, 177, 0.409141) 34.37%, rgba(133, 238, 179, 0.71) 51.52%, rgba(84, 171, 177, 0) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FOSO
          </span>{" "}
          cung cấp
        </h2>
        <p className="text-base-default text-light-900 font-semibold">
          Bạn đang cần tư vấn thêm về báo giá dịch vụ, hướng dẫn sử dụng hoặc
          trở thành đối tác FOSO - Chúng tôi luôn sẵn sàng kết nối cùng bạn!
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 pt-0 lg:pt-9 pb-0 lg:pb-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex lg:flex-col gap-6 p-3 lg:p-4 xl:p-6 rounded-3xl bg-white cursor-pointer shadow-[0px_4px_20px_-5px_#77729326,0px_4px_20px_-5px_#7772930D] ${service.style}`}
              >
                <Image
                  src={service.icon}
                  alt="calendar"
                  width={100}
                  height={100}
                  className="size-[67px] xl:size-[100px]"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-title-section-feature-small text-[#050505] font-extrabold capitalize">
                    {service.title}
                  </h3>
                  <p className="text-base-default-feature !text-xs text-light-900 font-medium">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ButtonAnimationNew
            title="Tư vấn ngay"
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
      <Image
        src={IMAGES.blurOrange}
        alt="blurOrange"
        width={1000}
        height={1000}
        className="absolute -top-[55%] left-0 -translate-x-[40%] w-[40%] object-cover z-[-1] pointer-events-none"
      />
      <Image
        src={IMAGES.blurOrange}
        alt="blurOrange"
        width={1000}
        height={1000}
        className="absolute -bottom-[50%] right-0 translate-x-[40%] w-[40%] object-cover z-[-1] pointer-events-none"
      />
    </div>
  );
};

export default Ready;
