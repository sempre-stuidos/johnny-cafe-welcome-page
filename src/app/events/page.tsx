import { cn } from "@/lib/utils";
import EventItem, { EventItemData } from "@/components/events/EventItem";
import { getWeeklyEventsForBusiness, formatWeeklyEventDate, formatEventDateWithTime, getBandsForBusiness, Band } from "@/lib/events";
import { resolveBusinessSlug } from "@/lib/business-utils";
import EventsClient from "./EventsClient";
import type { Metadata } from "next";

// Force dynamic rendering to prevent Next.js from caching this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// SEO Metadata for Events/Jazz page
export const metadata: Metadata = {
  title: "Live Jazz Nights in Toronto East End | Johnny G's Cabbagetown",
  description: "Experience intimate live jazz nights every Thursday-Saturday at Johnny G's in Cabbagetown. Toronto's premier East End jazz venue featuring local musicians, dinner service, and cozy atmosphere at 478 Parliament St.",
  keywords: [
    "toronto jazz night",
    "east end jazz night",
    "cabbagetown jazz",
    "live jazz toronto",
    "jazz restaurant toronto",
    "parliament street jazz",
    "toronto jazz venue",
    "jazz dinner toronto",
    "live music cabbagetown",
    "toronto east end music",
  ],
  openGraph: {
    title: "Live Jazz Nights in Toronto East End | Johnny G's",
    description: "Experience intimate live jazz every Thursday-Saturday in Cabbagetown. Toronto's best East End jazz venue with dinner service.",
    url: "https://johnnygsrestaurant.ca/events",
    siteName: "Johnny G's Restaurant",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/imgs/events-scene.png",
        width: 1200,
        height: 630,
        alt: "Live jazz night at Johnny G's Toronto East End venue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Jazz Nights in Toronto East End | Johnny G's",
    description: "Experience intimate live jazz every Thursday-Saturday in Cabbagetown.",
    images: ["/assets/imgs/events-scene.png"],
  },
  alternates: {
    canonical: "/events",
  },
};

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
