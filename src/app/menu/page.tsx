"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import MenuHeader from "@/components/menu/MenuHeader";
import CategorySection, { MenuItemData } from "@/components/menu/CategorySection";
import menuData from "@/data/menu.json";

// Extract menu items from JSON data
const breakfastItems: MenuItemData[] = menuData.brunch.breakfast;
const breakfastAndFriesItems: MenuItemData[] = menuData.brunch.breakfastAndFries;
const eggsBenedictItems: MenuItemData[] = menuData.brunch.eggsBenedict;
const soupItems: MenuItemData[] = menuData.dinner.soup;
const appetizersItems: MenuItemData[] = menuData.dinner.appetizers;
const mainsItems: MenuItemData[] = menuData.dinner.mains;

export default function MenuPage() {
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<"brunch" | "dinner">("brunch");

  const handleMenuChange = (menu: "brunch" | "dinner") => {
    setActiveMenu(menu);
  };

  return (
    <section
      className={cn(
        "relative",
        "w-full min-h-screen md:min-h-[90vh] pt-12",
        "overflow-hidden",
        "transition-colors duration-300"
      )}
      style={{
        backgroundColor:
          theme === "day" ? "rgba(194, 202, 168, 1)" : "rgba(1, 26, 12, 1)",
      }}
    >
      {/* Background Image - 6 tiles grid (3x2) with overlap */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "grid grid-cols-3 grid-rows-2 gap-0",
            "w-[calc(100%+6px)] h-[calc(100%+4px)]",
            "-ml-[3px] -mt-[2px]"
          )}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-[url('/assets/imgs/bg.png')]",
                "bg-center bg-[length:calc(100%+2px)_calc(100%+2px)]",
                "-m-px"
              )}
            />
          ))}
        </div>
      </div>

      {/* Theme Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          "transition-colors duration-300"
        )}
        style={{
          backgroundColor:
            theme === "day"
              ? "rgba(194, 202, 168, 0.85)"
              : "rgba(1, 26, 12, 0.70)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-0 md:py-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            "w-full max-w-[1200px] gap-8",
            "mx-auto",
            "px-4 md:px-8",
            "py-8 md:py-12"
          )}
        >
          <MenuHeader activeMenu={activeMenu} onMenuChange={handleMenuChange} />
          {/* Brunch Menu Sections */}
          {activeMenu === "brunch" && (
            <>
              <CategorySection title="BREAKFAST" items={breakfastItems} />
              <CategorySection title="BREAKFAST AND FRIES" items={breakfastAndFriesItems} />
              <CategorySection title="EGGS BENEDICT" items={eggsBenedictItems} />
            </>
          )}
          {/* Dinner Menu Sections */}
          {activeMenu === "dinner" && (
            <>
              <CategorySection title="SOUP" items={soupItems} />
              <CategorySection title="Appetizers" items={appetizersItems} />
              <CategorySection title="MAINS" items={mainsItems} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
