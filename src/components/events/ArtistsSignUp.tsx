"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";

export default function ArtistsSignUp() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[300px] md:min-h-[400px]",
        "overflow-hidden",
        "transition-colors duration-300", 
        "bg-about-section"
      )}
    >
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

      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "min-h-[300px] md:min-h-[400px] w-full",
          "px-4 md:px-8"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "relative",
            "flex flex-row justify-between",
            "min-h-[300px] md:min-h-[400px] w-full max-w-[1200px]",
            "mx-auto"
          )}
        >
          <div className={cn(
            "flex flex-col justify-between",
            "py-12",
            "md:pr-[350px]"
          )}>
            {/* Title */}
            <h2 className="section-heading">
              Interested in performing?
            </h2>

            <Link
              href="mailto:johnnygs478@gmail.com?subject=Artist Application"
              className={cn(
                "btn-reservation",
                "flex items-center gap-2"
              )}
            >
              Apply Here
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
            </Link>
          </div>

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
      </div>
    </section>
  );
}

