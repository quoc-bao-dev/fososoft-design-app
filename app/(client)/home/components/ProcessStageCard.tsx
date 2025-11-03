"use client";

import React, { memo } from "react";

export type ProcessStageCardProps = {
  icon: React.ReactNode | { src: string; alt: string };
  title: string;
  content: string;
  bg: string;
  iconBg?: string;
  elasticColor?: string;
  isActive?: boolean;
  isDimmed?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  rotateOnHover?: number;
  baseRotate?: number;
  disableElastic?: boolean;
  activeScale?: number;
};

const ProcessStageCard = React.forwardRef<
  HTMLDivElement,
  ProcessStageCardProps
>(
  (
    {
      icon,
      title,
      content,
      bg,
      iconBg,
      elasticColor,
      isActive = false,
      isDimmed = false,
      onMouseEnter,
      onMouseLeave,
      className,
      rotateOnHover = -2,
      baseRotate = 0,
      disableElastic = false,
      activeScale = 1.05,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const iconRef = React.useRef<HTMLDivElement | null>(null);
    const elasticRef = React.useRef<HTMLDivElement | null>(null);
    const enterTlRef = React.useRef<any>(null);
    const gsapRef = React.useRef<any>(null);
    const [resolvedElasticColor, setResolvedElasticColor] =
      React.useState<string>(elasticColor ?? "#FFFFFF");

    const ANIM = React.useMemo(
      () => ({
        multiplier: 1.0,
        ease: {
          softOut: "power3.out",
          quickOut: "power2.out",
          elasticOut: "elastic.out(1, 0.36)",
        },
        stateChange: 0.28,
        hoverIn: { durationA: 0.18, durationReturn: 0.14 },
        iconWobble: 0.2,
        hoverOut: 0.2,
        elastic: { scaleX: 1.25, inDuration: 0.6, outDuration: 0.28 },
      }),
      []
    );

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement
    );

    React.useEffect(() => {
      let mounted = true;
      import("gsap")
        .then((m) => {
          if (mounted) gsapRef.current = m.default || m;
        })
        .catch(() => {});
      return () => {
        mounted = false;
      };
    }, []);

    React.useEffect(() => {
      const targetScale = isActive ? activeScale : isDimmed ? 0.95 : 1;
      const gsap = gsapRef.current;
      if (!gsap) return;
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: targetScale,
          rotate: baseRotate,
          duration: ANIM.stateChange * ANIM.multiplier,
          ease: ANIM.ease.softOut,
        });
      }
      if (elasticRef.current) {
        const elasticScaleX = 1 + (targetScale - 1) * 2;
        gsap.to(elasticRef.current, {
          scaleX: elasticScaleX,
          transformOrigin: "left center",
          duration: ANIM.stateChange * ANIM.multiplier,
          ease: ANIM.ease.softOut,
        });
      }
    }, [isActive, isDimmed, ANIM, activeScale, baseRotate]);

    React.useEffect(() => {
      if (elasticColor) setResolvedElasticColor(elasticColor);
    }, [elasticColor]);

    const handleMouseEnter = () => {
      const gsap = gsapRef.current;
      if (!gsap) return;
      if (enterTlRef.current) enterTlRef.current.kill?.();
      const tl = gsap.timeline({ defaults: { ease: ANIM.ease.softOut } });
      enterTlRef.current = tl;
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            scale: "+=0.03",
            y: -4,
            rotate: baseRotate + rotateOnHover,
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            duration: ANIM.hoverIn.durationA * ANIM.multiplier,
          },
          0
        ).to(
          containerRef.current,
          { y: 0, duration: ANIM.hoverIn.durationReturn * ANIM.multiplier },
          ">-0.02"
        );
      }
      if (elasticRef.current) {
        gsap.killTweensOf?.(elasticRef.current);
        tl.fromTo(
          elasticRef.current,
          { scaleX: 1, scaleY: 1, y: 0, transformOrigin: "left center" },
          {
            scaleX: ANIM.elastic.scaleX,
            scaleY: 0.96,
            y: -4,
            duration: ANIM.hoverIn.durationA * ANIM.multiplier,
            ease: ANIM.ease.elasticOut,
          },
          0
        ).to(
          elasticRef.current,
          {
            scaleY: 1,
            y: 0,
            duration: ANIM.hoverIn.durationReturn * ANIM.multiplier,
            ease: ANIM.ease.softOut,
          },
          ">-0.02"
        );
      }
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { y: 0, rotate: 0 },
          {
            y: -6,
            rotate: -6,
            yoyo: true,
            repeat: 1,
            duration: ANIM.iconWobble * ANIM.multiplier,
            ease: ANIM.ease.quickOut,
          }
        );
      }
      onMouseEnter?.();
    };

    const handleMouseLeave = () => {
      const gsap = gsapRef.current;
      if (!gsap) return;
      const baseScale = isActive ? activeScale : isDimmed ? 0.95 : 1;
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: baseScale,
          y: 0,
          rotate: baseRotate,
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          duration: ANIM.hoverOut * ANIM.multiplier,
          ease: ANIM.ease.quickOut,
        });
      }
      if (elasticRef.current) {
        gsap.killTweensOf?.(elasticRef.current);
        gsap.to(elasticRef.current, {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          transformOrigin: "left center",
          duration: ANIM.hoverOut * ANIM.multiplier,
          ease: ANIM.ease.quickOut,
        });
      }
      onMouseLeave?.();
    };

    const renderIcon = () => {
      if (!icon) return null;
      if (React.isValidElement(icon)) return icon;
      if (typeof icon === "object" && "src" in icon) {
        return (
          <img
            src={icon.src}
            alt={(icon as any).alt ?? ""}
            width={31}
            height={31}
          />
        );
      }
      return null;
    };

    return (
      <div
        ref={containerRef}
        className={`relative rounded-2xl md:rounded-[40px] ${bg} p-2 md:p-6 w-[110px] md:w-[210px] lg:w-[310px] h-[160px] md:h-[200px] lg:h-[260px] ${
          className ?? ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-[20px] h-full ">
          <div
            ref={iconRef}
            className={`size-[32px] p-1.5 md:size-[54px] lg:size-[84px] rounded-full flex items-center justify-center flex-shrink-0 ${
              iconBg ?? "bg-white/80"
            } text-2xl shadow`}
          >
            {renderIcon()}
          </div>
          <div className="mt-1">
            <p className="text-gray-900 text-[12px] md:text-base lg:text-[21px] text-center lg:text-left font-bold capitalize">
              {title}
            </p>
            <h3 className="text-gray-900 text-[10px] md:text-xs lg:text-base mt-2 text-center lg:text-left">
              {content}
            </h3>
          </div>
        </div>
        {!disableElastic && (
          <div
            ref={elasticRef}
            className="bg-slate-300- absolute h-[18px] md:h-[38px] top-1/2 left-full -translate-y-1/2 -ml-[1px] will-change-transform w-[100px]"
          >
            <Elastic color={resolvedElasticColor} />
          </div>
        )}
      </div>
    );
  }
);

ProcessStageCard.displayName = "ProcessStageCard";

const Elastic = ({ color = "#E8FBF5" }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full"
      viewBox="0 0 111 38"
      fill="none"
    >
      <path
        d="M22.7524 18.9887L1.75244 34.1441V3.83325L22.7524 18.9887Z"
        fill={color}
      />
      <path
        d="M12.2524 18.8333H110.252M22.7524 18.9887L1.75244 34.1441V3.83325L22.7524 18.9887Z"
        stroke={color}
        strokeWidth={3}
      />
    </svg>
  );
};

export default memo(ProcessStageCard);
