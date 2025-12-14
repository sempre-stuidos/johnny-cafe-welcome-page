"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import EventItem, { EventItemData } from "./EventItem";
import LazyGalleryImage from "./LazyGalleryImage";

type EventTab = 'weekly' | 'past' | 'gallery';

export interface GalleryImage {
  id: string;
  url: string;
  name?: string;
}

interface EventsListProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
  events: EventItemData[];
  galleryImages?: GalleryImage[];
  emptyMessage?: string;
  loading?: boolean;
  galleryLoading?: boolean;
}

export default function EventsList({
  activeTab,
  onTabChange,
  events,
  galleryImages = [],
  emptyMessage = "No events at this time. Check back soon!",
  loading = false,
  galleryLoading = false,
}: EventsListProps) {
  const { theme } = useTheme();
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
        {/* Tabs */}
        <div className="flex justify-center">
          <div className="max-w-7xl w-full flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-8 md:gap-24">
              <p
                onClick={() => onTabChange('weekly')}
                className="cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-pinyon-script)",
                  fontSize: "clamp(var(--font-size-xl), 6vw, var(--font-size-3xl))",
                  color: "var(--theme-text-primary)",
                  lineHeight: "var(--line-height-normal)",
                  fontWeight: activeTab === 'weekly' ? 600 : 400,
                  fontStyle: "normal",
                }}
              >
                Weekly Events
              </p>
              <p
                onClick={() => onTabChange('past')}
                className="cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-pinyon-script)",
                  fontSize: "clamp(var(--font-size-xl), 6vw, var(--font-size-3xl))",
                  color: "var(--theme-text-primary)",
                  lineHeight: "var(--line-height-normal)",
                  fontWeight: activeTab === 'past' ? 600 : 400,
                  fontStyle: "normal",
                }}
              >
                Past Events
              </p>
            </div>
            <div>
              <p
                onClick={() => onTabChange('gallery')}
                className="cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-pinyon-script)",
                  fontSize: "clamp(var(--font-size-xl), 6vw, var(--font-size-3xl))",
                  color: "var(--theme-text-primary)",
                  lineHeight: "var(--line-height-normal)",
                  fontWeight: activeTab === 'gallery' ? 600 : 400,
                  fontStyle: "normal",
                }}
              >
                Gallery
              </p>
            </div>
          </div>
        </div>

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

      {/* Content based on active tab */}
      {activeTab === 'gallery' ? (
        /* Gallery Grid */
        <div className="flex justify-center">
          {galleryLoading ? (
            <div className="text-center py-12">
              <p
                className="transition-colors duration-300"
                style={{ color: "var(--theme-text-light-cream)" }}
              >
                Loading gallery images...
              </p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p
                className="transition-colors duration-300"
                style={{ color: "var(--theme-text-light-cream)" }}
              >
                No gallery images available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-7xl w-full">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative w-full aspect-square overflow-hidden border-2 border-[#B29738] transition-colors duration-300"
                >
                  <LazyGalleryImage
                    src={image.url}
                    alt={image.name || `Gallery image ${image.id}`}
                    // Load first 3 images (first row) with priority for faster initial render
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Events List */
        <div className="flex flex-col gap-6 md:gap-12 items-center">
          {loading ? (
            <div className="text-center py-12">
              <p
                className="transition-colors duration-300"
                style={{ color: "var(--theme-text-light-cream)" }}
              >
                Loading events...
              </p>
            </div>
          ) : events.length === 0 ? (
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

                {/* Divider between events and after last event */}
                <div className="flex justify-center">
                  <div
                    className="max-w-7xl w-full h-[1px]"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

