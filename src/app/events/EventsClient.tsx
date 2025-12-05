"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "@/components/events/EventItem";
import { supabase } from "@/lib/supabase-client";
import { resolveBusinessSlug } from "@/lib/business-utils";

interface EventsClientProps {
  events: EventItemData[];
}

export default function EventsClient({ events: initialEvents }: EventsClientProps) {
  const { theme } = useTheme();
  const [events, setEvents] = useState<EventItemData[]>(initialEvents);
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

  // Fetch events initially and set up real-time subscription
  useEffect(() => {
    if (!businessId) return;

    const fetchEvents = async () => {
      try {
        const businessSlug = resolveBusinessSlug(
          undefined,
          process.env.NEXT_PUBLIC_BUSINESS_SLUG,
          'johnny-gs-brunch'
        );
        
        const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Set up real-time subscription
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
          // This ensures we get the correct computed status and filtering
          const businessSlug = resolveBusinessSlug(
            undefined,
            process.env.NEXT_PUBLIC_BUSINESS_SLUG,
            'johnny-gs-brunch'
          );
          
          try {
            const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}`);
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
  }, [businessId]);

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
      <div
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
          {/* Main Title - "Upcoming Events" */}
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
        <div className="flex flex-col gap-6 md:gap-12 items-center">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p
                className="transition-colors duration-300"
                style={{ color: "var(--theme-text-light-cream)" }}
              >
                No upcoming events at this time. Check back soon!
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

        {/* VIEW PAST EVENTS Button */}
        <div className="flex justify-center mt-6 md:mt-12 pb-6 md:pb-0">
          <button
            className={cn(
              "btn-reservation",
              "flex items-center gap-2",
              "w-full max-w-[280px] md:w-auto md:max-w-none",
              "text-sm md:text-base"
            )}
            style={{
              fontSize: "clamp(var(--font-size-sm), 3vw, var(--font-size-base))",
            }}
          >
            VIEW PAST EVENTS
          </button>
        </div>
      </div>
    </section>
  );
}

