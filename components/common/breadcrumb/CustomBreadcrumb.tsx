import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { memo } from "react";

type BreadcrumbProps = {
    items: { label: string; href?: string }[];
};

const CustomBreadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList className='!gap-0.5'>
                {
                    items.map((item, index) => (
                        <React.Fragment key={`breadcrumb-${index}`}>
                            <BreadcrumbItem >
                                {
                                    item.href
                                        ?
                                        (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href} className="hover:underline text-[#17181A] text-sm-default">
                                                    {item.label}
                                                </Link>
                                            </BreadcrumbLink>
                                        )
                                        :
                                        (
                                            <span className="font-semibold text-[#050505] text-sm-default">{item.label}</span>
                                        )
                                }
                            </BreadcrumbItem>
                            {index < items.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
};

// Đặt displayName để debug dễ hơn
CustomBreadcrumb.displayName = 'CustomBreadcrumb';

export default memo(CustomBreadcrumb);
