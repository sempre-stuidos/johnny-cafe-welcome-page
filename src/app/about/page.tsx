import { cn } from "@/lib/utils";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutContentSection from "@/components/about/AboutContentSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Johnny G's | Cabbagetown Restaurant & Jazz Venue Since 1975",
  description: "Discover the story behind Johnny G's, Toronto's beloved Cabbagetown restaurant and East End jazz venue. Established in 1975, now featuring live jazz nights, exceptional dining, and a commitment to community.",
  keywords: [
    "Johnny G's history",
    "Cabbagetown restaurant",
    "Toronto jazz venue",
    "East End jazz",
    "restaurant Toronto",
    "live music Toronto",
  ],
  openGraph: {
    title: "About Johnny G's | Cabbagetown Restaurant & Jazz Venue",
    description: "Discover the story behind Johnny G's, Toronto's beloved Cabbagetown restaurant and East End jazz venue since 1975.",
    url: "https://johnnygsrestaurant.ca/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default async function About() {
  return (
    <main
      className={cn(
        "min-h-screen",
        "transition-colors duration-300"
      )}
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <AboutHeroSection />
      <AboutContentSection />
    </main>
  );
}
