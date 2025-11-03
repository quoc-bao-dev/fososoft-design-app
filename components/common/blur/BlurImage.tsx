"use client"
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";

type BlurImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    classNameContainer?: string;
    className?: string;
    blurDataURL?: string;
    priority?: boolean;
    loading?: "eager" | "lazy";
    style?: any;
    onClick?: () => void;
    onLoad?: () => void; // ✅ Callback khi ảnh đã load
};

const BlurImage: React.FC<BlurImageProps> = ({
    src,
    alt,
    width,
    height,
    classNameContainer = "",
    className = "",
    blurDataURL = "data:image/jpeg;base64,/9j/4AAQSk...",
    priority = false,
    loading,
    style,
    onLoad, // ✅ Nhận callback
}) => {
    const loadedRef = useRef<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState(false);

    // Callback giúp tránh re-render không cần thiết
    const handleLoad = useCallback(() => {
        loadedRef.current[src] = true; // ✅ Ghi nhận ảnh này đã load
        setLoaded(true);
        onLoad?.(); // ✅ Gọi hàm callback từ cha
    }, [onLoad]);

    const handleError = useCallback(() => {
        loadedRef.current[src] = true;
        setLoaded(true);
        onLoad?.(); // ✅ Gọi luôn khi lỗi (tránh treo)
    }, [onLoad]);

    // Nếu ảnh đã load trước đó → đảm bảo trạng thái đúng (trường hợp src không đổi)
    useEffect(() => {
        if (loadedRef.current[src]) setLoaded(true);
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${classNameContainer}`}>
            {/* Skeleton nếu ảnh chưa tải */}
            {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse size-full" />}

            <Image
                key={src} // 🔑 Quan trọng nếu dùng trong list
                src={src}
                alt={alt}
                // fill
                // sizes="(max-width: 768px) 100vw, 50vw"
                {...(width && height
                    ? { width, height }
                    : { fill: true, sizes: "(max-width: 768px) 100vw, 50vw" })}
                className={`${className} transition-opacity duration-700 size-full`}
                placeholder="blur"
                blurDataURL={blurDataURL}
                priority={priority}
                {...(!priority ? { loading: loading || "lazy" } : {})}
                decoding="async"
                onLoadingComplete={handleLoad}
                onError={handleError}
                style={{
                    opacity: loaded ? 1 : 0,
                    filter: loaded ? "blur(0px)" : "blur(2px)",
                    ...style,
                }}
            />
        </div>
    );
};

// Ngăn re-render khi không có props thay đổi
export default memo(BlurImage);
