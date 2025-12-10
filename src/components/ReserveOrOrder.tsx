"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "@/components/icons";
import { useScrollReveal } from "@/lib/animations/hooks";

export default function ReserveOrOrder() {
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
          "px-4 md:px-8 py-12 md:py-16"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-col",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-8 md:gap-12",
            "items-center"
          )}
        >
          {/* Main Title */}
          <h2 className="section-heading text-center">
            Reserve Your Table
          </h2>

          {/* Top Buttons - Reservation & Menu */}
          <div
            className={cn(
              "flex flex-col md:flex-row",
              "gap-4 md:gap-6",
              "w-full max-w-[900px]"
            )}
          >
            {/* Book a Reservation Button - Outlined */}
            <Link
              href="/reservations"
              className={cn(
                "flex-1",
                "px-8 py-6",
                "text-center",
                "border-2",
                "hover:shadow-lg",
                "reserve-primary-btn",
                theme === "day" ? "reserve-primary-btn-day" : "reserve-primary-btn-night"
              )}
            >
              Book a Reservation
            </Link>

            {/* View Menu Button - Outlined */}
            <Link
              href="/menu"
              className={cn(
                "flex-1",
                "px-8 py-6",
                "text-center",
                "border-2",
                "hover:shadow-lg",
                "reserve-primary-btn",
                theme === "day" ? "reserve-primary-btn-day" : "reserve-primary-btn-night"
              )}
            >
              View Menu
            </Link>
          </div>

          {/* Divider with "ORDER ONLINE" */}
          <div className="w-full max-w-[900px] flex items-center gap-4">
            <div
              className={cn(
                "flex-1",
                "reserve-divider-line",
                theme === "day" ? "reserve-divider-line-day" : "reserve-divider-line-night"
              )}
            />
            <span
              className={cn(
                "px-4",
                "reserve-divider-text",
                theme === "day" ? "reserve-divider-text-day" : "reserve-divider-text-night"
              )}
            >
              ORDER ONLINE
            </span>
            <div
              className={cn(
                "flex-1",
                "reserve-divider-line",
                theme === "day" ? "reserve-divider-line-day" : "reserve-divider-line-night"
              )}
            />
          </div>

          {/* Subtitle */}
          <p
            className={cn(
              "text-center",
              "reserve-subtitle",
              theme === "day" ? "reserve-subtitle-day" : "reserve-subtitle-night"
            )}
          >
            Order delivery from your favorite platform
          </p>

          {/* Delivery Platform Buttons */}
          <div
            className={cn(
              "flex flex-col md:flex-row",
              "gap-4 md:gap-6",
              "w-full max-w-[900px]"
            )}
          >
            {/* Johnny G's App */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-6 py-4",
                "flex items-center justify-center gap-3",
                "border-2",
                "reserve-delivery-btn",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span>Johnny G&apos;s App</span>
              <ExternalLinkIcon />
            </a>

            {/* Uber Eats */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-6 py-4",
                "flex items-center justify-center gap-3",
                "border-2",
                "reserve-delivery-btn",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span>Uber Eats</span>
              <ExternalLinkIcon />
            </a>

            {/* DoorDash */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-6 py-4",
                "flex items-center justify-center gap-3",
                "border-2",
                "reserve-delivery-btn",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span>DoorDash</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
