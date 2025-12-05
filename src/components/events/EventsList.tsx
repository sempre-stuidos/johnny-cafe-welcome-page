"use client";

import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "./EventItem";

interface EventsListProps {
  title: string;
  events: EventItemData[];
  emptyMessage?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function EventsList({
  title,
  events,
  emptyMessage = "No events at this time. Check back soon!",
  showButton = false,
  buttonText = "VIEW EVENTS",
  onButtonClick,
}: EventsListProps) {
  return (
    <div
      className={cn(
        "relative z-20",
        "flex flex-col",
        "w-full max-w-[1440px] gap-6 md:gap-12",
        "mx-auto",
        "px-4 md:px-8",
        "py-6 md:py-12"
      )}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3 md:gap-6">
        {/* Main Title */}
        <h1
          className={cn(
            "text-center",
            "transition-colors duration-300"
          )}
          style={{
            fontFamily: "var(--font-pinyon-script)",
            fontSize: "clamp(var(--font-size-xl), 6vw, var(--font-size-5xl))",
            color: "var(--theme-text-primary)",
            lineHeight: "var(--line-height-tight)",
            fontWeight: 400,
          }}
        >
          {title}
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
      <div className="flex flex-col gap-6 md:gap-12 items-center">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p
              className="transition-colors duration-300"
              style={{ color: "var(--theme-text-light-cream)" }}
            >
              {emptyMessage}
            </p>
          </div>
        ) : (
          events.map((event, index) => (
            <div key={index} className="flex flex-col gap-6 md:gap-12 max-w-7xl w-full">
              <EventItem event={event} />

              {/* Divider between events */}
              {index < events.length - 1 && (
                <div className="flex justify-center">
                  <div
                    className="max-w-7xl w-full h-[1px]"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                    }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Button */}
      {showButton && (
        <div className="flex justify-center mt-6 md:mt-12 pb-6 md:pb-0">
          <button
            onClick={onButtonClick}
            className={cn(
              "btn-reservation",
              "flex items-center gap-2",
              "w-full max-w-[280px] md:w-auto md:max-w-none",
              "text-sm md:text-base",
              "cursor-pointer"
            )}
            style={{
              fontSize: "clamp(var(--font-size-sm), 3vw, var(--font-size-base))",
            }}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

