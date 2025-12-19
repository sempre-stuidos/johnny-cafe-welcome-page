"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";
import { useScrollReveal } from "@/lib/animations/hooks";
import OwnerCard from "./OwnerCard";

export default function AboutContentSection() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();

  const secondSection = content.aboutPage.secondSection;

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[600px]",
        "transition-colors duration-300",
        "bg-about-section",
        "z-30"
      )}
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
          "transition-colors duration-300",
          theme === "day" ? "overlay-about-day" : "overlay-about-night"
        )}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-12"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-col",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-8 md:gap-12"
          )}
        >
          {/* Header Section with decorative image */}
          <div
            className={cn(
              "relative",
              "flex flex-col md:flex-row",
              "w-full",
              "items-start"
            )}
          >
            {/* Left-aligned Header */}
            <div className="text-left flex-1">
              <h2 className="section-heading">
                {secondSection.title}
              </h2>

              {/* Left-aligned Text */}
              <div className="text-left max-w-xl mt-4">
                <p
                    className={cn(
                        "text-lg",
                        "font-normal",
                        "leading-relaxed"
                    )}
                    style={{
                      fontFamily: "var(--font-hornbill-trial)",
                      fontSize: 32,
                      fontWeight: "lighter",
                      color: theme === "day" ? "var(--about-title)" : "var(--about-title)",
                }}
                >
                  {secondSection.text}
                </p>
              </div>
            </div>

            {/* Decorative Image - Right side */}
            <div
              className={cn(
                "hidden md:block",
                "absolute right-0 top-0 bottom-0",
                "w-auto h-full",
                "pointer-events-none"
              )}
            >
              <Image
                src="/assets/imgs/events-decor.svg"
                alt="Decorative element"
                width={300}
                height={400}
                className={cn(
                  "object-cover",
                  "h-full w-auto"
                )}
                unoptimized
              />
            </div>
          </div>

          {/* Owner Sections */}
          <div
            className={cn(
              "flex flex-col",
              "w-full",
              "gap-8 md:gap-12"
            )}
          >
            {secondSection.owners?.map((owner, index) => (
              <OwnerCard
                key={index}
                name={owner.name}
                role={owner.role}
                image={owner.image}
                description={owner.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
