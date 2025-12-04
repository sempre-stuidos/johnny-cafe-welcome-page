"use client";

import { useTheme } from "@/contexts/ThemeContext";

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
          style={{
            fontFamily: "var(--font-hornbill-trial)",
            fontSize: "var(--font-size-lg)",
              color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)",

              fontWeight: 400,
            lineHeight: "var(--line-height-tight)",
          }}
          className="flex-1"
        >
          {name}
        </h6>
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "var(--font-size-lg)",
              color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)",
            fontWeight: 700,
            lineHeight: "var(--line-height-tight)",
          }}
          className="whitespace-nowrap"
        >
          {price}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "var(--font-size-sm)",
          color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--color-theme-accent)",
          fontWeight: 400,
          lineHeight: "var(--line-height-relaxed)",
          maxWidth: "438px",
        }}
      >
        {description}
      </p>
    </div>
  );
}
