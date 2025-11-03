import React, { forwardRef } from "react";
import { motion, Variants } from "framer-motion";
import { variantButtonPressZoom } from "@/utils/animations/variantsAnimation";

type Props = {
  title?: string | React.ReactNode;
  className?: string;
  classNameWithIcon?: string;
  classLoading?: string;
  variant?: any;
  onClick?: (e?: any) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  reverse?: boolean;
  type?: "submit" | "button";
  hideTitle?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  forceHover?: boolean;
  whileHover?: Variants | { [key: string]: any }; // ✅ Type chính xác
  animateProps?: Variants | { [key: string]: any }; // ✅ Animate Props mới
};

const ButtonAnimation = forwardRef<HTMLButtonElement, Props>(
  (
    {
      title = "",
      className = "",
      classNameWithIcon = "",
      classLoading = "border-current",
      variant = variantButtonPressZoom,
      onClick = () => {},
      style,
      icon,
      reverse = false,
      type = "submit",
      hideTitle = false,
      disabled = false,
      isLoading = false,
      forceHover = false,
      whileHover,
      animateProps,
    },
    ref
  ) => {
    return (
      <motion.button
        initial={{
          boxShadow: "none",
        }}
        animate={animateProps || (forceHover ? "hover" : "rest")}
        whileTap="press"
        whileHover={whileHover || "hover"} // ✅ Nhận động từ props hoặc dùng mặc định
        variants={disabled ? {} : variant}
        className={` ${
          icon ? classNameWithIcon : ""
        } transform-gpu text-nowrap whitespace-nowrap disabled:hover:opacity-100 disabled:bg-gray-500/20 disabled:text-white disabled:border-transparent disabled:cursor-not-allowed disabled:pointer-events-auto transition-colors duration-300 ease-in-out ${className}`}
        transition={{
          backgroundColor: { duration: 0.5, ease: "easeInOut" },
          color: { duration: 0.5, ease: "easeInOut" },
        }}
        type={type}
        onClick={onClick}
        style={style}
        disabled={disabled}
        ref={ref}
      >
        {isLoading && (
          <span
            className={`${classLoading} inline-block min-h-4 min-w-4 h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          />
        )}

        {!reverse && icon && (
          <span
            className={`${hideTitle ? "max-w-full" : "max-w-[25%]"} shrink`}
          >
            {icon}
          </span>
        )}

        {!hideTitle && (
          <span className="flex items-center w-full text-center">{title}</span>
        )}

        {reverse && icon && (
          <span
            className={`${hideTitle ? "max-w-full" : "max-w-[25%]"} shrink`}
          >
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

export default ButtonAnimation;
