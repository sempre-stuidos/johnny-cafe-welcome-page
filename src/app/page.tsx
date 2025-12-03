"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
      <section 
        className="w-full h-[90vh] px-8 transition-colors duration-300 overflow-y-hidden"
        style={{ backgroundColor: 'var(--theme-bg-nav)' }}
      >
        <div className="flex flex-row h-full gap-2 w-full">
          {/* Left Side - 40% */}
          <div className="flex flex-col justify-between py-6" style={{ width: '40%' }}>
            <div className="hero-title-section mt-6">
              <h3>
                478 PARLIAMENT ST
              </h3>

              <h1 className="text-stroke-dark-green">
                JOHNNY G's
              </h1>
              <div className="brunch-est-container flex flex-row align-bottom">
                <h2 className="hero-brunch-title text-stroke-dark-green">
                  Brunch
                </h2>
                <p className="est-1975-text">
                  EST 1975
                </p>
              </div>

            </div>

            <Image
              src="/comet-vector.svg"
              alt="Comet vector"
              width={200}
              height={200}
              className="w-auto h-auto mt-8"
            />

            <div className="hero-content-section flex flex-col justify-between relative">
              <h4>
                {theme === "day" ? "Have brunch at one of the oldest Restaurants in Cabbagetown" : "Have dinner at one of the oldest Restaurants in Cabbagetown"}
              </h4>

              <div className="hero-hours-section flex flex-col justify-between">
                <h5>
                  MONDAY - SUNDAY
                </h5>

                <h5>
                  {theme === "day" ? "7AM - 4PM" : "7PM - 12AM"}
                </h5>
              </div>

              <Image
                src="/star-vector.svg"
                alt="Star vector"
                width={50}
                height={50}
                className="hero-star-decoration"
              />
            </div>
            <button className="btn-reservation mt-8 mb-4 flex items-center gap-2">
              Reservation
              <Image
                src="/right-arrow-vector.svg"
                alt="Right arrow"
                width={20}
                height={20}
                className="w-5 h-5 btn-reservation-arrow"
              />
            </button>
          </div>

          {/* Right Side - 60% */}
          <div className="flex items-end justify-end" style={{ width: '60%' }}>

            <div className="hero-frame w-full">
              <Image
                src={theme === "day" ? "/home/brunch-frame-bg.jpg" : "/home/jazz-frame.jpg"}
                alt={theme === "day" ? "Brunch dish" : "Jazz night"}
                fill
                sizes="550px"
                className="object-cover"
                unoptimized
              />

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
