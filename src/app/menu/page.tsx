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
        "w-full min-h-screen md:min-h-[90vh]",
        "transition-colors duration-300",
        theme === "day" ? "bg-[#D3E5CD]" : "bg-[#011A0C]"
      )}
    >
        {/* Content */}
        <div
          className={cn(
            "relative z-20",
            "flex flex-col",
            "w-full max-w-[1440px] gap-8",
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
      </section>
  );
}
