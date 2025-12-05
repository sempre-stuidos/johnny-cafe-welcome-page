"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { EventItemData } from "@/components/events/EventItem";
import EventsList from "@/components/events/EventsList";
import { supabase } from "@/lib/supabase-client";
import { resolveBusinessSlug } from "@/lib/business-utils";

interface EventsClientProps {
  events: EventItemData[];
}

export default function EventsClient({ events: initialEvents }: EventsClientProps) {
  const { theme } = useTheme();
  const [events, setEvents] = useState<EventItemData[]>(initialEvents);
  const [pastEvents, setPastEvents] = useState<EventItemData[]>([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
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
      <EventsList
        title="Upcoming Events"
        events={events}
        emptyMessage="No upcoming events at this time. Check back soon!"
        showButton={!showPastEvents}
        buttonText="VIEW PAST EVENTS"
        onButtonClick={async () => {
          if (!showPastEvents && pastEvents.length === 0) {
            try {
              const businessSlug = resolveBusinessSlug(
                undefined,
                process.env.NEXT_PUBLIC_BUSINESS_SLUG,
                'johnny-gs-brunch'
              );
              
              const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&type=past`);
              if (response.ok) {
                const data = await response.json();
                setPastEvents(data.events || []);
              }
            } catch (error) {
              console.error('Error fetching past events:', error);
            }
          }
          setShowPastEvents(true);
        }}
      />

      {/* Past Events Section */}
      {showPastEvents && (
        <EventsList
          title="Past Events"
          events={pastEvents}
          emptyMessage="No past events available."
          showButton={true}
          buttonText="SEE LESS"
          onButtonClick={() => {
            setShowPastEvents(false);
          }}
        />
      )}
    </section>
  );
}

