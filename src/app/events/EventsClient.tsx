"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { EventItemData } from "@/components/events/EventItem";
import EventsList, { GalleryImage } from "@/components/events/EventsList";
import { supabase } from "@/lib/supabase-client";
import { resolveBusinessSlug } from "@/lib/business-utils";
import EventsVibe from "@/components/events/EventsVibe";
import ArtistsSignUp from "@/components/events/ArtistsSignUp";
import { Band } from "@/lib/events";

interface EventsClientProps {
  events: EventItemData[];
  bands?: Band[];
}

type EventTab = 'weekly' | 'past' | 'gallery';

/**
 * Compare two events arrays to detect differences
 * Returns true if events are different, false if they're the same
 */
function compareEvents(events1: EventItemData[], events2: EventItemData[]): boolean {
  // Different number of events means they're different
  if (events1.length !== events2.length) {
    return true;
  }

  // Create maps for easier comparison
  const map1 = new Map(events1.map((e, i) => [i, e]));
  const map2 = new Map(events2.map((e, i) => [i, e]));

  // Compare each event
  for (let i = 0; i < events1.length; i++) {
    const event1 = events1[i];
    const event2 = events2[i];

    // Compare key properties
    if (
      event1.name !== event2.name ||
      event1.description !== event2.description ||
      event1.image !== event2.image ||
      event1.date !== event2.date
    ) {
      return true;
    }

    // Compare bands
    const bands1 = event1.bands || [];
    const bands2 = event2.bands || [];

    if (bands1.length !== bands2.length) {
      return true;
    }

    // Compare band IDs and names
    for (let j = 0; j < bands1.length; j++) {
      if (bands1[j].id !== bands2[j].id || bands1[j].name !== bands2[j].name) {
        return true;
      }
    }
  }

  return false;
}

export default function EventsClient({ events: initialEvents, bands }: EventsClientProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<EventTab>('weekly');
  const [events, setEvents] = useState<EventItemData[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [hasFetchedInitial, setHasFetchedInitial] = useState(false);
  const hasUsedInitialEvents = useRef(false);
    const hasCheckedForUpdates = useRef(false);
    const [bgTileCount, setBgTileCount] = useState(90);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedBandId, setSelectedBandId] = useState<string | null>(null);

  const handleBandClick = (bandId: string) => {
    setSelectedBandId(bandId);
  };

  // Calculate needed background tiles based on content height
  useEffect(() => {
    const updateTileCount = () => {
      if (sectionRef.current) {
        const sectionHeight = sectionRef.current.scrollHeight;
        // Each tile is minimum 400px tall, 3 columns per row
        // Add extra 50% buffer to ensure we never run out
        const rowsNeeded = Math.ceil((sectionHeight / 400) * 1.5);
        const tilesNeeded = rowsNeeded * 3; // 3 columns
        setBgTileCount(Math.max(90, tilesNeeded)); // Minimum 90 tiles
      }
    };

    // Update on mount and when content changes
    updateTileCount();

    // Small delay to ensure content is rendered
    const timer = setTimeout(updateTileCount, 100);

    return () => clearTimeout(timer);
  }, [activeTab, events, galleryImages]);

  // Get business slug and fetch business ID
  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessSlug = resolveBusinessSlug(
        undefined,
        process.env.NEXT_PUBLIC_BUSINESS_SLUG,
        'johnny-gs-brunch'
      );

      const { data: businesses, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', businessSlug)
        .limit(1)
        .single();

      if (!error && businesses) {
        setBusinessId(businesses.id);
      }
    };

    fetchBusinessId();
  }, []);

  // Background fetch on mount to check for updates (runs once)
  useEffect(() => {
    if (hasCheckedForUpdates.current || activeTab !== 'weekly') return;

    const checkForUpdates = async () => {
      hasCheckedForUpdates.current = true;

      const businessSlug = resolveBusinessSlug(
        undefined,
        process.env.NEXT_PUBLIC_BUSINESS_SLUG,
        'johnny-gs-brunch'
      );

      try {
        // Fetch fresh events in the background
        const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=weekly`, {
          cache: 'no-store' // Ensure we get fresh data
        });

        if (!response.ok) {
          return; // Silently fail, keep initial events
        }

        const data = await response.json();

        if (data.events && Array.isArray(data.events)) {
          // Compare with initial events
          if (compareEvents(initialEvents, data.events)) {
            // Events have changed, update the UI
            setEvents(data.events);
            setHasFetchedInitial(true);
          }
          // If events are the same, no update needed (no re-render)
        }
      } catch (error) {
        console.error('Error checking for event updates:', error);
        // Silently fail, keep showing initial events
      }
    };

    // Only check for updates if we have initial events
    if (initialEvents.length > 0) {
      checkForUpdates();
    }
  }, [initialEvents, activeTab]);

  // Fetch events or gallery images based on active tab
  useEffect(() => {
    if (!businessId) return;

    const businessSlug = resolveBusinessSlug(
      undefined,
      process.env.NEXT_PUBLIC_BUSINESS_SLUG,
      'johnny-gs-brunch'
    );

    if (activeTab === 'gallery') {
      // Fetch gallery images
      const fetchGalleryImages = async () => {
        setGalleryLoading(true);
        try {
          const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=gallery`);
          if (!response.ok) {
            throw new Error('Failed to fetch gallery images');
          }
          
          const data = await response.json();
          setGalleryImages(data.galleryImages || []);
        } catch (error) {
          console.error('Error fetching gallery images:', error);
          setGalleryImages([]);
        } finally {
          setGalleryLoading(false);
        }
      };

      fetchGalleryImages();
      return;
    }

    // Fetch events for other tabs (weekly, past)
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=${activeTab}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        // Only update events if we got valid data
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
          setHasFetchedInitial(true);
        }
        // If fetch fails or returns no data, keep existing events (don't clear them)
      } catch (error) {
        console.error('Error fetching events:', error);
        // Don't clear events on error - keep existing events
        // Only clear if we've already fetched before (user switched tabs)
        if (hasFetchedInitial) {
          setEvents([]);
        }
      } finally {
        setLoading(false);
      }
    };

    // For weekly tab on initial mount, skip fetch if we have initial events
    // This preserves the server-rendered initial events
    const shouldSkipFetch = activeTab === 'weekly' && !hasUsedInitialEvents.current && initialEvents.length > 0;
    
    if (shouldSkipFetch) {
      // Mark that we've used initial events (using ref so it persists across re-renders)
      hasUsedInitialEvents.current = true;
      setHasFetchedInitial(true);
      // Don't fetch - use initial events
      // But still set up real-time subscription below
    } else {
      // Fetch events for past tab or when switching tabs
      fetchEvents();
    }

    // Set up real-time subscription (only for event tabs, not gallery)
    // TypeScript knows activeTab is 'weekly' | 'past' here
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'events',
          filter: `org_id=eq.${businessId}`,
        },
        async (payload) => {
          console.log('Event change detected:', payload.eventType, payload);
          
          // Refetch events to get the latest state
          const businessSlug = resolveBusinessSlug(
            undefined,
            process.env.NEXT_PUBLIC_BUSINESS_SLUG,
            'johnny-gs-brunch'
          );
          
          try {
            const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=${activeTab}`);
            if (response.ok) {
              const data = await response.json();
              setEvents(data.events || []);
            }
          } catch (error) {
            console.error('Error refetching events after change:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [businessId, activeTab]);

  return (
    <>
      <section
        ref={sectionRef}
        className={cn(
          "relative",
          "w-full min-h-screen md:min-h-[668px]",
          "overflow-hidden",
          theme === "day" ? "bg-[#334D2D]" : "bg-[#011A0C]"
        )}
      >
        {/* Background Image - Tiled grid with no seams */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={cn(
              "grid grid-cols-3 gap-0",
              "w-[calc(100%+6px)]",
              "-ml-[3px] -mt-[2px]",
              "auto-rows-[minmax(400px,auto)]"
            )}
          >
            {[...Array(bgTileCount)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-[url('/assets/imgs/bg.png')]",
                  "bg-center bg-cover",
                  "-m-px",
                  "min-h-[400px]"
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
          <EventsList
              activeTab={activeTab}
              onTabChange={setActiveTab}
              events={events}
              galleryImages={galleryImages}
              emptyMessage={
                  activeTab === 'weekly'
                      ? 'No weekly events at this time. Check back soon!'
                      : 'No past events available.'
              }
              loading={loading}
              galleryLoading={galleryLoading}
              onBandClick={handleBandClick}
          />
      </section>

      {/* Jazz Night Vibe Section */}
      <EventsVibe />

      {/* Artists Highlights + Sign Up Section */}
      <ArtistsSignUp bands={bands} selectedBandId={selectedBandId} />
    </>
  );
}

