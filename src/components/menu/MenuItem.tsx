"use client";

import { ReactElement } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
}

/**
 * Renders menu item name with numbers in parentheses styled with Amoret Sans font
 */
function renderMenuItemName(name: string): ReactElement {
  // Match patterns like "(4)" or "(123)" - numbers in parentheses
  const regex = /(\((\d+)\))/g;
  const parts: (string | ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(name)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(name.substring(lastIndex, match.index));
    }
    
    // Add the styled number in parentheses
    parts.push(
      <span key={match.index} style={{ fontFamily: "var(--font-amoret-sans)" }}>
        {match[0]}
      </span>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text after the last match
  if (lastIndex < name.length) {
    parts.push(name.substring(lastIndex));
  }
  
  // If no matches found, return the original name as JSX
  if (parts.length === 0) {
    return <>{name}</>;
  }
  
  return <>{parts}</>;
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
          {renderMenuItemName(name)}
        </h6>
        <span
          className={cn(
            "text-menu-price whitespace-nowrap",
            theme === "day" ? "text-menu-price-day" : "text-menu-price-night"
          )}
        >
          {price.toFixed(2)}
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
