import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string
    classNameContainer?: string
}

const BgPaddingMarginSection = ({ classNameContainer, className, children }: Props) => {
    return (
        <div className={`${classNameContainer} custom-padding-section`}>
            <div className={`${className} custom-container`}>
                {children}
            </div>
        </div>
    )
}

export default BgPaddingMarginSection