/**
 * GSAP Animation Configuration
 * 
 * Centralized config for all animations in the app.
 * Adjust these values to control animation timing, easing, and behavior.
 * 
 * This config is designed to be easily extensible for future
 * timeline-based animations and GSAP plugins.
 */

export const animationConfig = {
  /**
   * Page Load Animations
   * Controls the initial reveal sequence when page loads
   */
  pageLoad: {
    // Navigation animations
    nav: {
      logo: {
        duration: 0.4,
        ease: "power2.out",
        delay: 0.05,
        from: { opacity: 0, y: -20 },
        to: { opacity: 1, y: 0 },
      },
      links: {
        duration: 0.4,
        ease: "power2.out",
        delay: 0.15, // Starts after logo begins
        from: { opacity: 0, y: -15 },
        to: { opacity: 1, y: 0 },
      },
      toggle: {
        duration: 0.4,
        ease: "power2.out",
        delay: 0.25, // Starts after links begin
        from: { opacity: 0, y: -15 },
        to: { opacity: 1, y: 0 },
      },
    },
    // Hero content animation
    hero: {
      duration: 0.7,
      ease: "power2.out",
      delay: 0.6, // Starts after nav fully completes
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },

  /**
   * Scroll Reveal Animations
   * Controls how sections animate in when scrolled into view
   */
  scrollReveal: {
    duration: 0.6,
    ease: "power2.out",
    from: { opacity: 0 },
    to: { opacity: 1 },
    // Intersection Observer options
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px", // Trigger slightly before element enters viewport
  },

  /**
   * Future: Timeline Configurations
   * Placeholder for complex multi-step animations
   */
  timelines: {
    // Example structure for future use:
    // heroComplex: {
    //   steps: [...],
    //   stagger: 0.1,
    //   repeat: -1,
    // },
  },

  /**
   * Future: Plugin Configurations
   * Placeholder for GSAP plugins (ScrollTrigger, MotionPath, etc.)
   */
  plugins: {
    // Example structure for future use:
    // scrollTrigger: {
    //   markers: false,
    //   scrub: 1,
    // },
  },
} as const;

/**
 * Type exports for TypeScript safety
 */
export type AnimationConfig = typeof animationConfig;
export type PageLoadConfig = typeof animationConfig.pageLoad;
export type ScrollRevealConfig = typeof animationConfig.scrollReveal;

