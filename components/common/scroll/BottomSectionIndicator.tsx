"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SectionItem {
  id: string;
  label: string;
}

interface BottomSectionIndicatorProps {
  sections: SectionItem[];        // danh sách section theo thứ tự trên trang
  startId?: string;               // id bắt đầu hiển thị (vd: "customer-problem")
}

// Thanh tiêu đề các component ở dưới cùng màn hình, highlight mục đang ở trong viewport
const BottomSectionIndicator: React.FC<BottomSectionIndicatorProps> = ({ sections, startId }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [visible, setVisible] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // map id -> index để tính underline
  const idToIndex = useMemo(() => {
    const m = new Map<string, number>();
    sections.forEach((s, i) => m.set(s.id, i));
    return m;
  }, [sections]);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      // Chỉ tính khi phần giữa màn hình (20%) cắt section → tránh case section quá ngắn
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handler = (entries: IntersectionObserverEntry[]): void => {
      // Lấy entry có mức độ hiển thị cao nhất
      let best: IntersectionObserverEntry | undefined;
      for (const entry of entries) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
      if (best && best.isIntersecting) {
        const el = best.target as Element as HTMLElement;
        if (el?.id) setActiveId(el.id);
      }
    };

    const io = new IntersectionObserver(handler, options);
    observerRef.current = io;

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    return () => {
      io.disconnect();
    };
  }, [sections]);

  // Điều khiển hiển thị: chỉ hiện khi đã chạm startId nếu có
  useEffect(() => {
    if (!startId) {
      setVisible(true);
      return;
    }
    const startEl = document.getElementById(startId);
    if (!startEl) return;

    const onScroll = () => {
      const startTop = startEl.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      setVisible(viewportBottom > startTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [startId]);

  const activeIndex = idToIndex.get(activeId) ?? 0;

  // Center active tab inside horizontal list
  const centerTab = (id: string) => {
    const container = listRef.current;
    const item = container?.querySelector<HTMLDivElement>(`[data-section-id="${id}"]`);
    if (!container || !item) return;
    const containerWidth = container.clientWidth;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const targetScroll = Math.max(0, itemCenter - containerWidth / 2);
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    if (activeId) centerTab(activeId);
  }, [activeId]);

  return (
    <AnimatePresence>
      {visible && sections.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-[60] w-full lg:hidden"
        >
          <div className="bg-white/80 backdrop-blur-md  shadow-sm">
            <div ref={listRef} className="relative flex items-center gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
              {sections.map((s) => (
                <div key={s.id} data-section-id={s.id} className="relative py-2 px-2 flex-shrink-0">
                  <button
                    className={`whitespace-nowrap text-sm md:text-base font-semibold transition-colors ${
                      s.id === activeId ? "text-[#10805B]" : "text-[#94A3B8] hover:text-[#10805B]"
                    }`}
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      if (!el) return;
                      const top = el.getBoundingClientRect().top + window.scrollY - 90; // offset header
                      window.scrollTo({ top, behavior: "smooth" });
                      centerTab(s.id);
                    }}
                  >
                    {s.label}
                  </button>
                  {s.id === activeId && (
                    <motion.span
                      layoutId="indicator-underline"
                      className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] bg-green-700 rounded-t-full"
                      style={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />)
                  }
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomSectionIndicator;


