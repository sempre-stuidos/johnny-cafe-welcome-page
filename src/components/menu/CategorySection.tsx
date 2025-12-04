"use client";

import { ReactNode } from "react";
import MenuItem from "./MenuItem";

export interface MenuItemData {
  name: string;
  price: number;
  description: string;
}

interface CategorySectionProps {
  title: string;
  items?: MenuItemData[];
  children?: ReactNode;
}

export default function CategorySection({ title, items, children }: CategorySectionProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-12">
      {/* Category Heading */}
      <h5
        style={{
          color: "var(--theme-accent)",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "var(--font-size-xl)",
          textTransform: "uppercase",
          fontWeight: 500,
          letterSpacing: "var(--letter-spacing-wide)",
        }}
      >
        {title}
      </h5>

      {/* Menu Items Container - Two Column Layout */}
      {items && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-6 gap-x-[192px]">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      )}

    </div>
  );
}
