"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          "border-b border-white/10"
        )}
        style={{
          backgroundColor: theme === "day" ? "#334D2D" : "#011A0C",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity z-50"
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
            <div className="hidden md:flex items-center space-x-8 pt-2">
              {navLinks
                .filter((link) => !["/about", "/gallery", "/contact"].includes(link.href))
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            {/* Right side - Theme Toggle + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle - Desktop only */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-end gap-3"
                aria-label={`Switch to ${theme === "day" ? "night" : "day"} theme`}
              >
                <div className="theme-toggle-container relative">
                  <div
                    className="theme-toggle-knob absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                    style={{
                      left: theme === "day" ? "2px" : "32px",
                    }}
                  />
                </div>
                <h5 className="nav-link pt-1 whitespace-nowrap">
                  {theme === "day" ? "Brunch" : "Jazz Night"}
                </h5>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-[#FAF2DD] hover:text-[#B29738] transition-colors z-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
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
            "pt-20 pb-8 px-6",
            "transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{
            backgroundColor: theme === "day" ? "#334D2D" : "#011A0C",
          }}
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            {navLinks
              .filter((link) => !["/about", "/gallery", "/contact"].includes(link.href))
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
                  className="theme-toggle-knob absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                  style={{
                    left: theme === "day" ? "2px" : "32px",
                  }}
                />
              </div>
              <span className="text-[#FAF2DD] text-lg">
                {theme === "day" ? "Brunch Mode" : "Jazz Night Mode"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
