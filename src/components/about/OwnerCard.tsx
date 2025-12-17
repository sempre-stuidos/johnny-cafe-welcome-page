"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

interface OwnerCardProps {
  name: string;
  role: string;
  image: string;
  description: string | string[];
}

export default function OwnerCard({ name, role, image, description }: OwnerCardProps) {
  const { theme } = useTheme();

  // Handle description as either string or array of strings
  const descriptionArray = Array.isArray(description) ? description : [description];

  return (
    <div
      className={cn(
        "flex flex-col",
        "gap-6 md:gap-8",
        "w-full"
      )}
    >
      {/* Name and Role - Top Left */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p
              style={{
                fontFamily: "var(--font-pinyon-script)",
                fontSize: "clamp(var(--font-size-3xl), 8vw, var(--font-size-6xl))",
                color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--theme-text-light-cream)",
                lineHeight: "var(--line-height-normal)",
                fontWeight: "400",
                fontStyle: "normal",
                transition: "font-weight 0.3s ease"
              }}
              className="cursor-pointer"
          >
            {name}
          </p>
          <StarIcon
              className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
              fill="#B29738"
          />
        </div>
        <p
            className={cn(
                "text-sm md:text-base",
                "uppercase",
                "tracking-wider"
            )}
            style={{
              fontFamily: "var(--font-gayathri)",
              color: theme === "day" ? "var(--about-text)" : "var(--theme-text-light-cream)",
            }}
        >
          {role}
        </p>
      </div>

      {/* Image and Text Block - Side by Side */}
      <div
          className={cn(
              "flex flex-col md:flex-row",
              "gap-6 md:gap-8",
              "items-start"
          )}
      >
        {/* Image on the left */}
        <div
            className={cn(
                "relative",
                "w-full md:w-[400px]",
            "h-[400px] md:h-[500px]",
            "flex-shrink-0",
            "overflow-hidden",
            "border-2 border-[#B29738]"
          )}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Text Block on the right */}
        <div
          className={cn(
            "flex-1",
            "p-6 md:p-8",
            "border-2 border-[#B29738]",
            "h-[400px] md:h-[500px]",
            "overflow-y-auto"
          )}
        >
          <div className={cn(
            "flex flex-col",
            "gap-4",
            "h-full"
          )}>
            {descriptionArray.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "text-base md:text-lg",
                  "font-gayathri",
                  "font-normal",
                  "leading-relaxed",
                  "text-left"
                )}
                style={{
                  fontFamily: "var(--font-gayathri)",
                  color: theme === "day" ? "var(--theme-text-body)" : "var(--theme-text-body)",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

