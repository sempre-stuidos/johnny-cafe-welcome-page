"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface MenuHeaderProps {
  activeMenu: "brunch" | "dinner";
  onMenuChange: (menu: "brunch" | "dinner") => void;
}

export default function MenuHeader({ activeMenu, onMenuChange }: MenuHeaderProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* MENU Heading */}

      <h4
        style={{
          fontSize: "var(--font-size-6xl)",
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
          {/* Star Icon - positioned above and slightly right of active menu item */}
          <div
            className={cn(
              "absolute -top-1 z-10",
              activeMenu === "brunch"
                ? "left-[60px] md:left-[70px]"
                : "left-[275px] md:left-[325px]"
            )}
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
                fill={theme === "day" ? "var(--theme-accent)" : "var(--theme-text-light-cream)"}
                />
            </svg>
          </div>
          <div className="flex items-center gap-12 md:gap-24">
            <p
              style={{
                fontFamily: "var(--font-pinyon-script)",
                fontSize: "var(--font-size-5xl)",
                  color: theme === "day" ? "var(--theme-accent)" : "var(--theme-text-light-cream)",
                lineHeight: "var(--line-height-normal)",
                fontWeight: activeMenu === "brunch" ? 600 : 400,
                fontStyle: "normal",
              }}
              className="cursor-pointer"
              onClick={() => onMenuChange("brunch")}
            >
              Brunch
            </p>
            <p
              style={{
                fontFamily: "var(--font-pinyon-script)",
                fontSize: "var(--font-size-5xl)",
                  color: theme === "day" ? "var(--theme-accent)" : "var(--theme-text-light-cream)",
                  lineHeight: "var(--line-height-normal)",
                fontWeight: activeMenu === "dinner" ? 600 : 400,
                fontStyle: "normal",
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

