import { JSX } from "react";
import Link from "next/link"; // Nếu dùng Next.js, có thể dùng Link

interface InfoSectionProps {
    title?: string;
    items: { name?: string; label?: string; value?: JSX.Element | string; link?: string; link_type?: string }[];
}

const InfoSection = ({ title, items }: InfoSectionProps) => (
    <div className="flex flex-col 3xl:gap-8 lg:gap-6 gap-4">
        {title && <h1 className="text-base-default font-bold text-[#F1F5F7] uppercase w-fit">{title}</h1>}

        <div className="text-sm-default space-y-4 text-[#B3C5D4]">
            {
                items.map((item, index) => (
                    <p key={index} className="space-x-1">
                        {item.label && <span>{item.label}</span>}
                        {
                            item.value ?
                                (
                                    <span>{item.value}</span>
                                )
                                :
                                (
                                    item.name &&
                                    (
                                        item.link ?
                                            (
                                                <Link
                                                    href={item.link}
                                                    className="hover:text-[#F1F5F7] transition-colors duration-200 ease-in-out cursor-pointer"
                                                    target={item.link_type === "new_tab" ? "_blank" : "_self"}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                            :
                                            (
                                                <span className="hover:text-[#F1F5F7] transition-colors duration-200 ease-in-out">
                                                    {item.name}
                                                </span>
                                            )
                                    )
                                )}
                    </p>
                ))
            }
        </div>
    </div>
);

export default InfoSection;
