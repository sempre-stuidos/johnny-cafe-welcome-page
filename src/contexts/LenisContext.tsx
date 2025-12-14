"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextType {
  lenis: Lenis | null;
  start: () => void;
  stop: () => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  start: () => {},
  stop: () => {},
});

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const start = () => {
    lenisRef.current?.start();
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, start, stop }}>
      {children}
    </LenisContext.Provider>
  );
}
