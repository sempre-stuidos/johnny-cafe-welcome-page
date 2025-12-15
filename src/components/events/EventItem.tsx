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
  bands?: Array<{ id: string; name: string }>;
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
                    <span className="text-event-date">
                      {event.date}
                    </span>
                </div>

                {/* Event Name */}
                <h3 className="event-name">
                    {event.name}
                </h3>
            </div>


          {/* Description */}
          <p className="text-event-description">
            {event.description}
          </p>

          {/* Artist Line Up - Only show if there are bands */}
          {event.bands && event.bands.length > 0 && (
            <div className="flex flex-col gap-2 md:gap-3 mt-6 md:mt-12">
              <span className="text-event-date">
                {event.bands.length === 1 ? "FEATURED ARTIST" : "ARTIST LINE UP"}
              </span>
              <div className="flex flex-col gap-1">
                {event.bands.map((band) => (
                  <p key={band.id} className="text-event-description">
                    {band.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Event Poster */}
        <div className="flex-shrink-0 w-full md:w-[300px]">
          {event.image ? (
            <div className="relative w-full aspect-[4/5] overflow-hidden border-2 border-[#B29738] transition-colors duration-300">
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
                "w-full aspect-[4/5]",
                "flex items-center justify-center",
                "border-2",
                "transition-colors duration-300",
                "event-placeholder"
              )}
            >
              <span className="event-placeholder-text">
                Event poster
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
