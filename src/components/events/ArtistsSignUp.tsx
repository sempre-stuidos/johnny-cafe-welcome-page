"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";
import { Band } from "@/lib/events";

import "swiper/css";

interface ArtistsSignUpProps {
  bands?: Band[];
}

export default function ArtistsSignUp({ bands }: ArtistsSignUpProps) {
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
          "z-30"
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
            loop={false}
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
            {bands && bands.length > 0 ? (
              bands.map((band, index) => {
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/b4650fe2-a582-445d-9687-1805655edfff',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ArtistsSignUp.tsx:114',message:'Rendering band slide',data:{index,totalBands:bands.length,bandId:band.id,bandName:band.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                return (
                <SwiperSlide key={band.id} className="min-w-[302px]">
                  <div
                    className={cn(
                      "artist-card-bg",
                      "flex flex-col",
                      "h-full",
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
                        src={band.image_url || "/assets/imgs/artist-1.png"}
                        alt={band.name}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 flex-grow">
                      {/* Artist Name */}
                      <h3 className="artist-name mb-4 uppercase">
                        {band.name}
                      </h3>

                      {/* Artist Bio */}
                      <p className="artist-bio">
                        {band.description || ""}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                );
              })
            ) : null}
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

