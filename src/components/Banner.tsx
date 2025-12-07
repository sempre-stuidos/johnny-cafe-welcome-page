"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useBannerAnimation } from "@/lib/animations/useBannerAnimation";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";

export default function Banner() {
  const { theme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useBannerAnimation(isDesktop);

  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const { brunch, dinner, jazz } = content.banner;

  if (!isMounted) {
    return (
      <div 
        className={cn(
          "w-full py-2 px-4 flex items-center justify-center transition-colors duration-300 border-b border-white/10",
          theme === "day" ? "bg-nav-day" : "bg-nav-night"
        )}
        style={{ minHeight: "36px" }}
      />
    );
  }

  return (
    <div 
      className={cn(
        "w-full py-2 px-4 flex items-center justify-center transition-colors duration-300 border-b border-white/10",
        theme === "day" ? "bg-nav-day" : "bg-nav-night"
      )}
    >
      <div 
        ref={isDesktop ? containerRef : null}
        className="hidden md:flex items-center justify-center gap-4 text-center"
        data-animate="nav-banner"
      >
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
        ref={!isDesktop ? containerRef : null}
        className="md:hidden relative w-full text-center min-h-[20px]"
        data-animate="nav-banner"
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

