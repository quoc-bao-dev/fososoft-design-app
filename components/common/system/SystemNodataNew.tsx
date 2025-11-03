'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
    type: string
    className?: string
    classNameTitle?: string
    classNameDescription?: string
    searchValue?: string
}

const imageByType: Record<string, string> = {
    'blog-list': '/background/system/no-data-new.png',
    'no-search': '/background/system/no-search.png',
    // Các loại khác nếu cần
}

const titleByType: Record<string, string> = {
    'blog-list': 'Mục này hiện chưa có bài viết nào!',
    'no-search': '',
    // Thêm key: value nếu dùng đa ngôn ngữ hoặc có title khác
}

const SystemNodataNew = ({ type, className, classNameTitle, classNameDescription, searchValue }: Props) => {
    const imageSrc = imageByType[type] || '/background/system/no-data-amico.svg'
    // const title = titleByType[type] || ''


    const title = type === 'no-search'
        ? <>Không tìm thấy kết quả tìm kiếm cho <span className='font-bold italic'>“{searchValue}”</span>. Vui lòng điều chỉnh lại bộ lọc và từ khoá tìm kiếm</>
        : titleByType[type] || ''

    const description = type === 'no-search'
        ? <>Kết quả tìm kiếm cho <span className='font-bold italic'>“{searchValue}”</span></>
        : titleByType[type] || ''

    const dynamicImageClass = cn(
        ['blog-list', 'no-search'].includes(type) && '3xl:h-[480px] xxl:h-[440px] h-[380px] w-auto aspect-square',
        ['history'].includes(type) && 'h-[120px] aspect-square'
    )

    return (
        <div className={cn("flex flex-col gap-2 items-center justify-center h-full", className)}>
            {
                searchValue &&
                <h1 className={cn("3xl:text-xl text-lg font-bold text-[#15AA7A] leading-6 capitalize", classNameDescription)}>
                    {description}
                </h1>
            }
            <Image
                src={imageSrc}
                alt='nodata'
                width={1280}
                height={1024}
                className={cn("mx-auto w-full object-contain", dynamicImageClass)}
                unoptimized
            />
            {title && (
                <h1 className={cn("3xl:text-xl text-lg font-bold text-[#15AA7A] leading-6", classNameTitle)}>
                    {title}
                </h1>
            )}
        </div>
    )
}

export default SystemNodataNew
