'use client'

import { ICardContactItem } from "@/types/card/ICard";
import { motion } from 'framer-motion';
import React from "react";
import { useResizeStore } from '../../../../stores/useResizeStore';

interface ContactCardProps {
    item: ICardContactItem;
}

const ContactCard: React.FC<ContactCardProps> = ({ item }) => {
    const { isVisibleTablet } = useResizeStore()

    return (
        <motion.div
            className="p-5 bg-white rounded-3xl flex gap-3"
            initial={{ scale: 1, boxShadow: isVisibleTablet ? "0px 1px 3px 0px rgba(18, 18, 23, 0.10), 0px 1px 2px 0px rgba(18, 18, 23, 0.06)" : "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A" }}
            whileHover={{
                scale: 1.02,
                // boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.02)", // Shadow mạnh hơn khi hover
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
            <div className="size-6 shrink-0">{item.icon}</div>
            <div className="space-y-3">
                <h3 className="text-sm-default font-extrabold text-[#33404A]">
                    {item.title}
                </h3>

                <div className="space-y-0.5">
                    {item.description && (
                        <p className="text-sm text-[#33404A] font-medium">
                            {item.description}
                        </p>
                    )}

                    {Array.isArray(item.content) ? (
                        <div
                            className={`${item.type === "working_hours"
                                ? "space-y-0.5"
                                : "space-y-3"
                                } text-sm`}
                        >
                            {item.content.map((subItem, subIndex) => (
                                <p key={subIndex}>
                                    <span className="font-bold text-[#33404A]">
                                        {subItem.label}
                                    </span>{" "}
                                    {subItem.value}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <>
                            {!["phone", "email"].includes(item.type ?? "") ? (
                                <p className="text-[#33404A] font-medium">{item.content}</p>
                            ) : (
                                <>
                                    {item.type === "phone" && (
                                        <a
                                            href={`tel:${item.content}`}
                                            className="text-[#33404A] hover:text-[#33404A]/80 font-medium hover:underline hover:underline-offset-2 custom-transition"
                                        >
                                            {item.content}
                                        </a>
                                    )}
                                    {item.type === "email" && (
                                        <a
                                            href={`mailto:${item.content}`}
                                            className="text-[#33404A] hover:text-[#33404A]/80 font-medium hover:underline hover:underline-offset-2 custom-transition"
                                        >
                                            {item.content}
                                        </a>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ContactCard;
