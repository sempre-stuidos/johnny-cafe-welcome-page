"use client";

import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-12 w-full">
      {/* Category Heading */}
      <h5 className="menu-category-heading">
        {title}
      </h5>

      {/* Menu Items Container - Full Width Single Column */}
      {items && items.length > 0 && (
        <div className="grid grid-cols-1 gap-y-6 w-full">
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
