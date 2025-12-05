"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";
import { StarIcon } from "@/components/icons";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { resolveBusinessSlug } from "@/lib/business-utils";

interface HomeEventsProps {
  events?: Array<{
    date: string;
    image?: string;
  }>;
}

export default function HomeEvents({ events: initialEvents }: HomeEventsProps) {
  const { theme } = useTheme();
  const [events, setEvents] = useState<Array<{ date: string; image?: string }>>(
    initialEvents && initialEvents.length > 0 
      ? initialEvents 
      : content.events.upcomingEvents
  );
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
        
        const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&format=regular`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        // Get the latest 2 events and format them for HomeEvents
        const latestEvents = (data.events || []).slice(0, 2).map((event: { date: string; name: string; image?: string }) => ({
          date: event.date,
          image: event.image,
        }));
        
        if (latestEvents.length > 0) {
          setEvents(latestEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Set up real-time subscription
    const channel = supabase
      .channel('home-events-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'events',
          filter: `org_id=eq.${businessId}`,
        },
        async (payload) => {
          console.log('Home events change detected:', payload.eventType, payload);
          
          // Refetch events to get the latest state
          const businessSlug = resolveBusinessSlug(
            undefined,
            process.env.NEXT_PUBLIC_BUSINESS_SLUG,
            'johnny-gs-brunch'
          );
          
          try {
            const response = await fetch(`/api/events?businessSlug=${encodeURIComponent(businessSlug)}&format=regular`);
            if (response.ok) {
              const data = await response.json();
              // Get the latest 2 events and format them for HomeEvents
              const latestEvents = (data.events || []).slice(0, 2).map((event: { date: string; name: string; image?: string }) => ({
                date: event.date,
                image: event.image,
              }));
              
              if (latestEvents.length > 0) {
                setEvents(latestEvents);
              }
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

  // Use events from state if available, otherwise fall back to content.json
  const displayEvents = events && events.length > 0 
    ? events 
    : content.events.upcomingEvents;

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[668px]",
        "transition-colors duration-300"
      )}
      style={{ backgroundColor: "var(--about-bg)" }}
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

      {/* Theme Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          "transition-colors duration-300"
        )}
        style={{
          backgroundColor:
            theme === "day"
              ? "rgba(250, 242, 221, 0.85)"
              : "rgba(51, 77, 45, 0.90)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-12"
        )}
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full w-full max-w-[1440px]",
            "mx-auto gap-6 md:gap-12"
          )}
        >
          {/* Text Content - Left on desktop, top on mobile */}
          <div
            className={cn(
              "flex flex-col",
              "gap-4 md:gap-6",
              "w-full md:w-[60%]",
              "order-1"
            )}
          >
            <h2
              className="transition-colors duration-300"
              style={{ 
                color: "var(--about-title)",
                fontFamily: "var(--font-hornbill-trial)",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "110%",
                letterSpacing: "0%"
              }}
            >
              {content.events.title}
            </h2>

            <p
              className="transition-colors duration-300"
              style={{ color: "var(--about-text)" }}
            >
              {content.events.description}
            </p>

            {/* Event Posters */}
            {displayEvents.length > 0 && (
              <div className="flex flex-row gap-4 md:gap-6 mt-4">
                {displayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3"
                  >
                    {/* Event Image - 284x324px on desktop */}
                    <div className="relative w-full md:w-[284px] aspect-[284/324] overflow-hidden rounded-lg border-2 border-[#B29738]">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={`Event on ${event.date}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Date with Star */}
                    <div className="flex items-center gap-3">
                      <StarIcon />
                      <span
                        className="transition-colors duration-300"
                        style={{ color: "var(--about-text)" }}
                      >
                        {event.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* See All Events Button */}
            <div className="flex justify-start mt-4">
              <Link
                href="/events"
                className={cn(
                  "btn-reservation",
                  "flex items-center gap-2"
                )}
              >
                See All Events
                <Image
                  src="/right-arrow-vector.svg"
                  alt="Right arrow"
                  width={20}
                  height={20}
                  className={cn("btn-reservation-arrow", "w-5 h-5")}
                />
              </Link>
            </div>
          </div>

          {/* Image - Right on desktop, hidden on mobile */}
          <div
            className={cn(
              "hidden md:flex items-center justify-center",
              "md:w-[40%]",
              "order-2",
              "md:absolute md:right-0 md:bottom-0 md:top-[-80px] md:h-auto"
            )}
          >
            <div className="relative w-full h-full flex items-end md:items-stretch">
              <Image
                src="/assets/imgs/home-events.svg"
                alt="Dinner and Jazz"
                width={700}
                height={700}
                className="w-full h-full object-contain object-bottom"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
