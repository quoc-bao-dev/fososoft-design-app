"use client";

import { useState, useEffect } from 'react';
import { useRegisterButtonVisibility } from './useRegisterButtonVisibility';
import { useResizeStore } from '@/stores/useResizeStore';

export const useScrollDirection = (threshold = 50) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { setHeaderVisible } = useRegisterButtonVisibility();
  
  // Sử dụng useResizeStore để kiểm tra kích thước màn hình
  const { isVisibleTablet } = useResizeStore();

  useEffect(() => {
    // Nếu là màn hình tablet hoặc nhỏ hơn, không thực hiện logic cuộn
    if (isVisibleTablet) {
      return;
    }
    
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Đặt hướng cuộn chỉ khi thay đổi vượt quá ngưỡng
      if (Math.abs(scrollY - lastScrollY) >= threshold) {
        setScrollDirection(direction);
      }
      
      // Cập nhật vị trí cuộn hiện tại
      setScrollY(scrollY);
      
      // Cập nhật trạng thái hiển thị header
      // Header hiển thị khi: đang cuộn lên HOẶC đang ở đầu trang (scrollY < 100)
      setHeaderVisible(direction === 'up' || scrollY < 100);
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    // Thêm event listener
    window.addEventListener('scroll', updateScrollDirection);

    // Cập nhật ban đầu
    updateScrollDirection();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [threshold, setHeaderVisible, isVisibleTablet]);  // Thêm isVisibleTablet vào dependencies

  return { scrollDirection, scrollY };
}; 