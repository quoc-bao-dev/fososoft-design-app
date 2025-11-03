import { animate, motionValue } from "framer-motion";

// Cấu hình khoảng cách offset khi scroll đến section (tính từ top)
// Có thể điều chỉnh để tránh header che mất phần đầu section
export const SCROLL_SECTION_OFFSET = 50; // px

// Khi reload page thì sử dụng hàm này để tự động chuyển lên đầu trang
const scrollToTop = () => {
  const scrollY = motionValue(window.scrollY); // Lưu giá trị hiện tại vào motionValue

  animate(scrollY, 0, {
    type: "keyframes",
    stiffness: 120,
    damping: 25,
    mass: 0.8,
    onUpdate: (value) => window.scrollTo(0, value),
  });
};

// scroll đến section có id phù hợp
const scrollToSection = (idSection: number | string) => {
  const element = document.getElementById(String(idSection));
  if (element) {
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      SCROLL_SECTION_OFFSET;
    const scrollY = motionValue(window.scrollY); // Lưu giá trị cuộn hiện tại

    // Sử dụng framer-motion để cuộn đến vị trí tính toán
    animate(scrollY, y, {
      type: "keyframes",
      stiffness: 120,
      damping: 25,
      mass: 0.8,
      onUpdate: (value: number) => window.scrollTo(0, value),
    });
  }
};

// scroll đến ref đã được chọn
const smoothScrollTo = (targetY: number, duration: number) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

// Map link to section ID for header navigation
const getSectionId = (link: string): string | null => {
  const sectionMap: Record<string, string> = {
    "/quy-trinh": "quy-trinh",
    "/du-an": "du-an",
    "/bang-gia": "bang-gia",
    "/cau-hoi-thuong-gap": "cau-hoi-thuong-gap",
  };
  return sectionMap[link] || null;
};

// Handle scroll to section from header menu
// If on home page, scroll directly. Otherwise navigate to home then scroll.
const handleHeaderMenuClick = (
  link: string,
  pathname: string,
  router: any,
  onMenuClose?: () => void
) => {
  const sectionId = getSectionId(link);

  if (sectionId) {
    // Close menu if callback provided (for mobile)
    if (onMenuClose) {
      onMenuClose();
    }

    // If already on home page, just scroll
    if (pathname === "/") {
      const delay = onMenuClose ? 300 : 100; // Longer delay if closing menu
      setTimeout(() => {
        scrollToSection(sectionId);
      }, delay);
    } else {
      // Store section ID in sessionStorage for scroll after navigation
      sessionStorage.setItem("scrollToSection", sectionId);
      // Navigate to home
      router.push("/");
    }
  }
};

export {
  getSectionId,
  handleHeaderMenuClick,
  scrollToSection,
  scrollToTop,
  smoothScrollTo,
};
