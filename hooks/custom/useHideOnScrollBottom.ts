"use client";
import { useEffect, useRef, useState } from "react";

export const useHideOnScrollBottom = (offset = 100) => {
  // const [hide, setHide] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined" || typeof document === "undefined")
  //     return;

  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;

  //     const scrolledToBottom =
  //       scrollY + windowHeight >= documentHeight - offset;
  //     setHide(scrolledToBottom);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // chạy lần đầu

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [offset]);

  // return hide;
  const [hide, setHide] = useState(false);
  const lastValueRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;

        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          const scrolledToBottom =
            scrollY + windowHeight >= documentHeight - offset;

          if (scrolledToBottom !== lastValueRef.current) {
            setHide(scrolledToBottom);
            lastValueRef.current = scrolledToBottom;
          }

          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // chạy lần đầu

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return hide;
};
