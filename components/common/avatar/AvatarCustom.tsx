import React, { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
    classNameContainer?: string
    classImage?: string
    classFallback?: string
    avatar?: string
}

const AvatarCustom = ({ classNameContainer, classImage, classFallback, avatar }: Props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <Avatar className={`${classNameContainer} rounded-full`}>
            <AvatarImage
                width={200}
                height={200}
                src={avatar}
                loading='lazy'
                alt="@avatar"
                className={`${classImage} object-cover size-full rounded-full aspect-square`}
            />
            <AvatarFallback >
                <Image
                    width={200}
                    height={200}
                    // src='/avatar/avatar_default.png'
                    src={avatar || '/avatar/avatar_default.png'}
                    alt="@avatar"
                    loading='lazy'
                    className={`${classFallback} ${isLoaded ? 'blur-0' : 'blur-md'}  object-cover size-full rounded-full`}
                    onLoad={() => setIsLoaded(true)}
                />
            </AvatarFallback>
        </Avatar>
    )
}

export default AvatarCustom