"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { ArcedDecor } from "../icons";

export default function EventsVibe() {
  const { theme } = useTheme();

  return (
    <section 
      className={cn(
        "relative",
        "w-full",
        "transition-colors duration-300",
        theme === "day" ? "bg-events-vibe-day" : "bg-events-vibe-night"
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

      {/* Theme Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          "transition-colors duration-300",
          theme === "day" ? "overlay-events-vibe-day" : "overlay-events-vibe-night"
        )}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-6 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <h2 className="events-vibe-title">
              Jazz Night at Johnny G&apos;s: Toronto&apos;s East End Gem
            </h2>

            <div className="flex flex-col gap-4">
              <p className="about-paragraph">
              Experience live jazz every Thursday through Saturday at Johnny G&apos;s in Toronto&apos;s vibrant East End. 
              Step into our cozy Cabbagetown setting where we transform a corner into an 
              intimate "stage vibe" for live jazz, offering you a front-row seat to spectacular local talent. 
              Enjoy our flavourful dinner menu at Johnny G&apos;s as the smooth sounds create a perfect, sophisticated atmosphere for a special night out in Toronto&apos;s jazz scene.
              </p>
            </div>

            <div className="events-vibe-policy-box p-6 md:p-8 flex flex-col gap-4 relative">
                <div className="flex items-center gap-3">
                  <div className="events-vibe-policy-bullet" />
                  <span className="events-vibe-policy-text">
                    LIMITED SEATING
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="events-vibe-policy-bullet" />
                  <span className="events-vibe-policy-text">
                    INTIMATE SPACE
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="events-vibe-policy-bullet" />
                  <span className="events-vibe-policy-text">
                    FIRST-COME BAR SEATS
                  </span>
                </div>

                <ArcedDecor className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20" />
              </div>
          </div>

          <div className="relative w-full min-h-[400px] md:min-h-0">
            <Image
              src="/assets/imgs/events-scene.png"
              alt="Live jazz night at Johnny G's Toronto East End venue in Cabbagetown"
              fill
              className="object-cover object-left"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
