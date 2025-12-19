import { cn } from "@/lib/utils";
import HomeHero from "@/components/HomeHero";
import HomeAbout from "@/components/HomeAbout";
import HomeMenu from "@/components/HomeMenu";
import HomeEvents from "@/components/HomeEvents";
import Testimonials from "@/components/Testimonials";
import ReserveOrOrder from "@/components/ReserveOrOrder";
import { getWeeklyEventsForBusiness, formatWeeklyEventDateUppercase } from "@/lib/events";
import { resolveBusinessSlug } from "@/lib/business-utils";

export default async function Home() {
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );

  // Fetch weekly events from database (limit to 2 for homepage)
  const dbEvents = await getWeeklyEventsForBusiness(businessSlug);

  // Map database events to HomeEvents format (only first 2, formatted for display)
  const homeEvents = dbEvents
    .slice(0, 2)
    .map(event => ({
      date: event.is_weekly && event.day_of_week !== undefined
        ? formatWeeklyEventDateUppercase(event.day_of_week, event.starts_at, event.ends_at)
        : 'Date TBD',
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
