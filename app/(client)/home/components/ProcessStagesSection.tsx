"use client";

import React from "react";
import ProcessStageCard, { ProcessStageCardProps } from "./ProcessStageCard";

export type ProcessStage = {
  icon: React.ReactNode | { src: string; alt: string };
  title: string;
  content: string;
  bg: string;
  iconBg?: string;
  elasticColor?: string;
  disableElastic?: boolean;
  baseRotate?: number;
  rotateOnHover?: number;
  activeScale?: number;
};

type Props = { stages: ProcessStage[] };

const DEFAULT_CONFIGS: Array<Partial<ProcessStageCardProps>> = [
  {
    bg: "bg-[#E8FBF5]",
    elasticColor: "#E8FBF5",
    baseRotate: 0,
    rotateOnHover: 0,
    disableElastic: false,
  },
  {
    bg: "bg-[#FDEAB7]",
    elasticColor: "#FDEAB7",
    baseRotate: 0,
    rotateOnHover: 0,
    disableElastic: false,
  },
  {
    bg: "bg-[#E7F7FE]",
    elasticColor: "#E7F7FE",
    baseRotate: 0,
    rotateOnHover: 0,
    disableElastic: true,
  },
];

export default function ProcessStagesSection({ stages }: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="lg:py-10 relative flex items-stretch justify-center gap-4 px-4 md:gap-10 w-full ">
        {stages.slice(0, 3).map((stage, index) => {
          const fallback = DEFAULT_CONFIGS[index] || DEFAULT_CONFIGS[0];
          return (
            <div
              key={index}
              className={`transition-transform duration-200 ease-out ${
                activeIndex !== null && activeIndex !== index
                  ? "md:translate-x-6"
                  : ""
              }`}
            >
              <ProcessStageCard
                icon={stage.icon}
                title={stage.title}
                content={stage.content}
                bg={stage.bg || (fallback.bg as string)}
                iconBg={stage.iconBg}
                elasticColor={
                  stage.elasticColor || (fallback.elasticColor as string)
                }
                isActive={activeIndex === index}
                isDimmed={activeIndex !== null && activeIndex !== index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                baseRotate={stage.baseRotate ?? (fallback.baseRotate as number)}
                rotateOnHover={
                  stage.rotateOnHover ?? (fallback.rotateOnHover as number)
                }
                disableElastic={
                  stage.disableElastic ?? (fallback.disableElastic as boolean)
                }
                activeScale={stage.activeScale ?? 1.05}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
