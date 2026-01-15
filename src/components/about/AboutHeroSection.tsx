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

  const storyContent = content.aboutPage.story;


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
          "h-full w-full ",
          "px-4 md:px-8 pt-32 py-8 pb-0 "
        )}
        data-animate="hero-content"
      >
        <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-6 md:gap-8">

          {/* Image Left / Text Right Section */}
          <div
              className={cn(
                  "flex flex-col md:flex-row",
                  "h-full w-full",
                  "gap-4 md:gap-8"
              )}
          >
              {/* Image - Bottom on mobile, Right on desktop */}
              <div
                  className={cn(
                      "hidden md:flex items-end justify-center md:justify-end",
                      "w-full md:w-[55%]",
                      "order-2",
                      "pb-0"
                  )}
              >
                  <div
                      className={cn(
                          "hero-frame",
                          "w-full",
                          "max-w-[597px]",
                          "h-[400px] md:h-[600px]"
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
                    "w-full md:w-[55%]",
                    "py-4 md:py-6",
                    "order-1"
                )}
            >
              <Image
                  src="/about-us-title.svg"
                  alt={storyContent.title}
                  width={600}
                  height={600}
                  className="cursor-pointer"
                  style={{
                    width: "clamp(var(--font-size-8xl), 8vw, var(--font-size-9xl))",
                    height: "180px",
                    transition: "opacity 0.3s ease"
                  }}
                  unoptimized
              />

              {storyContent.paragraphs.map((paragraph, index) => (
                  <p
                      key={index}
                      className={cn(
                          "text-base md:text-lg",
                          "font-normal",
                          "leading-relaxed"
                      )}
                      style={{
                        fontFamily: "Arial, Helvetica, sans-serif",
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
