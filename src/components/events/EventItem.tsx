"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

export interface EventItemData {
  date: string;
  name: string;
  description: string;
  image?: string;
}

interface EventItemProps {
  event: EventItemData;
}

export default function EventItem({ event }: EventItemProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {/* Event Content - Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left Column - Event Details */}
        <div className="flex flex-col gap-3 md:gap-6 flex-1">

            <div className="flex flex-col gap-2 md:gap-4">
                {/* Date with Star Icon */}
                <div className="flex flex-col items-start gap-2 md:gap-3">
                    <StarIcon
                        fill= "#B29738"
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-amoret-sans)",
                            fontSize: "var(--font-size-lg)",
                            color:  "var(--theme-accent)",
                            fontWeight: 700,
                            lineHeight: "var(--line-height-tight)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--letter-spacing-wide)",
                        }}
                    >
                      {event.date}
                    </span>
                </div>

                {/* Event Name */}
                <h3
                    style={{
                        fontFamily: "var(--font-hornbill-trial)",
                        fontSize: "clamp(var(--font-size-lg), 4vw, var(--font-size-3xl))",
                        color: "var(--theme-text-light-cream)",
                        fontWeight: 700,
                        lineHeight: "var(--line-height-tight)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--letter-spacing-normal)",
                    }}
                    className="transition-colors duration-300"
                >
                    {event.name}
                </h3>
            </div>


          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "var(--font-size-sm)",
              color: "var(--theme-text-light-cream)",
              fontWeight: 400,
              lineHeight: "var(--line-height-relaxed)",
            }}
            className="transition-colors duration-300"
          >
            {event.description}
          </p>
        </div>

        {/* Right Column - Event Poster */}
        <div className="flex-shrink-0 w-full md:w-[300px]">
          {event.image ? (
            <div className="relative w-full aspect-square overflow-hidden transition-colors duration-300">
              <Image
                src={event.image}
                alt={`Event poster for ${event.name}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div
              className={cn(
                "w-full aspect-square",
                "flex items-center justify-center",
                "border-2 rounded-lg",
                "transition-colors duration-300"
              )}
              style={{
                borderColor: theme === "day" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
                backgroundColor: theme === "day" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.02)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "var(--font-size-sm)",
                  color: theme === "day" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)",
                }}
              >
                Event poster
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
