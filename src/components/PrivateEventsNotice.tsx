"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { usePageLoadAnimation } from "@/lib/animations/hooks";

export default function PrivateEventsNotice() {
  const { theme } = useTheme();

  // Page load animation - triggers after nav completes
  usePageLoadAnimation('[data-animate="private-events-content"]', "hero");

  return (
    <section
      className={cn(
        "relative",
        "w-full h-[100vh] md:h-auto md:min-h-[668px]",
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
          "px-4 md:px-8"
        )}
        data-animate="private-events-content"
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full md:h-[90vh] w-full max-w-[1200px]",
            "mx-auto gap-4 md:gap-8"
          )}
        >
          {/* Text Content - Centered */}
          <div
            className={cn(
              "flex flex-col items-center justify-center",
              "w-full",
              "py-4 md:py-6",
              "text-center"
            )}
          >
            <div className="hero-title-section mt-2 md:mt-6">
              <h3 className="mb-4 md:mb-6">PRIVATE EVENTS</h3>
              
              <h4 className="max-w-[600px] mb-8 md:mb-12 mx-auto">
                If you are looking for private events, please make an inquiry
              </h4>
              
              <div className="flex justify-center w-full">
                <a
                  href="mailto:johnnygs478@gmail.com"
                  className={cn(
                    "btn-reservation",
                    "flex items-center gap-2",
                    "mt-4 md:mt-8 mb-4",
                    "inline-flex"
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
          </div>
        </div>
      </div>
    </section>
  );
}

