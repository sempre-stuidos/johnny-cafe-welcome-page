"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn, getCategoryDisplayTitle } from "@/lib/utils";
import MenuHeader from "@/components/menu/MenuHeader";
import CategorySection, { MenuItemData } from "@/components/menu/CategorySection";
import gsap from "gsap";

interface MenuPageClientProps {
  brunchCategories: Record<string, MenuItemData[]>;
  dinnerCategories: Record<string, MenuItemData[]>;
  lateNightCategories: Record<string, MenuItemData[]>;
}

export default function MenuPageClient({ brunchCategories, dinnerCategories, lateNightCategories }: MenuPageClientProps) {
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<"brunch" | "dinner" | "late-night">("brunch");
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgTileCount, setBgTileCount] = useState(90);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Calculate needed background tiles based on content height
  useEffect(() => {
    const updateTileCount = () => {
      if (sectionRef.current) {
        const sectionHeight = sectionRef.current.scrollHeight;
        // Each tile is minimum 400px tall, 3 columns per row
        // Add extra 50% buffer to ensure we never run out
        const rowsNeeded = Math.ceil((sectionHeight / 400) * 1.5);
        const tilesNeeded = rowsNeeded * 3; // 3 columns
        setBgTileCount(Math.max(90, tilesNeeded)); // Minimum 90 tiles
      }
    };

    // Update on mount and when menu changes
    updateTileCount();
    
    // Small delay to ensure content is rendered
    const timer = setTimeout(updateTileCount, 100);
    
    return () => clearTimeout(timer);
  }, [activeMenu]);

  // Initial page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMenuChange = (menu: "brunch" | "dinner" | "late-night") => {
    if (menu === activeMenu || isAnimating) return;

    setIsAnimating(true);

    // Fade out current content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Switch menu
        setActiveMenu(menu);
        
        // Fade in new content
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 10
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              setIsAnimating(false);
            }
          }
        );
      }
    });
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
    'soups',
    'starters',
    'mains',
    'seafood_specialties',
    'hakka_specials',
    'veg_vegan_specialties',
    'bread_selection',
    'rice_selection',
    'sides_accompaniments'
  ];

  // Define category order for late night menu
  const lateNightCategoryOrder = [
    'small_plates',
    'jazz_bar_bites',
    'desserts'
  ];

  return (
    <section
      ref={sectionRef}
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
      {/* Background Image - Tiled grid with no seams */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "grid grid-cols-3 gap-0",
            "w-[calc(100%+6px)]",
            "-ml-[3px] -mt-[2px]"
          )}
          style={{
            gridAutoRows: "minmax(400px, auto)"
          }}
        >
          {[...Array(bgTileCount)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-[url('/assets/imgs/bg.png')]",
                "bg-center bg-cover",
                "-m-px"
              )}
              style={{
                minHeight: "400px"
              }}
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
          
          {/* Menu Content with fade animation */}
          <div ref={contentRef}>
            {/* Brunch Menu Sections */}
            {activeMenu === "brunch" && (
              <div className="flex flex-col gap-8">
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
              </div>
            )}
            
            {/* Dinner Menu Sections */}
            {activeMenu === "dinner" && (
              <div className="flex flex-col gap-8">
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
              </div>
            )}
            
            {/* Late Night Menu Sections */}
            {activeMenu === "late-night" && (
              <div className="flex flex-col gap-8">
                {lateNightCategoryOrder.map((categorySlug) => {
                  const items = lateNightCategories[categorySlug];
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

