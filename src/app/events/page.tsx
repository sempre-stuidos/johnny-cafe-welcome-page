import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "@/components/events/EventItem";
import { getWeeklyEventsForBusiness, formatWeeklyEventDate, formatEventDateWithTime, getBandsForBusiness, Band } from "@/lib/events";
import { resolveBusinessSlug } from "@/lib/business-utils";
import EventsClient from "./EventsClient";

// Force dynamic rendering to prevent Next.js from caching this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventsPage() {
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );
  
  // Fetch weekly events from database (default tab)
  const dbEvents = await getWeeklyEventsForBusiness(businessSlug);
  
  // Fetch bands for the business
  const bands = await getBandsForBusiness(businessSlug);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/b4650fe2-a582-445d-9687-1805655edfff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:22',message:'EventsPage bands fetched',data:{businessSlug,bandsCount:bands.length,bands:bands.map(b=>({id:b.id,name:b.name}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  // Map database events to EventItemData format
  const events: EventItemData[] = dbEvents.map(event => {
    let dateStr: string
    if (event.is_weekly && event.day_of_week !== undefined) {
      dateStr = formatWeeklyEventDate(event.day_of_week, event.starts_at, event.ends_at)
    } else if (event.starts_at) {
      dateStr = formatEventDateWithTime(event.starts_at, event.ends_at)
    } else {
      dateStr = 'Date TBD'
    }
    
    return {
      date: dateStr,
      name: event.title,
      description: event.description || event.short_description || '',
      image: event.image_url,
      bands: event.bands?.map(band => ({ id: band.id, name: band.name })),
    }
  });

  return <EventsClient events={events} bands={bands} />;
}
