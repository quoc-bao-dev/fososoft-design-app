"use client";

import { create } from 'zustand';
import { useEffect } from 'react';

interface RegisterButtonState {
  // Nút đăng ký nào đang hiển thị
  visibleButton: 'header' | 'floating' | null;
  
  // Lưu trạng thái cuộn trang
  isHeaderVisible: boolean;
  
  // Thời gian trễ để chờ ẩn/hiện nút đăng ký
  transitionDelay: number;
  
  // Trạng thái hiển thị của nút floating (với độ trễ)
  showFloatingButton: boolean;
  
  // Lưu timer ID để có thể cancel khi cần
  timer: NodeJS.Timeout | null;
  
  // Hàm để thiết lập nút nào được hiển thị
  setVisibleButton: (buttonType: 'header' | 'floating' | null) => void;
  
  // Hàm để cập nhật trạng thái cuộn của header
  setHeaderVisible: (isVisible: boolean) => void;
  
  // Hàm để hủy timer nếu cần
  clearTimer: () => void;
  
  // Kiểm tra xem một loại nút cụ thể có thể hiển thị hay không
  canShowButton: (buttonType: 'header' | 'floating') => boolean;
}

// Tạo store để quản lý trạng thái hiển thị của nút đăng ký
export const useRegisterButtonVisibility = create<RegisterButtonState>((set, get) => ({
  visibleButton: null,
  isHeaderVisible: true,
  transitionDelay: 2000, // 2 giây
  showFloatingButton: false,
  timer: null,
  
  setVisibleButton: (buttonType) => {
    set({ visibleButton: buttonType });
  },
  
  clearTimer: () => {
    const { timer } = get();
    if (timer) {
      clearTimeout(timer);
      set({ timer: null });
    }
  },
  
  setHeaderVisible: (isVisible) => {
    const { clearTimer } = get();
    
    // Luôn cập nhật trạng thái header
    set({ isHeaderVisible: isVisible });
    
    // Clear any existing timer
    clearTimer();
    
    if (isVisible) {
      // Khi header hiện: đặt timer để ẩn nút floating sau 2 giây
      const timerId = setTimeout(() => {
        set({ showFloatingButton: false });
      }, get().transitionDelay);
      
      set({ timer: timerId });
    } else {
      // Khi header ẩn: hiển thị ngay nút floating
      set({ showFloatingButton: true });
    }
  },
  
  canShowButton: (buttonType) => {
    const { isHeaderVisible, showFloatingButton } = get();
    
    // Nếu là nút trong header, luôn hiển thị khi header visible
    if (buttonType === 'header') {
      return isHeaderVisible;
    }
    
    // Nếu là nút floating, hiển thị khi showFloatingButton = true
    if (buttonType === 'floating') {
      return showFloatingButton;
    }
    
    return false;
  }
}));

// Hook để sử dụng trong components và đảm bảo cleanup
export const useRegisterButtonDelayCleanup = () => {
  const { clearTimer } = useRegisterButtonVisibility();
  
  // Reset trạng thái khi component unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);
}; 