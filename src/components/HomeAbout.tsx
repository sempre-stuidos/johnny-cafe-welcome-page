"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { StarDivider } from "@/components/icons";
import content from "@/data/content.json";
import { useScrollReveal } from "@/lib/animations/hooks";

export default function HomeAbout() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();

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
            "flex flex-col-reverse md:flex-row",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-4 md:gap-12"
          )}
        >
          {/* Text Content - Left on both mobile and desktop */}
          <div
            className={cn(
              "flex flex-col",
              "gap-4 md:gap-6",
              "w-[64%] md:w-[60%]",
              "order-1"
            )}
          >
            <h2 className="section-heading">
              {content.about.title}
            </h2>

            {content.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="about-paragraph"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column - Star Divider on mobile/desktop */}
          <div
            className={cn(
              "flex flex-col items-center justify-center",
              "w-full md:w-[40%]",
              "order-2"
            )}
          >
            <StarDivider className="w-full max-w-[400px] h-auto" />
          </div>

          {/* Records Image - Right side on both mobile and desktop (absolute) */}
          <div
            className={cn(
              "absolute right-0 top-0 md:-top-30",
              "w-auto h-auto",
              "z-40",
              "pointer-events-none"
            )}
          >
            <Image
              src={
                theme === "day"
                  ? "/assets/imgs/records-day.png"
                  : "/assets/imgs/records-night.png"
              }
              alt="Vinyl records"
              width={575}
              height={904}
              className={cn(
                "object-contain transition-transform duration-300",
                "max-h-[500px] sm:max-h-[600px] md:max-h-[904px]",
                "w-auto"
              )}
              unoptimized
            />
          </div>
        </div>
      </div>

    </section>
  );
}

