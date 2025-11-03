'use client'
import ScrollbarStyle from '@/components/common/scroll/ScrollbarStyle'
import ToastCustom from '@/components/common/toast/ToastCustom'
import { Toaster as ToastShadcnUi } from "@/components/ui/toaster"
import { KEY_COOKIES } from '@/constants/Cookie'
import { ModalProvider } from '@/contexts/ModalContext'
import { useToast } from '@/hooks/ui/use-toast'
import { useResizeStore } from '@/stores/useResizeStore'
import { useToastStore } from '@/stores/useToastStore'
import { scrollToSection } from '@/utils/scroll/scrollUtils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ProviderLayout from '../provider/ProviderLayout'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const RootLayout = memo(({ children, data }: { children: React.ReactNode, data: any }) => {
    const { toast } = useToast()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const sectionId = useSearchParams().get('sectionId')

    const { duration, openToast, message, type, setToast, description } = useToastStore()

    const {
        isVisibleMobile,
        isVisibleTablet,
        isVisibleDesktopLG,
        isVisibleDesktopXL,
        isVisibleDesktopXXL,
        onResizeMobile,
        onResizeTablet,
        onResizeDesktopLG,
        onResizeDesktopXL,
        onResizeDesktopXXL,
        onCloseResizeMobile,
        onCloseResizeTablet,
        onCloseResizeDesktopLG,
        onCloseResizeDesktopXL,
        onCloseResizeDesktopXXL,
    } = useResizeStore()

    useEffect(() => {
        setIsMounted(true)

        // Fix lỗi Hydration failed
        if (typeof window !== "undefined") {
            document.documentElement.removeAttribute("cz-shortcut-listen");

            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
        }
    }, [])

    useEffect(() => {
        if (sectionId) {
            setTimeout(() => {
                scrollToSection(sectionId)
            }, 100);
        }
    }, [sectionId]);

    // ẩn/hiện khi chuyển qua màn hình nhỏ khi không dùng chung div để tránh xung đột 
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Debounce resize handler để tối ưu hiệu năng
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const width = window.innerWidth;

                // Tối ưu: chỉ gọi function khi cần thiết
                if (width < 768) {
                    onResizeMobile();
                } else {
                    onCloseResizeMobile();
                }

                if (width < 1024) {
                    onResizeTablet();
                } else {
                    onCloseResizeTablet();
                }

                if (width >= 1024 && width < 1280) {
                    onResizeDesktopLG();
                } else {
                    onCloseResizeDesktopLG();
                }

                if (width >= 1280 && width < 1440) {
                    onResizeDesktopXL();
                } else {
                    onCloseResizeDesktopXL();
                }

                if (width >= 1440 && width < 1536) {
                    onResizeDesktopXXL();
                } else {
                    onCloseResizeDesktopXXL();
                }
            }, 100); // Debounce 100ms
        };

        // Gọi hàm handleResize khi kích thước màn hình thay đổi
        window.addEventListener('resize', handleResize);

        // Gọi hàm handleResize một lần khi component được render
        handleResize();

        // Hủy lắng nghe sự kiện resize khi component bị unmount
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Loại bỏ dependencies để tránh re-render không cần thiết

    const showToast = useCallback((type: 'success' | 'error' | 'warning', message: string, description?: string) => {
        return toast({
            duration: duration,
            className: 'rounded-[13px] max-w-[336px]',
            description: (
                <ToastCustom
                    type={type}
                    content={message}
                    description={description}
                />
            )
        });
    }, [duration, toast]);

    useEffect(() => {
        if (openToast && type && message) {
            const timeoutId = setTimeout(() => {
                setToast(false)
            }, duration)

            showToast(type, message, description)

            return () => clearTimeout(timeoutId);
        }
    }, [openToast, type, message, description, duration, showToast, setToast])

    if (!isMounted) return null;

    return (
        // <LenisProvider>
        <QueryClientProvider client={queryClient}>
            <main id="scroll-container" className='bg-white min-w-screen lg:min-h-screen min-h-dvh custom-tailwind custom-size-text custom-swiper relative border-gradient scroll-container'>
                <AnimatePresence
                    mode="wait"
                    onExitComplete={() => {
                        if (typeof window == 'undefined') return;
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    <ModalProvider>
                        <ProviderLayout
                            data={data}
                            attribute="class"
                            defaultTheme="light"
                            themes={KEY_COOKIES.THEME}
                            enableSystem={false}
                            disableTransitionOnChange
                        >
                            <ScrollbarStyle />
                            {/* {!isVisibleTablet && <CursorFollower />} */}
                            {children}
                            <ToastShadcnUi />
                        </ProviderLayout>
                    </ModalProvider>
                </AnimatePresence>
            </main>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
        // </LenisProvider >
    )
});

RootLayout.displayName = 'RootLayout';

export default RootLayout