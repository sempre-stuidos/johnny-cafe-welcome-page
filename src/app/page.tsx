import { cn } from "@/lib/utils";
import HomeHero from "@/components/HomeHero";
import HomeAbout from "@/components/HomeAbout";
import HomeMenu from "@/components/HomeMenu";
import HomeEvents from "@/components/HomeEvents";
import Testimonials from "@/components/Testimonials";
import ReserveOrOrder from "@/components/ReserveOrOrder";
import { getLiveEventsForBusiness, formatEventDate } from "@/lib/events";
import { resolveBusinessSlug } from "@/lib/business-utils";

export default async function Home() {
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );
  
  // Fetch live events from database (limit to 2 for homepage)
  const dbEvents = await getLiveEventsForBusiness(businessSlug);
  
  // Map database events to HomeEvents format (only first 2, formatted for display)
  // Filter out events without starts_at (weekly events) since formatEventDate requires a date
  const homeEvents = dbEvents
    .filter(event => event.starts_at) // Only include events with a start date
    .slice(0, 2)
    .map(event => ({
      date: formatEventDate(event.starts_at!),
      image: event.image_url,
    }));

  return (
    <main
      className={cn(
        "min-h-screen",
        "transition-colors duration-300"
      )}
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <HomeHero />
      <HomeAbout />
      <HomeMenu />
      <HomeEvents events={homeEvents} />
      <Testimonials />
      <ReserveOrOrder />
    </main>
  )
}
