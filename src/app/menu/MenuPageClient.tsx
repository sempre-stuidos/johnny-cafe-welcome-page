"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn, getCategoryDisplayTitle } from "@/lib/utils";
import MenuHeader from "@/components/menu/MenuHeader";
import CategorySection, { MenuItemData } from "@/components/menu/CategorySection";

interface MenuPageClientProps {
  brunchCategories: Record<string, MenuItemData[]>;
  dinnerCategories: Record<string, MenuItemData[]>;
}

export default function MenuPageClient({ brunchCategories, dinnerCategories }: MenuPageClientProps) {
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<"brunch" | "dinner">("brunch");

  const handleMenuChange = (menu: "brunch" | "dinner") => {
    setActiveMenu(menu);
  };

  // Define category order for brunch menu
  const brunchCategoryOrder = [
    'basic',
    'breakfast',
    'eggs_benedict',
    'omelettes',
    'pancake_waffle_frenchtoast',
    'sandwiches',
    'burgers',
    'salads',
    'lunch_entree',
    'side_orders'
  ];

  // Define category order for dinner menu
  const dinnerCategoryOrder = [
    'soup',
    'appetizers',
    'mains'
  ];

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
              {brunchCategoryOrder.map((categorySlug) => {
                const items = brunchCategories[categorySlug];
                if (!items || items.length === 0) {
                  return null;
                }
                return (
                  <CategorySection
                    key={categorySlug}
                    title={getCategoryDisplayTitle(categorySlug)}
                    items={items}
                  />
                );
              })}
            </>
          )}
          
          {/* Dinner Menu Sections */}
          {activeMenu === "dinner" && (
            <>
              {dinnerCategoryOrder.map((categorySlug) => {
                const items = dinnerCategories[categorySlug];
                if (!items || items.length === 0) {
                  return null;
                }
                return (
                  <CategorySection
                    key={categorySlug}
                    title={getCategoryDisplayTitle(categorySlug)}
                    items={items}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

