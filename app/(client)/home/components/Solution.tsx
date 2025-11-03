"use client"
import NailIcon from '@/components/icons/design-app/NailIcon'
import SellIcon from '@/components/icons/design-app/SellIcon'
import ServiceIcon from '@/components/icons/design-app/ServiceIcon'
import SocialIcon from '@/components/icons/design-app/SocialIcon'
import SystemIcon from '@/components/icons/design-app/SystemIcon'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGetAppMobile } from '@/managers/api/products'
import { Skeleton } from '@/components/ui/skeleton'

const solution = [
  {
    icon: <SellIcon />,
    title: 'Bán hàng',
    description: 'Bán hàng',
  },
  {
    icon: <ServiceIcon />,
    title: 'Dịch vụ',
    description: 'Dịch vụ',
  },
  {
    icon: <NailIcon />,
    title: 'Nail & Spa',
    description: 'Nail & Spa',
  },
  {
    icon: <SocialIcon />,
    title: 'Mạng xã hội',
    description: 'Mạng xã hội',
  },
  {
    icon: <SystemIcon />,
    title: 'Hệ thống nội bộ',
    description: 'Hệ thống nội bộ',
  },
]

const Solution = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { data: solutionData, isLoading, isError } = useGetAppMobile();
  const solution = (solutionData?.profession as Array<any>) ?? [];

  const handleTabClick = (index: number) => {
    if (index === activeTab || isAnimating) return

    setIsAnimating(true)

    // Thu lại border-b ở button cũ
    setTimeout(() => {
      setActiveTab(index)
      // Mở ra border-b ở button mới
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 150)
  }

  if (isError || solution.length === 0) { return null }

  return (
    <div className='relative'>
      <div className='custom-container-new flex flex-col items-center justify-center 3xl:gap-11 xl:gap-10 lg:gap-8 gap-4'>
        <div className='flex flex-col gap-3 xl:gap-10 justify-center items-center'>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-title-section-medium-fit-leading text-center text-[#050505] font-extrabold capitalize'>
              <span
                style={{
                  background: "linear-gradient(to bottom, #F3654A 0%, #FFB9AC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                giải pháp
              </span>{" "}
              toàn diện cho đa ngành nghề</h2>
            <p className='text-base-default text-center xl:text-left text-light-900 font-semibold'>Chuyển đổi linh hoạt, thiết kế riêng cho mỗi mô hình kinh doanh.</p>
          </div>
          <div className='relative flex flex-wrap justify-center gap-y-0 gap-9'>
            {isLoading ? (
              <div className='flex flex-wrap justify-center gap-y-0 gap-9'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className='w-24 h-6' />
                ))}
              </div>
            ) : (
              solution.map((item, index) => (
                <button
                  key={index}
                  className='py-2 xl:py-3 border-b border-transparent flex gap-2 items-center relative group'
                  onClick={() => handleTabClick(index)}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={2000}
                    height={2000}
                    className={`size-4 xl:size-6 flex-shrink-0 group-hover:text-orange-700 transition-all duration-300 
                    ${activeTab === index ? 'text-orange-700' : 'text-light-700'}`}
                  />
                  {/* <span
                    className={`
                      size-4 xl:size-6 flex-shrink-0 bg-current transition-all duration-300
                      ${activeTab === index ? 'text-orange-700' : 'text-light-700'}
                      group-hover:text-orange-700
                    `}
                    style={{
                      WebkitMaskImage: `url(${item.icon})`,
                      maskImage: `url(${item.icon})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  /> */}
                  <span className={`text-base-default font-semibold whitespace-nowrap group-hover:text-orange-700 transition-all duration-300 ${activeTab === index ? 'text-orange-700' : 'text-light-700'}`}>
                    {item.name}
                  </span>
                  <AnimatePresence>
                    {activeTab === index && (
                      <motion.div
                        className='absolute bottom-0 left-0 right-0 h-[2px] bg-orange-700'
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                        style={{ originX: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              )))}
          </div>
          {isLoading ? (
            <div className="relative w-full">
              <Skeleton className="w-full h-64 xl:h-96 rounded-2xl" />
            </div>
          ) : (
            solution.length > 0 && (
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {/* Mobile Image */}
                    <Image
                      src={solution[activeTab]?.image_mobile || "/design-app/solutionBanner.png"}
                      alt={solution[activeTab]?.name || 'solution'}
                      width={2000}
                      height={2000}
                      className='w-full object-cover rounded-2xl block md:hidden'
                    />
                    {/* Desktop Image */}
                    <Image
                      src={solution[activeTab]?.image_desktop || "/design-app/solutionBanner.png"}
                      alt={solution[activeTab]?.name || 'solution'}
                      width={2000}
                      height={2000}
                      className='w-full object-cover rounded-2xl hidden md:block'
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Solution
