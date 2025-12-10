"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";
import { usePageLoadAnimation } from "@/lib/animations/hooks";

export default function AboutHeroSection() {
  const { theme } = useTheme();

  // Page load animation - triggers after nav completes
  usePageLoadAnimation('[data-animate="hero-content"]', "hero");

  const heroContent = content.aboutPage.hero;
  const storyContent = content.aboutPage.story;
  const secondSection = content.aboutPage.secondSection;

  return (
    <section
      className={cn(
        "relative",
        "w-full md:h-auto",
        "overflow-hidden",
        "z-10",
        theme === "day" ? "bg-[#334D2D]" : "bg-[#011A0C]"
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

      {/* Theme Overlay - light for day, dark for night */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          "transition-colors duration-300",
          theme === "day" ? "bg-[#334D2D]/85" : "bg-[#011A0C]/90"
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-8 pb-12"
        )}
        data-animate="hero-content"
      >
        <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-6 md:gap-8">
          {/* Centered Header Section */}
          <div className="flex flex-col items-start justify-center text-center py-4 md:py-8">
            <h4
                style={{
                  fontSize: "clamp(var(--font-size-3xl), 7vw, var(--font-size-6xl))",
                  color: theme === "day" ? "var(--theme-text-light-cream)" : "var(--color-theme-accent)",
                  fontWeight: 700,
                  lineHeight: "var(--line-height-tight)",
                }}
                className="uppercase"
            >
            About Us
            </h4>
          </div>

          {/* Image Left / Text Right Section */}
          <div
              className={cn(
                  "flex flex-col md:flex-row",
                  "h-full w-full",
                  "gap-4 md:gap-8"
              )}
          >
            {/* Image - Right on desktop, Bottom on mobile */}
            <div
                className={cn(
                    "flex items-center justify-center",
                "w-full md:w-[50%]",
                "order-2"
              )}
            >
              <div
                className={cn(
                  "relative",
                  "w-full",
                  "h-[600px]",
                  "max-w-[500px]",
                  "rounded-lg",
                  "overflow-hidden",
                  "border-2 border-[#B29738]"
                )}
              >
                <Image
                  src={storyContent.image}
                  alt={storyContent.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Text Content - Left on desktop, Top on mobile */}
            <div
                className={cn(
                    "flex flex-col",
                    "gap-4 md:gap-6",
                    "w-full md:w-[50%]",
                    "py-4 md:py-6",
                    "order-1"
                )}
            >
              <p
                  style={{
                    fontFamily: "var(--font-pinyon-script)",
                    fontSize: "clamp(var(--font-size-2xl), 8vw, var(--font-size-5xl))",
                    color: theme === "day" ? "var(--theme-text-light-cream)" : "var(--theme-text-light-cream)",
                    lineHeight: "var(--line-height-normal)",
                    fontWeight: 400,
                    fontStyle: "normal",
                    transition: "font-weight 0.3s ease"
                  }}
                  className="cursor-pointer"
              >
                {storyContent.title}

              </p>

              {storyContent.paragraphs.map((paragraph, index) => (
                  <p
                      key={index}
                      className={cn(
                          "text-base md:text-lg",
                          "font-gayathri",
                          "font-normal",
                          "leading-relaxed"
                      )}
                      style={{
                        fontFamily: "var(--font-gayathri)",
                        color: "var(--theme-text-light-cream)",
                      }}
                  >
                    {paragraph}
                  </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
