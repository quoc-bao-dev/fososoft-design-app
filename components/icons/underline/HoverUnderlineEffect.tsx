import Image from "next/image";

type Props = {
    blurImageColor: string; // path ảnh blur
    linearImageColor: string; // background linear dạng string
    className?: string;
};

const HoverUnderlineEffect = ({ blurImageColor, linearImageColor, className = "" }: Props) => {
    return (
        <div
            className={`group-hover:opacity-100 opacity-0 absolute z-10 bottom-0 left-0 w-full h-2/3 custom-transition ${className}`}
        >
            <div className="size-full aspect-square blur-0 pointer-events-none">
                <Image
                    width={500}
                    height={500}
                    alt="hover-blur"
                    src={blurImageColor}
                    className="size-full object-cover"
                />
            </div>
            <div
                className="custom-transition absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none w-[75%] h-[4px]"
                style={{
                    background: linearImageColor,
                }}
            />
        </div>
    );
};

export default HoverUnderlineEffect;
