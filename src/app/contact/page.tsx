"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { StarIcon, CalendarIcon, LocationIcon, PhoneIcon } from "@/components/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const { theme } = useTheme();

  return (
    <main className="relative min-h-screen bg-theme-primary transition-colors duration-300">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-0",
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
          theme === "day" ? "overlay-day" : "overlay-night"
        )}
      />

      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Side - Contact Information */}
          <div className="w-full md:w-[50%] flex flex-col gap-8">
            {/* Header with Star Below */}
            <div className="flex flex-col gap-4">
              <h1 className="section-heading">
                Dine in today!
              </h1>
              <StarIcon
                className="w-12 h-12 flex-shrink-0"
                fill="var(--theme-accent)"
              />
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <CalendarIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <h2 className="contact-days-heading transition-colors duration-300">
                    MONDAY - SUNDAY
                  </h2>
                  <div className="flex flex-col gap-1 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <span className="contact-meal-label">
                        BRUNCH
                      </span>
                      <span className="contact-meal-time">
                        7:00 AM – 4:00 PM
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="contact-meal-label">
                        DINNER
                      </span>
                      <span className="contact-meal-time">
                        Tuesday – Sunday: 4:30 PM – 9:00 PM
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="contact-meal-label">
                        LIVE JAZZ
                      </span>
                      <span className="contact-meal-time">
                        Thursday – Saturday: 9:00 PM – 12:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <LocationIcon className="w-6 h-6 flex-shrink-0 mt-1" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=478+Parliament+St,+Toronto,+ON+M5A+2L3"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-link transition-colors duration-300 hover:opacity-70"
              >
                478 PARLIAMENT ST, TORONTO, ON M5A 2L3
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <PhoneIcon className="w-6 h-6 flex-shrink-0 mt-1" />
              <a
                href="tel:+16473683877"
                className="contact-info-link transition-colors duration-300 hover:opacity-70"
              >
                647-368-3877
              </a>
            </div>

            {/* Reservations Button */}
            <div className="mt-4">
              <a
                href="tel:+16473683877"
                className={cn(
                  "btn-reservation",
                  "inline-flex items-center gap-2"
                )}
              >
                RESERVATIONS
                <Image
                  src="/right-arrow-vector.svg"
                  alt="Right arrow"
                  width={20}
                  height={20}
                  className="btn-reservation-arrow w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Right Side - Map Image */}
          <div className="w-full md:w-[50%] min-h-[500px] md:min-h-0">
            <div className="bg-theme-secondary  w-full h-full md:h-[calc(100vh-160px)] transition-colors duration-300 overflow-hidden relative">
              <div className="w-full h-full relative">
                <Image
                  src="/map-vector.svg"
                  alt="Restaurant location map"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
