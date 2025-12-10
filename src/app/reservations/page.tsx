"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import PrivateEventsNotice from "@/components/PrivateEventsNotice";
import HomeReservation from "@/components/HomeReservation";

export default function ReservationsPage() {
  useEffect(() => {
    // Handle scrolling to reservation section if hash is present
    if (window.location.hash === "#reservation") {
      setTimeout(() => {
        const reservationSection = document.getElementById("reservation");
        if (reservationSection) {
          reservationSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <main
      className={cn(
        "min-h-screen",
        "transition-colors duration-300"
      )}
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <HomeReservation />
      <PrivateEventsNotice />
    </main>
  );
}

