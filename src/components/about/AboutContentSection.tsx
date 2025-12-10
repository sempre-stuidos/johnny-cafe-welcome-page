"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";
import { useScrollReveal } from "@/lib/animations/hooks";

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
            "mx-auto gap-4 md:gap-6",
            "items-center"
          )}
        >
          {/* Centered Header */}
          <div className="text-center">
            <h2
              className={cn(
                "text-4xl md:text-5xl",
                "font-pinyon-script",
                "font-normal",
                "text-[#B29738]",
                "mb-6"
              )}
              style={{ fontFamily: "var(--font-pinyon-script)" }}
            >
              {secondSection.title}
            </h2>

            {/* Centered Text */}
            <div className="text-center max-w-4xl">
              <p
                  className={cn(
                      "text-lg md:text-xl",
                      "about-paragraph",
                      "font-gayathri",
                      "font-normal",
                      "leading-relaxed"
                  )}
                  style={{ fontFamily: "var(--font-gayathri)" }}
              >
                {secondSection.text}
              </p>
            </div>
          </div>



          {/* Two Images Side-by-Side */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2",
              "gap-8 md:gap-12",
              "w-full",
              "max-w-7xl",
              "mt-4"
            )}
          >
            {secondSection.images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col",
                  "gap-4"
                )}
              >
                <div
                  className={cn(
                    "relative",
                    "w-full",
                    "max-w-[500px]",
                    "mx-auto",
                    "aspect-square",
                    "rounded-lg",
                    "overflow-hidden",
                    "border-2 border-[#B29738]"
                  )}
                >
                  <Image
                    src={typeof image === 'string' ? image : image.url}
                    alt={`${secondSection.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p
                  className={cn(
                    "text-base md:text-lg",
                    "font-gayathri",
                    "font-normal",
                    "leading-relaxed",
                    "text-center"
                  )}
                  style={{
                    fontFamily: "var(--font-gayathri)",
                    color: "var(--theme-text-light-cream)",
                  }}
                >
                  {typeof image === 'string' ? '' : image.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
