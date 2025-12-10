"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface MenuHeaderProps {
  activeMenu: "brunch" | "dinner";
  onMenuChange: (menu: "brunch" | "dinner") => void;
}

export default function MenuHeader({ activeMenu, onMenuChange }: MenuHeaderProps) {
  const { theme } = useTheme();
  const starRef = useRef<HTMLDivElement>(null);
  const brunchRef = useRef<HTMLParagraphElement>(null);
  const dinnerRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Initial fade-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  // Animate star movement when active menu changes
  useEffect(() => {
    if (!starRef.current || !brunchRef.current || !dinnerRef.current) return;

    const targetRef = activeMenu === "brunch" ? brunchRef.current : dinnerRef.current;
    const targetRect = targetRef.getBoundingClientRect();
    const containerRect = targetRef.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;

    // Calculate position relative to the parent container
    const leftPosition = targetRect.left - containerRect.left + targetRect.width / 2 + 10;

    gsap.to(starRef.current, {
      left: leftPosition,
      duration: 0.6,
      ease: "power2.inOut",
      rotate: activeMenu === "brunch" ? 0 : 180
    });
  }, [activeMenu]);

  return (
    <div ref={headerRef} className="flex flex-col gap-4 md:gap-6">
      {/* MENU Heading */}

      <h4
        style={{
          fontSize: "clamp(var(--font-size-3xl), 7vw, var(--font-size-6xl))",
          color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--color-theme-accent)",
          fontWeight: 700,
          lineHeight: "var(--line-height-tight)",
        }}
        className="uppercase"
      >
        MENU
      </h4>

      <div className="flex flex-col gap-1 md:gap-2">
        {/* Brunch and Dinner with Star */}
        <div className="flex items-start gap-6 md:gap-8 relative">
          {/* Star Icon - animated with GSAP */}
          <div
            ref={starRef}
            className="absolute -top-1 z-10"
            style={{
              left: "70px"
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38 19C20.7639 19.9744 19.9744 20.7658 19 38C18.0256 20.7639 17.2342 19.9744 0 19C17.2361 18.0256 18.0256 17.2342 19 0C19.9744 17.2361 20.7658 18.0256 38 19Z"
                fill={theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)"}
                />
            </svg>
          </div>
          <div className="flex items-center gap-8 md:gap-24">
            <p
              ref={brunchRef}
              style={{
                fontFamily: "var(--font-pinyon-script)",
                fontSize: "clamp(var(--font-size-2xl), 8vw, var(--font-size-5xl))",
                  color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)",
                lineHeight: "var(--line-height-normal)",
                fontWeight: activeMenu === "brunch" ? 600 : 400,
                fontStyle: "normal",
                transition: "font-weight 0.3s ease"
              }}
              className="cursor-pointer"
              onClick={() => onMenuChange("brunch")}
            >
              Brunch
            </p>
            <p
              ref={dinnerRef}
              style={{
                fontFamily: "var(--font-pinyon-script)",
                fontSize: "clamp(var(--font-size-2xl), 8vw, var(--font-size-5xl))",
                  color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)",
                  lineHeight: "var(--line-height-normal)",
                fontWeight: activeMenu === "dinner" ? 600 : 400,
                fontStyle: "normal",
                transition: "font-weight 0.3s ease"
              }}
              className="cursor-pointer"
              onClick={() => onMenuChange("dinner")}
            >
              Dinner
            </p>
          </div>
        </div>

        {/* Horizontal Separator Line */}
        <div
          className="w-full h-[1px]"
          style={{
            backgroundColor: "var(--theme-text-dark-green)",
          }}
        />
      </div>

    </div>
  );
}

