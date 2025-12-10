"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";
import { StarIcon } from "@/components/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    text: "The brunch at Johnny G's is absolutely divine! The atmosphere is cozy and intimate, perfect for a relaxing Sunday morning. The jazz music adds such a wonderful touch to the experience.",
  },
  {
    id: 2,
    name: "James Thompson",
    text: "Best jazz club in the city! The live performances are exceptional, and the dinner menu is outstanding. We've hosted several private events here and it never disappoints.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    text: "Johnny G's has become our go-to spot for special occasions. The staff is incredibly attentive, the food is exquisite, and the ambiance is unmatched. Highly recommend the evening jazz sessions!",
  },
  {
    id: 4,
    name: "Michael Chen",
    text: "From the moment you walk in, you're transported to a different era. The authentic jazz atmosphere combined with modern culinary excellence makes this place truly unique.",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    text: "Outstanding experience from start to finish! The cocktails are creative, the music is sublime, and the service is impeccable. This is what fine dining with entertainment should be.",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[600px]",
        "transition-colors duration-300",
        theme === "day" ? "bg-menu-section-day" : "bg-menu-section-night"
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
          theme === "day" ? "overlay-menu-day" : "overlay-menu-night"
        )}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-12"
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
          {/* Title with Stars */}
          <div className="flex items-center gap-4 md:gap-6">
            <StarIcon className="w-6 h-6 md:w-8 md:h-8" fill="#B29738" />
            <h2 className="section-heading text-left">
              What Our Guests Say
            </h2>
            <StarIcon className="w-6 h-6 md:w-8 md:h-8" fill="#B29738" />
          </div>

          {/* Testimonials Slider */}
          <div className="w-full">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              speed={600}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: ".testimonials-button-next",
                prevEl: ".testimonials-button-prev",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className={cn(
                      "flex flex-col gap-6",
                      "p-8 md:p-10",
                      "h-full min-h-[320px] md:min-h-[360px]",
                      "rounded-lg",
                      "border-2 border-[#B29738]",
                      "testimonial-card"
                    )}
                  >
                    <p className="text-about text-lg md:text-xl leading-relaxed flex-grow">
                      "{testimonial.text}"
                    </p>
                    <p className="text-about font-bold text-base md:text-lg">
                      — {testimonial.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Navigation Arrows */}
            <div className="testimonials-button-prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="testimonials-button-next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

