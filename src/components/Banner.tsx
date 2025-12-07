"use client";

import { useState, useEffect } from "react";
import { useBannerAnimation } from "@/lib/animations/useBannerAnimation";
import content from "@/data/content.json";

export default function Banner() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useBannerAnimation(isDesktop);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const { brunch, dinner, jazz } = content.banner;

  return (
    <div className="w-full py-2 px-4 flex items-center justify-center transition-colors duration-300 border-b border-white/10 bg-nav">
      <div className="hidden md:flex items-center justify-center gap-4 text-center">
        <span className="banner-text">
          Brunch: {brunch}
        </span>
        <span className="banner-separator">
          |
        </span>
        <span className="banner-text">
          Dinner: {dinner}
        </span>
        <span className="banner-separator">
          |
        </span>
        <span className="banner-text">
          Live Jazz: {jazz}
        </span>
      </div>

      <div
        ref={containerRef}
        className="md:hidden relative w-full text-center min-h-[20px]"
      >
        <div
          data-banner-section
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="banner-text">
            Brunch: {brunch}
          </span>
        </div>
        <div
          data-banner-section
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="banner-text">
            Dinner: {dinner}
          </span>
        </div>
        <div
          data-banner-section
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="banner-text">
            Live Jazz: {jazz}
          </span>
        </div>
      </div>
    </div>
  );
}

