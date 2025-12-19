"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Mail, Instagram, Facebook } from "lucide-react";
import { CalendarIcon, LocationIcon, PhoneIcon } from "@/components/icons";
import content from "@/data/content.json";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={cn(
        "relative",
        "w-full h-auto",
        "transition-colors duration-300",
        "footer-bg"
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
          "footer-overlay"
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-20",
          "h-full w-full",
          "px-4 md:px-8 py-8 md:py-12"
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            "h-full w-full max-w-[1200px]",
            "mx-auto gap-8 md:gap-12"
          )}
        >
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-stretch justify-between">
            {/* Left: Logo & Social */}
            <div className="flex flex-col justify-between">
              <Image
                src={
                  theme === "day"
                    ? "/assets/imgs/hero-day.png"
                    : "/assets/imgs/hero-night.png"
                }
                alt="Johnny G's"
                width={300}
                height={100}
                className="w-full max-w-[250px] h-auto"
                unoptimized
              />
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mt-8 md:mt-0">
                {content.social.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="transition-colors duration-300 hover:opacity-80 footer-social-icon"
                  >
                    {link.platform === "Email" && <Mail size={32} />}
                    {link.platform === "Instagram" && <Instagram size={32} />}
                    {link.platform === "Facebook" && <Facebook size={32} />}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact Info with Star */}
            <div className="flex justify-between gap-4 md:gap-6">
              {/* Star Icon */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="94"
                  height="95"
                  viewBox="0 0 94 95"
                  fill="none"
                  className="w-[60px] md:w-[70px] h-auto"
                >
                  <path
                    d="M93.8013 47.231C51.2548 49.6531 49.3058 51.6204 46.9007 94.4619C44.4955 51.6158 42.5419 49.6531 0 47.231C42.5465 44.8089 44.4955 42.8415 46.9007 0C49.3058 42.8461 51.2594 44.8089 93.8013 47.231Z"
                    className="footer-star-fill"
                  />
                </svg>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-8">
                {/* Hours - Monday to Sunday */}
                <div className="flex items-start gap-5">
                  <CalendarIcon className="flex-shrink-0" />
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3">
                    <p className="transition-colors duration-300 footer-days">
                      MON-SUN
                    </p>
                    <div className="flex flex-col xl:flex-row gap-1 xl:gap-4">
                      <p className="transition-colors duration-300 footer-meal-label">
                        Brunch{" "}
                        <span className="footer-meal-time">
                          7:00 AM – 4:00 PM
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dinner - Tuesday to Sunday */}
                <div className="flex items-start gap-5">
                  <CalendarIcon className="flex-shrink-0" />
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3">
                    <p className="transition-colors duration-300 footer-days">
                      TUE-SUN
                    </p>
                    <p className="transition-colors duration-300 footer-meal-label">
                      Dinner{" "}
                      <span className="footer-meal-time">
                        4:30 PM – 9:00 PM
                      </span>
                    </p>
                  </div>
                </div>

                {/* Jazz Night - Thursday to Saturday */}
                <div className="flex items-start gap-5">
                  <CalendarIcon className="flex-shrink-0" />
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3">
                    <p className="transition-colors duration-300 footer-days">
                      THU-SAT
                    </p>
                    <a 
                      href="/events"
                      className="transition-colors duration-300 footer-meal-label hover:opacity-80"
                    >
                      Live Jazz{" "}
                      <span className="footer-meal-time">
                        8PM till Late
                      </span>
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <LocationIcon className="flex-shrink-0" />
                  <p className="transition-colors duration-300 footer-contact">
                    478 PARLIAMENT ST, TORONTO, ON M5A 2L3
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <PhoneIcon className="flex-shrink-0" />
                  <a
                    href={`tel:${content.reservations.phone.tel}`}
                    className="transition-colors duration-300 hover:opacity-80 footer-contact"
                  >
                    647-368-3877
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

