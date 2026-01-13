"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface MenuHeaderProps {
  activeMenu: "brunch" | "dinner" | "late-night";
  onMenuChange: (menu: "brunch" | "dinner" | "late-night") => void;
}

export default function MenuHeader({ activeMenu, onMenuChange }: MenuHeaderProps) {
  const { theme } = useTheme();
  const starRef = useRef<HTMLDivElement>(null);
  const brunchRef = useRef<HTMLParagraphElement>(null);
  const dinnerRef = useRef<HTMLParagraphElement>(null);
  const lateNightRef = useRef<HTMLParagraphElement>(null);
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
    if (!starRef.current || !brunchRef.current || !dinnerRef.current || !lateNightRef.current) return;

    let targetRef: HTMLParagraphElement;
    if (activeMenu === "brunch") {
      targetRef = brunchRef.current;
    } else if (activeMenu === "dinner") {
      targetRef = dinnerRef.current;
    } else {
      targetRef = lateNightRef.current;
    }
    
    const targetRect = targetRef.getBoundingClientRect();
    const containerRect = targetRef.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;

    // Calculate position relative to the parent container
    const leftPosition = targetRect.left - containerRect.left + targetRect.width / 2 + 10;

    gsap.to(starRef.current, {
      left: leftPosition,
      duration: 0.6,
      ease: "power2.inOut",
      rotate: activeMenu === "brunch" ? 0 : activeMenu === "dinner" ? 180 : 90
    });
  }, [activeMenu]);

  return (
    <div ref={headerRef} className="flex flex-col gap-4 md:gap-6 w-full">
      {/* MENU Heading */}
      <h4
        className={cn(
          "menu-page-heading",
          theme === "day" ? "menu-page-heading-day" : "menu-page-heading-night"
        )}
      >
        MENU
      </h4>

      <div className="flex flex-col gap-1 md:gap-2 w-full">
        {/* Brunch and Dinner with Star */}
        <div className="flex gap-2 md:gap-8 relative w-full">
          {/* Star Icon - animated with GSAP */}
          <div
            ref={starRef}
            className="absolute -top-[26px] md:-top-[14px] z-10 left-[70px]"
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
          <p
            ref={brunchRef}
            className={cn(
              "menu-tab-item cursor-pointer",
              theme === "day" ? "menu-tab-item-day" : "menu-tab-item-night"
            )}
            style={{ fontWeight: activeMenu === "brunch" ? 600 : 400 }}
            onClick={() => onMenuChange("brunch")}
          >
            Brunch
          </p>
          <p
            ref={dinnerRef}
            className={cn(
              "menu-tab-item cursor-pointer",
              theme === "day" ? "menu-tab-item-day" : "menu-tab-item-night"
            )}
            style={{ fontWeight: activeMenu === "dinner" ? 600 : 400 }}
            onClick={() => onMenuChange("dinner")}
          >
            Dinner
          </p>
          <p
            ref={lateNightRef}
            className={cn(
              "menu-tab-item cursor-pointer",
              theme === "day" ? "menu-tab-item-day" : "menu-tab-item-night"
            )}
            style={{ fontWeight: activeMenu === "late-night" ? 600 : 400 }}
            onClick={() => onMenuChange("late-night")}
          >
            Late Night
          </p>
        </div>

        {/* Horizontal Separator Line */}
        <div className="menu-separator w-full h-[1px]" />
      </div>
    </div>
  );
}

