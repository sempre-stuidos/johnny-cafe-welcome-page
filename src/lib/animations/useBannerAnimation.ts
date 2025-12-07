import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom hook for animating banner sections on mobile
 * Cycles through banner sections with fade in/out animation every 3 seconds
 */
export function useBannerAnimation(isDesktop: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isDesktop || !containerRef.current) {
      return;
    }

    const sectionsNodeList = containerRef.current.querySelectorAll("[data-banner-section]");
    const sections = Array.from(sectionsNodeList);
    
    if (sections.length === 0) return;

    const tl = gsap.timeline({ repeat: -1 });

    gsap.set(sections[0], { opacity: 1 });
    gsap.set(sections.slice(1), { opacity: 0 });

    sections.forEach((section, index) => {
      const nextIndex = (index + 1) % sections.length;
      
      tl.to({}, { duration: 3 })
        .to(sections[index], { 
          opacity: 0, 
          duration: 0.5,
          ease: "power2.inOut"
        })
        .to(sections[nextIndex], { 
          opacity: 1, 
          duration: 0.5,
          ease: "power2.inOut"
        }, "-=0.25");
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isDesktop]);

  return containerRef;
}

