# Project Context: Layout & Styling Guide

> **Quick Reference for Cursor AI and Developers**

## Core Styling Philosophy

**HYBRID APPROACH - STRICT SEPARATION:**

1. **Vanilla CSS (CSS Variables)** → Colors, Typography, Theme properties
2. **Tailwind CSS** → Layout, Spacing, Positioning, Responsive utilities

## Quick Rules

### ✅ DO:
- Use `var(--theme-*)` for ALL theme colors
- Use `var(--font-*)` and `var(--font-size-*)` for typography
- Use Tailwind for layout (`flex`, `grid`, `block`)
- Use Tailwind for spacing (`p-4`, `m-6`, `gap-8`)
- Add `ref` and `data-animate` for animation-ready components
- Include `transition-colors duration-300` for theme-aware elements

### ❌ DON'T:
- Use Tailwind color classes (`bg-white`, `text-black`, `dark:bg-gray-900`)
- Hardcode theme colors (`#ffffff`, `#000000`)
- Use Tailwind typography classes for theme typography (`text-3xl`, `font-bold`)
- Mix concerns (don't use inline styles for layout)

## Component Template

```tsx
"use client"; // Only if using hooks

import { useRef } from 'react';
// import { gsap } from 'gsap'; // When GSAP is added

export default function ComponentName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div
      ref={containerRef}
      data-animate="container"
      className="flex flex-col gap-4 p-6 max-w-4xl mx-auto"  // Tailwind
      style={{
        backgroundColor: 'var(--theme-bg-primary)',        // CSS Variable
        color: 'var(--theme-text-body)',                    // CSS Variable
      }}
    >
      <h1
        ref={titleRef}
        data-animate="title"
        style={{
          fontFamily: 'var(--font-fjalla-one)',            // CSS Variable
          fontSize: 'var(--font-size-3xl)',                 // CSS Variable
          color: 'var(--theme-accent)'                     // CSS Variable
        }}
      >
        Title
      </h1>
      <p style={{
        fontSize: 'var(--font-size-base)',
        color: 'var(--theme-text-body)'
      }}>
        Content
      </p>
    </div>
  );
}
```

## Available CSS Variables

### Theme Colors
- `--theme-bg-nav`
- `--theme-bg-primary`
- `--theme-bg-secondary`
- `--theme-text-primary`
- `--theme-text-body`
- `--theme-accent`

### Typography
- Fonts: `--font-geist-sans`, `--font-geist-mono`, `--font-yellowtail`, `--font-fjalla-one`
- Sizes: `--font-size-xs` through `--font-size-8xl`
- Line Heights: `--line-height-tight` through `--line-height-loose`
- Letter Spacing: `--letter-spacing-tighter` through `--letter-spacing-widest`

## Theme System

```tsx
"use client";
import { useTheme } from "@/contexts/ThemeContext";

const { theme, toggleTheme } = useTheme();
// theme: "day" | "night"
```

Theme is applied via `data-theme` attribute on `<html>` element.

## Animation Readiness

- Use `ref` for direct DOM access
- Use `data-animate="name"` for easy GSAP targeting
- Use CSS variables for animatable properties
- Don't set initial `transform` or `opacity` in styles

## Common Patterns

### Page Container
```tsx
<main 
  className="min-h-screen p-8 transition-colors duration-300"
  style={{ backgroundColor: 'var(--theme-bg-primary)' }}
>
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</main>
```

### Decorative Heading
```tsx
<h1 
  className="text-decorative"
  style={{
    fontSize: 'var(--font-size-6xl)',
    color: 'var(--theme-accent)'
  }}
>
  Johnny G's
</h1>
```

### Themed Card
```tsx
<div 
  className="p-6 rounded-lg transition-colors duration-300"
  style={{
    backgroundColor: 'var(--theme-bg-secondary)',
    color: 'var(--theme-text-body)'
  }}
>
  Card content
</div>
```

## File Locations

- Components: `src/components/`
- Pages: `src/app/[page-name]/page.tsx`
- Contexts: `src/contexts/ThemeContext.tsx`
- Utilities: `src/lib/utils.ts`
- Styles: `src/app/globals.css`

## Key Imports

```tsx
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
```

## Responsive Breakpoints

Use Tailwind breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

Example: `className="flex flex-col md:flex-row gap-4"`

---

**For complete documentation, see `DOCUMENTATION.md`**

