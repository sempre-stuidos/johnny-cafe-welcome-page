"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface HomeHeroSectionProps {
  content?: {
    address?: string;
    title?: string;
    subtitle?: string;
    established?: string;
    day?: {
      description?: string;
      hours?: string;
      heroImage?: string;
    };
    night?: {
      description?: string;
      hours?: string;
      heroImage?: string;
    };
    reservationPhone?: string;
    reservationLabel?: string;
  };
}

export function HomeHeroSection({ content }: HomeHeroSectionProps = {}) {
  const { theme } = useTheme();

  // Default values
  const address = content?.address || "478 PARLIAMENT ST";
  const title = content?.title || "JOHNNY G's";
  const subtitle = content?.subtitle || "Brunch";
  const established = content?.established || "EST 1975";
  
  // Theme-dependent content
  const dayData = content?.day || {
    description: "Have brunch at one of the oldest Restaurants in Cabbagetown",
    hours: "7AM - 4PM",
    heroImage: "/home/brunch-frame-bg.jpg"
  };
  
  const nightData = content?.night || {
    description: "Have dinner at one of the oldest Restaurants in Cabbagetown",
    hours: "7PM - 12AM",
    heroImage: "/home/jazz-frame.jpg"
  };
  
  const reservationPhone = content?.reservationPhone || "+16473683877";
  const reservationLabel = content?.reservationLabel || "Reservation";
  
  // Select theme-specific data
  const themeData = theme === "day" ? dayData : nightData;
  const description = themeData.description || "";
  const hours = themeData.hours || "";
  const heroImage = themeData.heroImage || "/home/brunch-frame-bg.jpg";

  return (
    <section
      className={cn(
        "relative",
        "w-full h-[100vh] md:h-auto md:min-h-[668px]",
        "overflow-hidden",
        theme === "day" ? "bg-[#334D2D]" : "bg-[#011A0C]"
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

      {/* Theme Overlay - light for day, dark for night */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          "transition-colors duration-300",
          theme === "day" ? "bg-[#334D2D]/85" : "bg-[#011A0C]/90"
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8"
        )}
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full w-full max-w-[1440px]",
            "mx-auto gap-4 md:gap-2"
          )}
        >
          {/* Text Content - Top on mobile, Left on desktop */}
          <div
            className={cn(
              "flex flex-col",
              "gap-4 md:gap-0 md:justify-between",
              "w-full md:w-[40%]",
              "py-4 md:py-6",
              "order-1"
            )}
          >
            <div className="hero-title-section mt-2 md:mt-6">
              <h3>{address}</h3>

              {/* H1 with Brunch & EST overlapping */}
              <div className="relative mt-1 pb-8 md:pb-12">
                {/* Brunch & EST - in front with higher z-index (DOM first) */}
                <div className="flex flex-row items-start absolute left-0 top-[40%] md:top-[45%] z-10">
                  <h2 className="hero-brunch-title">{subtitle}</h2>
                  <p className="est-1975-text ml-6 md:ml-10 mt-6 md:mt-10">{established}</p>
                </div>
                
                {/* JOHNNY G's - behind with lower z-index */}
                <h1 className="text-stroke-dark-green relative z-0">{title}</h1>
              </div>
            </div>

            {/* Comet - hidden on mobile */}
            <Image
              src="/comet-vector.svg"
              alt="Comet vector"
              width={200}
              height={200}
              className={cn(
                "hidden md:block",
                "w-auto h-auto",
                "mt-8"
              )}
            />

            <div
              className={cn(
                "flex flex-col gap-2 md:gap-0 md:justify-between",
                "relative"
              )}
            >
              <h4 className="max-w-[380px] mb-[33px]">
                {description}
              </h4>

              <div
                className={cn(
                  "hero-hours-section",
                  "flex flex-col gap-1 mt-2 md:mt-0"
                )}
              >
                <h5>MONDAY - SUNDAY</h5>

                <h5>{hours}</h5>
              </div>

              <Image
                src="/star-vector.svg"
                alt="Star vector"
                width={50}
                height={50}
                className="hero-star-decoration hidden md:block"
              />
            </div>

            <a
              href={`tel:${reservationPhone}`}
              className={cn(
                "btn-reservation",
                "flex items-center gap-2",
                "mt-4 md:mt-8 mb-4"
              )}
            >
              {reservationLabel}
              <Image
                src="/right-arrow-vector.svg"
                alt="Right arrow"
                width={20}
                height={20}
                className={cn(
                  "btn-reservation-arrow",
                  "w-5 h-5"
                )}
              />
            </a>
          </div>

          {/* Image - Bottom on mobile, Right on desktop */}
          <div
            className={cn(
              "flex items-end justify-center md:justify-end",
              "w-full md:w-[60%]",
              "flex-1 md:flex-none",
              "order-2",
              "pb-4 md:mt-8 md:pb-0"
            )}
          >
            <div
              className={cn(
                "hero-frame",
                "w-full h-full",
                "max-w-[597px] max-h-[668px]"
              )}
            >
              <Image
                src={heroImage}
                alt={theme === "day" ? "Brunch dish" : "Jazz night"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
