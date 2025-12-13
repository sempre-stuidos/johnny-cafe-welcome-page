"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { EventItemData } from "@/components/events/EventItem";
import EventsList, { GalleryImage } from "@/components/events/EventsList";
import { supabase } from "@/lib/supabase-client";
import { resolveBusinessSlug } from "@/lib/business-utils";

interface EventsClientProps {
  events: EventItemData[];
}

type EventTab = 'weekly' | 'upcoming' | 'past' | 'gallery';

export default function EventsClient({ events: initialEvents }: EventsClientProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<EventTab>('weekly');
  const [events, setEvents] = useState<EventItemData[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);

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

    // Fetch events for other tabs
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=${activeTab}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    // Set up real-time subscription (only for event tabs, not gallery)
    if (activeTab !== 'gallery') {
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
    }
  }, [businessId, activeTab]);

  return (
    <section
      className={cn(
        "relative",
        "w-full min-h-screen md:min-h-[668px]",
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
      <EventsList
        activeTab={activeTab}
        onTabChange={setActiveTab}
        events={events}
        galleryImages={galleryImages}
        emptyMessage={
          activeTab === 'weekly' 
            ? 'No weekly events at this time. Check back soon!'
            : activeTab === 'upcoming'
            ? 'No upcoming events at this time. Check back soon!'
            : 'No past events available.'
        }
        loading={loading}
        galleryLoading={galleryLoading}
      />
    </section>
  );
}

