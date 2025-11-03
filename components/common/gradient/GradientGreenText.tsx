import { FC, ReactNode } from "react";

interface GradientGreenTextProps {
    children: ReactNode;
    className?: string;
}

const GradientGreenText: FC<GradientGreenTextProps> = ({ children, className }) => {
    return (
        <span
            className={`font-extrabold ${className}`}
            style={{
                //                 background: linear-gradient(0deg, #53B086, #53B086),
                // radial-gradient(219.3% 1471.82% at 24.6% -30.56%, rgba(84, 171, 177, 0) 0%, rgba(84, 171, 177, 0.409141) 34.37%, rgba(133, 238, 179, 0.71) 51.52%, rgba(84, 171, 177, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

                backgroundImage: `
          linear-gradient(90deg, #53B086, #53B086),
          radial-gradient(219.3% 1471.82% at 24.6% -30.56%, 
          rgba(84, 171, 177, 0) 0%, rgba(84, 171, 177, 0.409141) 34.37%, 
          rgba(133, 238, 179, 0.71) 51.52%, rgba(84, 171, 177, 0) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
            }}
        >
            {children}
        </span>
    );
};

export default GradientGreenText;
