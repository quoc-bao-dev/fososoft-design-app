"use client";

import React from "react";
import { useSheetStores } from "../../../stores/useSheetStores";
import { DynamicSheet } from "./DynamicSheet";

const DynamicSheetWrapper = () => {
  const { openSheetCustom } = useSheetStores();
  
  if (!openSheetCustom) {
    return null;
  }
  
  return <DynamicSheet />;
};

export default DynamicSheetWrapper; 