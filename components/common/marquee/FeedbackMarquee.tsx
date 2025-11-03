import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";
import Image from "next/image";
import MarqueeColumn from "@/components/common/marquee/MarqueeColumn";
import { useResizeStore } from "@/stores/useResizeStore";
import { FeedbackItem } from "@/types/feedback/IFeedback";

type FeedbackMarqueeProps = {
    feedbacks: FeedbackItem[];
};

const FeedbackMarquee: React.FC<FeedbackMarqueeProps> = ({ feedbacks }) => {
    const { isVisibleTablet } = useResizeStore()
    // Chia danh sách thành 2 phần
    const firstColumn = feedbacks.slice(0, Math.ceil(feedbacks.length / 2));
    const secondColumn = feedbacks.slice(Math.ceil(feedbacks.length / 2));

    return (
        <div className="flex 3xl:gap-6 md:gap-4 gap-2 w-full 3xl:h-[720px] h-[580px] overflow-hidden">
            <MarqueeColumn feedbacks={firstColumn} direction="down" />
            <MarqueeColumn feedbacks={secondColumn} direction="up" />
        </div>
    );
};

export default FeedbackMarquee;
