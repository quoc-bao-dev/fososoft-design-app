"use client";

import Casestudy from "./components/Casestudy";
import CTAFooter from "./components/CTAFooter";
import Hero from "./components/Hero";
import Partner from "./components/Partner";
import PriceList from "./components/PriceList";
import Procedure from "./components/Procedure";
import Project from "./components/Project";
import Questions from "./components/Questions";
import Ready from "./components/Ready";
import Solution from "./components/Solution";
import Why from "./components/Why";
import { useEffect } from "react";
import { scrollToSection } from "@/utils/scroll/scrollUtils";

const DesignAppPage = () => {
  // Handle scroll to section after navigation
  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      // Clear from storage
      sessionStorage.removeItem("scrollToSection");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 xl:gap-14 overflow-hidden">
      <Hero />
      <Ready />
      <Why />
      <div id="quy-trinh">
        <Procedure />
      </div>
      <Solution />
      <div id="du-an">
        <Project />
      </div>
      <div id="bang-gia">
        <PriceList />
      </div>
      <Partner />
      <Casestudy />
      <div id="cau-hoi-thuong-gap">
        <Questions />
      </div>
      <CTAFooter />
    </div>
  );
};

export default DesignAppPage;
