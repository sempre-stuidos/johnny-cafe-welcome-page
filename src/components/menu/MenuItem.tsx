"use client";

import { ReactElement } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
}

/**
 * Removes emojis from text
 */
function removeEmojis(text: string): string {
  // Match emojis using Unicode ranges
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{200D}]|[\u{FE0F}]/gu;
  return text.replace(emojiRegex, '').trim();
}

/**
 * Checks if text is in list format (contains "—" separators) and converts it to a list
 * Only formats as list if there are more than 2 dashes (at least 3)
 */
function formatDescription(description: string): ReactElement {
  const cleanedDescription = removeEmojis(description);
  
  // Check if description contains "—" separator (em dash or en dash)
  const listPattern = /[—–]/g;
  
  // Count the number of dashes
  const dashMatches = cleanedDescription.match(listPattern);
  const dashCount = dashMatches ? dashMatches.length : 0;
  
  // Only format as list if there are more than 2 dashes (at least 3)
  if (dashCount > 2) {
    // Extract introduction text (text before first colon, if present)
    let introText = '';
    let textToParse = cleanedDescription;
    const colonIndex = cleanedDescription.indexOf(':');
    
    if (colonIndex > 0) {
      introText = cleanedDescription.substring(0, colonIndex + 1).trim();
      textToParse = cleanedDescription.substring(colonIndex + 1).trim();
    }
    
    // Split by comma, but be smart about it - look for pattern: "Item — description,"
    // Use regex to split on commas that are followed by a word and then a dash
    const listItems: string[] = [];
    const parts = textToParse.split(',').map(part => part.trim()).filter(part => part.length > 0);
    
    for (const part of parts) {
      if (listPattern.test(part)) {
        // This part contains a dash, so it's a list item
        listItems.push(part);
      } else if (listItems.length > 0) {
        // This part doesn't have a dash, so it's likely a continuation of the previous item's description
        // (e.g., "sweet, bright & tropical" is part of "Mango — sweet, bright & tropical")
        listItems[listItems.length - 1] += ', ' + part;
      } else {
        // First part without dash - might be standalone or continuation
        listItems.push(part);
      }
    }
    
    // If we have list items, render as list
    if (listItems.length > 0) {
      return (
        <>
          {introText && <span>{introText} </span>}
          <ul className="list-disc list-inside ml-2 space-y-1">
            {listItems.map((item, index) => {
              // Split by dash to get item name and description
              const dashIndex = item.search(/[—–]/);
              if (dashIndex > 0) {
                const itemName = item.substring(0, dashIndex).trim();
                const itemDesc = item.substring(dashIndex + 1).trim();
                return (
                  <li key={index}>
                    <strong>{itemName}</strong>
                    {itemDesc && ` — ${itemDesc}`}
                  </li>
                );
              }
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </>
      );
    }
  }
  
  // If not a list, return as regular text
  return <>{cleanedDescription}</>;
}

/**
 * Renders menu item name with numbers in parentheses styled with Amoret Sans font
 */
function renderMenuItemName(name: string): ReactElement {
  // Remove emojis from name first
  const cleanedName = removeEmojis(name);
  
  // Match patterns like "(4)" or "(123)" - numbers in parentheses
  const regex = /(\((\d+)\))/g;
  const parts: (string | ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanedName)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(cleanedName.substring(lastIndex, match.index));
    }
    
    // Add the styled number in parentheses
    parts.push(
      <span key={match.index} style={{ fontFamily: "var(--font-amoret-sans)" }}>
        {match[0]}
      </span>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text after the last match
  if (lastIndex < cleanedName.length) {
    parts.push(cleanedName.substring(lastIndex));
  }
  
  // If no matches found, return the original name as JSX
  if (parts.length === 0) {
    return <>{cleanedName}</>;
  }
  
  return <>{parts}</>;
}

export default function MenuItem({ name, price, description }: MenuItemProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-1">
      {/* Title and Price Row */}
      <div className="flex items-start justify-between gap-4">
        <h6
          className={cn(
            "menu-item-name flex-1",
            theme === "day" ? "menu-item-name-day" : "menu-item-name-night"
          )}
        >
          {renderMenuItemName(name)}
        </h6>
        <span
          className={cn(
            "text-menu-price whitespace-nowrap",
            theme === "day" ? "text-menu-price-day" : "text-menu-price-night"
          )}
        >
          {price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <div
        className={cn(
          "text-menu-description",
          theme === "day" ? "text-menu-description-day" : "text-menu-description-night"
        )}
      >
        {formatDescription(description)}
      </div>
    </div>
  );
}
