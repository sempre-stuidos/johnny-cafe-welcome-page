import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "@/components/events/EventItem";
import { getLiveEventsForBusiness, formatEventDateUppercase } from "@/lib/events";
import { resolveBusinessSlug } from "@/lib/business-utils";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );
  
  // Fetch live events from database
  const dbEvents = await getLiveEventsForBusiness(businessSlug);
  
  // Map database events to EventItemData format
  const events: EventItemData[] = dbEvents.map(event => ({
    date: formatEventDateUppercase(event.starts_at),
    name: event.title,
    description: event.description || event.short_description || '',
    image: event.image_url,
  }));

  return <EventsClient events={events} />;
}
