"use client";

import Link from "next/link";
import Image from "next/image";
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
        "w-full h-auto",
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
          "w-full",
          "px-4 md:px-8"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-row",
            "w-full max-w-[1200px]",
            "mx-auto",
            "items-stretch",
            "justify-center lg:justify-between"
          )}
        >
          {/* Left Decoration */}
          <div className="hidden lg:flex flex-shrink-0 items-stretch">
            <Image
              src="/assets/imgs/reserve-left.svg"
              alt=""
              width={202}
              height={403}
              className="w-auto h-full object-cover"
            />
          </div>

          {/* Center Content */}
          <div
            className={cn(
              "flex flex-col",
              "w-full lg:max-w-[700px]",
              "gap-6 md:gap-8",
              "items-center justify-center",
              "py-12 md:py-16"
            )}
          >
          <h2 className="section-heading text-center">
            Reserve Your Table
          </h2>

          <div
            className={cn(
              "flex flex-col md:flex-row",
              "gap-3 md:gap-4",
              "w-full"
            )}
          >
            {/* Book a Reservation Button - Outlined */}
            <Link
              href="/reservations"
              className={cn(
                "flex-1",
                "px-6 py-4",
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
                "px-6 py-4",
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
          <div className="w-full flex items-center gap-3">
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
              "gap-3 md:gap-4",
              "w-full"
            )}
          >
            {/* Johnny G's App */}
            <a
              href="https://orders.foodme.mobi/dt/johnnyg/cafebychef/main"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-3 py-3",
                "flex items-center justify-center gap-2",
                "border-2",
                "reserve-delivery-btn",
                "whitespace-nowrap",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span className="truncate">Johnny G&apos;s App</span>
              <ExternalLinkIcon />
            </a>

            {/* Uber Eats */}
            <a
              href="https://www.ubereats.com/ca/store/johnnygs-dinner/sFEVnqQnQC-pxds9rvJxmA?srsltid=AfmBOoq35N2EM8wjwa663vP75C7PWDur71CmZuC7VYdg5v3ZOnAVpDWH"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-3 py-3",
                "flex items-center justify-center gap-2",
                "border-2",
                "reserve-delivery-btn",
                "whitespace-nowrap",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span className="truncate">Uber Eats</span>
              <ExternalLinkIcon />
            </a>

            {/* DoorDash */}
            <a
              href="https://www.doordash.com/store/johnnyg's-toronto-790913/1120083/?srsltid=AfmBOoohwMeikKsZ7umuJtoK8r5feKxJp1lF85oFHHafJl1qoNQTqAyh"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1",
                "px-3 py-3",
                "flex items-center justify-center gap-2",
                "border-2",
                "reserve-delivery-btn",
                "whitespace-nowrap",
                theme === "day" ? "reserve-delivery-btn-day" : "reserve-delivery-btn-night"
              )}
            >
              <span className="truncate">DoorDash</span>
              <ExternalLinkIcon />
            </a>
          </div>
          </div>

          {/* Right Decoration */}
          <div className="hidden lg:flex flex-shrink-0 items-stretch">
            <Image
              src="/assets/imgs/reserve-right.svg"
              alt=""
              width={202}
              height={403}
              className="w-auto h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
