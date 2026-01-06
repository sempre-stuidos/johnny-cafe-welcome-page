"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { usePageLoadAnimation } from "@/lib/animations/hooks";

export default function HomeHero() {
  const { theme } = useTheme();
  const router = useRouter();

  // Page load animation - triggers after nav completes
  usePageLoadAnimation('[data-animate="hero-content"]', "hero");

  const handleReservationClick = () => {
    router.push("/reservations");
   
  };

  return (
    <section
      className={cn(
        "relative",
        "w-full",
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
          "w-full",
          "px-4 md:px-8"
        )}
        data-animate="hero-content"
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "w-full max-w-[1200px]",
            "mx-auto gap-4 md:gap-8"
          )}
        >
          {/* Text Content - Top on mobile, Left on desktop */}
          <div
            className={cn(
              "flex flex-col relative",
              "gap-4 md:gap-0 md:justify-between",
              "w-full md:w-[60%]",
              "justify-between md:justify-start",
              "py-8 md:py-6",
              "order-1"
            )}
          >
            <div className="hero-title-section mt-12 md:mt-6">
              <h3>478 PARLIAMENT ST</h3>

              {/* Hero Title Image - Day/Night */}
              <div className="relative mt-1 pb-8 md:pb-12 z-6">
                <Image
                  src={
                    theme === "day"
                      ? "/assets/imgs/hero-day.png"
                      : "/assets/imgs/hero-night.png"
                  }
                  alt={theme === "day" ? "Johnny G's Brunch" : "Johnny G's Dinner"}
                  width={600}
                  height={200}
                  className="w-full h-auto max-w-[500px] md:max-w-[600px]"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Comet - hidden on mobile */}
            <Image
              src="/comet-vector.svg"
              alt="Comet vector"
              width={200}
              height={200}
              className={cn(
                "hidden md:block absolute top-[100px]",
                "w-auto h-auto",
                "mt-8"
              )}
            />

            <div
              className={cn(
                "flex flex-col gap-2 md:gap-0 md:justify-between",
                "relative",
                "flex-1 md:flex-none",
                "justify-center md:justify-start"
              )}
            >
              <h4 className="max-w-[380px] mb-[33px] md:mb-[33px]">
                {theme === "day"
                  ? "Have brunch at one of the oldest Restaurants in Cabbagetown"
                  : "Have dinner at one of the oldest Restaurants in Cabbagetown"}
              </h4>

              {/* <h4 className="hero-now-playing max-w-[380px] p-2">Now playing <span className="hero-jazz-text">Jazz</span></h4> */}

              <Image
                src="/star-vector.svg"
                alt="Star vector"
                width={50}
                height={50}
                className="hero-star-decoration hidden md:block"
              />
            </div>

            <button
              className={cn(
                "btn-reservation",
                "flex items-center gap-2",
                "mt-4 md:mt-8",
                "mb-0 md:mb-4"
              )}
              onClick={handleReservationClick}
            >
              Reservation
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
            </button>
          </div>

          {/* Image - Bottom on mobile, Right on desktop */}
          <div
            className={cn(
              "flex items-end justify-center md:justify-end",
              "w-full md:w-[60%]",
              "flex-1 md:flex-none",
              "order-2",
              "pb-0"
            )}
          >
            <div
              className={cn(
                "hero-frame",
                "w-full",
                "max-w-[597px]",
                "aspect-[4/3]"
              )}
            >
              <Image
                src={
                  theme === "day"
                    ? "/home/brunch-frame-bg.jpg"
                    : "/home/jazz-frame.jpg"
                }
                alt={theme === "day" ? "Brunch dish" : "Jazz night"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
