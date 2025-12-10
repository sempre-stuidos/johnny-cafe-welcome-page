"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export default function PrivateEventsNotice() {
  const { theme } = useTheme();

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto",
        "transition-colors duration-300",
        "bg-about-section"
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
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-12"
        )}
      >
        <div className={cn(
          "flex flex-col items-center",
          "w-full max-w-[1200px]",
          "mx-auto",
          "text-center"
        )}>
          <h2 className="section-heading mb-4">
            Private Events & Booking
          </h2>
          
          <p className="text-about mb-8 md:mb-12 max-w-[900px]">
            Host your special occasion in the intimate ambiance of Johnny G's. Perfect for corporate events, celebrations, and private performances.
          </p>

          {/* Three Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-[1000px] mb-12">
            {/* Intimate Gatherings */}
            <div className="flex flex-col items-center gap-4">
              <div className="private-events-icon-circle">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="private-events-icon"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="private-events-feature-title">
                INTIMATE GATHERINGS
              </h3>
              <p className="text-about">
                Perfect for groups of 10-50 guests
              </p>
            </div>

            {/* Live Entertainment */}
            <div className="flex flex-col items-center gap-4">
              <div className="private-events-icon-circle">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="private-events-icon"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <h3 className="private-events-feature-title">
                LIVE ENTERTAINMENT
              </h3>
              <p className="text-about">
                Custom jazz performances available
              </p>
            </div>

            {/* Flexible Timing */}
            <div className="flex flex-col items-center gap-4">
              <div className="private-events-icon-circle">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="private-events-icon"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="private-events-feature-title">
                FLEXIBLE TIMING
              </h3>
              <p className="text-about">
                Daytime and evening availability
              </p>
            </div>
          </div>

          {/* Make Inquiry Button */}
                <a
                  href="mailto:johnnygs478@gmail.com"
                  className={cn(
                    "btn-reservation",
              "flex items-center gap-2"
                  )}
                >
                  Make Inquiry
                  <Image
                    src="/right-arrow-vector.svg"
                    alt="Right arrow"
                    width={20}
                    height={20}
                    className={cn(
                      "btn-reservation-arrow",
                      "w-5 h-5"
                    )}
                  />
                </a>
        </div>
      </div>
    </section>
  );
}
