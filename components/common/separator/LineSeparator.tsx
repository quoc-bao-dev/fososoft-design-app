import { cn } from "@/lib/utils";

interface LineSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    direction?: "horizontal" | "vertical";
}

export const LineSeparator = ({
    className,
    color = "#d4d4d8",
    height = "2px",
    direction = "horizontal"
}: LineSeparatorProps) => {
    const isHorizontal = direction === "horizontal";

    return (
        <div
            className={cn(
                isHorizontal ? "w-full h-[2px]" : "h-full w-[2px]",
                className
            )}
            style={{
                backgroundColor: color,
                height: isHorizontal ? height : "100%",
                width: isHorizontal ? "100%" : height,
            }}
        />
    );
};
