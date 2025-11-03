'use client'
import ArrowUpRightIcon from '@/components/icons/common/ArrowUpRightIcon';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SalyAnimation from '../animations/common/SalyAnimation';
import ButtonAnimationNew from '../button/ButtonAnimationNew';

type DevelopingProps = {
    classNameParent?: string
}

const SystemDeveloping = ({ classNameParent }: DevelopingProps) => {
    const router = useRouter()

    return (
        <div className={`custom-container h-screen flex flex-col space-y-8 items-center justify-center`} >
            <SalyAnimation className="aspect-square 3xl:w-[32%] 2xl:w-[38%] xl:w-[38%] lg:w-[35%] md:w-[50%] w-[85%]">
                <Image
                    src="/background/system/robo-upcoming.svg"
                    width={500}
                    height={500}
                    alt="error"
                    className="size-full object-contain aspect-square"
                />
            </SalyAnimation>

            <div className="text-center flex flex-col justify-center items-center gap-9">
                <div className="space-y-2">
                    <h1 className="3xl:text-[36px] 2xl:text-[32px] xxl:text-[30px] xl:text-[28px] md:text-[28px] text-[24px] 3xl:!leading-[56px] 2xl:!leading-[46px] xxl:!leading-[46px] xl:!leading-[42px] md:!leading-[38px] !leading-[34px] tracking-[-2%] font-bold text-[#15AA7A]">
                        Trang sắp ra mắt
                    </h1>
                    <h5 className="3xl:!text-lg xl:!text-lg !text-lg !tracking-[1%] font-medium text-[#17181A]">
                        Trang đang trong giai đoạn phát triển, vui lòng quay lại sau!
                    </h5>
                </div>
                
                <ButtonAnimationNew
                    title="Trở về trang chủ"
                    icon={
                        <div className="2xl:size-12 md:size-10 size-9 rounded-full flex items-center justify-center group-hover:bg-[#10805B] group-hover:text-white duration-500 transition-colors">
                            <motion.div
                                initial={{ x: 0, y: 0 }}
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { x: 2, y: -2 }, // Khi hover vào button, div cũng scale lớn hơn
                                    press: { scale: 0.98 }, // Khi hover vào button, div cũng scale lớn hơn
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                <ArrowUpRightIcon className="2xl:size-6 md:size-5 size-4" />
                            </motion.div>
                        </div>
                    }
                    onClick={() => router.push("/")}
                    reverse={true}
                    className="border-gradient-button-no-bg-foso flex items-center gap-2 3xl:!text-lg xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group text-[#10805B] hover:bg-[#A3EED6]/40 hover:!backdrop-blur-[100px] hover:!backdrop-filter hover:text-[#10805B] font-medium pl-6 pr-1 py-1 border border-[#10805B] rounded-[40px] lg:w-fit w-full"
                    style={{
                        WebkitBackdropFilter: "blur(15px)", // Safari
                        boxShadow: "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)"
                    }}
                />
            </div>
        </div>
    )
}

export default SystemDeveloping