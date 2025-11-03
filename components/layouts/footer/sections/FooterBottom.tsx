import React from 'react'
import Image from 'next/image'
import LanguageSelector from '@/components/common/translate/LanguageSelector'
import { useResizeStore } from '@/stores/useResizeStore'
import { SocialMediaItem } from '@/types/social-media/ISocialMedia'
import SocialMediaList from '../../../common/social/SocialMediaList'

interface SocialSectionProps {
    socialMedia: SocialMediaItem[];
}

const FooterBottom: React.FC<SocialSectionProps> = ({ socialMedia }) => {
    const { isVisibleTablet } = useResizeStore()

    return (
        <div className="grid xl:grid-cols-12 lg:grid-cols-14 grid-cols-2 lg:gap-0 gap-4 justify-between items-center">

            {isVisibleTablet && <div className='col-span-2'><SocialMediaList socialMedia={socialMedia} className='bg-[#F2F2F2]/10 hover:bg-[#F2F2F2]/5' /></div>}
            <div className='xl:col-span-3 lg:col-span-4 col-span-1 flex flex-col lg:justify-center lg:items-start items-end lg:gap-0 gap-6 lg:order-1 order-3'>
                {/* <div className='w-fit'>
                    <LanguageSelector
                        classNameTrigger='text-white border border-[#FFFFFF1A]'
                        styleTrigger={{
                            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) 100%)",
                            boxShadow: "0px 0px 24px 0px #FFFFFF12 inset"
                        }}
                    />
                </div> */}
            </div>

            <div className='xl:col-span-6 lg:col-span-6 col-span-2 flex items-center lg:justify-center lg:order-2 order-1'>
                <div className="text-sm-default space-y-2 text-[#B3C5D4]">
                    Copyright © 2025 FOSO Co. LTD. All Rights Reserved.
                </div>
            </div>

            <div className='xl:col-span-3 lg:col-span-4 col-span-1 flex items-center lg:justify-end lg:order-3 order-2'>
                {/* <div className='lg:w-[200px] md:w-[2210240px] w-[160px] aspect-8/3'>
                    <Image
                        src="/logo/foso/logo-bct.svg"
                        alt="logo"
                        width={300}
                        height={200}
                        className='size-full object-contain cursor-pointer hover:scale-[1.03] custom-transition'
                    />
                </div> */}
            </div>
        </div>
    )
}

export default FooterBottom