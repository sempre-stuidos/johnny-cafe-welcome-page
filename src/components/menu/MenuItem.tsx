"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
}

export default function MenuItem({ name, price, description }: MenuItemProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-1">
      {/* Title and Price Row */}
      <div className="flex items-start justify-between gap-4">
        <h6
          className={cn(
            "menu-item-name flex-1",
            theme === "day" ? "menu-item-name-day" : "menu-item-name-night"
          )}
        >
          {name}
        </h6>
        <span
          className={cn(
            "text-menu-price whitespace-nowrap",
            theme === "day" ? "text-menu-price-day" : "text-menu-price-night"
          )}
        >
          {price}
        </span>
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-menu-description",
          theme === "day" ? "text-menu-description-day" : "text-menu-description-night"
        )}
      >
        {description}
      </p>
    </div>
  );
}
