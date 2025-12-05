"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";

export default function HomeReservation() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!partySize || !date || !time || !email || !phone) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partySize,
          date,
          time,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.error || "Failed to submit reservation. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("Failed to submit reservation. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reservation"
      className={cn(
        "relative",
        "w-full h-auto min-h-[668px]",
        "overflow-hidden",
        "transition-colors duration-300"
      )}
      style={{
        backgroundColor:
          theme === "day" ? "rgba(194, 202, 168, 1)" : "rgba(1, 26, 12, 1)",
      }}
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
              : "rgba(1, 26, 12, 0.70)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-0 md:py-0"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-4 md:gap-8"
          )}
        >
          {/* Left Side Content - Top on mobile, Left on desktop */}
          <div
            className={cn(
              "flex flex-col",
              "gap-6 md:gap-8",
              "w-full md:w-[40%]",
              "pt-4 md:pt-6",
              "order-1"
            )}
          >
            {/* Heading */}
              <div className="flex flex-col gap-4">
                  <h4
                      style={{
                          fontSize: "clamp(var(--font-size-3xl), 7vw, var(--font-size-6xl))",
                          color: theme === "day" ? "var(--theme-text-dark-green)" : "var(--color-theme-accent)",
                          fontWeight: 400,
                          lineHeight: "var(--line-height-tight)",
                      }}
                      className="capitalize"
                  >
                     Your Table Awaits
                  </h4>

                  {/* Decorative "Reserve Now" text */}
                  <h2
                      className="hero-brunch-title transition-colors duration-300"
                  >
                      Reserve Now
                  </h2>
              </div>

              {/* Trumpet Player SVG - Hidden on mobile */}
              <div className="hidden md:block relative w-full max-w-[600px] mt-4">
                  <Image
                      src="/home/trumpet-player.svg"
                      alt="Trumpet player"
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain"
                      unoptimized
              />
            </div>
          </div>

          {/* Right Side Form - Full width on mobile, Right on desktop */}
          <div
            className={cn(
              "flex items-center justify-center md:justify-end",
              "w-full md:w-[60%]",
              "order-2",
              "py-8 md:py-0 md:mt-8",
              "relative"
            )}
          >
            <div
              className={cn(
                "hero-frame",
                "w-full h-auto",
                "min-h-[600px] md:min-h-[668px] max-w-full md:max-w-[597px]",
                "relative",
                "p-4 md:p-8 pb-8",
                "overflow-visible"
              )}
              style={{
                backgroundColor: "transparent",
              }}
            >
              {/* Confirmation Message */}
              {isSubmitted ? (
                <div
                  className="flex flex-col items-center justify-center gap-4 w-full absolute"
                  style={{
                    backgroundColor: "transparent",
                    top: "180px",
                    left: "0",
                    right: "0",
                    padding: "0px 80px",
                  }}
                >
                  <h3
                    className="uppercase text-center transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-gayathri)",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "120%",
                      letterSpacing: "2%",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                      marginBottom: "8px",
                    }}
                  >
                    Thank You!
                  </h3>
                  <p
                    className="text-center transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-amoret-sans)",
                      fontSize: "var(--font-size-base)",
                      lineHeight: "150%",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                    }}
                  >
                    Your reservation request has been submitted successfully. We will contact you soon to confirm your reservation.
                  </p>
                </div>
              ) : (
                /* Form */
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 md:gap-4 w-full absolute px-2 md:px-20"
                  style={{
                    backgroundColor: "transparent",
                    bottom: "20px",
                    left: "0",
                    right: "0",
                  }}
                >
                {/* Row 1: Party Size + Star Vector */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-2 relative">
                    <label
                      htmlFor="party-size"
                      className="uppercase transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-gayathri)",
                        fontWeight: 700,
                        fontSize: "17.31px",
                        lineHeight: "100%",
                        letterSpacing: "2%",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                      }}
                    >
                      PARTY SIZE
                    </label>
                    <input
                      type="number"
                      id="party-size"
                      name="party-size"
                      min="1"
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      required
                      className="transition-colors duration-300 focus:outline-none"
                      style={{
                        width: "173px",
                        height: "40px",
                        border: "1px solid #B29738",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                        padding: "0 12px",
                        fontFamily: "var(--font-amoret-sans)",
                        fontSize: "var(--font-size-base)",
                      }}
                    />
                    <Image
                      src="/star-vector.svg"
                      alt="Star vector"
                      width={200}
                      height={200}
                      className={cn(
                        "absolute",
                        "bottom-10 left-60",
                        "w-auto h-[70px]",
                        "hidden md:block"
                      )}
                    />
                  </div>
                </div>

                {/* Row 2: Date and Time */}
                <div className="flex gap-3">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="date"
                      className="uppercase transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-gayathri)",
                        fontWeight: 700,
                        fontSize: "17.31px",
                        lineHeight: "100%",
                        letterSpacing: "2%",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                      }}
                    >
                      DATE
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full transition-colors duration-300 focus:outline-none"
                      style={{
                        height: "40px",
                        border: "1px solid #B29738",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                        padding: "0 12px",
                        fontFamily: "var(--font-amoret-sans)",
                        fontSize: "var(--font-size-base)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="time"
                      className="uppercase transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-gayathri)",
                        fontWeight: 700,
                        fontSize: "17.31px",
                        lineHeight: "100%",
                        letterSpacing: "2%",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                      }}
                    >
                      TIME
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full transition-colors duration-300 focus:outline-none"
                      style={{
                        height: "40px",
                        border: "1px solid #B29738",
                        borderWidth: "1px",
                        backgroundColor: "transparent",
                        color:
                          theme === "day"
                            ? "#334D2D"
                            : "var(--theme-text-light-cream)",
                        padding: "0 12px",
                        fontFamily: "var(--font-amoret-sans)",
                        fontSize: "var(--font-size-base)",
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="uppercase transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-gayathri)",
                      fontWeight: 700,
                      fontSize: "17.31px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                    }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full transition-colors duration-300 focus:outline-none"
                    style={{
                      height: "40px",
                      border: "1px solid #B29738",
                      borderWidth: "1px",
                      backgroundColor: "transparent",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                      padding: "0 12px",
                      fontFamily: "var(--font-amoret-sans)",
                      fontSize: "var(--font-size-base)",
                    }}
                  />
                </div>

                {/* Row 4: Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="uppercase transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-gayathri)",
                      fontWeight: 700,
                      fontSize: "17.31px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                    }}
                  >
                    PHONE
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full transition-colors duration-300 focus:outline-none"
                    style={{
                      height: "40px",
                      border: "1px solid #B29738",
                      borderWidth: "1px",
                      backgroundColor: "transparent",
                      color:
                        theme === "day"
                          ? "#334D2D"
                          : "var(--theme-text-light-cream)",
                      padding: "0 12px",
                      fontFamily: "var(--font-amoret-sans)",
                      fontSize: "var(--font-size-base)",
                    }}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div
                    className="text-center transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-amoret-sans)",
                      fontSize: "var(--font-size-sm)",
                      color: "#dc2626",
                      padding: "8px 0",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center mt-4 ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "btn-reservation",
                      "flex items-center gap-2",
                      "w-full",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                    style={{
                      fontSize: "clamp(var(--font-size-xs), 2.5vw, var(--font-size-sm))",
                      height: "44px",
                      padding: "12px 24px",
                    }}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
