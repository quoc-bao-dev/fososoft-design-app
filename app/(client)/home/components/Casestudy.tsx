"use client"
import ButtonAnimationNew from '@/components/common/button/ButtonAnimationNew';
import MediaCard from '@/components/common/card/media/MediaCard';
import { Skeleton } from '@/components/ui/skeleton';
import ArrowUpRightIcon from '@/components/icons/common/ArrowUpRightIcon';
import ArrowUpRightLinearBlueIcon from '@/components/icons/common/ArrowUpRightLinearBlueIcon';
import { uuidv4 } from '@/lib/uuid';
import { useProjectList } from '@/managers/api/projects';
import { useResizeStore } from '@/stores/useResizeStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {}

const mediaList = [
  {
    id: uuidv4(),
    image: "/example/blog/ket-noi-dau-tu.webp",
    date: "Wed Aug 14 2024 00:00:00 GMT+0000 (UTC)",
    category: "Kết nối đầu tư",
    title: "FOSO ra mắt App Quản lý xưởng cải thiện tiến độ sản xuất",
    link: "https://ketnoidautu.net/foso-ra-mat-app-quan-ly-xuong-cai-thien-tien-do-san-xuat-trong-quan-ly-nha-may-a32964.html",
  },
  {
    id: uuidv4(),
    image: "/example/blog/doanh-nhan-online.webp",
    date: "Wed Aug 14 2024 00:00:00 GMT+0000 (UTC)",
    category: "Doanh nhân Sài Gòn online",
    title: "Doanh nghiệp chuyển đổi số mạnh mẽ cùng giải pháp phần mềm FMRP",
    link: "https://doanhnhansaigon.vn/doanh-nghiep-chuyen-doi-so-manh-me-cung-giai-phap-phan-mem-fmrp-304651.html?",
  },
  {
    id: uuidv4(),
    image: "/example/blog/cong-nghe-doi-song.webp",
    date: "Wed Aug 14 2024 00:00:00 GMT+0000 (UTC)",
    category: "Công nghệ đời sống",
    title: "Quản lý sản xuất thông minh với giải pháp phần mềm FMRP",
    link: "https://congnghedoisong.net/quan-ly-san-xuat-thong-minh-voi-giai-phap-phan-mem-fmrp-a37796.html",
  },
]

const Casestudy = (props: Props) => {
  const swiperRef = useRef<any>(null);
  const router = useRouter()
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { isVisibleTablet } = useResizeStore()

  const { data: projectList, isLoading, isError } = useProjectList({
    params: {
      current_page: 1,
      per_page: 3,
      is_featured: true,
    },
  });

  if (projectList?.data?.length === 0 || isError) {
    return null
  }

  const customPagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class=${className}></span>`
    },
  }

  // Skeleton component inline
  const MediaCardSkeleton = () => (
    <div className="col-span-1 rounded-3xl overflow-hidden bg-white shadow-[0px_1px_2px_0px_#1212170F,0px_1px_3px_0px_#1212171A]">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square rounded-t-3xl" />

      <div className="flex flex-col gap-2 p-4 bg-white rounded-b-3xl">
        {/* Date and category skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </div>
  )

  return (
    <div className='relative custom-padding-section2 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF5F0_10.1%,#FFF5F0_90.89%,#FFFFFF_100.99%)]'>
      <div className='custom-container px-2 xl:px-0 flex flex-col items-center justify-center 3xl:gap-12 xl:gap-10 gap-8 relative z-[1]'>
        <div className='space-x-2 font-extrabold text-center'>
          <span className='text-title-section-small text-[#1A2025] capitalize'>Những casestudy mà {' '}
            <span
              className='text-title-section-small uppercase'
              style={{
                background: "linear-gradient(107.4deg, #9DFFB3 0%, #1AA37A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FOSO
            </span>  {' '}
            đồng hành
          </span>
        </div>

        {
          isVisibleTablet
            ?
            <div className='w-full '>
              {isLoading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <MediaCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              ) : (
                <Swiper
                  slidesPerView={4}
                  spaceBetween={60}
                  modules={[Pagination, Autoplay]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  // loop
                  autoplay={true}
                  speed={1000}
                  pagination={customPagination}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 30
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 30
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 30
                    },
                    1920: {
                      slidesPerView: 4,
                      spaceBetween: 60,
                    }
                  }}
                  className='custom-swiper-pagination flex flex-col gap-8'
                  allowTouchMove={true}
                >
                  {
                    projectList && projectList?.data?.map((media: any) => (
                      <SwiperSlide
                        key={`media-${media?.id}`}
                      >
                        <MediaCard media={media} />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              )}
            </div>
            :
            <div className='grid grid-cols-3 3xl:gap-6 gap-4 w-full'>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <MediaCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : (
                projectList && projectList?.data?.map((media, index) => (
                  <React.Fragment key={`media-${media?.id}`}>
                    <MediaCard media={media} />
                  </React.Fragment>
                ))
              )}
            </div>
        }

        <ButtonAnimationNew
          title="Xem Tất Cả"
          icon={
            <div className="2xl:size-12 md:size-10 size-9 rounded-full capitalize flex items-center justify-center group-hover:bg-[#024EBC] group-hover:text-white duration-500 transition-colors">
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }} // Bay chéo lên phải và xuống lại
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {isHovered ? <ArrowUpRightIcon className="2xl:size-6 md:size-5 size-4 text-white" /> : <ArrowUpRightLinearBlueIcon className="2xl:size-6 md:size-5 size-4 text-[#0375F3] group-hover:text-white" />}
              </motion.div>
            </div>
          }
          onMouseEnter={() => setIsHovered(true)} // Khi hover vào button
          onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi button
          onClick={() => {
            router.push("/du-an")
          }}
          reverse={true}
          className="border-gradient-button-no-bg-fmrp flex items-center gap-2 3xl:!text-lg xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group hover:!bg-[#024EBC]/40 hover:!backdrop-blur-[100px] hover:!backdrop-filter font-medium pl-6 pr-1 py-1 rounded-[40px] lg:w-fit w-full"
          style={{
            background: "linear-gradient(77.74deg, #0375F3 11.85%, #036EEA 20.65%, #0267E1 29.45%, #0261D7 38.25%, #025ACE 47.05%, #0254C5 55.84%, #024EBC 64.64%, #0148B3 73.44%, #0142A9 82.24%, #013DA0 91.04%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitBackdropFilter: "blur(15px)", // Safari
            boxShadow: "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)"
          }}
        />
      </div>

    </div>
  )
}

export default Casestudy