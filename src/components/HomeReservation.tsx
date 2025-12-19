"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/animations/hooks";
import CustomSelect from "@/components/CustomSelect";

export default function HomeReservation() {
  const { theme } = useTheme();
  const contentRef = useScrollReveal();
  const [partySize, setPartySize] = useState("");
  const [mealType, setMealType] = useState<"brunch" | "dinner" | "jazz">("brunch");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!partySize || !selectedDate || !selectedTime || !email || !phone) {
      setError("Please fill in all fields");
      return;
    }

    // Format date as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    // Format time as HH:MM
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partySize,
          mealType,
          date: formattedDate,
          time: formattedTime,
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
        "overflow-visible",
        "reservation-section-bg",
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
                "bg-center bg-[length:calc(100%+2px)_calc(100%+2px)]", "",
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
          "reservation-overlay"
        )}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-0 md:py-0",
          "overflow-visible"
        )}
        data-animate="section"
      >
        <div
          className={cn(
            "flex flex-col md:flex-row",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-4 md:gap-8",
            "overflow-visible"
          )}
        >
          {/* Left Side Content - Top on mobile, Left on desktop */}
          <div
            className={cn(
              "flex flex-col justify-between",
              "gap-6 md:gap-8",
              "w-full md:w-[40%]",
              "pt-4 md:pt-6",
            )}
          >
            {/* Heading */}
              <div className="flex flex-col gap-4">
                  <h4 className="reservation-heading">
                     Your Table Awaits
                  </h4>

                  {/* Decorative "Reserve Now" text */}
                  <h2 className="hero-brunch-title transition-colors duration-300">
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
              "relative",
              "overflow-visible"
            )}
          >
            <div
              className={cn(
                "hero-frame",
                "w-full h-auto",
                "min-h-[600px] md:min-h-[668px] max-w-full md:max-w-[597px]",
                "relative",
                "p-4 md:p-8 pb-8",
                "overflow-visible",
                "reservation-frame"
              )}
            >
              {/* Confirmation Message */}
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center gap-4 w-full absolute reservation-confirmation-container">
                  <h3 className="reservation-confirmation-title">
                    Thank You!
                  </h3>
                  <p className="reservation-confirmation">
                    Your reservation request has been submitted successfully. We will contact you soon to confirm your reservation.
                  </p>
                </div>
              ) : (
                /* Form */
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 md:gap-4 w-full absolute px-2 md:px-20 reservation-form-container"
                >
                {/* Row 1: Party Size and Meal Type */}
                <div className="flex gap-3">
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label
                      htmlFor="party-size"
                      className="reservation-label"
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
                      className="reservation-input"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label
                      htmlFor="meal-type"
                      className="reservation-label"
                    >
                      MEAL TYPE
                    </label>
                    <CustomSelect
                      value={mealType}
                      onChange={(value) => {
                        setMealType(value as "brunch" | "dinner" | "jazz");
                        setSelectedTime(null); // Reset time when meal type changes
                      }}
                      options={[
                        { value: "brunch", label: "Brunch" },
                        { value: "dinner", label: "Dinner" },
                        { value: "jazz", label: "Jazz" },
                      ]}
                      placeholder="Select meal type"
                    />
                    <Image
                      src="/star-vector.svg"
                      alt="Star vector"
                      width={200}
                      height={200}
                      className={cn(
                        "absolute",
                        "bottom-[-120px] left-1/2 -translate-x-1/2",
                        "w-auto h-[70px]",
                        "hidden lg:block",
                        "pointer-events-none"
                      )}
                    />
                  </div>
                </div>

                {/* Row 2: Date and Time */}
                <div className="flex gap-3">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="date"
                      className="reservation-label"
                    >
                      DATE
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      dateFormat="MMM d, yyyy"
                      placeholderText="Select a date"
                      required
                      popperPlacement="bottom-start"
                      className="w-full transition-colors duration-300 focus:outline-none reservation-datepicker"
                      wrapperClassName="w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="time"
                      className="reservation-label"
                    >
                      TIME
                    </label>
                    <DatePicker
                      selected={selectedTime}
                      onChange={(date) => setSelectedTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select a time"
                      required
                      popperPlacement="bottom-start"
                      minTime={
                        mealType === "brunch"
                          ? new Date(new Date().setHours(7, 0, 0, 0))
                          : mealType === "dinner"
                          ? new Date(new Date().setHours(16, 0, 0, 0))
                          : new Date(new Date().setHours(21, 0, 0, 0))
                      }
                      maxTime={
                        mealType === "brunch"
                          ? new Date(new Date().setHours(16, 0, 0, 0))
                          : mealType === "dinner"
                          ? new Date(new Date().setHours(20, 30, 0, 0))
                          : new Date(new Date().setHours(23, 30, 0, 0))
                      }
                      className="w-full transition-colors duration-300 focus:outline-none reservation-datepicker"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>

                {/* Row 3: Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="reservation-label"
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
                    className="reservation-input"
                  />
                </div>

                {/* Row 4: Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="reservation-label"
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
                    className="reservation-input"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="reservation-error">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "btn-reservation",
                      "reservation-submit-button",
                      "flex items-center gap-2",
                      "w-full",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
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
