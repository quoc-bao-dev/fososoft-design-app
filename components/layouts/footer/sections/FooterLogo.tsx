import Image from "next/image";
import { motion } from "framer-motion";
import { variantButtonScaleZoom } from "@/utils/animations/variantsAnimation";
import { usePathname, useRouter } from "next/navigation";
import { scrollToTop } from "@/utils/scroll/scrollUtils";

const FooterLogo = () => {
    const pathname = usePathname()
    const router = useRouter();

    const handleMoveHome = () => {
        // Sử dụng framer-motion để cuộn đến vị trí tính toán
        scrollToTop()

        if (pathname !== "/") {
            router.push("/");
        }
    };

    return (
        <motion.div
            initial={false}
            animate="rest"
            whileTap="press"
            variants={variantButtonScaleZoom}
            className="aspect-square 3xl:w-32 xl:w-28 w-24 h-auto cursor-pointer" 
            onClick={handleMoveHome}
        >
            <Image
                alt="logo"
                src="/logo/foso/logo-pattern.webp"
                width={400}
                height={400}
                quality={100}
                priority
                className="size-full object-contain"
            />
        </motion.div>
    );
};

export default FooterLogo;
