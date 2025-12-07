"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "day" | "night";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to determine theme based on current time
function getThemeByTime(): Theme {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeInMinutes = hours * 60 + minutes;
  
  // Day theme: 7:00 AM (420 min) to 4:30 PM (990 min)
  const dayStart = 7 * 60; // 7:00 AM = 420 minutes
  const dayEnd = 16 * 60 + 30; // 4:30 PM = 990 minutes
  
  // If time is between 7:00 AM and 4:30 PM, use day theme
  if (timeInMinutes >= dayStart && timeInMinutes < dayEnd) {
    return "day";
  }
  
  // Otherwise, use night theme (4:30 PM to 7:00 AM)
  return "night";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with day theme to match server render
  const [theme, setTheme] = useState<Theme>("day");

  // Set theme based on time after component mounts (client-side only)
  useEffect(() => {
    const timeBasedTheme = getThemeByTime();
    setTheme(timeBasedTheme);
  }, []);

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "day" ? "night" : "day"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

