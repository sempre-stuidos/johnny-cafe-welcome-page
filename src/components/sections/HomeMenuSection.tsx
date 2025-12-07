"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useScrollReveal } from "@/lib/animations/hooks";

// Import Swiper styles
import "swiper/css";

interface HomeMenuSectionProps {
  content?: {
    title?: string;
    description?: string;
    images?: string[];
  };
  'data-section-key'?: string;
  'data-section-id'?: string;
}

export function HomeMenuSection({ content, 'data-section-key': sectionKey, 'data-section-id': sectionId }: HomeMenuSectionProps = {}) {
  const { theme } = useTheme();
  const swiperRef = useRef<SwiperType | null>(null);
  const contentRef = useScrollReveal();

  const title = content?.title || "Taste Why Cabbagetown Has Loved Us for Decades";
  const description = content?.description || "Explore our carefully crafted dishes";
  const images = content?.images || [
    "/assets/imgs/home-menu/NPCgroove-09 1.png",
    "/assets/imgs/home-menu/NPCgroove-10 1.png",
    "/assets/imgs/home-menu/NPCgroove-11 1.png",
    "/assets/imgs/home-menu/NPCgroove-13 1.png"
  ];

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[600px] md:min-h-[700px]",
        "transition-colors duration-300",
        "z-20"
      )}
      style={{
        backgroundColor:
          theme === "day" ? "rgba(194, 202, 168, 1)" : "rgba(1, 26, 12, 1)",
      }}
      data-section-key={sectionKey}
      data-section-id={sectionId}
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
          "transition-colors duration-300"
        )}
        style={{
          backgroundColor:
            theme === "day"
              ? "rgba(194, 202, 168, 0.85)"
              : "rgba(1, 26, 12, 0.90)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-16"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-col",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-8 md:gap-12"
          )}
        >
          {/* Title */}
          <h2
            className="text-left max-w-[600px] transition-colors duration-300"
            data-section-component-key="title"
            style={{
              fontFamily: "var(--font-hornbill-trial)",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "110%",
              letterSpacing: "0%",
              color: "var(--about-title)",
            }}
          >
            {title}
          </h2>

          {/* Swiper Slider */}
          <div className="relative w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="menu-swiper w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={cn(
                      "menu-image-frame",
                      "w-full",
                      "aspect-square",
                      "relative"
                    )}
                    data-section-component-key={`images.${index}`}
                  >
                    <Image
                      src={image}
                      alt={`Menu item ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Menu Button */}
          <div className="flex justify-start">
            <Link
              href="/menu"
              className={cn(
                "btn-menu",
                "flex items-center gap-2",
                "mt-4 md:mt-0"
              )}
            >
              VIEW MENU
              <Image
                src="/right-arrow-vector.svg"
                alt="Right arrow"
                width={20}
                height={20}
                className={cn("btn-menu-arrow", "w-5 h-5")}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

