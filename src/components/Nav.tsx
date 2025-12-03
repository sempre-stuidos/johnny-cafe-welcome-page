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
                  "text-white font-heading text-lg tracking-wide",
                  "hover:text-[#B29738] transition-colors duration-200",
                  "relative after:absolute after:bottom-0 after:left-0 after:h-[2px]",
                  "after:w-0 after:bg-[#B29738] after:transition-all after:duration-300",
                  "hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/10 hover:bg-white/20 transition-all duration-300",
              "border border-white/20 hover:border-white/40",
              "text-white font-heading text-sm tracking-wide"
            )}
            aria-label={`Switch to ${theme === "day" ? "night" : "day"} theme`}
          >
            {theme === "day" ? (
              <>
                <Moon className="w-5 h-5" />
                <span className="hidden sm:inline">Night</span>
              </>
            ) : (
              <>
                <Sun className="w-5 h-5" />
                <span className="hidden sm:inline">Day</span>
              </>
            )}
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

