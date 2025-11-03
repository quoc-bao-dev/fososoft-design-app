'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

interface State {
    title: string,
    image: string
}
const SystemNodata = ({ type, className, classNameTitle }: { type: string, className?: string, classNameTitle?: string }) => {
    const [data, setData] = useState<State>({ title: '', image: '/background/system/no-data.svg', })

    const quertyState = (key: any) => setData((prev: State) => ({ ...prev, ...key }))

    useEffect(() => {
        switch (type) {
            case 'blog-list':
                quertyState({ title: '', image: '/background/system/upload-no-data.svg' })
                break;
            default:
                quertyState({ title: '', image: '/background/system/no-data.svg' })
                break;
        }
    }, [type])

    return (
        <div className={`${className} flex flex-col gap-2 items-center justify-center h-full`}>
            <Image
                src={data.image ? data.image : "/background/system/no-data.svg"}
                alt='nodata'
                width={1280}
                height={1024}
                className={`mx-auto w-full object-contain
                     ${['products-list', 'promotions-list', 'quote-list', 'image-product', 'no-address'].includes(type) && 'h-[400px] aspect-square'}
                     ${['history',].includes(type) && 'h-[120px] aspect-square'}
                    `}
                unoptimized
            />

            <h1 className={cn(`3xl:text-xl text-lg font-bold text-[#F78F08] leading-6`, classNameTitle)}>
                {data?.title}
            </h1>
        </div>
    )

}
export default SystemNodata