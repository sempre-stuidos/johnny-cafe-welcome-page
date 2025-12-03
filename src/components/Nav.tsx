"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        "border-b border-white/10"
      )}
      style={{
        backgroundColor: theme === "day" ? "#334D2D" : "#011A0C",
      }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/cafe-logo.png"
              alt="Johnny G's"
              width={40}
              height={20}
              className="h-5 sm:h-10 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative transition-colors duration-200",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px]",
                  "after:w-0 after:bg-[#B29738] after:transition-all after:duration-300",
                  "hover:after:w-full hover:text-[#B29738]"
                )}
                style={{
                  fontFamily: 'var(--font-amoret-sans)',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  letterSpacing: '0%',
                  color: 'var(--theme-text-light-cream)',
                  height: '25px'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-end gap-3"
            aria-label={`Switch to ${theme === "day" ? "night" : "day"} theme`}
          >
            <div className="relative" style={{
              width: '60px',
              height: '32px',
              borderRadius: '16px',
              border: '2px solid #2a3f24',
              backgroundColor: '#FAF2DD',
              padding: '2px',
              transition: 'all 0.3s ease'
            }}>
              <div className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out" style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#334D2D',
                border: '1px solid #FAF2DD',
                left: theme === "day" ? '2px' : '32px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }} />
            </div>
            <h5 className="pt-1">
              {theme === "day" ? "Brunch" : "Jazz Night"}
            </h5>
          </button>

        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center space-x-6 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-white font-heading text-sm tracking-wide",
                "hover:text-[#B29738] transition-colors duration-200"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

