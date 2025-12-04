"use client";

import { cn } from "@/lib/utils";
import HomeHero from "@/components/HomeHero";
import HomeAbout from "@/components/HomeAbout";

export default function Home() {
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
    </main>
  );
}
