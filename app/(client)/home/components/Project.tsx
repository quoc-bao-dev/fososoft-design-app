"use client";

import { useProjectListRelatedApp } from "@/managers/api/projects/useProjectListRelatedApp";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import ProjectSkeleton from "./ProjectSkeleton";

const ShowMoreProject = ({ dataProjects }: { dataProjects: any[] }) => {
  return (
    <motion.div
      className="hidden xl:block py-3 px-6 my-auto mx-auto w-[217px] aspect-square rounded-[20px] bg-gradient-to-r from-white to-white/20 shadow-[5px_5px_20px_0px_#EB575740] relative"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: dataProjects.length * 0.2,
        ease: "easeOut",
      }}
    >
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[rgba(208,58,9,0.5)] to-[rgba(244,138,138,0.3)] p-[2px] pointer-events-none">
        <div className="w-full h-full rounded-[18px] bg-gradient-to-r from-white to-white/20"></div>
      </div>
      <div className="h-full relative z-10 flex flex-col gap-5 items-center justify-center">
        <p className="text-title font-extrabold capitalize text-[#050505] text-center">
          Xem thêm các dự án khác
        </p>
        <Link
          href="/du-an"
          className="text-button border-gradient-button-no-bg-orange text-base-default text-[#25272A] font-semibold bg-white py-2 px-5 rounded-full border border-light-300 shadow-[0px_1px_2px_0px_#B3ADAD0D,0px_4px_4px_0px_#B3ADAD0A,0px_9px_5px_0px_#B3ADAD08,0px_16px_6px_0px_#B3ADAD03,0px_25px_7px_0px_#B3ADAD00]"
        >
          Xem thêm
        </Link>
      </div>
    </motion.div>
  );
};

const Project = () => {
  const { data: projectList, isLoading } = useProjectListRelatedApp({
    params: {
      current_page: 1,
      per_page: 5,
    },
  });

  const dataProjects = useMemo(() => {
    const items = projectList?.data ?? [];
    return items.map((item) => ({
      logo: item.icon_featured || item.image_featured,
      name: item.name,
      color: "text-[#1EAAB1]",
      image: item.image_featured,
      qr: item.qr_app,
      slug: item.slug,
    }));
  }, [projectList?.data]);

  if (dataProjects.length === 0) return null;

  return (
    <div className="relative flex flex-col gap-4 xl:gap-10">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="text-title-section-small text-center text-[#050505] font-extrabold capitalize">
          Các{" "}
          <span
            className="text-title-section-medium-fit-leading"
            style={{
              background:
                "linear-gradient(to bottom, #F3654A 0%, #FFB9AC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            dự án
          </span>{" "}
          mobile app nổi bật
        </h2>
        <p className="text-base-default text-center text-light-900 font-semibold">
          Với FOSO, bạn sẽ sở hữu ứng dụng chuyên nghiệp, đẹp mắt và tối ưu.
        </p>
      </div>

      {/* ================ Row 1 ================= */}
      {isLoading && <ProjectSkeleton items={5} />}
      {!isLoading && (
        <motion.div
          className="flex overflow-x-auto xl:overflow-visible items-center gap-y-10 gap-x-2 xl:gap-x-8 xl:flex-wrap md:justify-center xl:max-w-[1016px] mx-auto w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {dataProjects.map((project, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center shrink-0 min-w-[160px]  xl:shrink-0 xl:basis-[30%] "
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <div className="flex justify-center items-center w-fit gap-1.5 py-1.5 px-3 rounded-full bg-[#F9F9F9]">
                <Image
                  src={project.logo}
                  alt="logo"
                  width={300}
                  height={300}
                  className="w-[80px] xl:w-[140px] h-[20px] xl:h-[40px] object-contain"
                />
              </div>
              <div>
                <Image
                  src={project.image}
                  alt="kanow"
                  width={1000}
                  height={1000}
                  className="min-w-[114px] max-w-[114px] xl:min-w-[234px] xl:max-w-[234px] h-[204px] xl:h-[419px] object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 xl:gap-4 items-center justify-center">
                <Link
                  href={`/du-an/${project?.slug}`}
                  className="text-xs border-gradient-button-no-bg-orange xl:text-base font-bold bg-gradient-to-r from-[#F3654A] to-[#FFB9AC] transition-all duration-300 border border-orange-300 rounded-full py-1 xl:py-2 px-4 text-white shadow-[0px_-1px_2px_0px_#FFFFFF4D_inset,0px_-2px_5px_1px_#FFFFFF1F_inset,0px_1px_2px_0px_#151A364D_inset,0px_2px_6px_0px_#151A3626_inset,0px_-2px_14px_0px_#FFFFFF26_inset,0px_20px_26px_-8px_#0F163A26]"
                >
                  Xem chi tiết
                </Link>
                <Image
                  src={project.qr}
                  alt="qr"
                  width={1000}
                  height={1000}
                  className="size-10 xl:size-[82px] rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          ))}

          {dataProjects.length > 1 && (
            <ShowMoreProject dataProjects={dataProjects} />
          )}
        </motion.div>
      )}

      <Link
        href="/du-an"
        className="xl:hidden text-button w-fit mx-auto text-base-default text-[#25272A] font-semibold bg-white py-2 px-5 rounded-full border border-light-300 shadow-[0px_1px_2px_0px_#B3ADAD0D,0px_4px_4px_0px_#B3ADAD0A,0px_9px_5px_0px_#B3ADAD08,0px_16px_6px_0px_#B3ADAD03,0px_25px_7px_0px_#B3ADAD00]"
      >
        Xem thêm
      </Link>
    </div>
  );
};

export default Project;
