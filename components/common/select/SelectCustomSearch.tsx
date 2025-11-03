import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import * as React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useTranslate } from "@/contexts/TranslateContext";
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export type OptionType = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: any[];
    selected: any | string[];
    onChange: (e: any) => void;
    onOpen: (e: any) => void;
    onValueChange: (value: any) => void;
    handleSelectAll?: (data: any[]) => void
    handleDeleteAll?: () => void
    title?: string;
    typeSearch?: string;
    placeholder?: string;
    classNameButtonTrigger?: string;
    classNameContent?: string;
    classNameArrow?: string;
    classNameInputSearch?: string,
    classNameMenuDown?: string,
    mutiValue?: boolean;
    disabled?: boolean;
    loading?: boolean;
    styleButtonTrigger?: React.CSSProperties;
    classNameTitle?: string
    colorActive?: string; // Thêm prop color
}

function SelectCustomSearch({
    options = [],
    selected,
    onChange, // handle chọn item
    onOpen, // handle mở select
    onValueChange, // handle change search
    handleSelectAll, // handle chọn toàn bộ selected
    handleDeleteAll, // handle xoá toàn bộ selected
    title,
    placeholder,
    typeSearch = "no-search", // type để phân biệt 
    classNameButtonTrigger,
    classNameMenuDown,
    classNameArrow,
    classNameContent,
    classNameInputSearch,
    mutiValue = true, // multiple
    disabled = true, // disable select
    loading = false, // loading data,
    styleButtonTrigger,
    classNameTitle,
    colorActive = "#F78F08", // Màu mặc định là cam
    ...props
}: MultiSelectProps) {
    const itemRef = React.useRef<any>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const [popoverWidth, setPopoverWidth] = React.useState<number | null>(null);
    const [open, setOpen] = React.useState(false);

    // ✅ Chuyển `selected` thành mảng nếu cần thiết để tránh lỗi
    const normalizedSelected = Array.isArray(selected) ? selected : selected ? [selected] : [];

    // ✅ Fix lỗi `.some()`
    const isActive = (optionValue: string) => {
        return normalizedSelected.some((selectedItem: any) => selectedItem?.value === optionValue && selectedItem?.active);
    };


    // Cập nhật chiều rộng của PopoverContent
    React.useEffect(() => {
        if (buttonRef.current) {
            setPopoverWidth(buttonRef.current.offsetWidth);
        }
    }, [open]); // Chỉ cập nhật khi popover mở

    // Đảm bảo width cập nhật khi resize màn hình
    React.useEffect(() => {
        const handleResize = () => {
            if (buttonRef.current) {
                setPopoverWidth(buttonRef.current.offsetWidth);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Popover
            open={open}
            onOpenChange={(open: any) => {
                onOpen(open);
                setOpen(open);
            }}
            modal

            {...props}
        >
            <PopoverTrigger asChild className="border w-full">
                <Button
                    ref={buttonRef} // Gán ref để lấy kích thước button
                    variant="secondary"
                    role="combobox"
                    aria-expanded={open}
                    style={styleButtonTrigger}
                    className={`${classNameButtonTrigger} 3xl:px-4 px-3 flex text-start justify-between gap-0 disabled:cursor-not-allowed`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(!open)
                        onOpen(!open);
                    }}
                    disabled={!disabled}
                >
                    <div className={`${selected ? "" : ""} overflow-hidden max-w-[90%]`}>
                        {
                            selected && Object.keys(selected).length !== 0
                                ?
                                (
                                    mutiValue && selected?.length > 0 ?
                                        <div className='space-x-1 w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                                            {
                                                selected?.map((item: any, index: number) => (
                                                    <span
                                                        key={item.value}
                                                        className="3xl:text-base xl:text-sm text-[13px] capitalize font-medium w-full"
                                                    >
                                                        {item?.label || item?.name}{selected?.length - 1 !== index && ","}
                                                    </span>
                                                ))}
                                        </div>
                                        :
                                        <div className={`3xl:text-base xl:text-sm text-[13px] font-medium truncate ${classNameTitle}`}>
                                            {selected?.label || selected?.name}
                                        </div>
                                )
                                :
                                (
                                    <span className={`3xl:text-base xl:text-sm text-[13px] font-normal caret-transparent ${classNameTitle}`}>
                                        {title}
                                    </span>
                                )
                        }
                    </div>
                    <div className='max-w-5 text-end'>
                        <MdKeyboardArrowDown className={`${classNameArrow} custom-transition size-5 max-w-5`} />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className={classNameContent}
                style={{ width: popoverWidth || "auto" }}
            >
                <Command className="">
                    {
                        typeSearch !== "no-search" &&
                        <div className="relative">
                            {
                                typeSearch === "search-client" ?
                                    <CommandInput
                                        className={`${classNameInputSearch} w-full border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-8 placeholder:text-[#0000004D] text-sm`}
                                        onValueChange={(value) => onValueChange(value)}
                                        placeholder={placeholder}
                                    />
                                    :
                                    <Input
                                        className={`${classNameInputSearch} focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-8 placeholder:text-[#0000004D] text-sm`}
                                        onChange={({ target: { value } }) => onValueChange(value)}
                                        placeholder={placeholder}
                                    />
                            }
                            <Search className="size-5 absolute top-1/2 -translate-y-1/2 left-2 text-[#0000004D]" />
                        </div>
                    }
                    {/* {
                        mutiValue &&
                        <div className="flex justify-between px-4 py-2">
                            <Button variant="outline" onClick={() => { handleSelectAll ? handleSelectAll(options) : {} }}>Chọn toàn bộ</Button>
                            <Button variant="outline" onClick={() => { handleDeleteAll ? handleDeleteAll() : {} }}>Xoá toàn bộ</Button>
                        </div>
                    } */}
                    <CommandList >
                        {(!loading) && <CommandEmpty>Không có dữ liệu!</CommandEmpty>}
                        {
                            loading ?
                                (
                                    <div className='space-y-1 p-2'>
                                        {/* Hiển thị trạng thái loading ở đây nếu cần */}
                                        {
                                            [...Array(4)].map((_, index) => (
                                                <Skeleton
                                                    key={`skeleton-select-${index}`}
                                                    className="w-full h-10"
                                                />
                                            ))
                                        }
                                    </div>
                                )
                                :
                                (
                                    options?.length > 0 ?
                                        (
                                            <CommandGroup
                                                onClick={(e: any) => {
                                                    e.stopPropagation()
                                                }}
                                                onChange={(e) => {
                                                    e.stopPropagation()
                                                }}
                                                className={`${classNameMenuDown} max-h-64 custom-scroll-filter overflow-auto`}>
                                                {
                                                    options && options?.map((option: any, index: number) => {
                                                        return (
                                                            <CommandItem
                                                                ref={itemRef}
                                                                key={`index-${index}-${option.value}`}
                                                                onSelect={() => {
                                                                    if (itemRef.current) {
                                                                        itemRef.current.click = (e: any) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        };
                                                                    }
                                                                    onChange({ ...option, active: true });
                                                                    if (mutiValue) {
                                                                        onOpen(!open)
                                                                        setOpen(true);
                                                                        return
                                                                    } else {
                                                                        setOpen(!open);
                                                                        onOpen(!open)
                                                                        return
                                                                    }
                                                                }}
                                                                onClick={(e: any) => {
                                                                    e.stopPropagation()
                                                                }}
                                                                onChange={(e) => {
                                                                    e.stopPropagation()
                                                                }}

                                                                className={`gap-0 cursor-pointer hover:scale-115 hover:bg-accent transition-all duration-300 ease-linear`}
                                                            >

                                                                {
                                                                    selected?.length > 0 ?
                                                                        // show active ra khi chọn nhiều (multi value)
                                                                        <div className={cn("flex items-center justify-between gap-2 w-full")}>
                                                                            <h1
                                                                                className={`${isActive(option.value) ? option?.color ? "" : "text-[#F78F08]" : ""} 3xl:text-base xl:text-sm text-[13px] text-wrap font-medium space-x-1 max-w-[80%]`}
                                                                                style={{ color: isActive(option.value) ? option?.color ? "" : colorActive : "" }} // Truyền màu động
                                                                            >
                                                                                {option?.label}{option?.label === option?.label && <span className='hidden'>{index}</span>}
                                                                            </h1>
                                                                            // <Check className={cn("size-4 text-[#F78F08]", isActive(option.value) ? "block" : "hidden")} />
                                                                            <Check
                                                                                className="size-4"
                                                                                style={{ color: isActive(option.value) ? colorActive : "transparent" }} // Truyền màu động
                                                                            />
                                                                        </div>
                                                                        :
                                                                        // show active ra khi chọn ít (single value)
                                                                        <div
                                                                            className={cn("flex items-center justify-between gap-2 w-full")}>
                                                                            <h1
                                                                                className={`3xl:text-base xl:text-sm text-[13px] text-wrap font-medium space-x-1 max-w-[80%]`}
                                                                                style={{ color: option.value === selected?.value ? option?.color ? "" : colorActive : "" }} // Truyền màu động
                                                                            >
                                                                                {option?.label}
                                                                            </h1>
                                                                            <Check
                                                                                className="size-4"
                                                                                style={{ color: isActive(option.value) ? colorActive : "transparent" }} // Truyền màu động
                                                                            />
                                                                        </div>
                                                                }
                                                            </CommandItem>
                                                        )
                                                    })
                                                }
                                            </CommandGroup>
                                        )
                                        :
                                        (null)
                                )
                        }
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export { SelectCustomSearch };

