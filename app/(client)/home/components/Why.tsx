'use client'
import { IMAGES } from '@/constants/Images'
import { useResizeStore } from '@/stores/useResizeStore'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const reasons = [
  {
    title: '1. Dày dặn kinh nghiệm',
    description:
      'Với hơn +9 năm kinh nghiệm thiết kế app, FOSO tự tin đáp ứng mọi nhu cầu của doanh nghiệp',
    icon: IMAGES.medal,
    positionClass: 'xl:absolute xl:top-[10%] xl:right-[68%]',
    size: 'size-[50px] xl:size-[53px] 2xl:size-[60px]',
    align: 'right' as const,
  },
  {
    title: '2. Quy trình rõ ràng',
    description:
      'Minh bạch bước lập kế hoạch dự án, triển khai thiết kế, lập trình cho đến khi hoàn thiện',
    icon: IMAGES.markerTick,
    positionClass: 'xl:absolute xl:top-[45%] xl:right-[77%]',
    size: 'size-[50px] xl:size-[53px] 2xl:size-[60px]',
    align: 'right' as const,
  },
  {
    title: '3. Chi phí hợp lý',
    description:
      'Bảng thông tin báo giá được cập nhật phù hợp nhất so với nhu cầu của từng doanh nghiệp',
    icon: IMAGES.handCoin,
    positionClass: 'xl:absolute xl:top-[80%] xl:right-[72%]',
    size: 'size-[50px] xl:size-[53px] 2xl:size-[60px]',
    align: 'right' as const,
  },
  {
    title: '4. Ngành nghề triển khai đa dạng',
    description:
      'Đội ngũ giàu kinh nghiệm chuyên môn, đáp ứng đa dạng mọi dự án',
    icon: IMAGES.bag,
    positionClass: 'xl:absolute xl:top-[10%] xl:left-[68%]',
    size: 'size-[50px] xl:size-[53px] 2xl:size-[60px]',
    align: 'left' as const,
  },
  {
    title: '5. Thấu hiểu khách hàng',
    description:
      'Tiếp nhận và giải quyết nhu cầu khách hàng nhanh chóng và kịp thời',
    icon: IMAGES.humanResources,
    positionClass: 'xl:absolute xl:top-[45%] xl:left-[77%]',
    size: 'size-[48px] 2xl:size-[53px]',
    align: 'left' as const,
  },
  {
    title: '6. Hỗ trợ vận hành',
    description:
      'Hỗ trợ quá trình vận hành và các hoạt động triển khai ngoài thực tế',
    icon: IMAGES.rivet,
    positionClass: 'xl:absolute xl:top-[80%] xl:left-[72%]',
    size: 'size-[48px] 2xl:size-[53px]',
    align: 'left' as const,
  },
]
const Why = () => {
  const { isVisibleMobile, isVisibleTablet, isVisibleDesktopLG } = useResizeStore()


  return (
    <div className='relative'>
      <div className='custom-container-new'>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <h2 className='text-title-section-small text-center text-[#050505] font-extrabold capitalize'>
            Tại sao {' '}
            <span className='text-title-section-medium-fit-leading'
              style={{
                background: "linear-gradient(to bottom, #F3654A 0%, #FFB9AC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Doanh nghiệp
            </span> {' '} nên <br className=' xl:hidden' /> Thiết kế<br className='hidden xl:block' /> Mobile App tại{' '}
            <span className='text-title-section-medium-fit-leading'
              style={{
                background: "linear-gradient(to bottom, #85EEB3 0%, #53B086 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              FOSO
            </span>
          </h2>
          <p className='text-base-default text-center xl:text-left text-light-900 font-semibold'>
            Tại FOSO, chúng tôi biến mục tiêu kinh doanh của bạn thành trải nghiệm di động mượt mà.
          </p>
        </div>
        <motion.div
          className='relative mt-4 flex gap-3 xl:justify-center xl:items-center overflow-x-auto xl:overflow-visible'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
        >
          <Image src={IMAGES.whyBanner} alt='whyBanner' width={1000} height={1000} className='hidden xl:block w-[40%]' />

          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className={`${reason.positionClass} flex flex-col xl:flex-row items-center xl:items-start gap-5 xl:gap-2 p-3 xl:p-0 rounded-[20px] bg-gradient-to-r from-[#FF707040] to-[#FFFFFF33] min-w-[165px] border-2 border-[#F48A8A99] xl:border-0 xl:from-transparent xl:to-transparent`}
              variants={{
                hidden: {
                  opacity: 0
                },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    delay: index < 3 ? index * 0.4 : (index - 3) * 0.4
                  }
                }
              }}
            >
              {(reason.align === 'left' || isVisibleMobile || isVisibleTablet || isVisibleDesktopLG) && (
                <Image src={reason.icon} alt='icon' width={1000} height={1000} className={reason.size} />
              )}
              <div className={`flex flex-col gap-2 ${reason.align === 'right' ? 'xl:items-end' : 'xl:items-start'}`}>
                <h3 className='text-xs md:text-sm xl:text-xl text-[#424150] xl:text-orange-700 font-bold xl:whitespace-nowrap'>
                  {reason.title}
                </h3>
                <p className={`text-sm-default !text-xs text-justify ${reason.align === 'right' ? 'xl:text-right' : 'xl:text-left'} text-light-900 font-semibold`}>
                  {reason.description}
                </p>
              </div>
              {(reason.align === 'right' && !isVisibleMobile && !isVisibleTablet && !isVisibleDesktopLG) && (
                <Image src={reason.icon} alt='icon' width={1000} height={1000} className={reason.size} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Image src={IMAGES.blurOrange} alt="blurOrange" width={1000} height={1000} className='absolute -bottom-[35%] left-0 -translate-x-[30%] w-[50%] object-cover z-[-1] pointer-events-none' />
    </div>
  )
}

export default Why
