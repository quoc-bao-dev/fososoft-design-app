"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface PathCheckerWrapperProps {
  children: React.ReactNode;
  dataFmrpPages: string[];
}

const PathCheckerWrapper = ({ children, dataFmrpPages }: PathCheckerWrapperProps) => {
  const pathname = usePathname();

  if (!dataFmrpPages.includes(pathname)) {
    return null;
  }
  
  return <>{children}</>;
};

export default PathCheckerWrapper; 