"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  id?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      {/* Selected value display */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="reservation-input w-full text-left flex items-center justify-between"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="#B29738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Custom dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-1",
            "bg-[#FAF2DD] border-2 border-[#B29738]",
            "rounded-lg shadow-lg",
            "overflow-hidden",
            "z-[9999]",
            "custom-select-dropdown"
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-3",
                "font-amoret-sans text-[15px] font-medium",
                "transition-all duration-200",
                "custom-select-option",
                option.value === value && "custom-select-option-selected"
              )}
            >
              {option.value === value && (
                <span className="mr-2">✓</span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

