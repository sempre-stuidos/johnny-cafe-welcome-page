"use client";

import { useState } from "react";
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
    name: "vivek rocky",
    text: "Had breakfast here and also tried their Indian food honestly the best food I've had on Parliament St! The quality was outstanding, full of flavor and perfectly cooked. The place has such a cool retro vintage vibe, and the touch of jazz music in the background makes the atmosphere even better. Highly recommend this spot if you're looking for amazing food and a unique experience.",
  },
  {
    id: 2,
    name: "Emily A",
    text: "Super cute breakfast place! Was a little smaller than we thought it would be, but not in a bad way! Everything was really well designed and the food was delicious! Reasonable prices and wonderful service!",
  },
  {
    id: 3,
    name: "Thenuka Jayasooriya",
    text: "Johnny G's Café by the Chef is a hidden gem in Cabbagetown! The customer service was exceptional, and the chef truly knows his craft—every dish we tried was perfect.",
  },
  {
    id: 4,
    name: "Nicki Iskander",
    text: "Popped in here last night with two friends before a show at the Phoenix. We saw the live jazz band performing from the street and decided to go in for a drink. They had a nice, simple cocktail menu. The service was lovely. There was a space heater that added to the cozy atmosphere.",
  },
  {
    id: 5,
    name: "Jeremi De Pue",
    text: "Warm inviting atmosphere!! A great spot for classic breakfast options. We went there 3 days in a row.. I'll let that speak for our level of satisfaction",
  },
];

// Max character length based on Emily A's review
const MAX_CHAR_LENGTH = 201;

export default function Testimonials() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    setExpandedTestimonials((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, id: number): string => {
    if (text.length <= MAX_CHAR_LENGTH) {
      return text;
    }
    const isExpanded = expandedTestimonials.has(id);
    if (isExpanded) {
      return text;
    }
    // Find the last space before the max length to avoid cutting words
    const truncated = text.substring(0, MAX_CHAR_LENGTH);
    const lastSpace = truncated.lastIndexOf(" ");
    return text.substring(0, lastSpace > 0 ? lastSpace : MAX_CHAR_LENGTH);
  };

  return (
    <section
      className={cn(
        "relative",
        "w-full h-auto min-h-[600px] pb-20",
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
                    <div className="flex-grow">
                      <p className="text-about text-lg md:text-xl leading-relaxed">
                        &ldquo;{truncateText(testimonial.text, testimonial.id)}&rdquo;
                        {testimonial.text.length > MAX_CHAR_LENGTH &&
                          !expandedTestimonials.has(testimonial.id) && (
                            <>
                              {" "}
                              <button
                                onClick={() => toggleExpanded(testimonial.id)}
                                className="text-[#B29738] font-semibold hover:underline cursor-pointer"
                              >
                                ... more
                              </button>
                            </>
                          )}
                        {testimonial.text.length > MAX_CHAR_LENGTH &&
                          expandedTestimonials.has(testimonial.id) && (
                            <>
                              {" "}
                              <button
                                onClick={() => toggleExpanded(testimonial.id)}
                                className="text-[#B29738] font-semibold hover:underline cursor-pointer"
                              >
                                less
                              </button>
                            </>
                          )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="#B29738"
                        />
                      ))}
                    </div>
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

