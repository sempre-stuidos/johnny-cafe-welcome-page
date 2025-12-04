"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

export default function HomeReservation() {
  const { theme } = useTheme();

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[668px]",
        "overflow-hidden",
        "transition-colors duration-300"
      )}
      style={{
        backgroundColor:
          theme === "day" ? "rgba(194, 202, 168, 1)" : "rgba(1, 26, 12, 1)",
      }}
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
          "transition-colors duration-300"
        )}
        style={{
          backgroundColor:
            theme === "day"
              ? "rgba(194, 202, 168, 0.85)"
              : "rgba(1, 26, 12, 0.90)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-0 md:py-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full w-full max-w-[1440px]",
            "mx-auto gap-4 md:gap-8"
          )}
        >
          {/* Left Side Content - Top on mobile, Left on desktop */}
          <div
            className={cn(
              "flex flex-col",
              "gap-6 md:gap-8",
              "w-full md:w-[60%]",
              "pt-4 md:pt-6",
              "order-1"
            )}
          >
            {/* Heading */}
              <div className="flex flex-col gap-4">
                  <h4
                      style={{
                          fontSize: "clamp(var(--font-size-3xl), 7vw, var(--font-size-6xl))",
                          color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--color-theme-accent)",
                          fontWeight: 400,
                          lineHeight: "var(--line-height-tight)",
                      }}
                      className="capitalize"
                  >
                     Your Table Awaits
                  </h4>

                  {/* Decorative "Reserve Now" text */}
                  <h2
                      className="text-decorative transition-colors duration-300"
                      style={{
                          fontSize: "var(--font-size-7xl)",
                          color: "#334D2D",
                          lineHeight: "var(--line-height-tight)",
                          fontFamily: "var(--font-pinyon-script"
                      }}
                  >
                      Reserve Now
                  </h2>
              </div>

              {/* Trumpet Player SVG */}
              <div className="relative w-full max-w-[600px] mt-4">
                  <Image
                      src="/home/trumpet-player.svg"
                      alt="Trumpet player"
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain"
                      unoptimized
              />
            </div>
          </div>

          {/* Right Side Form - Bottom on mobile, Right on desktop */}
          <div
            className={cn(
              "flex items-end justify-center md:justify-end",
              "w-full md:w-[40%]",
              "flex-1 md:flex-none",
              "order-2",
              "pb-4 md:mt-8 md:pb-0",
              "relative"
            )}
          >
            <div
              className={cn(
                "hero-frame",
                "w-full h-full",
                "min-h-[300px] max-w-[597px] max-h-[668px]",
                "relative",
                "p-6 md:p-8",
                "overflow-visible"
              )}
              style={{
                backgroundColor: "transparent",
              }}
            >

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
