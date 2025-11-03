'use client'

import React from 'react'

import { LineSeparator } from '../../common/separator/LineSeparator'
import FooterLogo from './sections/FooterLogo';
import FooterContent from './sections/FooterContent';
import FooterBottom from './sections/FooterBottom';

type Props = {}

const socialMedia = [
    { icon: "/icons/social-media/zalo.svg", link: "https://zalo.me/2281264205827497572" },
    { icon: "/icons/social-media/facebook.svg", link: "https://www.facebook.com/fososoftware" },
    { icon: "/icons/social-media/tiktok.svg", link: "https://www.tiktok.com/@fososoftware" },
    { icon: "/icons/social-media/youtube.svg", link: "https://www.youtube.com/@fososoft" },
];

const FooterContainer = (props: Props) => {


    return (
        <footer className='relative w-full overflow-hidden bg-[#052B1E]'>
            {/* <div className="w-full h-6 bg-white rounded-b-3xl" /> */}

            <div className="custom-container flex flex-col 3xl:gap-8 gap-6 pt-16 pb-12">
                {/* Phần Logo & Slogan */}
                <div className="flex items-center justify-between">
                    <div className="3xl:max-w-[45%] xxl:max-w-[50%] md:max-w-[55%] max-w-[70%] 3xl:text-[36px] 2xl:text-[32px] xxl:text-[32px] xl:text-[28px] md:text-[28px] text-[20px] 3xl:!leading-[56px] 2xl:!leading-[46px] xxl:!leading-[46px] xl:!leading-[42px] md:!leading-[38px] !leading-[34px] tracking-[-2%] text-white font-semibold">
                        Bạn có ý tưởng, FOSO viết giải pháp. Hãy cùng nhau tạo nên thành công!
                    </div>
                    <FooterLogo />
                </div>

                <LineSeparator color="#4D5F6E" />

                {/* Phần nội dung chính */}
                <FooterContent socialMedia={socialMedia}/>

                <LineSeparator color="#4D5F6E" />

                {/* Phần mạng xã hội */}
                <FooterBottom socialMedia={socialMedia} />
            </div>
        </footer >
    )
}

export default FooterContainer