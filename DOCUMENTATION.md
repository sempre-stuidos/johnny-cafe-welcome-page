# Johnny G's Restaurant - Project Documentation

> **⚠️ IMPORTANT: This documentation serves as the primary guide for Cursor AI and developers building the rest of the site. Follow these patterns strictly to ensure consistency and animation compatibility.**

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Styling Philosophy](#styling-philosophy) ⚠️ **CRITICAL: Read First**
4. [Theme System (Day/Night Mode)](#theme-system-daynight-mode)
5. [Styling System](#styling-system)
6. [Typography System](#typography-system)
7. [Color System](#color-system)
8. [Component Patterns](#component-patterns)
9. [Animation-Ready Component Structure](#animation-ready-component-structure) ⚠️ **For GSAP Integration**
10. [File Structure](#file-structure)
11. [How to Use the Theme](#how-to-use-the-theme)
12. [Creating New Pages](#creating-new-pages)
13. [Best Practices](#best-practices)
14. [GSAP Animation Integration Guide](#gsap-animation-integration-guide)

---

## Project Overview

This is a Next.js 16 project for Johnny G's Restaurant website. The project features:
- **Day/Night theme toggle** with smooth transitions
- **Hybrid styling approach**: Vanilla CSS for colors/typography, Tailwind for layout/spacing
- **GSAP animation-ready** component structure
- **TypeScript** for type safety
- **Custom fonts** (Yellowtail, Fjalla One, Geist Sans, Geist Mono)
- **Responsive design** with mobile-first approach

### Key Architectural Decisions

1. **Vanilla CSS** handles all theme colors and typography (via CSS variables)
2. **Tailwind CSS** handles layout, spacing, positioning, and responsive utilities
3. **Components are structured** to easily integrate GSAP animations and vanilla JS animations
4. **Separation of concerns** ensures animations can target specific elements without conflicts

---

## Tech Stack

### Core Dependencies
- **Next.js 16.0.3** - React framework
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Tailwind Merge** - Merge Tailwind classes
- **clsx** - Conditional class names
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

---

## Styling Philosophy

> **⚠️ CRITICAL: This is the foundation of the entire styling system. All components MUST follow this pattern.**

### The Hybrid Approach

This project uses a **strict separation** between styling concerns:

#### ✅ **Vanilla CSS (CSS Variables) - Use For:**
- **Theme colors** (backgrounds, text colors, accents)
- **Typography** (font families, font sizes, line heights, letter spacing)
- **Custom properties** that need to be accessible to JavaScript/GSAP
- **CSS transitions** for theme changes

#### ✅ **Tailwind CSS - Use For:**
- **Layout** (flexbox, grid, positioning)
- **Spacing** (padding, margin, gaps)
- **Sizing** (width, height, max-width)
- **Responsive utilities** (breakpoints, display)
- **Borders, shadows, transforms** (layout-related)
- **Utility classes** for common patterns

### Why This Separation?

1. **GSAP Compatibility**: CSS variables can be easily animated with GSAP
2. **Theme Flexibility**: Colors and typography change via CSS variables, not Tailwind classes
3. **Animation Control**: Vanilla CSS properties are easier to target and animate
4. **Performance**: CSS variables update efficiently, Tailwind handles layout efficiently

### Example: Correct Pattern

```tsx
// ✅ CORRECT: Vanilla CSS for colors/typography, Tailwind for layout/spacing
<div
  className="flex flex-col gap-4 p-6 max-w-4xl mx-auto"  // Tailwind: layout & spacing
  style={{
    backgroundColor: 'var(--theme-bg-primary)',           // Vanilla CSS: color
    color: 'var(--theme-text-body)',                      // Vanilla CSS: color
    fontFamily: 'var(--font-fjalla-one)',                // Vanilla CSS: typography
    fontSize: 'var(--font-size-2xl)'                     // Vanilla CSS: typography
  }}
>
  <h1 style={{ color: 'var(--theme-accent)' }}>Title</h1>
  <p>Content</p>
</div>
```

### Example: Incorrect Pattern

```tsx
// ❌ INCORRECT: Don't use Tailwind for theme colors
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
  Content
</div>

// ❌ INCORRECT: Don't use inline styles for layout
<div style={{ display: 'flex', padding: '24px', gap: '16px' }}>
  Content
</div>
```

---

## Theme System (Day/Night Mode)

The project uses a custom theme system with two modes: **Day** and **Night**.

### Theme Context

The theme is managed through React Context (`ThemeContext.tsx`):

```typescript
import { useTheme } from "@/contexts/ThemeContext";

const { theme, toggleTheme } = useTheme();
// theme: "day" | "night"
// toggleTheme: () => void
```

### How It Works

1. **Theme State**: Stored in React state, defaults to `"day"`
2. **DOM Attribute**: Applied to `<html>` element as `data-theme="day"` or `data-theme="night"`
3. **CSS Variables**: Theme colors are defined as CSS variables that change based on the `data-theme` attribute
4. **Smooth Transitions**: All theme changes have `transition-colors duration-300` for smooth color transitions

### Using Theme in Components

#### Option 1: Using CSS Variables (Recommended)
```tsx
<div style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
  <p style={{ color: 'var(--theme-text-body)' }}>Content</p>
</div>
```

#### Option 2: Using Utility Classes
```tsx
<div className="bg-theme-primary text-theme-body">
  Content
</div>
```

#### Option 3: Using Theme Context for Conditional Logic
```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme === "day" ? "#ffffff" : "#011A0C"
    }}>
      Content
    </div>
  );
}
```

---

## Styling System

### Tailwind CSS v4 - Layout & Spacing Only

**IMPORTANT**: Tailwind CSS is used **ONLY** for layout, spacing, and utility classes. **NOT** for colors or typography.

#### What Tailwind Handles:
- Layout: `flex`, `grid`, `block`, `inline-block`
- Spacing: `p-4`, `m-6`, `gap-8`, `space-x-4`
- Sizing: `w-full`, `h-screen`, `max-w-4xl`
- Positioning: `relative`, `absolute`, `sticky`, `top-0`
- Responsive: `md:flex`, `lg:grid`, `sm:text-lg`
- Borders: `border`, `rounded-lg`, `border-2`
- Shadows: `shadow-lg`, `shadow-xl`
- Display: `hidden`, `block`, `flex`

#### What Tailwind Does NOT Handle:
- ❌ Theme colors (use CSS variables)
- ❌ Typography (use CSS variables)
- ❌ Custom animations (use GSAP or vanilla CSS)

### Configuration Files

- **`postcss.config.mjs`** - PostCSS configuration with Tailwind plugin
- **`globals.css`** - Global styles, theme variables, and Tailwind imports

### Utility Function: `cn()`

The project includes a utility function for merging Tailwind classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "flex flex-col gap-4",           // Tailwind: layout & spacing
  condition && "md:flex-row",      // Tailwind: responsive
  "more-tailwind-classes"
)}>
```

This uses `clsx` and `tailwind-merge` to intelligently merge class names.

---

## Typography System

> **⚠️ IMPORTANT: Typography uses Vanilla CSS variables, NOT Tailwind classes. This ensures GSAP can easily animate typography properties.**

### Font Families (CSS Variables)

The project uses four font families defined as CSS variables:

1. **Geist Sans** (`var(--font-geist-sans)`) - Body text, default font
2. **Geist Mono** (`var(--font-geist-mono)`) - Code/monospace text
3. **Yellowtail** (`var(--font-yellowtail)`) - Decorative text (logo, special headings)
4. **Fjalla One** (`var(--font-fjalla-one)`) - Headings (h1-h6)

### Typography Usage Patterns

#### ✅ CORRECT: Using CSS Variables

```tsx
// Headings with custom styling
<h1 style={{
  fontFamily: 'var(--font-fjalla-one)',
  fontSize: 'var(--font-size-5xl)',
  lineHeight: 'var(--line-height-tight)',
  letterSpacing: 'var(--letter-spacing-tight)',
  color: 'var(--theme-text-body)'
}}>
  Main Heading
</h1>

// Decorative text
<h1 
  className="text-decorative"  // CSS class defined in globals.css
  style={{
    fontSize: 'var(--font-size-6xl)',
    color: 'var(--theme-accent)'
  }}
>
  Johnny G's
</h1>

// Body text
<p style={{
  fontFamily: 'var(--font-geist-sans)',
  fontSize: 'var(--font-size-base)',
  lineHeight: 'var(--line-height-relaxed)',
  color: 'var(--theme-text-body)'
}}>
  Regular paragraph text
</p>
```

#### ❌ INCORRECT: Using Tailwind for Typography

```tsx
// Don't do this for theme-aware typography
<h1 className="text-5xl font-bold text-gray-900">
  Heading
</h1>
```

### Pre-configured Typography

Headings (h1-h6) are automatically styled in `globals.css` with Fjalla One font. You can override with inline styles if needed:

```tsx
// Uses default h1 styles from globals.css
<h1>Main Heading</h1>

// Override with custom styles
<h1 style={{
  fontSize: 'var(--font-size-7xl)',
  color: 'var(--theme-accent)'
}}>
  Custom Heading
</h1>
```

### Typography Scale (CSS Variables)

All typography values are defined as CSS variables for easy GSAP animation:

- **Font Sizes**: `--font-size-xs` to `--font-size-8xl`
- **Line Heights**: `--line-height-tight` to `--line-height-loose`
- **Letter Spacing**: `--letter-spacing-tighter` to `--letter-spacing-widest`

### Typography Utility Classes

Some utility classes are available in `globals.css`:
- `.text-decorative` - Applies Yellowtail font family
- `font-mono` - Applies Geist Mono (Tailwind class, but font is CSS variable)

**Note**: Use these classes sparingly. Prefer inline styles with CSS variables for better GSAP compatibility.

---

## Color System

> **⚠️ CRITICAL: All theme colors MUST use CSS variables. This is essential for GSAP animations and theme switching.**

### Theme Colors (CSS Variables Only)

Colors are defined as CSS variables that change based on the theme. **NEVER use hardcoded colors or Tailwind color classes for theme colors.**

#### Day Theme (Default)
```css
--theme-bg-nav: #334D2D;        /* Navigation background */
--theme-bg-primary: #ffffff;     /* Main background */
--theme-bg-secondary: #f5f5f5;   /* Secondary background */
--theme-text-primary: #FFFFFF;   /* Primary text (on dark backgrounds) */
--theme-text-body: #171717;      /* Body text */
--theme-accent: #B29738;         /* Accent color (gold) */
```

#### Night Theme
```css
--theme-bg-nav: #011A0C;         /* Navigation background */
--theme-bg-primary: #011A0C;      /* Main background */
--theme-bg-secondary: #022414;    /* Secondary background */
--theme-text-primary: #FFFFFF;   /* Primary text */
--theme-text-body: #FFFFFF;       /* Body text */
--theme-accent: #B29738;         /* Accent color (gold) */
```

### Using Colors - REQUIRED Pattern

#### ✅ CORRECT: CSS Variables (Required for Theme Colors)

```tsx
// Always use CSS variables for theme colors
<div style={{ 
  backgroundColor: 'var(--theme-bg-primary)',
  color: 'var(--theme-text-body)'
}}>
  Content
</div>

// For accent color
<div style={{ color: 'var(--theme-accent)' }}>
  Accent colored text
</div>

// For borders
<div style={{ borderColor: 'var(--theme-accent)' }}>
  Bordered element
</div>
```

#### ❌ INCORRECT: Don't Use These Patterns

```tsx
// Don't use Tailwind color classes for theme colors
<div className="bg-white text-black dark:bg-gray-900">
  Content
</div>

// Don't hardcode theme colors
<div style={{ backgroundColor: '#ffffff' }}>
  Content
</div>

// Don't use utility classes for theme colors (they exist but are deprecated)
<div className="bg-theme-primary text-theme-body">
  Content
</div>
```

### Why CSS Variables?

1. **GSAP Compatibility**: CSS variables can be animated directly with GSAP
2. **Theme Switching**: Colors update automatically when theme changes
3. **Performance**: CSS variables are efficient and update smoothly
4. **Maintainability**: Single source of truth for colors

### Direct Color Values (Non-Theme Colors)

For colors that don't change with theme (like decorative elements), you can use direct values:

```tsx
// OK for non-theme colors
<div style={{ backgroundColor: '#B29738' }}>
  Static decorative element
</div>
```

---

## Component Patterns

### Client Components

Components that use hooks (like `useTheme`) must be marked as `"use client"`:

```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  // ...
}
```

### Server Components

By default, components are Server Components. Use them when you don't need client-side interactivity:

```tsx
// No "use client" directive needed
export default function MyPage() {
  return <div>Content</div>;
}
```

### Navigation Component

The `Nav` component is included in the root layout and provides:
- Logo/branding
- Navigation links
- Theme toggle button
- Responsive mobile menu

Navigation links are defined in `src/data/navigation.ts`.

### Component Structure Pattern

All components should follow this structure for consistency and animation readiness:

```tsx
"use client"; // Only if needed

export default function MyComponent() {
  return (
    <div
      className="flex flex-col gap-4 p-6 max-w-4xl mx-auto"  // Tailwind: layout
      style={{
        backgroundColor: 'var(--theme-bg-primary)',          // Vanilla CSS: color
        color: 'var(--theme-text-body)',                      // Vanilla CSS: color
      }}
    >
      <h1 style={{
        fontFamily: 'var(--font-fjalla-one)',                 // Vanilla CSS: typography
        fontSize: 'var(--font-size-3xl)',                    // Vanilla CSS: typography
        color: 'var(--theme-accent)'                          // Vanilla CSS: color
      }}>
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

---

## Animation-Ready Component Structure

> **⚠️ CRITICAL: All components must be structured to easily integrate GSAP animations and vanilla JS animations.**

### Key Principles for Animation-Ready Components

1. **Use data attributes** for animation targeting
2. **Keep structure semantic** and predictable
3. **Use CSS variables** for animatable properties
4. **Avoid inline transforms** that conflict with GSAP
5. **Provide refs** for direct DOM access when needed

### Component Pattern for GSAP

```tsx
"use client";

import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap'; // When GSAP is added

export default function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // GSAP animation example (when GSAP is installed)
    // gsap.from(titleRef.current, {
    //   opacity: 0,
    //   y: 50,
    //   duration: 1,
    //   ease: "power2.out"
    // });
  }, []);

  return (
    <div
      ref={containerRef}
      data-animate="container"
      className="flex flex-col gap-4 p-6"
      style={{
        backgroundColor: 'var(--theme-bg-primary)',
        color: 'var(--theme-text-body)'
      }}
    >
      <h1
        ref={titleRef}
        data-animate="title"
        style={{
          fontFamily: 'var(--font-fjalla-one)',
          fontSize: 'var(--font-size-3xl)',
          color: 'var(--theme-accent)',
          // Don't set transform/opacity here - let GSAP handle it
        }}
      >
        Animated Title
      </h1>
      <p
        ref={contentRef}
        data-animate="content"
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--theme-text-body)'
        }}
      >
        Animated content
      </p>
    </div>
  );
}
```

### Data Attributes for Animation Targeting

Use `data-animate` attributes to make elements easily targetable:

```tsx
<div data-animate="hero">
  <h1 data-animate="hero-title">Title</h1>
  <p data-animate="hero-text">Text</p>
</div>
```

Then in GSAP:
```javascript
gsap.from('[data-animate="hero-title"]', { opacity: 0, y: 50 });
```

### CSS Variables for GSAP Animation

CSS variables can be animated directly with GSAP:

```javascript
// Animate color
gsap.to(element, {
  '--theme-accent': '#FF0000',
  duration: 1
});

// Animate font size
gsap.to(element, {
  '--font-size-3xl': '4rem',
  duration: 1
});
```

### Vanilla CSS + JS Animation Pattern

For vanilla CSS animations, use CSS classes and toggle them:

```tsx
"use client";

import { useEffect, useState } from 'react';

export default function VanillaAnimatedComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        backgroundColor: 'var(--theme-bg-primary)',
        color: 'var(--theme-text-body)'
      }}
    >
      Content
    </div>
  );
}
```

### Animation Best Practices

1. **Don't set initial transform/opacity in inline styles** - Let GSAP handle it
2. **Use CSS variables** for colors and typography that need animation
3. **Provide refs** for direct DOM manipulation
4. **Use data attributes** for easy selector targeting
5. **Keep layout in Tailwind** - Don't animate layout properties with GSAP
6. **Animate CSS variables** for theme-aware animations

---

## File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and ThemeProvider
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles and theme variables
│   └── coming-soon/       # Coming soon page
│       └── page.tsx
├── components/            # Reusable components
│   ├── Nav.tsx           # Navigation component
│   └── icons.tsx         # Custom icon components
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme management
├── data/                 # Static data
│   ├── content.json      # Content data
│   └── navigation.ts     # Navigation links
└── lib/                  # Utility functions
    └── utils.ts          # cn() utility function
```

---

## How to Use the Theme

### 1. Access Theme in Components

```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 2. Apply Theme Colors

```tsx
// Using CSS variables (recommended)
<div style={{
  backgroundColor: 'var(--theme-bg-primary)',
  color: 'var(--theme-text-body)'
}}>
  Content
</div>

// Using utility classes
<div className="bg-theme-primary text-theme-body">
  Content
</div>
```

### 3. Theme-Aware Conditional Styling

```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export default function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "transition-colors duration-300",
      theme === "day" ? "bg-white" : "bg-[#011A0C]"
    )}>
      Content
    </div>
  );
}
```

---

## Creating New Pages

### 1. Create a New Page File

Create a new file in `src/app/[page-name]/page.tsx`:

```tsx
export default function MyNewPage() {
  return (
    <main className="min-h-screen p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1>My New Page</h1>
        <p style={{ color: 'var(--theme-text-body)' }}>
          Page content here
        </p>
      </div>
    </main>
  );
}
```

### 2. Add to Navigation (Optional)

Update `src/data/navigation.ts`:

```typescript
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/my-new-page", label: "My New Page" },
  // ...
];
```

### 3. Use Theme Colors

Always use theme-aware colors:

```tsx
<div 
  className="bg-theme-primary text-theme-body"
  style={{
    backgroundColor: 'var(--theme-bg-primary)',
    color: 'var(--theme-text-body)'
  }}
>
  Content
</div>
```

### 4. Add Transitions

Include smooth transitions for theme changes:

```tsx
<div className="transition-colors duration-300">
  Content
</div>
```

---

## Best Practices

### 1. ⚠️ CRITICAL: Always Use CSS Variables for Theme Colors

✅ **Good:**
```tsx
<div style={{ color: 'var(--theme-text-body)' }}>
  Content
</div>
```

❌ **Bad:**
```tsx
<div style={{ color: '#000000' }}>
  Content
</div>
```

### 2. ⚠️ CRITICAL: Use Vanilla CSS for Colors/Typography, Tailwind for Layout

✅ **Good:**
```tsx
<div
  className="flex flex-col gap-4 p-6"  // Tailwind: layout & spacing
  style={{
    backgroundColor: 'var(--theme-bg-primary)',  // Vanilla CSS: color
    color: 'var(--theme-text-body)',              // Vanilla CSS: color
    fontSize: 'var(--font-size-base)'             // Vanilla CSS: typography
  }}
>
  Content
</div>
```

❌ **Bad:**
```tsx
<div className="bg-white text-black text-base flex flex-col gap-4 p-6">
  Content
</div>
```

### 3. Include Transitions for Theme Changes

Always add transitions for theme-aware elements:

```tsx
<div 
  className="transition-colors duration-300"
  style={{
    backgroundColor: 'var(--theme-bg-primary)',
    color: 'var(--theme-text-body)'
  }}
>
  Content
</div>
```

### 4. Use the `cn()` Utility for Tailwind Classes Only

For conditional Tailwind classes, use the `cn()` utility:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "flex flex-col gap-4",        // Tailwind classes
  condition && "md:flex-row"    // Conditional Tailwind classes
)}>
```

### 5. Mark Client Components When Needed

Remember to add `"use client"` when using hooks or client-side features:

```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";
```

### 6. Responsive Design with Tailwind

Use Tailwind's responsive prefixes for layout and spacing:

```tsx
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
  Content
</div>
```

### 7. Typography with CSS Variables

Always use CSS variables for typography:

✅ **Good:**
```tsx
<h1 style={{
  fontFamily: 'var(--font-fjalla-one)',
  fontSize: 'var(--font-size-3xl)',
  color: 'var(--theme-accent)'
}}>
  Title
</h1>
```

❌ **Bad:**
```tsx
<h1 className="text-3xl font-bold text-yellow-600">
  Title
</h1>
```

### 8. Structure Components for Animation

- Use `ref` attributes for GSAP targeting
- Use `data-animate` attributes for easy selection
- Don't set initial transform/opacity in styles
- Keep CSS variables for animatable properties

### 9. Component Organization

- Keep components in `src/components/`
- Keep page-specific components near their pages
- Use TypeScript for all components
- Export components as default when possible
- Add `data-animate` attributes for animation targeting

---

## GSAP Animation Integration Guide

> **⚠️ IMPORTANT: This section is for future GSAP integration. Follow these patterns when adding animations.**

### Installing GSAP

When ready to add GSAP:

```bash
npm install gsap
```

### GSAP Animation Patterns

#### 1. Basic GSAP Animation with Refs

```tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedComponent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      });

      // Animate content with delay
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div
      className="flex flex-col gap-4 p-6"
      style={{
        backgroundColor: 'var(--theme-bg-primary)',
        color: 'var(--theme-text-body)'
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-fjalla-one)',
          fontSize: 'var(--font-size-3xl)',
          color: 'var(--theme-accent)'
        }}
      >
        Animated Title
      </h1>
      <p
        ref={contentRef}
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--theme-text-body)'
        }}
      >
        Animated content
      </p>
    </div>
  );
}
```

#### 2. Animating CSS Variables with GSAP

```tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function VariableAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(elementRef.current, {
      '--theme-accent': '#FF0000',  // Animate CSS variable
      duration: 2,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        color: 'var(--theme-accent)',  // Uses animated variable
        fontSize: 'var(--font-size-2xl)'
      }}
    >
      Color-changing text
    </div>
  );
}
```

#### 3. GSAP ScrollTrigger Pattern

```tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimatedComponent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundColor: 'var(--theme-bg-primary)'
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-fjalla-one)',
          fontSize: 'var(--font-size-5xl)',
          color: 'var(--theme-accent)'
        }}
      >
        Scroll Animated Title
      </h1>
    </section>
  );
}
```

#### 4. GSAP Timeline Pattern

```tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TimelineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from('[data-animate="item-1"]', {
      opacity: 0,
      x: -50,
      duration: 0.6
    })
    .from('[data-animate="item-2"]', {
      opacity: 0,
      x: -50,
      duration: 0.6
    }, "-=0.3")
    .from('[data-animate="item-3"]', {
      opacity: 0,
      x: -50,
      duration: 0.6
    }, "-=0.3");

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 p-6"
      style={{
        backgroundColor: 'var(--theme-bg-primary)'
      }}
    >
      <div
        data-animate="item-1"
        style={{
          color: 'var(--theme-text-body)',
          fontSize: 'var(--font-size-lg)'
        }}
      >
        Item 1
      </div>
      <div
        data-animate="item-2"
        style={{
          color: 'var(--theme-text-body)',
          fontSize: 'var(--font-size-lg)'
        }}
      >
        Item 2
      </div>
      <div
        data-animate="item-3"
        style={{
          color: 'var(--theme-text-body)',
          fontSize: 'var(--font-size-lg)'
        }}
      >
        Item 3
      </div>
    </div>
  );
}
```

### GSAP Best Practices

1. **Always use `gsap.context()`** for cleanup
2. **Clean up animations** in useEffect return
3. **Use refs** for direct DOM access
4. **Animate CSS variables** for theme-aware animations
5. **Don't set initial transform/opacity** in styles - let GSAP handle it
6. **Use data attributes** for easy targeting
7. **Register plugins** (ScrollTrigger, etc.) before use

---

## Quick Reference

### Common Patterns

#### Theme-Aware Container (Animation-Ready)
```tsx
<main 
  ref={containerRef}
  data-animate="main-container"
  className="min-h-screen p-8 transition-colors duration-300"
  style={{ backgroundColor: 'var(--theme-bg-primary)' }}
>
  <div className="max-w-4xl mx-auto">
    Content
  </div>
</main>
```

#### Theme Toggle Button
```tsx
"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === "day" ? <Moon /> : <Sun />}
    </button>
  );
}
```

#### Decorative Heading (Animation-Ready)
```tsx
<h1
  ref={titleRef}
  data-animate="decorative-title"
  className="text-decorative"
  style={{
    fontSize: 'var(--font-size-6xl)',
    color: 'var(--theme-accent)'
  }}
>
  Johnny G's
</h1>
```

#### Themed Card (Animation-Ready)
```tsx
<div
  ref={cardRef}
  data-animate="card"
  className="p-6 rounded-lg transition-colors duration-300"
  style={{
    backgroundColor: 'var(--theme-bg-secondary)',
    color: 'var(--theme-text-body)'
  }}
>
  Card content
</div>
```

#### Complete Component Template (Animation-Ready)
```tsx
"use client";

import { useRef, useEffect } from 'react';
// import { gsap } from 'gsap'; // When GSAP is added

export default function ComponentTemplate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // GSAP animations go here
    // const ctx = gsap.context(() => {
    //   gsap.from(titleRef.current, { opacity: 0, y: 50 });
    // }, containerRef);
    // return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      data-animate="container"
      className="flex flex-col gap-4 p-6 max-w-4xl mx-auto"
      style={{
        backgroundColor: 'var(--theme-bg-primary)',
        color: 'var(--theme-text-body)'
      }}
    >
      <h1
        ref={titleRef}
        data-animate="title"
        style={{
          fontFamily: 'var(--font-fjalla-one)',
          fontSize: 'var(--font-size-3xl)',
          color: 'var(--theme-accent)'
        }}
      >
        Title
      </h1>
      <p
        ref={contentRef}
        data-animate="content"
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--theme-text-body)'
        }}
      >
        Content
      </p>
    </div>
  );
}
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## Notes

### Important Reminders

- **The theme persists during the session but resets to "day" on page reload**
- **All theme colors are defined in `globals.css` under `:root` and `[data-theme="night"]`**
- **Fonts are loaded via Next.js font optimization**
- **The project uses the App Router (not Pages Router)**
- **All components should be responsive and mobile-first**

### Styling Rules Summary

1. ✅ **Vanilla CSS (CSS Variables)** for:
   - Theme colors (`var(--theme-*)`)
   - Typography (`var(--font-*)`, `var(--font-size-*)`)
   - Custom properties that need animation

2. ✅ **Tailwind CSS** for:
   - Layout (`flex`, `grid`, `block`)
   - Spacing (`p-4`, `m-6`, `gap-8`)
   - Sizing (`w-full`, `max-w-4xl`)
   - Responsive utilities (`md:`, `lg:`)
   - Borders, shadows, positioning

3. ✅ **Animation-Ready Structure**:
   - Use `ref` attributes for GSAP targeting
   - Use `data-animate` attributes for easy selection
   - Don't set initial transform/opacity in styles
   - Keep CSS variables for animatable properties

### For Cursor AI

When generating code for this project:
1. **Always use CSS variables** (`var(--theme-*)`) for colors
2. **Always use CSS variables** (`var(--font-*)`) for typography
3. **Use Tailwind** only for layout, spacing, and utilities
4. **Add `ref` and `data-animate` attributes** to elements that might be animated
5. **Follow the component template** structure shown in Quick Reference
6. **Never use Tailwind color classes** for theme colors
7. **Never hardcode colors** that should be theme-aware

---

*Last updated: Based on project structure as of current date*
*This documentation is the primary guide for Cursor AI and developers*

