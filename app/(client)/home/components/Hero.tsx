'use client'
import AnimatedTitle from '@/components/common/animations/text/AnimatedTitle';
import AnimatedTyping from '@/components/common/animations/text/AnimatedTyping';
import CustomBreadcrumb from '@/components/common/breadcrumb/CustomBreadcrumb';
import ButtonAnimationNew from '@/components/common/button/ButtonAnimationNew';
import ArrowUpRightLinearBlueIcon from '@/components/icons/common/ArrowUpRightLinearBlueIcon';
import { IMAGES } from '@/constants/Images';
import { useGetAppMobile } from '@/managers/api/products';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const breadcrumbItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giải pháp", href: "#" },
  { label: "Thiết kế app mobile" },
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // Mặc định phải
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: appMobile, isLoading, isError } = useGetAppMobile();

  const slides = (appMobile?.slide as Array<any>) ?? [];
  // const slides = [
  //   {
  //     image: IMAGES.mockupApp,
  //     avatar: "/design-app/avt.png",
  //     name: "Mrs. Nguyên",
  //     position: "Giám Đốc NPCare Việt Nam",
  //     content: "Chúng tôi hài lòng về chất lượng dịch vụ App mà FOSO đã triển khai. Bên phía FOSO đã tư vấn chúng tôi nhiệt tình, tận tâm trong quá trình hoàn thành dự án."
  //   },
  // ];
  const slidesLength = slides.length;
  const panelCount = Math.max(slidesLength, 1);
  const angle = 360 / panelCount;
  const [rotation, setRotation] = useState(0); // độ xoay hiện tại của trụ 3D

  // Touch/Swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50; // Khoảng cách tối thiểu để tính là swipe

  const nextImage = () => {
    if (isAnimating || slidesLength === 0) return; // Đang animate hoặc không có dữ liệu thì không cho bấm
    setIsAnimating(true);
    setDirection(1); // Phải
    setRotation((prev) => prev - angle);
    setCurrentImageIndex((prev) => (prev + 1) % slidesLength);
  };

  const prevImage = () => {
    if (isAnimating || slidesLength === 0) return; // Đang animate hoặc không có dữ liệu thì không cho bấm
    setIsAnimating(true);
    setDirection(-1); // Trái
    setRotation((prev) => prev + angle);
    setCurrentImageIndex((prev) => (prev - 1 + slidesLength) % slidesLength);
  };

  const goToImage = (targetIndex: number) => {
    if (isAnimating || targetIndex === currentImageIndex || slidesLength === 0) return; // Đang animate, không có dữ liệu hoặc đã ở vị trí đó thì không làm gì
    setIsAnimating(true);

    const diff = targetIndex - currentImageIndex;
    const rotationDiff = -diff * angle; // Tính góc xoay cần thiết

    setDirection(diff > 0 ? 1 : -1); // Xác định hướng
    setRotation((prev) => prev + rotationDiff);
    setCurrentImageIndex(targetIndex);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage(); // Swipe trái -> chuyển sang hình tiếp theo
    } else if (isRightSwipe) {
      prevImage(); // Swipe phải -> chuyển về hình trước
    }
  };

  // Mouse event handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    touchEndX.current = e.clientX;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const heroPerTitle1a = useMemo(
    () => "Giải pháp ".split("").map((letter, index) => ({
      id: index,
      letter
    })),
    []
  );

  const heroPerTitle1b = useMemo(
    () => "mobile app".split("").map((letter, index) => ({
      id: index + 100,
      letter
    })),
    []
  );

  const heroPerTitle2 = useMemo(
    () => "toàn diện cho doanh nghiệp".split("").map((letter, index) => ({ id: index, letter })),
    []
  );

  return (
    <div className='relative'>
      <div className='custom-container-new h-full 3xl:pt-32 xl:pt-28 pt-28 flex flex-col justify-center items-center gap-6 py-12'>
        <CustomBreadcrumb items={breadcrumbItems} />
        <div className='min-h-[40vh] lg:min-h-[60vh] flex flex-col-reverse lg:flex-row gap-9 xl:gap-20 2xl:gap-24 items-center w-full h-full'>
          <div className='flex flex-col gap-9 w-full lg:w-[50%] xl:w-[40%]'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col justify-center items-center lg:items-start'>
                <div className='capitalize text-title-section-2 font-extrabold whitespace-nowrap'>
                  <AnimatedTitle
                    className='text-title-section-2 font-extrabold'
                    heroPerTitle={heroPerTitle1a}
                    delay={0.2}
                  />
                  <AnimatedTitle
                    className='text-title-section-2 font-extrabold text-[#F3654A]'
                    heroPerTitle={heroPerTitle1b}
                    delay={0.7}
                  />
                </div>
                <div className='capitalize text-title-section-2 font-extrabold whitespace-nowrap'>
                  <AnimatedTitle
                    className='text-title-section-2 font-extrabold'
                    heroPerTitle={heroPerTitle2}
                    delay={1}
                  />
                </div>
              </div>
              <p className='text-base-default w-full lg:w-[90%] text-center lg:text-left font-semibold text-light-900'>FOSO không chỉ thiết kế app, mà còn giúp bạn kể câu chuyện thương hiệu qua từng cú chạm – độc đáo, tinh tế và đậm chất riêng.</p>
            </div>
            <div className="flex flex-col xxs:flex-row items-center justify-center lg:justify-start gap-3 w-full">
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

              <Link
                href="/du-an"
                className="w-fit whitespace-nowrap border-gradient-button-no-bg-orange border-[#FAC1B7] bg-white rounded-full px-5 py-2.5 md:py-4 lg:py-[18px] xl:py-[13px] 2xl:py-[18px] text-sm font-medium shadow-[0px_1px_2px_0px_#B3ADAD0D,0px_4px_4px_0px_#B3ADAD0A,0px_9px_5px_0px_#B3ADAD08,0px_16px_6px_0px_#B3ADAD03,0px_25px_7px_0px_#B3ADAD00]"
              >
                Xem chi tiết dự án
              </Link>
            </div>
          </div>
          {slidesLength > 0 ? (
            <div className='relative w-full lg:w-[60%] h-full'>
              <div className='relative w-1/2 ml-[37.5%] mr-[12.5%]'>
                <div className='relative w-full aspect-[10/23] xl:aspect-[10/18] 2xl:aspect-[10/18]'>
                  {/* Scene 3D với perspective để tạo cảm giác trụ */}
                  <div
                    className='absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing'
                    style={{ perspective: '1200px' }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {isLoading || isError ? (
                      <div className='relative w-full h-full'>
                        <Skeleton className='w-full h-full rounded-xl' />
                      </div>
                    ) : (
                      <motion.div
                        className='relative w-full h-full'
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateY: rotation }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        onAnimationComplete={() => setIsAnimating(false)}
                      >
                        {slides?.map((item, index) => {
                          const radius = 200; // bán kính trụ (px)
                          return (
                            <div
                              key={index}
                              className='absolute inset-0 flex items-center justify-center'
                              style={{
                                transformStyle: 'preserve-3d',
                                transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                                backfaceVisibility: 'hidden',
                              }}
                            >
                              <Image
                                src={item.image}
                                alt={`mockup-${index}`}
                                priority={index === currentImageIndex}
                                width={1000}
                                height={1000}
                                className='w-[88%] xl:w-[80%] h-auto bg-transparent'
                              />
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className='hidden absolute top-1/2 -translate-y-1/2 -left-[30%] size-[50px] lg:size-[44px] 2xl:size-[60px] rounded-full bg-[#E96C6C]/60 hover:bg-[#E96C6C] cursor-pointer transition-all duration-500 lg:flex items-center justify-center p-3.5 2xl:p-4 border border-white/60'
                  onClick={prevImage}>
                  <Image src={IMAGES.arrowRightOrange} alt="arrowRightOrange" width={1000} height={1000} className='size-full rotate-180 shrink-0 object-contain' />
                </div>
                <div className='hidden absolute top-1/2 -translate-y-1/2 -right-[30%] size-[50px] lg:size-[44px] 2xl:size-[60px] rounded-full bg-[#E96C6C]/60 hover:bg-[#E96C6C] cursor-pointer transition-all duration-500 lg:flex items-center justify-center p-3.5 2xl:p-4 border border-white/60'
                  onClick={nextImage}>
                  <Image src={IMAGES.arrowRightOrange} alt="arrowRightOrange" width={1000} height={1000} className='size-full shrink-0 object-contain' />
                </div>

                {/* Indicator hiển thị vị trí hiện tại */}
                {slidesLength > 0 && (
                  <div className='hidden lg:flex absolute xl:-bottom-[13%] lg:-bottom-[8%] left-1/2 -translate-x-1/2 gap-2 items-center'>
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2.5 h-2.5 lg:w-3 lg:h-3 2xl:w-4 2xl:h-4 rounded-full transition-all duration-300 cursor-pointer ${index === currentImageIndex
                          ? 'bg-gradient-to-r from-[#F3654A] to-[#FFB9AC] w-5 lg:w-6 2xl:w-8'
                          : 'bg-[#888888] hover:bg-[#F3654A]/60 hover:scale-110'
                          }`}
                        onClick={() => goToImage(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className='absolute bottom-0 left-0 p-3 xl:p-4 pb-6 bg-orange-100 rounded-[20px] xl:rounded-[30px] w-[65%] xl:w-[55%] 2xl:w-1/2 h-fit' style={{ boxShadow: '0px 1px 3px -1px #0000004D, 0px 6px 10px -1px #32325D40' }}>
                {isLoading || isError ? (
                  <>
                    <div className='flex gap-2 items-center w-full h-fit'>
                      <Skeleton className='size-[43px] xl:size-[50px] 2xl:size-[60px] aspect-square rounded-full' />
                      <div className='flex flex-col gap-2 w-full'>
                        <Skeleton className='h-5 w-1/3' />
                        <Skeleton className='h-4 w-1/4' />
                      </div>
                    </div>
                    <Skeleton className='h-16 mt-3 w-full' />
                  </>
                ) : (
                  slidesLength > 0 && (
                    <>
                      <div className='flex gap-2 items-center p-2 pr-4 bg-gradient-to-r from-[#F3654A] to-[#FFB9AC] rounded-full w-full h-fit'>
                        <Image
                          src={slides[currentImageIndex].avatar}
                          alt="avatar"
                          width={1000}
                          height={1000}
                          className='size-[43px] xl:size-[50px] 2xl:size-[60px] rounded-full object-cover'
                        />
                        <div className='flex flex-col'>
                          <p className='text-title font-semibold text-white'>{slides[currentImageIndex].name}</p>
                          <p className='text-sxs-default text-white'>{slides[currentImageIndex].position}</p>
                        </div>
                      </div>
                      <AnimatedTyping
                        phrases={[slides[currentImageIndex].content]}
                        className="text-sm-table-default !text-light-900 mt-3 min-h-16"
                        style={{ background: '#33404a' }}
                      />
                    </>
                  ))}
              </div>
              {!isLoading && slidesLength > 0 && (
                <div className='lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center'>
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 lg:w-3 lg:h-3 2xl:w-4 2xl:h-4 rounded-full transition-all duration-300 cursor-pointer ${index === currentImageIndex
                        ? 'bg-gradient-to-r from-[#F3654A] to-[#FFB9AC] w-6 2xl:w-8'
                        : 'bg-[#888888] hover:bg-[#F3654A]/60 hover:scale-110'
                        }`}
                      onClick={() => goToImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className='absolute top-0 right-[40%] translate-x-1/2 w-[60%] z-[-1] pointer-events-none'>
        <div className='relative w-full h-full'>
          <div className='absolute top-0 right-0 w-10 h-full bg-gradient-to-r from-transparent to-white' />
          <Image src={IMAGES.blurOrangeLarge} alt="blurOrange" width={1000} height={1000} className=' object-cover ' />
        </div>
      </div>
    </div>

  )
}

export default Hero
