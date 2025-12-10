import { cn } from "@/lib/utils";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutContentSection from "@/components/about/AboutContentSection";

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
