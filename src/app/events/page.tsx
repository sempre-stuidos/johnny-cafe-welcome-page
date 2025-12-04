"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "@/components/events/EventItem";
import content from "@/data/content.json";
import Image from "next/image";

export default function EventsPage() {
  const { theme } = useTheme();
  
  // Get events data from content.json
  const events: EventItemData[] = content.events.eventsPage?.upcomingEvents || [];

  return (
    <section
      className={cn(
        "relative",
        "w-full h-[100vh] md:h-auto md:min-h-[668px]",
        "overflow-hidden",
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
          "flex flex-col",
          "w-full max-w-[1440px] gap-8 md:gap-12",
          "mx-auto",
          "px-4 md:px-8",
          "py-8 md:py-12"
        )}
      >
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Main Title - "Upcoming Events" */}
          <h1
            className={cn(
              "text-center",
              "transition-colors duration-300"
            )}
            style={{
              fontFamily: "var(--font-pinyon-script)",
              fontSize: "clamp(var(--font-size-2xl), 8vw, var(--font-size-5xl))",
              color: "var(--theme-text-primary)",
              lineHeight: "var(--line-height-tight)",
              fontWeight: 400,
            }}
          >
            Upcoming Events
          </h1>

          {/* Divider */}
          <div className="flex justify-center">
            <div
              className="max-w-7xl w-full h-[1px]"
              style={{
                backgroundColor: "var(--theme-accent)",
              }}
            />
          </div>
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-8 md:gap-12 items-center">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col gap-8 md:gap-12 max-w-7xl">
              <EventItem event={event} />

              {/* Divider between events */}
              <div className="flex justify-center">
                <div
                  className="max-w-7xl w-full h-[1px]"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* VIEW PAST EVENTS Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button
              className={cn(
                  "btn-reservation",
                  "flex items-center gap-2",
                  "mt-4 md:mt-8 mb-4"
              )}
          >
            VIEW PAST EVENTS

          </button>
        </div>
      </div>
    </section>
  );
}
