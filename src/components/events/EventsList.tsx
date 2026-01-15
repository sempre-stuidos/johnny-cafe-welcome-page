"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import EventItem, { EventItemData } from "./EventItem";
import LazyGalleryImage from "./LazyGalleryImage";

type EventTab = 'weekly' | 'past' | 'gallery';

export type GalleryImage = {
  id: string;
  url: string;
  name?: string;
};

// Number of past events to show initially and load per "See More" click
const PAST_EVENTS_PAGE_SIZE = 3;

interface EventsListProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
  events: EventItemData[];
  galleryImages?: GalleryImage[];
  emptyMessage?: string;
  loading?: boolean;
  galleryLoading?: boolean;
  onBandClick?: (bandId: string) => void;
}

function EventsList({
  activeTab,
  onTabChange,
  events,
  galleryImages = [],
  emptyMessage = "No events at this time. Check back soon!",
  loading = false,
  galleryLoading = false,
  onBandClick,
}: EventsListProps) {
  const { theme } = useTheme();
  
  // Ref for scrolling to the top of events section
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  
  // State for lazy loading past events
  const [visiblePastEventsCount, setVisiblePastEventsCount] = useState(PAST_EVENTS_PAGE_SIZE);
  
  // Track the previous visible count to determine which events are newly loaded
  const [previousVisibleCount, setPreviousVisibleCount] = useState(PAST_EVENTS_PAGE_SIZE);
  
  // Reset visible count when switching tabs or when events change
  useEffect(() => {
    if (activeTab === 'past') {
      setVisiblePastEventsCount(PAST_EVENTS_PAGE_SIZE);
      setPreviousVisibleCount(PAST_EVENTS_PAGE_SIZE);
    }
  }, [activeTab, events.length]);
  
  // Calculate visible events based on tab
  const visibleEvents = activeTab === 'past' 
    ? events.slice(0, visiblePastEventsCount)
    : events;
  
  // Check if there are more events to load
  const hasMorePastEvents = activeTab === 'past' && visiblePastEventsCount < events.length;
  
  // Check if we're showing more than the initial batch
  const showSeeLess = activeTab === 'past' && visiblePastEventsCount >= events.length && events.length > PAST_EVENTS_PAGE_SIZE;
  
  // Handle "See More" click
  const handleSeeMore = () => {
    setPreviousVisibleCount(visiblePastEventsCount);
    setVisiblePastEventsCount(prev => Math.min(prev + PAST_EVENTS_PAGE_SIZE, events.length));
  };
  
  // Handle "See Less" click - reset to initial 3 and scroll to top
  const handleSeeLess = () => {
    setVisiblePastEventsCount(PAST_EVENTS_PAGE_SIZE);
    setPreviousVisibleCount(PAST_EVENTS_PAGE_SIZE);
    
    // Smooth scroll to the top of the events section
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Check if an event at a given index is newly loaded (for animation)
  const isNewlyLoaded = (index: number) => {
    return activeTab === 'past' && index >= previousVisibleCount;
  };
  return (
    <div
      ref={eventsContainerRef}
      className={cn(
        "relative z-20",
        "flex flex-col",
        "w-full max-w-[1200px] gap-6 md:gap-12",
        "mx-auto",
        "px-4 md:px-8",
        "py-6 md:py-12"
      )}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3 md:gap-6">
        {/* Tabs */}
        <div className="flex justify-between items-center">
          <div className="flex gap-8 md:gap-24">
            <p
              onClick={() => onTabChange('weekly')}
              className={cn(
                "events-tab cursor-pointer",
                activeTab === 'weekly' && "events-tab-active"
              )}
            >
              Weekly Events
            </p>
            <p
              onClick={() => onTabChange('past')}
              className={cn(
                "events-tab cursor-pointer",
                activeTab === 'past' && "events-tab-active"
              )}
            >
              Past Events
            </p>
          </div>
          <p
            onClick={() => onTabChange('gallery')}
            className={cn(
              "events-tab cursor-pointer pl-4 md:pl-0",
              activeTab === 'gallery' && "events-tab-active"
            )}
          >
            Gallery
          </p>
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="max-w-7xl w-full h-[1px] bg-theme-accent" />
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'gallery' ? (
        /* Gallery Grid */
        <div className="flex justify-center">
          {galleryLoading ? (
            <div className="text-center py-12">
              <p className="transition-colors duration-300 text-theme-primary">
                Loading gallery images...
              </p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="transition-colors duration-300 text-theme-primary">
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
              <p className="transition-colors duration-300 text-theme-primary">
                Loading events...
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="transition-colors duration-300 text-theme-primary">
                {emptyMessage}
              </p>
            </div>
          ) : (
            <>
              {visibleEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex flex-col gap-6 md:gap-12 max-w-[1200px] w-full",
                    // Add fade-in animation for newly loaded events
                    isNewlyLoaded(index) && "animate-fade-in-up"
                  )}
                  style={{
                    // Stagger the animation delay for each newly loaded event
                    animationDelay: isNewlyLoaded(index) 
                      ? `${(index - previousVisibleCount) * 150}ms` 
                      : undefined
                  }}
                >
                  <EventItem event={event} onBandClick={onBandClick} />

                  {/* Divider between events and after last event */}
                  <div className="flex justify-center">
                    <div className="max-w-7xl w-full h-[1px] bg-theme-accent" />
                  </div>
                </div>
              ))}
              
              {/* See More / See Less buttons for past events */}
              {activeTab === 'past' && events.length > PAST_EVENTS_PAGE_SIZE && (
                <div className="flex justify-center pt-4">
                  {hasMorePastEvents ? (
                    <button
                      onClick={handleSeeMore}
                      className={cn(
                        "px-8 py-3",
                        "text-sm md:text-base font-medium uppercase tracking-wider",
                        "border-2 border-[#B29738]",
                        "transition-all duration-300",
                        "hover:bg-[#B29738]/20",
                        "text-theme-primary"
                      )}
                    >
                      See More
                    </button>
                  ) : showSeeLess ? (
                    <button
                      onClick={handleSeeLess}
                      className={cn(
                        "px-8 py-3",
                        "text-sm md:text-base font-medium uppercase tracking-wider",
                        "border-2 border-[#B29738]",
                        "transition-all duration-300",
                        "hover:bg-[#B29738]/20",
                        "text-theme-primary"
                      )}
                    >
                      See Less
                    </button>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default EventsList;
