import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonAnimationNew from "../button/ButtonAnimationNew";
import { useDebounce } from 'use-debounce';

type InputSearchProps = {
    value?: string
    handleChangeInputSearch?: (value: string) => void
}

const InputSearchComponent: React.FC<InputSearchProps> = ({
    value = "",
    handleChangeInputSearch = () => { }
}) => {
    const [searchText, setSearchText] = useState<string>(value);
    const [debouncedValue] = useDebounce(searchText, 500);

    // Sync value từ props nếu cần
    useEffect(() => {
        setSearchText(value);
    }, [value]);

    // Gọi callback mỗi khi debouncedValue thay đổi
    useEffect(() => {
        handleChangeInputSearch(debouncedValue);
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchText("");
    };

    return (
        <div>
            <h2 className="mb-4 text-title font-extrabold">Tìm Kiếm</h2>
            <div className="flex relative">
                <Input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Tìm kiếm bài viết"
                    className="pr-[86px] 2xl:pl-6 pl-5 py-3 xxl:h-16 xxl:max-h-16 h-14 max-h-14 w-full 3xl:text-base text-sm rounded-xl border-none placeholder:text-xs-default placeholder:font-medium placeholder:text-[#99B2C6] focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ boxShadow: "0px 12px 24px 8px rgba(145, 158, 171, 0.16)" }}
                />
                <ButtonAnimationNew
                    icon={
                        <div className='xxl:size-6 size-5'>
                            <Search className="size-full" />
                        </div>
                    }
                    hideTitle={true}
                    className="absolute xxl:size-12 size-10 flex items-center justify-center bg-[#15AA7A] text-white rounded-xl right-2 inset-y-0 my-auto"
                />

                {
                    searchText && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSearchText("")}
                            className="absolute xxl:size-10 size-8 flex items-center justify-center inset-y-0 my-auto right-14 text-gray-600 hover:scale-110 transition-all rounded-full cursor-pointer"
                        >
                            <X className="size-3.5" />
                        </motion.button>
                    )
                }
            </div>
        </div>
    );
};

export default InputSearchComponent;
