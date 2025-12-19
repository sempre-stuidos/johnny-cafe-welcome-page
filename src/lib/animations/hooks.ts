/**
 * GSAP Animation Hooks
 * 
 * Reusable React hooks for common animation patterns.
 * Built with @gsap/react for optimal React integration.
 */

"use client";

import { useEffect, useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animationConfig } from "./config";

/**
 * Hook for page load animations (Nav + Hero sequence)
 * 
 * Animates elements on initial page load with a controlled sequence.
 * 
 * @param selector - CSS selector or data-animate attribute value to target
 * @param type - Animation type: 'nav-logo', 'nav-links', 'nav-toggle', or 'hero'
 * @param containerRef - Optional container ref to scope animation
 * 
 * @example
 * const containerRef = useRef(null);
 * usePageLoadAnimation('[data-animate="nav-logo"]', 'nav-logo', containerRef);
 */
export function usePageLoadAnimation(
  selector: string,
  type: "nav-banner" | "nav-logo" | "nav-links" | "nav-toggle" | "hero",
  containerRef?: RefObject<HTMLElement | null>
) {
  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    const animate = contextSafe(() => {
      const config = 
        type === "hero" 
          ? animationConfig.pageLoad.hero 
          : animationConfig.pageLoad.nav[type.replace("nav-", "") as keyof typeof animationConfig.pageLoad.nav];

      const elements = containerRef?.current 
        ? containerRef.current.querySelectorAll(selector)
        : document.querySelectorAll(selector);

      if (elements.length === 0) return;

      // Set initial state
      gsap.set(elements, config.from);

      // Animate to final state
      gsap.to(elements, {
        ...config.to,
        duration: config.duration,
        ease: config.ease,
        delay: config.delay,
      });
    });

    animate();
  }, [selector, type, containerRef, contextSafe]);
}

/**
 * Hook for scroll-triggered reveal animations
 * 
 * Animates elements when they come into view during scroll.
 * Uses Intersection Observer for performance.
 * 
 * @param options - Optional config overrides
 * @returns ref - Attach this ref to the element you want to animate
 * 
 * @example
 * const ref = useScrollReveal();
 * return <section ref={ref} data-animate="section">...</section>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: Partial<typeof animationConfig.scrollReveal>
) {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  const config = {
    ...animationConfig.scrollReveal,
    ...options,
  };

  useGSAP(() => {
    if (!ref.current || hasAnimated.current) return;

    const element = ref.current;

    // Set initial state
    gsap.set(element, config.from);

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Animate in
            gsap.to(element, {
              ...config.to,
              duration: config.duration,
              ease: config.ease,
            });

            // Cleanup - stop observing after animation
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, { scope: ref });

  return ref;
}

/**
 * Future: Hook for complex timeline animations
 * Placeholder for when more complex animations are needed
 * 
 * @example
 * const timelineRef = useTimeline('heroComplex');
 * timelineRef.current.play();
 */
// export function useTimeline(configKey: string) {
//   const timelineRef = useRef<gsap.core.Timeline | null>(null);
//   // Implementation for complex timelines
//   return timelineRef;
// }

/**
 * Future: Hook for ScrollTrigger animations
 * Placeholder for scroll-linked animations (parallax, scrub, etc.)
 * 
 * @example
 * const ref = useScrollTrigger({ scrub: 1, pin: true });
 */
// export function useScrollTrigger(options: ScrollTriggerOptions) {
//   const ref = useRef<HTMLElement>(null);
//   // Implementation for ScrollTrigger
//   return ref;
// }

