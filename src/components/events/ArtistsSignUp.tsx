"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";

import "swiper/css";

// TODO: Move to CMS
const DUMMY_ARTISTS = [
  {
    id: 1,
    name: "Third Hand",
    image: "/assets/imgs/artist-1.png",
    bio: "Toronto-based jazz ensemble turning heads with their gritty, organ-driven sound blending soul-jazz grooves with modern funk and improv. Regulars at Johnny G's, they've built a reputation for tight ensemble playing and late-night sets that keep audiences locked in.",
  },
  {
    id: 2,
    name: "The Sean Stanley Trio",
    image: "/assets/imgs/artist-2.png",
    bio: "A fixture on Toronto's club circuit, this trio delivers soulful improvisation with deep pocket rhythms. Known for their engaging performances at Johnny G's, they blend classic jazz traditions with contemporary energy that resonates long after the final note.",
  },
];

export default function ArtistsSignUp() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto",
        "overflow-hidden",
        "transition-colors duration-300", 
        "bg-about-section"
      )}
    >
      {/* Background Pattern */}
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
          theme === "day" ? "overlay-about-day" : "overlay-about-night"
        )}
      />
      <div className={cn("relative", "w-full max-w-[1200px]", "mx-auto", "px-4 md:px-8")}>
      {/* Decorative Image - Right Side */}
      <div
        className={cn(
          "hidden md:block",
          "absolute right-0 top-0",
          "w-[60%] h-full",
          "pointer-events-none",
          "z-20"
        )}
      >
        <Image
          src="/assets/imgs/artist-signup.png"
          alt="Decorative element"
          fill
          className="object-cover object-right"
          priority
        />
      </div>
      
      {/* Artist Highlights Section */}
      <div
        ref={contentRef}
        className={cn("relative z-20", "w-full", "py-12 md:py-20")}
        data-animate="section"
      >
        {/* Title */}
        <h2 className="section-heading text-left mb-12 max-w-full md:max-w-[592px]">
          The Artists Who Bring Our Evenings to Life
        </h2>

        {/* Swiper Slider */}
        <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="artist-slider"
          >
            {DUMMY_ARTISTS.map((artist) => (
              <SwiperSlide key={artist.id}>
                <div
                  className={cn(
                    "artist-card-bg",
                    "flex flex-col",
                    "h-full",
                    "rounded-lg",
                    "border-2 border-solid border-theme-accent",
                    "overflow-hidden"
                  )}
                >
                  {/* Artist Image */}
                  <div
                    className={cn(
                      "relative",
                      "w-full aspect-square",
                      "overflow-hidden",
                      "border-2 border-solid border-theme-accent",
                      "transition-colors duration-300"
                    )}
                  >
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 flex-grow">
                    {/* Artist Name */}
                    <h3 className="artist-name mb-4 uppercase">
                      {artist.name}
                    </h3>

                    {/* Artist Bio */}
                    <p className="artist-bio">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Call to Action Section */}
      <div
        className={cn(
          "relative z-20",
          "w-full",
          "py-12 md:py-16"
        )}
      >
        <div className={cn(
          "flex flex-col justify-between",
          "w-full md:w-[40%]"
        )}>
          {/* Title */}
          <h2 className="section-subheading mb-8">
            Interested in performing?
          </h2>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdGx9l69A8nT6c-qzPBprkym5R9v-qDq3T9BFTinCPXmT_I4A/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "btn-reservation",
              "flex items-center gap-2"
            )}
          >
            Apply Here
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
      </div>
      </div>

    </section>
  );
}

