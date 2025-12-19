"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLenis } from "@/contexts/LenisContext";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { usePageLoadAnimation } from "@/lib/animations/hooks";
import Banner from "@/components/Banner";
import MenuToggle from "@/components/MenuToggle";
import gsap from "gsap";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { stop, start } = useLenis();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      stop();
    } else {
      start();
    }
  }, [isMenuOpen, stop, start]);

  // Page load animations
  usePageLoadAnimation('[data-animate="nav-banner"]', "nav-banner", navRef);
  usePageLoadAnimation('[data-animate="nav-logo"]', "nav-logo", navRef);
  usePageLoadAnimation('[data-animate="nav-links"]', "nav-links", navRef);
  usePageLoadAnimation('[data-animate="nav-toggle"]', "nav-toggle", navRef);

  // Animate star position when pathname changes or window resizes
  useEffect(() => {
    if (!starRef.current) return;

    const updateStarPosition = () => {
      if (!starRef.current) return;

      const activeLink = navLinks.find(link => {
        if (link.href === "/") {
          return pathname === "/";
        }
        return pathname.startsWith(link.href);
      });

      if (!activeLink) {
        // Hide star if no active link
        gsap.set(starRef.current, { opacity: 0, immediateRender: true });
        return;
      }

      const linkElement = linkRefs.current.get(activeLink.href);
      if (!linkElement) {
        return;
      }

      const linkRect = linkElement.getBoundingClientRect();
      const containerRect = linkElement.parentElement?.getBoundingClientRect();
      
      if (!containerRect) return;

      // Calculate position relative to the parent container
      const leftPosition = linkRect.left - containerRect.left + linkRect.width / 2 - 10;

      // Animate smoothly like MenuHeader - just animate directly without setting initial state
      gsap.to(starRef.current, {
        left: leftPosition,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        rotate: 90,
        overwrite: "auto"
      });
    };

    // Wait for page load animation to complete (nav-links: delay 0.15s + duration 0.4s = ~0.55s)
    // Add extra buffer to ensure refs are ready
    const timeoutId = setTimeout(updateStarPosition, 1000);
    
    // Also try on next frame in case refs aren't ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(updateStarPosition, 500);
      });
    });

    // Handle window resize to keep star positioned correctly
    const handleResize = () => {
      setTimeout(updateStarPosition, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          "border-b border-white/10",
          theme === "day" ? "bg-nav-day" : "bg-nav-night"
        )}
      >
        {/* Banner - Above navigation content */}
        <Banner />
        
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity z-50"
              data-animate="nav-logo"
            >
              <Image
                src="/cafe-logo.png"
                alt="Johnny G's"
                width={40}
                height={20}
                className="h-5 sm:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 md:space-x-10 lg:space-x-12 pt-2 relative" data-animate="nav-links">
              {/* Star Icon - animated with GSAP */}
              <div
                ref={starRef}
                className="absolute -top-[16px] md:-top-1 z-10 left-[70px] pointer-events-none"
                style={{ bottom: '100px' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38 19C20.7639 19.9744 19.9744 20.7658 19 38C18.0256 20.7639 17.2342 19.9744 0 19C17.2361 18.0256 18.0256 17.2342 19 0C19.9744 17.2361 20.7658 18.0256 38 19Z"
                    fill="#B29738"
                  />
                </svg>
              </div>
              {navLinks
                .filter((link) => link.href !== "/gallery")
                .map((link) => {
                  const isActive = link.href === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(link.href);
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      ref={(el) => {
                        if (el) {
                          linkRefs.current.set(link.href, el);
                        } else {
                          linkRefs.current.delete(link.href);
                        }
                      }}
                      className={cn(
                        "nav-desktop-link",
                        isActive && "nav-desktop-link-active"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
            </div>

            {/* Right side - Theme Toggle + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle - Desktop only */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-end gap-3"
                aria-label={`Switch to ${theme === "day" ? "night" : "day"} theme`}
                data-animate="nav-toggle"
              >
                <div className="theme-toggle-container relative">
                  <div
                    className={cn(
                      "theme-toggle-knob absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
                      theme === "day" ? "theme-toggle-knob-day" : "theme-toggle-knob-night"
                    )}
                  />
                </div>
                <h5 className="nav-link pt-1 whitespace-nowrap">
                  {theme === "day" ? "Brunch" : "Dinner"}
                </h5>
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden z-50" data-animate="nav-toggle">
                <MenuToggle isOpen={isMenuOpen} onToggle={toggleMenu} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          "transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[80%] max-w-[320px]",
            "flex flex-col",
            "pt-32 pb-8 px-6",
            "transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
            theme === "day" ? "bg-nav-day" : "bg-nav-night"
          )}
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            {navLinks
              .filter((link) => !["/gallery", "/contact"].includes(link.href))
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "text-[#FAF2DD] text-2xl font-heading tracking-wide",
                    "hover:text-[#B29738] transition-colors duration-200",
                    "border-b border-white/10 pb-4"
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Theme Toggle - Mobile */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-4 w-full"
              aria-label={`Switch to ${theme === "day" ? "night" : "day"} theme`}
            >
              <div className="theme-toggle-container relative">
                <div
                  className={cn(
                    "theme-toggle-knob absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
                    theme === "day" ? "theme-toggle-knob-day" : "theme-toggle-knob-night"
                  )}
                />
              </div>
              {/* <span className="text-[#FAF2DD] text-lg">
                {theme === "day" ? "Brunch Mode" : "Dinner Mode"}
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
